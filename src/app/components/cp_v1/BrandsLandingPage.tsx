import { motion } from 'motion/react';
import { ArrowRight, Package, Award, TrendingUp, MessageSquare, Image as ImageIcon, BarChart3, ChevronRight } from 'lucide-react';
import { MainFooter } from './MainFooter';

interface BrandsLandingPageProps {
  onNavigate?: (page: string) => void;
}

export function BrandsLandingPage({ onNavigate }: BrandsLandingPageProps) {
  const capabilities = [
    {
      icon: <Package className="w-5 h-5" />,
      title: "Manage Product Catalog",
      desc: "Showcase your entire range with detailed specifications and imagery"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Showcase Certifications",
      desc: "Display ISO, LEED, and industry certifications to build trust"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Track Product Engagement",
      desc: "Monitor views, downloads, and specification requests in real-time"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Receive Direct Inquiries",
      desc: "Connect directly with architects and designers who specify your products"
    },
    {
      icon: <ImageIcon className="w-5 h-5" />,
      title: "Highlight Projects",
      desc: "Feature case studies and successful installations"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Access Brand Analytics",
      desc: "Understand your audience and optimize your profile performance"
    }
  ];

  const howItWorksSteps = [
    { number: 1, title: "Create Profile", desc: "Set up your brand presence with logo and company details" },
    { number: 2, title: "Add Products", desc: "Upload catalog with specs, images, and certifications" },
    { number: 3, title: "Get Discovered", desc: "Appear in searches by architects and studios" },
    { number: 4, title: "Grow Business", desc: "Convert inquiries into specifications and projects" }
  ];

  const benefits = [
    "Direct access to India's top architects and interior designers",
    "Verified platform ensures quality connections",
    "Real-time analytics on product performance",
    "Enhanced brand visibility through featured listings",
    "Streamlined inquiry management system",
    "Priority support for brand partners"
  ];

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif]">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-wider">
          <button onClick={() => onNavigate?.('home')} className="hover:text-[#FF6A3D] transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900">Ecosystem</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#FF6A3D]">Brands</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6 leading-[1.1]">
              Grow Your Brand in India's Construction Ecosystem
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Showcase your products, certifications, and projects. Connect with architects and studios actively specifying materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate?.('signup')}
                className="px-8 py-4 bg-[#FF6A3D] text-white rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-[#ff5a2d] transition-colors flex items-center justify-center gap-2"
              >
                Create Brand Profile <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate?.('signin')}
                className="px-8 py-4 border-2 border-gray-200 text-gray-900 rounded-lg font-medium text-sm uppercase tracking-wider hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-colors"
              >
                Explore Brand Dashboard
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 flex items-center justify-center"
          >
            <div className="text-center text-gray-400">
              <Package className="w-20 h-20 mx-auto mb-4 opacity-20" />
              <p className="text-sm uppercase tracking-wider">Brand Dashboard Preview</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4">
              What You Can Do on Material Library
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive suite of tools to manage your brand presence and connect with the right audience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#FF6A3D]/20 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#FF6A3D]/5 rounded-lg flex items-center justify-center text-[#FF6A3D] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Tools / Dashboard Preview */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center"
          >
            <div className="text-center text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-xs uppercase tracking-wider">Analytics Dashboard</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-normal tracking-tight mb-6">
              Powerful Brand Management Tools
            </h2>
            <div className="space-y-4">
              {[
                "Unified dashboard for all brand activities",
                "Product performance metrics and insights",
                "Inquiry tracking and lead management",
                "Real-time notification system",
                "Multi-user team access controls",
                "Export reports for internal analysis"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF6A3D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF6A3D]" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Get started in four simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-0" style={{ width: '75%', left: '12.5%' }} />
            
            {howItWorksSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white border-4 border-[#FF6A3D] rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-2xl font-bold text-[#FF6A3D]">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-normal tracking-tight mb-12 text-center"
          >
            Why Brands Choose Material Library
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <ArrowRight className="w-5 h-5 text-[#FF6A3D] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Metrics Section */}
      <section className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4">
              Trusted by the Industry
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Brands" },
              { value: "10,000+", label: "Products" },
              { value: "2,000+", label: "Professionals" },
              { value: "50+", label: "Cities" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#FF6A3D] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 md:px-8 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-normal tracking-tight mb-6 text-white"
          >
            Ready to Join the Ecosystem?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Start connecting with India's top architects and designers today
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => onNavigate?.('signup')}
              className="px-8 py-4 bg-[#FF6A3D] text-white rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-[#ff5a2d] transition-colors"
            >
              Create Your Profile
            </button>
            <button 
              className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-medium text-sm uppercase tracking-wider hover:border-white/40 transition-colors"
            >
              Contact Our Team
            </button>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
