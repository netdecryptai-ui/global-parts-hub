// @ts-nocheck
"use client";

import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

// EMBEDDED DATA
const PHONES = [
  { name: "iPhone 13", price: 149, image: "https://m.media-amazon.com/images/I/61l9ppRIiqL._AC_SX679_.jpg" },
  { name: "iPhone 14", price: 189, image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SX679_.jpg" },
  { name: "Samsung S22", price: 159, image: "https://m.media-amazon.com/images/I/61U+rn12W+L._AC_SX679_.jpg" },
  { name: "Samsung S23", price: 199, image: "https://m.media-amazon.com/images/I/71oxr1R+C+L._AC_SX679_.jpg" },
  { name: "Pixel 7", price: 129, image: "https://m.media-amazon.com/images/I/61N9DS+gWkL._AC_SX679_.jpg" },
  { name: "Pixel 6", price: 99, image: "https://m.media-amazon.com/images/I/61oQTjPgQML._AC_SX679_.jpg" }
];

export default function VideoGenerator() {
  const [p1, setP1] = useState(PHONES[0]);
  const [p2, setP2] = useState(PHONES[1]);
  const [stage, setStage] = useState(0); // 0=Idle, 1=Intro, 2=P1 Reveal, 3=P2 Reveal, 4=Winner
  
  // ANIMATION SEQUENCER
  const playAnimation = () => {
    setStage(1); // Show Title
    setTimeout(() => setStage(2), 1500); // Show Phone 1
    setTimeout(() => setStage(3), 3000); // Show Phone 2
    setTimeout(() => setStage(4), 4500); // Show Winner
  };

  const reset = () => setStage(0);

  const winner = p1.price < p2.price ? p1 : p2;
  const loser = p1.price < p2.price ? p2 : p1;
  const savings = Math.abs(p1.price - p2.price);

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* CONTROLS (Hidden during recording) */}
      <div className="w-full md:w-80 p-6 bg-slate-900 border-r border-slate-800 z-50 flex flex-col gap-6">
        <h1 className="text-2xl font-black text-red-500 flex items-center gap-2">
            🎬 Shorts Bot
        </h1>
        
        <div className="space-y-4">
            <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Left Corner</label>
                <select className="w-full bg-slate-800 text-white p-2 rounded mt-1 border border-slate-700"
                    onChange={(e) => setP1(PHONES[e.target.value])}>
                    {PHONES.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
                </select>
            </div>
            <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Right Corner</label>
                <select className="w-full bg-slate-800 text-white p-2 rounded mt-1 border border-slate-700"
                    onChange={(e) => setP2(PHONES[e.target.value])} defaultValue={1}>
                    {PHONES.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
                </select>
            </div>
        </div>

        <button onClick={playAnimation} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/50 transition">
            <Play className="fill-white" /> ACTION!
        </button>
        
        <button onClick={reset} className="bg-slate-800 text-slate-400 hover:text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition">
            <RotateCcw className="w-4 h-4" /> Reset Stage
        </button>

        <div className="text-slate-500 text-xs leading-relaxed">
            <strong>How to use:</strong>
            <ol className="list-decimal pl-4 mt-2 space-y-1">
                <li>Start Screen Recording.</li>
                <li>Click "ACTION".</li>
                <li>Wait 10 seconds.</li>
                <li>Stop recording.</li>
            </ol>
        </div>
      </div>

      {/* 🎥 THE STAGE (1080x1920 Vertical Video Area) */}
      <div className="flex-1 bg-black flex items-center justify-center relative">
         
         {/* PHONE FRAME MASK */}
         <div className="w-[400px] h-[711px] bg-slate-100 relative overflow-hidden shadow-2xl flex flex-col">
            
            {/* BACKGROUND ANIMATION */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 via-slate-200 to-slate-300"></div>

            {/* STAGE 1: INTRO TEXT */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`text-center transition-transform duration-700 ${stage > 1 ? '-translate-y-40 scale-75' : 'scale-100'}`}>
                    <h2 className="text-4xl font-black text-slate-900 leading-none mb-2">SCREEN<br/>REPAIR</h2>
                    <div className="bg-red-600 text-white px-4 py-1 font-bold text-xl inline-block -rotate-2">BATTLE</div>
                </div>
            </div>

            {/* FIGHTERS CONTAINER */}
            <div className="flex-1 grid grid-rows-2 relative z-10 mt-32">
                
                {/* PLAYER 1 (TOP) */}
                <div className={`flex flex-col items-center justify-center transition-all duration-700 transform ${stage >= 2 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <img 
                        src={p1.image} 
                        alt="Phone 1" 
                        className="h-32 object-contain mix-blend-multiply drop-shadow-xl" 
                    />
                    <h3 className="font-black text-2xl text-slate-800 mt-2">{p1.name}</h3>
                    <div className="text-4xl font-black text-red-600">${p1.price}</div>
                </div>

                {/* PLAYER 2 (BOTTOM) */}
                <div className={`flex flex-col items-center justify-center transition-all duration-700 delay-100 transform ${stage >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <div className="w-full h-1 bg-slate-300 mb-6 relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 px-2 font-bold text-slate-400">VS</div>
                    </div>
                    <img 
                        src={p2.image} 
                        alt="Phone 2" 
                        className="h-32 object-contain mix-blend-multiply drop-shadow-xl" 
                    />
                    <h3 className="font-black text-2xl text-slate-800 mt-2">{p2.name}</h3>
                    <div className="text-4xl font-black text-red-600">${p2.price}</div>
                </div>
            </div>

            {/* STAGE 4: WINNER OVERLAY */}
            <div className={`absolute inset-0 bg-green-600/95 flex flex-col items-center justify-center text-white transition-all duration-500 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                <div className="text-2xl font-bold uppercase tracking-widest mb-2">Winner</div>
                <h1 className="text-5xl font-black mb-4 text-center leading-none">{winner.name}</h1>
                <div className="bg-white text-green-700 px-6 py-2 rounded-full font-bold text-xl mb-8 animate-bounce">
                    Save ${savings}
                </div>
                <div className="text-sm opacity-80 font-medium">Find parts at</div>
                <div className="font-bold text-lg">GlobalPartsHub.com</div>
            </div>

         </div>
      </div>
    </div>
  );
}