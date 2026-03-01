import { useCustomerPhotos } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@tanstack/react-router';
import { Quote } from 'lucide-react';

export default function Gallery() {
  const { data: photos, isLoading } = useCustomerPhotos();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-24 px-6 bg-foreground text-center">
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[var(--gold-light)] mb-4">
          Client Transformations
        </p>
        <h1 className="font-serif text-6xl font-light text-white mb-6">Our Gallery</h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
          <div className="w-1 h-1 rounded-full bg-[var(--gold-light)]" />
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
        </div>
        <p className="font-sans text-sm text-white/60 max-w-md mx-auto leading-relaxed">
          Real transformations, real stories. Browse the work of our master stylists.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border border-border">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-5">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : photos && photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <article
                  key={String(photo.id)}
                  className="group border border-border bg-card hover:border-[var(--gold)]/40 transition-colors duration-300 overflow-hidden"
                >
                  {/* Photo */}
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={photo.photo.getDirectURL()}
                      alt={`${photo.customerName}'s transformation`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-[var(--gold)] mb-1">
                      Client
                    </p>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-3">
                      {photo.customerName}
                    </h3>

                    {photo.review && (
                      <div className="flex gap-2">
                        <Quote size={12} strokeWidth={1.5} className="text-[var(--gold)]/60 flex-shrink-0 mt-0.5" />
                        <p className="font-sans text-xs text-muted-foreground leading-relaxed italic">
                          {photo.review}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-6 border border-[var(--gold)]/30 flex items-center justify-center">
                <Quote size={20} strokeWidth={1.5} className="text-[var(--gold)]/50" />
              </div>
              <h2 className="font-serif text-3xl font-light text-foreground mb-4">
                Gallery Coming Soon
              </h2>
              <div className="h-px w-10 bg-[var(--gold)] mx-auto mb-6" />
              <p className="font-sans text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                We're building our portfolio of transformations. Be among the first to experience The Blush.
              </p>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
              >
                Book Appointment
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
