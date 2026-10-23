import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../store';
import { formatPKR } from '../data';
import { SmartImage } from './SmartImage';

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-400 ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-plum-900/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md glass-strong shadow-2xl flex flex-col transition-transform duration-400 ease-elegant ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-roseblush-200 dark:border-plum-300">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-roseblush-500" />
            <h2 className="font-display text-lg font-semibold">
              Your Cart {itemCount > 0 && `(${itemCount})`}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-roseblush-100 dark:hover:bg-plum-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="font-display text-xl mb-2">Your cart is blooming empty</h3>
              <p className="text-sm text-plum-400 dark:text-plum-800 mb-6 max-w-xs">
                Add some beautiful bouquets or design your own custom arrangement to get started.
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.cartId}
                  className="flex gap-3 glass rounded-xl p-3 animate-fade-in"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        {item.details && (
                          <p className="text-[10px] text-plum-400 dark:text-plum-800 mt-0.5 line-clamp-2">
                            {item.details}
                          </p>
                        )}
                        <p className="text-roseblush-600 dark:text-roseblush-400 font-semibold text-sm mt-1">
                          {formatPKR(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        aria-label="Remove item"
                        className="text-plum-300 hover:text-roseblush-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full bg-roseblush-100 dark:bg-plum-300 flex items-center justify-center hover:bg-roseblush-200 dark:hover:bg-plum-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full bg-roseblush-100 dark:bg-plum-300 flex items-center justify-center hover:bg-roseblush-200 dark:hover:bg-plum-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-roseblush-200 dark:border-plum-300 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-plum-400 dark:text-plum-800">Subtotal</span>
              <span className="font-display text-lg font-semibold">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-plum-400 dark:text-plum-800">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-roseblush-200 dark:border-plum-300">
              <span className="font-medium">Estimated Total</span>
              <span className="font-display text-xl font-bold text-roseblush-600 dark:text-roseblush-400">
                {formatPKR(subtotal)}
              </span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onCheckout();
              }}
              className="btn-primary w-full"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
