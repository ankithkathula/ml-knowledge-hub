import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

type Item = { id: string; name: string; brand: string; image: string; qty: number; price: number; uom: string };

const SEED: Item[] = [
  { id: "1", name: "Ultima Protek Plus 1L", brand: "Asian Paints",  image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&q=80", qty: 2, price: 380, uom: "L" },
  { id: "2", name: "Marine MR-Grade Plywood 19mm", brand: "Greenply", image: "https://images.unsplash.com/photo-1597762470488-3877b1f538c6?w=200&q=80", qty: 1, price: 4200, uom: "sheet" },
  { id: "3", name: "Premium Carrara Marble 18\"x18\"", brand: "RAK Ceramics", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80", qty: 4, price: 1850, uom: "sqft" },
];

export function CartPage() {
  const [items, setItems] = useState(SEED);
  const update = (id: string, delta: number) =>
    setItems(items.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = Math.round(subtotal * 0.18);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl mb-6 flex items-center gap-3" style={{ fontWeight: 700, color: "var(--text-primary)" }}>
          <ShoppingCart className="w-6 h-6" style={{ color: "var(--accent)" }} />
          Your cart <span className="text-sm" style={{ color: "var(--text-muted)", fontWeight: 500 }}>({items.length} items)</span>
        </h1>

        {items.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: "var(--glass)", border: "var(--border-subtle)" }}>
            <ShoppingCart className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Your cart is empty.</p>
            <Link to="/products" className="inline-block px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}>
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: "var(--glass-strong)", border: "var(--border-subtle)" }}
                >
                  <img src={i.image} alt={i.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${i.id}`} className="text-sm hover:underline" style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                      {i.name}
                    </Link>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{i.brand}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 rounded-full px-1 py-0.5" style={{ background: "var(--glass)", border: "var(--border-subtle)" }}>
                        <button onClick={() => update(i.id, -1)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ color: "var(--text-secondary)" }}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs px-1 min-w-[28px] text-center" style={{ color: "var(--text-primary)", fontWeight: 600 }}>{i.qty}</span>
                        <button onClick={() => update(i.id, 1)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ color: "var(--text-secondary)" }}>
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] pr-2" style={{ color: "var(--text-muted)" }}>/{i.uom}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                          ₹{(i.qty * i.price).toLocaleString()}
                        </span>
                        <button onClick={() => remove(i.id)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-2xl p-6 h-fit sticky top-20" style={{ background: "var(--glass-strong)", border: "var(--border)" }}>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.08em" }}>
                Order summary
              </h3>
              <Row label="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
              <Row label="Estimated GST (18%)" value={`₹${tax.toLocaleString()}`} />
              <Row label="Delivery" value="Calculated at checkout" muted />
              <div className="h-px my-4" style={{ background: "var(--border-subtle)" }} />
              <Row label="Estimated total" value={`₹${(subtotal + tax).toLocaleString()}`} bold />
              <button className="w-full mt-5 h-11 flex items-center justify-center gap-2 rounded-lg text-xs uppercase tracking-wider"
                style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}>
                Request quote <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/products" className="block text-center mt-3 text-xs" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Continue browsing
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted }: { label: string; value: string; bold?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span style={{ color: muted ? "var(--text-muted)" : "var(--text-secondary)" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontWeight: bold ? 700 : 500 }}>{value}</span>
    </div>
  );
}
