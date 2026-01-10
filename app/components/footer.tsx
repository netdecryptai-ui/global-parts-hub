import Link from "next/link";
import { PenTool } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* BRAND */}
        <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-white font-black text-xl mb-4">
                <PenTool className="h-6 w-6 mr-2 text-orange-500" />
                Global Parts Hub
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-sm">
                The internet's most honest repair price comparison engine. We help you fix your tech for cheap, instead of buying new.
            </p>
            <div className="text-xs text-slate-500">
                © 2025 Global Parts Hub. All rights reserved.
            </div>
        </div>

        {/* LINKS */}
        <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-orange-500 transition">Search Parts</Link></li>
                <li><Link href="/rankings" className="hover:text-orange-500 transition">Repair Tier List</Link></li>
                <li><Link href="/pin-generator" className="hover:text-orange-500 transition">Pin Generator</Link></li>
            </ul>
        </div>

        {/* LEGAL (THE IMPORTANT PART) */}
        <div>
            <h4 className="text-white font-bold mb-4">Compliance</h4>
            <div className="text-xs space-y-3 leading-relaxed">
                <p>
                    <strong>Amazon Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases.
                </p>
                <p>
                    Global Parts Hub is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </p>
            </div>
        </div>

      </div>
    </footer>
  );
}