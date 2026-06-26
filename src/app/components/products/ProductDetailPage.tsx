import { useState, useEffect, useRef, useMemo } from 'react';
import { getProductDetail } from '../data/inventoryData';
import { ChevronDown, ExternalLink, Plus, Heart, ChevronRight, Minus, ChevronLeft, ArrowRight, Share2, Link2, Check, X, CheckCircle, Mail, MessageCircle, Layers, MapPin, Download, RotateCcw, Smartphone, ScanLine, ZoomIn, ZoomOut, ChevronUp, Sun, Moon, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { StoreNavigator, type StoreLocation } from '../shared/StoreNavigator';

// ─── Wishlist (localStorage) ────────────────────────────────────────────────

const WISHLIST_KEY = 'ml_wishlist';

export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  size?: string;
  color?: string;
  finish?: string;
  addedAt: string;
  source?: "platform" | "uploaded";
  category?: string;
  note?: string;
}

export function getWishlist(): WishlistItem[] {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? '[]'); }
  catch { return []; }
}
function isInWishlist(id: string) { return getWishlist().some(i => i.id === id); }
function addToWishlist(item: WishlistItem) {
  const list = getWishlist().filter(i => i.id !== item.id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify([item, ...list]));
  window.dispatchEvent(new Event('ml-wishlist-change'));
}
function removeFromWishlist(id: string) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(getWishlist().filter(i => i.id !== id)));
  window.dispatchEvent(new Event('ml-wishlist-change'));
}

// ─── Projects (localStorage) ─────────────────────────────────────────────────

const PROJECTS_KEY = 'ml_wishlist_projects';

interface ProjectRef { id: string; name: string; type: string; location: string; itemIds: string[]; }

function getProjects(): ProjectRef[] {
  try { return JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]'); }
  catch { return []; }
}

function addItemToProject(projectId: string, itemId: string) {
  const updated = getProjects().map(p =>
    p.id === projectId && !p.itemIds.includes(itemId)
      ? { ...p, itemIds: [...p.itemIds, itemId] }
      : p
  );
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
}

// ─── Store data ──────────────────────────────────────────────────────────────

const KAJARIA_STORES: StoreLocation[] = [
  { id: "k1", name: "Kajaria Experience Centre", type: "flagship", address: "Unit 7, Trade Centre", area: "BKC", city: "Mumbai", pincode: "400051", phone: "+91 22 4232 8800", hours: "Mon–Sat 10am–7pm", lat: 19.0659, lng: 72.8658 },
  { id: "k2", name: "Kajaria World Andheri", type: "showroom", address: "Versova Road, Near D Mart", area: "Andheri West", city: "Mumbai", pincode: "400053", phone: "+91 22 2632 1100", hours: "Mon–Sat 10am–7pm", lat: 19.1349, lng: 72.8253 },
  { id: "k3", name: "Kajaria Tiles Lower Parel", type: "dealer", address: "Senapati Bapat Marg", area: "Lower Parel", city: "Mumbai", pincode: "400013", phone: "+91 22 2490 5500", hours: "Mon–Sat 9am–6:30pm", lat: 18.9962, lng: 72.8295 },
  { id: "k4", name: "Kajaria Authorised Dealer", type: "dealer", address: "Gokhale Road, Near Junction", area: "Thane West", city: "Thane", pincode: "400602", phone: "+91 22 2534 7700", hours: "Mon–Sat 9am–6pm", lat: 19.1960, lng: 72.9648 },
  { id: "k5", name: "Kajaria Tiles Kharghar", type: "showroom", address: "Sector 12, Central Avenue", area: "Kharghar", city: "Navi Mumbai", pincode: "410210", phone: "+91 22 2774 2200", hours: "Mon–Sat 10am–6:30pm", lat: 19.0476, lng: 73.0688 },
  { id: "k6", name: "Kajaria Premium Outlet", type: "dealer", address: "Linking Road, Santacruz", area: "Santacruz West", city: "Mumbai", pincode: "400054", phone: "+91 22 2649 3300", hours: "Mon–Sat 10am–7:30pm", lat: 19.0841, lng: 72.8388 },
];

// ─── Data ────────────────────────────────────────────────────────────────────

interface BrandProduct { id: string; name: string; brand: string; image: string; attributes: string[]; }
interface SimilarProduct { id: string; name: string; brand: string; image: string; attributes: string[]; }
interface FAQ { question: string; answer: string; }

