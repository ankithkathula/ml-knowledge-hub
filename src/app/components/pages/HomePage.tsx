import { useState } from "react";
import { Link } from "react-router";
import { Search, TrendingUp, Star, ChevronRight, Sparkles } from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { L1_DATA, getChildren } from "../data/hierarchyData";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "popular" | "new">("all");

  const filteredCategories = L1_DATA.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)" }}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-orange-400 blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                India's Comprehensive Construction Material Encyclopedia
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15 }}>
              Material Library
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto" style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
              Navigate from broad categories to specific products across 6 levels of hierarchy. 
              11 top-level categories, 53,000+ subcategories, and 2M+ products from verified brands.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="glass-card rounded-2xl p-1.5">
                <div className="flex items-center gap-3 px-4">
                  <Search className="w-5 h-5" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    placeholder="Search materials, categories, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none py-3.5 text-base"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span style={{ color: "var(--text-secondary)" }}>11 Material Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span style={{ color: "var(--text-secondary)" }}>6-Level Hierarchy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span style={{ color: "var(--text-secondary)" }}>2M+ Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              selectedFilter === "all" ? "glass-card" : "glass-card-subtle"
            }`}
            style={{ 
              color: selectedFilter === "all" ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: selectedFilter === "all" ? 600 : 500
            }}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedFilter("popular")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              selectedFilter === "popular" ? "glass-card" : "glass-card-subtle"
            }`}
            style={{ 
              color: selectedFilter === "popular" ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: selectedFilter === "popular" ? 600 : 500
            }}
          >
            <TrendingUp className="w-4 h-4" />
            Most Popular
          </button>
          <button
            onClick={() => setSelectedFilter("new")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              selectedFilter === "new" ? "glass-card" : "glass-card-subtle"
            }`}
            style={{ 
              color: selectedFilter === "new" ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: selectedFilter === "new" ? 600 : 500
            }}
          >
            <Star className="w-4 h-4" />
            Recently Added
          </button>
        </div>
      </div>

      {/* L1 Categories Grid — Cards Only */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category) => {
            const l2Children = getChildren(category.id);
            return (
              <Link
                key={category.id}
                to={l2Children.length > 0 ? `/layer/${l2Children[0].id}` : `/layer/${category.id}`}
                className="group cursor-pointer relative overflow-hidden rounded-2xl hover-lift transition-all"
                style={{ aspectRatio: "16/10" }}
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay — becomes glass on hover */}
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}95 0%, ${category.color}75 50%, ${category.color}55 100%)`,
                  }}
                />
                {/* Glass frost layer — visible on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.1)",
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <div
                      className="px-3 py-1.5 rounded-lg backdrop-blur-md transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {category.childCount} L2 categories
                      </span>
                    </div>
                    <ChevronRight
                      className="w-6 h-6 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-sm text-white/90 mb-4 line-clamp-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        <span className="text-xs font-medium text-white/90">
                          {category.brandCount} brands
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        <span className="text-xs font-medium text-white/90">
                          L1 → L6 Hierarchy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full glass-card mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8" style={{ color: "var(--text-tertiary)" }} />
            </div>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              No categories found matching your search
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}