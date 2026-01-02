import Link from "next/link";
import { Search } from "lucide-react";

// 1. IMPORT DATA
let phoneDatabase: any[] = [];
try {
  phoneDatabase = require("./data/phones.json");
} catch (e) { phoneDatabase = []; }

export default function Home() {
  const displayPhones = phoneDatabase.length > 0 ? phoneDatabase : [
    // Fallback if data is missing
    { name: "iPhone 15", slug: "iphone-15", price: "$999", image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SX679_.jpg" }
  ];

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
        <h2 className="text-xl font-bold text-slate-900 mb-6">⚡ Trending Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {displayPhones.map((item: any, i: number) => (
                <Link key={i} href={`/product/${item.slug}`} className="border border-slate-100 rounded-2xl p-4 hover:shadow-xl transition bg-white block group">
                    <div className="h-48 bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-4">
                         
                         {/* THE MAGIC: Load image through our local API proxy */}
                         <img 
                            src={`/api/image?url=${encodeURIComponent(item.image)}`} 
                            alt={item.name} 
                            className="w-auto h-full object-contain group-hover:scale-110 transition duration-500" 
                            loading="lazy"
                         />

                    </div>
                    <h3 className="font-bold text-slate-900 text-lg truncate">{item.name}</h3>
                    <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}