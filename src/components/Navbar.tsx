import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NavLink = { label: string; id?: string; path?: string };

const navLinks: NavLink[] = [
  { label: "Services", id: "services" },
  { label: "Pricing", id: "pricing" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Process", id: "process" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
  { label: "Blog", path: "/blog" },
];

const SECTION_IDS = navLinks.filter((l) => l.id).map((l) => l.id as string);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll-depth tracking for navbar opacity/blur boost
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — active section tracking
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.35, rootMargin: "-60px 0px -40% 0px" },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully.");
      navigate("/");
    } catch {
      // toasted in context
    }
    setDropOpen(false);
  };

  const initials = currentUser?.displayName
    ? currentUser.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : currentUser?.email?.[0].toUpperCase() ?? "U";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border transition-all duration-300",
        scrolled ? "bg-background/95" : "bg-background/80",
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          Scalvi<span className="text-primary">con</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            if (link.path) {
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              );
            }
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id!)}
                className={cn(
                  "text-sm font-body transition-colors relative group pb-0.5",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300",
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0",
                  )}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary/40 transition-all duration-300 group-hover:w-full" />
              </button>
            );
          })}

          {/* Auth-aware right side */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropOpen((p) => !p)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-border hover:bg-foreground/5 transition-all"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="avatar"
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {initials}
                  </div>
                )}
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-muted-foreground transition-transform",
                    dropOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-card card-shadow py-1 z-50"
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <LayoutDashboard size={15} className="text-primary" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <LogOut size={15} className="text-muted-foreground" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-2.5 rounded-full glow-green hover:brightness-110 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-7"
          >
            {navLinks.map((link) => {
              if (link.path) {
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id!)}
                  className={cn(
                    "text-2xl font-display font-semibold transition-colors",
                    activeSection === link.id ? "text-primary" : "text-foreground",
                  )}
                >
                  {link.label}
                </button>
              );
            })}

            {currentUser ? (
              <div className="flex flex-col items-center gap-4">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground text-2xl font-display font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="text-muted-foreground text-lg font-body"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground text-xl font-display font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary text-primary-foreground font-body font-semibold px-8 py-3 rounded-full glow-green"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
