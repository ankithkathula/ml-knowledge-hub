import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface StickyPageNavProps {
  sections: Section[];
}

export function StickyPageNav({ sections }: StickyPageNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 140; // Height of sticky header + mobile nav (64px header + 70px sticky nav)
      const elementPosition = section.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Immediately update active state for instant visual feedback
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {/* Desktop Version - Vertical Pill Buttons */}
      <div className="hidden xl:block sticky top-[120px] self-start w-[130px] ml-6 z-20">
        <div className="relative">
          {/* Subtle Vertical Connector Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[1px] bg-gray-100" />

          {/* Navigation Pills */}
          <div className="relative flex flex-col gap-3">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF6A3D] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Version - Horizontal Sticky Tabs */}
      <div className="xl:hidden sticky top-16 md:top-20 z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-100 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#FF6A3D] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-95'
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}