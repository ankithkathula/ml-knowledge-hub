import { forwardRef } from 'react';

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'verified' | 'new' | 'attention' | 'rejected';
  children: React.ReactNode;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, children }, ref) => {
    const styles = {
      active: 'bg-gray-100 text-gray-700',
      pending: 'bg-amber-50 text-amber-700',
      verified: 'bg-green-50 text-green-700',
      new: 'bg-[#FF7A59]/10 text-[#FF7A59]',
      attention: 'bg-[#FF7A59]/10 text-[#FF7A59]',
      rejected: 'bg-red-50 text-red-700',
    };

    return (
      <span ref={ref} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${styles[status]}`}>
        {children}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';