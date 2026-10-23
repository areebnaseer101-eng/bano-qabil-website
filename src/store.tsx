import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, Addon } from './data';

export interface CartItem {
  cartId: string;
  type: 'product' | 'custom' | 'addon';
  name: string;
  price: number;
  image: string;
  quantity: number;
  details?: string;
  customData?: CustomBouquetData;
}

export interface CustomBouquetData {
  flower: { id: string; name: string; price: number };
  size: { id: string; name: string; price: number };
  color: { id: string; name: string };
  wrapping: { id: string; name: string; price: number };
  finishes: { id: string; name: string; price: number }[];
  recipientName: string;
  message: string;
  instructions: string;
  deliveryDate: string;
  deliveryAddress: string;
  contactNumber: string;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'bloom-bliss-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* ignore */ }
  }, [items]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.cartId === item.cartId);
      if (existing) {
        return prev.map(i =>
          i.cartId === item.cartId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, delta: number) => {
    setItems(prev => {
      const updated: CartItem[] = [];
      for (const i of prev) {
        if (i.cartId === cartId) {
          const newQty = i.quantity + delta;
          if (newQty > 0) updated.push({ ...i, quantity: newQty });
        } else {
          updated.push(i);
        }
      }
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, itemCount, isOpen, setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// Theme context
type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('bloom-bliss-theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('bloom-bliss-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
