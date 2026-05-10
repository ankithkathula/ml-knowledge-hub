import { useState } from "react";
import {
  Upload, Download, FileText, CheckCircle, XCircle, Clock,
  AlertCircle, Database, Network, Package, Building2,
  Users, Newspaper, BarChart3, ArrowRight, Zap, RefreshCw,
  Trash2, Eye
} from "lucide-react";

type DataType = "taxonomy" | "products" | "brands" | "news" | "consultants" | "market_data" | "blog_content";

interface ImportTemplate {
  type: DataType;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
  columns: string[];
  sampleFile: string;
}

const TEMPLATES: ImportTemplate[] = [
  { type: "taxonomy", label: "Taxonomy Categories (L1-L5)", icon: Network, color: "#2a9d8f", description: "Import hierarchy categories across all 5 layers", columns: ["ID", "Name", "Description", "Icon", "Image URL", "Parent ID", "Level (1-5)", "Color", "Brand Count"], sampleFile: "taxonomy_template.csv" },
  { type: "products", label: "Products (L6)", icon: Package, color: "#ff6a3d", description: "Import products tied to L5 categories and brands", columns: ["Name", "Brand ID", "L5 Category ID", "Price", "Rating", "In Stock", "Specs JSON", "Image URL", "Description"], sampleFile: "products_template.csv" },
  { type: "brands", label: "Brands & Profiles", icon: Building2, color: "#3b82f6", description: "Import brand profiles with category mappings", columns: ["Name", "Tagline", "City", "Region", "Tier", "Accent Color", "Category IDs", "Cover Image", "Website"], sampleFile: "brands_template.csv" },
  { type: "news", label: "Industry News", icon: Newspaper, color: "#f59e0b", description: "Import news articles with tags and categories", columns: ["Title", "Summary", "Source", "Source URL", "Date", "Tags", "Category IDs", "Image URL"], sampleFile: "news_template.csv" },
  { type: "consultants", label: "Consultants & Experts", icon: Users, color: "#a855f7", description: "Import consultant profiles with tag relevance", columns: ["Name", "Title", "Email", "Phone", "City", "Region", "Specializations", "Category IDs", "Layer Visibility", "Bio"], sampleFile: "consultants_template.csv" },
  { type: "market_data", label: "Market Data & Metrics", icon: BarChart3, color: "#10b981", description: "Import market statistics and pricing data", columns: ["Metric", "Value", "Unit", "Category", "Region", "Period", "Source", "Trend", "Change %"], sampleFile: "market_data_template.csv" },
  { type: "blog_content", label: "Blog Articles", icon: FileText, color: "#ec4899", description: "Import blog/wiki content tied to categories", columns: ["Title", "Author", "Category", "Tags", "Content (HTML/Markdown)", "Featured Image", "Status", "Publish Date"], sampleFile: "blog_content_template.csv" },
];

interface ImportHistory {
  id: string;
  type: DataType;
  filename: string;
  records: number;
  successful: number;
  failed: number;
  status: "completed" | "processing" | "failed" | "queued";
  timestamp: string;
  duration: string;
}

const IMPORT_HISTORY: ImportHistory[] = [
  { id: "i1", type: "taxonomy", filename: "L3_categories_batch_march.csv", records: 245, successful: 243, failed: 2, status: "completed", timestamp: "2026-03-30 10:30 AM", duration: "12s" },
  { id: "i2", type: "brands", filename: "brands_west_india.xlsx", records: 128, successful: 128, failed: 0, status: "completed", timestamp: "2026-03-30 09:15 AM", duration: "8s" },
  { id: "i3", type: "products", filename: "products_mep_systems.csv", records: 1840, successful: 0, failed: 0, status: "processing", timestamp: "2026-03-30 08:00 AM", duration: "..." },
  { id: "i4", type: "consultants", filename: "consultant_profiles.csv", records: 45, successful: 0, failed: 45, status: "failed", timestamp: "2026-03-29 04:30 PM", duration: "3s" },
  { id: "i5", type: "market_data", filename: "market_metrics_q1_2026.xlsx", records: 320, successful: 318, failed: 2, status: "completed", timestamp: "2026-03-29 02:00 PM", duration: "5s" },
  { id: "i6", type: "news", filename: "industry_news_march.csv", records: 180, successful: 180, failed: 0, status: "completed", timestamp: "2026-03-28 11:00 AM", duration: "4s" },
  { id: "i7", type: "taxonomy", filename: "L4_product_types_structural.csv", records: 890, successful: 885, failed: 5, status: "completed", timestamp: "2026-03-27 03:45 PM", duration: "18s" },
];

