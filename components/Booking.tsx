"use client";

import { useActionState, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { z } from "zod";
import { serviceMenu } from "@/lib/service";
import { locations, getLocation, whatsappLink } from "@/lib/locations";
import {
  bookingSchema,
  TIME_OF_DAY,
  type BookingFieldErrors,
} from "@/lib/booking-schema";
import { submitBooking, type BookingState } from "@/app/book/actions";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STEPS = ["Location", "Service type", "Service", "Your details"] as const;

const initialState: BookingState = { status: "idle" };

export function Booking() {
  const reduce = useReducedMotion();

  const [step, setStep] = useState(0);
  const [locationId, setLocationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [serviceId, setServiceId] = useState("");

  // Step 4 fields — controlled so we can validate them client-side with the
  // same schema the server uses.
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const [notes, setNotes] = useState("");

  const [clientErrors, setClientErrors] = useState<BookingFieldErrors | null>(
    null
  );

  const [state, formAction, pending] = useActionState(
    submitBooking,
    initialState
  );

  const location = getLocation(locationId);
  const category = serviceMenu.find((c) => c.id === categoryId);
  const service = category?.services.find((s) => s.id === serviceId);

  const todayStr = useMemo(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }, []);

  const fieldErrors: BookingFieldErrors =
    clientErrors ?? (state.status === "error" ? state.fieldErrors ?? {} : {});

  function goTo(target: number) {
    // Only allow jumping to a step whose prerequisites are met.
    if (target <= step) setStep(target);
  }

  function pickLocation(id: string) {
    setLocationId(id);
    setStep(1);
  }
  function pickCategory(id: string) {
    setCategoryId(id);
    setServiceId("");
    setStep(2);
  }
  function pickService(id: string) {
    setServiceId(id);
    setStep(3);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const result = bookingSchema.safeParse({
      locationId,
      categoryId,
      serviceId,
      name,
      phone,
      date,
      timeOfDay,
      notes: notes || undefined,
    });
    if (!result.success) {
      e.preventDefault();
      setClientErrors(z.flattenError(result.error).fieldErrors);
    } else {
      setClientErrors(null);
    }
  }

  // ── Confirmation ─────────────────────────────────────────
  if (state.status === "success") {
    return <Confirmation booking={state.booking} />;
  }

  const stepVariants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: { opacity: 0, y: 18 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="bg-canvas min-h-dvh lg:grid lg:grid-cols-12"
    >
      {/* ── Warm image panel ─────────────────────────────── */}
      <aside className="relative lg:col-span-5 lg:min-h-dvh">
        <div className="relative h-44 sm:h-60 lg:sticky lg:top-0 lg:h-dvh">
          <Image
            src="/home/9.jpg"
            alt="Inside The Ashim Studio"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#140c06]/85 via-[#140c06]/35 to-[#140c06]/45 lg:bg-linear-to-br lg:from-[#140c06]/80 lg:via-[#140c06]/35 lg:to-clay/30" />
          <div className="absolute inset-0 flex flex-col justify-end px-gutter pb-7 lg:pb-14">
            <span className="text-brass text-[0.62rem] tracking-[0.24em] uppercase">
              (Reserve your chair)
            </span>
            <h1
              id="book-heading"
              className="mt-3 font-display font-light text-canvas tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
            >
              Book your <span className="italic text-ochre">visit.</span>
            </h1>
            <p className="mt-4 hidden max-w-sm text-canvas/70 text-[0.9rem] leading-relaxed lg:block">
              Tell us where, what and when. This sends a{" "}
              <span className="text-canvas">request</span> — we&apos;ll call to
              confirm your time. It doesn&apos;t lock a slot just yet.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Steps ────────────────────────────────────────── */}
      <div className="lg:col-span-7 px-gutter pt-10 pb-24 lg:pt-16 lg:pb-28">
        <StepIndicator step={step} onJump={goTo} />

        <p className="mt-6 text-ink/55 text-[0.8rem] leading-relaxed lg:hidden">
          This sends a <span className="text-ink">request</span> — we&apos;ll
          call to confirm. It doesn&apos;t lock a slot just yet.
        </p>

        {state.status === "error" && !state.fieldErrors && (
          <div
            role="alert"
            className="mt-6 border border-clay/40 bg-clay/5 px-5 py-4 text-[0.85rem] text-clay-deep"
          >
            {state.message}
            <div className="mt-3 flex flex-wrap gap-3">
              {locations.map((l) => (
                <a
                  key={l.id}
                  href={whatsappLink(
                    l,
                    `Hi, I'd like to book ${service?.name ?? "an appointment"} at ${l.label}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-clay"
                >
                  WhatsApp {l.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <form action={formAction} onSubmit={handleSubmit} className="mt-8">
          {/* Selections carried across steps, always present for submit. */}
          <input type="hidden" name="locationId" value={locationId} />
          <input type="hidden" name="categoryId" value={categoryId} />
          <input type="hidden" name="serviceId" value={serviceId} />
          <input type="hidden" name="timeOfDay" value={timeOfDay} />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE }}
            >
              {step === 0 && (
                <LocationStep onPick={pickLocation} selected={locationId} />
              )}

              {step === 1 && (
                <CategoryStep onPick={pickCategory} selected={categoryId} />
              )}

              {step === 2 && category && (
                <ServiceStep
                  category={category}
                  selected={serviceId}
                  onPick={pickService}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 3 && location && category && service && (
                <DetailsStep
                  location={location}
                  categoryName={category.name}
                  service={service}
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  date={date}
                  setDate={setDate}
                  timeOfDay={timeOfDay}
                  setTimeOfDay={setTimeOfDay}
                  notes={notes}
                  setNotes={setNotes}
                  todayStr={todayStr}
                  errors={fieldErrors}
                  clearErrors={() => setClientErrors(null)}
                  pending={pending}
                  onBack={() => setStep(2)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}

/* ── Step indicator ───────────────────────────────────────── */
function StepIndicator({
  step,
  onJump,
}: {
  step: number;
  onJump: (n: number) => void;
}) {
  return (
    <nav aria-label="Booking steps" className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {STEPS.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onJump(i)}
            disabled={i > step}
            aria-current={current ? "step" : undefined}
            className={`group flex items-baseline gap-2 text-left transition-opacity ${
              i > step ? "opacity-35" : "opacity-100"
            } ${done ? "cursor-pointer" : "cursor-default"}`}
          >
            <span
              className={`text-[0.6rem] tabular-nums tracking-[0.2em] ${
                current ? "text-clay" : "text-stone"
              }`}
            >
              0{i + 1}
            </span>
            <span
              className={`text-[0.7rem] tracking-[0.06em] ${
                current
                  ? "text-ink"
                  : done
                    ? "text-ink/60 group-hover:text-ink"
                    : "text-stone"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden className="ml-3 hidden h-px w-6 bg-ink/20 sm:inline-block" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ── Step 1: Location ─────────────────────────────────────── */
function LocationStep({
  onPick,
  selected,
}: {
  onPick: (id: string) => void;
  selected: string;
}) {
  return (
    <fieldset className="border-none p-0">
      <Legend num="01" title="Where would you like to come in?" />
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {locations.map((l) => {
          const isSelected = selected === l.id;
          return (
            <div
              key={l.id}
              className={`group relative overflow-hidden border p-5 transition-colors duration-300 ${
                isSelected
                  ? "border-clay bg-clay/5"
                  : "border-ink/15 hover:border-ink/40"
              }`}
            >
              <button
                type="button"
                onClick={() => onPick(l.id)}
                aria-pressed={isSelected}
                className="block w-full text-left"
              >
                <span className="text-stone text-[0.6rem] tracking-[0.22em] uppercase">
                  {l.city}
                </span>
                <span
                  className="mt-1 block font-display font-light leading-none text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                >
                  {l.branch}
                </span>
                <span className="mt-2 block text-ink/55 text-[0.82rem]">
                  {l.address}
                </span>
              </button>
              <a
                href={whatsappLink(
                  l,
                  `Hi, I'd like to book an appointment at ${l.label}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-4 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.14em] uppercase text-olive hover:text-ink transition-colors"
              >
                <WhatsAppGlyph /> Prefer to message? WhatsApp this branch
              </a>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ── Step 2: Category ─────────────────────────────────────── */
function CategoryStep({
  onPick,
  selected,
}: {
  onPick: (id: string) => void;
  selected: string;
}) {
  return (
    <fieldset className="border-none p-0">
      <Legend num="02" title="What are you after?" />
      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {serviceMenu.map((c) => {
          const isSelected = selected === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onPick(c.id)}
              aria-pressed={isSelected}
              className={`flex min-h-24 flex-col justify-between border p-4 text-left transition-colors duration-300 ${
                isSelected
                  ? "border-clay bg-clay text-canvas"
                  : "border-ink/15 text-ink hover:border-ink/40"
              }`}
            >
              <span
                className={`text-[0.6rem] tracking-[0.18em] ${
                  isSelected ? "text-canvas/60" : "text-stone"
                }`}
              >
                {c.services.length} option{c.services.length > 1 ? "s" : ""}
              </span>
              <span
                className="mt-3 font-display font-light leading-tight"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ── Step 3: Service ──────────────────────────────────────── */
function ServiceStep({
  category,
  selected,
  onPick,
  onBack,
}: {
  category: (typeof serviceMenu)[number];
  selected: string;
  onPick: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <fieldset className="border-none p-0">
      <Legend
        num="03"
        title={category.name}
        subtitle="Pick a service"
        onBack={onBack}
      />
      <ul className="mt-7 border-t border-ink/15">
        {category.services.map((s) => {
          const isSelected = selected === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onPick(s.id)}
                aria-pressed={isSelected}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-ink/15 py-4 text-left"
              >
                <span
                  aria-hidden
                  className={`relative top-[0.3rem] block h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
                    isSelected
                      ? "border-clay bg-clay"
                      : "border-ink/30 group-hover:border-ink/60"
                  }`}
                />
                <span className="flex flex-col">
                  <span
                    className={`font-display font-light leading-tight transition-colors ${
                      isSelected ? "text-clay" : "text-ink"
                    }`}
                    style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)" }}
                  >
                    {s.name}
                  </span>
                  {s.note && (
                    <span className="text-stone text-[0.7rem] tracking-[0.04em]">
                      {s.note}
                    </span>
                  )}
                </span>
                <span className="text-[0.78rem] tabular-nums whitespace-nowrap text-ink/60 pb-1">
                  {s.priceLabel}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

/* ── Step 4: Details ──────────────────────────────────────── */
function DetailsStep(props: {
  location: ReturnType<typeof getLocation> & object;
  categoryName: string;
  service: { name: string; priceLabel: string };
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  timeOfDay: string;
  setTimeOfDay: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  todayStr: string;
  errors: BookingFieldErrors;
  clearErrors: () => void;
  pending: boolean;
  onBack: () => void;
}) {
  const {
    location,
    categoryName,
    service,
    name,
    setName,
    phone,
    setPhone,
    date,
    setDate,
    timeOfDay,
    setTimeOfDay,
    notes,
    setNotes,
    todayStr,
    errors,
    clearErrors,
    pending,
    onBack,
  } = props;

  return (
    <fieldset className="border-none p-0">
      <Legend num="04" title="Your details" onBack={onBack} />

      {/* Summary of the request so far */}
      <dl className="mt-7 grid gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/15 sm:grid-cols-3">
        <SummaryCell label="Location" value={location.label} />
        <SummaryCell label="Type" value={categoryName} />
        <SummaryCell
          label="Service"
          value={`${service.name} · ${service.priceLabel}`}
        />
      </dl>

      <div className="mt-8 space-y-7">
        <TextField
          id="name"
          name="name"
          label="Full name"
          placeholder="Your name"
          value={name}
          onChange={(v) => {
            setName(v);
            clearErrors();
          }}
          error={errors.name?.[0]}
          autoComplete="name"
        />
        <TextField
          id="phone"
          name="phone"
          label="Phone (we'll call to confirm)"
          placeholder="98XXXXXXXX  ·  +977 optional"
          value={phone}
          onChange={(v) => {
            setPhone(v);
            clearErrors();
          }}
          error={errors.phone?.[0]}
          inputMode="tel"
          autoComplete="tel"
        />

        <div>
          <FieldLabel htmlFor="date">Preferred date</FieldLabel>
          <input
            id="date"
            name="date"
            type="date"
            min={todayStr}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              clearErrors();
            }}
            className="mt-3 w-full bg-transparent border-b border-ink/25 py-3 text-ink outline-none focus:border-clay transition-colors duration-300 [color-scheme:light]"
          />
          <FieldError message={errors.date?.[0]} />
        </div>

        <div>
          <FieldLabel>Preferred time of day</FieldLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIME_OF_DAY.map((t) => {
              const isSelected = timeOfDay === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTimeOfDay(t);
                    clearErrors();
                  }}
                  aria-pressed={isSelected}
                  className={`px-5 py-2.5 text-[0.8rem] tracking-[0.06em] border transition-colors duration-300 ${
                    isSelected
                      ? "border-clay bg-clay text-canvas"
                      : "border-ink/15 text-ink/70 hover:border-ink/40"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.timeOfDay?.[0]} />
        </div>

        <div>
          <FieldLabel htmlFor="notes">Anything we should know?</FieldLabel>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              clearErrors();
            }}
            placeholder="Optional — references, allergies, who it's for…"
            className="mt-3 w-full bg-transparent border-b border-ink/25 py-3 text-ink placeholder:text-stone outline-none focus:border-clay transition-colors duration-300 resize-none"
          />
          <FieldError message={errors.notes?.[0]} />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group mt-9 inline-flex items-center gap-4 bg-clay text-canvas px-8 py-4 text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-300 hover:bg-clay-deep disabled:opacity-60"
      >
        {pending ? "Sending request…" : "Send booking request"}
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          ↗
        </span>
      </button>

      <p className="mt-5 max-w-md text-stone text-[0.78rem] leading-relaxed">
        This sends a request to the {location.label} team — it doesn&apos;t lock
        a time slot. We&apos;ll call you to confirm. Prefer to talk now?{" "}
        <a
          href={whatsappLink(
            location,
            `Hi, I'd like to book ${service.name} at ${location.label}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-olive underline underline-offset-4 hover:text-ink"
        >
          WhatsApp us
        </a>
        .
      </p>
    </fieldset>
  );
}

/* ── Confirmation ─────────────────────────────────────────── */
function Confirmation({
  booking,
}: {
  booking: Extract<BookingState, { status: "success" }>["booking"];
}) {
  return (
    <section className="bg-canvas min-h-dvh flex items-center px-gutter py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-xl"
      >
        <span className="text-clay text-[0.62rem] tracking-[0.24em] uppercase">
          (Request received)
        </span>
        <h1
          className="mt-5 font-display font-light text-ink tracking-[-0.02em] leading-[0.98]"
          style={{ fontSize: "clamp(2.25rem, 7vw, 4rem)" }}
        >
          Thank you — we&apos;ve <span className="italic text-clay">got it.</span>
        </h1>

        <p className="mt-8 text-ink/75 text-[1.05rem] leading-relaxed">
          We&apos;ve received your request for{" "}
          <span className="text-ink font-medium">{booking.serviceName}</span> at{" "}
          <span className="text-ink font-medium">{booking.locationLabel}</span>{" "}
          on{" "}
          <span className="text-ink font-medium">{booking.date}</span> (
          {booking.timeOfDay.toLowerCase()}) — we&apos;ll call you on{" "}
          <span className="text-ink font-medium">{booking.phone}</span> to
          confirm.
        </p>

        <p className="mt-5 text-stone text-[0.85rem] leading-relaxed">
          Just so it&apos;s clear: this is a request, not a locked-in slot. Your
          time is confirmed once we&apos;ve spoken.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-10 inline-flex items-center gap-3 border border-ink/25 px-7 py-3.5 text-[0.7rem] tracking-[0.2em] uppercase text-ink hover:border-ink transition-colors"
        >
          Make another request
        </button>
      </motion.div>
    </section>
  );
}

/* ── Small shared bits ────────────────────────────────────── */
function Legend({
  num,
  title,
  subtitle,
  onBack,
}: {
  num: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.16em] uppercase text-stone hover:text-ink transition-colors"
        >
          ← Back
        </button>
      )}
      <div className="flex items-baseline gap-3">
        <span className="text-stone text-[0.62rem] tabular-nums tracking-[0.2em]">
          {num}
        </span>
        {subtitle && (
          <span className="text-stone text-[0.62rem] tracking-[0.2em] uppercase">
            {subtitle}
          </span>
        )}
      </div>
      <h2
        className="mt-2 font-display font-light text-ink tracking-[-0.01em] leading-[1.02]"
        style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function SummaryCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-3">
      <dt className="text-stone text-[0.58rem] tracking-[0.18em] uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-ink text-[0.85rem] leading-snug">{value}</dd>
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-stone text-[0.62rem] tracking-[0.22em] uppercase"
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-[0.75rem] text-clay">
      {message}
    </p>
  );
}

function TextField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  inputMode,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputMode?: "tel" | "text";
  autoComplete?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        type="text"
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-ink/25 py-3 text-ink placeholder:text-stone outline-none focus:border-clay transition-colors duration-300"
        aria-invalid={Boolean(error)}
      />
      <FieldError message={error} />
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.05-.97.23-3.27-.68-2.76-1.09-4.5-3.91-4.64-4.09-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.94-2.25.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.39-.06.6.46.24.59.82 2.03.89 2.18.07.15.12.32.02.5-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.93 1.93 1.22 2.21 1.36.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.6-.13.24.09 1.55.73 1.81.87.27.13.45.2.51.31.07.11.07.63-.17 1.31Z" />
    </svg>
  );
}
