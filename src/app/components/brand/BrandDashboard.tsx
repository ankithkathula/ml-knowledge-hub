import { useState, useEffect } from 'react';
import { Navigation, Frame26, Frame105, Frame107 } from '../../imports/Frame2147225048';
import { BrandLeadPipeline } from './BrandLeadPipeline';
import {
  LayoutDashboard, TrendingUp, Package, BookOpen,
  Eye, Heart, FileText
} from 'lucide-react';

type Tab = 'overview' | 'leads' | 'products' | 'catalogue';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'overview',  label: 'Overview',      icon: LayoutDashboard },
  { id: 'leads',     label: 'Lead Pipeline', icon: TrendingUp },
  { id: 'products',  label: 'Products',      icon: Package },
  { id: 'catalogue', label: 'Catalogue',     icon: BookOpen },
];

// Summary counts shown in the tab bar for quick context
const LEAD_COUNTS = { cold: 5, warm: 5, hot: 4 };

export default function BrandDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => {
      const available = window.innerWidth - 280 - 48;
      setScale(Math.min(available / 1118, 1));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <div className="bg-white flex items-start relative w-full h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="shrink-0">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">

        {/* Tab bar */}
        <div
          className="flex items-center gap-1 px-5 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(0,0,0,0.07)', background: 'white', minHeight: '52px' }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-4 py-3 text-[13px] font-semibold transition-all"
                style={{ color: active ? '#FF6A3D' : '#737373' }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}

                {/* Lead pipeline badge — quick summary of hot leads */}
                {tab.id === 'leads' && (
                  <div className="flex items-center gap-1 ml-1">
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(100,116,139,0.1)', color: '#64748b' }}>
                      <Eye className="w-2.5 h-2.5" />{LEAD_COUNTS.cold}
                    </span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                      <Heart className="w-2.5 h-2.5" />{LEAD_COUNTS.warm}
                    </span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                      <FileText className="w-2.5 h-2.5" />{LEAD_COUNTS.hot}
                    </span>
                  </div>
                )}

                {/* Active underline */}
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#FF6A3D' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'overview' && (
            <div
              className="p-6"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${100 / scale}%`,
              }}
            >
              <div className="space-y-4">
                <Frame26 />
                <Frame105 />
                <Frame107 />
              </div>
            </div>
          )}

          {activeTab === 'leads' && <BrandLeadPipeline />}

          {activeTab === 'products' && (
            <div className="p-10 flex flex-col items-center justify-center text-center h-full" style={{ color: '#a3a3a3' }}>
              <Package className="w-10 h-10 mb-3" style={{ color: '#e5e5e5' }} />
              <p className="text-[15px] font-semibold text-[#525252]">Product Management</p>
              <p className="text-[13px] mt-1">Manage your product catalogue, variants, and availability.</p>
            </div>
          )}

          {activeTab === 'catalogue' && (
            <div className="p-10 flex flex-col items-center justify-center text-center h-full" style={{ color: '#a3a3a3' }}>
              <BookOpen className="w-10 h-10 mb-3" style={{ color: '#e5e5e5' }} />
              <p className="text-[15px] font-semibold text-[#525252]">Digital Catalogue</p>
              <p className="text-[13px] mt-1">Upload and manage your brand catalogues for designers and architects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
