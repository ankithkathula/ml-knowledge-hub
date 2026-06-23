import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPincode?: (pincode: string) => void;
  onSelectCity?: (city: string) => void;
}

const cities = [
  { name: 'Bengaluru', icon: '🏛️' },
  { name: 'Chennai', icon: '🏛️' },
  { name: 'Delhi', icon: '🏛️' },
  { name: 'Mumbai', icon: '🏛️' },
  { name: 'Hyderabad', icon: '🏛️' },
  { name: 'Ahmedabad', icon: '🏛️' },
];

export function PincodeModal({ isOpen, onClose, onApplyPincode, onSelectCity }: PincodeModalProps) {
  const [pincode, setPincode] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [inputMode, setInputMode] = useState<'pincode' | 'location'>('pincode');

  const handleApply = () => {
    if (inputMode === 'pincode' && pincode.length === 6) {
      onApplyPincode?.(pincode);
      onClose();
    } else if (inputMode === 'location' && locationName.trim().length > 0) {
      onApplyPincode?.(locationName);
      onClose();
    }
  };

  const handleCurrentLocation = () => {
    setIsDetecting(true);
    setLocationError('');
    
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by your browser');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location:', position.coords);
        setTimeout(() => {
          setPincode('560001');
          setIsDetecting(false);
        }, 1000);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        if (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred while getting your location.';
          }
        }
        setLocationError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleCityClick = (city: string) => {
    onSelectCity?.(city);
    onClose();
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-[101] overflow-hidden font-['Satoshi']"
          >
            <div className="flex items-center justify-between p-8 pb-4">
              <h2 className="text-2xl font-normal text-[#0F172A] dark:text-white uppercase tracking-tight">
                Delivery Pincode
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex gap-2 p-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl">
                {['pincode', 'location'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setInputMode(mode as any)}
                    className={`flex-1 py-3 px-4 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
                      inputMode === mode
                        ? 'bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white shadow-sm'
                        : 'text-gray-400 hover:text-[#0F172A]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMode === 'pincode' ? pincode : locationName}
                  onChange={(e) => inputMode === 'pincode' ? handlePincodeChange(e) : setLocationName(e.target.value)}
                  placeholder={inputMode === 'pincode' ? "Enter 6-digit Pincode" : "Enter City or Area"}
                  className="flex-1 h-14 px-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:border-[#FF6A3D] outline-none text-[#0F172A] dark:text-white"
                />
                <button
                  onClick={handleApply}
                  className="px-8 h-14 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all shadow-lg shadow-[#FF6A3D]/20"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={handleCurrentLocation}
                disabled={isDetecting}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-[#FF6A3D]/5 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-sm group-hover:bg-[#FF6A3D] transition-colors duration-500">
                  <Navigation className={`w-5 h-5 text-[#FF6A3D] group-hover:text-white ${isDetecting ? 'animate-pulse' : ''}`} />
                </div>
                <div className="text-left">
                  <p className="text-[#0F172A] dark:text-white font-medium">{isDetecting ? 'Detecting...' : 'Use Current Location'}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Auto-detect via GPS</p>
                </div>
              </button>

              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Popular Cities</h3>
                <div className="grid grid-cols-3 gap-3">
                  {cities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleCityClick(city.name)}
                      className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-[#FF6A3D] transition-all group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-xl group-hover:bg-[#FF6A3D]/5">
                        <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#FF6A3D] transition-colors" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{city.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
