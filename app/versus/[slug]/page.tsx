import Link from "next/link";
import { ArrowLeft, Trophy, Zap } from "lucide-react";
import type { Metadata } from "next";
// @ts-ignore
import phoneDatabase from "../../data/phones.json"; // ✅ FIXED IMPORT PATH

type Props = {
  params: Promise<{ slug: string }>;
};

// --- DYNAMIC SEO TITLES ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  
  // Safety Check: If URL is broken, fallback to generic title
  if (parts.length < 2) {
    return { title: "Phone Repair Comparison | Global Parts Hub" };
  }

  const name1 = parts[0].replace(/-/g, " ");
  const name2 = parts[1].replace(/-/g, " ");

  return {
    title: `${name1} vs ${name2} Repair Cost Comparison`,
    description: `Which is cheaper to fix? Compare screen replacement prices for ${name1} and ${name2}.`,
  };
}

export default async function VersusPage({ params }: Props) {
  const { slug } = await params;
  
  // Parse the URL
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return <div>Invalid Comparison</div>;

  // Find both phones in database
  // @ts-ignore
  const phone1 = phoneDatabase.find((p: any) => p.slug === parts[0]);
  // @ts-ignore
  const phone2 = phoneDatabase.find((p: any) => p.slug === parts[1]);

  if (!phone1 || !phone2) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Comparison Not Found</h1>
            <Link href="/" className="text-blue-600 underline">Return Home</Link>
        </div>
    );
  }

  // Calculate Prices
  const getPrice = (p: any) => {
      const raw = parseFloat(String(p.price).replace(/[$,]/g, "")) || 0;
      return Math.floor(raw * 0.12); // Estimated Part Cost
  };

  const cost1 = getPrice(phone1);
  const cost2 = getPrice(phone2);
  const cheaperPhone = cost1 < cost2 ? phone1 : phone2;
  const diff = Math.abs(cost1 - cost2);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/" className="text-slate-500 hover:text-orange-600 mb-8 inline-flex items-center font-bold transition">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        {/* --- HEADLINE --- */}
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                <span className="capitalize">{phone1.name}</span> <span className="text-slate-300">vs</span> <span className="capitalize">{phone2.name}</span>
            </h1>
            <p className="text-lg text-slate-500">
                Repair Cost Showdown: Which one drains your wallet?
            </p>
        </div>

        {/* --- THE ARENA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 relative">
            
            {/* VS BADGE (Center) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-600 text-white items-center justify-center rounded-full font-black text-xl border-4 border-white shadow-lg z-10">
                VS
            </div>

            {/* PHONE 1 */}
            <div className="p-8 md:p-12 text-center md:border-r border-slate-100 flex flex-col items-center">
                <img src={phone1.image} className="h-48 object-contain mb-6" alt={phone1.name} />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{phone1.name}</h2>
                <div className="text-4xl font-black text-slate-900 mb-1">${cost1}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Est. Screen Cost</div>
                
                <Link href={`/product/${phone1.slug}`} className="w-full py-3 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:text-orange-600 font-bold text-slate-600 transition">
                    View Parts
                </Link>
            </div>

            {/* PHONE 2 */}
            <div className="p-8 md:p-12 text-center flex flex-col items-center bg-slate-50/50">
                <img src={phone2.image} className="h-48 object-contain mb-6" alt={phone2.name} />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{phone2.name}</h2>
                <div className="text-4xl font-black text-slate-900 mb-1">${cost2}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Est. Screen Cost</div>
                
                <Link href={`/product/${phone2.slug}`} className="w-full py-3 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:text-orange-600 font-bold text-slate-600 transition">
                    View Parts
                </Link>
            </div>
        </div>

        {/* --- WINNER CARD --- */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6 flex items-start md:items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Trophy className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-bold text-green-900 text-lg">The Winner: {cheaperPhone.name}</h3>
                <p className="text-green-800/80">
                    If you break your screen, the <strong>{cheaperPhone.name}</strong> is cheaper to fix by approximately <strong>${diff}</strong>.
                </p>
            </div>
        </div>

        {/* --- SPEC COMPARISON TABLE --- */}
        <div className="mt-12">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-500" /> Technical Face-off
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-100 p-4 font-bold text-xs text-slate-400 uppercase tracking-wider">
                    <div>Feature</div>
                    <div className="text-center">{phone1.name}</div>
                    <div className="text-center">{phone2.name}</div>
                </div>
                
                {/* Difficulty Row */}
                <div className="grid grid-cols-3 p-4 border-b border-slate-50 hover:bg-slate-50 transition">
                    <div className="font-bold text-slate-700">Repair Difficulty</div>
                    <div className="text-center text-sm">{phone1.difficulty}</div>
                    <div className="text-center text-sm">{phone2.difficulty}</div>
                </div>

                {/* Battery Row */}
                <div className="grid grid-cols-3 p-4 border-b border-slate-50 hover:bg-slate-50 transition">
                    <div className="font-bold text-slate-700">Battery Size</div>
                    <div className="text-center text-sm">{(phone1.specs as any)?.battery || "-"}</div>
                    <div className="text-center text-sm">{(phone2.specs as any)?.battery || "-"}</div>
                </div>

                {/* Screen Row */}
                <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition">
                    <div className="font-bold text-slate-700">Screen Size</div>
                    <div className="text-center text-sm">{(phone1.specs as any)?.screen || "-"}</div>
                    <div className="text-center text-sm">{(phone2.specs as any)?.screen || "-"}</div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}