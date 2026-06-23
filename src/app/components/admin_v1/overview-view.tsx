import React from 'react';
import { 
  AlertCircle, 
  Clock, 
  FileWarning, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  History, 
  Layers, 
  Tags, 
  Package, 
  GraduationCap, 
  School, 
  Activity,
  ArrowUpRight,
  Database,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface QueueCardProps {
  label: string;
  count: number;
  icon: any;
  color: string;
  onClick?: () => void;
}

function QueueCard({ label, count, icon: Icon, color, onClick }: QueueCardProps) {
  return (
    <button 
      onClick={onClick}
      className="flex-1 bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all text-left group cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
      </div>
      <div>
        <p className="text-[24px] font-normal text-gray-900 tracking-tight">{count}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">{label}</p>
      </div>
    </button>
  );
}

interface ActionItemProps {
  title: string;
  subtitle: string;
  time: string;
  type: 'verification' | 'follow-up' | 'document' | 'onboarding';
}

function ActionItem({ title, subtitle, time, type }: ActionItemProps) {
  const icons = {
    verification: <ShieldCheck className="w-4 h-4 text-amber-500" />,
    'follow-up': <MessageSquare className="w-4 h-4 text-orange-500" />,
    document: <FileWarning className="w-4 h-4 text-red-500" />,
    onboarding: <Clock className="w-4 h-4 text-blue-500" />
  };

  const bgColors = {
    verification: 'bg-amber-50',
    'follow-up': 'bg-orange-50',
    document: 'bg-red-50',
    onboarding: 'bg-blue-50'
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bgColors[type]}`}>
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] text-gray-900 font-normal truncate uppercase tracking-tight">{title}</h4>
        <p className="text-[12px] text-gray-500 truncate font-normal">{subtitle}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-normal">{time}</span>
        <span className="text-[10px] text-[#FF7A59] uppercase tracking-widest font-normal opacity-0 group-hover:opacity-100 transition-opacity">Review</span>
      </div>
    </div>
  );
}

export function OverviewView() {
  // Mock alerts - only show if exists
  const systemAlerts = [
    { id: 1, message: 'Bulk product import for "Lumina Lighting" failed (45 errors)', type: 'error' },
    { id: 2, message: 'External API Sync issue: Institute data not refreshing', type: 'warning' }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-500 font-['Satoshi'] font-normal max-w-7xl mx-auto">
      
      {/* 1. Verification Queues Snapshot (Operations Hub) */}
      <section className="space-y-4">
        <h3 className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-normal px-1">Verification Queues</h3>
        <div className="flex flex-wrap gap-4">
          <QueueCard 
            label="Pending Verifications" 
            count={14} 
            icon={Clock} 
            color="bg-amber-50 text-amber-600" 
          />
          <QueueCard 
            label="Follow-up Requests" 
            count={8} 
            icon={MessageSquare} 
            color="bg-orange-50 text-orange-600" 
          />
          <QueueCard 
            label="Verified Brands" 
            count={342} 
            icon={CheckCircle2} 
            color="bg-green-50 text-green-600" 
          />
          <QueueCard 
            label="Rejected Brands" 
            count={24} 
            icon={XCircle} 
            color="bg-red-50 text-red-600" 
          />
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-12 gap-10">
        
        {/* Left Column (Col 8) */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          
          {/* Action Required */}
          <section className="space-y-5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[11px] text-gray-900 uppercase tracking-[0.2em] font-normal flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF7A59]" /> Action Required
              </h3>
              <button className="text-[10px] text-[#FF7A59] uppercase tracking-widest hover:underline font-normal">View all tasks</button>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50 shadow-sm">
              <ActionItem 
                title="BuildPro Materials" 
                subtitle="Missing GST certificate and brand authority letter" 
                time="2h ago" 
                type="document" 
              />
              <ActionItem 
                title="EcoStructure Solutions" 
                subtitle="Awaiting response on sustainability certification follow-up" 
                time="5h ago" 
                type="follow-up" 
              />
              <ActionItem 
                title="Solaris Energy" 
                subtitle="New onboarding submission pending initial screening" 
                time="1d ago" 
                type="onboarding" 
              />
              <ActionItem 
                title="Titan Fabrications" 
                subtitle="Verify category mapping for 'Structural Steel'" 
                time="2d ago" 
                type="verification" 
              />
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-5">
            <h3 className="text-[11px] text-gray-900 uppercase tracking-[0.2em] font-normal px-1 flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-gray-400" /> Recent Administrative Activity
            </h3>
            <div className="space-y-1">
              {[
                { action: 'Admin approved brand "TileWorks Global"', time: '12m ago', icon: ShieldCheck, color: 'text-green-500' },
                { action: 'Bulk import completed: 145 items added to "Catalog"', time: '1h ago', icon: Database, color: 'text-blue-500' },
                { action: 'Updated attributes for category "Lifts & Elevators"', time: '3h ago', icon: Tags, color: 'text-orange-500' },
                { action: 'New Institute added: "Global Design School"', time: 'Yesterday', icon: School, color: 'text-indigo-500' },
                { action: 'Attribute "Fire Rating" added to taxonomy', time: 'Yesterday', icon: Plus, color: 'text-gray-400' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 px-2 font-normal hover:bg-gray-50/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-[13px] text-gray-700 font-normal uppercase tracking-tight">{item.action}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">{item.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Grid for Catalog & Academic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Catalog & Taxonomy Operations */}
            <section className="space-y-4">
              <h3 className="text-[11px] text-gray-900 uppercase tracking-[0.2em] font-normal px-1 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-gray-400" /> Catalog & Taxonomy
              </h3>
              <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Recently Updated Categories</span>
                    <span className="text-[10px] text-gray-900 font-normal uppercase">View all</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[12px] text-gray-700 flex items-center justify-between font-normal uppercase tracking-tight">
                      <span>Electricals & Lighting</span>
                      <span className="text-[9px] text-gray-400 uppercase">2h ago</span>
                    </div>
                    <div className="text-[12px] text-gray-700 flex items-center justify-between font-normal uppercase tracking-tight">
                      <span>Flooring & Surfaces</span>
                      <span className="text-[9px] text-gray-400 uppercase">5h ago</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Taxonomy Issues</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-normal uppercase tracking-tight">3 categories missing mandatory attributes</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Academic Operations */}
            <section className="space-y-4">
              <h3 className="text-[11px] text-gray-900 uppercase tracking-[0.2em] font-normal px-1 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-gray-400" /> Academic Ops
              </h3>
              <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Recent Additions</span>
                    <span className="text-[10px] text-gray-900 font-normal uppercase">Manage</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                        <School className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] text-gray-800 font-normal uppercase tracking-tight truncate">National Art Academy</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">Added Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] text-gray-800 font-normal uppercase tracking-tight truncate">Advanced Ceramic Design</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">Added Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-[11px] text-gray-500 font-normal flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    <span>4 Institutes missing contact details</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column (Col 4) */}
        <div className="col-span-12 lg:col-span-4 space-y-10">
          
          {/* Quick Admin Actions */}
          <section className="space-y-4">
            <h3 className="text-[11px] text-gray-900 uppercase tracking-[0.2em] font-normal px-1">Quick Admin Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Add New Category', icon: Plus },
                { label: 'Add New Institute', icon: Plus },
                { label: 'Bulk Import Brands', icon: Database },
                { label: 'Review Onboarding Queue', icon: Activity }
              ].map((action, i) => (
                <button key={i} className="flex items-center justify-between w-full p-4 bg-white border border-gray-100 rounded-xl hover:border-[#FF7A59]/30 hover:bg-orange-50/30 transition-all group cursor-pointer">
                  <span className="text-[12px] text-gray-700 uppercase tracking-widest font-normal group-hover:text-[#FF7A59] transition-colors">{action.label}</span>
                  <action.icon className="w-4 h-4 text-gray-300 group-hover:text-[#FF7A59] transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* Brand Management Shortcuts */}
          <section className="space-y-4">
            <h3 className="text-[11px] text-gray-900 uppercase tracking-[0.2em] font-normal px-1">Brand Shortcuts</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Pending', count: 14 },
                { label: 'Follow-up', count: 8 },
                { label: 'Verified', count: 342 },
                { label: 'Rejected', count: 24 }
              ].map((link, i) => (
                <button key={i} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all text-left group cursor-pointer">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-normal mb-1">{link.label}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] text-gray-900 font-normal tracking-tight">{link.count}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF7A59] transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* System Alerts / Notifications (Conditional) */}
          {systemAlerts.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-[11px] text-red-500 uppercase tracking-[0.2em] font-normal px-1">System Alerts</h3>
              <div className="space-y-3">
                {systemAlerts.map(alert => (
                  <div key={alert.id} className={`p-4 rounded-xl border flex items-start gap-3 ${alert.type === 'error' ? 'bg-red-50/50 border-red-100 text-red-700' : 'bg-amber-50/50 border-amber-100 text-amber-700'}`}>
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-[12px] leading-relaxed font-normal">{alert.message}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Active Sessions / Stats (Optional, keeping it clean) */}
          <div className="pt-6 border-t border-gray-50">
            <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] text-center font-normal italic">
              System Last Sync: Today at 09:42 AM
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
