"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle, PenTool, AlertTriangle, Hammer, Globe } from "lucide-react";
import { useState, useEffect } from "react";
// IMPORT DATA
import phoneDatabase from "../../data/phones.json";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [data, setData] = useState<any>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      // @ts-ignore
      const realPhone = phoneDatabase.find((p: any) => p.slug === resolvedParams.slug || resolvedParams.slug.includes(p.slug));
      
      if (realPhone) {
        const priceString = realPhone.price.replace(/[$,]/g, ""); 
        const phonePriceRaw = parseFloat(priceString) || 800;
        
        // Amazon Price (Expensive, Fast)
        const amazonPrice = Math.floor(phonePriceRaw * 0.12);
        
        // AliExpress Price (Cheap, Slow) - Usually 40% cheaper than Amazon
        const aliPrice = Math.floor(amazonPrice * 0.60);

        setData({
          ...realPhone,
          partPrice: `$${amazonPrice}.99`,
          aliPrice: `$${aliPrice}.99`, // Calculated cheap price
          title: `${realPhone.name} Replacement Screen & Digitizer`,
          // Smart Search Link for AliExpress
          aliLink: `https://www.aliexpress.com/wholesale?SearchText=${realPhone.name.replace(/ /g, "+")}+screen+replacement`
        });
      } else {
         // Fallback
         setData({
            name: "Unknown Device",
            title: "Universal Screen Kit",
            partPrice: "$45.99",
            aliPrice: "$25.99",
            image: "",
            specs: {},
            amazonLink: "https://www.amazon.com",
            aliLink: "https://www.aliexpress.com"
         });
      }
    });
  }, [params]);

  if (!data) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Part Details...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-slate-500 hover:text-blue-600 mb-8 inline-flex items-center font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row mb-12">
           {/* IMAGE */}
           <div className="md:w-1/2 bg-white p-8 flex items-center justify-center border-r border-slate-100 relative group">
              <img 
                 src={imageError ? "https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&w=800&q=80" : data.image} 
                 alt={data.title} 
                 onError={() => setImageError(true)}
                 className="max-h-96 object-contain group-hover:scale-105 transition duration-500" 
              />
           </div>

           {/* BUY SECTION */}
           <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black w-fit mb-4 flex items-center tracking-wider">
                  <CheckCircle className="h-3 w-3 mr-1" /> IN STOCK
              </span>
              
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">{data.title}</h1>
              <p className="text-slate-500 mb-6 text-sm">{data.name} • OEM Grade</p>
              
              {/* PRIMARY OPTION: AMAZON */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                    <div className="text-4xl font-black text-blue-600">{data.partPrice}</div>
                    <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Fast Shipping 🇺🇸</div>
                </div>
                <a href={data.amazonLink} target="_blank" className="w-full bg-[#FF9900] hover:bg-[#ffad33] text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition transform hover:-translate-y-1">
                    <ShoppingCart className="h-6 w-6" /> Buy on Amazon
                </a>
              </div>

              {/* SECONDARY OPTION: ALIEXPRESS */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-baseline gap-3 mb-2">
                    <div className="text-2xl font-black text-red-600">{data.aliPrice}</div>
                    <div className="text-sm font-bold text-slate-400">Economy Shipping 🚢</div>
                </div>
                <a href={data.aliLink} target="_blank" className="w-full bg-white border-2 border-slate-200 hover:border-red-500 hover:text-red-600 text-slate-600 font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 transition">
                    <Globe className="h-5 w-5" /> Buy on AliExpress
                </a>
              </div>
              
           </div>
        </div>

        {/* CONTENT SECTION (Unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center">
                        <PenTool className="h-5 w-5 mr-2 text-blue-600"/> Specifications
                    </h3>
                    <div className="space-y-3 text-sm">
                        {data.specs && Object.keys(data.specs).map((key) => (
                            <div key={key} className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-400 capitalize">{key}</span>
                                <span className="font-bold text-slate-700 text-right">{data.specs[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
                <h2 className="text-2xl font-black text-slate-900 mb-4">Expert Review</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {data.description || "High quality replacement part."}
                </p>
                <hr className="my-8 border-slate-100"/>
                <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
                    <Hammer className="h-5 w-5 mr-2 text-orange-500"/> Installation Difficulty
                </h3>
                <p>We classify this as a <strong>{data.difficulty || "Moderate"}</strong> repair.</p>
            </div>
        </div>

      </div>
    </div>
  );
}