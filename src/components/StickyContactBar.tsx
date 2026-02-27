import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StickyContactBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show bar after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsApp = () => {
        window.open('https://wa.me/918949540026?text=Hi! I need help with my website project', '_blank');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-lg shadow-2xl"
                >
                    <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
                        <p className="hidden text-sm font-medium md:block text-foreground">
                            Need help? Let's discuss your project
                        </p>

                        <div className="flex w-full items-center gap-2 md:w-auto">
                            <Button
                                onClick={handleWhatsApp}
                                className="flex-1 md:flex-none"
                                size="sm"
                            >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                WhatsApp Us
                            </Button>

                            <a href="tel:+918949540026">
                                <Button variant="outline" size="sm" className="hidden md:inline-flex bg-background hover:bg-muted text-foreground">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Now
                                </Button>
                            </a>

                            <a href="mailto:krishnamaurya2204@gmail.com">
                                <Button variant="outline" size="sm" className="hidden md:inline-flex bg-background hover:bg-muted text-foreground">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
