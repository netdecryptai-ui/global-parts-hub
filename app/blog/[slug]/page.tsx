import Link from "next/link";
import { ArrowLeft, Clock, User, Share2, Tag, ExternalLink } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- THE TECH JOURNALIST ENGINE 📰 ---
async function generateBlogData(slug: string) {
  
  // Clean up the title
  const rawName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  // Generate a tech header image
  const displayImage = `https://image.pollinations.ai/prompt/high%20tech%20review%20header%20image%20for%20${slug.replace(/-/g, "%20")}%20tech%20gadget%20unboxing?width=1200&height=630&nologo=true`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Write a viral, engaging tech blog post about: "${rawName}".
      Tone: Enthusiastic, critical, and professional (like The Verge).
      Word Count: 600 words.
      
      Structure:
      1. Catchy Title.
      2. Introduction: The Hype.
      3. Key Specs/Features.
      4. Pros & Cons (Bullet points).
      5. Final Verdict.
      
      Format: Use plain text with paragraphs. No markdown symbols.
    `;
    
    const result = await model.generateContent(prompt);
    const content = (await result.response).text();

    return {
      title: rawName,
      content: content,
      image: displayImage,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read"
    };

  } catch (error) {
    return {
      title: rawName,
      content: "Content is being updated. Please check back shortly.",
      image: displayImage,
      date: "Today",
      readTime: "1 min read"
    };
  }
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await generateBlogData(slug);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* HEADER IMAGE */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden bg-slate-900">
        <img src={data.image} className="w-full h-full object-cover opacity-60" alt={data.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-4xl mx-auto">
            <Link href="/" className="text-blue-300 hover:text-white mb-4 inline-flex items-center text-sm font-bold uppercase tracking-wider">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 shadow-sm">{data.title}</h1>
            <div className="flex items-center text-slate-300 text-sm gap-6">
                <span className="flex items-center"><User className="h-4 w-4 mr-2" /> AI Tech Editor</span>
                <span className="flex items-center"><Clock className="h-4 w-4 mr-2" /> {data.readTime}</span>
            </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-slate-100">
            
            {/* AD SLOT 1 */}
            <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center mb-10 text-slate-400 text-xs tracking-widest uppercase">
                [ Sponsored Ad Space ]
            </div>

            <article className="prose prose-lg text-slate-700 leading-relaxed whitespace-pre-wrap font-serif">
                {data.content}
            </article>

            {/* AD SLOT 2 */}
            <div className="w-full h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center mt-10 text-slate-400 text-xs tracking-widest uppercase">
                [ Sponsored Ad Space ]
            </div>

            {/* SHARE SECTION (FIXED) */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                <p className="font-bold text-slate-900">Share this article</p>
                <div className="flex gap-4">
                    {/* Replaced <button> with <a> to avoid Server Component errors */}
                    <a 
                      href={`https://twitter.com/intent/tweet?text=Check out this review of ${data.title}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center gap-2 text-sm font-bold"
                    >
                        <Share2 className="h-4 w-4" /> Share on X
                    </a>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}