import { Link } from 'react-router';
import acc from '../../../assets/brands/acc.svg';
import tataSteel from '../../../assets/brands/tata_steel.svg';
import jsw from '../../../assets/brands/jsw.svg';
import ultratech from '../../../assets/brands/ultratech.svg';
import saintGobain from '../../../assets/brands/saint_gobain.png';
import asianPaints from '../../../assets/brands/asian_paints.svg';
import berger from '../../../assets/brands/berger.svg';
import pidilite from '../../../assets/brands/pidilite.svg';
import ambuja from '../../../assets/brands/ambuja.svg';
import greenply from '../../../assets/brands/greenply.svg';
import kajaria from '../../../assets/brands/kajaria.svg';
import astral from '../../../assets/brands/astral.svg';

const brands = [
  { name: 'ACC Cement',      logo: acc },
  { name: 'Tata Steel',      logo: tataSteel },
  { name: 'JSW Steel',       logo: jsw },
  { name: 'UltraTech Cement',logo: ultratech },
  { name: 'Saint-Gobain',    logo: saintGobain },
  { name: 'Asian Paints',    logo: asianPaints },
  { name: 'Berger Paints',   logo: berger },
  { name: 'Pidilite',        logo: pidilite },
  { name: 'Ambuja Cements',  logo: ambuja },
  { name: 'Greenply',        logo: greenply },
  { name: 'Kajaria Ceramics',logo: kajaria },
  { name: 'Astral',          logo: astral },
];

export function BrandMarquee() {
  return (
    <div className="w-full overflow-hidden py-6">
      <style>{`
        @keyframes brand-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex items-center gap-14 whitespace-nowrap"
        style={{ animation: 'brand-scroll 35s linear infinite', width: 'max-content' }}
      >
        {[...brands, ...brands].map((brand, i) => (
          <Link
            key={i}
            to={`/brand/${encodeURIComponent(brand.name)}`}
            className="flex-shrink-0 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-400"
          >
            <div className="flex items-center justify-center" style={{ width: 110, height: 36 }}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
