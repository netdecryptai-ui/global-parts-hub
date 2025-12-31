import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle, ShoppingCart, ExternalLink } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// 1. IMPORT YOUR REAL DATA
import phoneData from "../../data/phones.json"; 

// Define the shape of your local data
interface LocalPhone {
  slug: string;
  model: string;
  image: string;
  description: string;
  price_usd: number;
  difficulty: string;
}

// --- THE BLOG GENERATION ENGINE ✍️ ---
async function generateArticleData(slug: string) {
  
  // A. CHECK LOCAL JSON FIRST
  const localPhone = (phoneData as LocalPhone[]).find((p) => p.slug === slug);

  // Make title readable (e.g. "iphone-13" -> "iPhone 13")
  const rawName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const blogTitle = `How to Repair the ${rawName}: Complete Guide`;
  const affiliateTag = "stanley05-20"; 
  const amazonLink = `https://www.amazon.com/s?k=${slug.replace(/-/g, "+")}+repair+part&tag=${affiliateTag}`;

  // B. DETERMINE IMAGE (Real vs AI)
  // If we have a local phone, use its image. If not, use Pollinations AI.
  const displayImage = localPhone 
    ? localPhone.image 
    : `https://image.pollinations.ai/prompt/photorealistic%20product%20shot%20of%20${slug.replace(/-/g, "%20")}%20smartphone%20white%20background?width=800&height=600&nologo=true&seed=${Math.floor(Math.random() * 100)}`;

  // C. GENERATE BLOG CONTENT
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.0-pro"];
    let aiText = "";

    // Loop through models until one works
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = `
          Write a comprehensive, SEO-friendly blog post about repairing the "${rawName}".
          Target Audience: DIY enthusiasts looking to save money.
          Word Count: Approx 400 words.
          
          Structure the article exactly like this:
          1. Introduction: Why is the ${rawName} worth keeping? (Mention specific features).
          2. Common Issues: Discuss screen cracks and battery degradation briefly.
          3. Tools Needed: List standard tools (screwdriver, spudger, heat gun).
          4. Safety Warning: Reminder to disconnect battery.
          5. Conclusion: Encouraging final thought about saving money by doing it yourself.

          Format: Use plain text with paragraphs. Do NOT use Markdown symbols like # or **.
        `;
        
        const result = await model.generateContent(prompt);
        aiText = (await result.response).text();
        if (aiText) break; 
      } catch (e) { continue; }
    }

    if (!aiText) throw new Error("AI Failed");

    return {
      title: blogTitle,
      content: aiText,
      amazonLink: amazonLink,
      isAiGenerated: !localPhone, // True if we didn't find it in JSON
      image: displayImage,
      modelName: rawName
    };

  } catch (error) {
    // Fallback Content
    return {
      title: `Repair Guide: ${rawName}`,
      content: `Learn how to fix your ${rawName} with our comprehensive guide. We cover screen replacement, battery issues, and more. Ensuring you have the right parts is the first step to a successful repair.`,
      amazonLink: amazonLink,
      isAiGenerated: false,
      image: displayImage,
      modelName: rawName
    };
  }
}

// --- THE PAGE COMPONENT ---
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await generateArticleData(slug);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* BACK BUTTON */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          {/* LEFT: IMAGE AREA */}
          <div className="w-full md:w-1/2 bg-slate-100 p-8 flex flex-col items-center justify-start relative">
            <div className="sticky top-8 w-full">
                <img 
                src={data.image} 
                alt={`${data.modelName} Repair`}
                className="rounded-xl shadow-lg w-full h-auto object-cover border-4 border-white mb-6"
                />
                
                {data.isAiGenerated && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur text-slate-600 text-xs font-bold rounded-full shadow-sm">
                        Generated Image
                    </div>
                )}

                {/* TRUST BADGES */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase">Difficulty</p>
                        <p className="font-bold text-slate-700">Moderate</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase">Time</p>
                        <p className="font-bold text-slate-700">45 Mins</p>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT: BLOG CONTENT AREA */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-white">
            
            <span className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">DIY Repair Blog</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{data.title}</h1>
            
            {/* --- AD SLOT 1 (Top) --- */}
            {/* This empty box is where Google AdSense will go later */}
            <div className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center mb-8 text-slate-400 text-xs uppercase tracking-widest">
               [ Advertisement Space ]
            </div>

            {/* THE AI BLOG POST */}
            <article className="prose prose-slate lg:prose-lg text-slate-600 mb-8 whitespace-pre-wrap leading-relaxed">
                {data.content}
            </article>

            {/* --- AD SLOT 2 (Middle) --- */}
            <div className="w-full h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center mb-8 text-slate-400 text-xs uppercase tracking-widest">
               [ Advertisement Space ]
            </div>

            {/* AFFILIATE CALL TO ACTION */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-auto shadow-sm">
                <p className="text-sm text-amber-600 font-bold uppercase mb-1">Ready to fix it?</p>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Get the Full {data.modelName} Repair Kit</h3>
                
                <a 
                href={data.amazonLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-amber-200/50 transition flex items-center justify-center gap-2 text-lg"
                >
                <ShoppingCart className="h-5 w-5" /> 
                Check Price on Amazon
                <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Check className="h-3 w-3 text-green-500" /> Amazon Secure Checkout
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}