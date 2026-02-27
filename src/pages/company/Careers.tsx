import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Briefcase, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CareersPage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title="Careers | Scalvicon"
                description="Join the team at Scalvicon. We are always looking for talented designers, developers, and marketers."
                url="https://scalvicon-9bf2f.web.app/careers"
            />
            <Navbar />

            <main className="flex-1 pt-32 pb-16">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                            <Briefcase size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Join Our Team</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We're an ambitious, fast-growing agency helping businesses scale through better design and technology.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-card border border-border p-8 rounded-2xl">
                            <Users className="text-primary mb-4" size={28} />
                            <h3 className="text-xl font-bold mb-2">Remote-First Culture</h3>
                            <p className="text-muted-foreground">Work from anywhere in India. We care about output and impact, not hours logged at a physical desk.</p>
                        </div>
                        <div className="bg-card border border-border p-8 rounded-2xl">
                            <Star className="text-gold mb-4" size={28} />
                            <h3 className="text-xl font-bold mb-2">Growth & Learning</h3>
                            <p className="text-muted-foreground">Get access to premium courses, challenging client projects, and mentorship from senior developers.</p>
                        </div>
                    </div>

                    <div className="border border-border rounded-2xl overflow-hidden card-shadow">
                        <div className="bg-muted px-8 py-6 border-b border-border">
                            <h2 className="text-2xl font-bold">Open Positions</h2>
                        </div>

                        <div className="p-8 text-center text-muted-foreground py-16 flex flex-col items-center">
                            <Briefcase className="h-12 w-12 opacity-20 mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">No open roles right now</h3>
                            <p className="max-w-md mx-auto mb-6">
                                We aren't actively hiring at this exact moment, but we're always eager to meet talented frontend developers, UI/UX designers, and SEO specialists.
                            </p>
                            <a href="mailto:krishnamaurya2204@gmail.com?subject=Careers%20Application%20-%20Spontaneous">
                                <Button variant="outline" className="gap-2">
                                    Send us your portfolio <ArrowRight size={16} />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CareersPage;
