import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Check, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_NUMBER } from '../data';
import { useReveal } from '../hooks/useReveal';

export function Contact() {
  const { ref, revealed } = useReveal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!email.trim()) errs.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email';
    if (!message.trim()) errs.message = 'Please enter a message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const contactItems = [
    { icon: Phone, label: 'Phone', value: BUSINESS_INFO.phone, href: `tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: BUSINESS_INFO.email, href: `mailto:${BUSINESS_INFO.email}` },
    { icon: MapPin, label: 'Address', value: BUSINESS_INFO.address },
    { icon: Clock, label: 'Hours', value: BUSINESS_INFO.hours },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 dark:bg-plum-100">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}>
        <div className="text-center mb-14">
          <span className="section-label">We'd Love to Hear From You</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="text-plum-400 dark:text-plum-800 mt-4 max-w-xl mx-auto">
            Questions, custom requests, or event inquiries — our team is here to help you create the perfect floral moment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {contactItems.map(item => (
              <div key={item.label} className="glass rounded-2xl p-5 flex items-center gap-4 card-hover">
                <div className="w-12 h-12 rounded-full bg-roseblush-100 dark:bg-plum-300 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-roseblush-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-plum-400 dark:text-plum-800">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-sm hover:text-roseblush-500 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ background: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm text-plum-400 dark:text-plum-800">Follow us:</span>
              <a href={BUSINESS_INFO.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-roseblush-100 dark:hover:bg-plum-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={BUSINESS_INFO.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-roseblush-100 dark:hover:bg-plum-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={BUSINESS_INFO.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-roseblush-100 dark:hover:bg-plum-300 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass rounded-2xl p-6 md:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-sage-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-sm text-plum-400 dark:text-plum-800">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`input-field ${errors.name ? 'border-roseblush-500' : ''}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`input-field ${errors.email ? 'border-roseblush-500' : ''}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Message *</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    className={`input-field ${errors.message ? 'border-roseblush-500' : ''}`}
                    placeholder="Tell us about your floral needs..."
                  />
                  {errors.message && <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
