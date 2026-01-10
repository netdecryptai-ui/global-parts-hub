// @ts-nocheck
"use client";

import { useState, useRef } from "react";
// We use ../../ because we are deep in app/pin-generator/
import phoneDatabase from "../../data/phones.json"; 
import { RefreshCw } from "lucide-react";

export default function PinGenerator() {
  const [p1Index, setP1Index] = useState(0);
  const [p2Index, setP2Index] = useState(1);
  const pinRef = useRef(null);

  // Fallback if database is empty
  const phones = Array.isArray(phoneDatabase) ? phoneDatabase : [];

  // 1. GENERATE OPTIONS (Saved in a variable to prevent HTML errors)
  const phoneOptions = phones.map((p, i) => (
    <option key={i} value={i}>
      {p.name}
    </option>
  ));

  // 2. SAFE SELECTION
  const p1 = phones[p1Index] || { name: "Loading...", price: "$0", image: "" };
  const p2 = phones[p2Index] || { name: "Loading...", price: "$0", image: "" };

  // 3. PRICE MATH
  const getPrice = (p) => {
    if (!p || !p.price) return 0;
    const cleanString = String(p.price).replace(/[$,]/g, "");
    const rawPrice = parseFloat(cleanString) || 0;
    return Math.floor(rawPrice * 0.12);
  };

  const c1 = getPrice(p1);
  const c2 = getPrice(p2);
  const diff = Math.abs(c1 - c2);
  const winner = c1 < c2 ? p1 : p2;

  const randomize = () => {
    if (phones.length > 0) {
      setP1Index(Math.floor(Math.random() * phones.length));
      setP2Index(Math.floor(Math.random() * phones.length));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/3 p-8 border-r border-slate-700 flex flex-col gap-6 text-white">
        <h1 className="text-3xl font-black text-orange-500 mb-4">📌 Pin Factory</h1>
        
        {/* SELECTOR 1 */}
        <div>
          <label className="block text-sm font-bold mb-2">Phone A</label>
          <select 
            className="w-full bg-slate-800 p-3 rounded-lg border border-slate-600 text-white"
            value={p1Index}
            onChange={(e) => setP1Index(Number(e.target.value))}
          >
            {phoneOptions}
          </select>
        </div>

        {/* SELECTOR 2 */}
        <div>
          <label className="block text-sm font-bold mb-2">Phone B</label>
          <select 
            className="w-full bg-slate-800 p-3 rounded-lg border border-slate-600 text-white"
            value={p2Index}
            onChange={(e) => setP2Index(Number(e.target.value))}
          >
            {phoneOptions}
          </select>
        </div>

        <button onClick={randomize} className="bg-slate-700 hover:bg-slate-600 p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition">
            <RefreshCw className="w-5 h-5" /> Randomize Battle
        </button>

        <div className="bg-slate-800 p-4 rounded-xl text-sm text-slate-400">
            <strong>How to use:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Select two phones.</li>
                <li>Screenshot the card on the right.</li>
                <li>Upload to Pinterest.</li>
            </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-slate-800 flex items-center justify-center p-8 overflow-auto">
         
         <div 
            ref={pinRef}
            className="w-[400px] h-[600px] bg-white relative flex flex-col overflow-hidden shadow-2xl shrink-0"
         >
            {/* HEADER */}
            <div className="bg-slate-900 text-white p-6 text-center z-10">
                <div className="text-orange-500 font-black uppercase tracking-widest text-xs mb-1">Repair Cost Guide</div>
                <h2 className="text-3xl font-black leading-none">STOP<br/>OVERPAYING</h2>
            </div>

            {/* BATTLEGROUND */}
            <div className="flex-1 flex relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 z-0"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-full border-4 border-white z-10">
                    VS
                </div>

                {/* LEFT PHONE */}
                <div className={`w-1/2 flex flex-col items-center justify-center p-4 ${winner === p1 ? 'bg-green-50/50' : ''}`}>
                    <img 
                        src={p1.image || "https://placehold.co/200"} 
                        alt={p1.name}
                        className="h-32 object-contain mb-4 mix-blend-multiply" 
                    />
                    <div className="font-bold text-slate-900 text-center leading-tight mb-2">{p1.name}</div>
                    <div className="font-black text-2xl text-slate-900">${c1}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Screen Cost</div>
                </div>

                {/* RIGHT PHONE */}
                <div className={`w-1/2 flex flex-col items-center justify-center p-4 ${winner === p2 ? 'bg-green-50/50' : ''}`}>
                    <img 
                        src={p2.image || "https://placehold.co/200"} 
                        alt={p2.name}
                        className="h-32 object-contain mb-4 mix-blend-multiply" 
                    />
                    <div className="font-bold text-slate-900 text-center leading-tight mb-2">{p2.name}</div>
                    <div className="font-black text-2xl text-slate-900">${c2}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Screen Cost</div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="bg-green-600 text-white p-6 text-center z-10">
                <div className="uppercase font-bold text-xs opacity-80 mb-1">The Winner Is</div>
                <div className="text-2xl font-black">{winner.name}</div>
                <div className="text-sm font-medium mt-1">
                    Save <span className="font-black underline">${diff}</span> on repairs
                </div>
            </div>

            <div className="absolute bottom-1 right-2 text-[8px] text-white/50 font-bold">
                GlobalPartsHub.com
            </div>
         </div>
      </div>
    </div>
  );
}