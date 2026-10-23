import { useState, useMemo, useCallback } from 'react';
import {
  Flower2, Check, ChevronLeft, ChevronRight, RotateCcw, ShoppingCart,
  User, MessageSquare, Calendar, MapPin, Phone, Eye,
} from 'lucide-react';
import {
  BUILDER_FLOWERS, BUILDER_SIZES, BUILDER_COLORS, BUILDER_WRAPPING,
  BUILDER_FINISHES, COLOR_PREVIEW, formatPKR,
  type BuilderOption, type CustomBouquetData,
} from '../data';
import { useCart, type CartItem } from '../store';
import { useReveal } from '../hooks/useReveal';

const STEPS = ['Flowers', 'Size', 'Color Theme', 'Wrapping', 'Finishing Touches', 'Personalize'];

export function BouquetBuilder() {
  const { addToCart } = useCart();
  const { ref, revealed } = useReveal();
  const [step, setStep] = useState(0);

  const [flower, setFlower] = useState(BUILDER_FLOWERS[0]);
  const [size, setSize] = useState(BUILDER_SIZES[0]);
  const [color, setColor] = useState(BUILDER_COLORS[0]);
  const [wrapping, setWrapping] = useState(BUILDER_WRAPPING[0]);
  const [finishes, setFinishes] = useState<typeof BUILDER_FINISHES>([]);

  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [addedToCart, setAddedToCart] = useState(false);

  const totalPrice = useMemo(() => {
    return (
      (flower.price ?? 0) +
      (size.price ?? 0) +
      (wrapping.price ?? 0) +
      finishes.reduce((sum, f) => sum + (f.price ?? 0), 0)
    );
  }, [flower, size, wrapping, finishes]);

  const toggleFinish = useCallback((f: typeof BUILDER_FINISHES[0]) => {
    setFinishes(prev =>
      prev.some(p => p.id === f.id)
        ? prev.filter(p => p.id !== f.id)
        : [...prev, f]
    );
  }, []);

  const reset = useCallback(() => {
    setFlower(BUILDER_FLOWERS[0]);
    setSize(BUILDER_SIZES[0]);
    setColor(BUILDER_COLORS[0]);
    setWrapping(BUILDER_WRAPPING[0]);
    setFinishes([]);
    setRecipientName('');
    setMessage('');
    setInstructions('');
    setDeliveryDate('');
    setDeliveryAddress('');
    setContactNumber('');
    setStep(0);
    setAddedToCart(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    const customData: CustomBouquetData = {
      flower: { id: flower.id, name: flower.name, price: flower.price ?? 0 },
      size: { id: size.id, name: size.name, price: size.price ?? 0 },
      color: { id: color.id, name: color.name },
      wrapping: { id: wrapping.id, name: wrapping.name, price: wrapping.price ?? 0 },
      finishes: finishes.map(f => ({ id: f.id, name: f.name, price: f.price ?? 0 })),
      recipientName, message, instructions, deliveryDate, deliveryAddress, contactNumber,
    };
    const detailsParts = [
      flower.name,
      size.name,
      color.name,
      wrapping.name,
      finishes.length > 0 ? `Add-ons: ${finishes.map(f => f.name).join(', ')}` : null,
    ].filter(Boolean);

    const cartItem: Omit<CartItem, 'quantity'> = {
      cartId: `custom-${Date.now()}`,
      type: 'custom',
      name: 'Custom Bouquet',
      price: totalPrice,
      image: flower.image ?? '',
      details: detailsParts.join(' • '),
      customData,
    };
    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  }, [flower, size, color, wrapping, finishes, totalPrice, recipientName, message, instructions, deliveryDate, deliveryAddress, contactNumber, addToCart]);

  const colorPreview = COLOR_PREVIEW[color.id] ?? COLOR_PREVIEW.customColor;
  const canProceed = step < 5;

  return (
    <section id="builder" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className={`max-w-7xl mx-auto reveal ${revealed ? 'revealed' : ''}`}>
        <div className="text-center mb-12">
          <span className="section-label">Create Something Unique</span>
          <h2 className="section-title">Custom Bouquet Builder</h2>
          <p className="text-plum-400 dark:text-plum-800 mt-4 max-w-xl mx-auto">
            Design your perfect bouquet step by step. Watch the live preview and price update as you customize.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
          {/* Left: Steps & Options */}
          <div className="glass rounded-3xl p-6 md:p-8">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto scrollbar-hide">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                        i < step
                          ? 'bg-roseblush-500 text-white'
                          : i === step
                          ? 'bg-roseblush-500 text-white step-active-dot ring-4 ring-roseblush-200 dark:ring-plum-400'
                          : 'bg-roseblush-100 dark:bg-plum-300 text-plum-400 dark:text-plum-800'
                      }`}
                    >
                      {i < step ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-[10px] hidden md:block ${i === step ? 'font-semibold text-roseblush-600 dark:text-roseblush-400' : 'text-plum-400 dark:text-plum-800'}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-6 md:w-12 h-px mx-1 ${i < step ? 'bg-roseblush-500' : 'bg-roseblush-200 dark:bg-plum-300'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="min-h-[280px]">
              {/* Step 0: Flowers */}
              {step === 0 && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-xl mb-4">Choose Your Flowers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BUILDER_FLOWERS.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFlower(f)}
                        className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          flower.id === f.id
                            ? 'border-roseblush-500 ring-2 ring-roseblush-200 dark:ring-plum-400'
                            : 'border-transparent hover:border-roseblush-300'
                        }`}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img src={f.image} alt={f.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-white text-xs font-medium">{f.name}</p>
                          <p className="text-roseblush-200 text-[10px]">{formatPKR(f.price ?? 0)}</p>
                        </div>
                        {flower.id === f.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-roseblush-500 rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Size */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-xl mb-4">Choose Bouquet Size</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BUILDER_SIZES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSize(s)}
                        className={`p-5 rounded-2xl border-2 text-center transition-all duration-300 ${
                          size.id === s.id
                            ? 'border-roseblush-500 bg-roseblush-50 dark:bg-plum-300 ring-2 ring-roseblush-200 dark:ring-plum-400'
                            : 'border-roseblush-200 dark:border-plum-300 hover:border-roseblush-300'
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          size.id === s.id ? 'bg-roseblush-500 text-white' : 'bg-roseblush-100 dark:bg-plum-400 text-plum-600 dark:text-plum-800'
                        }`}>
                          <Flower2 className="w-5 h-5" style={{
                            transform: s.id === 'small' ? 'scale(0.7)' : s.id === 'medium' ? 'scale(0.85)' : s.id === 'large' ? 'scale(1)' : 'scale(1.15)'
                          }} />
                        </div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-plum-400 dark:text-plum-800 mt-1">
                          {(s.price ?? 0) === 0 ? 'Base price' : `+${formatPKR(s.price ?? 0)}`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Color */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-xl mb-4">Choose Color Theme</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BUILDER_COLORS.map(c => {
                      const preview = COLOR_PREVIEW[c.id];
                      return (
                        <button
                          key={c.id}
                          onClick={() => setColor(c)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-300 ${
                            color.id === c.id
                              ? 'border-roseblush-500 ring-2 ring-roseblush-200 dark:ring-plum-400'
                              : 'border-roseblush-200 dark:border-plum-300 hover:border-roseblush-300'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/50 shadow-inner"
                            style={{ background: preview?.bg ?? '#ccc' }}
                          />
                          <span className="text-sm font-medium text-left">{c.name}</span>
                          {color.id === c.id && <Check className="w-4 h-4 text-roseblush-500 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Wrapping */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-xl mb-4">Choose Wrapping</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUILDER_WRAPPING.map(w => (
                      <button
                        key={w.id}
                        onClick={() => setWrapping(w)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                          wrapping.id === w.id
                            ? 'border-roseblush-500 bg-roseblush-50 dark:bg-plum-300'
                            : 'border-roseblush-200 dark:border-plum-300 hover:border-roseblush-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{w.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-plum-400 dark:text-plum-800">+{formatPKR(w.price ?? 0)}</span>
                          {wrapping.id === w.id && <Check className="w-4 h-4 text-roseblush-500" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Finishes */}
              {step === 4 && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-xl mb-4">Add Finishing Touches</h3>
                  <p className="text-xs text-plum-400 dark:text-plum-800 mb-4">Select any extras to make your bouquet extra special.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUILDER_FINISHES.map(f => {
                      const selected = finishes.some(p => p.id === f.id);
                      return (
                        <button
                          key={f.id}
                          onClick={() => toggleFinish(f)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                            selected
                              ? 'border-roseblush-500 bg-roseblush-50 dark:bg-plum-300'
                              : 'border-roseblush-200 dark:border-plum-300 hover:border-roseblush-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                              selected ? 'bg-roseblush-500 border-roseblush-500' : 'border-roseblush-300'
                            }`}>
                              {selected && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className="text-sm font-medium">{f.name}</span>
                          </div>
                          <span className="text-xs text-plum-400 dark:text-plum-800">+{formatPKR(f.price ?? 0)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Personalize */}
              {step === 5 && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-xl mb-4">Personalize Your Order</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-plum-500 dark:text-plum-800">Recipient's Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-300" />
                        <input type="text" value={recipientName} onChange={e => setRecipientName(e.target.value)} className="input-field pl-10" placeholder="e.g. Mom" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-plum-500 dark:text-plum-800">Contact Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-300" />
                        <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className="input-field pl-10" placeholder="+92 300 0000000" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1.5 text-plum-500 dark:text-plum-800">Personal Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-plum-300" />
                        <textarea value={message} onChange={e => setMessage(e.target.value)} rows={2} className="input-field pl-10" placeholder="Write a heartfelt message..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-plum-500 dark:text-plum-800">Preferred Delivery Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-300" />
                        <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="input-field pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-plum-500 dark:text-plum-800">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-300" />
                        <input type="text" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="input-field pl-10" placeholder="House #, Street, City" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1.5 text-plum-500 dark:text-plum-800">Special Instructions (optional)</label>
                      <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={2} className="input-field" placeholder="Any special requests for our florists..." />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-roseblush-200 dark:border-plum-300">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1 text-sm font-medium text-plum-500 dark:text-plum-800 disabled:opacity-30 disabled:cursor-not-allowed hover:text-roseblush-500 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs text-plum-400 dark:text-plum-800 hover:text-roseblush-500 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>

                {step < 5 ? (
                  <button
                    onClick={() => setStep(s => Math.min(5, s + 1))}
                    className="btn-primary"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className={`btn-primary ${addedToCart ? 'bg-sage-500' : ''}`}
                  >
                    {addedToCart ? (
                      <><Check className="w-4 h-4" /> Added!</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Live Preview & Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="glass rounded-3xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-roseblush-500" />
                <h3 className="font-display text-lg font-medium">Live Preview</h3>
              </div>

              {/* Preview visual */}
              <div
                className="relative aspect-square rounded-2xl overflow-hidden mb-4 transition-all duration-500"
                style={{ background: colorPreview.bg }}
              >
                {flower.image && (
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-500"
                    style={{
                      transform: `scale(${size.id === 'small' ? 0.8 : size.id === 'medium' ? 0.9 : size.id === 'large' ? 1 : 1.1})`,
                    }}
                  />
                )}
                {/* Wrapping overlay indicator */}
                <div
                  className="absolute inset-0 border-4 rounded-2xl transition-all duration-500"
                  style={{
                    borderColor: wrapping.id === 'flowerBox' || wrapping.id === 'heartBox'
                      ? 'rgba(201,169,110,0.6)'
                      : wrapping.id === 'satinRibbon'
                      ? 'rgba(225,100,113,0.5)'
                      : 'rgba(255,255,255,0.3)',
                    borderStyle: wrapping.id === 'kraftPaper' ? 'dashed' : 'solid',
                  }}
                />
                {/* Size indicator */}
                <div className="absolute top-3 right-3 bg-white/80 dark:bg-plum-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-semibold text-plum-700 dark:text-plum-900">{size.name}</span>
                </div>
                {/* Finishes badges */}
                {finishes.length > 0 && (
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {finishes.slice(0, 3).map(f => (
                      <span key={f.id} className="bg-white/80 dark:bg-plum-900/80 backdrop-blur-sm text-[9px] px-2 py-0.5 rounded-full text-plum-700 dark:text-plum-900">
                        {f.name}
                      </span>
                    ))}
                    {finishes.length > 3 && (
                      <span className="bg-white/80 dark:bg-plum-900/80 backdrop-blur-sm text-[9px] px-2 py-0.5 rounded-full text-plum-700 dark:text-plum-900">
                        +{finishes.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-plum-400 dark:text-plum-800">Flowers</span>
                  <span className="font-medium">{flower.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plum-400 dark:text-plum-800">Size</span>
                  <span className="font-medium">{size.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plum-400 dark:text-plum-800">Color</span>
                  <span className="font-medium">{color.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plum-400 dark:text-plum-800">Wrapping</span>
                  <span className="font-medium text-right text-xs">{wrapping.name}</span>
                </div>
                {finishes.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-plum-400 dark:text-plum-800">Add-ons</span>
                    <span className="font-medium text-right text-xs">{finishes.length} selected</span>
                  </div>
                )}
              </div>

              {/* Price breakdown */}
              <div className="mt-4 pt-4 border-t border-roseblush-200 dark:border-plum-300">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-plum-400 dark:text-plum-800">Base flower</span>
                  <span className="text-sm">{formatPKR(flower.price ?? 0)}</span>
                </div>
                {(size.price ?? 0) > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-plum-400 dark:text-plum-800">Size upgrade</span>
                    <span className="text-sm">+{formatPKR(size.price ?? 0)}</span>
                  </div>
                )}
                {(wrapping.price ?? 0) > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-plum-400 dark:text-plum-800">Wrapping</span>
                    <span className="text-sm">+{formatPKR(wrapping.price ?? 0)}</span>
                  </div>
                )}
                {finishes.length > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-plum-400 dark:text-plum-800">Add-ons ({finishes.length})</span>
                    <span className="text-sm">+{formatPKR(finishes.reduce((s, f) => s + (f.price ?? 0), 0))}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-roseblush-200 dark:border-plum-300">
                  <span className="font-display text-lg font-semibold">Estimated Total</span>
                  <span className="font-display text-xl font-bold text-roseblush-600 dark:text-roseblush-400">
                    {formatPKR(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
