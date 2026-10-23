import { Sparkles, ArrowRight, Flower2 } from 'lucide-react';
import { IMAGES, BUSINESS_INFO } from '../data';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src={IMAGES.hero}
          alt="Luxury flower bouquet arrangement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-plum-900/40 via-roseblush-900/30 to-plum-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-900/50 via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] w-24 h-24 rounded-full bg-roseblush-300/20 blur-2xl animate-float" />
      <div className="absolute bottom-32 left-[8%] w-32 h-32 rounded-full bg-champagne-300/20 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 left-[15%] w-16 h-16 rounded-full bg-roseblush-200/20 blur-xl animate-float" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20 pb-10">
        <div className="animate-fade-in-down mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-champagne-300" />
          <span className="font-script text-2xl md:text-3xl text-champagne-200">
            {BUSINESS_INFO.tagline}
          </span>
          <Sparkles className="w-5 h-5 text-champagne-300" />
        </div>

        <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-[1.1] mb-6 [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
          Design Your
          <br />
          <span className="text-gradient-gold italic">Dream Bouquet</span>
        </h1>

        <p className="animate-fade-in-up text-base md:text-lg text-roseblush-100/90 max-w-2xl mx-auto mb-8 leading-relaxed [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
          Create a bouquet as unique as your feelings. Choose your favorite flowers,
          colors, wrapping and finishing touches — all handcrafted with love.
        </p>

        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
          <button
            onClick={() => onNavigate('builder')}
            className="btn-primary group"
          >
            <Flower2 className="w-4 h-4" />
            Customize Your Bouquet
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-300 ease-elegant"
          >
            Explore Collections
          </button>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-in grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto [animation-delay:0.8s] opacity-0 [animation-fill-mode:forwards]">
          {[
            { num: '500+', label: 'Bouquets Crafted' },
            { num: '50+', label: 'Flower Varieties' },
            { num: '4.9★', label: 'Customer Rating' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl text-white font-semibold">{s.num}</div>
              <div className="text-xs text-roseblush-100/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}
