"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle, PenTool, AlertTriangle, Hammer } from "lucide-react";
import { useState, useEffect } from "react";
// IMPORT DATA
import phoneDatabase from "../../data/phones.json";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
      
      // @ts-ignore
      const realPhone = phoneDatabase.find((p: any) => p.slug === resolvedParams.slug || resolvedParams.slug.includes(p.slug));
      
      if (realPhone) {
        // --- NEW PRICING ALGORITHM (Based on Market Research) ---
        // 1. Extract the raw number (remove $ and commas)
        const phonePriceRaw = parseInt(realPhone.price.replace(/[^0-9]/g, '')) || 800;
        
        // 2. Apply the "12% Rule" (Market average for screen replacements)
        let estimatedPartPrice = phonePriceRaw * 0.12;

        // 3. Round to nearest whole number and add .99 for psychological pricing
        estimatedPartPrice = Math.floor(estimatedPartPrice);
        const finalPartPrice = `$${estimatedPartPrice}.99`;

        setData({
          ...realPhone,
          partPrice: finalPartPrice, // e.g. $144.99 instead of $1,199
          title: `${realPhone.name} Replacement Screen & Digitizer`
        });
      } else {
         // Fallback
         setData({
            name: "Unknown Device",
            title: "Universal Smartphone Screen Kit",
            partPrice: "$45.99",
            description: "Compatible with various models.",
            image: "",
            specs: {},
            amazonLink: "https://www.amazon.com/s?k=smartphone+screen+replacement"
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

        {/* --- MAIN PRODUCT CARD --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row mb-12">
           
           {/* IMAGE SECTION */}
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
              <p className="text-slate-500 mb-6 text-sm">{data.name} • OEM Grade • Tested</p>
              
              <div className="flex items-baseline gap-3 mb-8">
                  {/* THE NEW CALCULATED PRICE */}
                  <div className="text-5xl font-black text-blue-600">{data.partPrice}</div>
                  
                  {/* FAKE "ORIGINAL" PRICE (Higher Anchor) */}
                  <div className="text-lg text-slate-400 line-through decoration-red-400 decoration-2">
                    ${(parseInt(data.partPrice.replace(/[^0-9]/g, '')) * 1.5 / 100).toFixed(0)}.99
                  </div>
              </div>
              
              <a href={data.amazonLink} target="_blank" className="w-full bg-[#FF9900] hover:bg-[#ffad33] text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition transform hover:-translate-y-1">
                <ShoppingCart className="h-6 w-6" /> Check Availability on Amazon
              </a>
              
              <div className="mt-6 flex gap-4 text-xs text-slate-500 font-bold justify-center">
                  <span className="flex items-center"><CheckCircle className="h-3 w-3 mr-1 text-green-500"/> Free Shipping</span>
                  <span className="flex items-center"><CheckCircle className="h-3 w-3 mr-1 text-green-500"/> 30-Day Return</span>
              </div>
           </div>
        </div>

        {/* --- SEO BLOG CONTENT (Makes the page long) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* SPECS & SAFETY */}
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
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-400">Part Quality</span>
                            <span className="font-bold text-slate-700 text-right">Premium Aftermarket</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-black text-blue-800 mb-2 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2"/> Tech Tip
                    </h3>
                    <p className="text-sm text-blue-700/80 leading-relaxed">
                        If your touch screen is "ghost touching" but the glass is not broken, you still need to replace the entire assembly (LCD/OLED + Glass).
                    </p>
                </div>
            </div>

            {/* LONG DESCRIPTION */}
            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
                <h2 className="text-2xl font-black text-slate-900 mb-4">
                    Expert Review: {data.name} Screen Assembly
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Restore your <strong>{data.name}</strong> to its former glory. This complete replacement kit addresses the most common display issues: cracked glass, dead pixels, and unresponsive touch layers. 
                    {data.description}
                </p>

                <hr className="my-8 border-slate-100"/>

                <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
                    <Hammer className="h-5 w-5 mr-2 text-orange-500"/> Difficulty: {data.difficulty || "Moderate"}
                </h3>
                <p>
                    Replacing the screen on a modern device like the {data.name} involves handling delicate ribbon cables. 
                    We classify this as a <strong>{data.difficulty || "Moderate"}</strong> repair.
                </p>
                
                <h4 className="font-bold mt-6 mb-2">Required Tools:</h4>
                <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-600">
                    <li>Heat Gun (or Hair Dryer)</li>
                    <li>Phillips #000 Screwdriver</li>
                    <li>Pentalobe P2 Screwdriver (for iPhones)</li>
                    <li>Plastic Spudger Tool</li>
                    <li>Waterproof Adhesive Seal</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Quality Promise</h3>
                <p>
                    Every screen is factory tested before shipping to ensure 0 dead pixels and perfect color calibration. 
                    Compatible with Model Numbers: {data.slug.toUpperCase()} (and regional variants).
                </p>
            </div>

        </div>

      </div>
    </div>
  );
}