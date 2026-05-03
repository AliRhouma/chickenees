import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products } from '../data/products';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  nameAr: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  applyPromo: (code: string) => boolean;
  bumpCount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [bumpCount, setBumpCount] = useState(0);

  const deliveryFee = 12;

  const addToCart = (productId: number) => {
    setBumpCount(c => c + 1);
    setItems(current => {
      const existing = current.find(item => item.productId === productId);
      if (existing) {
        return current.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const product = products.find(p => p.id === productId);
      if (!product) return current;
      return [...current, { id: Date.now(), productId, quantity: 1, price: product.price, nameAr: product.nameAr }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(current => current.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountPercent(0);
  };

  const applyPromo = (code: string) => {
    if (code.toUpperCase() === 'CRUNCH10') {
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal + deliveryFee - discount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      total, subtotal, deliveryFee, discount, applyPromo,
      bumpCount, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
