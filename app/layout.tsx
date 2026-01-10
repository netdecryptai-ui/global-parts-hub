import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingCart, Search, Menu, PenTool } from "lucide-react";

// ❌ WE REMOVED THE IMPORT (This fixes the error)
// import Footer from "./components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub | DIY Phone Repair Prices",
  description: "Find the best prices for phone screen replacements. Compare Amazon vs AliExpress and save money on DIY repairs.",
};

// --- 👇 WE DEFINE THE FOOTER RIGHT HERE ---
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center text-white font-black text-xl mb-4">
            <PenTool className="h-6 w-6 mr-2 text-orange-500" />
            Global Parts Hub
        </div>
        <div className="text-xs text-slate-500 space-y-2">
            <p><strong>Amazon Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases.</p>
            <p>© 2025 Global Parts Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
// ------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        
        {/* NAVBAR */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-black text-slate-900 hover:opacity-80 transition">
              <div className="bg-orange-600 text-white p-1.5 rounded-lg">
                <PenTool className="h-5 w-5" />
              </div>
              GlobalParts<span className="text-orange-600">Hub</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 items-center">
                <Link href="/rankings" className="font-bold text-slate-600 hover:text-orange-600 transition flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">HOT</span>
                    Tier List
                </Link>
                <Link href="/pin-generator" className="font-bold text-slate-600 hover:text-orange-600 transition">
                    Pin Generator
                </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500">
                <Search className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-grow">
            {children}
        </main>

        {/* FOOTER (Using the function above) */}
        <Footer />
        
      </body>
    </html>
  );
}