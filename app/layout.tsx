import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub",
  description: "Find parts for any device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900`}>
        
        {/* --- NAVBAR (From Screenshot) --- */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:opacity-80 transition">
                <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-black">G</div>
                <span>GlobalParts<span className="text-blue-600">Hub</span></span>
            </Link>
            
            {/* PARTNER LOGIN BUTTON REMOVED HERE */}
            
        </nav>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
            {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 text-sm text-slate-500 mb-6">
              <Link href="/blog/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
              <Link href="/blog/contact-us" className="hover:text-blue-600">Contact</Link>
            </div>
            <p className="text-sm text-slate-400">© 2025 Global Parts Hub</p>
          </div>
        </footer>

      </body>
    </html>
  );
}