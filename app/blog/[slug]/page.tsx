import Link from "next/link";
import { ArrowLeft, Tag, Calendar, Check, X } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. IMPORT REAL DATA
let phoneDatabase: any[] = [];
try {
  phoneDatabase = require("../../data/phones.json");
} catch (e) {
  phoneDatabase = [];
}

// --- THE FACT-CHECKED WRITER ---
async function generateBlogData(slug: string) {
  
  // Clean up the title (e.g. "iphone-13-review")
  const rawName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  // CHECK FOR REAL DATA FIRST
  // We look for a phone in your JSON that matches the slug
  const realData = phoneDatabase.find((p: any) => slug.includes(p.slug) || p.slug.includes(slug));

  let prompt = "";
  
  if (realData && realData.specs) {
    console.log(`✅ Found REAL FACTS for ${slug}`);
    // --- STRATEGY: CONTEXT INJECTION ---
    // We feed the JSON data into the prompt so the AI can't lie.
    prompt = `
      Write a professional tech review blog post for the "${realData.name}".
      
      CRITICAL INSTRUCTION: You must use the following REAL DATA. Do not invent specs.
      - Screen: ${realData.specs.screen}
      - Processor: ${realData.specs.processor}
      - Battery: ${realData.specs.battery}
      - Release Year: ${realData.specs.releaseYear}
      - Key Pros: ${realData.realPros.join(", ")}
      - Key Cons: ${realData.realCons.join(", ")}
      
      Structure:
      1. Introduction (Hook the reader).
      2. Display & Design (Discuss the ${realData.specs.screen}).
      3. Performance (Discuss the ${realData.specs.processor}).
      4. The Verdict (Is it worth buying in 2026?).
      
      Tone: Objective, helpful, and tech-savvy.
      Format: HTML with <h2> and <p> tags.
    `;
  } else {
    // Fallback if no data exists (Standard AI)
    console.log(`⚠️ No real data for ${slug}. Using general knowledge.`);
    prompt = `Write a general tech review about ${rawName}. Focus on industry rumors and general features. Use HTML format.`;
  }

  // GENERATE CONTENT
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const content = result.response.text();

  // IMAGE SELECTION (Real vs AI)
  const displayImage = (realData && realData.image) 
    ? realData.image 
    : `https://image.pollinations.ai/prompt/tech%20blog%20header%20${slug}?nologo=true`;

  return {
    title: realData ? `${realData.name} Review: The Truth` : `${rawName} Review`,
    content: content,
    image: displayImage,
    date: new Date().toLocaleDateString(),
    specs: realData ? realData.specs : null // Pass specs to UI if they exist
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await generateBlogData(slug);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* HEADER IMAGE */}
      <div className="w-full h-80 relative bg-slate-900">
        <img src={data.image} className="w-full h-full object-cover opacity-60" alt={data.title} />
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-900 to-transparent">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-blue-300 hover:text-white mb-2 inline-flex items-center text-sm font-bold uppercase">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back Home
                </Link>
                <h1 className="text-4xl font-black text-white">{data.title}</h1>
                <div className="flex gap-4 mt-4 text-slate-300 text-sm">
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-2"/> {data.date}</span>
                    <span className="flex items-center"><Tag className="h-4 w-4 mr-2"/> Tech Review</span>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-slate-100">
            
            {/* IF WE HAVE REAL SPECS, SHOW A 'QUICK SPECS' BOX */}
            {data.specs && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Quick Specs (Verified)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Screen</span>
                            <span className="font-medium">{data.specs.screen}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Processor</span>
                            <span className="font-medium">{data.specs.processor}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Battery</span>
                            <span className="font-medium">{data.specs.battery}</span>
                        </div>
                         <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Release</span>
                            <span className="font-medium">{data.specs.releaseYear}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* THE AI WRITTEN CONTENT */}
            <article className="prose prose-lg text-slate-700 leading-relaxed max-w-none">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </article>

        </div>
      </div>
    </div>
  );
}