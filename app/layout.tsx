import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub | AI Repair Guides",
  description: "Instant AI-generated repair guides and tech news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>

        <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="font-black text-slate-900 text-2xl mb-6">Global Parts Hub</p>
            <div className="flex justify-center gap-6 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/blog/privacy-policy" className="hover:text-blue-600">Privacy</Link>
            </div>
            <div className="max-w-3xl mx-auto bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400">
                <strong>Disclaimer:</strong> Not affiliated with Apple, Samsung, or Tesla. 
                Content is AI-generated for educational purposes.
                </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}