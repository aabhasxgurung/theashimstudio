"use server";

import { z } from "zod";
import { Resend } from "resend";
import { bookingSchema, type BookingFieldErrors } from "@/lib/booking-schema";
import { getLocation } from "@/lib/locations";
import { serviceMenu } from "@/lib/service";

/**
 * Per-location routing. For now every request goes to RESEND_BOOKING_EMAIL and
 * the coordinator routes it by hand (the location is flagged at the top of the
 * email). To split bookings per branch later, fill in an address here — that's
 * the only change needed:
 *
 *   const LOCATION_EMAIL_MAP = {
 *     "butwal-traffic-chowk": "butwal.traffic@theashimstudio.com",
 *     "kathmandu-durbar-marg": "ktm@theashimstudio.com",
 *   };
 */
const LOCATION_EMAIL_MAP: Record<string, string | undefined> = {
  // intentionally empty — falls back to RESEND_BOOKING_EMAIL
};

function recipientFor(locationId: string): string | undefined {
  return LOCATION_EMAIL_MAP[locationId] ?? process.env.RESEND_BOOKING_EMAIL;
}

export type BookingSuccess = {
  serviceName: string;
  categoryName: string;
  locationLabel: string;
  date: string;
  phone: string;
  timeOfDay: string;
};

export type BookingState =
  | { status: "idle" }
  | { status: "success"; booking: BookingSuccess }
  | { status: "error"; message: string; fieldErrors?: BookingFieldErrors };

function lookup(categoryId: string, serviceId: string) {
  const category = serviceMenu.find((c) => c.id === categoryId);
  const service = category?.services.find((s) => s.id === serviceId);
  return { category, service };
}

function buildEmail(args: {
  locationLabel: string;
  categoryName: string;
  service: { name: string; priceLabel: string };
  name: string;
  phone: string;
  date: string;
  timeOfDay: string;
  notes?: string;
}) {
  const { locationLabel, categoryName, service, name, phone, date, timeOfDay, notes } =
    args;

  // Display the phone in the +977 form the coordinator will dial.
  const dialPhone = `+977 ${phone}`;

  const text = [
    `LOCATION: ${locationLabel}`,
    ``,
    `New booking REQUEST (not a confirmed slot — please call to confirm).`,
    ``,
    `Service:   ${service.name} (${service.priceLabel})`,
    `Type:      ${categoryName}`,
    `Guest:     ${name}`,
    `Phone:     ${dialPhone}`,
    `Date:      ${date}`,
    `Time:      ${timeOfDay}`,
    `Notes:     ${notes?.trim() ? notes.trim() : "—"}`,
  ].join("\n");

  const html = `
  <div style="font-family:Georgia,'Times New Roman',serif;color:#2a1a12;max-width:560px;margin:0 auto;padding:8px">
    <div style="background:#b5512f;color:#f1e4cf;padding:18px 22px;border-radius:6px 6px 0 0">
      <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.75">Location</div>
      <div style="font-size:26px;font-weight:700;line-height:1.15;margin-top:4px">${locationLabel}</div>
    </div>
    <div style="border:1px solid #e6d2ad;border-top:none;border-radius:0 0 6px 6px;padding:22px">
      <p style="margin:0 0 18px;font-size:13px;color:#8f3c22;font-weight:700">
        Booking REQUEST — this is not a locked slot. Call the guest to confirm.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${row("Service", `${service.name} <span style="color:#9c8472">(${service.priceLabel})</span>`)}
        ${row("Type", categoryName)}
        ${row("Guest", name)}
        ${row("Phone", `<a href="tel:+977${phone}" style="color:#b5512f">${dialPhone}</a>`)}
        ${row("Preferred date", date)}
        ${row("Preferred time", timeOfDay)}
        ${row("Notes", notes?.trim() ? escapeHtml(notes.trim()) : "—")}
      </table>
    </div>
  </div>`;

  return { text, html };
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;color:#9c8472;font-size:11px;letter-spacing:.14em;text-transform:uppercase;vertical-align:top;width:130px">${label}</td>
    <td style="padding:8px 0;color:#2a1a12">${value}</td>
  </tr>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
}

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const parsed = bookingSchema.safeParse({
    locationId: formData.get("locationId"),
    categoryId: formData.get("categoryId"),
    serviceId: formData.get("serviceId"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    timeOfDay: formData.get("timeOfDay"),
    notes: formData.get("notes") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const data = parsed.data;
  const location = getLocation(data.locationId);
  const { category, service } = lookup(data.categoryId, data.serviceId);

  if (!location || !category || !service) {
    return {
      status: "error",
      message:
        "Something looked off with that selection. Please start again or message us directly.",
    };
  }

  const recipient = recipientFor(location.id);
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !recipient) {
    // Misconfiguration — never pretend the request was sent.
    console.error("Booking email not configured", {
      hasApiKey: Boolean(apiKey),
      hasRecipient: Boolean(recipient),
    });
    return {
      status: "error",
      message:
        "We couldn't send your request right now. Please call or WhatsApp us directly and we'll sort it out.",
    };
  }

  const { text, html } = buildEmail({
    locationLabel: location.label,
    categoryName: category.name,
    service,
    name: data.name,
    phone: data.phone,
    date: data.date,
    timeOfDay: data.timeOfDay,
    notes: data.notes,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "The Ashim Studio <onboarding@resend.dev>",
      to: recipient,
      subject: `New booking request — ${location.label} — ${category.name}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend send error", error);
      return {
        status: "error",
        message:
          "We couldn't send your request right now. Please try again, or call / WhatsApp us directly.",
      };
    }
  } catch (err) {
    console.error("Booking submit threw", err);
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please try again, or call / WhatsApp us directly.",
    };
  }

  return {
    status: "success",
    booking: {
      serviceName: service.name,
      categoryName: category.name,
      locationLabel: location.label,
      date: data.date,
      phone: `+977 ${data.phone}`,
      timeOfDay: data.timeOfDay,
    },
  };
}
