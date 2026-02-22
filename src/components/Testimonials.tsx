import { motion } from "framer-motion";
import { Star, Zap, BarChart3, Clock, HeartHandshake } from "lucide-react";
import { fadeUp, fadeUpWithDelay } from "@/lib/animations";

const testimonials = [
  { quote: "WebCraft transformed our online presence completely. Our restaurant bookings tripled within the first month!", name: "Rajesh Kumar", role: "Owner, Spice Garden", initial: "R", bg: "bg-primary/20" },
  { quote: "Professional, fast, and they truly understand what Indian businesses need. Best investment we made this year.", name: "Dr. Sneha Patel", role: "Director, CareFirst Clinic", initial: "S", bg: "bg-accent-blue/20" },
  { quote: "Our salon's website looks absolutely stunning. Clients constantly tell us how easy it is to book online now.", name: "Anita Sharma", role: "Founder, Glow Studio", initial: "A", bg: "bg-gold/20" },
];

const differentiators = [
  { icon: Clock, label: "4-6 week delivery" },
  { icon: BarChart3, label: "Results-focused" },
  { icon: HeartHandshake, label: "Dedicated support" },
  { icon: Zap, label: "90+ PageSpeed" },
];

const Testimonials = () => (
  <section className="section-padding relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
        <span className="text-primary font-mono text-xs uppercase tracking-widest">Testimonials</span>
        <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>Loved by Business Owners</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpWithDelay(i * 0.1)} whileHover={{ y: -6 }}
            className="bg-card rounded-card card-shadow border border-border p-6 space-y-4">
            <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-gold text-gold" />)}</div>
            <p className="text-foreground/90 italic text-sm leading-relaxed">"{t.quote}"</p>
            <div className="h-px bg-border" />
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center font-display font-bold text-sm text-primary`}>{t.initial}</div>
              <div>
                <p className="text-foreground text-sm font-semibold">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-12">
        {differentiators.map((d) => (
          <div key={d.label} className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5">
            <d.icon size={16} className="text-primary" />
            <span className="text-foreground text-sm font-medium">{d.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
