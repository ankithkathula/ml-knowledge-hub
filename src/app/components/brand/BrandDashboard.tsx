// Import the dashboard components without the header
import { Navigation, Frame106, Frame26, Frame105, Frame107 } from '../../imports/Frame2147225048';
import { useEffect, useState } from 'react';

export default function BrandDashboard() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      // Navigation is 280px, content needs to fit in remaining space
      // Content width is 1118px + padding
      const availableWidth = window.innerWidth - 280 - 48; // 280 for nav, 48 for padding
      const contentWidth = 1118;
      const calculatedScale = Math.min(availableWidth / contentWidth, 1);
      setScale(calculatedScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div className="bg-white flex items-start relative w-full h-screen overflow-hidden">
      {/* Left Sidebar - Fixed width */}
      <div className="shrink-0">
        <Navigation />
      </div>
      
      {/* Main Content - Responsive */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Content wrapper with scroll */}
        <div className="flex-1 overflow-auto">
          <div className="p-6" style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
            width: `${100 / scale}%`
          }}>
            {/* Dashboard content sections */}
            <div className="space-y-4">
              <Frame26 />
              <Frame105 />
              <Frame107 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}