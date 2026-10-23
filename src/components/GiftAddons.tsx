import { Plus, Gift } from 'lucide-react';
import { ADDONS, formatPKR, type Addon } from '../data';
import { useCart } from '../store';
import { useReveal } from '../hooks/useReveal';
import { SmartImage } from './SmartImage';

export function GiftAddons() {
  const { addToCart } = useCart();
  const { ref, revealed } = useReveal();

  const handleAdd = (addon: Addon) => {
    addToCart({
      cartId: `addon-${addon.id}`,
      type: 'addon',
      name: addon.name,
      price: addon.price,
      image: addon.image,
    });
  };

  return (
    <section id="addons" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}>
        <div className="text-center mb-14">
          <span className="section-label">Make It Extra Special</span>
          <h2 className="section-title">Gift Add-ons</h2>
          <p className="text-plum-400 dark:text-plum-800 mt-4 max-w-xl mx-auto">
            Pair your bouquet with a thoughtful gift — chocolates, candles, teddy bears and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ADDONS.map((addon, i) => (
            <div
              key={addon.id}
              className="group glass rounded-2xl overflow-hidden card-hover"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={addon.image}
                  alt={addon.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 w-9 h-9 bg-white/80 dark:bg-plum-900/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Gift className="w-4 h-4 text-roseblush-500" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-medium leading-tight mb-1">{addon.name}</h3>
                <p className="text-xs text-plum-400 dark:text-plum-800 leading-relaxed mb-4 line-clamp-2">
                  {addon.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-roseblush-600 dark:text-roseblush-400">
                    {formatPKR(addon.price)}
                  </span>
                  <button
                    onClick={() => handleAdd(addon)}
                    className="inline-flex items-center gap-1.5 bg-roseblush-500 hover:bg-roseblush-600 text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 ease-elegant hover:shadow-lg hover:shadow-roseblush-500/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
