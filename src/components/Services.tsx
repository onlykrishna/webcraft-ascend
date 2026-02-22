import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, fadeUpWithDelay } from "@/lib/animations";

const plans = [
  {
    name: "Starter", price: "₹15,000", period: "one-time",
    color: "border-t-accent-blue", accent: "text-accent-blue",
    features: ["5-page responsive website", "Mobile-friendly design", "Contact form", "Basic SEO setup", "1 revision round"],
    popular: false,
  },
  {
    name: "Business", price: "₹35,000", period: "one-time",
    color: "border-t-primary", accent: "text-primary",
    features: ["10-page custom website", "Advanced UI/UX design", "WhatsApp integration", "Google Maps & Reviews", "On-page SEO", "3 revision rounds", "Free 1-month support"],
    popular: true,
  },
  {
    name: "Premium", price: "₹75,000", period: "one-time",
    color: "border-t-gold", accent: "text-gold",
    features: ["Unlimited pages", "Custom animations & effects", "Booking/appointment system", "Payment gateway", "Advanced SEO & Analytics", "Priority support (3 months)", "Unlimited revisions"],
    popular: false,
  },
];

const Services = () => (
  <section id="services" className="section-padding dot-grid-bg relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
        <span className="text-primary font-mono text-xs uppercase tracking-widest">Packages</span>
        <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">No hidden costs. Choose what works best for your business.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUpWithDelay(i * 0.1)} whileHover={{ y: -6 }}
            className={`relative bg-card rounded-card card-shadow border border-border border-t-[3px] ${plan.color} p-8 ${plan.popular ? "md:scale-105 md:z-10" : ""}`}>
            {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">Most Popular</span>}
            <p className={`text-xs uppercase tracking-widest font-mono ${plan.accent}`}>{plan.name}</p>
            <p className="font-display font-extrabold text-foreground text-4xl mt-3">{plan.price}</p>
            <p className="text-muted-foreground text-sm mt-1">{plan.period}</p>
            <div className="h-px bg-border my-6" />
            <ul className="space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check size={16} className={`mt-0.5 shrink-0 ${plan.accent}`} />{f}
                </li>
              ))}
            </ul>
            <button className={`w-full mt-8 py-3 rounded-button font-semibold text-sm transition-all ${plan.popular ? "bg-primary text-primary-foreground glow-green hover:brightness-110" : "border border-foreground/10 text-foreground hover:bg-foreground/5"}`}>
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
