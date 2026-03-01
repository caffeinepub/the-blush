import { Link } from '@tanstack/react-router';
import { Clock, ChevronRight } from 'lucide-react';
import { useServices } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Service } from '../backend';

const categoryIcons: Record<string, string> = {
  Hair: '✂',
  Color: '◈',
  Treatment: '◇',
  Nails: '◉',
  Skin: '◎',
};

const categoryOrder = ['Hair', 'Color', 'Treatment', 'Nails', 'Skin'];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group border border-border bg-card hover:border-[var(--gold)]/50 transition-all duration-300 p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-2">
            {service.category}
          </p>
          <h3 className="font-serif text-2xl font-medium text-foreground">{service.name}</h3>
        </div>
        <span className="font-serif text-3xl font-light text-[var(--gold)] ml-4">
          {categoryIcons[service.category] || '◆'}
        </span>
      </div>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
        {service.description}
      </p>

      <div className="h-px w-full bg-border mb-6" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock size={13} strokeWidth={1.5} />
          <span className="font-sans text-xs tracking-wide">{Number(service.duration)} min</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl font-light text-foreground">
            ₹{service.price.toFixed(0)}
          </span>
          <Link
            to="/book"
            className="font-sans text-[0.65rem] tracking-[0.15em] uppercase font-semibold px-5 py-2 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-200"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}

function ServiceSkeleton() {
  return (
    <div className="border border-border p-8">
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="h-7 w-32 mb-6" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <div className="h-px w-full bg-border mb-6" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

export default function Services() {
  const { data: services, isLoading } = useServices();

  const grouped = services
    ? categoryOrder.reduce<Record<string, Service[]>>((acc, cat) => {
        const items = services.filter((s) => s.category === cat);
        if (items.length > 0) acc[cat] = items;
        return acc;
      }, {})
    : {};

  const uncategorized = services
    ? services.filter((s) => !categoryOrder.includes(s.category))
    : [];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-24 px-6 bg-foreground text-background text-center">
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[var(--gold-light)] mb-4">
          What We Offer
        </p>
        <h1 className="font-serif text-6xl font-light text-white mb-6">Our Services</h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
          <div className="w-1 h-1 rounded-full bg-[var(--gold-light)]" />
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
        </div>
        <p className="font-sans text-sm text-white/60 max-w-md mx-auto leading-relaxed">
          Each service is a carefully crafted experience, delivered with precision and care.
        </p>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ServiceSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="flex items-center gap-4 mb-8">
                    <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold)]">
                      {category}
                    </p>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map((service) => (
                      <ServiceCard key={String(service.id)} service={service} />
                    ))}
                  </div>
                </div>
              ))}

              {uncategorized.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold)]">
                      Other
                    </p>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {uncategorized.map((service) => (
                      <ServiceCard key={String(service.id)} service={service} />
                    ))}
                  </div>
                </div>
              )}

              {services && services.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-serif text-2xl text-muted-foreground">No services available yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--cream-dark)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-light text-foreground mb-4">
            Ready to Transform?
          </h2>
          <div className="h-px w-10 bg-[var(--gold)] mx-auto mb-6" />
          <p className="font-sans text-sm text-muted-foreground mb-8 leading-relaxed">
            Book your appointment today and experience the artistry of The Blush.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
          >
            Book Now <ChevronRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
