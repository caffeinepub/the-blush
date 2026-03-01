import { Link } from '@tanstack/react-router';
import { Scissors, Clock, Star, MapPin, Phone, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: <Scissors size={20} strokeWidth={1.5} />,
    title: 'Expert Stylists',
    desc: 'Over a decade of mastery in cuts, color, and transformative treatments.',
  },
  {
    icon: <Star size={20} strokeWidth={1.5} />,
    title: 'Premium Products',
    desc: 'We use only the finest professional-grade products for lasting results.',
  },
  {
    icon: <Clock size={20} strokeWidth={1.5} />,
    title: 'Open Every Day',
    desc: 'Available 9:30 AM to 10:00 PM, seven days a week for your convenience.',
  },
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    title: 'Prime Location',
    desc: 'Conveniently located at Monarch Luxuria Towers, Sector-18, Kharghar.',
  },
];

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '5000+', label: 'Happy Clients' },
  { value: '4', label: 'Signature Services' },
  { value: '2', label: 'Master Stylists' },
];

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/hero-blush.dim_1920x1080.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/55" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
          {/* Eyebrow */}
          <p className="font-sans text-[0.65rem] tracking-[0.35em] uppercase font-semibold text-[var(--gold-light)] mb-6">
            Salon & Studio · Kharghar
          </p>

          {/* Headline */}
          <h1 className="font-serif text-6xl md:text-8xl font-light text-white leading-none tracking-wide mb-6">
            The Blush
          </h1>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-[var(--gold-light)]/60" />
            <Scissors size={14} className="text-[var(--gold-light)]" strokeWidth={1.5} />
            <div className="h-px w-16 bg-[var(--gold-light)]/60" />
          </div>

          {/* Subheading */}
          <p className="font-sans text-sm md:text-base tracking-[0.12em] text-white/75 font-light max-w-lg mx-auto mb-10 leading-relaxed">
            Where artistry meets elegance. Premium hair care and styling crafted for those who appreciate the finest.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300 min-w-[180px] text-center"
            >
              Book Appointment
            </Link>
            <Link
              to="/services"
              className="font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 border border-white/50 text-white hover:bg-white/10 transition-colors duration-300 min-w-[180px] text-center"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-light text-[var(--gold-light)] mb-1">{stat.value}</p>
              <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-background/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold)] mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-5xl font-light text-foreground leading-tight mb-6">
              Crafting Beauty<br />
              <em>with Precision</em>
            </h2>
            <div className="h-px w-12 bg-[var(--gold)] mb-8" />
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              The Blush is more than a salon — it is a sanctuary where skilled artistry and genuine care converge. Our master stylists bring over a decade of expertise to every appointment, ensuring each client leaves feeling transformed and confident.
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10">
              From precision haircuts to luxurious treatments, every service is delivered with meticulous attention to detail and a deep commitment to your satisfaction.
            </p>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase font-semibold text-[var(--gold)] hover:gap-3 transition-all duration-200"
            >
              Meet Our Team <ChevronRight size={14} />
            </Link>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 border border-border bg-card hover:border-[var(--gold)]/40 transition-colors duration-300 group"
              >
                <div className="text-[var(--gold)] mb-4 group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">{f.title}</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/section-bg.dim_1440x400.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[var(--gold-light)] mb-4">
            Our Offerings
          </p>
          <h2 className="font-serif text-5xl font-light text-white mb-6">
            Signature Services
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[var(--gold-light)]/50" />
            <div className="w-1 h-1 rounded-full bg-[var(--gold-light)]" />
            <div className="h-px w-12 bg-[var(--gold-light)]/50" />
          </div>
          <p className="font-sans text-sm text-white/65 leading-relaxed mb-10 max-w-xl mx-auto">
            From classic cuts to transformative color and rejuvenating treatments — every service is a masterpiece.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
          >
            View All Services <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-24 px-6 bg-[var(--cream-dark)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold)] mb-4">
            Client Transformations
          </p>
          <h2 className="font-serif text-5xl font-light text-foreground mb-6">
            Our Gallery
          </h2>
          <div className="h-px w-12 bg-[var(--gold)] mx-auto mb-8" />
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            Browse real transformations from our valued clients. Every photo tells a story of confidence and artistry.
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            View Gallery <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold)] mb-4">
              Find Us
            </p>
            <h2 className="font-serif text-5xl font-light text-foreground mb-4">Visit The Blush</h2>
            <div className="h-px w-12 bg-[var(--gold)] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-10 h-10 flex-shrink-0 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
                  <MapPin size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-1">Address</p>
                  <address className="not-italic font-sans text-sm text-muted-foreground leading-relaxed">
                    Shop No. 5, Monarch Luxuria Towers<br />
                    Plot No. 6, Sector-18, Kharghar<br />
                    Navi Mumbai
                  </address>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-10 h-10 flex-shrink-0 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
                  <Clock size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-1">Hours</p>
                  <p className="font-sans text-sm text-muted-foreground">Open Every Day</p>
                  <p className="font-sans text-sm text-muted-foreground">9:30 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-10 h-10 flex-shrink-0 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
                  <Phone size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-1">Appointments</p>
                  <p className="font-sans text-sm text-muted-foreground">Walk-ins welcome</p>
                  <Link
                    to="/book"
                    className="font-sans text-xs tracking-[0.15em] uppercase font-semibold text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors"
                  >
                    Book Online →
                  </Link>
                </div>
              </div>
            </div>

            <div className="border border-border p-8 bg-card">
              <p className="font-serif text-2xl font-light text-foreground italic mb-4">
                "Every visit is a moment of transformation."
              </p>
              <div className="h-px w-8 bg-[var(--gold)] mb-4" />
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-6">
                We believe beauty is not just about appearance — it's about how you feel. Our team is dedicated to making every appointment an experience worth remembering.
              </p>
              <Link
                to="/book"
                className="font-sans text-xs tracking-[0.18em] uppercase font-semibold px-8 py-3 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300 inline-block"
              >
                Reserve Your Spot
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
