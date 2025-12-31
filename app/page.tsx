"use client";

import { useState } from "react";
import Link from "next/link"; 
import { Search, Zap, ShoppingCart } from "lucide-react";
// We use the JSON data just for the "Trending" section on the home page
import phoneData from "./data/phones.json"; 

interface Phone {
  id: number;
  model: string;
  slug: string;
  image: string;
  category: string;
  description: string;
  price_usd: number;
  difficulty: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const phones: Phone[] = phoneData as Phone[];

  const filteredPhones = phones.filter((phone) =>
    phone.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="text-xl font-bold text-slate-900">GlobalParts<span className="text-blue-600">Hub</span></span>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium">Partner Login</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="bg-white pb-20 pt-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Find parts for <span className="text-blue-600">any device.</span>
          </h1>
          
          {/* SEARCH BAR (Redirects to the AI Page) */}
          <div className="relative max-w-2xl mx-auto shadow-xl rounded-2xl">
            <input
              type="text"
              className="block w-full pl-6 pr-4 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg focus:border-blue-500 outline-none"
              placeholder="Type any phone (e.g. 'Pixel 8 Pro Screen')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                   // This makes the search bar actually work!
                   window.location.href = `/product/${searchTerm.replace(/\s+/g, '-').toLowerCase()}`;
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* TRENDING GRID (Static Data) */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
           <Zap className="text-amber-500" fill="currentColor" /> Trending Repairs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredPhones.map((phone) => (
            <Link href={`/product/${phone.slug}`} key={phone.id}>
              <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-xl transition cursor-pointer">
                <div className="h-40 flex items-center justify-center bg-slate-50 rounded-xl mb-4">
                  <img src={phone.image} alt={phone.model} className="h-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="font-bold text-slate-900">{phone.model}</h3>
                <p className="text-blue-600 font-bold mt-2">${phone.price_usd}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- THE SPIDERWEB (REVENUE ENGINE) --- */}
      {/* This creates 100+ links for Google to find */}
      <div className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-8">Popular Repair Guides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            {['X', 'XR', 'XS', '11', '12', '13', '14', '15'].map((num) => (
              <div key={num} className="flex flex-col gap-2">
                <Link href={`/product/iphone-${num}-screen`} className="hover:text-blue-400">iPhone {num} Screen</Link>
                <Link href={`/product/iphone-${num}-battery`} className="hover:text-blue-400">iPhone {num} Battery</Link>
              </div>
            ))}
            {['s20', 's21', 's22', 's23', 's24'].map((num) => (
              <div key={num} className="flex flex-col gap-2">
                <Link href={`/product/samsung-${num}-screen`} className="hover:text-blue-400">Samsung S{num} Screen</Link>
                <Link href={`/product/samsung-${num}-ultra`} className="hover:text-blue-400">S{num} Ultra Parts</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}