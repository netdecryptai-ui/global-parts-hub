import Link from "next/link";
import { ArrowLeft, Trophy, Zap, Wrench, AlertTriangle, Clock, Activity, Cpu, Layers, Thermometer, Youtube, Anchor } from "lucide-react";
import type { Metadata } from "next";
// @ts-ignore
import phoneDatabase from "../../data/phones.json";

type Props = {
  params: Promise<{ slug: string }>;
};

// --- SEO TITLES ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  
  if (parts.length < 2) return { title: "Comparison | Global Parts Hub" };

  const name1 = parts[0].replace(/-/g, " ");
  const name2 = parts[1].replace(/-/g, " ");

  return {
    title: `${name1} vs ${name2} Teardown & Repair Cost Analysis`,
    description: `Full breakdown: ${name1} vs ${name2}. Compare adhesive strength, screw counts, difficulty, and screen prices.`,
  };
}

export default async function VersusPage({ params }: Props) {
  const { slug } = await params;
  
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return <div>Invalid Comparison</div>;

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

  // --- LOGIC ENGINE 🧠 ---
  const getPrice = (p: any) => {
      const raw = parseFloat(String(p.price).replace(/[$,]/g, "")) || 0;
      return Math.floor(raw * 0.12);
  };

  const cost1 = getPrice(phone1);
  const cost2 = getPrice(phone2);
  const cheaperPhone = cost1 < cost2 ? phone1 : phone2;
  const diff = Math.abs(cost1 - cost2);
  
  // INFERRED REPAIR DETAILS (The "Magic" Logic)
  const getRepairDetails = (diff: string) => {
      if (diff === "Easy" || diff === "Very Easy") return { 
          score: 90, 
          color: "bg-green-500", 
          text: "DIY Friendly", 
          time: "30 Mins", 
          adhesive: "Light / Clips",
          screws: "~8 Screws",
          heat: "Not Required"
      };
      if (diff === "Moderate") return { 
          score: 60, 
          color: "bg-yellow-500", 
          text: "Intermediate", 
          time: "1 Hour", 
          adhesive: "Moderate Tape",
          screws: "~16 Screws",
          heat: "Hair Dryer OK"
      };
      return { 
          score: 30, 
          color: "bg-red-500", 
          text: "Expert Level", 
          time: "2.5 Hours", 
          adhesive: "Industrial Glue",
          screws: "25+ Screws",
          heat: "Heat Gun Required"
      };
  };

  const d1 = getRepairDetails(phone1.difficulty);
  const d2 = getRepairDetails(phone2.difficulty);

  // Screen Tech Inference
  const getScreenType = (cost: number) => cost > 60 ? "OLED / AMOLED" : "IPS LCD";

  // YouTube Links
  const yt1 = `https://www.youtube.com/results?search_query=${phone1.name.replace(/ /g, "+")}+teardown`;
  const yt2 = `https://www.youtube.com/results?search_query=${phone2.name.replace(/ /g, "+")}+teardown`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="text-slate-500 hover:text-orange-600 mb-8 inline-flex items-center font-bold transition">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        {/* --- HEADLINE --- */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-4 uppercase tracking-wider">
                <Activity className="w-3 h-3 text-orange-500" /> Deep Dive Comparison
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 capitalize tracking-tight">
                {phone1.name} <span className="text-slate-300 text-4xl align-middle mx-2">vs</span> {phone2.name}
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                Which device respects your wallet? A full breakdown of repair costs and complexity.
            </p>
        </div>

        {/* --- THE ARENA (Visuals) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* PHONE 1 CARD */}
            <div className={`bg-white rounded-3xl p-8 border-2 transition relative overflow-hidden group ${cheaperPhone.slug === phone1.slug ? 'border-green-500 shadow-xl shadow-green-100' : 'border-slate-100'}`}>
                {cheaperPhone.slug === phone1.slug && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">WINNER</div>}
                
                <div className="h-48 flex items-center justify-center mb-6">
                     <img src={phone1.image} className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500" alt={phone1.name} />
                </div>
                
                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900">{phone1.name}</h2>
                    <div className="text-5xl font-black text-slate-900 my-4">${cost1}</div>
                    <div className="inline-block bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Est. Screen Cost
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                     <div className="flex justify-between text-sm font-bold border-b border-slate-50 pb-2">
                        <span className="text-slate-400">Difficulty</span>
                        <span className={`${d1.color.replace('bg-', 'text-')}`}>{d1.text}</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold border-b border-slate-50 pb-2">
                        <span className="text-slate-400">Screen Type</span>
                        <span className="text-slate-700">{getScreenType(cost1)}</span>
                     </div>
                </div>

                <Link href={`/product/${phone1.slug}`} className="mt-6 block w-full bg-slate-900 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl transition">
                    View Parts & Guide
                </Link>
            </div>

            {/* PHONE 2 CARD */}
            <div className={`bg-white rounded-3xl p-8 border-2 transition relative overflow-hidden group ${cheaperPhone.slug === phone2.slug ? 'border-green-500 shadow-xl shadow-green-100' : 'border-slate-100'}`}>
                {cheaperPhone.slug === phone2.slug && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">WINNER</div>}

                <div className="h-48 flex items-center justify-center mb-6">
                     <img src={phone2.image} className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500" alt={phone2.name} />
                </div>
                
                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900">{phone2.name}</h2>
                    <div className="text-5xl font-black text-slate-900 my-4">${cost2}</div>
                    <div className="inline-block bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Est. Screen Cost
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                     <div className="flex justify-between text-sm font-bold border-b border-slate-50 pb-2">
                        <span className="text-slate-400">Difficulty</span>
                        <span className={`${d2.color.replace('bg-', 'text-')}`}>{d2.text}</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold border-b border-slate-50 pb-2">
                        <span className="text-slate-400">Screen Type</span>
                        <span className="text-slate-700">{getScreenType(cost2)}</span>
                     </div>
                </div>

                <Link href={`/product/${phone2.slug}`} className="mt-6 block w-full bg-slate-900 hover:bg-orange-600 text-white text-center font-bold py-4 rounded-xl transition">
                    View Parts & Guide
                </Link>
            </div>
        </div>

        {/* --- REPAIR COMPLEXITY MATRIX (New Detail!) --- */}
        <div className="mb-12">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                <Wrench className="h-6 w-6 mr-3 text-slate-400" /> Repair Complexity Matrix
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-50 p-4 border-b border-slate-200">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Factor</div>
                    <div className="text-center font-bold text-slate-900">{phone1.name}</div>
                    <div className="text-center font-bold text-slate-900">{phone2.name}</div>
                </div>

                {/* Row 1: Adhesive */}
                <div className="grid grid-cols-3 p-5 border-b border-slate-100 hover:bg-slate-50">
                    <div className="flex items-center text-sm font-bold text-slate-600">
                        <Layers className="w-4 h-4 mr-2 text-blue-500" /> Adhesive Strength
                    </div>
                    <div className="text-center text-sm font-medium">{d1.adhesive}</div>
                    <div className="text-center text-sm font-medium">{d2.adhesive}</div>
                </div>

                {/* Row 2: Heat */}
                <div className="grid grid-cols-3 p-5 border-b border-slate-100 hover:bg-slate-50">
                    <div className="flex items-center text-sm font-bold text-slate-600">
                        <Thermometer className="w-4 h-4 mr-2 text-red-500" /> Heat Required?
                    </div>
                    <div className="text-center text-sm font-medium">{d1.heat}</div>
                    <div className="text-center text-sm font-medium">{d2.heat}</div>
                </div>

                {/* Row 3: Screws */}
                <div className="grid grid-cols-3 p-5 border-b border-slate-100 hover:bg-slate-50">
                    <div className="flex items-center text-sm font-bold text-slate-600">
                        <Anchor className="w-4 h-4 mr-2 text-slate-400" /> Screw Count (Est)
                    </div>
                    <div className="text-center text-sm font-medium">{d1.screws}</div>
                    <div className="text-center text-sm font-medium">{d2.screws}</div>
                </div>

                {/* Row 4: Time */}
                <div className="grid grid-cols-3 p-5 hover:bg-slate-50">
                    <div className="flex items-center text-sm font-bold text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-green-500" /> Time on Bench
                    </div>
                    <div className="text-center text-sm font-bold text-slate-900">{d1.time}</div>
                    <div className="text-center text-sm font-bold text-slate-900">{d2.time}</div>
                </div>
            </div>
        </div>

        {/* --- VIDEO FACE-OFF --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <a href={yt1} target="_blank" className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 flex items-center justify-between transition group">
                <div className="flex items-center">
                    <Youtube className="w-8 h-8 mr-4" />
                    <div>
                        <div className="font-bold text-lg">Watch {phone1.name} Teardown</div>
                        <div className="text-red-200 text-sm">See the inside of this device</div>
                    </div>
                </div>
                <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition">
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
            </a>

            <a href={yt2} target="_blank" className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 flex items-center justify-between transition group">
                <div className="flex items-center">
                    <Youtube className="w-8 h-8 mr-4" />
                    <div>
                        <div className="font-bold text-lg">Watch {phone2.name} Teardown</div>
                        <div className="text-red-200 text-sm">See the inside of this device</div>
                    </div>
                </div>
                <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition">
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
            </a>
        </div>

        {/* --- THE VERDICT TEXT --- */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center">
             <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
             <h3 className="text-3xl font-black text-white mb-4">The Repair Champion is the {cheaperPhone.name}</h3>
             <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                 By choosing to repair the <strong>{cheaperPhone.name}</strong> instead of the {phone1 === cheaperPhone ? phone2.name : phone1.name}, 
                 you are saving approximately <strong>${diff}</strong> in parts cost. 
                 {diff > 50 ? "This is a significant difference due to the expensive display technology used in the loser's screen." : "The prices are competitive, but every dollar counts."}
             </p>
        </div>

      </div>
    </div>
  );
}