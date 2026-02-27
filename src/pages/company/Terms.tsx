import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title="Terms of Service | Scalvicon"
                description="Read the terms of service to understand how we operate and manage client projects."
                url="https://scalvicon-9bf2f.web.app/terms"
            />
            <Navbar />

            <main className="flex-1 pt-32 pb-16">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-border pb-8">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms of Service</h1>
                        <p className="text-muted-foreground">Effective Date: October 2024</p>
                    </motion.div>

                    <div className="prose prose-invert prose-lg text-muted-foreground whitespace-pre-line leading-relaxed max-w-none">
                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                        By accessing and using this website ([scalvicon-9bf2f.web.app]), you agree to these Terms of Service. If you do not agree to all the terms and conditions, you should avoid using this website.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">2. Services Rendered</h2>
                        Scalvicon designs, builds, and maintains custom websites, SEO content, and related digital marketing materials. All timelines specified in proposals are estimates and require swift client feedback to maintain.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">3. Payment Terms</h2>
                        Unless otherwise specified in a custom contract, standard projects require a 50% non-refundable deposit to commence work, with the remaining 50% due immediately prior to the live deployment (or transfer of code) of the final website.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
                        Scalvicon retains the rights to all unique code components, raw design files (Figma, Photoshop), and base frameworks until the final invoice is paid in full. Upon full final payment, the client receives explicit licensing to use the final compiled website files as intended. We reserve the right to feature the completed project within our public portfolio and case studies.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">5. Revisions and Feedback</h2>
                        Most fixed-price web design contracts include up to two strictly-defined revision rounds. Feedback must be consolidated. Any sweeping design changes requested after final sign-off of initial wireframes will be billed hourly at our standard agency rate.

                        <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">6. Warranties and Bugs</h2>
                        We offer a standard 30-day "Bug-Free" warranty window starting on the original launch date. During this time, functional issues or broken links related to our code will be resolved free of charge. After 30 days, any updates, edits, or server patches are subject to maintenance fees.
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsPage;
