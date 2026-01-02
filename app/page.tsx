import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 text-white pt-20 pb-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold mb-6 border border-blue-500/30">
            AI-Powered Repair Intelligence
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Fix Anything. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Instantly.
            </span>
          </h1>
          
          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto bg-white rounded-xl shadow-2xl flex items-center p-2">
            <Search className="h-6 w-6 text-slate-400 ml-4" />
            <input 
              type="text" 
              placeholder="What are you fixing today? (e.g. iPhone 14 Battery)"
              className="w-full p-4 text-lg text-slate-900 outline-none placeholder:text-slate-400 bg-transparent rounded-xl"
            />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- TRENDING NEWS --- */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Trending Tech News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["iPhone 16 Leaks", "Samsung S25 Ultra", "Tesla Pi Phone"].map((topic, i) => (
              <Link key={i} href={`/blog/${topic.replace(/\s+/g, "-").toLowerCase()}`} className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
                <img src={`https://image.pollinations.ai/prompt/tech%20news%20${topic}?nologo=true`} alt={topic} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                  <h3 className="text-white font-bold text-xl">{topic}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- VERSUS ARENA --- */}
      <div className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">VERSUS ARENA</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["iPhone 15 vs S24", "PS5 vs Xbox Series X", "MacBook vs Dell XPS", "Pixel 9 vs iPhone 16"].map((battle, i) => (
                <Link key={i} href={`/blog/${battle.replace(/\s+/g, "-").toLowerCase()}-review`} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500 transition flex justify-between">
                    <span className="font-bold">{battle}</span>
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                </Link>
            ))}
            </div>
        </div>
      </div>

      {/* --- FOOTER LINKS --- */}
      <div className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {['iPhone 13', 'Samsung S23', 'Pixel 7', 'iPad Air 5', 'PS5 Controller', 'Tesla Screen'].map((item) => (
               <Link key={item} href={`/product/${item.replace(/\s+/g, "-").toLowerCase()}-repair`} className="text-sm text-slate-500 hover:text-blue-600">
                 {item} Repair
               </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}