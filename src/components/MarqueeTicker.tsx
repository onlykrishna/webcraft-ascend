const items = [
  "🍽️ Restaurants",
  "🏥 Clinics",
  "💇 Salons",
  "🏠 Real Estate",
  "🛒 Retail Stores",
  "🎓 Education",
  "🧘 Wellness",
  "⚖️ Legal Firms",
];

const MarqueeTicker = () => (
  <section className="border-y border-border py-5 overflow-hidden bg-card/50">
    <div className="flex animate-ticker whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="mx-8 text-muted-foreground text-sm font-mono uppercase tracking-wider flex items-center gap-2"
        >
          {item}
          <span className="text-primary/40">•</span>
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
