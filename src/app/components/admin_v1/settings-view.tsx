import { FolderTree, Upload, AlertCircle, Package2 } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="p-8 font-['Satoshi'] font-normal">
      <div className="max-w-5xl mx-auto space-y-10 font-normal">
        <div className="font-normal">
          <h2 className="text-gray-900 font-normal">Settings</h2>
          <p className="text-sm text-gray-500 mt-2 font-normal">Manage system configuration and preferences</p>
        </div>

        {/* System Status */}
        <div className="space-y-4 font-normal">
          <h3 className="text-gray-900 font-normal uppercase tracking-widest text-xs">System Status</h3>
          
          <div className="grid grid-cols-2 gap-4 font-normal">
            <div className="p-5 bg-white border border-gray-200 rounded-lg font-normal shadow-sm">
              <div className="text-xs text-gray-500 mb-2 font-normal uppercase tracking-tighter">API Status</div>
              <div className="text-gray-900 font-normal">Operational</div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-lg font-normal shadow-sm">
              <div className="text-xs text-gray-500 mb-2 font-normal uppercase tracking-tighter">Database</div>
              <div className="text-gray-900 font-normal">Connected</div>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="space-y-6 font-normal">
          <h3 className="text-gray-900 font-normal uppercase tracking-widest text-xs">General Settings</h3>
          
          <div className="font-normal">
            <label className="block text-xs font-normal text-gray-500 mb-2 uppercase tracking-tighter">Organization Name</label>
            <input
              type="text"
              defaultValue="ML Commerce Platform"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF7A59] focus:border-transparent font-normal"
            />
          </div>

          <div className="font-normal">
            <label className="block text-xs font-normal text-gray-500 mb-2 uppercase tracking-tighter">Admin Email</label>
            <input
              type="email"
              defaultValue="admin@mlcommerce.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF7A59] focus:border-transparent font-normal"
            />
          </div>

          <div className="font-normal">
            <label className="block text-xs font-normal text-gray-500 mb-2 uppercase tracking-tighter">Time Zone</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF7A59] focus:border-transparent font-normal">
              <option>UTC (GMT+0)</option>
              <option>EST (GMT-5)</option>
              <option>PST (GMT-8)</option>
            </select>
          </div>
        </div>

        {/* Empty States Configuration */}
        <div className="space-y-6 font-normal">
          <div className="font-normal">
            <h3 className="text-gray-900 font-normal uppercase tracking-widest text-xs">Empty & Error States</h3>
            <p className="text-sm text-gray-500 mt-2 font-normal">Preview of system messages and empty state designs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-normal">
            {[
              { icon: FolderTree, title: 'No Categories', message: 'Start organizing products by creating your first category', cta: 'Create Category' },
              { icon: Upload, title: 'Import Failed', message: 'The import encountered errors. Please check your file format.', cta: 'Try Again' },
              { icon: AlertCircle, title: 'Duplicate Taxonomy', message: 'This category name already exists in the system', cta: 'Choose Different Name' },
              { icon: Package2, title: 'No Pending Requests', message: 'All brand verification requests have been processed', cta: 'View All Brands' },
            ].map((state, i) => {
              const Icon = state.icon;
              return (
                <div key={i} className="p-8 border border-gray-200 rounded-lg bg-gray-50 text-center font-normal">
                  <div className="flex justify-center mb-4 font-normal">
                    <Icon className="w-8 h-8 text-gray-300 font-normal" />
                  </div>
                  <div className="text-gray-900 mb-2 font-normal uppercase tracking-tight">{state.title}</div>
                  <div className="text-sm text-gray-500 mb-4 font-normal">{state.message}</div>
                  <button className="px-4 py-2 bg-[#FF7A59] text-white text-sm rounded-lg hover:bg-[#FF7A59]/90 transition-colors font-normal uppercase tracking-widest">
                    {state.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 font-normal">
          <button className="px-6 py-2.5 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors font-normal uppercase tracking-widest text-xs shadow-md">
            Save Changes
          </button>
          <button className="px-6 py-2.5 text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-normal uppercase tracking-widest text-xs bg-white">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
