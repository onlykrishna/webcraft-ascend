import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Globe,
    CalendarCheck,
    ShoppingBag,
    Building2,
    Search,
    Wrench,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const services = [
    {
        icon: Globe,
        title: "Business Website",
        slug: "business-website",
        description:
            "Your 24/7 digital storefront. Professional, fast, and built to make your business look its absolute best online.",
        gradient: "from-primary/20 to-primary/5",
        iconColor: "text-primary",
    },
    {
        icon: CalendarCheck,
        title: "Booking & Appointment Sites",
        slug: "booking-appointment-sites",
        description:
            "Let customers book directly from your website. Integrated calendar, WhatsApp confirmations, and zero missed leads.",
        gradient: "from-accent-blue/20 to-accent-blue/5",
        iconColor: "text-accent-blue",
    },
    {
        icon: ShoppingBag,
        title: "E-commerce & Online Store",
        slug: "ecommerce-online-store",
        description:
            "Sell your products online with Razorpay/UPI payment gateway, inventory management, and order tracking.",
        gradient: "from-gold/20 to-gold/5",
        iconColor: "text-gold",
    },
    {
        icon: Building2,
        title: "Real Estate Portals",
        slug: "real-estate-portals",
        description:
            "Showcase properties with dynamic listings, virtual tour links, and automated lead capture to your WhatsApp.",
        gradient: "from-accent-orange/20 to-accent-orange/5",
        iconColor: "text-accent-orange",
    },
    {
        icon: Search,
        title: "SEO & Google Presence",
        slug: "seo-google-presence",
        description:
            "Rank on page 1 for local searches. We handle keyword research, on-page SEO, Google Business Profile, and Search Console.",
        gradient: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-400",
    },
    {
        icon: Wrench,
        title: "Website Revamp",
        slug: "website-revamp",
        description:
            "Your existing site is outdated or slow? We rebuild it from scratch — faster, modern, mobile-first — in 4 weeks.",
        gradient: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-400",
    },
];

const Services = () => (
    <section id="services" className="section-padding relative">
        <div className="container mx-auto px-4 md:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="text-center mb-16"
            >
                <span className="text-primary font-mono text-xs uppercase tracking-widest">
                    What We Do
                </span>
                <h2
                    className="font-display font-extrabold text-foreground mt-3"
                    style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                >
                    What We Build For You
                </h2>
                <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                    Every website is custom-crafted for your industry and built to
                    convert visitors into customers.
                </p>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                {services.map((service) => (
                    <Link key={service.title} to={`/services/${service.slug}`} className="block">
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className={cn(
                                "group bg-card rounded-card border border-white/[0.06] p-6 space-y-4",
                                "hover:border-primary/30 transition-all duration-300 card-shadow",
                            )}
                        >
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                                    service.gradient,
                                )}
                            >
                                <service.icon size={22} className={service.iconColor} />
                            </div>
                            <h3 className="font-display font-bold text-foreground text-lg">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>
        </div>
    </section>
);

export default Services;
