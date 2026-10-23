import { Occasion as OccasionsProps } from '../data';
import { useReveal } from '../hooks/useReveal';
import { SmartImage } from './SmartImage';

interface ShopByOccasionProps {
  occasions: OccasionsProps[];
  onFilter: (occasionId: string) => void;
}

export function ShopByOccasion({ occasions, onFilter }: ShopByOccasionProps) {
  const { ref, revealed } = useReveal();

  return (
    <section id="occasions" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center mb-14">
          <span className="section-label">Find the Perfect Bouquet</span>
          <h2 className="section-title">Shop by Occasion</h2>
          <p className="text-plum-400 dark:text-plum-800 mt-4 max-w-xl mx-auto">
            Every moment deserves its own expression. Explore curated collections for life's most beautiful celebrations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {occasions.map((occasion, i) => (
            <button
              key={occasion.id}
              onClick={() => onFilter(occasion.id)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden card-hover text-left"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <SmartImage
                src={occasion.image}
                alt={occasion.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-elegant group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/80 via-plum-900/20 to-transparent" />
              <div className="absolute inset-0 bg-roseblush-500/0 group-hover:bg-roseblush-500/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-white font-display text-lg md:text-xl font-medium leading-tight">
                  {occasion.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-roseblush-200 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  Shop Now →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