const productData = {
  id: 'kajaria-glazed-ceramic-tile',
  name: 'Glazed Ceramic Tile',
  brand: 'Kajaria Ceramics',
  brandLogo: 'https://companieslogo.com/img/orig/KAJARIACER.NS-3507198e.png?t=1593960012',
  images: [
    'https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  ],
  description: 'Premium glazed ceramic tile with superior durability and aesthetic appeal. Perfect for both residential and commercial applications. Engineered for high-traffic environments while maintaining a refined matte finish.',
  sizes: ['600×600 mm', '800×800 mm', '1200×600 mm'],
  colors: ['Pearl White', 'Onyx Grey', 'Soft Beige', 'Carbon Black'],
  finishes: ['Matte', 'Glossy', 'Satin'],
  attributeGroups: [
    { title: 'DIMENSIONS', sections: [{ name: 'Physical Properties', attributes: [{ label: 'Width', value: '600 mm' }, { label: 'Height', value: '600 mm' }, { label: 'Thickness', value: '10 mm' }, { label: 'Weight per pc', value: '0.5 kg' }] }] },
    { title: 'TECHNICAL SPECIFICATIONS', sections: [{ name: 'Performance', attributes: [{ label: 'Water Absorption', value: '< 0.5%' }, { label: 'Breaking Strength', value: '> 1300 N' }, { label: 'Modulus of Rupture', value: '> 35 N/mm²' }, { label: 'Surface Hardness', value: '6 Mohs' }] }, { name: 'Safety & Quality', attributes: [{ label: 'Fire Rating', value: 'Class A1' }, { label: 'Slip Resistance', value: 'R10' }, { label: 'Certification', value: 'ISO 13006' }] }] },
    { title: 'PACKAGING', sections: [{ name: 'Logistic Details', attributes: [{ label: 'Package Option', value: 'Box' }, { label: 'Pieces per Box', value: '12 pieces' }, { label: 'Coverage per Box', value: '4.32 m²' }, { label: 'Box Dimensions', value: '0.61×0.31×0.12 m' }] }] },
  ],
  featureGroups: [
    { title: 'Durability & Performance', features: ['Superior durability and long-lasting performance', 'Low maintenance and easy to clean', 'Suitable for heavy traffic areas'] },
    { title: 'Environmental Benefits', features: ['Eco-friendly production process', 'UV-resistant coating prevents fading'] },
    { title: 'Installation & Maintenance', features: ['Easy installation process', 'Compatible with standard adhesives', 'Minimal grout joint requirements'] },
  ],
  applications: ['Residential Flooring', 'Commercial Spaces', 'Kitchen Walls', 'Bathroom Walls', 'Outdoor Facade', 'Living Areas', 'Public Hallways'],
  faqs: [
    { question: 'Can this tile be used for outdoor applications?', answer: 'Yes, this glazed ceramic tile is engineered with a fire rating of Class A1 and low water absorption, making it suitable for outdoor facades and covered patio areas.' },
    { question: 'What is the recommended grout joint width?', answer: 'For a 600×600 mm tile, we recommend a minimum grout joint of 2-3 mm to allow for structural movement and thermal expansion.' },
    { question: 'Is this product slip-resistant when wet?', answer: 'The tile has an R10 slip resistance rating, which provides moderate friction. It is suitable for most interior residential areas, though extra care is recommended in wet-room environments.' },
  ],
  aboutBrand: 'Kajaria Ceramics is the largest manufacturer of ceramic/vitrified tiles in India. It has an annual aggregate capacity of 86.47 mn. sq. meters, distributed across eight plants. All plants are ISO 9001, ISO 14001 and OHSAS 18001 certified.',
};

const brandProducts: BrandProduct[] = [
  { id: 'bp1', name: 'Polished Vitrified Tile', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600', attributes: ['800×800 mm', 'Glossy', 'Nano Tech'] },
  { id: 'bp2', name: 'Satin Finish Slab', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', attributes: ['1200×600 mm', 'Satin', 'Stone Look'] },
  { id: 'bp3', name: 'Digital Wall Tile', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?w=600', attributes: ['300×600 mm', 'Matte', 'Ceramic'] },
  { id: 'bp4', name: 'Anti-Skid Outdoor', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600', attributes: ['600×600 mm', 'Textured', 'Full Body'] },
];

const similarProducts: SimilarProduct[] = [
  { id: 'sp1', name: 'Pristine White Marble', brand: 'Asian Paints', image: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=600', attributes: ['Matte', '600×600 mm', 'Floor Tile'] },
  { id: 'sp2', name: 'Industrial Grey Slate', brand: 'Nitco Tiles', image: 'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?w=600', attributes: ['Natural', '800×800 mm', 'Vitrified'] },
  { id: 'sp3', name: 'Terrazzo Multi', brand: 'Somany', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600', attributes: ['Polished', '600×600 mm', 'Patterned'] },
  { id: 'sp4', name: 'Obsidian Black', brand: 'Orientbell', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600', attributes: ['High Gloss', '600×1200 mm', 'Wall Slab'] },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const ProductCard = ({ product, showBrand = true, brandLogo }: { product: BrandProduct | SimilarProduct; showBrand?: boolean; brandLogo: string }) => (
  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden group cursor-pointer flex flex-col h-full shadow-sm hover:shadow-md transition-all">
    <div className="relative h-[180px] overflow-hidden bg-[#F9FAFB]">
      <ImageWithFallback src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm">
        <ImageWithFallback src={brandLogo} className="w-full h-full object-contain" />
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h4 className="text-[#0F172A] text-[15px] font-medium mb-1 truncate">{product.name}</h4>
      {showBrand && <p className="text-[#6B7280] text-[13px] mb-3">{product.brand}</p>}
      <div className="flex flex-wrap gap-2 mb-6">
        {product.attributes.map((attr: string) => (
          <span key={attr} className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-widest">{attr}</span>
        ))}
      </div>
      <button className="mt-auto w-full h-10 border border-[#E5E7EB] text-[#0F172A] rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-gray-300 transition-all">
        View Product
      </button>
    </div>
  </motion.div>
);

const FAQItem = ({ faq, index }: { faq: FAQ; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden transition-all hover:border-[#D1D5DB]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-6 py-5 text-left group bg-white hover:bg-[#F9FAFB] transition-colors">
        <span className="text-[15px] font-medium text-[#0F172A] group-hover:text-[#FF6A3D] transition-colors pr-4">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'bg-[#FFEDE5] text-[#FF6A3D]' : 'bg-gray-50 text-gray-400'}`}>
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden bg-white">
            <p className="text-[#6B7280] text-[14px] leading-relaxed px-6 pb-6 pl-8">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Share Panel ──────────────────────────────────────────────────────────────

function SharePanel({ onClose, productName, productBrand }: { onClose: () => void; productName: string; productBrand: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `${productName} by ${productBrand}`;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const socials = [
    { label: 'WhatsApp', color: '#25D366', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank', 'noopener') },
    { label: 'Email', color: '#6B7280', action: () => window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`) },
    { label: 'Twitter / X', color: '#000000', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener') },
    { label: 'LinkedIn', color: '#0A66C2', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener') },
  ];

  return (
    <div ref={ref} className="absolute top-14 right-3 z-30 bg-white rounded-2xl shadow-2xl border border-gray-100 w-56 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-[11px] font-bold text-[#0F172A] uppercase tracking-widest">Share this product</p>
      </div>
      <div className="p-3 space-y-1">
        <button
          onClick={copyLink}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-[13px] text-gray-700"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Link2 size={14} className="text-gray-400" />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        {socials.map(s => (
          <button
            key={s.label}
            onClick={s.action}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-[13px] text-gray-700"
          >
            <span className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Quote Modal ──────────────────────────────────────────────────────────────

const TIMELINES = ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', '6 months or more'];

function QuoteModal({
  size, color, finish, onClose,
}: { size: string; color: string; finish: string; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', quantity: '', timeline: '', notes: '' });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.quantity.trim() || isNaN(Number(form.quantity)) || Number(form.quantity) < 1) e.quantity = 'Enter a valid quantity';
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep('success');
  }

  function field(key: keyof typeof form, label: string, type = 'text', placeholder = '') {
    return (
      <div>
        <label className="block text-[11px] font-bold text-[#364153] uppercase tracking-[0.12em] mb-1.5">{label}</label>
        <input
          type={type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className={`w-full h-10 px-3 rounded-lg border text-[13px] outline-none transition-colors ${errors[key] ? 'border-red-400 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#FF6A3D]'}`}
        />
        {errors[key] && <p className="text-[11px] text-red-500 mt-1">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0] sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-[15px] font-semibold text-[#0F172A]">Request a Quote</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">{data.brand} will respond within 24 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X size={16} />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={submit} className="p-6 space-y-4" noValidate>
            {/* Product summary chip */}
            <div className="bg-[#FFF5F0] border border-[#FFD9C7] rounded-xl px-4 py-3 flex items-start gap-3">
              <img src={data.images[0]} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt="" />
              <div>
                <p className="text-[13px] font-semibold text-[#0F172A]">{data.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{size} · {color} · {finish} finish</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {field('name', 'Full name *', 'text', 'Ananya Sharma')}
              {field('company', 'Company / Studio', 'text', 'Studio Name')}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field('email', 'Email *', 'email', 'you@company.com')}
              {field('phone', 'Phone', 'tel', '+91 98765 43210')}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field('quantity', 'Quantity (boxes) *', 'number', 'e.g. 50')}
              <div>
                <label className="block text-[11px] font-bold text-[#364153] uppercase tracking-[0.12em] mb-1.5">Project timeline</label>
                <select
                  value={form.timeline}
                  onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-[#E5E7EB] text-[13px] outline-none focus:border-[#FF6A3D] transition-colors appearance-none"
                >
                  <option value="">Select…</option>
                  {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#364153] uppercase tracking-[0.12em] mb-1.5">Additional notes</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
                placeholder="Describe your project, delivery location, or any specific requirements…"
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[13px] outline-none focus:border-[#FF6A3D] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-[#FF6A3D] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] active:scale-[0.98] transition-all"
            >
              Submit Quote Request
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#0F172A] mb-2">Quote request sent!</h3>
            <p className="text-[13px] text-gray-500 max-w-xs">
              {data.brand} has received your enquiry for <strong>{data.name}</strong>. Expect a response within 24 business hours.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 h-11 bg-[#FF6A3D] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Wishlist Toast ───────────────────────────────────────────────────────────

function WishlistToast({ added, onClose }: { added: boolean; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl"
    >
      <Heart size={14} fill={added ? 'white' : 'none'} />
      <span className="text-[13px]">{added ? 'Added to wishlist' : 'Removed from wishlist'}</span>
      {added && (
        <Link to="/wishlist" className="text-[12px] font-bold text-[#FF6A3D] underline underline-offset-2 ml-1" onClick={onClose}>
          View Wishlist →
        </Link>
      )}
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
        <X size={12} />
      </button>
    </motion.div>
  );
}

// ─── Documents & Downloads ───────────────────────────────────────────────────

interface DocEntry { name: string; type: string; size: string; }
interface DocGroup { title: string; docs: DocEntry[]; }
interface DocTab   { label: string; groups: DocGroup[]; }

const PRODUCT_DOCS: Record<string, DocTab[]> = {

  /* ── p1 · UltraTech OPC 53 Grade Cement ─────────────────────────── */
  p1: [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — UltraTech OPC 53 Grade",          type: "PDF", size: "312 KB" },
            { name: "Mix Proportions for Standard Concrete Grades (M15–M50)", type: "PDF", size: "186 KB" },
            { name: "Fineness & Setting Time Reference Data",                 type: "PDF", size: "94 KB"  },
            { name: "Heat of Hydration Characteristics",                      type: "PDF", size: "128 KB" },
          ],
        },
        {
          title: "Specifications",
          docs: [
            { name: "Compressive Strength Development Chart (3/7/28 Day)",    type: "PDF", size: "210 KB" },
            { name: "Chemical Composition — Typical Batch Values",            type: "PDF", size: "76 KB"  },
            { name: "Water Demand & Consistence Data",                        type: "PDF", size: "98 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Mix Design & Usage",
          docs: [
            { name: "Concrete Mix Design Guide (IS 10262:2019)",              type: "PDF", size: "540 KB" },
            { name: "Water-Cement Ratio Reference Chart",                     type: "PDF", size: "118 KB" },
            { name: "RCC Slab Work Best Practices",                           type: "PDF", size: "365 KB" },
            { name: "Pre-stressed Concrete Application Note",                 type: "PDF", size: "298 KB" },
            { name: "Industrial Floor Slab Design Guide",                     type: "PDF", size: "420 KB" },
          ],
        },
        {
          title: "Site Conditions",
          docs: [
            { name: "Concreting in Hot Weather Conditions",                   type: "PDF", size: "205 KB" },
            { name: "Concreting in Cold Weather & Monsoon Season",            type: "PDF", size: "198 KB" },
            { name: "Curing Methods, Duration & Compound Selection",          type: "PDF", size: "167 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Bureau of Indian Standards",
          docs: [
            { name: "BIS Certification — IS 12269:2013 (OPC 53 Grade)",      type: "PDF", size: "220 KB" },
            { name: "IS 269:2015 Compliance Certificate",                     type: "PDF", size: "185 KB" },
            { name: "Third-Party Compressive Strength Test Report",           type: "PDF", size: "340 KB" },
            { name: "Soundness & Expansion Test (Le Chatelier Method)",       type: "PDF", size: "155 KB" },
          ],
        },
        {
          title: "Quality & Environment",
          docs: [
            { name: "ISO 9001:2015 Quality Management Certificate",           type: "PDF", size: "140 KB" },
            { name: "Chemical Analysis — Alkali & Chloride Batch Report",     type: "PDF", size: "260 KB" },
            { name: "Green Building Council Compliance Declaration",          type: "PDF", size: "172 KB" },
            { name: "Carbon Footprint Disclosure (Scope 1 & 2)",              type: "PDF", size: "310 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Safety Data Sheet (SDS / MSDS) — OPC 53",               type: "PDF", size: "415 KB" },
            { name: "Material Handling & Bag Storage Guidelines",             type: "PDF", size: "230 KB" },
            { name: "Emergency Response & Spill Guide",                       type: "PDF", size: "188 KB" },
          ],
        },
        {
          title: "Health & Protection",
          docs: [
            { name: "Respiratory Protection Requirements (Cement Dust)",      type: "PDF", size: "95 KB"  },
            { name: "Skin Contact, Eye Irritation & First Aid Protocol",      type: "PDF", size: "112 KB" },
            { name: "Environmental Impact & Disposal Guidelines",             type: "PDF", size: "204 KB" },
          ],
        },
      ],
    },
  ],

  /* ── p2 · UltraTech Ready Mix Concrete M25 ──────────────────────── */
  p2: [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Mix Design Documentation",
          docs: [
            { name: "RMC M25 Mix Design Sheet (IS 10262:2019)",               type: "PDF", size: "290 KB" },
            { name: "Admixture Dosage & Compatibility Data",                   type: "PDF", size: "145 KB" },
            { name: "Slump & Workability Retention Chart",                     type: "PDF", size: "88 KB"  },
            { name: "Fly Ash / GGBS Replacement Ratios",                      type: "PDF", size: "112 KB" },
          ],
        },
        {
          title: "Delivery & Batching",
          docs: [
            { name: "Delivery Docket & Batch Record Format",                  type: "PDF", size: "76 KB"  },
            { name: "Transit Drum Rotation Limit Reference (IS 4926)",        type: "PDF", size: "64 KB"  },
            { name: "Pump Placement Guide — Line & Boom Pump",                type: "PDF", size: "210 KB" },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Placing & Curing",
          docs: [
            { name: "Concrete Placement Best Practices — Columns & Slabs",    type: "PDF", size: "380 KB" },
            { name: "Compaction Guide — Vibrator Selection & Spacing",        type: "PDF", size: "160 KB" },
            { name: "Curing Duration by Element Type & Grade",                type: "PDF", size: "148 KB" },
            { name: "Cold Joint Prevention & Pour Sequencing",                type: "PDF", size: "195 KB" },
          ],
        },
        {
          title: "Formwork & Finishing",
          docs: [
            { name: "Formwork Striking Time Recommendations (M25)",           type: "PDF", size: "130 KB" },
            { name: "Surface Finishing Guide — Exposed Concrete",             type: "PDF", size: "245 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Standards Compliance",
          docs: [
            { name: "IS 456:2000 Compliance Certificate",                     type: "PDF", size: "175 KB" },
            { name: "IS 4926:2003 Ready-Mixed Concrete Certificate",          type: "PDF", size: "190 KB" },
            { name: "Cube Strength Test Report — Batch #2024-Q4",             type: "PDF", size: "320 KB" },
            { name: "Chloride Permeability (RCPT) Test Report",               type: "PDF", size: "280 KB" },
          ],
        },
        {
          title: "Plant Certification",
          docs: [
            { name: "ISO 9001:2015 Plant Quality Certificate",                type: "PDF", size: "140 KB" },
            { name: "Third-Party Inspection Report — Batching Plant",         type: "PDF", size: "215 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Site Safety",
          docs: [
            { name: "Safety Data Sheet (SDS) — Ready Mix Concrete",           type: "PDF", size: "390 KB" },
            { name: "Site Safety Briefing for Concrete Operations",           type: "PDF", size: "175 KB" },
            { name: "Emergency Response — Concrete Spill & Washout",         type: "PDF", size: "160 KB" },
          ],
        },
        {
          title: "Environmental",
          docs: [
            { name: "Washout Water Disposal & Environmental Guidelines",      type: "PDF", size: "142 KB" },
            { name: "Dust & Noise Control During Batching Operations",        type: "PDF", size: "118 KB" },
          ],
        },
      ],
    },
  ],

  /* ── p3 · UltraTech Wall Putty ───────────────────────────────────── */
  p3: [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — UltraTech Wall Putty",            type: "PDF", size: "268 KB" },
            { name: "Whiteness Index & Coverage Chart",                       type: "PDF", size: "95 KB"  },
            { name: "Mixing Ratio & Pot Life Reference",                      type: "PDF", size: "72 KB"  },
            { name: "Drying Time vs Humidity & Temperature Chart",            type: "PDF", size: "88 KB"  },
          ],
        },
        {
          title: "Compatibility",
          docs: [
            { name: "Paint Compatibility Matrix — Interior & Exterior",       type: "PDF", size: "128 KB" },
            { name: "Primer Selection Guide for Different Substrates",        type: "PDF", size: "110 KB" },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Surface Preparation",
          docs: [
            { name: "Substrate Preparation Guide — New & Renovation",         type: "PDF", size: "310 KB" },
            { name: "Efflorescence & Moisture Treatment Before Putty",        type: "PDF", size: "188 KB" },
            { name: "Crack Filling & Patching Procedure",                     type: "PDF", size: "165 KB" },
          ],
        },
        {
          title: "Application Method",
          docs: [
            { name: "Interior Wall Putty Application Procedure (2-coat)",     type: "PDF", size: "290 KB" },
            { name: "Exterior Putty Application — Weather Considerations",    type: "PDF", size: "255 KB" },
            { name: "Sanding & Rubbing-Down Between Coats",                   type: "PDF", size: "130 KB" },
            { name: "Common Defects, Causes & Remedies",                      type: "PDF", size: "215 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Standards",
          docs: [
            { name: "IS 6278 Wall Putty Compliance Certificate",              type: "PDF", size: "162 KB" },
            { name: "Adhesion Pull-Off Strength Test Report",                 type: "PDF", size: "198 KB" },
            { name: "Abrasion & Scrub Resistance Test Report",                type: "PDF", size: "174 KB" },
          ],
        },
        {
          title: "Environmental",
          docs: [
            { name: "VOC Compliance Declaration (Low-VOC Formula)",           type: "PDF", size: "98 KB"  },
            { name: "ISO 9001:2015 Quality Certificate",                      type: "PDF", size: "140 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Safety Data Sheet (SDS) — UltraTech Wall Putty",        type: "PDF", size: "355 KB" },
            { name: "Storage & Shelf Life Guidelines (Humid Climates)",       type: "PDF", size: "115 KB" },
          ],
        },
        {
          title: "Health",
          docs: [
            { name: "Skin & Eye Contact Protocol",                            type: "PDF", size: "88 KB"  },
            { name: "PPE Recommendations for Mixing & Application",           type: "PDF", size: "76 KB"  },
            { name: "Dust Exposure Limits & Ventilation Requirements",        type: "PDF", size: "102 KB" },
          ],
        },
      ],
    },
  ],

  /* ── p4 · UltraTech AAC Block ────────────────────────────────────── */
  p4: [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — UltraTech AAC Block",             type: "PDF", size: "345 KB" },
            { name: "Block Size Range & Dimensional Tolerance Chart",         type: "PDF", size: "118 KB" },
            { name: "Thermal Conductivity & U-Value Reference Table",         type: "PDF", size: "148 KB" },
            { name: "Sound Reduction Index by Block Thickness",               type: "PDF", size: "132 KB" },
          ],
        },
        {
          title: "Structural",
          docs: [
            { name: "Compressive Strength Class Chart (Class 2–7)",           type: "PDF", size: "108 KB" },
            { name: "Dead Load Comparison — AAC vs Red Brick vs Hollow Block", type: "PDF", size: "145 KB" },
            { name: "Seismic Zone Compliance Summary (IS 1893)",              type: "PDF", size: "175 KB" },
          ],
        },
      ],
    },
    {
      label: "Construction Guides",
      groups: [
        {
          title: "Masonry & Jointing",
          docs: [
            { name: "AAC Block Masonry Construction Guidelines",              type: "PDF", size: "520 KB" },
            { name: "Thin-Bed Mortar Selection & Application Guide",          type: "PDF", size: "280 KB" },
            { name: "Reinforcement Details for AAC Masonry (IS 2572)",        type: "PDF", size: "340 KB" },
            { name: "Lintel & Bond Beam Design over Openings",                type: "PDF", size: "295 KB" },
          ],
        },
        {
          title: "Cutting, Fixing & Finishing",
          docs: [
            { name: "Cutting, Drilling & Chasing AAC Blocks On-Site",        type: "PDF", size: "188 KB" },
            { name: "Plastering System on AAC — Recommended Procedure",      type: "PDF", size: "260 KB" },
            { name: "Electrical & Plumbing Chasing Guide",                   type: "PDF", size: "175 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Standards & Testing",
          docs: [
            { name: "IS 2185 Part 3:2005 Compliance Certificate",             type: "PDF", size: "195 KB" },
            { name: "Fire Resistance Test Report — 200 mm Block (4 hr)",      type: "PDF", size: "260 KB" },
            { name: "Thermal Performance Certificate (NABL Accredited Lab)",  type: "PDF", size: "230 KB" },
            { name: "Water Absorption & Drying Shrinkage Test Report",        type: "PDF", size: "168 KB" },
          ],
        },
        {
          title: "Green Building",
          docs: [
            { name: "IGBC / GRIHA Points Contribution Summary",               type: "PDF", size: "148 KB" },
            { name: "EPD (Environmental Product Declaration)",                type: "PDF", size: "312 KB" },
            { name: "Recycled Content & Fly Ash Utilisation Statement",       type: "PDF", size: "110 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Site Safety",
          docs: [
            { name: "Safety Data Sheet (SDS) — AAC Block",                   type: "PDF", size: "310 KB" },
            { name: "Handling, Lifting & Storage on Site",                    type: "PDF", size: "198 KB" },
            { name: "Stacking Height & Pallet Load Limits",                   type: "PDF", size: "88 KB"  },
          ],
        },
        {
          title: "Worker Protection",
          docs: [
            { name: "Dust Control during Cutting & Grinding",                 type: "PDF", size: "112 KB" },
            { name: "PPE Requirements for Masonry Operations",                type: "PDF", size: "98 KB"  },
          ],
        },
      ],
    },
  ],

  /* ── p5 · UltraTech PPC Cement ───────────────────────────────────── */
  p5: [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — UltraTech PPC Cement",           type: "PDF", size: "298 KB" },
            { name: "Fly Ash Content & Pozzolanicity Activity Index",        type: "PDF", size: "130 KB" },
            { name: "Strength Development Curve (PPC vs OPC 43/53)",         type: "PDF", size: "168 KB" },
            { name: "Heat of Hydration Comparison Chart",                    type: "PDF", size: "118 KB" },
          ],
        },
        {
          title: "Specifications",
          docs: [
            { name: "Fineness, Setting Time & Soundness Data",               type: "PDF", size: "102 KB" },
            { name: "Chemical Composition — Typical PPC Batch Values",       type: "PDF", size: "88 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Mix Design & Concrete",
          docs: [
            { name: "PPC-Based Concrete Mix Design (IS 10262:2019)",          type: "PDF", size: "490 KB" },
            { name: "Mass Concrete Pour Planning with PPC",                   type: "PDF", size: "345 KB" },
            { name: "Curing Recommendations — Extended Period for PPC",       type: "PDF", size: "155 KB" },
            { name: "Plasterwork & Brickwork Mortar with PPC",               type: "PDF", size: "218 KB" },
          ],
        },
        {
          title: "Durability Applications",
          docs: [
            { name: "Coastal & Marine Construction Guide",                    type: "PDF", size: "410 KB" },
            { name: "Water-Retaining Structure Design with PPC",              type: "PDF", size: "295 KB" },
            { name: "Sulphate-Resistant Construction Application Note",       type: "PDF", size: "232 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Bureau of Indian Standards",
          docs: [
            { name: "IS 1489 Part 1 Compliance Certificate (PPC)",           type: "PDF", size: "195 KB" },
            { name: "28-Day Compressive Strength Test Report",               type: "PDF", size: "268 KB" },
            { name: "Chloride Diffusion & Permeability Test (Coastal Grade)", type: "PDF", size: "310 KB" },
          ],
        },
        {
          title: "Sustainability",
          docs: [
            { name: "Fly Ash Utilisation Certificate",                       type: "PDF", size: "132 KB" },
            { name: "Carbon Footprint Reduction vs OPC Disclosure",          type: "PDF", size: "210 KB" },
            { name: "ISO 9001:2015 Quality Certificate",                     type: "PDF", size: "140 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Safety Data Sheet (SDS / MSDS) — PPC Cement",           type: "PDF", size: "402 KB" },
            { name: "Material Handling & Bag Storage Guidelines",             type: "PDF", size: "220 KB" },
            { name: "Emergency Response Guide",                              type: "PDF", size: "178 KB" },
          ],
        },
        {
          title: "Health & Protection",
          docs: [
            { name: "Respiratory & Skin Protection for Cement Workers",       type: "PDF", size: "108 KB" },
            { name: "Environmental Disposal & Waste Guidelines",              type: "PDF", size: "195 KB" },
          ],
        },
      ],
    },
  ],

  /* ── p6 · UltraTech Waterproofing Solution ───────────────────────── */
  p6: [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — 2-Component Waterproofing Slurry", type: "PDF", size: "388 KB" },
            { name: "Coverage Calculator & Consumption Rate Table",           type: "PDF", size: "108 KB" },
            { name: "Crack-Bridging Ability vs Film Thickness Chart",         type: "PDF", size: "138 KB" },
            { name: "Part A & Part B Mixing Ratio Reference",                 type: "PDF", size: "72 KB"  },
          ],
        },
        {
          title: "Performance Data",
          docs: [
            { name: "Hydrostatic Pressure Resistance Test Data (0–5 bar)",   type: "PDF", size: "175 KB" },
            { name: "Adhesion & Pull-Off Strength on Concrete Substrates",   type: "PDF", size: "145 KB" },
            { name: "UV & Root-Penetration Resistance Test Report",          type: "PDF", size: "168 KB" },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Substrate Preparation",
          docs: [
            { name: "Surface Preparation Guide — Concrete, Brick & Plaster",  type: "PDF", size: "320 KB" },
            { name: "Crack Treatment & Detailing Before Membrane Application", type: "PDF", size: "255 KB" },
            { name: "Priming Requirements by Substrate Type",                 type: "PDF", size: "148 KB" },
          ],
        },
        {
          title: "Application by Area",
          docs: [
            { name: "Terrace & Flat Roof Waterproofing Procedure",            type: "PDF", size: "410 KB" },
            { name: "Bathroom & Wet Area Step-by-Step Guide",                 type: "PDF", size: "365 KB" },
            { name: "Below-Grade Basement — Positive-Side Waterproofing",     type: "PDF", size: "380 KB" },
            { name: "Water Tank & Swimming Pool Application Guide",           type: "PDF", size: "290 KB" },
            { name: "Balcony & External Planter Box Guide",                   type: "PDF", size: "225 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Standards & Testing",
          docs: [
            { name: "IS 16098 Waterproofing Compliance Certificate",          type: "PDF", size: "188 KB" },
            { name: "Water Permeability Test Report (DIN 1048)",               type: "PDF", size: "245 KB" },
            { name: "Crack-Bridging Test — Static & Dynamic Loading",         type: "PDF", size: "305 KB" },
            { name: "Carbonation & Chloride Resistance Test Report",          type: "PDF", size: "268 KB" },
          ],
        },
        {
          title: "Quality",
          docs: [
            { name: "ISO 9001:2015 Quality Management Certificate",           type: "PDF", size: "140 KB" },
            { name: "Third-Party Performance Validation Report",              type: "PDF", size: "220 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Safety Data Sheet (SDS) — Part A (Cementitious)",        type: "PDF", size: "370 KB" },
            { name: "Safety Data Sheet (SDS) — Part B (Polymer Component)",   type: "PDF", size: "345 KB" },
            { name: "Emergency Response — Spill, Inhalation & Eye Contact",   type: "PDF", size: "182 KB" },
          ],
        },
        {
          title: "PPE & Storage",
          docs: [
            { name: "PPE Requirements — Gloves, Goggles & Respiratory Mask", type: "PDF", size: "95 KB"  },
            { name: "Storage, Frost Protection & Shelf Life Guidelines",      type: "PDF", size: "118 KB" },
            { name: "Environmental Disposal of Packaging & Washwater",        type: "PDF", size: "130 KB" },
          ],
        },
      ],
    },
  ],

  /* ── dl-001 · Havells Filamento LED Filament Bulb ───────────────────── */
  "dl-001": [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — Havells Filamento 4W / 6W", type: "PDF", size: "218 KB" },
            { name: "Lumen Output & Efficacy Data (All Wattages)",       type: "PDF", size: "134 KB" },
            { name: "Color Temperature & CRI Specification Sheet",       type: "PDF", size: "88 KB"  },
            { name: "Filament Geometry & Glass Envelope Dimensions",     type: "PDF", size: "72 KB"  },
          ],
        },
        {
          title: "Electrical Specifications",
          docs: [
            { name: "Input Voltage & Power Factor Reference",            type: "PDF", size: "54 KB"  },
            { name: "Thermal Management & Heat Dissipation Data",        type: "PDF", size: "96 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Installation & Usage",
          docs: [
            { name: "Recommended Fixture & Shade Compatibility Guide",   type: "PDF", size: "185 KB" },
            { name: "Dimmer Compatibility & Compatible Device List",     type: "PDF", size: "142 KB" },
            { name: "Indoor Ambient Lighting Design Guide",              type: "PDF", size: "310 KB" },
          ],
        },
        {
          title: "Energy & Efficiency",
          docs: [
            { name: "LED vs Incandescent Energy Savings Calculator",     type: "XLS", size: "78 KB"  },
            { name: "BEE Star Rating Explanation & Usage Tips",          type: "PDF", size: "108 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Bureau of Energy Efficiency",
          docs: [
            { name: "BEE 5-Star Rating Certificate — Filamento Series", type: "PDF", size: "196 KB" },
            { name: "IS 16102 Compliance Test Report",                  type: "PDF", size: "228 KB" },
            { name: "LM-80 Lumen Maintenance Report (6000 hrs)",        type: "PDF", size: "315 KB" },
          ],
        },
        {
          title: "Safety & Quality",
          docs: [
            { name: "ISI Mark Certificate (IS 16102:2012)",              type: "PDF", size: "164 KB" },
            { name: "ISO 9001:2015 Quality Management Certificate",      type: "PDF", size: "140 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Electrical Safety Precautions & Installation Guide", type: "PDF", size: "122 KB" },
            { name: "Mercury-Free & RoHS Compliance Declaration",         type: "PDF", size: "88 KB"  },
            { name: "End-of-Life Disposal & E-Waste Guidelines",          type: "PDF", size: "96 KB"  },
          ],
        },
      ],
    },
  ],

  /* ── dl-002 · Syska Heritage ST64 Filament LED ───────────────────────── */
  "dl-002": [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — Syska Heritage ST64 Series", type: "PDF", size: "204 KB" },
            { name: "Lumen Output & Color Temperature Chart",            type: "PDF", size: "118 KB" },
            { name: "ST64 Bulb Dimensional Drawing (mm)",                type: "PDF", size: "64 KB"  },
          ],
        },
        {
          title: "Optical Performance",
          docs: [
            { name: "360° Beam Angle Photometric Report",                type: "PDF", size: "145 KB" },
            { name: "CRI & Color Consistency Batch Report",              type: "PDF", size: "92 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Decorative Lighting Use",
          docs: [
            { name: "Pendant & Chandelier Fixture Selection Guide",       type: "PDF", size: "220 KB" },
            { name: "Decorative Lighting Layering & Design Tips",         type: "PDF", size: "295 KB" },
            { name: "Dimmer Compatibility List — Syska Heritage",         type: "PDF", size: "130 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Certifications",
          docs: [
            { name: "BEE 5-Star Certificate — Heritage ST64",            type: "PDF", size: "188 KB" },
            { name: "IS 16102 Test Report & Compliance Letter",          type: "PDF", size: "215 KB" },
            { name: "RoHS & REACH Compliance Declaration",               type: "PDF", size: "82 KB"  },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Electrical Safety & Installation Instructions",     type: "PDF", size: "110 KB" },
            { name: "E-Waste & Responsible Disposal Guide",              type: "PDF", size: "88 KB"  },
          ],
        },
      ],
    },
  ],

  /* ── lb-001 · Havells Adore 9W LED Bulb ─────────────────────────────── */
  "lb-001": [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — Havells Adore 9W LED",       type: "PDF", size: "196 KB" },
            { name: "Luminous Efficacy & Lumen Output Data",             type: "PDF", size: "112 KB" },
            { name: "Color Temperature Options — 3000K / 4000K / 6500K", type: "PDF", size: "86 KB"  },
          ],
        },
        {
          title: "Electrical Specifications",
          docs: [
            { name: "Driver Circuit & THD Specification",                type: "PDF", size: "78 KB"  },
            { name: "Surge Protection & Flicker-Free Data",              type: "PDF", size: "94 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Residential Use",
          docs: [
            { name: "Residential Lighting Design Guide",                 type: "PDF", size: "285 KB" },
            { name: "Lumen-to-Room-Size Selection Chart",                type: "PDF", size: "124 KB" },
          ],
        },
        {
          title: "Energy Saving",
          docs: [
            { name: "LED Retrofit — Replacing CFL & Incandescent",       type: "PDF", size: "168 KB" },
            { name: "Annual Energy Savings Comparison Table",            type: "XLS", size: "64 KB"  },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "BEE & ISI",
          docs: [
            { name: "BEE 5-Star Certificate — Adore 9W",                type: "PDF", size: "180 KB" },
            { name: "ISI Mark Certificate (IS 16102)",                  type: "PDF", size: "155 KB" },
            { name: "LM-80 Lumen Maintenance Data (6000 hrs)",          type: "PDF", size: "298 KB" },
          ],
        },
        {
          title: "EMC & Safety",
          docs: [
            { name: "EMC Test Report (CISPR 15)",                        type: "PDF", size: "210 KB" },
            { name: "IEC 62560 Safety Compliance Report",                type: "PDF", size: "188 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Electrical Safety Sheet — Havells Adore Series",   type: "PDF", size: "108 KB" },
            { name: "Mercury-Free & RoHS Compliance",                   type: "PDF", size: "76 KB"  },
            { name: "E-Waste Disposal Guidelines (E-Waste Rules 2022)", type: "PDF", size: "92 KB"  },
          ],
        },
      ],
    },
  ],

  /* ── lb-002 · Philips Stellar Bright 12W LED ─────────────────────────── */
  "lb-002": [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — Philips Stellar 12W LED",   type: "PDF", size: "212 KB" },
            { name: "Photometric Data — IES File (LM-63)",              type: "PDF", size: "48 KB"  },
            { name: "Spectral Power Distribution Chart",                type: "PDF", size: "102 KB" },
          ],
        },
        {
          title: "Performance Data",
          docs: [
            { name: "Lumen Maintenance Projection (L70 / 25,000 hrs)", type: "PDF", size: "265 KB" },
            { name: "Ambient Temperature vs Output Derating Curve",     type: "PDF", size: "88 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "General Illumination",
          docs: [
            { name: "Home & Office Lighting Application Guide",         type: "PDF", size: "340 KB" },
            { name: "Corridor & Stairwell Lighting Layout Guide",       type: "PDF", size: "198 KB" },
            { name: "Retail Accent & Display Lighting Guide",           type: "PDF", size: "255 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Global & India Certifications",
          docs: [
            { name: "BEE 5-Star Certificate — Stellar Bright 12W",     type: "PDF", size: "176 KB" },
            { name: "ISI / BIS Certificate (IS 16102:2012)",            type: "PDF", size: "148 KB" },
            { name: "CB Scheme Safety Test Report (IEC 62560)",         type: "PDF", size: "302 KB" },
            { name: "CE & RoHS Declaration of Conformity",              type: "PDF", size: "96 KB"  },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Philips LED Safety Data Sheet",                    type: "PDF", size: "115 KB" },
            { name: "RoHS & REACH Chemical Compliance Statement",       type: "PDF", size: "82 KB"  },
            { name: "E-Waste Collection & Disposal Information",        type: "PDF", size: "90 KB"  },
          ],
        },
      ],
    },
  ],

  /* ── cl-001 · Havells Endura Star LED Panel 18W ──────────────────────── */
  "cl-001": [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — Endura Star Panel 18W",     type: "PDF", size: "245 KB" },
            { name: "Photometric Test Report — IES & LDT Files",        type: "PDF", size: "62 KB"  },
            { name: "UGR (Unified Glare Rating) Calculation Data",      type: "PDF", size: "108 KB" },
            { name: "Driver Specification — Constant Current Output",   type: "PDF", size: "88 KB"  },
          ],
        },
        {
          title: "Dimensional Data",
          docs: [
            { name: "Panel Dimensions & Ceiling Cutout Drawing",         type: "PDF", size: "74 KB"  },
            { name: "Mounting Frame & Backbox Compatibility Guide",      type: "PDF", size: "96 KB"  },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Commercial Installation",
          docs: [
            { name: "Office & Commercial Lighting Design Guide",         type: "PDF", size: "420 KB" },
            { name: "Recessed Panel Installation Manual",                type: "PDF", size: "280 KB" },
            { name: "Spacing Ratio & Illuminance Uniformity Guide",      type: "PDF", size: "175 KB" },
          ],
        },
        {
          title: "Controls & Integration",
          docs: [
            { name: "DALI / 0-10V Dimming Wiring Guide",                 type: "PDF", size: "155 KB" },
            { name: "Emergency Lighting & Maintained Mode Setup",        type: "PDF", size: "192 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Standards Compliance",
          docs: [
            { name: "BIS / ISI Certificate (IS 10322 Part 5)",           type: "PDF", size: "198 KB" },
            { name: "BEE Commercial Lighting Star Rating Certificate",   type: "PDF", size: "174 KB" },
            { name: "IEC 60598-2-2 Recessed Luminaire Safety Report",   type: "PDF", size: "320 KB" },
            { name: "IP44 Ingress Protection Test Report",               type: "PDF", size: "142 KB" },
          ],
        },
        {
          title: "EMC & Quality",
          docs: [
            { name: "EMC Test Report (CISPR 15 / EN 55015)",             type: "PDF", size: "218 KB" },
            { name: "ISO 9001:2015 Manufacturing Quality Certificate",   type: "PDF", size: "140 KB" },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Installation Safety",
          docs: [
            { name: "Electrical Installation Safety Guidelines",         type: "PDF", size: "128 KB" },
            { name: "Thermal Management & Overtemperature Protection",   type: "PDF", size: "105 KB" },
            { name: "E-Waste & End-of-Life Disposal Guidelines",         type: "PDF", size: "88 KB"  },
          ],
        },
      ],
    },
  ],

  /* ── cl-002 · Wipro Garnet Pro LED Downlight 12W ─────────────────────── */
  "cl-002": [
    {
      label: "Technical Data",
      groups: [
        {
          title: "Product Data Sheets",
          docs: [
            { name: "Technical Data Sheet — Wipro Garnet Pro 12W",       type: "PDF", size: "228 KB" },
            { name: "Photometric Data — IES File (LM-63 Format)",        type: "PDF", size: "52 KB"  },
            { name: "Beam Angle Variants — 24° / 36° / 60° Data",        type: "PDF", size: "116 KB" },
          ],
        },
        {
          title: "Mechanical & Optical",
          docs: [
            { name: "Downlight Cutout & Housing Dimensions",             type: "PDF", size: "68 KB"  },
            { name: "Reflector Optics & Luminous Intensity Distribution", type: "PDF", size: "135 KB" },
          ],
        },
      ],
    },
    {
      label: "Application Guides",
      groups: [
        {
          title: "Commercial & Retail",
          docs: [
            { name: "Retail Store & Showroom Lighting Guide",            type: "PDF", size: "385 KB" },
            { name: "Hospitality & Hotel Corridor Application Note",     type: "PDF", size: "268 KB" },
            { name: "Aisle & Task Lighting Layout Calculator Guide",     type: "PDF", size: "148 KB" },
          ],
        },
        {
          title: "Installation",
          docs: [
            { name: "Downlight Installation & Wiring Manual",            type: "PDF", size: "195 KB" },
            { name: "False Ceiling Compatibility & Thermal Clearance",   type: "PDF", size: "122 KB" },
          ],
        },
      ],
    },
    {
      label: "Test Reports & Certifications",
      groups: [
        {
          title: "Standards & Testing",
          docs: [
            { name: "BIS Certificate (IS 10322 Part 5 / Sec 2)",         type: "PDF", size: "185 KB" },
            { name: "BEE Star Rating Certificate — Garnet Pro",          type: "PDF", size: "168 KB" },
            { name: "LM-80 LED Component Lumen Maintenance Report",      type: "PDF", size: "305 KB" },
            { name: "IEC 60598 Safety Compliance Test Report",           type: "PDF", size: "278 KB" },
          ],
        },
        {
          title: "EMC & Environment",
          docs: [
            { name: "CISPR 15 EMC Compliance Certificate",               type: "PDF", size: "205 KB" },
            { name: "RoHS & REACH Declaration of Conformity",            type: "PDF", size: "84 KB"  },
          ],
        },
      ],
    },
    {
      label: "Safety & Handling",
      groups: [
        {
          title: "Safety Data",
          docs: [
            { name: "Electrical Safety & Installer Precautions",         type: "PDF", size: "118 KB" },
            { name: "IP44 Wet Area Installation Guidelines",             type: "PDF", size: "96 KB"  },
            { name: "E-Waste Disposal & Recycling Information",          type: "PDF", size: "88 KB"  },
          ],
        },
      ],
    },
  ],

};

function DocFileIcon({ type }: { type: string }) {
  const colors: Record<string, string> = { PDF: "#ef4444", XLS: "#22c55e", DOC: "#3b82f6", DXF: "#eab308" };
  const c = colors[type] ?? "#9ca3af";
  return (
    <div className="relative shrink-0" style={{ width: 30, height: 34 }}>
      <svg viewBox="0 0 30 34" fill="none" style={{ width: 30, height: 34 }}>
        <path d="M0 2.5 Q0 0 2.5 0 L19 0 L30 10 L30 31.5 Q30 34 27.5 34 L2.5 34 Q0 34 0 31.5 Z" fill="#F1F5F9" />
        <path d="M19 0 L19 10 L30 10 Z" fill="#CBD5E1" />
      </svg>
      <span
        className="absolute bottom-1 left-0 right-0 text-center"
        style={{ fontSize: "0.4rem", fontWeight: 900, color: c, letterSpacing: "0.06em" }}
      >
        {type}
      </span>
    </div>
  );
}

function DocsSection({ productId }: { productId: string }) {
  const tabs = PRODUCT_DOCS[productId];
  if (!tabs?.length) return null;

  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState("");

  function handleDocClick(name: string) {
    setToast(`"${name.length > 48 ? name.slice(0, 48) + "…" : name}" is available on request.`);
    setTimeout(() => setToast(""), 3200);
  }

  const current = tabs[activeTab];
  const colClass = current.groups.length >= 3 ? "md:grid-cols-3" : current.groups.length === 2 ? "md:grid-cols-2" : "";

  return (
    <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#FF6A3D]" />
          <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Documents & Downloads</h2>
        </div>

        {/* Tab bar */}
        <div className="flex items-end gap-0 border-b border-[#E5E7EB] mb-10 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className="px-5 py-3 text-[12px] font-semibold whitespace-nowrap transition-colors uppercase tracking-wide"
              style={{
                color: i === activeTab ? "#0F172A" : "#9CA3AF",
                borderBottom: i === activeTab ? "2px solid #FF6A3D" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={`grid gap-x-16 gap-y-10 ${colClass}`}
          >
            {current.groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.18em] mb-4 pb-2.5 border-b border-[#F3F4F6]">
                  {group.title}
                </h3>
                <div className="space-y-3.5">
                  {group.docs.map((doc, di) => (
                    <button
                      key={di}
                      onClick={() => handleDocClick(doc.name)}
                      className="flex items-center gap-3 group w-full text-left"
                    >
                      <DocFileIcon type={doc.type} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] text-[#3B82F6] group-hover:underline leading-snug block">
                          {doc.name}
                        </span>
                        <span className="text-[10px] text-[#9CA3AF]">{doc.size}</span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#FF6A3D] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="doc-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[100] flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl max-w-xs"
            style={{ background: "#0F172A", color: "white" }}
          >
            <Download className="w-4 h-4 text-[#FF6A3D] shrink-0 mt-0.5" />
            <div>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.4 }}>{toast}</p>
              <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                Contact UltraTech to receive this document.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Combined Product Details + Documents section ────────────────────────────

function CombinedDetailsSection({ data }: { data: InventoryProduct }) {
  const docs = PRODUCT_DOCS[data.id] ?? [];
  const hasAttrs = data.attributeGroups.length > 0;

  // "Technical Data" docs live inline under the first attr tab
  const techDataGroups = docs.find(d => d.label === 'Technical Data')?.groups ?? [];

  type CTab =
    | { kind: 'attrs'; label: string; attrIdx: number }
    | { kind: 'docs';  label: string; groups: DocGroup[] };

  const allTabs: CTab[] = [
    ...(hasAttrs
      ? data.attributeGroups.map((g, i) => ({ kind: 'attrs' as const, label: g.title, attrIdx: i }))
      : techDataGroups.length
        ? [{ kind: 'docs' as const, label: 'Technical Data', groups: techDataGroups }]
        : []),
    ...docs
      .filter(d => d.label !== 'Technical Data')
      .map(d => ({ kind: 'docs' as const, label: d.label, groups: d.groups })),
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState('');

  function handleDocClick(name: string) {
    setToast(`"${name.length > 48 ? name.slice(0, 48) + '…' : name}" is available on request.`);
    setTimeout(() => setToast(''), 3200);
  }

  if (!allTabs.length) return null;
  const cur = allTabs[activeTab];

  return (
    <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#FF6A3D]" />
          <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Product Details</h2>
        </div>

        {/* Unified tab bar */}
        <div className="flex items-end gap-0 border-b border-[#E5E7EB] mb-10 overflow-x-auto no-scrollbar">
          {allTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className="px-5 py-3 text-[12px] font-semibold whitespace-nowrap transition-colors uppercase tracking-wide"
              style={{
                color: i === activeTab ? '#0F172A' : '#9CA3AF',
                borderBottom: i === activeTab ? '2px solid #FF6A3D' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {cur.kind === 'attrs' ? (
              <>
                {/* Spec grid */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-sm">
                  <div className="space-y-10">
                    {data.attributeGroups[cur.attrIdx].sections.map((section) => (
                      <div key={section.name}>
                        <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-[0.14em] mb-6">{section.name}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
                          {section.attributes.map((attr) => (
                            <div key={attr.label} className="space-y-1.5">
                              <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wide block">{attr.label}</span>
                              <span className="text-[15px] text-[#111827] font-medium block">{attr.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Data docs inline in first attr tab */}
                {cur.attrIdx === 0 && techDataGroups.length > 0 && (
                  <div className="mt-10">
                    <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-[0.18em] mb-6">Data Sheets & Downloads</p>
                    <div className={`grid gap-x-16 gap-y-8 ${techDataGroups.length >= 2 ? 'md:grid-cols-2' : ''}`}>
                      {techDataGroups.map(group => (
                        <div key={group.title}>
                          <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.18em] mb-4 pb-2.5 border-b border-[#F3F4F6]">{group.title}</h3>
                          <div className="space-y-3.5">
                            {group.docs.map((doc, di) => (
                              <button key={di} onClick={() => handleDocClick(doc.name)} className="flex items-center gap-3 group w-full text-left">
                                <DocFileIcon type={doc.type} />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[13px] text-[#3B82F6] group-hover:underline leading-snug block">{doc.name}</span>
                                  <span className="text-[10px] text-[#9CA3AF]">{doc.size}</span>
                                </div>
                                <Download className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#FF6A3D] transition-colors shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Doc-only tabs */
              <div className={`grid gap-x-16 gap-y-10 ${cur.groups.length >= 3 ? 'md:grid-cols-3' : cur.groups.length === 2 ? 'md:grid-cols-2' : ''}`}>
                {cur.groups.map(group => (
                  <div key={group.title}>
                    <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.18em] mb-4 pb-2.5 border-b border-[#F3F4F6]">{group.title}</h3>
                    <div className="space-y-3.5">
                      {group.docs.map((doc, di) => (
                        <button key={di} onClick={() => handleDocClick(doc.name)} className="flex items-center gap-3 group w-full text-left">
                          <DocFileIcon type={doc.type} />
                          <div className="flex-1 min-w-0">
                            <span className="text-[13px] text-[#3B82F6] group-hover:underline leading-snug block">{doc.name}</span>
                            <span className="text-[10px] text-[#9CA3AF]">{doc.size}</span>
                          </div>
                          <Download className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#FF6A3D] transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div
              key="combined-toast"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 right-6 z-[100] flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl max-w-xs"
              style={{ background: '#0F172A', color: 'white' }}
            >
              <Download className="w-4 h-4 text-[#FF6A3D] shrink-0 mt-0.5" />
              <div>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.4 }}>{toast}</p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  Available on request from the brand.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── AR / 3D Viewer ──────────────────────────────────────────────────────────

function ARViewerSection({ product }: { product: { name: string; images: string[]; brand: string } }) {
  const [isDark, setIsDark] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [roomPlannerOpen, setRoomPlannerOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [productPos, setProductPos] = useState({ x: 50, y: 50 });
  const [isDraggingProduct, setIsDraggingProduct] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startSpin() {
    if (spinRef.current) return;
    setIsSpinning(true);
    spinRef.current = setInterval(() => setRotation(r => r + 1.2), 16);
  }
  function stopSpin() {
    if (spinRef.current) { clearInterval(spinRef.current); spinRef.current = null; }
    setIsSpinning(false);
  }
  function handleMouseDown(e: React.MouseEvent) { setIsDragging(true); setLastX(e.clientX); stopSpin(); }
  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;
    setRotation(r => r + (e.clientX - lastX) * 0.5);
    setLastX(e.clientX);
  }
  function handleMouseUp() { setIsDragging(false); }
  useEffect(() => () => { if (spinRef.current) clearInterval(spinRef.current); }, []);

  const qrCells = useMemo(() => Array.from({ length: 21 * 21 }, (_, i) => {
    const row = Math.floor(i / 21); const col = i % 21;
    const inFinder = (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7);
    const inTiming = (row === 6 && col > 7 && col < 13) || (col === 6 && row > 7 && row < 13);
    return inFinder || inTiming || (!inFinder && !inTiming && (row * 3 + col * 7 + i * 11) % 5 !== 0);
  }), []);

  const bgColor = isDark ? '#3D3D3D' : '#F0EFED';
  const shadowColor = isDark ? 'rgba(255,184,0,0.35)' : 'rgba(0,0,0,0.22)';

  return (
    <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#FF6A3D]" />
          <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">3D Model & AR Viewer</h2>
        </div>

        {/* IKEA-style side-by-side layout */}
        <div className="flex rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm" style={{ height: 540 }}>

          {/* ── Left: 3D viewer ── */}
          <div
            className="flex-1 relative select-none transition-colors duration-300"
            style={{ background: bgColor, cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Subtle floor shadow */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{ width: 120, height: 16, background: 'rgba(0,0,0,0.10)', borderRadius: '50%', filter: 'blur(10px)' }} />

            {/* 3D model */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div style={{ rotateY: rotation, scale: zoom, transformStyle: 'preserve-3d' }}>
                <div className="relative flex items-center justify-center" style={{ width: 220, height: 300 }}>
                  {isDark && (
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: 'radial-gradient(ellipse at 50% 45%, rgba(255,184,0,0.18) 0%, transparent 65%)',
                    }} />
                  )}
                  <motion.img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-contain w-full h-full"
                    style={{ filter: `drop-shadow(0 24px 32px ${shadowColor}) drop-shadow(0 8px 12px rgba(0,0,0,0.12))` }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Top-right controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5">
              {[
                { icon: ZoomIn,   action: () => setZoom(z => Math.min(z + 0.15, 2.2)) },
                { icon: ZoomOut,  action: () => setZoom(z => Math.max(z - 0.15, 0.4)) },
                { icon: RotateCcw, action: isSpinning ? stopSpin : startSpin, active: isSpinning },
              ].map(({ icon: Icon, action, active }, i) => (
                <button key={i} onClick={action}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: active ? '#FF6A3D' : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)',
                    color: active ? '#fff' : isDark ? '#CBD5E1' : '#475569',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                  }}>
                  <Icon size={14} />
                </button>
              ))}
            </div>

            {/* Bottom-left: light/dark toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              className="absolute bottom-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                backdropFilter: 'blur(4px)',
                color: isDark ? '#F1F5F9' : '#475569',
              }}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Bottom-center: drag hint */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-medium pointer-events-none"
              style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.28)', letterSpacing: '0.03em' }}>
              Drag to rotate
            </p>
          </div>

          {/* Divider */}
          <div className="w-px bg-[#E5E7EB] shrink-0" />

          {/* ── Right: AR panel ── */}
          <div className="bg-white flex flex-col shrink-0 overflow-y-auto" style={{ width: 340 }}>
            {/* Product name header */}
            <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-semibold text-[#0F172A] leading-snug">{product.name}</h3>
              <button className="w-7 h-7 rounded-full border border-[#E5E7EB] flex items-center justify-center shrink-0 text-[#9CA3AF] hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-colors">
                <Info size={13} />
              </button>
            </div>

            {/* Try in a room accordion */}
            <div className="border-b border-[#E5E7EB]">
              <button
                onClick={() => setRoomOpen(o => !o)}
                className="w-full flex items-start justify-between px-6 py-4 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-[#0F172A]">Try {product.name.split(' ').slice(0, 3).join(' ')} in a room</p>
                  <p className="text-[12px] text-[#9CA3AF] mt-0.5">Get ideas in showrooms, design your space, and plan a room in 3D.</p>
                </div>
                <div className="mt-0.5 shrink-0 text-[#9CA3AF]">
                  {roomOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {roomOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          'photo-1555041469-a586c61ea9bc',
                          'photo-1558618666-fcd25c85cd64',
                          'photo-1565814329452-e1efa11c5b89',
                        ].map((id, i) => (
                          <div key={i} className="rounded-lg overflow-hidden bg-[#F1F5F9] aspect-square">
                            <img src={`https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=crop&w=300&h=300&q=80`} className="w-full h-full object-cover" alt="" />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setRoomPlannerOpen(true)}
                        className="w-full h-10 rounded-lg border border-[#E5E7EB] text-[11px] font-bold uppercase tracking-widest text-[#0F172A] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2"
                      >
                        <Smartphone size={13} /> Open Room Planner
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer hint */}
            <div className="px-6 py-4 mt-auto">
              <p className="text-[11px] text-[#CBD5E1] text-center">Powered by WebXR · 3D model updated quarterly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Room Planner Modal */}
      <AnimatePresence>
        {roomPlannerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => { setRoomPlannerOpen(false); setShowQR(false); setProductPos({ x: 50, y: 50 }); }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-white"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
                <div>
                  {showQR ? (
                    <button
                      onClick={() => setShowQR(false)}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                    >
                      <ChevronLeft size={15} /> Back to Room Planner
                    </button>
                  ) : (
                    <>
                      <p className="text-[15px] font-bold text-[#0F172A]">Room Planner</p>
                      <p className="text-[12px] text-[#94A3B8] mt-0.5">Drag the lamp to place it in your room</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => { setRoomPlannerOpen(false); setShowQR(false); setProductPos({ x: 50, y: 50 }); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                >
                  <X size={15} className="text-[#64748B]" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {showQR ? (
                  /* QR view */
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-4 px-6 py-8"
                  >
                    <p className="text-[13px] text-[#64748B] text-center max-w-xs">
                      Scan with your phone camera to view <strong className="text-[#0F172A]">{product.name}</strong> in AR
                    </p>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
                      <svg viewBox="0 0 21 21" width="180" height="180" style={{ imageRendering: 'pixelated', display: 'block' }}>
                        {qrCells.map((filled, i) =>
                          filled ? <rect key={i} x={i % 21} y={Math.floor(i / 21)} width={1} height={1} fill="#0F172A" /> : null
                        )}
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                      <ScanLine size={12} />
                      <span>Works on iOS 15+ &amp; Android 9+</span>
                    </div>
                  </motion.div>
                ) : (
                  /* Room canvas view */
                  <motion.div
                    key="room"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Room type tabs */}
                    <div className="flex gap-2 px-6 pt-4">
                      {['Living Room', 'Dining Room', 'Bedroom'].map((room, i) => (
                        <button
                          key={room}
                          onClick={() => { setActiveRoom(i); setProductPos({ x: 50, y: 50 }); }}
                          className="px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                          style={{
                            background: activeRoom === i ? '#0F172A' : '#F1F5F9',
                            color: activeRoom === i ? 'white' : '#64748B',
                          }}
                        >
                          {room}
                        </button>
                      ))}
                    </div>

                    {/* Draggable room canvas */}
                    <div
                      ref={canvasRef}
                      className="mx-6 mt-4 rounded-2xl overflow-hidden relative select-none"
                      style={{ height: 300, cursor: isDraggingProduct ? 'grabbing' : 'default' }}
                      onMouseMove={e => {
                        if (!isDraggingProduct || !canvasRef.current) return;
                        const rect = canvasRef.current.getBoundingClientRect();
                        setProductPos({
                          x: Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100)),
                          y: Math.max(8, Math.min(92, ((e.clientY - rect.top) / rect.height) * 100)),
                        });
                      }}
                      onMouseUp={() => setIsDraggingProduct(false)}
                      onMouseLeave={() => setIsDraggingProduct(false)}
                    >
                      {[
                        'photo-1555041469-a586c61ea9bc',
                        'photo-1616594039964-ae9021a400a0',
                        'photo-1522771739844-6a9f6d5f14af',
                      ].map((id, i) => (
                        <motion.img
                          key={id}
                          src={`https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=crop&w=800&h=600&q=80`}
                          className="absolute inset-0 w-full h-full object-cover"
                          animate={{ opacity: activeRoom === i ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          alt=""
                        />
                      ))}

                      {/* Draggable product — SVG lamp, no background */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: `${productPos.x}%`,
                          top: `${productPos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5)) drop-shadow(0 3px 6px rgba(0,0,0,0.25))',
                          zIndex: 10,
                        }}
                      >
                        <svg viewBox="0 0 100 190" width="110" height="190" style={{ display: 'block', pointerEvents: 'none' }}>
                          <defs>
                            <radialGradient id="lampCone" cx="50%" cy="10%" r="90%">
                              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
                              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#FFFBEB" />
                              <stop offset="60%" stopColor="#FDE68A" />
                              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
                            </radialGradient>
                            <linearGradient id="shadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#1a1a1a" />
                              <stop offset="35%" stopColor="#3a3a3a" />
                              <stop offset="65%" stopColor="#2a2a2a" />
                              <stop offset="100%" stopColor="#111" />
                            </linearGradient>
                          </defs>
                          {/* Ceiling wire */}
                          <line x1="50" y1="0" x2="50" y2="22" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
                          {/* Canopy */}
                          <rect x="39" y="18" width="22" height="9" rx="4.5" fill="#374151" />
                          {/* Short cord below canopy */}
                          <line x1="50" y1="27" x2="50" y2="42" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Shade — bell shape */}
                          <path d="M44 42 C 40 46, 22 64, 20 90 L 80 90 C 78 64, 60 46, 56 42 Z" fill="url(#shadeGrad)" />
                          {/* Shade outer rim */}
                          <ellipse cx="50" cy="90" rx="30" ry="6" fill="#111827" />
                          {/* Shade inner – lighter to show depth */}
                          <path d="M45 44 C 42 50, 28 66, 26 88 L 74 88 C 72 66, 58 50, 55 44 Z" fill="#374151" opacity="0.5" />
                          {/* Bulb */}
                          <ellipse cx="50" cy="82" rx="10" ry="8" fill="url(#bulbGlow)" />
                          {/* Light cone below shade */}
                          <path d="M20 92 L 4 185 Q 50 192 96 185 L 80 92 Q 50 98 20 92 Z" fill="url(#lampCone)" />
                        </svg>
                        {/* Invisible drag handle covers the whole area */}
                      </div>
                      <div
                        className="absolute"
                        style={{
                          left: `${productPos.x}%`,
                          top: `${productPos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          width: 110,
                          height: 190,
                          cursor: isDraggingProduct ? 'grabbing' : 'grab',
                          zIndex: 11,
                        }}
                        onMouseDown={e => { e.preventDefault(); setIsDraggingProduct(true); }}
                      />

                      {/* Hint */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                        <div className="px-3 py-1 rounded-full text-[10px] font-medium" style={{ background: 'rgba(15,23,42,0.55)', color: 'white', backdropFilter: 'blur(4px)' }}>
                          Drag lamp to reposition
                        </div>
                      </div>
                    </div>

                    {/* Product info + CTA */}
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} className="w-10 h-10 rounded-lg object-cover" alt="" />
                        <div>
                          <p className="text-[13px] font-semibold text-[#0F172A]">{product.name}</p>
                          <p className="text-[11px] text-[#94A3B8]">{product.brand}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowQR(true)}
                        className="px-5 h-9 rounded-xl text-[12px] font-bold text-white flex items-center gap-2 transition-all hover:opacity-90 active:scale-95"
                        style={{ background: '#FF6A3D' }}
                      >
                        <Smartphone size={13} />
                        View on Phone
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  productId?: string;
  onBack?: () => void;
  onViewBrandProfile?: (brandName: string) => void;
}

export function ProductDetailPage({ productId, onBack, onViewBrandProfile }: ProductDetailPageProps) {
  const data = getProductDetail(productId ?? '') ?? productData;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [activeAttributeTab, setActiveAttributeTab] = useState(0);

  // Share
  const [shareOpen, setShareOpen] = useState(false);

  // Quote modal
  const [quoteOpen, setQuoteOpen] = useState(false);

  // Wishlist
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(data.id));
  const [toastVisible, setToastVisible] = useState(false);
  const [toastAdded, setToastAdded] = useState(true);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [pickerProjects, setPickerProjects] = useState<ProjectRef[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showProjectPicker) return;
    function handler(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowProjectPicker(false);
        setToastVisible(true);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showProjectPicker]);

  function toggleWishlist() {
    if (wishlisted) {
      removeFromWishlist(data.id);
      setWishlisted(false);
      setToastAdded(false);
      setShowProjectPicker(false);
      setToastVisible(true);
    } else {
      addToWishlist({
        id: data.id,
        name: data.name,
        brand: data.brand,
        image: data.images[0],
        size: data.sizes[selectedSize],
        color: data.colors[selectedColor],
        finish: data.finishes[selectedFinish],
        addedAt: new Date().toISOString(),
      });
      setWishlisted(true);
      setToastAdded(true);
      const projects = getProjects();
      if (projects.length > 0) {
        setPickerProjects(projects);
        setShowProjectPicker(true);
      } else {
        setToastVisible(true);
      }
    }
  }

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({ title: data.name, text: `${data.name} by ${data.brand}`, url: window.location.href }).catch(() => {});
    } else {
      setShareOpen(v => !v);
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Satoshi']">

      {/* SECTION 1: HERO PRODUCT SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-[60px]">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Left Column: Vertical Thumbnails + Main Image */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto no-scrollbar">
              {data.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden border transition-all ${selectedImage === index ? 'border-[#FF6A3D] shadow-md' : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'}`}
                >
                  <img src={image} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                </button>
              ))}
            </div>

            {/* Main image with share overlay */}
            <div className="flex-1 aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden bg-[#F9FAFB] shadow-md border border-[#E5E7EB] order-1 md:order-2 relative group">
              <motion.img
                key={selectedImage}
                src={data.images[selectedImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />

              {/* Share button */}
              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={handleNativeShare}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  title="Share"
                >
                  <Share2 size={15} className="text-[#0F172A]" />
                </button>
                <AnimatePresence>
                  {shareOpen && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <SharePanel productName={data.name} productBrand={data.brand} onClose={() => setShareOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {selectedImage + 1} / {data.images.length}
              </div>
            </div>
          </div>

          {/* Right Column: Info & Attributes */}
          <div className="lg:col-span-5 space-y-8">
            {onBack && (
              <button onClick={onBack} className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest hover:text-[#FF6A3D] transition-colors flex items-center gap-2">
                <ChevronLeft size={14} /> Back to Products
              </button>
            )}

            <div>
              <h1 className="text-[26px] md:text-[28px] font-medium text-[#0F172A] uppercase tracking-tight mb-1 leading-tight">
                {data.name}
              </h1>
              <button onClick={() => onViewBrandProfile?.(data.brand)} className="text-[15px] text-[#6B7280] hover:text-[#FF6A3D] hover:underline transition-colors">
                by {data.brand}
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-[#364153] uppercase tracking-[0.15em]">Size</p>
                <div className="flex flex-wrap gap-2">
                  {data.sizes.map((size, i) => (
                    <motion.button key={size} onClick={() => setSelectedSize(i)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg border text-[13px] font-medium transition-all ${selectedSize === i ? 'border-[#FF6A3D] bg-[#FFF5F0] text-[#FF6A3D]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'}`}>
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold text-[#364153] uppercase tracking-[0.15em]">Color</p>
                <div className="flex flex-wrap gap-2">
                  {data.colors.map((color, i) => (
                    <motion.button key={color} onClick={() => setSelectedColor(i)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg border text-[13px] font-medium transition-all ${selectedColor === i ? 'border-[#FF6A3D] bg-[#FFF5F0] text-[#FF6A3D]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'}`}>
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold text-[#364153] uppercase tracking-[0.15em]">Finish</p>
                <div className="flex flex-wrap gap-2">
                  {data.finishes.map((finish, i) => (
                    <motion.button key={finish} onClick={() => setSelectedFinish(i)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg border text-[13px] font-medium transition-all ${selectedFinish === i ? 'border-[#FF6A3D] bg-[#FFF5F0] text-[#FF6A3D]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'}`}>
                      {finish}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-[12px] font-bold text-[#364153] uppercase tracking-[0.15em] mb-3">Description</h3>
              <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[420px]">{data.description}</p>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-4">
              <motion.button
                onClick={() => setQuoteOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-12 flex-1 bg-[#FF6A3D] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all shadow-md shadow-[#FF6A3D]/20"
              >
                Request Quote
              </motion.button>
              <div className="relative flex-1" ref={pickerRef}>
                <motion.button
                  onClick={toggleWishlist}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-12 w-full border rounded-lg text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${wishlisted ? 'bg-[#FFF5F0] border-[#FF6A3D] text-[#FF6A3D]' : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#FF6A3D] hover:text-[#FF6A3D]'}`}
                >
                  <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
                  {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </motion.button>

                {/* Project picker dropdown */}
                <AnimatePresence>
                  {showProjectPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-[calc(100%+8px)] right-0 w-72 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] z-50 overflow-hidden"
                      style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.14)' }}
                    >
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-[#F1F5F9]">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#FF6A3D]/10 flex items-center justify-center flex-shrink-0">
                            <Heart size={10} fill="currentColor" className="text-[#FF6A3D]" />
                          </div>
                          <p className="text-[12px] font-semibold text-[#0F172A]">Added to wishlist</p>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 ml-7">Also add to a project?</p>
                      </div>

                      {/* Project list */}
                      <div className="max-h-52 overflow-y-auto py-1">
                        {pickerProjects.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              addItemToProject(p.id, data.id);
                              setShowProjectPicker(false);
                              setToastVisible(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF5F0] transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-[#FF6A3D]/08 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6A3D]/15 transition-colors" style={{ background: 'rgba(255,106,61,0.08)' }}>
                              <Layers size={14} className="text-[#FF6A3D]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[12px] font-semibold text-[#0F172A] truncate">{p.name}</div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {p.type && <span className="text-[10px] text-gray-400">{p.type}</span>}
                                {p.location && (
                                  <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                                    <MapPin size={8} /> {p.location}
                                  </span>
                                )}
                                <span className="text-[10px] text-gray-300">· {p.itemIds.length} item{p.itemIds.length !== 1 ? 's' : ''}</span>
                              </div>
                            </div>
                            <ChevronRight size={13} className="text-gray-300 flex-shrink-0 group-hover:text-[#FF6A3D] transition-colors" />
                          </button>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-2.5 border-t border-[#F1F5F9] flex items-center justify-between">
                        <button
                          onClick={() => { setShowProjectPicker(false); setToastVisible(true); }}
                          className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          Skip
                        </button>
                        <Link
                          to="/wishlist"
                          onClick={() => setShowProjectPicker(false)}
                          className="text-[11px] font-semibold text-[#FF6A3D] flex items-center gap-1 hover:opacity-75 transition-opacity"
                        >
                          New project <ArrowRight size={10} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ATTRIBUTES — combined with docs when PRODUCT_DOCS entry exists */}
      {PRODUCT_DOCS[data.id]
        ? null /* rendered by CombinedDetailsSection below */
        : data.attributeGroups.length > 0 && (
        <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#FF6A3D]" />
              <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Product Details</h2>
            </div>
            {data.attributeGroups.length > 1 && (
              <div className="mb-8 border-b border-[#E5E7EB] overflow-x-auto no-scrollbar">
                <div className="flex gap-6 min-w-max">
                  {data.attributeGroups.map((group, index) => (
                    <button key={group.title} onClick={() => setActiveAttributeTab(index)} className="relative pb-4 transition-colors">
                      <span className={`text-[14px] uppercase tracking-wide transition-all ${activeAttributeTab === index ? 'text-[#0F172A] font-medium' : 'text-[#6B7280] font-normal hover:text-[#4B5563]'}`}>{group.title}</span>
                      {activeAttributeTab === index && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div key={activeAttributeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-sm">
                <div className="space-y-10">
                  {data.attributeGroups[activeAttributeTab].sections.map((section) => (
                    <div key={section.name}>
                      <p className="text-[13px] font-medium text-[#4B5563] uppercase tracking-wide mb-6">{section.name}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
                        {section.attributes.map((attr) => (
                          <div key={attr.label} className="space-y-1.5">
                            <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wide block font-normal">{attr.label}</span>
                            <span className="text-[15px] text-[#111827] font-medium block">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* SECTION 3: FEATURES */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#FF6A3D]" />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Features</h2>
          </div>
          <div className={`grid gap-y-8 gap-x-12 ${data.featureGroups.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
            {data.featureGroups.map((group, groupIndex) => (
              <div key={group.title} className={groupIndex > 0 ? 'pt-8 border-t border-[#E5E7EB]/60 md:border-t-0 md:pt-0' : ''}>
                <h3 className="text-[14px] font-medium text-[#0F172A] mb-3">{group.title}</h3>
                <div className="space-y-2.5">
                  {group.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <div className="mt-[7px] w-1 h-1 rounded-full bg-[#FF6A3D] shrink-0" />
                      <p className="text-[14px] text-[#6B7280] leading-[1.6]">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: APPLICATIONS */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#FF6A3D]" />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Applications</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.applications.map((app) => (
              <div key={app} className="px-5 py-2 bg-[#F3F4F6] text-[#6B7280] rounded-full text-[13px] font-medium border border-transparent transition-colors">{app}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#FF6A3D]" />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 max-w-4xl">
            {data.faqs.map((faq, idx) => <FAQItem key={idx} faq={faq} index={idx} />)}
          </div>
        </div>
      </section>

      {/* SECTION 5b: 3D & AR VIEWER (decorative lighting only) */}
      {data.category === 'decorative-lighting' && (
        <ARViewerSection product={data} />
      )}

      {/* SECTION 5c: Combined Product Details + Documents (products with PRODUCT_DOCS) */}
      {PRODUCT_DOCS[data.id]
        ? <CombinedDetailsSection data={data} />
        : <DocsSection productId={data.id} />
      }

      {/* SECTION 6: MORE FROM THIS BRAND */}
      <section className="py-16 md:py-20 bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#FF6A3D]" />
                <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">More from this Brand</h2>
              </div>
              <p className="text-[#9CA3AF] text-[13px]">Explore other products from {data.brand}.</p>
            </div>
            <button className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline flex items-center gap-2 transition-colors">
              View Brand <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandProducts.map(product => <ProductCard key={product.id} product={product} showBrand={false} brandLogo={data.brandLogo} />)}
          </div>
        </div>
      </section>

      {/* SECTION 7: SIMILAR PRODUCTS */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#FF6A3D]" />
              <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Similar Products</h2>
            </div>
            <p className="text-[#9CA3AF] text-[13px]">Compare similar products across brands.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => <ProductCard key={product.id} product={product} brandLogo={data.brandLogo} />)}
          </div>
        </div>
      </section>

      {/* SECTION 8: STORE NAVIGATOR */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <StoreNavigator stores={KAJARIA_STORES} brandName="Kajaria Ceramics" accentColor="#FF6A3D" />
        </div>
      </section>

      {/* SECTION 9: EXPLORE BRAND PROFILE */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 mb-16">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[28px] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6A3D]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-[0.3em] mb-6">Produced By</h2>
            <h3 className="text-[32px] md:text-[36px] font-medium uppercase tracking-tight mb-6 leading-tight">{data.brand}</h3>
            <p className="text-white/70 text-[16px] leading-[1.7] mb-10">{data.aboutBrand}</p>
            <motion.button
              onClick={() => onViewBrandProfile?.(data.brand)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 h-14 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all flex items-center gap-3 shadow-xl shadow-[#FF6A3D]/20"
            >
              Explore Brand Profile <ExternalLink size={16} />
            </motion.button>
          </div>
          <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl shrink-0">
            <ImageWithFallback src={data.brandLogo} className="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {quoteOpen && (
          <QuoteModal
            size={data.sizes[selectedSize]}
            color={data.colors[selectedColor]}
            finish={data.finishes[selectedFinish]}
            onClose={() => setQuoteOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastVisible && (
          <WishlistToast added={toastAdded} onClose={() => setToastVisible(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
