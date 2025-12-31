"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface ButtonProps {
  id: number;
  model: string;
  price: number;
}

export default function AddToCartBtn({ id, model, price }: ButtonProps) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart({ id, model, price })}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2 text-lg"
    >
      <ShoppingCart className="h-5 w-5" /> 
      Add to Cart
    </button>
  );
}