export function BulkImportPage() {
  const [selectedType, setSelectedType] = useState<DataType | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"import" | "history">("import");

  const selectedTemplate = TEMPLATES.find((t) => t.type === selectedType);

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Bulk Import Tool</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
          Universal bulk import for all data types — taxonomy, products, brands, content, and more
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(0,0,0,0.04)" }}>
        <button
          className="px-6 py-2.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: activeTab === "import" ? "white" : "transparent", color: activeTab === "import" ? "#ff6a3d" : "var(--text-muted)", boxShadow: activeTab === "import" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
          onClick={() => setActiveTab("import")}
        >
          <Upload className="w-3.5 h-3.5 inline mr-1.5" /> New Import
        </button>
        <button
          className="px-6 py-2.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: activeTab === "history" ? "white" : "transparent", color: activeTab === "history" ? "#ff6a3d" : "var(--text-muted)", boxShadow: activeTab === "history" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
          onClick={() => setActiveTab("history")}
        >
          <Clock className="w-3.5 h-3.5 inline mr-1.5" /> Import History
        </button>
      </div>

      {activeTab === "import" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: Select Data Type */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#ff6a3d" }}>1</div>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Select Data Type</span>
            </div>
            <div className="space-y-2">
              {TEMPLATES.map((t) => {
                const Icon = t.icon;
                const isSelected = selectedType === t.type;
                return (
                  <button
                    key={t.type}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{
                      background: isSelected ? `${t.color}10` : "rgba(255,255,255,0.8)",
                      border: isSelected ? `2px solid ${t.color}40` : "1px solid rgba(0,0,0,0.06)",
                    }}
                    onClick={() => { setSelectedType(t.type); setUploadedFile(null); }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${t.color}15` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: t.color, width: 18, height: 18 }} />
                    </div>
                    <div className="min-w-0">
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: isSelected ? t.color : "var(--text-primary)" }}>{t.label}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{t.description}</div>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: t.color }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 & 3 */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="space-y-6">
                {/* Step 2: Review Columns */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#ff6a3d" }}>2</div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Review Required Columns</span>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: `${selectedTemplate.color}06`, border: `1px solid ${selectedTemplate.color}15` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: selectedTemplate.color }}>
                        {selectedTemplate.label} — {selectedTemplate.columns.length} columns
                      </span>
                      <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#ff6a3d" }}>
                        <Download className="w-3 h-3" /> Download Template
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedTemplate.columns.map((col, i) => (
                        <div key={col} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.7)" }}>
                          <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-white" style={{ background: selectedTemplate.color, fontSize: "0.6rem" }}>{i + 1}</span>
                          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-primary)" }}>{col}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Upload */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#ff6a3d" }}>3</div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Upload File</span>
                  </div>
                  <div
                    className="border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer"
                    style={{ borderColor: uploadedFile ? "#10b981" : "rgba(0,0,0,0.12)", background: uploadedFile ? "rgba(34,197,94,0.04)" : "transparent" }}
                    onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#ff6a3d"; (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.04)"; }}
                    onDragLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    onDrop={(e) => { e.preventDefault(); setUploadedFile("imported_file.csv"); }}
                    onClick={() => setUploadedFile("imported_file.csv")}
                  >
                    {uploadedFile ? (
                      <>
                        <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "#10b981" }} />
                        <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#10b981" }}>File ready: {uploadedFile}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Click to change file</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 mx-auto mb-3" style={{ color: selectedTemplate.color }} />
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          Drop your CSV or XLSX file here
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>or click to browse &middot; Max 50MB</p>
                      </>
                    )}
                  </div>

                  {/* Import Options */}
                  {uploadedFile && (
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
                        <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>Import Options</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="radio" name="mode" defaultChecked className="text-orange-500" />
                            <div>
                              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Append — Add new records only</span>
                              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Skip duplicates based on ID</p>
                            </div>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="radio" name="mode" className="text-orange-500" />
                            <div>
                              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Upsert — Update existing, add new</span>
                              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Match by ID, update changed fields</p>
                            </div>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="radio" name="mode" className="text-orange-500" />
                            <div>
                              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Replace — Clear & reimport all</span>
                              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Replace all records of this type</p>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                          style={{ background: "#ff6a3d" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e8522a")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#ff6a3d")}
                        >
                          <Zap className="w-4 h-4" /> Start Import
                        </button>
                        <button
                          className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                          style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
                          onClick={() => setUploadedFile(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <Database className="w-16 h-16 mb-4" style={{ color: "var(--text-muted)", opacity: 0.3 }} />
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-secondary)" }}>Select a data type to begin</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>Choose what kind of data you want to import</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Import History Tab */}
      {activeTab === "history" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {["Type", "File", "Records", "Success", "Failed", "Status", "Time", "Duration", "Actions"].map((h) => (
                    <th key={h} className={`${h === "Actions" ? "text-right" : "text-left"} px-4 py-3`} style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {IMPORT_HISTORY.map((imp) => {
                  const template = TEMPLATES.find((t) => t.type === imp.type);
                  const Icon = template?.icon || FileText;
                  return (
                    <tr key={imp.id} className="transition-all" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" style={{ color: template?.color }} />
                          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: template?.color }}>{template?.label.split("(")[0]?.trim()}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span style={{ fontSize: "0.8rem", color: "var(--text-primary)" }}>{imp.filename}</span></td>
                      <td className="px-4 py-3"><span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{imp.records.toLocaleString()}</span></td>
                      <td className="px-4 py-3"><span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#10b981" }}>{imp.successful.toLocaleString()}</span></td>
                      <td className="px-4 py-3"><span style={{ fontSize: "0.8rem", fontWeight: 600, color: imp.failed > 0 ? "#ef4444" : "var(--text-muted)" }}>{imp.failed}</span></td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs font-semibold" style={{
                          color: imp.status === "completed" ? "#10b981" : imp.status === "processing" ? "#3b82f6" : imp.status === "failed" ? "#ef4444" : "#f59e0b",
                        }}>
                          {imp.status === "completed" && <CheckCircle className="w-3 h-3" />}
                          {imp.status === "processing" && <RefreshCw className="w-3 h-3 animate-spin" />}
                          {imp.status === "failed" && <XCircle className="w-3 h-3" />}
                          {imp.status === "queued" && <Clock className="w-3 h-3" />}
                          {imp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3"><span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{imp.timestamp}</span></td>
                      <td className="px-4 py-3"><span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{imp.duration}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                          ><Eye className="w-3.5 h-3.5" /></button>
                          {imp.status === "failed" && (
                            <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ff6a3d"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                            ><RefreshCw className="w-3.5 h-3.5" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
