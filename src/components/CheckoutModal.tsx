import { useState } from 'react';
import { X, MessageCircle, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../store';
import { WHATSAPP_NUMBER, formatPKR, BUSINESS_INFO } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your name';
    if (!phone.trim()) errs.phone = 'Please enter your phone number';
    else if (phone.replace(/\D/g, '').length < 10) errs.phone = 'Please enter a valid phone number';
    if (!address.trim()) errs.address = 'Please enter delivery address';
    if (!deliveryDate) errs.deliveryDate = 'Please select a delivery date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push('*Bloom & Bliss — New Order*');
    lines.push('');
    lines.push('*Customer Details:*');
    lines.push(`Name: ${customerName}`);
    lines.push(`Phone: ${phone}`);
    lines.push(`Address: ${address}`);
    lines.push(`Delivery Date: ${deliveryDate}`);
    if (notes.trim()) lines.push(`Notes: ${notes}`);
    lines.push('');
    lines.push('*Order Items:*');
    items.forEach((item, i) => {
      lines.push(`${i + 1}. ${item.name} ${item.details ? `(${item.details})` : ''}`);
      lines.push(`   Qty: ${item.quantity} × ${formatPKR(item.price)} = ${formatPKR(item.price * item.quantity)}`);
    });
    lines.push('');
    lines.push(`*Estimated Total: ${formatPKR(subtotal)}*`);
    lines.push('');
    lines.push('_Note: This is an order request. Payment will be discussed on WhatsApp._');
    return encodeURIComponent(lines.join('\n'));
  };

  const handleWhatsAppOrder = () => {
    if (!validate()) return;
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      clearCart();
      setCustomerName('');
      setPhone('');
      setAddress('');
      setDeliveryDate('');
      setNotes('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-plum-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative glass-strong rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {success ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-semibold mb-3">Order Sent!</h2>
            <p className="text-plum-400 dark:text-plum-800">
              Your order has been opened in WhatsApp. Please press send to confirm your order with us.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 glass-strong z-10 flex items-center justify-between p-5 border-b border-roseblush-200 dark:border-plum-300">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-roseblush-500" />
                <h2 className="font-display text-xl font-semibold">Checkout</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="p-2 rounded-full hover:bg-roseblush-100 dark:hover:bg-plum-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 md:p-6">
              {/* Order summary */}
              <div className="glass rounded-2xl p-4 mb-6">
                <h3 className="font-display text-sm font-semibold mb-3 uppercase tracking-wider text-plum-500 dark:text-plum-800">
                  Order Summary
                </h3>
                {items.length === 0 ? (
                  <p className="text-sm text-plum-400 dark:text-plum-800">Your cart is empty.</p>
                ) : (
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.cartId} className="flex items-center gap-3 text-sm">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-xs text-plum-400 dark:text-plum-800">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-roseblush-600 dark:text-roseblush-400">
                          {formatPKR(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-3 border-t border-roseblush-200 dark:border-plum-300">
                      <span className="font-semibold">Estimated Total</span>
                      <span className="font-display text-lg font-bold text-roseblush-600 dark:text-roseblush-400">
                        {formatPKR(subtotal)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className={`input-field ${errors.customerName ? 'border-roseblush-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={`input-field ${errors.phone ? 'border-roseblush-500' : ''}`}
                    placeholder="+92 300 0000000"
                  />
                  {errors.phone && (
                    <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Delivery Date *</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className={`input-field ${errors.deliveryDate ? 'border-roseblush-500' : ''}`}
                  />
                  {errors.deliveryDate && (
                    <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.deliveryDate}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1.5">Delivery Address *</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={2}
                    className={`input-field ${errors.address ? 'border-roseblush-500' : ''}`}
                    placeholder="House #, Street, Area, City"
                  />
                  {errors.address && (
                    <p className="text-xs text-roseblush-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.address}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1.5">Order Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={2}
                    className="input-field"
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </div>

              {/* Info note */}
              <div className="bg-champagne-100 dark:bg-plum-300 rounded-xl p-4 mt-5 text-xs text-plum-600 dark:text-plum-800 leading-relaxed">
                <strong>Please note:</strong> Clicking "Order on WhatsApp" will open WhatsApp with your order details pre-filled.
                Payment is not processed automatically — we'll confirm your order and arrange payment on WhatsApp.
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={items.length === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-elegant disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Order on WhatsApp
                </button>
                <button
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Continue Shopping
                </button>
              </div>

              <p className="text-center text-xs text-plum-400 dark:text-plum-800 mt-4">
                Orders are sent to {BUSINESS_INFO.name} via WhatsApp
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
