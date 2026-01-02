import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// 1. FIX: Use standard import to match homepage (No red lines)
import phoneDatabase from "../../data/phones.json";

export default async function VersusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // LOGIC: Split URL "iphone-vs-samsung" into two slugs
  const [slugA, slugB] = slug.split("-vs-");

  // FIND PHONES
  // @ts-ignore
  const phoneA = phoneDatabase.find((p: any) => p.slug === slugA);
  // @ts-ignore
  const phoneB = phoneDatabase.find((p: any) => p.slug === slugB);

  // ERROR HANDLER
  if (!phoneA || !phoneB) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col bg-slate-50 p-4">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Battle Not Found 😕</h1>
            <p className="text-slate-500 mb-6">Could not find one of the phones in the database.</p>
            <Link href="/" className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold">Back Home</Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* HEADER */}
      <div className="bg-slate-900 text-white py-12 text-center relative overflow-hidden">
         <h1 className="text-3xl md:text-5xl font-black mb-4 relative z-10">
           {phoneA.name} <span className="text-red-500 text-4xl align-middle mx-2 font-serif italic">VS</span> {phoneB.name}
         </h1>
      </div>

      {/* COMPARISON TABLE */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
           
           <div className="grid grid-cols-3 bg-slate-100 p-4 font-bold text-sm uppercase tracking-wider text-slate-500 border-b">
              <div className="text-center text-blue-600">{phoneA.name}</div>
              <div className="text-center">Specs</div>
              <div className="text-center text-blue-600">{phoneB.name}</div>
           </div>

           {/* IMAGE ROW - CLEAN & DIRECT (Matches Homepage) */}
           <div className="grid grid-cols-3 p-6 border-b items-center">
              <img 
                 src={phoneA.image} 
                 className="w-full h-32 object-contain" 
                 alt={phoneA.name} 
              />
              <div className="text-center text-xs font-bold text-slate-300">IMAGES</div>
              <img 
                 src={phoneB.image} 
                 className="w-full h-32 object-contain" 
                 alt={phoneB.name} 
              />
           </div>

           {/* DYNAMIC SPECS ROWS */}
           {phoneA.specs && phoneB.specs && Object.keys(phoneA.specs).map((key) => (
             <div key={key} className="grid grid-cols-3 p-4 border-b hover:bg-slate-50 transition">
                {/* @ts-ignore */}
                <div className="text-center font-bold text-slate-800 text-sm md:text-base">{phoneA.specs[key]}</div>
                <div className="text-center text-xs text-slate-400 uppercase flex items-center justify-center font-bold">{key}</div>
                {/* @ts-ignore */}
                <div className="text-center font-bold text-slate-800 text-sm md:text-base">{phoneB.specs[key]}</div>
             </div>
           ))}

           {/* PRICE & BUY ROW */}
           <div className="grid grid-cols-3 p-6 bg-blue-50/50">
              <div className="text-center">
                 <div className="text-xl font-black text-slate-900 mb-2">{phoneA.price}</div>
                 <a href={phoneA.amazonLink} target="_blank" className="bg-[#FF9900] hover:bg-[#ffad33] text-white px-4 py-3 rounded-lg text-sm font-bold shadow-sm block w-full">Buy Now</a>
              </div>
              <div className="flex items-center justify-center font-black text-slate-300">WINNER?</div>
              <div className="text-center">
                 <div className="text-xl font-black text-slate-900 mb-2">{phoneB.price}</div>
                 <a href={phoneB.amazonLink} target="_blank" className="bg-[#FF9900] hover:bg-[#ffad33] text-white px-4 py-3 rounded-lg text-sm font-bold shadow-sm block w-full">Buy Now</a>
              </div>
           </div>

        </div>
      </div>
      
      {/* Footer Link */}
      <div className="text-center mt-12">
        <Link href="/" className="text-blue-600 font-bold hover:underline">Start New Battle</Link>
      </div>

    </div>
  );
}