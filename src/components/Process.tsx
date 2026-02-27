import { motion } from "framer-motion";
import { fadeUp, fadeUpWithDelay } from "@/lib/animations";
import { Link } from "react-router-dom";

const steps = [
  {
    week: "Week 1",
    title: "Discovery & Design",
    details: "We learn your business, competitors, and goals. Then deliver 2 custom design concepts — you pick your favourite.",
    color: "bg-primary",
    textColor: "text-primary",
    slug: "week-1-discovery-design"
  },
  {
    week: "Week 2",
    title: "Development",
    details: "Your approved design goes into production. Mobile-first, fast, clean code. Built for speed and conversions.",
    color: "bg-accent-blue",
    textColor: "text-accent-blue",
    slug: "week-2-development"
  },
  {
    week: "Week 3",
    title: "Content & Integrations",
    details: "We add your content, connect WhatsApp, Google Maps, and all third-party tools. SEO copy written by us.",
    color: "bg-gold",
    textColor: "text-gold",
    slug: "week-3-content-integrations"
  },
  {
    week: "Week 4",
    title: "Testing & Launch",
    details: "Cross-browser testing, speed optimization, and go-live. You get a Loom walkthrough video of your site.",
    color: "bg-accent-orange",
    textColor: "text-accent-orange",
    slug: "week-4-testing-launch"
  },
  {
    week: "Ongoing",
    title: "Support & Growth",
    details: "30-day post-launch warranty. Monthly maintenance plans for hosting, backups, and content updates.",
    color: "bg-primary",
    textColor: "text-primary",
    slug: "ongoing-support-growth"
  },
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
              <Link to={`/process/${step.slug}`} className="mt-6 w-full block">
                <div className="bg-card rounded-card card-shadow border border-border p-5 w-full hover:border-primary transition-colors cursor-pointer h-full">
                  <p className={`text-xs font-mono uppercase tracking-wider ${step.textColor}`}>{step.week}</p>
                  <h3 className="font-display font-bold text-foreground mt-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{step.details}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="md:hidden space-y-6">
        {steps.map((step, i) => (
          <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4 items-start">
            <div className={`w-10 h-10 shrink-0 rounded-full ${step.color} flex items-center justify-center text-primary-foreground font-display font-bold text-sm`}>{i + 1}</div>
            <Link to={`/process/${step.slug}`} className="flex-1 block w-full">
              <div className="bg-card rounded-card card-shadow border border-border p-4 w-full hover:border-primary transition-colors cursor-pointer h-full">
                <p className={`text-xs font-mono uppercase tracking-wider ${step.textColor}`}>{step.week}</p>
                <h3 className="font-display font-bold text-foreground mt-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{step.details}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
