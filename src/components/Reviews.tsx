import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data';
import { useReveal } from '../hooks/useReveal';
import { SmartImage } from './SmartImage';

export function Reviews() {
  const { ref, revealed } = useReveal();

  return (
    <section id="reviews" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 dark:bg-plum-100">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}>
        <div className="text-center mb-14">
          <span className="section-label">Loved by Our Customers</span>
          <h2 className="section-title">Customer Reviews</h2>
          <p className="text-plum-400 dark:text-plum-800 mt-4 max-w-xl mx-auto">
            These are sample testimonials shared to illustrate the Bloom & Bliss experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className="group glass rounded-2xl p-6 card-hover"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <SmartImage
                    src={review.photo}
                    alt={review.name}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover border-2 border-champagne-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-roseblush-500 rounded-full flex items-center justify-center">
                    <Quote className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-display text-lg font-medium">{review.name}</h4>
                    <span className="text-xs text-plum-400 dark:text-plum-800">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${idx < review.rating ? 'fill-champagne-400 text-champagne-400' : 'text-plum-200'}`}
                      />
                    ))}
                    <span className="text-xs text-plum-400 dark:text-plum-800 ml-1.5">• {review.occasion}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mt-4 text-plum-600 dark:text-plum-900">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-plum-400 dark:text-plum-800 mt-8 italic">
          These are sample testimonials for demonstration purposes, not verified customer reviews.
        </p>
      </div>
    </section>
  );
}
