"use client";

import Link from "next/link";
import { Search, PenTool } from "lucide-react";
// IMPORT DATA
import phoneDatabase from "./data/phones.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HERO SECTION */}
      <div className="text-center pt-24 pb-16 px-4 bg-slate-50 border-b border-slate-200">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8">
          Find parts for <span className="text-blue-600">any device.</span>
        </h1>
        <div className="max-w-xl mx-auto relative">
           <Search className="absolute left-4 top-5 h-6 w-6 text-slate-400" />
           <input type="text" placeholder="Search your phone..." className="w-full p-5 pl-12 rounded-2xl shadow-xl border border-slate-200 text-lg outline-none focus:ring-4 focus:ring-blue-100" />
        </div>
      </div>

      {/* BATTLE ARENA */}
      <div className="bg-slate-900 py-12 px-4 mb-12 text-center">
        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest"><span className="text-red-500">Versus</span> Battle Arena</h2>
        <div className="flex flex-wrap justify-center gap-4">
            {phoneDatabase.length >= 2 ? (
                <Link href={`/versus/${phoneDatabase[0].slug}-vs-${phoneDatabase[1].slug}`} className="bg-white/10 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition border border-white/20">
                    🔥 {phoneDatabase[0].name} vs {phoneDatabase[1].name}
                </Link>
            ) : <span className="text-slate-500">Add more phones to enable battles</span>}
        </div>
      </div>

      {/* TRENDING GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="text-orange-500 mr-2">⚡</span> Trending Parts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {phoneDatabase.map((item: any, i: number) => {
                // --- FIXED MATH LOGIC ---
                // Remove $ and commas, but KEEP the decimal point
                const priceString = item.price.replace(/[$,]/g, ""); 
                const rawPrice = parseFloat(priceString) || 500;
                
                // Calculate 12% part cost correctly
                const partPrice = Math.floor(rawPrice * 0.12);
                
                return (
                  <Link key={i} href={`/product/${item.slug}`} className="border border-slate-100 rounded-2xl p-4 hover:shadow-xl transition bg-white block group">
                      <div className="h-48 bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-4 relative">
                           {/* SMART IMAGE with Fallback */}
                           <img 
                              src={item.image} 
                              alt={item.name} 
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&w=400&q=80";
                              }}
                              className="w-auto h-full object-contain group-hover:scale-110 transition duration-500" 
                           />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg truncate">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-600 font-black text-xl">${partPrice}.99</span>
                          <span className="text-xs text-slate-400 line-through">${rawPrice}</span>
                      </div>
                      <div className="mt-3 text-xs text-green-700 bg-green-50 inline-flex px-2 py-1 rounded font-bold items-center">
                         <PenTool className="w-3 h-3 mr-1"/> Screen Kit
                      </div>
                  </Link>
                );
            })}
        </div>
      </div>
    </div>
  );
}