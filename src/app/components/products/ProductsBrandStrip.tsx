import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import acc          from "../../../assets/brands/acc.svg";
import ultratech    from "../../../assets/brands/ultratech.svg";
import tataSteel    from "../../../assets/brands/tata_steel.svg";
import jsw          from "../../../assets/brands/jsw.svg";
import pidilite     from "../../../assets/brands/pidilite.svg";
import ambuja       from "../../../assets/brands/ambuja.svg";
import kajaria      from "../../../assets/brands/kajaria.svg";
import havells      from "../../../assets/brands/havells.png";

// Featured brands aligned to the brands actually carried in the catalogue
// (cement, steel, blocks, construction chemicals, lighting) — see utils/products.ts.
const BRANDS = [
  { name: "UltraTech",     logo: ultratech },
  { name: "ACC Cement",    logo: acc },
  { name: "Ambuja Cement", logo: ambuja },
  { name: "Tata Steel",    logo: tataSteel },
  { name: "JSW Steel",     logo: jsw },
  { name: "Havells",       logo: havells },
  { name: "Pidilite",      logo: pidilite },
  { name: "Kajaria",       logo: kajaria },
];

export function ProductsBrandStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        // Continues the hero gradient through — no border-bottom either,
        // so search + brand strip read as one continuous block.
        background: "var(--bg-hero)",
        borderBottom: "var(--border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-6 md:pb-7">
        {/* Header row (no View-all link) */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
          <span
            className="text-[11px] uppercase tracking-widest"
            style={{ color: "var(--text-secondary)", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            Featured Brands
          </span>
          <span className="w-1 h-1 rounded-full mx-1" style={{ background: "var(--text-muted)", opacity: 0.5 }} />
          <span className="text-[11px]" style={{ color: "var(--text-muted)", fontWeight: 500 }}>
            1,200+ verified manufacturers
          </span>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient masks on the edges so the loop fades cleanly */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, var(--bg-base) 0%, transparent 100%)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, var(--bg-base) 0%, transparent 100%)" }}
          />

          <motion.div
            animate={{ x: [0, -1800] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
          >
            {Array(3).fill(BRANDS).flat().map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex flex-col items-center gap-1.5 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                style={{ minWidth: 100 }}
                title={brand.name}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-7 md:h-8 w-auto object-contain"
                  style={{ maxWidth: 120 }}
                />
                <span
                  className="text-[10px] tracking-wide"
                  style={{ color: "var(--text-muted)", fontWeight: 500 }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
