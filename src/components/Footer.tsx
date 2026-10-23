import { useState } from 'react';
import { Flower2, Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, Send, Check, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const quickLinks = [
    { label: 'Home', section: 'hero' },
    { label: 'Occasions', section: 'occasions' },
    { label: 'Collections', section: 'collections' },
    { label: 'Customize', section: 'builder' },
    { label: 'Add-ons', section: 'addons' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <footer className="bg-plum-50 dark:bg-plum-50 border-t border-roseblush-200 dark:border-plum-300">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          <span className="section-label">Stay in Bloom</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-3">
            Join Our Newsletter
          </h3>
          <p className="text-sm text-plum-400 dark:text-plum-800 max-w-md mx-auto mb-6">
            Subscribe for seasonal collections, exclusive offers, and floral inspiration delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-sage-600">
              <Check className="w-5 h-5" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field flex-1"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="w-7 h-7 text-roseblush-500" />
              <span className="font-display text-xl font-semibold">
                <span className="text-gradient-blush">Bloom</span>
                <span className="text-champagne-600 dark:text-champagne-400"> & Bliss</span>
              </span>
            </div>
            <p className="text-xs text-plum-400 dark:text-plum-800 leading-relaxed mb-4">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a href={BUSINESS_INFO.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-roseblush-100 dark:hover:bg-plum-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={BUSINESS_INFO.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-roseblush-100 dark:hover:bg-plum-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={BUSINESS_INFO.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-roseblush-100 dark:hover:bg-plum-300 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map(link => (
                <button
                  key={link.section}
                  onClick={() => onNavigate(link.section)}
                  className="text-sm text-plum-400 dark:text-plum-800 hover:text-roseblush-500 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-plum-400 dark:text-plum-800">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-roseblush-500" />
                <span>{BUSINESS_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-roseblush-500" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-roseblush-500" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider">Business Hours</h4>
            <p className="text-sm text-plum-400 dark:text-plum-800 leading-relaxed">
              {BUSINESS_INFO.hours}
            </p>
            <p className="text-xs text-plum-300 dark:text-plum-700 mt-3">
              Same-day delivery available for orders before 2 PM within Lahore.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-roseblush-200 dark:border-plum-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-plum-400 dark:text-plum-800">
            © {new Date().getFullYear()} Bloom & Bliss. All rights reserved. Made with love.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-xs text-plum-400 dark:text-plum-800 hover:text-roseblush-500 transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
