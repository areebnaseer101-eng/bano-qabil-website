import { useState, useCallback } from 'react';
import { CartProvider, useCart } from './store';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopByOccasion } from './components/ShopByOccasion';
import { Collections } from './components/Collections';
import { BouquetBuilder } from './components/BouquetBuilder';
import { GiftAddons } from './components/GiftAddons';
import { Reviews } from './components/Reviews';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PetalFall } from './components/PetalFall';
import { OCCASIONS } from './data';

function AppContent() {
  const [occasionFilter, setOccasionFilter] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { setIsOpen } = useCart();

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOccasionFilter = useCallback((occasionId: string) => {
    setOccasionFilter(occasionId);
    setTimeout(() => {
      document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleCheckout = useCallback(() => {
    setCheckoutOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-plum-50 transition-colors duration-400">
      <PetalFall />
      <Navbar onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <ShopByOccasion occasions={OCCASIONS} onFilter={handleOccasionFilter} />
        <Collections occasionFilter={occasionFilter} onClearFilter={() => setOccasionFilter(null)} />
        <BouquetBuilder />
        <GiftAddons />
        <Reviews />
        <About />
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />
      <CartDrawer onCheckout={handleCheckout} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
