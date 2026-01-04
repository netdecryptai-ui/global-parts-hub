import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub | Find Parts for Any Device",
  description: "Compare prices for smartphone screens, batteries, and repair parts. Find the best deals on Amazon and AliExpress.",
  
  // --- ✅ YOUR CODE IS FIXED BELOW ---
  verification: {
    google: "8pwOVjR3QUle2_9MMKEbBiGB4jK3FkJW-Ao0woMdhIQ",
  },
  
  alternates: {
    canonical: 'https://global-parts-hub.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900`}>
        
        {/* --- NAVBAR --- */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:opacity-80 transition">
                <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-black">G</div>
                <span>GlobalParts<span className="text-blue-600">Hub</span></span>
            </Link>
        </nav>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
            {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 text-sm text-slate-500 mb-6">
             <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
             <Link href="/contact" className="hover:text-blue-600">Contact</Link>
              <Link href="/sitemap.xml" className="hover:text-blue-600">Sitemap</Link>
            </div>
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Global Parts Hub</p>
            <p className="text-xs text-slate-300 mt-2">As an Amazon and AliExpress Associate, we earn from qualifying purchases.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}