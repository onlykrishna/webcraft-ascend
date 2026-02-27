import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title="Privacy Policy | Scalvicon"
                description="We take your privacy seriously. Here's exactly how we collect, process, and protect your data."
                url="https://scalvicon-9bf2f.web.app/privacy"
            />
            <Navbar />

            <main className="flex-1 pt-32 pb-16">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-border pb-8">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground">Effective Date: October 2024</p>
                    </motion.div>

                    <div className="prose prose-invert prose-lg text-muted-foreground whitespace-pre-line leading-relaxed max-w-none">
                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">1. Data We Collect</h2>
                        We only collect data necessary to provide effective business services. This includes:<br />
                        - **Contact Data:** Names, email addresses, phone numbers provided voluntarily via forms.<br />
                        - **Usage Data:** Basic IP activity collected anonymously via plausible web analytics to monitor traffic volume.
                        - **Client Assets:** Logistics, imagery, or business intellectual property shared during the course of website development.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">2. How We Use That Data</h2>
                        Your data is never sold to third-party marketing agencies. It is strictly used to:<br />
                        - Respond to inquiries and provide custom project quotes.<br />
                        - Architect and develop websites per your exact specifications.<br />
                        - Manage internal CRM workflows for invoicing and contract execution.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">3. Data Secuity</h2>
                        Scalvicon implements standard high-tier encryption for all active client interactions. Client codebase databases are hosted via Google Firebase, employing severe rule-based read/write access protection natively. Standard forms submit directly into protected dashboard networks.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">4. Cookies and GDPR</h2>
                        We run a cookie-less, privacy-first analytics setup. We don't actively track your every move across the web or drop heavy remarketing pixels without consent. If a specific web project under contract requires aggressive pixel tracking (like Meta Pixel), it will be isolated to the client's deployed site property and the client will be solely accountable for updating their own respective privacy banners.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">5. Revisions to Privacy Policy</h2>
                        Scalvicon holds the right to modify these terms without direct notice, but significant shifts relating to user data rights will be broadcast explicitly to active clients.
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPage;
