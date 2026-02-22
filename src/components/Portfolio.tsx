import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const categories = ["All", "Restaurant", "Healthcare", "Beauty", "Real Estate"];

const projects = [
  { category: "Restaurant", name: "Spice Garden", desc: "Complete digital transformation for a multi-cuisine restaurant chain in Mumbai.", stats: [{ value: "+312%", label: "Online Orders" }, { value: "4.8★", label: "Google Rating" }], gradient: "from-primary/20 to-accent-blue/10" },
  { category: "Healthcare", name: "CareFirst Clinic", desc: "Patient booking system and modern website for a growing healthcare clinic.", stats: [{ value: "+180%", label: "Appointments" }, { value: "60%", label: "Less No-Shows" }], gradient: "from-accent-blue/20 to-primary/10" },
  { category: "Beauty", name: "Glow Studio", desc: "Luxury salon website with online booking and portfolio showcase.", stats: [{ value: "+250%", label: "Bookings" }, { value: "92", label: "PageSpeed" }], gradient: "from-gold/20 to-accent-orange/10" },
  { category: "Real Estate", name: "HomePrime Realty", desc: "Property listing platform with advanced search and virtual tour integration.", stats: [{ value: "+400%", label: "Leads" }, { value: "3.2x", label: "Engagement" }], gradient: "from-accent-orange/20 to-gold/10" },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-12">
          <span className="text-primary font-mono text-xs uppercase tracking-widest">Portfolio</span>
          <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Real Results for <span className="text-gradient-green">Real Businesses</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${active === cat ? "bg-primary text-primary-foreground" : "border border-foreground/10 text-muted-foreground hover:text-foreground"}`}>{cat}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-6">
            {filtered.map((project) => (
              <motion.div key={project.name} whileHover={{ y: -6 }} className="bg-card rounded-card card-shadow border border-border overflow-hidden group">
                <div className="grid md:grid-cols-[40%_60%]">
                  <div className={`bg-gradient-to-br ${project.gradient} min-h-[180px] flex items-center justify-center`}>
                    <span className="font-display font-bold text-foreground/20 text-6xl">{project.name[0]}</span>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary">{project.category}</span>
                    <h3 className="font-display font-bold text-foreground text-lg">{project.name}</h3>
                    <p className="text-muted-foreground text-sm">{project.desc}</p>
                    <div className="flex gap-4 pt-2">
                      {project.stats.map((s) => (
                        <div key={s.label} className="bg-surface-2 rounded-tag px-3 py-2">
                          <p className="text-primary font-display font-bold text-sm">{s.value}</p>
                          <p className="text-muted-foreground text-xs">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
