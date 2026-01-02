import Link from "next/link";
import { Search } from "lucide-react";

// 1. IMPORT REAL DATA SAFELY
let phoneDatabase: any[] = [];
try {
  phoneDatabase = require("./data/phones.json");
} catch (e) { phoneDatabase = []; }

export default function Home() {
  // If database is empty, show a few placeholders so site doesn't look broken
  const displayPhones = phoneDatabase.length > 0 ? phoneDatabase : [
    { name: "iPhone 13", slug: "iphone-13", price: "$599", image: "https://m.media-amazon.com/images/I/71GLMJ7TbzL._AC_SL1500_.jpg" },
    { name: "Samsung S24", slug: "samsung-s24", price: "$799", image: "https://m.media-amazon.com/images/I/71Wjsy4PQaL._AC_SL1500_.jpg" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* --- HERO SECTION --- */}
      <div className="text-center pt-24 pb-16 px-4 bg-slate-50 border-b border-slate-200">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
          Find parts for <span className="text-blue-600">any device.</span>
        </h1>
        
        <div className="max-w-xl mx-auto relative group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
           </div>
           <input 
             type="text" 
             placeholder="Search your phone (e.g. 'iPhone 15')..."
             className="w-full p-5 pl-12 rounded-2xl shadow-xl border border-slate-200 outline-none text-lg text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 transition"
           />
        </div>
      </div>

      {/* --- BATTLE ARENA SELECTOR (New & Working) --- */}
      <div className="bg-slate-900 py-12 px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">
              <span className="text-red-500">Versus</span> Battle Arena
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
                {/* Dynamically generate battle links if we have enough phones */}
                {phoneDatabase.length >= 2 && (
                  <>
                    <Link href={`/versus/${phoneDatabase[0].slug}-vs-${phoneDatabase[1].slug}`} className="bg-white/10 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition border border-white/20">
                        🔥 {phoneDatabase[0].name} vs {phoneDatabase[1].name}
                    </Link>
                    {phoneDatabase.length > 3 && (
                      <Link href={`/versus/${phoneDatabase[2].slug}-vs-${phoneDatabase[3].slug}`} className="bg-white/10 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition border border-white/20">
                          ⚔️ {phoneDatabase[2].name} vs {phoneDatabase[3].name}
                      </Link>
                    )}
                  </>
                )}
                {phoneDatabase.length < 2 && (
                   <span className="text-slate-500">Add more phones to enable battles</span>
                )}
            </div>
        </div>
      </div>

      {/* --- TRENDING REPAIRS GRID (REAL DATA) --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="text-orange-500 mr-2">⚡</span> Trending Devices
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* THIS MAPS YOUR REAL JSON DATA TO CARDS */}
            {displayPhones.map((item: any, i: number) => (
                <Link key={i} href={`/product/${item.slug}`} className="border border-slate-100 rounded-2xl p-4 hover:shadow-xl transition bg-white block group">
                    <div className="h-48 bg-white rounded-xl mb-4 overflow-hidden relative flex items-center justify-center p-4">
                         {/* USES REAL AMAZON IMAGE FROM JSON */}
                         <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-auto h-full object-contain group-hover:scale-110 transition duration-500" 
                         />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg truncate">{item.name}</h3>
                    <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                    <div className="mt-3 text-xs text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded">
                       Verified Part
                    </div>
                </Link>
            ))}
        </div>
      </div>

    </div>
  );
}