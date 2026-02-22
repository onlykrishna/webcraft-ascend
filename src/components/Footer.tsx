const Footer = () => (
  <footer className="border-t border-border">
    <div className="container mx-auto px-4 md:px-8 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <a href="#" className="font-display text-xl font-bold">
            Web<span className="text-primary">Craft</span>
          </a>
          <p className="text-muted-foreground text-sm mt-3 max-w-xs">
            India's premium web agency for SMEs. We build websites that actually grow your business.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground text-sm mb-4">Services</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>Web Design</li>
            <li>Web Development</li>
            <li>SEO Optimization</li>
            <li>Maintenance</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>About Us</li>
            <li>Portfolio</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground text-sm mb-4">Contact</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>hello@webcraft.in</li>
            <li>+91 98765 43210</li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>
    </div>
    {/* Bottom bar */}
    <div className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>© 2026 WebCraft. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:underline">WhatsApp</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
