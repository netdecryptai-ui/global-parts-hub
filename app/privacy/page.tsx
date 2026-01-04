import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-slate-500 hover:text-blue-600 mb-8 inline-flex items-center font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mb-8 flex items-center">
            <ShieldCheck className="h-10 w-10 mr-3 text-blue-600" /> Privacy & Disclosure
        </h1>

        <div className="prose prose-slate max-w-none">
            <h3>1. Affiliate Disclosure</h3>
            <p className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 font-medium">
                <strong>Global Parts Hub</strong> is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also participate in the AliExpress Affiliate Program.
            </p>

            <h3>2. How We Use Data</h3>
            <p>We do not collect personal data directly. When you click a link to Amazon or AliExpress, those merchants may use cookies to track your purchase and assign a commission to us. This comes at no extra cost to you.</p>

            <h3>3. Accuracy of Information</h3>
            <p>Prices and availability of products are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on the merchant site at the time of purchase will apply to the purchase of this product.</p>
            
            <p className="text-sm text-slate-400 mt-12">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}