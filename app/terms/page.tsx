import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />
            <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-lg dark:prose-invert">
                    <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Agreement to Terms</h3>
                    <p>
                        These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Kaze Kreativ ("we," "us" or "our"),
                        concerning your access to and use of the kazekreativ.my.id website as well as any other media form, media channel, mobile website or mobile application related, linked,
                        or otherwise connected thereto (collectively, the “Site”).
                    </p>

                    <h3>2. Intellectual Property Rights</h3>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs,
                        and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
                    </p>

                    <h3>3. User Representations</h3>
                    <p>
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete;
                        (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                    </p>

                    <h3>4. Contact Us</h3>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                    </p>
                    <p>
                        Kaze Kreativ<br />
                        Denpasar, Bali<br />
                        Indonesia<br />
                        hello@kazekreativ.my.id
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
