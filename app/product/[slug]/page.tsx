import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle, PenTool, Hammer, Globe, Youtube, Zap } from "lucide-react";
import type { Metadata } from "next";
// @ts-ignore
import phoneDatabase from "../../data/phones.json";

type Props = {
  params: Promise<{ slug: string }>;
};

// --- FEATURE 1: DYNAMIC SEO TITLES ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // @ts-ignore
  const phone = phoneDatabase.find((p: any) => p.slug === slug);
  
  if (!phone) {
    return { title: "Part Not Found | Global Parts Hub" };
  }

  return {
    title: `${phone.name} Screen Replacement Price & Repair Guide`,
    description: `Compare prices for ${phone.name} screen replacement. Best deals from Amazon and AliExpress. Repair difficulty: ${phone.difficulty}.`,
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  // @ts-ignore
  const data = phoneDatabase.find((p: any) => p.slug === slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">
        Phone not found in database.
      </div>
    );
  }

  // --- SAFE MATH & LINKS ---
  const priceString = data.price ? String(data.price).replace(/[$,]/g, "") : "0"; 
  const phonePriceRaw = parseFloat(priceString) || 800;
  const amazonPrice = Math.floor(phonePriceRaw * 0.12);
  const aliPrice = Math.floor(amazonPrice * 0.60);
  
  const safeName = data.name ? data.name.replace(/ /g, "+") : "phone";
  const aliLink = `https://www.aliexpress.com/wholesale?SearchText=${safeName}+screen+replacement`;
  const youtubeSearch = `https://www.youtube.com/results?search_query=${safeName}+screen+replacement+guide`;
  const amazonLinkSafe = data.amazonLink || "https://www.amazon.com";

  // --- RELATED PARTS LOGIC ---
  const currentBrand = data.name ? data.name.split(" ")[0] : "Apple";
  // @ts-ignore
  const relatedPhones = phoneDatabase
    // @ts-ignore
    .filter((p: any) => p.name && p.name.includes(currentBrand) && p.slug !== slug)
    .slice(0, 4); 

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb */}
        <Link href="/" className="text-slate-500 hover:text-orange-600 mb-8 inline-flex items-center font-bold transition">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        {/* --- HERO SECTION --- */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row mb-12 border border-slate-100">
           
           {/* IMAGE */}
           <div className="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center border-r border-slate-100 relative">
              <img 
                 src={data.image || "https://placehold.co/400x400"} 
                 alt={`${data.name} screen repair`}
                 className="max-h-96 w-auto object-contain drop-shadow-2xl hover:scale-105 transition duration-500" 
              />
           </div>

           {/* BUY BOX */}
           <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black w-fit mb-4 flex items-center tracking-wider uppercase">
                  <CheckCircle className="h-3 w-3 mr-1" /> Verified Part
              </span>
              
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
                {data.name} <span className="text-slate-400 font-medium">Screen Kit</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8 mt-2">
                 <span className="text-sm font-bold text-slate-500 flex items-center bg-slate-100 px-2 py-1 rounded">
                    <Hammer className="w-3 h-3 mr-1" /> Difficulty: {data.difficulty || "Moderate"}
                 </span>
                 <span className="text-sm font-bold text-slate-500 flex items-center bg-slate-100 px-2 py-1 rounded">
                    <PenTool className="w-3 h-3 mr-1" /> OEM Grade
                 </span>
              </div>
              
              {/* PRICES */}
              <div className="space-y-4">
                  {/* Amazon */}
                  <div className="p-4 rounded-2xl border-2 border-orange-100 bg-orange-50/30 hover:border-orange-200 transition">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Fastest Option</div>
                            <div className="text-4xl font-black text-slate-900">${amazonPrice}.99</div>
                        </div>
                        <div className="font-bold text-slate-400">Amazon</div>
                    </div>
                    <a href={amazonLinkSafe} target="_blank" className="w-full bg-[#FF9900] hover:bg-[#ffad33] text-white font-black text-lg py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition transform active:scale-95">
                        <ShoppingCart className="h-5 w-5" /> Check Price on Amazon
                    </a>
                  </div>

                  {/* AliExpress */}
                  <div className="p-4 rounded-2xl border border-slate-200 hover:border-red-200 transition">
                     <div className="flex justify-between items-end mb-2">
                        <div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Budget Option</div>
                             <div className="text-2xl font-black text-red-600">${aliPrice}.99</div>
                        </div>
                        <span className="font-bold text-slate-400 text-sm">AliExpress</span>
                     </div>
                     <a href={aliLink} target="_blank" className="w-full bg-white border-2 border-slate-100 hover:border-red-500 hover:text-red-600 text-slate-600 font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 transition">
                        <Globe className="h-5 w-5" /> View Budget Deal
                    </a>
                  </div>
              </div>
           </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* LEFT: SPECS */}
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center">
                        <PenTool className="h-5 w-5 mr-2 text-orange-600"/> Tech Specs
                    </h3>
                    <div className="space-y-3 text-sm">
                        {data.specs && Object.keys(data.specs).map((key: string) => (
                            <div key={key} className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-400 capitalize">{key}</span>
                                {/* THE FIX IS BELOW: Using (as any) to satisfy TypeScript */}
                                <span className="font-bold text-slate-700 text-right">
                                    {(data.specs as any)[key]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FEATURE 2: VIDEO LINK CARD */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition"></div>
                    <h3 className="font-bold text-lg mb-2 flex items-center"><Youtube className="mr-2 text-red-500" /> Need Help?</h3>
                    <p className="text-slate-400 text-sm mb-4">Watch a step-by-step teardown guide for the {data.name} before you buy.</p>
                    <a href={youtubeSearch} target="_blank" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm">
                        Watch Tutorials on YouTube
                    </a>
                </div>
            </div>

            {/* RIGHT: REVIEW */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
                <h2 className="text-2xl font-black text-slate-900 mb-4">
                    Is the {data.name} worth fixing?
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    If your <strong>{data.name}</strong> has a cracked screen or a dying battery, repairing it yourself can save you over $150 compared to a repair shop. The parts listed above are compatible with model numbers <strong>{slug.replace(/-/g, "").toUpperCase()}</strong>.
                </p>
                
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded-r-lg">
                    <h4 className="text-orange-800 font-bold m-0 flex items-center"><Zap className="w-4 h-4 mr-2"/> Pro Tip</h4>
                    <p className="text-orange-800/80 m-0 text-sm mt-1">
                        Always disconnect the battery connector first when opening the {data.name}. This prevents short circuits on the motherboard.
                    </p>
                </div>

                <h3 className="font-bold text-slate-900">What's in the kit?</h3>
                <ul className="text-slate-600">
                    <li>1x OLED/LCD Display Assembly</li>
                    <li>1x Pre-cut Waterproof Adhesive</li>
                    <li>1x Tool Set (Screwdrivers, Spudgers, Suction Cup)</li>
                </ul>
            </div>
        </div>

        {/* --- FEATURE 3: RELATED PARTS --- */}
        {relatedPhones.length > 0 && (
            <div className="border-t border-slate-200 pt-12">
                <h3 className="text-xl font-black text-slate-900 mb-6">Other {currentBrand} Parts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedPhones.map((phone: any, i: number) => (
                        <Link key={i} href={`/product/${phone.slug}`} className="bg-white p-4 rounded-xl border border-slate-100 hover:shadow-lg transition group">
                            <div className="h-32 mb-3 flex items-center justify-center">
                                <img src={phone.image} className="h-full object-contain group-hover:scale-110 transition" alt={phone.name}/>
                            </div>
                            <div className="font-bold text-slate-900 text-sm">{phone.name}</div>
                            <div className="text-orange-600 text-xs font-bold">View Prices →</div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}