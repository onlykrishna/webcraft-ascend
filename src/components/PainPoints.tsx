import { motion } from "framer-motion";
import { AlertTriangle, Clock, TrendingDown, Search } from "lucide-react";
import { fadeUp, fadeUpWithDelay } from "@/lib/animations";
import { Link } from "react-router-dom";

const pains = [
  { icon: AlertTriangle, title: "Outdated Website", desc: "Your website looks like it was built in 2010. Customers judge you in 3 seconds.", color: "text-accent-orange", slug: "outdated-website" },
  { icon: TrendingDown, title: "Losing Customers", desc: "Your competitors have modern websites. You're losing business every single day.", color: "text-destructive", slug: "losing-customers" },
  { icon: Clock, title: "Slow & Broken", desc: "Slow load times and broken mobile views are killing your Google ranking.", color: "text-gold", slug: "slow-broken-site" },
  { icon: Search, title: "Invisible Online", desc: "No SEO means nobody finds you. It's like having a shop with no signboard.", color: "text-accent-blue", slug: "invisible-online" },
];

const PainPoints = () => (
  <section className="section-padding relative">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
        <span className="text-accent-orange font-mono text-xs uppercase tracking-widest">The Problem</span>
        <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
          Is Your Website <span className="text-accent-orange">Costing</span> You Business?
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pains.map((pain, i) => (
          <Link to={`/problems/${pain.slug}`} key={pain.title} className="block">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpWithDelay(i * 0.1)} whileHover={{ y: -6 }}
              className="bg-card rounded-card card-shadow border border-border p-6 text-center hover:border-primary cursor-pointer h-full">
              <pain.icon size={32} className={`mx-auto ${pain.color}`} />
              <h3 className="font-display font-bold text-foreground mt-4 text-lg">{pain.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{pain.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default PainPoints;
