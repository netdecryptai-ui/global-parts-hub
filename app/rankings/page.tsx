import Link from "next/link";
import { ArrowLeft, Trophy, AlertTriangle, Hammer, Star } from "lucide-react";
import type { Metadata } from "next";
// @ts-ignore
import phoneDatabase from "../data/phones.json";

export const metadata: Metadata = {
  title: "Smartphone Repairability Tier List (2025)",
  description: "Ranked: Which phones are easiest to fix? The ultimate repairability leaderboard from S-Tier to F-Tier.",
};

export default function RankingsPage() {
  // --- SORTING LOGIC ---
  // @ts-ignore
  const sTier = phoneDatabase.filter((p: any) => p.difficulty === "Very Easy");
  // @ts-ignore
  const aTier = phoneDatabase.filter((p: any) => p.difficulty === "Easy");
  // @ts-ignore
  const bTier = phoneDatabase.filter((p: any) => p.difficulty === "Moderate");
  // @ts-ignore
  const fTier = phoneDatabase.filter((p: any) => p.difficulty === "Hard" || p.difficulty === "Very Hard");

  const TierRow = ({ title, color, bg, desc, items }: any) => (
    <div className="mb-12">
        <div className={`flex items-center gap-4 p-4 rounded-t-2xl ${bg} border-b-4 border-white`}>
            <h2 className={`text-4xl font-black ${color} tracking-tighter uppercase`}>{title}</h2>
            <span className="text-slate-700 font-bold hidden md:block opacity-60">- {desc}</span>
        </div>
        <div className={`bg-slate-50 p-4 grid grid-cols-2 md:grid-cols-5 gap-4 rounded-b-2xl border-x border-b border-slate-200`}>
            {items.length > 0 ? items.map((phone: any, i: number) => (
                <Link key={i} href={`/product/${phone.slug}`} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:scale-105 transition flex flex-col items-center text-center group">
                    <img src={phone.image} alt={phone.name} className="h-24 object-contain mb-3 mix-blend-multiply group-hover:scale-110 transition" />
                    <div className="font-bold text-slate-900 text-sm leading-tight">{phone.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{phone.price}</div>
                </Link>
            )) : (
                <div className="col-span-full text-center text-slate-400 py-4 font-medium italic">No phones in this tier yet.</div>
            )}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="text-slate-500 hover:text-orange-600 mb-8 inline-flex items-center font-bold transition">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>

        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                THE REPAIR <span className="text-orange-600">TIER LIST</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                We ranked every phone based on how easy it is to replace the screen yourself.
            </p>
        </div>

        {/* --- S TIER --- */}
        <TierRow 
            title="S-Tier" 
            color="text-purple-600" 
            bg="bg-purple-100" 
            desc="God Mode. Repairs take < 20 minutes." 
            items={sTier} 
        />

        {/* --- A TIER --- */}
        <TierRow 
            title="A-Tier" 
            color="text-green-600" 
            bg="bg-green-100" 
            desc="DIY Friendly. Great for beginners." 
            items={aTier} 
        />

        {/* --- B TIER --- */}
        <TierRow 
            title="B-Tier" 
            color="text-yellow-600" 
            bg="bg-yellow-100" 
            desc="Average. Requires patience and heat." 
            items={bTier} 
        />

        {/* --- F TIER --- */}
        <TierRow 
            title="F-Tier" 
            color="text-red-600" 
            bg="bg-red-100" 
            desc="Nightmare. High risk of breaking glass." 
            items={fTier} 
        />

        {/* --- INFO BOX --- */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">How do we rank these?</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
                Our ranking algorithm considers: <strong>Adhesive strength</strong>, <strong>Cable traps</strong> (hidden cables that tear easily), and <strong>Component modularity</strong>. S-Tier phones usually let you swap a screen without removing the battery or motherboard.
            </p>
        </div>

      </div>
    </div>
  );
}