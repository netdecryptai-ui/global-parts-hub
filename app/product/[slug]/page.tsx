import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. IMPORT REAL DATA SAFELY
let phoneDatabase: any[] = [];
try {
  phoneDatabase = require("../../data/phones.json");
} catch (e) { phoneDatabase = []; }

// --- THE HYBRID ENGINE ---
async function generateArticleData(slug: string) {
  const realPhone = phoneDatabase.find((p: any) => p.slug === slug || slug.includes(p.slug));

  // IF REAL DATA EXISTS
  if (realPhone) {
    return {
      title: realPhone.name,
      content: `
        <h2>Expert Review</h2>
        <p>${realPhone.description}</p>
        <h2>Why Buy This Part?</h2>
        <p>This is a verified component compatible with your device. It has been selected for its quality and ease of installation.</p>
        <h2>Installation Difficulty: ${realPhone.difficulty}</h2>
        <p>We recommend having a heat gun and pry tools ready.</p>
      `,
      price: realPhone.price,
      image: realPhone.image,
      amazonLink: realPhone.amazonLink,
      isRealData: true
    };
  }

  // FALLBACK TO AI
  const rawName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const aiImage = `https://image.pollinations.ai/prompt/photorealistic%20product%20photo%20of%20${slug.replace(/-/g, "%20")}%20spare%20part%20on%20white%20studio%20background?width=800&height=600&nologo=true`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Write a product description for: "${rawName}". Include Price, Difficulty, and Tools. Format using HTML tags like <h2> and <p>.`);
    
    return {
      title: rawName,
      content: result.response.text(),
      price: "Check Amazon",
      image: aiImage,
      amazonLink: `https://www.amazon.com/s?k=${slug.replace(/-/g, "+")}&tag=stanley05-20`,
      isRealData: false
    };
  } catch (e) {
    return {
      title: rawName,
      content: "<p>Details currently unavailable.</p>",
      price: "Check Price",
      image: aiImage,
      amazonLink: `https://www.amazon.com/s?k=${slug.replace(/-/g, "+")}&tag=stanley05-20`,
      isRealData: false
    };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await generateArticleData(slug);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-slate-500 hover:text-blue-600 mb-8 inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
           {/* PRODUCT IMAGE (FIXED WITH PROXY) */}
           <div className="md:w-1/2 bg-white p-8 flex items-center justify-center border-r border-slate-100">
              <img 
                 src={`https://wsrv.nl/?url=${encodeURIComponent(data.image)}&w=800`} 
                 alt={data.title} 
                 className="max-h-80 object-contain hover:scale-105 transition" 
              />
           </div>

           {/* PRODUCT DETAILS */}
           <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              {data.isRealData && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold w-fit mb-4 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" /> VERIFIED PART
                </span>
              )}
              
              <h1 className="text-3xl font-black text-slate-900 mb-4">{data.title}</h1>
              <div className="text-4xl font-bold text-blue-600 mb-6">{data.price}</div>
              
              <a href={data.amazonLink} target="_blank" className="w-full bg-[#FF9900] hover:bg-[#ffad33] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition transform hover:-translate-y-1">
                <ShoppingCart className="h-5 w-5" /> Buy on Amazon
              </a>
           </div>
        </div>

        <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm prose prose-slate max-w-none">
           <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </div>
  );
}