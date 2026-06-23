import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from 'figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png';

export function Footer() {
  const footerLinks = {
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Resources: ['Help Center', 'Community', 'Guides', 'Partners'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
    Products: ['Brands', 'Designers', 'Studios', 'Students'],
  };

  return (
    <footer className="bg-white border-t border-gray-100 font-['Satoshi']">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="sm:col-span-2">
            <img src={logoImage} alt="Material Library" className="h-8 w-auto mb-8" />
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              India's first digital ecosystem transforming the construction industry by connecting materials, brands, and professionals.
            </p>
            
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#FF6A3D] hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.2em] mb-6">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-gray-500 hover:text-[#FF6A3D] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF6A3D]/10 flex items-center justify-center text-[#FF6A3D] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:contact@materiallibrary.in" className="text-sm font-medium text-[#0F172A] hover:text-[#FF6A3D]">contact@materiallibrary.in</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF6A3D]/10 flex items-center justify-center text-[#FF6A3D] shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                <a href="tel:+911234567890" className="text-sm font-medium text-[#0F172A] hover:text-[#FF6A3D]">+91 123 456 7890</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF6A3D]/10 flex items-center justify-center text-[#FF6A3D] shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">HQ</p>
                <p className="text-sm font-medium text-[#0F172A]">Mumbai, MH, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[12px] text-gray-400">© 2026 Material Library. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {['Privacy', 'Terms', 'Cookies'].map(link => (
              <a key={link} href="#" className="text-[12px] text-gray-400 hover:text-[#0F172A] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
