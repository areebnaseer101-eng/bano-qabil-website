import { Heart, Leaf, Sparkles, Award } from 'lucide-react';
import { IMAGES } from '../data';
import { useReveal } from '../hooks/useReveal';
import { SmartImage } from './SmartImage';

export function About() {
  const { ref, revealed } = useReveal();

  const features = [
    { icon: Heart, title: 'Handmade with Love', desc: 'Every bouquet is crafted by hand, petal by petal, with meticulous attention to detail.' },
    { icon: Leaf, title: 'Fresh Daily', desc: 'We source the freshest blooms each morning, ensuring your flowers last longer.' },
    { icon: Sparkles, title: 'Custom Designs', desc: 'No two bouquets are alike — each is tailored to your unique vision and sentiment.' },
    { icon: Award, title: 'Premium Quality', desc: 'Only the finest flowers and materials make it into our arrangements.' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl">
              <SmartImage
                src={IMAGES.about}
                alt="Our florist crafting a bouquet"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-right-8 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-plum-200 hidden sm:block">
              <SmartImage
                src={IMAGES.aboutSecondary}
                alt="Happy customer receiving flowers"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-champagne-200/40 blur-2xl" />
          </div>

          {/* Content */}
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title mb-6">
              Where Every Bloom
              <br />
              <span className="text-gradient-blush italic">Tells a Story</span>
            </h2>
            <div className="space-y-4 text-plum-600 dark:text-plum-900 leading-relaxed">
              <p>
                Bloom & Bliss was born from a simple belief: that flowers are nature's love language.
                What began as a small studio with a passion for petals has blossomed into a boutique
                floral atelier dedicated to creating moments of pure joy.
              </p>
              <p>
                Each bouquet is handcrafted by our skilled florists who treat every stem as a work of art.
                We hand-select the freshest blooms each morning, sourcing from local growers whenever possible,
                and arrange them with an editorial eye for color, texture, and emotion.
              </p>
              <p>
                Whether you're celebrating love, offering comfort, or simply sharing beauty — we're here to
                help you say it with flowers. Every petal, a little piece of love.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map(f => (
                <div key={f.title} className="glass rounded-xl p-4">
                  <f.icon className="w-6 h-6 text-roseblush-500 mb-2" />
                  <h4 className="font-display text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-xs text-plum-400 dark:text-plum-800 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
