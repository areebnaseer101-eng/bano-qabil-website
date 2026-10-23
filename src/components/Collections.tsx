import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, Plus } from 'lucide-react';
import { PRODUCTS, formatPKR, OCCASIONS, type Product } from '../data';
import { useCart } from '../store';
import { useReveal } from '../hooks/useReveal';
import { SmartImage } from './SmartImage';

interface CollectionsProps {
  occasionFilter: string | null;
  onClearFilter: () => void;
}

type SortOption = 'featured' | 'price-low' | 'price-high';

export function Collections({ occasionFilter, onClearFilter }: CollectionsProps) {
  const { addToCart } = useCart();
  const { ref, revealed } = useReveal();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('featured');
  const [occasion, setOccasion] = useState<string | null>(occasionFilter);
  const [priceRange, setPriceRange] = useState<'all' | 'under5k' | '5k-10k' | 'over10k'>('all');

  // Sync with external filter
  useMemo(() => {
    setOccasion(occasionFilter);
  }, [occasionFilter]);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (occasion) {
      result = result.filter(p => p.occasions.includes(occasion));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (priceRange === 'under5k') result = result.filter(p => p.price < 5000);
    else if (priceRange === '5k-10k') result = result.filter(p => p.price >= 5000 && p.price <= 10000);
    else if (priceRange === 'over10k') result = result.filter(p => p.price > 10000);

    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [occasion, search, sort, priceRange]);

  const handleAdd = (product: Product) => {
    addToCart({
      cartId: `product-${product.id}`,
      type: 'product',
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const occasionName = OCCASIONS.find(o => o.id === occasion)?.name;

  return (
    <section id="collections" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 dark:bg-plum-100">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}>
        <div className="text-center mb-10">
          <span className="section-label">Handcrafted with Love</span>
          <h2 className="section-title">Flower Collections</h2>
          <p className="text-plum-400 dark:text-plum-800 mt-4 max-w-xl mx-auto">
            From classic roses to luxury preserved boxes — each arrangement is made fresh by our expert florists.
          </p>
        </div>

        {/* Filter bar */}
        <div className="glass rounded-2xl p-4 md:p-5 mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-400 dark:text-plum-800" />
            <input
              type="text"
              placeholder="Search bouquets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
              aria-label="Search products"
            />
          </div>

          {/* Occasion filter */}
          <select
            value={occasion ?? ''}
            onChange={e => {
              setOccasion(e.target.value || null);
              onClearFilter();
            }}
            className="input-field lg:w-48"
            aria-label="Filter by occasion"
          >
            <option value="">All Occasions</option>
            {OCCASIONS.map(o => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>

          {/* Price filter */}
          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value as typeof priceRange)}
            className="input-field lg:w-40"
            aria-label="Filter by price"
          >
            <option value="all">All Prices</option>
            <option value="under5k">Under Rs. 5,000</option>
            <option value="5k-10k">Rs. 5,000 – 10,000</option>
            <option value="over10k">Over Rs. 10,000</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className="input-field lg:w-44"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Active filter banner */}
        {occasion && occasionName && (
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <SlidersHorizontal className="w-4 h-4 text-roseblush-500" />
            <span className="text-sm">
              Showing bouquets for <strong>{occasionName}</strong>
            </span>
            <button
              onClick={() => { setOccasion(null); onClearFilter(); }}
              className="text-xs text-roseblush-500 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="group glass rounded-2xl overflow-hidden card-hover"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-roseblush-500/90 text-white text-[10px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-medium leading-tight mb-1">{product.name}</h3>
                  <p className="text-xs text-plum-400 dark:text-plum-800 leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3 h-3 ${idx < 5 ? 'fill-champagne-400 text-champagne-400' : 'text-plum-200'}`}
                      />
                    ))}
                    <span className="text-[10px] text-plum-400 dark:text-plum-800 ml-1">(5.0)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-semibold text-roseblush-600 dark:text-roseblush-400">
                      {formatPKR(product.price)}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="inline-flex items-center gap-1.5 bg-roseblush-500 hover:bg-roseblush-600 text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 ease-elegant hover:shadow-lg hover:shadow-roseblush-500/30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="font-display text-xl mb-2">No bouquets found</h3>
            <p className="text-sm text-plum-400 dark:text-plum-800 mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setOccasion(null);
                setPriceRange('all');
                onClearFilter();
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
