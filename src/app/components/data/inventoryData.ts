export interface InventoryProduct {
  id: string;
  name: string;
  brand: string;
  brandLogo: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  finishes: string[];
  attributeGroups: {
    title: string;
    sections: {
      name: string;
      attributes: { label: string; value: string }[];
    }[];
  }[];
  featureGroups: { title: string; features: string[] }[];
  applications: string[];
  faqs: { question: string; answer: string }[];
  aboutBrand: string;
  category: string;
  status: "Active" | "Draft";
  views: number;
  enquiries: number;
}

const LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/UltraTech_Cement_Logo.svg/1200px-UltraTech_Cement_Logo.svg.png";
const ABOUT = "UltraTech Cement Ltd. is India's No. 1 cement brand and a part of the Aditya Birla Group, with a manufacturing capacity of over 132 MTPA. UltraTech has a pan-India presence with plants, grinding units, and bulk terminals spread across 21 states, serving both residential and large infrastructure projects.";

const INVENTORY: Record<string, InventoryProduct> = {
  p1: {
    id: "p1",
    name: "UltraTech OPC 53 Grade Cement",
    brand: "UltraTech Cement",
    brandLogo: LOGO,
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "OPC 53 Grade cement with superior early strength, ideal for all structural applications including RCC, pre-stressed concrete, and high-rise buildings. Consistent quality across every batch.",
    sizes: ["50 kg Bag", "25 kg Bag", "Bulk Supply"],
    colors: ["Grey"],
    finishes: ["Powder"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Physical Properties",
            attributes: [
              { label: "Grade", value: "OPC 53" },
              { label: "Initial Setting Time", value: "≥ 30 min" },
              { label: "Final Setting Time", value: "≤ 600 min" },
              { label: "Standard Consistency", value: "28–30%" },
            ],
          },
          {
            name: "Compressive Strength",
            attributes: [
              { label: "3-Day Strength", value: "≥ 27 N/mm²" },
              { label: "7-Day Strength", value: "≥ 37 N/mm²" },
              { label: "28-Day Strength", value: "≥ 53 N/mm²" },
              { label: "Fineness", value: "≤ 10% on 90µ sieve" },
            ],
          },
        ],
      },
      {
        title: "PACKAGING",
        sections: [
          {
            name: "Logistic Details",
            attributes: [
              { label: "Bag Weight", value: "50 kg" },
              { label: "Bags per Pallet", value: "40 bags" },
              { label: "Shelf Life", value: "3 months" },
              { label: "Storage", value: "Cool & dry place" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Performance",
        features: [
          "High early strength for fast project progression",
          "Excellent workability and uniform consistency",
          "Suitable for mass concrete with low heat of hydration",
        ],
      },
      {
        title: "Durability",
        features: [
          "Superior resistance to chemical attack",
          "Long-term strength gain beyond 28 days",
          "BIS certified — IS 269:2015",
        ],
      },
    ],
    applications: ["RCC Structures", "Pre-stressed Concrete", "High-Rise Buildings", "Bridges & Flyovers", "Industrial Floors", "Dams"],
    faqs: [
      {
        question: "What is the difference between OPC 43 and OPC 53?",
        answer: "OPC 53 achieves a minimum 28-day compressive strength of 53 N/mm² versus 43 N/mm² for OPC 43. OPC 53 is preferred for high-strength structural applications.",
      },
      {
        question: "What is the shelf life of UltraTech OPC 53?",
        answer: "3 months from the date of manufacture when stored in cool, dry conditions away from moisture. Strength properties may reduce beyond this period.",
      },
      {
        question: "Can OPC 53 be used for plastering?",
        answer: "While technically possible, OPC 43 or PPC is recommended for plastering as they generate less heat and are more cost-effective for non-structural work.",
      },
    ],
    aboutBrand: ABOUT,
    category: "Cement & Concrete",
    status: "Active",
    views: 1240,
    enquiries: 48,
  },

  p2: {
    id: "p2",
    name: "UltraTech Ready Mix Concrete M25",
    brand: "UltraTech Cement",
    brandLogo: LOGO,
    images: [
      "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "Factory-manufactured M25 ready-mix concrete with precise mix design, delivered ready to pour. Ideal for columns, beams, slabs, and foundations requiring consistent quality at scale.",
    sizes: ["1 m³", "3 m³", "6 m³ Truck", "Custom Volume"],
    colors: ["Grey"],
    finishes: ["Wet Mix"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Mix Properties",
            attributes: [
              { label: "Grade", value: "M25" },
              { label: "Characteristic Strength", value: "25 N/mm² at 28 days" },
              { label: "Slump Range", value: "75–100 mm" },
              { label: "Water-Cement Ratio", value: "≤ 0.50" },
            ],
          },
          {
            name: "Compliance",
            attributes: [
              { label: "Standard", value: "IS 456:2000" },
              { label: "Mix Design", value: "IS 10262:2019" },
              { label: "Admixtures", value: "IS 9103" },
              { label: "Delivery", value: "Transit mixer" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Quality & Consistency",
        features: [
          "Plant-controlled mix design ensures batch-to-batch consistency",
          "Quality certificates issued per delivery",
          "On-time delivery with real-time tracking",
        ],
      },
      {
        title: "Applications",
        features: [
          "Suitable for exposed RCC and architectural concrete",
          "Compatible with conventional and pump-placed placement",
          "Available with fibres, fly ash, or GGBS on request",
        ],
      },
    ],
    applications: ["Columns & Beams", "Flat Slabs", "Foundations", "Retaining Walls", "Parking Decks", "Basement Rafts"],
    faqs: [
      {
        question: "What is the usable window after batching?",
        answer: "RMC must be placed within 90 minutes of batching or before the drum has made 300 revolutions, whichever is earlier, as per IS 4926.",
      },
      {
        question: "Can I get M30 or M35 from the same plant?",
        answer: "Yes. UltraTech RMC plants offer grades from M15 to M60. Custom mixes with special admixtures or supplementary cementitious materials are also available.",
      },
    ],
    aboutBrand: ABOUT,
    category: "Ready Mix Concrete",
    status: "Active",
    views: 890,
    enquiries: 31,
  },

  p3: {
    id: "p3",
    name: "UltraTech Wall Putty",
    brand: "UltraTech Cement",
    brandLogo: LOGO,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "White cement-based wall putty that provides a smooth, hard, and brilliant white base coat for interior and exterior walls. Enhances paint adhesion and reduces paint consumption by up to 30%.",
    sizes: ["40 kg Bag", "20 kg Bag", "5 kg Bucket"],
    colors: ["White"],
    finishes: ["Smooth"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Physical Properties",
            attributes: [
              { label: "Base", value: "White cement + polymers" },
              { label: "Whiteness Index", value: "≥ 85%" },
              { label: "Water Demand", value: "35–40% by weight" },
              { label: "Pot Life", value: "90 minutes" },
            ],
          },
          {
            name: "Performance",
            attributes: [
              { label: "Dry Film Thickness", value: "1–1.5 mm per coat" },
              { label: "Coverage", value: "14–18 sq ft / kg / coat" },
              { label: "Drying Time", value: "4–6 hours between coats" },
              { label: "Application", value: "Brush, roller, or spray" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Surface Quality",
        features: [
          "Brilliant white finish with high whiteness index",
          "Excellent adhesion to brick, block, and plaster substrates",
          "Hard, crack-resistant film that minimises paint flaking",
        ],
      },
      {
        title: "Ease of Use",
        features: [
          "Ready to mix — just add water",
          "Smooth application and sandability",
          "Compatible with all types of interior and exterior paints",
        ],
      },
    ],
    applications: ["Interior Walls", "Exterior Walls", "Ceiling Finishing", "Pre-paint Preparation", "New Construction", "Renovation"],
    faqs: [
      {
        question: "How many coats of wall putty are recommended?",
        answer: "Two coats are standard — first coat for filling and levelling, second coat for a smooth finish. Sand lightly between coats with 120-grit sandpaper.",
      },
      {
        question: "Can UltraTech Wall Putty be used on damp walls?",
        answer: "No. The substrate must be dry, cured, and free of efflorescence or loose material. For damp areas, apply a waterproofing primer before the putty.",
      },
    ],
    aboutBrand: ABOUT,
    category: "Wall Putty",
    status: "Active",
    views: 640,
    enquiries: 22,
  },

  p4: {
    id: "p4",
    name: "UltraTech AAC Block",
    brand: "UltraTech Cement",
    brandLogo: LOGO,
    images: [
      "https://images.unsplash.com/photo-1587582423116-ec07293f0395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "Autoclaved Aerated Concrete (AAC) blocks offering lightweight, thermally efficient walling. Up to 3× lighter than red brick with superior fire resistance, sound insulation, and seismic compliance.",
    sizes: ["600×200×100 mm", "600×200×150 mm", "600×200×200 mm", "600×200×230 mm"],
    colors: ["Light Grey"],
    finishes: ["Smooth Face"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Physical Properties",
            attributes: [
              { label: "Density", value: "550–650 kg/m³" },
              { label: "Compressive Strength", value: "3.5–4.5 N/mm²" },
              { label: "Thermal Conductivity", value: "0.16 W/m·K" },
              { label: "Fire Rating", value: "4 hours (200 mm block)" },
            ],
          },
          {
            name: "Acoustic & Moisture",
            attributes: [
              { label: "Sound Reduction", value: "42–45 dB (150 mm)" },
              { label: "Water Absorption", value: "< 10% by weight" },
              { label: "Shrinkage", value: "< 0.04%" },
              { label: "Standard", value: "IS 2185 Part 3" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Structural Benefits",
        features: [
          "35% lighter than conventional masonry — reduces dead load on structure",
          "High dimensional accuracy reduces mortar and plastering requirement",
          "Seismic Zone V compliant",
        ],
      },
      {
        title: "Thermal & Acoustic",
        features: [
          "Thermal conductivity 3× better than red brick — significant HVAC savings",
          "Excellent sound insulation for commercial and residential use",
          "No seasonal dimensional change",
        ],
      },
    ],
    applications: ["Partition Walls", "External Walls", "Infill Masonry", "High-Rise Buildings", "IT Parks", "Hotels"],
    faqs: [
      {
        question: "What mortar should be used with AAC blocks?",
        answer: "Use thin-bed mortar (2–3 mm joint) specially formulated for AAC, or polymer-modified mortar. Standard cement-sand mortar should not be used as it creates thermal bridges.",
      },
      {
        question: "Can AAC blocks be used in load-bearing walls?",
        answer: "AAC blocks with compressive strength ≥ 4 N/mm² can be used for low-rise load-bearing construction. For high-rise, they are typically used as infill in framed structures.",
      },
    ],
    aboutBrand: ABOUT,
    category: "AAC Blocks",
    status: "Active",
    views: 410,
    enquiries: 14,
  },

  p5: {
    id: "p5",
    name: "UltraTech PPC Cement",
    brand: "UltraTech Cement",
    brandLogo: LOGO,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "Portland Pozzolana Cement (PPC) blended with fly ash, offering lower heat of hydration, better long-term strength, and enhanced durability in aggressive environments. Ideal for mass concrete and coastal construction.",
    sizes: ["50 kg Bag", "25 kg Bag"],
    colors: ["Grey"],
    finishes: ["Powder"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Physical Properties",
            attributes: [
              { label: "Type", value: "PPC (IS 1489 Part 1)" },
              { label: "Fly Ash Content", value: "15–35%" },
              { label: "28-Day Strength", value: "≥ 33 N/mm²" },
              { label: "Initial Setting Time", value: "≥ 30 min" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Performance",
        features: [
          "Lower heat of hydration — ideal for mass concrete pours",
          "Superior long-term strength development",
          "Reduced permeability for durable structures",
        ],
      },
    ],
    applications: ["Mass Concrete", "Plastering", "Brickwork", "Coastal Construction", "Water-Retaining Structures"],
    faqs: [
      {
        question: "Is PPC suitable for RCC work?",
        answer: "Yes. PPC is widely used for RCC, though it gains strength slightly slower than OPC 53 in the first 7 days. By 28 days and beyond, strength is equivalent.",
      },
    ],
    aboutBrand: ABOUT,
    category: "Cement & Concrete",
    status: "Draft",
    views: 320,
    enquiries: 9,
  },

  p6: {
    id: "p6",
    name: "UltraTech Waterproofing Solution",
    brand: "UltraTech Cement",
    brandLogo: LOGO,
    images: [
      "https://images.unsplash.com/photo-1590756254933-2873d72a83b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "Polymer-modified cementitious waterproofing slurry for wet areas, terraces, and below-grade structures. Two-component system providing a seamless, crack-bridging waterproof membrane.",
    sizes: ["20 kg Kit (Part A + B)", "5 kg Kit"],
    colors: ["Grey", "White"],
    finishes: ["Smooth Membrane"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Performance",
            attributes: [
              { label: "Type", value: "2-component cementitious" },
              { label: "Crack Bridging", value: "≥ 1.5 mm static" },
              { label: "Water Permeability", value: "Nil at 5 bar" },
              { label: "Coverage", value: "1.5–2 kg/m² per coat" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Protection",
        features: [
          "Seamless waterproof membrane with crack-bridging capability",
          "Resistant to hydrostatic pressure up to 5 bar",
          "UV and root-penetration resistant",
        ],
      },
    ],
    applications: ["Terraces", "Bathrooms", "Basements", "Water Tanks", "Balconies", "Retaining Walls"],
    faqs: [
      {
        question: "How many coats are required?",
        answer: "Minimum two coats applied in perpendicular directions. Total dry film thickness should be ≥ 1.5 mm. A third coat is recommended in high-exposure or below-grade applications.",
      },
    ],
    aboutBrand: ABOUT,
    category: "Waterproofing",
    status: "Draft",
    views: 180,
    enquiries: 5,
  },
  "dl-001": {
    id: "dl-001",
    name: "Havells Filamento LED Filament Bulb",
    brand: "Havells",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Havells_new_logo.svg/1200px-Havells_new_logo.svg.png",
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "The Havells Filamento series brings the warmth of vintage Edison lighting with the efficiency of modern LED technology. Hand-crafted spiral filaments inside a blown-glass A60 globe deliver a 360° omni-directional glow at just 4W — replacing a 40W incandescent with zero compromise on ambience.",
    sizes: ["2W (20W equiv)", "4W (40W equiv)", "6W (60W equiv)"],
    colors: ["Warm White 2700K", "Amber 2200K"],
    finishes: ["Clear Glass", "Smoky Glass", "Amber Tinted"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Electrical Properties",
            attributes: [
              { label: "Wattage", value: "4W" },
              { label: "Base Type", value: "E27 Edison Screw" },
              { label: "Voltage", value: "180–240V AC" },
              { label: "Frequency", value: "50 Hz" },
            ],
          },
          {
            name: "Light Output",
            attributes: [
              { label: "Luminous Flux", value: "400 lm" },
              { label: "Color Temperature", value: "2700K Warm White" },
              { label: "Color Rendering Index", value: "CRI > 80" },
              { label: "Beam Angle", value: "360° Omni-directional" },
            ],
          },
        ],
      },
      {
        title: "DESIGN & BUILD",
        sections: [
          {
            name: "Physical Dimensions",
            attributes: [
              { label: "Bulb Shape", value: "A60 Globe" },
              { label: "Height", value: "116 mm" },
              { label: "Diameter", value: "60 mm" },
              { label: "Weight", value: "42 g" },
            ],
          },
          {
            name: "Performance",
            attributes: [
              { label: "Rated Lifespan", value: "15,000 hours" },
              { label: "Dimmable", value: "Yes (compatible dimmer required)" },
              { label: "Warm-up Time", value: "Instant On" },
              { label: "Mercury Content", value: "Zero" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Aesthetics & Design",
        features: [
          "Hand-crafted spiral filament visible through blown glass globe",
          "Vintage Edison style with a warm amber glow at 2700K",
          "Available in clear, smoky, and amber-tinted glass finishes",
        ],
      },
      {
        title: "Performance & Efficiency",
        features: [
          "90% energy savings vs equivalent incandescent",
          "360° omni-directional light output — no dark spots",
          "Compatible with standard E27 dimmers for ambience control",
          "15,000-hour rated lifespan — 5× longer than CFL",
        ],
      },
    ],
    applications: ["Pendant Lights", "Chandeliers", "Cafe & Restaurant Decor", "Residential Accent Lighting", "Retail Display Lighting", "Hotel Lobbies"],
    faqs: [
      {
        question: "Is this bulb compatible with standard dimmers?",
        answer: "Yes, the Havells Filamento 4W is dimmable but requires a leading-edge (TRIAC) dimmer switch rated for LED use. Trailing-edge dimmers may cause flickering.",
      },
      {
        question: "What is the equivalent wattage for a standard incandescent?",
        answer: "The 4W Filamento is equivalent in brightness to a 40W incandescent, producing approximately 400 lumens at a warm 2700K color temperature.",
      },
      {
        question: "Can I use this bulb outdoors?",
        answer: "The Filamento A60 is rated for indoor use only (IP20). For outdoor pendant or patio use, please select the Havells Filamento IP44 weatherproof variant.",
      },
    ],
    aboutBrand: "Havells India Ltd. is one of India's largest fast-moving electrical goods companies, with a presence in over 50 countries. The brand offers a complete range of home electrical appliances, lighting solutions, switchgear, cables, and fans — trusted by architects, interior designers, and homeowners for quality and innovation.",
    category: "decorative-lighting",
    status: "Active",
    views: 860,
    enquiries: 34,
  },

  "dl-002": {
    id: "dl-002",
    name: "Syska Heritage ST64 Edison Bulb",
    brand: "Syska",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Syska_Logo.svg/1200px-Syska_Logo.svg.png",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1548544505-2e16fce5d5c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
    description: "The Syska Heritage ST64 captures the essence of early 20th century Edison lighting in a modern LED package. The iconic teardrop ST64 silhouette houses looped filament arrays that cast long, dramatic shadows — the hallmark of industrial loft and heritage interior styles.",
    sizes: ["4W (40W equiv)", "6W (60W equiv)", "8W (75W equiv)"],
    colors: ["Warm White 2700K", "Golden Amber 2200K"],
    finishes: ["Clear Glass", "Antique Amber"],
    attributeGroups: [
      {
        title: "TECHNICAL SPECIFICATIONS",
        sections: [
          {
            name: "Electrical Properties",
            attributes: [
              { label: "Wattage", value: "6W" },
              { label: "Base Type", value: "E27 Edison Screw" },
              { label: "Voltage", value: "180–240V AC" },
              { label: "Frequency", value: "50 Hz" },
            ],
          },
          {
            name: "Light Output",
            attributes: [
              { label: "Luminous Flux", value: "500 lm" },
              { label: "Color Temperature", value: "2200K Golden Amber" },
              { label: "Color Rendering Index", value: "CRI > 82" },
              { label: "Beam Angle", value: "320° Wide Spread" },
            ],
          },
        ],
      },
      {
        title: "DESIGN & BUILD",
        sections: [
          {
            name: "Physical Dimensions",
            attributes: [
              { label: "Bulb Shape", value: "ST64 Teardrop" },
              { label: "Height", value: "143 mm" },
              { label: "Diameter", value: "64 mm" },
              { label: "Weight", value: "55 g" },
            ],
          },
          {
            name: "Performance",
            attributes: [
              { label: "Rated Lifespan", value: "12,000 hours" },
              { label: "Dimmable", value: "No" },
              { label: "Warm-up Time", value: "Instant On" },
              { label: "Mercury Content", value: "Zero" },
            ],
          },
        ],
      },
    ],
    featureGroups: [
      {
        title: "Aesthetics & Design",
        features: [
          "Iconic ST64 teardrop silhouette — a design staple in industrial and heritage interiors",
          "Looped filament arrays create dramatic light-and-shadow patterns",
          "Available in clear and antique amber glass for varied warmth levels",
        ],
      },
      {
        title: "Performance & Efficiency",
        features: [
          "2200K golden amber tone replicates candlelight ambience",
          "12,000-hour rated lifespan",
          "Low flicker (< 5%) — safe for long-duration exposure in hospitality spaces",
          "RoHS compliant — no hazardous materials",
        ],
      },
    ],
    applications: ["Table Lamps", "Wall Sconces", "Industrial Loft Decor", "Hotel Lobby Lighting", "Boutique Retail", "Cafe & Bar Interiors"],
    faqs: [
      {
        question: "What makes the ST64 shape different from standard A60 bulbs?",
        answer: "The ST64 has a larger teardrop globe (64mm diameter vs 60mm) and a taller profile (143mm vs 116mm). The extended shape showcases longer filament loops, making the internal structure a design element in open pendant fittings.",
      },
      {
        question: "Is this bulb dimmable?",
        answer: "The Heritage ST64 6W is not dimmable. For a dimmable option in the same aesthetic, consider the Havells Filamento 4W which supports leading-edge TRIAC dimmers.",
      },
      {
        question: "Can multiple ST64 bulbs be grouped in a multi-pendant cluster?",
        answer: "Yes. The E27 base is universal and the warm 2200K tone is ideal for cluster pendant arrangements. Ensure the fitting's total wattage capacity covers the combined load of all bulbs.",
      },
    ],
    aboutBrand: "Syska LED Lights is one of India's leading LED lighting brands with a distribution network spanning 100,000+ retail outlets. From residential and commercial lighting to smart home solutions, Syska combines energy efficiency with contemporary design — trusted by lighting designers and contractors across the country.",
    category: "decorative-lighting",
    status: "Active",
    views: 620,
    enquiries: 21,
  },

};

export function getInventoryProduct(id: string): InventoryProduct | undefined {
  return INVENTORY[id];
}

export function getBrandInventory(): InventoryProduct[] {
  return Object.values(INVENTORY);
}
