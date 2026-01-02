import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

// IMPORT DATA
let phoneDatabase: any[] = [];
try {
  phoneDatabase = require("../../data/phones.json");
} catch (e) { phoneDatabase = []; }

export default async function VersusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // URL Pattern: "iphone-13-vs-samsung-s24"
  const [slugA, slugB] = slug.split("-vs-");

  // Find both phones in your DB
  const phoneA = phoneDatabase.find((p: any) => slugA.includes(p.slug) || p.slug.includes(slugA));
  const phoneB = phoneDatabase.find((p: any) => slugB.includes(p.slug) || p.slug.includes(slugB));

  if (!phoneA || !phoneB) {
    return <div className="p-10 text-center">One or both phones not found in database.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      
      {/* HEADER */}
      <div className="bg-slate-900 text-white py-12 text-center">
         <h1 className="text-3xl md:text-5xl font-black mb-4">
           {phoneA.name} <span className="text-red-500 text-xl align-middle mx-2">VS</span> {phoneB.name}
         </h1>
         <p className="text-slate-400">Which one should you buy in 2026?</p>
      </div>

      {/* COMPARISON TABLE */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
           
           <div className="grid grid-cols-3 bg-slate-50 p-4 font-bold text-sm uppercase tracking-wider text-slate-500 border-b">
              <div className="text-center">{phoneA.name}</div>
              <div className="text-center">Feature</div>
              <div className="text-center">{phoneB.name}</div>
           </div>

           {/* DYNAMIC ROWS (If you have specs) */}
           {phoneA.specs && phoneB.specs && Object.keys(phoneA.specs).map((key) => (
             <div key={key} className="grid grid-cols-3 p-4 border-b hover:bg-slate-50 transition">
                <div className="text-center font-bold text-slate-800">{phoneA.specs[key]}</div>
                <div className="text-center text-xs text-slate-400 uppercase flex items-center justify-center">{key}</div>
                <div className="text-center font-bold text-slate-800">{phoneB.specs[key]}</div>
             </div>
           ))}

           {/* PRICE ROW (The Money Maker) */}
           <div className="grid grid-cols-3 p-6 bg-blue-50">
              <div className="text-center">
                 <div className="text-2xl font-black text-blue-600 mb-2">{phoneA.price}</div>
                 <a href={phoneA.amazonLink} className="bg-[#FF9900] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#ffad33] block">Buy on Amazon</a>
              </div>
              <div className="flex items-center justify-center font-black text-slate-300">PRICE</div>
              <div className="text-center">
                 <div className="text-2xl font-black text-blue-600 mb-2">{phoneB.price}</div>
                 <a href={phoneB.amazonLink} className="bg-[#FF9900] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#ffad33] block">Buy on Amazon</a>
              </div>
           </div>

        </div>
      </div>

      {/* AD PLACEHOLDER */}
      <div className="max-w-4xl mx-auto mt-12 h-32 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
          [ GOOGLE ADSENSE BANNER HERE ]
      </div>

    </div>
  );
}