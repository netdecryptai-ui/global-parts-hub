import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans text-slate-700">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 mb-8 inline-flex items-center hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-3xl font-black text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate">
          <p><strong>Last Updated:</strong> January 2025</p>
          <p>At Global Parts Hub, accessible from our website, one of our main priorities is the privacy of our visitors.</p>
          
          <h3>1. Information We Collect</h3>
          <p>We do not collect personal identifiable information directly. We use third-party services (like Google Analytics and Google AdSense) which may collect anonymous usage data.</p>
          
          <h3>2. DoubleClick DART Cookie</h3>
          <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
          
          <h3>3. Affiliate Disclosure</h3>
          <p>Global Parts Hub is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases.</p>
          
          <h3>4. AI Disclaimer</h3>
          <p>Content on this site is generated using Artificial Intelligence. While we strive for accuracy, users should verify repair instructions with professional technicians.</p>
        </div>
      </div>
    </div>
  );
}