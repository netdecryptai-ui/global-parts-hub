import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub | Professional Repair Parts",
  description: "OEM-grade replacement screens and batteries. Compare prices from Amazon and AliExpress.",
  verification: {
    google: "8pwOVjR3QUle2_9MMKEbBiGB4jK3FkJW-Ao0woMdhIQ", // ✅ YOUR CODE IS SAFE HERE
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
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        
        {/* --- NAVBAR --- */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                {/* LOGO: Now Orange to look like a Tool Brand */}
                <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900 hover:opacity-80 transition">
                    <div className="h-9 w-9 bg-orange-600 text-white flex items-center justify-center rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                    </div>
                    <span>Global<span className="text-orange-600">Parts</span></span>
                </Link>
            </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
            {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 text-sm font-semibold mb-6">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
              <Link href="/sitemap.xml" className="hover:text-white transition">Sitemap</Link>
            </div>
            <p className="text-sm opacity-50">© {new Date().getFullYear()} Global Parts Hub</p>
            <p className="text-xs opacity-30 mt-2">Affiliate Disclosure: We earn from qualifying purchases.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}