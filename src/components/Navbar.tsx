import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Moon, Sun, Flower2 } from 'lucide-react';
import { useCart, useTheme } from '../store';
import { BUSINESS_INFO } from '../data';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', section: 'hero' },
  { label: 'Occasions', section: 'occasions' },
  { label: 'Collections', section: 'collections' },
  { label: 'Customize', section: 'builder' },
  { label: 'Add-ons', section: 'addons' },
  { label: 'Reviews', section: 'reviews' },
  { label: 'About', section: 'about' },
  { label: 'Contact', section: 'contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant ${
          scrolled ? 'glass-strong shadow-lg shadow-roseblush-900/5 py-3' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('hero')} className="flex items-center gap-2 group">
            <Flower2 className="w-7 h-7 text-roseblush-500 transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-display text-xl font-semibold tracking-wide">
              <span className="text-gradient-blush">Bloom</span>
              <span className="text-champagne-600 dark:text-champagne-400"> & Bliss</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <button
                key={item.section}
                onClick={() => handleNav(item.section)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full hover:bg-roseblush-100 dark:hover:bg-plum-400 transition-colors duration-300"
            >
              {theme === 'light'
                ? <Moon className="w-5 h-5 text-plum-600" />
                : <Sun className="w-5 h-5 text-champagne-400" />}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-roseblush-100 dark:hover:bg-plum-400 transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-roseblush-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 rounded-full hover:bg-roseblush-100 dark:hover:bg-plum-400 transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-400 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-plum-900/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 glass-strong shadow-2xl p-6 flex flex-col transition-transform duration-400 ease-elegant ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-display text-lg font-semibold text-gradient-blush">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full hover:bg-roseblush-100 dark:hover:bg-plum-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.section}
                onClick={() => handleNav(item.section)}
                className="text-left py-3 px-4 rounded-xl hover:bg-roseblush-100 dark:hover:bg-plum-400 transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-6 border-t border-roseblush-200 dark:border-plum-400">
            <p className="text-xs text-plum-400 dark:text-plum-800">{BUSINESS_INFO.phone}</p>
            <p className="text-xs text-plum-400 dark:text-plum-800 mt-1">{BUSINESS_INFO.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}
