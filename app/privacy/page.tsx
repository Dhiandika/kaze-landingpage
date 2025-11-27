import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />
            <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg dark:prose-invert">
                    <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to Kaze Kreativ ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                        If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at hello@kazekreativ.my.id.
                    </p>

                    <h3>2. Information We Collect</h3>
                    <p>
                        We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services,
                        when you participate in activities on the Website or otherwise when you contact us.
                    </p>
                    <ul>
                        <li>Names</li>
                        <li>Email addresses</li>
                        <li>Phone numbers</li>
                    </ul>

                    <h3>3. How We Use Your Information</h3>
                    <p>
                        We use personal information collected via our Website for a variety of business purposes described below.
                        We process your personal information for these purposes in reliance on our legitimate business interests,
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                    <ul>
                        <li>To send you marketing and promotional communications.</li>
                        <li>To respond to user inquiries/offer support to users.</li>
                    </ul>

                    <h3>4. Contact Us</h3>
                    <p>
                        If you have questions or comments about this policy, you may email us at hello@kazekreativ.my.id or by post to:
                    </p>
                    <p>
                        Kaze Kreativ<br />
                        Denpasar, Bali<br />
                        Indonesia
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
