import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub | AI Repair Guides & Tech News",
  description: "Instant AI-generated repair guides, parts lists, and tech reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* NO HEADER / NO LOGIN BUTTON HERE */}

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
            {children}
        </main>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center">
            
            <p className="font-black text-slate-900 text-2xl mb-6 tracking-tight">Global Parts Hub</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 mb-8 font-medium">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              {/* Note: Ensure you have created the privacy-policy page if you click these */}
              <Link href="/blog/privacy-policy" className="hover:text-blue-600 transition">Privacy Policy</Link>
            </div>
            
            <div className="max-w-3xl mx-auto bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Disclaimer:</strong> Global Parts Hub is an independent technology news and educational information aggregator. 
                We are not affiliated with, endorsed by, or connected to Apple Inc., Samsung, Tesla, or any other company mentioned. 
                </p>
            </div>
            
            <p className="text-xs text-slate-300 mt-6">© 2025 Global Parts Hub. All rights reserved.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}