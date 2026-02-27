import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, Sparkles, Building2, UtensilsCrossed, Dumbbell, Scale,
  Users, Search, Zap, Calendar, TrendingDown, PieChart, Clock,
  MessageCircle, MapPin, UserPlus, TrendingUp, FileText, Shield,
  ExternalLink, X, type LucideIcon,
} from "lucide-react";
import { fadeUp, fadeUpWithDelay, stagger } from "@/lib/animations";
import { portfolioProjects, portfolioCategories, type PortfolioProject } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// ─── Icon resolver ─────────────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Stethoscope, Sparkles, Building2, UtensilsCrossed, Dumbbell, Scale,
  Users, Search, Zap, Calendar, TrendingDown, PieChart, Clock,
  MessageCircle, MapPin, UserPlus, TrendingUp, FileText, Shield,
};

const Icon = ({ name, ...props }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) => {
  const Component = iconMap[name];
  return Component ? <Component {...props} /> : null;
};

// removed modal markup
// ─── Portfolio Card ────────────────────────────────────────────────────────────
function PortfolioCard({
  project,
  index,
  onView,
}: {
  project: PortfolioProject;
  index: number;
  onView: () => void;
}) {
  return (
    <motion.div
      key={project.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUpWithDelay(index * 0.08)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-card rounded-card border border-border overflow-hidden card-shadow cursor-pointer"
      onClick={onView}
    >
      {/* Gradient + Icon hero */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
      >
        <Icon name={project.icon} size={52} style={{ color: project.accentColor, opacity: 0.85 }} />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-card/90 to-transparent h-16" />
      </div>

      {/* Body */}
      <div className="p-5">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="font-display font-bold text-foreground mt-1 mb-3">{project.title}</h3>

        {/* Mini metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-display font-bold text-sm" style={{ color: project.accentColor }}>
                {m.value}
              </p>
              <p className="text-muted-foreground text-[10px] leading-tight mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-center gap-1.5 text-xs font-medium border border-border rounded-button py-2 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
          onClick={(e) => { e.stopPropagation(); onView(); }}
        >
          <ExternalLink size={12} /> View Case Study
        </button>
      </div>
    </motion.div>
  );
}

// ─── Portfolio Section ─────────────────────────────────────────────────────────
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filtered =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding dot-grid-bg relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp} className="text-center mb-10"
        >
          <span className="text-primary font-mono text-xs uppercase tracking-widest">Our Work</span>
          <h2 className="font-display font-extrabold text-foreground mt-3" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Real Projects, Real Results
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Every project in our portfolio is a real business that now ranks better, converts more, and grows faster.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger} className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={i}
                onView={() => navigate(`/portfolio/${project.slug}`)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};

export default Portfolio;
