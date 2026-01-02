import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* --- HERO SECTION (Matches Screenshot) --- */}
      <div className="text-center pt-24 pb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
          Find parts for <span className="text-blue-600">any device.</span>
        </h1>
        
        <div className="max-w-xl mx-auto relative">
           <input 
             type="text" 
             placeholder="Type any phone (e.g. 'Pixel 8 Pro Screen')..."
             className="w-full p-5 rounded-2xl shadow-xl border border-slate-100 outline-none text-lg text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 transition"
           />
        </div>
      </div>
{/* --- BATTLE ARENA SELECTOR (New) --- */}
      <div className="bg-slate-900 py-12 px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">
              <span className="text-red-500">Versus</span> Battle Arena
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
                {/* Auto-Generated Battle Links */}
                <Link href="/versus/iphone-15-pro-max-vs-samsung-s24-ultra" className="bg-white/10 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition border border-white/20">
                    🔥 iPhone 15 vs S24 Ultra
                </Link>
                <Link href="/versus/iphone-13-vs-samsung-a54" className="bg-white/10 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition border border-white/20">
                    💰 Budget Battle
                </Link>
                <Link href="/versus/pixel-9-pro-vs-oneplus-12" className="bg-white/10 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition border border-white/20">
                    🤖 Android War
                </Link>
            </div>
            <p className="text-slate-500 text-sm mt-4">Select a battle to compare specs and prices instantly.</p>
        </div>
      </div>
      
      {/* --- TRENDING REPAIRS GRID --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="text-orange-500 mr-2">⚡</span> Trending Repairs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Static List to Match Screenshot Layout */}
            {[
                { name: "iPhone 5s", price: "$69", img: "iphone-5s" },
                { name: "iPhone 6", price: "$104", img: "iphone-6" },
                { name: "iPhone 13 Pro", price: "$384", img: "iphone-13-pro" },
                { name: "iPhone X", price: "$314", img: "iphone-x" },
                { name: "Samsung S23", price: "$299", img: "samsung-s23" },
                { name: "Pixel 7 Pro", price: "$189", img: "pixel-7-pro" },
                { name: "iPad Air 4", price: "$249", img: "ipad-air-4" },
                { name: "MacBook Air", price: "$499", img: "macbook-air-m1" },
            ].map((item, i) => (
                <Link key={i} href={`/product/${item.name.replace(/\s+/g, "-").toLowerCase()}-repair`} className="border border-slate-100 rounded-2xl p-4 hover:shadow-lg transition bg-white block group">
                    <div className="h-48 bg-slate-50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center p-4">
                         {/* Clean Product Image */}
                         <img 
                            src={`https://image.pollinations.ai/prompt/photorealistic%20studio%20photo%20of%20${item.name}%20smartphone%20front%20view%20white%20background?nologo=true`} 
                            alt={item.name} 
                            className="w-auto h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500" 
                         />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                    <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                </Link>
            ))}
        </div>
      </div>

    </div>
  );
}