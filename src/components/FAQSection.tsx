import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const faqs = [
  { q: "How long does it take to build a website?", a: "Most projects are completed in 4-6 weeks. Starter packages can be done in 2-3 weeks, while Premium projects with custom features may take up to 6 weeks." },
  { q: "Do you work with businesses outside of India?", a: "While we specialize in Indian SMEs, we work with businesses globally. Our pricing and approach are tailored for the Indian market, but our quality is world-class." },
  { q: "What if I need changes after the website is live?", a: "All plans include revision rounds. Business and Premium plans come with free support periods. We also offer affordable monthly retainer plans for ongoing maintenance." },
  { q: "Do you handle hosting and domain?", a: "Yes! We can set up hosting and domain for you, or work with your existing providers. We recommend reliable hosting solutions optimized for Indian audiences." },
  { q: "Will my website be mobile-friendly?", a: "Absolutely. Every website we build is fully responsive and tested across all devices. Mobile performance is a top priority — over 70% of Indian web traffic comes from phones." },
  { q: "Can I update the website myself?", a: "Yes. We build with user-friendly CMS options and provide training so you or your team can easily update content, images, and more without any technical knowledge." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding dot-grid-bg relative">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
          <span className="text-primary font-mono text-xs uppercase tracking-widest">FAQ</span>
          <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>Got Questions?</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className={`bg-card rounded-card border border-border overflow-hidden transition-all ${isOpen ? "border-l-[3px] border-l-primary" : ""}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-foreground/[0.02] transition-colors">
                  <span className="font-body font-medium text-foreground text-sm pr-4">{faq.q}</span>
                  {isOpen ? <X size={18} className="text-primary shrink-0" /> : <Plus size={18} className="text-muted-foreground shrink-0" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
