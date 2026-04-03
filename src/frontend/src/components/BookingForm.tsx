import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  useBookAppointment,
  useServices,
  useStaffMembers,
} from "../hooks/useQueries";

interface FormData {
  clientName: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
}

interface FormErrors {
  clientName?: string;
  serviceId?: string;
  staffId?: string;
  date?: string;
  time?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.clientName.trim()) errors.clientName = "Name is required";
  if (!data.serviceId) errors.serviceId = "Please select a service";
  if (!data.staffId) errors.staffId = "Please select a stylist";
  if (!data.date) errors.date = "Please select a date";
  if (!data.time) errors.time = "Please select a time";
  return errors;
}

const inputClass =
  "w-full font-sans text-sm bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--gold)] transition-colors duration-200";

const labelClass =
  "block font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-muted-foreground mb-2";

const errorClass =
  "font-sans text-xs text-destructive mt-1.5 flex items-center gap-1";

export default function BookingForm() {
  const [form, setForm] = useState<FormData>({
    clientName: "",
    serviceId: "",
    staffId: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmedId, setConfirmedId] = useState<bigint | null>(null);

  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: staff, isLoading: staffLoading } = useStaffMembers();
  const bookMutation = useBookAppointment();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const datetimeMs = new Date(`${form.date}T${form.time}`).getTime();
    const datetimeNs = BigInt(datetimeMs) * 1_000_000n;

    try {
      const id = await bookMutation.mutateAsync({
        clientName: form.clientName,
        serviceId: BigInt(form.serviceId),
        staffId: BigInt(form.staffId),
        datetime: datetimeNs,
      });
      setConfirmedId(id);
    } catch {
      // error shown via bookMutation.error
    }
  };

  if (confirmedId !== null) {
    const service = services?.find((s) => String(s.id) === form.serviceId);
    const stylist = staff?.find((s) => String(s.id) === form.staffId);

    return (
      <div className="border border-[var(--gold)]/30 bg-card p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-[var(--gold)]/40">
          <CheckCircle
            size={24}
            strokeWidth={1.5}
            className="text-[var(--gold)]"
          />
        </div>
        <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold)] mb-3">
          Confirmed
        </p>
        <h3 className="font-serif text-3xl font-light text-foreground mb-2">
          Appointment Booked
        </h3>
        <div className="h-px w-8 bg-[var(--gold)] mx-auto mb-6" />

        <div className="text-left border border-border p-6 mb-8 space-y-3">
          <div className="flex justify-between">
            <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
              Client
            </span>
            <span className="font-sans text-sm text-foreground font-medium">
              {form.clientName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
              Service
            </span>
            <span className="font-sans text-sm text-foreground font-medium">
              {service?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
              Stylist
            </span>
            <span className="font-sans text-sm text-foreground font-medium">
              {stylist?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
              Date & Time
            </span>
            <span className="font-sans text-sm text-foreground font-medium">
              {new Date(`${form.date}T${form.time}`).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
              Booking ID
            </span>
            <span className="font-sans text-sm text-foreground font-medium">
              #{String(confirmedId)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              setConfirmedId(null);
              setForm({
                clientName: "",
                serviceId: "",
                staffId: "",
                date: "",
                time: "",
              });
            }}
            className="font-sans text-xs tracking-[0.18em] uppercase font-semibold px-8 py-3 border border-border text-foreground hover:bg-muted transition-colors"
          >
            New Booking
          </button>
          <Link
            to="/admin"
            className="font-sans text-xs tracking-[0.18em] uppercase font-semibold px-8 py-3 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors text-center"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Client Name */}
      <div>
        <label htmlFor="client-name" className={labelClass}>
          Your Name
        </label>
        <input
          id="client-name"
          type="text"
          placeholder="Enter your full name"
          value={form.clientName}
          onChange={(e) => handleChange("clientName", e.target.value)}
          className={`${inputClass} ${errors.clientName ? "border-destructive" : ""}`}
        />
        {errors.clientName && (
          <p className={errorClass}>
            <AlertCircle size={12} /> {errors.clientName}
          </p>
        )}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service-select" className={labelClass}>
          Service
        </label>
        {servicesLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <select
            id="service-select"
            value={form.serviceId}
            onChange={(e) => handleChange("serviceId", e.target.value)}
            className={`${inputClass} ${errors.serviceId ? "border-destructive" : ""}`}
          >
            <option value="">Select a service</option>
            {services?.map((s) => (
              <option key={String(s.id)} value={String(s.id)}>
                {s.name} — ₹{s.price.toFixed(0)} ({Number(s.duration)} min)
              </option>
            ))}
          </select>
        )}
        {errors.serviceId && (
          <p className={errorClass}>
            <AlertCircle size={12} /> {errors.serviceId}
          </p>
        )}
      </div>

      {/* Staff */}
      <div>
        <label htmlFor="stylist-select" className={labelClass}>
          Stylist
        </label>
        {staffLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <select
            id="stylist-select"
            value={form.staffId}
            onChange={(e) => handleChange("staffId", e.target.value)}
            className={`${inputClass} ${errors.staffId ? "border-destructive" : ""}`}
          >
            <option value="">Select a stylist</option>
            {staff?.map((s) => (
              <option key={String(s.id)} value={String(s.id)}>
                {s.name} — {s.role}
              </option>
            ))}
          </select>
        )}
        {errors.staffId && (
          <p className={errorClass}>
            <AlertCircle size={12} /> {errors.staffId}
          </p>
        )}
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-date" className={labelClass}>
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={`${inputClass} ${errors.date ? "border-destructive" : ""}`}
          />
          {errors.date && (
            <p className={errorClass}>
              <AlertCircle size={12} /> {errors.date}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="booking-time" className={labelClass}>
            Time
          </label>
          <input
            id="booking-time"
            type="time"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className={`${inputClass} ${errors.time ? "border-destructive" : ""}`}
          />
          {errors.time && (
            <p className={errorClass}>
              <AlertCircle size={12} /> {errors.time}
            </p>
          )}
        </div>
      </div>

      {/* Mutation Error */}
      {bookMutation.isError && (
        <div className="flex items-start gap-3 p-4 border border-destructive/30 bg-destructive/5">
          <AlertCircle
            size={14}
            className="text-destructive mt-0.5 flex-shrink-0"
          />
          <p className="font-sans text-xs text-destructive leading-relaxed">
            {bookMutation.error instanceof Error
              ? bookMutation.error.message
              : "Failed to book appointment. Please try again."}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={bookMutation.isPending}
        className="w-full font-sans text-xs tracking-[0.2em] uppercase font-semibold py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {bookMutation.isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Booking...
          </>
        ) : (
          "Confirm Appointment"
        )}
      </button>
    </form>
  );
}
