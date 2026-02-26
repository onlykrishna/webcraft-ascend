import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const handleCTA = () => {
    if (currentUser) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=Hi%20Scalvicon%2C%20I%27d%20like%20to%20book%20a%20free%20call`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      navigate("/signup");
    }
  };

  return (
    <section id="booking" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] animate-drift" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="max-w-xl mx-auto text-center bg-card rounded-card card-shadow border border-border p-8 md:p-12">
          <h2 className="font-display font-extrabold text-foreground" style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>
            Ready to Get a Website That <span className="text-gradient-green">Actually Grows</span> Your Business?
          </h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-md mx-auto">
            Let's talk about your business goals. No pressure, no jargon — just real advice from people who care.
          </p>
          <button
            onClick={handleCTA}
            className="mt-8 bg-primary text-primary-foreground font-body font-semibold px-10 py-4 rounded-button glow-green hover:brightness-110 transition-all inline-flex items-center gap-2 text-lg"
          >
            Book Your Free Call <ArrowRight size={20} />
          </button>
          <p className="text-muted-foreground text-xs mt-4">or email us: <a href="mailto:krishnamaurya2204@gmail.com" className="text-primary hover:underline">krishnamaurya2204@gmail.com</a></p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {["Free", "No Obligation", "Real Advice"].map((item) => (
              <span key={item} className="flex items-center gap-1 text-muted-foreground text-xs">
                <CheckCircle size={14} className="text-primary" /> {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
