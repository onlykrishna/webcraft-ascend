import { scrollToSection } from "@/lib/scroll";
import { toast } from "sonner";

const Footer = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const comingSoon = (feature: string) => {
    toast.info(`${feature} coming soon! 🚀`);
  };

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="/" className="font-display text-xl font-bold">
              Scalvi<span className="text-primary">con</span>
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Websites that grow your business.
            </p>
            <p className="text-muted-foreground text-xs mt-3">
              Serving businesses across India 🇮🇳
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", target: "pain-points" },
                { label: "Services", target: "services" },
                { label: "Portfolio", target: "portfolio" },
                { label: "Pricing", target: "pricing" },
                { label: "Process", target: "process" },
                { label: "FAQ", target: "faq" },
              ].map(({ label, target }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(target)}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => comingSoon("Blog")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => comingSoon("Careers")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:krishnamaurya2204@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  krishnamaurya2204@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/scalvicon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  @scalvicon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-sm gap-2">
          <p>© 2025 Scalvicon. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/scalvicon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/scalvicon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
