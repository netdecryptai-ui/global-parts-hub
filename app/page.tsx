"use client";

import Link from "next/link";
import { Search, PenTool, X, Wrench, Zap } from "lucide-react"; 
import { useState } from "react";
// IMPORT DATA
import phoneDatabase from "./data/phones.json";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // @ts-ignore
  const safeDatabase = phoneDatabase || [];
  
  const filteredPhones = safeDatabase.filter((phone: any) => 
    phone.name && phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* HERO SECTION - Darker & Professional */}
      <div className="text-center pt-20 pb-16 px-4 bg-white border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-6 uppercase tracking-wider">
            <Wrench className="w-3 h-3" /> DIY Repair Database
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Fix your <span className="text-orange-600 underline decoration-4 decoration-orange-200 underline-offset-4">own device.</span>
        </h1>
        <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
            Compare OEM screen & battery prices instantly. Don't overpay at the repair shop.
        </p>
        
        {/* SEARCH BAR - Orange Focus */}
        <div className="max-w-xl mx-auto relative group">
           <Search className="absolute left-5 top-5 h-6 w-6 text-slate-400 group-focus-within:text-orange-500 transition" />
           <input 
             type="text" 
             placeholder="Search model (e.g. 'iPhone 13' or 'S24')..." 
             className="w-full p-5 pl-14 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 text-lg outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           {searchTerm && (
             <button 
               type="button" 
               aria-label="Clear Search"
               onClick={() => setSearchTerm("")}
               className="absolute right-5 top-5 text-slate-300 hover:text-slate-600"
             >
               <X className="h-6 w-6" />
             </button>
           )}
        </div>
      </div>

      {/* BATTLE ARENA */}
      {!searchTerm && (
        <div className="bg-slate-900 py-10 px-4 mb-12 text-center border-y border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Price Wars
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
              {safeDatabase.length >= 2 ? (
                  <Link href={`/versus/${safeDatabase[0].slug}-vs-${safeDatabase[1].slug}`} className="bg-white/5 hover:bg-orange-600 text-slate-300 hover:text-white px-6 py-3 rounded-xl font-bold transition border border-white/10 hover:border-orange-500">
                      Compare: {safeDatabase[0].name} vs {safeDatabase[1].name}
                  </Link>
              ) : null}
          </div>
        </div>
      )}

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center mt-8">
            {searchTerm ? `Results for "${searchTerm}"` : "Popular Replacement Parts"}
        </h2>
        
        {filteredPhones.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-xl font-bold text-slate-400">No parts found.</p>
            <p className="text-slate-400">Try searching for a simpler model name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {filteredPhones.map((item: any, i: number) => {
                  const priceString = item.price ? item.price.replace(/[$,]/g, "") : "0"; 
                  const rawPrice = parseFloat(priceString) || 500;
                  const partPrice = Math.floor(rawPrice * 0.12);
                  
                  return (
                    <Link key={i} href={`/product/${item.slug}`} className="border border-slate-200 rounded-xl p-4 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200 transition bg-white block group relative overflow-hidden">
                        <div className="h-48 bg-slate-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center p-4 relative">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&w=400&q=80"; }}
                                className="w-auto h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500" 
                            />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg truncate">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-orange-600 font-black text-xl">${partPrice}.99</span>
                            <span className="text-xs text-slate-400 font-medium">Est. Part Cost</span>
                        </div>
                        
                        {/* Fake "Low Stock" Badge for urgency */}
                        <div className="absolute top-3 right-3 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                            LOW STOCK
                        </div>
                    </Link>
                  );
              })}
          </div>
        )}
      </div>
    </div>
  );
}