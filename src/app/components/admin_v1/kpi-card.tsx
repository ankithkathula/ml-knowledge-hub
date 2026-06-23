import { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export const KPICard = forwardRef<HTMLDivElement, KPICardProps>(
  ({ title, value, icon: Icon, trend }, ref) => {
    return (
      <div ref={ref} className="bg-white border border-gray-200 rounded-lg p-6 font-['Satoshi'] font-normal">
        <div className="flex items-start justify-between mb-6 font-normal">
          <Icon className="w-5 h-5 text-gray-400 font-normal" />
          {trend && (
            <span className="text-xs text-gray-500 font-normal">{trend}</span>
          )}
        </div>
        <div className="space-y-1 font-normal">
          <div className="text-3xl font-normal">{value}</div>
          <div className="text-sm text-gray-500 font-normal">{title}</div>
        </div>
      </div>
    );
  }
);

KPICard.displayName = 'KPICard';