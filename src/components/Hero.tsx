import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden dot-grid-bg">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] animate-drift" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-blue/[0.03] rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-extrabold text-foreground/[0.02] select-none pointer-events-none">W</div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={fadeUp}>
              <span className="inline-block border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full">
                India's #1 SME Web Agency
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-extrabold leading-[1.05] text-foreground" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              We Build Websites That <span className="text-gradient-green">Actually Grow</span> Your Business
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg max-w-lg">
              Stunning, high-performance websites crafted for Indian SMEs — restaurants, clinics, salons & more. Results you can measure.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("booking")} className="bg-primary text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-button glow-green hover:brightness-110 transition-all flex items-center gap-2">
                Book Free Call <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollTo("portfolio")} className="border border-foreground/10 text-foreground font-body font-medium px-8 py-3.5 rounded-button hover:bg-foreground/5 transition-all flex items-center gap-2">
                <Play size={16} /> See Our Work
              </button>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {["R", "S", "A"].map((initial, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-surface-2 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary">{initial}</div>
                ))}
              </div>
              <span className="text-muted-foreground text-sm">50+ businesses trust us</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:flex justify-center">
            <div className="relative w-[380px] h-[260px] bg-card rounded-card card-shadow border border-border p-6" style={{ transform: "perspective(800px) rotateY(-6deg) rotateX(3deg)" }}>
              <div className="h-3 w-3 rounded-full bg-primary/60 absolute top-4 left-4" />
              <div className="h-3 w-3 rounded-full bg-accent-orange/60 absolute top-4 left-9" />
              <div className="h-3 w-3 rounded-full bg-gold/60 absolute top-4 left-14" />
              <div className="mt-8 space-y-3">
                <div className="h-5 w-3/4 bg-foreground/10 rounded" />
                <div className="h-3 w-full bg-foreground/5 rounded" />
                <div className="h-3 w-5/6 bg-foreground/5 rounded" />
                <div className="h-8 w-32 bg-primary/20 rounded-tag mt-4" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card rounded-card card-shadow border border-border px-4 py-3 animate-float">
              <p className="text-primary font-display font-bold text-lg">+312%</p>
              <p className="text-muted-foreground text-xs">bookings</p>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-card card-shadow border border-border px-4 py-3 animate-float-delayed">
              <p className="text-accent-blue font-display font-bold text-lg">4 Week</p>
              <p className="text-muted-foreground text-xs">delivery</p>
            </div>
            <div className="absolute bottom-8 -right-8 bg-card rounded-card card-shadow border border-border px-4 py-3 animate-float-delayed-2">
              <p className="text-primary font-display font-bold text-lg">90+</p>
              <p className="text-muted-foreground text-xs">PageSpeed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
