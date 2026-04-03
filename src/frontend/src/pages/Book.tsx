import { CheckCircle, Clock, Lightbulb, MapPin } from "lucide-react";
import BookingForm from "../components/BookingForm";

export default function Book() {
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/book-banner.dim_1920x600.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-foreground/65" />
        <div className="relative z-10 text-center px-6">
          <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[var(--gold-light)] mb-3">
            Reserve Your Experience
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-white">
            Book Appointment
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-10 bg-[var(--gold-light)]/50" />
            <div className="w-1 h-1 rounded-full bg-[var(--gold-light)]" />
            <div className="h-px w-10 bg-[var(--gold-light)]/50" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-2">
                Your Appointment
              </p>
              <h2 className="font-serif text-3xl font-light text-foreground">
                Fill in Your Details
              </h2>
              <div className="h-px w-8 bg-[var(--gold)] mt-4" />
            </div>
            <BookingForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* What to Expect */}
            <div className="border border-border p-8 bg-card">
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-4">
                What to Expect
              </p>
              <ul className="space-y-4">
                {[
                  "Personalized consultation on arrival",
                  "Premium products tailored to your hair",
                  "Expert styling by our master stylists",
                  "Complimentary finishing touches",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={14}
                      strokeWidth={1.5}
                      className="text-[var(--gold)] mt-0.5 flex-shrink-0"
                    />
                    <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="border border-border p-8 bg-card">
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-4">
                Location
              </p>
              <div className="flex gap-3 mb-4">
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--gold)] mt-0.5 flex-shrink-0"
                />
                <address className="not-italic font-sans text-xs text-muted-foreground leading-relaxed">
                  Shop No. 5, Monarch Luxuria Towers
                  <br />
                  Plot No. 6, Sector-18, Kharghar
                  <br />
                  Navi Mumbai
                </address>
              </div>
              <div className="flex gap-3">
                <Clock
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--gold)] mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Open Every Day
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    9:30 AM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Tip */}
            <div className="border border-[var(--gold)]/30 p-8 bg-[var(--cream-dark)]">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--gold)]"
                />
                <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)]">
                  Pro Tip
                </p>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Arrive 5–10 minutes early for a relaxed consultation. For color
                services, avoid washing your hair 24 hours before your
                appointment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
