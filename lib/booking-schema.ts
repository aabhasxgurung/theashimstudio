// Single source of truth for booking-request validation.
// Imported by BOTH the client form (instant feedback) and the server action
// (authoritative check) so the two can never drift apart.

import { z } from "zod";
import { locations } from "./locations";
import { serviceMenu } from "./service";

export const TIME_OF_DAY = ["Morning", "Afternoon", "Evening"] as const;
export type TimeOfDay = (typeof TIME_OF_DAY)[number];

const locationIds = new Set(locations.map((l) => l.id));
const categoryIds = new Set(serviceMenu.map((c) => c.id));

// serviceId -> categoryId, so we can confirm the chosen service actually
// belongs to the chosen category.
const serviceToCategory = new Map<string, string>();
for (const category of serviceMenu) {
  for (const service of category.services) {
    serviceToCategory.set(service.id, category.id);
  }
}

/**
 * Strip formatting and an optional +977 / 977 country code, leaving the bare
 * national number. A valid Nepali mobile is then 10 digits starting 97 or 98.
 */
export function normalizeNepaliPhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  return cleaned.replace(/^\+?977/, "");
}

const isTodayOrFuture = (value: string) => {
  const picked = new Date(`${value}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
};

export const bookingSchema = z
  .object({
    locationId: z
      .string()
      .refine((v) => locationIds.has(v), "Please choose a location."),
    categoryId: z
      .string()
      .refine((v) => categoryIds.has(v), "Please choose a service type."),
    serviceId: z.string().min(1, "Please choose a service."),
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(80, "That name is too long."),
    phone: z
      .string()
      .min(1, "Please enter your phone number.")
      .transform(normalizeNepaliPhone)
      .refine(
        (v) => /^9[78]\d{8}$/.test(v),
        "Enter a valid Nepali mobile number — 10 digits starting 97 or 98."
      ),
    date: z
      .string()
      .min(1, "Please choose a preferred date.")
      .refine(isTodayOrFuture, "Please choose today or a future date."),
    timeOfDay: z.enum(TIME_OF_DAY),
    notes: z.string().trim().max(1000, "Please keep notes under 1000 characters.").optional(),
  })
  .superRefine((val, ctx) => {
    if (serviceToCategory.get(val.serviceId) !== val.categoryId) {
      ctx.addIssue({
        code: "custom",
        path: ["serviceId"],
        message: "That service doesn't match the chosen service type.",
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingFieldErrors = Record<string, string[] | undefined>;
