import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const BottomCTAPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show popup when user scrolls to 80% of page
            const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

            if (scrollPercentage > 0.8 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasShown]);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl rounded-t-[2rem] border-t border-x border-primary/20 bg-card p-8 md:bottom-8 md:rounded-[2rem] md:border shadow-[0_0_40px_rgba(0,0,0,0.5)] border-primary overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
                        <button
                            onClick={handleClose}
                            className="absolute right-6 top-6 rounded-full p-2 transition-colors hover:bg-muted bg-background/50 border border-border z-50 cursor-pointer"
                        >
                            <X className="h-5 w-5 text-muted-foreground pointer-events-none" />
                        </button>

                        <div className="text-center relative z-10">
                            <h2 className="mb-3 text-2xl font-bold md:text-3xl tracking-tight text-white">
                                Ready to Get a Website That <br />
                                <span className="text-primary tracking-tighter">Actually Grows</span> Your Business?
                            </h2>
                            <p className="mb-8 text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                                Let's talk about your business goals. No pressure, no jargon—just real advice from people who care.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Link to="/#contact" onClick={handleClose} className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full font-bold h-12 text-base text-black shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                                        Book Your Free Call
                                    </Button>
                                </Link>
                                <a href="mailto:krishnamaurya2204@gmail.com" className="w-full sm:w-auto">
                                    <Button size="lg" variant="outline" className="w-full h-12 text-base">
                                        Email Us
                                    </Button>
                                </a>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold">✓</span> Free
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold">✓</span> No Obligation
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold">✓</span> Real Advice
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
