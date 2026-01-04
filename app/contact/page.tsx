import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <Link href="/" className="text-slate-500 hover:text-blue-600 mb-8 inline-flex items-center font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>

        <div className="bg-slate-50 p-12 rounded-3xl border border-slate-100 shadow-sm">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-4">Contact Our Support</h1>
            <p className="text-lg text-slate-600 mb-8">
                Have a question about a specific part? Need help identifying your phone model? 
                We are here to help.
            </p>
            
            <a href="mailto:support@globalpartshub.com" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition">
                Email Us: support@globalpartshub.com
            </a>
            
            <p className="mt-8 text-sm text-slate-400">
                (We typically respond within 24-48 hours)
            </p>
        </div>
      </div>
    </div>
  );
}