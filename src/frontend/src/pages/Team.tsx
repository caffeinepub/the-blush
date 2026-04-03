import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import type { Staff } from "../backend";
import { useStaffMembers } from "../hooks/useQueries";

function StaffCard({ staff }: { staff: Staff }) {
  const initials = staff.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <article className="border border-border bg-card p-10 hover:border-[var(--gold)]/40 transition-colors duration-300">
      {/* Avatar */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-16 h-16 flex-shrink-0 bg-foreground flex items-center justify-center">
          <span className="font-serif text-xl font-medium text-[var(--gold-light)]">
            {initials}
          </span>
        </div>
        <div>
          <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-1">
            {staff.role}
          </p>
          <h3 className="font-serif text-3xl font-medium text-foreground">
            {staff.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-px w-6 bg-[var(--gold)]/50" />
            <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground font-medium">
              10+ Years Experience
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="font-serif text-base italic text-muted-foreground leading-relaxed mb-8">
        "{staff.bio}"
      </p>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-border" />
        <div className="w-1 h-1 rounded-full bg-[var(--gold)]" />
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2">
        {["Haircut", "Styling", "Coloring", "Treatment"].map((tag) => (
          <span
            key={tag}
            className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-medium px-3 py-1 border border-[var(--gold)]/30 text-[var(--gold)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function StaffSkeleton() {
  return (
    <div className="border border-border p-10">
      <div className="flex items-start gap-6 mb-8">
        <Skeleton className="w-16 h-16 flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-8" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export default function Team() {
  const { data: staff, isLoading } = useStaffMembers();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-24 px-6 bg-foreground text-center">
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[var(--gold-light)] mb-4">
          The Artists
        </p>
        <h1 className="font-serif text-6xl font-light text-white mb-6">
          Our Team
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
          <div className="w-1 h-1 rounded-full bg-[var(--gold-light)]" />
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
        </div>
        <p className="font-sans text-sm text-white/60 max-w-md mx-auto leading-relaxed">
          Masters of their craft, dedicated to making you look and feel
          extraordinary.
        </p>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              <StaffSkeleton />
              <StaffSkeleton />
            </div>
          ) : staff && staff.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {staff.map((member) => (
                <StaffCard key={String(member.id)} staff={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-muted-foreground">
                Team information coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-6 bg-[var(--cream-dark)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-serif text-5xl text-[var(--gold)]/30 mb-4">
            "
          </div>
          <blockquote className="font-serif text-2xl font-light italic text-foreground leading-relaxed mb-6">
            Beauty begins the moment you decide to be yourself.
          </blockquote>
          <div className="h-px w-10 bg-[var(--gold)] mx-auto mb-4" />
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            The Blush Philosophy
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-background text-center">
        <h2 className="font-serif text-4xl font-light text-foreground mb-4">
          Book with Our Experts
        </h2>
        <div className="h-px w-10 bg-[var(--gold)] mx-auto mb-6" />
        <p className="font-sans text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Experience the difference that true mastery makes. Reserve your
          appointment today.
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
}
