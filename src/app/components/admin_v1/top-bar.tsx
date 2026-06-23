import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface TopBarProps {
  title?: string;
  subheading?: string;
  showProfile?: boolean;
}

export function TopBar({ 
  title = "ML ADMIN CENTER", 
  subheading = "Overview",
  showProfile = true 
}: TopBarProps) {
  return (
    <div className="bg-white px-8 py-6 flex items-center justify-between font-['Satoshi'] font-normal shrink-0">
      {/* Left Side: Title and Subheading */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 font-normal">
        <h1 className="text-[24px] font-normal text-[#101828] leading-tight uppercase tracking-tight">
          {title}
        </h1>
        <p className="text-[14px] font-normal text-[#667085]">
          {subheading}
        </p>
      </div>
      
      {/* Right Side: Search, Notifications, Profile */}
      <div className="flex items-center gap-6 font-normal">
        {/* Search Bar */}
        <div className="hidden md:flex items-center relative group w-64 lg:w-80">
          <Search className="absolute left-4 w-4 h-4 text-[#98A2B3] group-focus-within:text-[#FF7A59] transition-colors" />
          <input 
            type="text"
            placeholder="Search events, speakers, locations..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] transition-all placeholder:text-[#98A2B3]"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 bg-white border border-[#F2F4F7] rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
          <Bell className="w-5 h-5 text-[#667085]" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF7A59] border-2 border-white rounded-full" />
        </button>
        
        {/* Admin Profile */}
        {showProfile && (
          <button className="flex items-center gap-3 p-1 pl-1 pr-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#F2F4F7]">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F2F4F7] flex items-center justify-center border border-[#F2F4F7]">
              {/* Using a placeholder or the same style as student dashboard */}
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Admin" 
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-[#667085]" />
          </button>
        )}
      </div>
    </div>
  );
}
