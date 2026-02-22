import { motion } from "framer-motion";
import { fadeUp, fadeUpWithDelay } from "@/lib/animations";

const steps = [
  { week: "Week 1", title: "Discovery", details: "Understand your business, goals, and audience", color: "bg-primary", textColor: "text-primary" },
  { week: "Week 1-2", title: "Design", details: "Craft stunning mockups tailored to your brand", color: "bg-accent-blue", textColor: "text-accent-blue" },
  { week: "Week 2-3", title: "Develop", details: "Build a fast, responsive, SEO-optimized site", color: "bg-gold", textColor: "text-gold" },
  { week: "Week 3-4", title: "Test & Refine", details: "QA, performance tuning, and your feedback", color: "bg-accent-orange", textColor: "text-accent-orange" },
  { week: "Week 4", title: "Launch!", details: "Go live with full support and training", color: "bg-primary", textColor: "text-primary" },
];

const Process = () => (
  <section id="process" className="section-padding dot-grid-bg relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
        <span className="text-primary font-mono text-xs uppercase tracking-widest">Process</span>
        <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>How It Works</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">From idea to launch in 4 weeks — no stress, no jargon.</p>
      </motion.div>

      <div className="hidden md:block relative">
        <div className="absolute top-8 left-[10%] right-[10%] h-px bg-muted-foreground/20" />
        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpWithDelay(i * 0.12)} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-primary-foreground font-display font-bold text-lg z-10`}>{i + 1}</div>
              <div className="mt-6 bg-card rounded-card card-shadow border border-border p-5 w-full">
                <p className={`text-xs font-mono uppercase tracking-wider ${step.textColor}`}>{step.week}</p>
                <h3 className="font-display font-bold text-foreground mt-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{step.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="md:hidden space-y-6">
        {steps.map((step, i) => (
          <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4 items-start">
            <div className={`w-10 h-10 shrink-0 rounded-full ${step.color} flex items-center justify-center text-primary-foreground font-display font-bold text-sm`}>{i + 1}</div>
            <div className="bg-card rounded-card card-shadow border border-border p-4 flex-1">
              <p className={`text-xs font-mono uppercase tracking-wider ${step.textColor}`}>{step.week}</p>
              <h3 className="font-display font-bold text-foreground mt-1">{step.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{step.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
