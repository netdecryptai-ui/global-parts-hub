"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define what an Item looks like
interface CartItem {
  id: number;
  model: string;
  price: number;
}

// 2. Define what the Context looks like
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Create the Provider (The Wrapper)
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    alert(`Added ${item.model} to cart! 🛒`); // Simple alert for now
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Create a custom hook to use it easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}