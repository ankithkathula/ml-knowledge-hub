import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  X, 
  FileText, 
  Link as LinkIcon, 
  CheckCircle2,
  AlertCircle,
  Camera,
  User,
  Smartphone
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "PG",
  "Extended / Other"
];

const interestAreas = [
  "Architecture",
  "Interior Design",
  "Construction & Materials",
  "Sustainable Design",
  "Research & Innovation"
];

const engagementOptions = [
  { id: 'resources', label: "Learning resources & knowledge center" },
  { id: 'jobs', label: "Jobs, internships & off-campus placements" },
  { id: 'collabs', label: "Brand collaborations & live projects" },
  { id: 'workshops', label: "Workshops & events" }
];

const carouselImages = [
  "https://images.unsplash.com/photo-1767410913191-8c8bfee3f0dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2ODIwNDQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1746343365909-c6b3ce17c462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzY2hvb2wlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY4MjA0NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1760662939135-d13f04cc3a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbiUyMHN0dWRlbnQlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY4MjA0NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1628147529780-36964fbb8d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlbmdpbmVlcmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc2ODIwNDQ5NHww&ixlib=rb-4.1.0&q=80&w=1080"
];

interface StudentSignUpProps {
  onSubmitSuccess?: () => void;
  onBack?: () => void;
}

interface FileData {
  file: File;
  preview: string;
}

export default function StudentSignUp({ onSubmitSuccess, onBack }: StudentSignUpProps) {
  const [step, setStep] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    profileImage: null as FileData | null,
    fullName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    isSameAsPhone: false,
    collegeName: '',
    course: '',
    yearOfStudy: '',
    notes: '',
    cvFile: null as FileData | null,
    studentIdFile: null as FileData | null,
    portfolioFile: null as FileData | null,
    portfolioLink: '',
    whyJoin: '',
    interests: [] as string[],
    engagements: [] as string[]
  });

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => {
    if (step === 1) {
      if (onBack) onBack();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    if (onSubmitSuccess) onSubmitSuccess();
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSameAsPhone = () => {
    const newValue = !formData.isSameAsPhone;
    setFormData(prev => ({
      ...prev,
      isSameAsPhone: newValue,
      whatsappNumber: newValue ? prev.phoneNumber : prev.whatsappNumber
    }));
  };

  const ProfileImageUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateFormData('profileImage', { file, preview: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="flex flex-col items-center gap-3 mb-8">
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          className={`relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center transition-all overflow-hidden cursor-pointer group ${
            isDragging ? 'border-[#FF6A3D] bg-[#FF6A3D]/5' : 'border-gray-200 hover:border-[#FF6A3D]/50'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          {formData.profileImage ? (
            <img src={formData.profileImage.preview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-gray-400 group-hover:text-[#FF6A3D]">
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase">Upload</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <input 
            ref={inputRef}
            type="file" 
            accept="image/*" 
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden" 
          />
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Profile Picture (Optional)</p>
      </div>
    );
  };

  const FileUpload = ({ 
    label, 
    id, 
    accept, 
    value, 
    onChange, 
    helperText 
  }: { 
    label: string, 
    id: string, 
    accept: string, 
    value: FileData | null, 
    onChange: (data: FileData | null) => void,
    helperText?: string
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ file, preview: reader.result as string });
      };
      reader.readAsDataURL(file);
    };

    return (
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">
          {label}
        </label>
        
        {!value ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={`relative h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
              isDragging ? 'border-[#FF6A3D] bg-[#FF6A3D]/5' : 'border-gray-200 hover:border-[#FF6A3D]/50 bg-gray-50/50'
            }`}
          >
            <input 
              ref={inputRef}
              type="file" 
              accept={accept} 
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden" 
            />
            <div className="p-2.5 bg-white rounded-full shadow-sm">
              <Upload className="w-5 h-5 text-[#FF6A3D]" />
            </div>
            <div className="text-center">
              <p className="text-sm text-[#101828]">Click to upload or drag and drop</p>
              <p className="text-xs text-[#667085] mt-1">{helperText || "PNG, JPG or PDF (max 5MB)"}</p>
            </div>
          </div>
        ) : (
          <div className="relative p-4 border border-gray-200 rounded-xl bg-white flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                {value.file.type.includes('image') ? (
                  <img src={value.preview} alt="Preview" className="w-8 h-8 object-cover rounded" />
                ) : (
                  <FileText className="w-8 h-8 text-[#FF6A3D]" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm text-[#101828] font-medium truncate max-w-[200px]">{value.file.name}</p>
                <p className="text-xs text-[#667085]">{(value.file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => onChange(null)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24 relative overflow-hidden font-['Satoshi']">
        <div className="relative w-full max-w-[672px] mx-auto text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center mb-8 bg-[#FF6A3D]/10 rounded-full p-4"
          >
            <div className="bg-[#FF6A3D] rounded-full p-6 shadow-lg shadow-[#FF6A3D]/20">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#1a1a1a] text-3xl mb-4 font-normal uppercase tracking-tight">Account Created Successfully!</h1>
            <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">You can start exploring the platform immediately. Welcome to the community!</p>
          </motion.div>
          
          <motion.button
            onClick={onBack}
            className="px-12 h-14 bg-[#FF6A3D] hover:bg-[#E55A2D] rounded-full font-bold uppercase tracking-widest text-[12px] text-white transition-all shadow-xl shadow-[#FF6A3D]/20 flex items-center gap-3 mx-auto"
          >
            Start Exploring
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24 font-['Satoshi']">
      <div className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-[1152px] lg:h-[820px] flex flex-col lg:flex-row rounded-2xl">
        
        <div className="hidden lg:block lg:w-[35%] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={carouselImages[currentImageIndex]}
                alt="Student Life"
                className="absolute w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end p-10">
            <div className="w-full">
              <h2 className="text-3xl text-white font-normal uppercase tracking-tight mb-6 leading-tight">Empower your design journey.</h2>
              <div className="space-y-4">
                {["Access materials", "Industry connect", "Verified profile", "Workshops"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF6A3D] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-white/90 text-sm font-medium uppercase tracking-widest">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[65%] flex flex-col h-full bg-white relative">
          <div className="px-8 pt-8 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6A3D] transition-colors text-[11px] font-bold uppercase tracking-widest group"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back
              </button>
              <p className="text-[#FF6A3D] text-[10px] font-bold tracking-[0.3em] uppercase">Student Onboarding</p>
              <div className="w-10" />
            </div>

            <div className="flex items-center gap-4 max-w-sm mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex flex-col gap-2">
                  <div className={`h-1 rounded-full transition-all duration-700 ${
                    step >= s ? 'bg-[#FF6A3D]' : 'bg-gray-100'
                  }`} />
                  <span className={`text-[9px] font-bold uppercase tracking-widest text-center ${
                    step === s ? 'text-[#FF6A3D]' : 'text-gray-400'
                  }`}>
                    {s === 1 ? 'Info' : s === 2 ? 'Docs' : 'Intent'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                {step === 1 && (
                  <div className="space-y-8">
                    <header>
                      <h2 className="text-2xl font-normal text-[#0F172A] uppercase tracking-tight">Basic Information</h2>
                      <p className="text-gray-500 text-sm mt-1">Step 1: Build your core student identity.</p>
                    </header>

                    <ProfileImageUpload />

                    <div className="space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                          <User className="w-4 h-4 text-[#FF6A3D]" />
                          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Personal Details</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Full Name*</label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => updateFormData('fullName', e.target.value)}
                              placeholder="Rahul Sharma"
                              className="h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF6A3D] transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Email Address*</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => updateFormData('email', e.target.value)}
                              placeholder="rahul@university.edu"
                              className="h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF6A3D] transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Phone Number*</label>
                            <div className="relative">
                              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="tel"
                                required
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                  updateFormData('phoneNumber', e.target.value);
                                  if (formData.isSameAsPhone) updateFormData('whatsappNumber', e.target.value);
                                }}
                                placeholder="+91 98765 43210"
                                className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF6A3D]"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">WhatsApp</label>
                              <button 
                                type="button"
                                onClick={toggleSameAsPhone}
                                className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${formData.isSameAsPhone ? 'text-[#FF6A3D]' : 'text-gray-400'}`}
                              >
                                Same as phone
                              </button>
                            </div>
                            <input
                              type="tel"
                              disabled={formData.isSameAsPhone}
                              value={formData.whatsappNumber}
                              onChange={(e) => updateFormData('whatsappNumber', e.target.value)}
                              placeholder="+91 98765 43210"
                              className={`h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF6A3D] ${
                                formData.isSameAsPhone ? 'opacity-50' : ''
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                          <FileText className="w-4 h-4 text-[#FF6A3D]" />
                          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Academic Details</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">College Name*</label>
                            <input
                              type="text"
                              required
                              value={formData.collegeName}
                              onChange={(e) => updateFormData('collegeName', e.target.value)}
                              placeholder="e.g. CEPT University"
                              className="h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF6A3D]"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Course*</label>
                            <input
                              type="text"
                              required
                              value={formData.course}
                              onChange={(e) => updateFormData('course', e.target.value)}
                              placeholder="e.g. B.Arch"
                              className="h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF6A3D]"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Year of Study*</label>
                          <div className="flex flex-wrap gap-2">
                            {yearOptions.map((year) => (
                              <button
                                key={year}
                                type="button"
                                onClick={() => updateFormData('yearOfStudy', year)}
                                className={`px-4 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                                  formData.yearOfStudy === year
                                    ? 'border-[#FF6A3D] bg-[#FF6A3D] text-white shadow-lg shadow-[#FF6A3D]/20'
                                    : 'border-gray-100 text-gray-400 hover:border-gray-300 bg-white'
                                }`}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleNext}
                      disabled={!formData.fullName || !formData.email || !formData.phoneNumber || !formData.collegeName || !formData.course || !formData.yearOfStudy}
                      className="w-full h-14 bg-[#FF6A3D] hover:bg-[#E55A2D] disabled:opacity-50 text-white rounded-xl font-bold uppercase tracking-widest text-[12px] transition-all flex items-center justify-center gap-3 mt-12 shadow-xl shadow-[#FF6A3D]/20"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <header>
                      <h2 className="text-2xl font-normal text-[#0F172A] uppercase tracking-tight">Documents</h2>
                      <p className="text-gray-500 text-sm mt-1">Upload credentials to verify your profile.</p>
                    </header>

                    <div className="space-y-8">
                      <FileUpload 
                        label="CV / Resume"
                        id="cv-upload"
                        accept=".pdf"
                        value={formData.cvFile}
                        onChange={(data) => updateFormData('cvFile', data)}
                        helperText="PDF only (max 5MB)"
                      />

                      <FileUpload 
                        label="Student ID"
                        id="id-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        value={formData.studentIdFile}
                        onChange={(data) => updateFormData('studentIdFile', data)}
                      />

                      <FileUpload 
                        label="Portfolio"
                        id="portfolio-upload"
                        accept=".pdf"
                        value={formData.portfolioFile}
                        onChange={(data) => updateFormData('portfolioFile', data)}
                        helperText="Selected works (PDF, max 10MB)"
                      />
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full h-14 bg-[#FF6A3D] hover:bg-[#E55A2D] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] transition-all flex items-center justify-center gap-3 mt-12 shadow-xl shadow-[#FF6A3D]/20"
                    >
                      Final Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <header>
                      <h2 className="text-2xl font-normal text-[#0F172A] uppercase tracking-tight">Interests & Intent</h2>
                      <p className="text-gray-500 text-sm mt-1">How can Material Library help you?</p>
                    </header>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Interest Areas</label>
                        <div className="flex flex-wrap gap-2">
                          {interestAreas.map((area) => {
                            const isSelected = formData.interests.includes(area);
                            return (
                              <button
                                key={area}
                                type="button"
                                onClick={() => {
                                  const next = isSelected 
                                    ? formData.interests.filter(i => i !== area)
                                    : [...formData.interests, area];
                                  updateFormData('interests', next);
                                }}
                                className={`px-4 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                                  isSelected
                                    ? 'border-[#FF6A3D] bg-[#FF6A3D] text-white shadow-lg shadow-[#FF6A3D]/20'
                                    : 'border-gray-100 text-gray-400 hover:border-gray-300 bg-white'
                                }`}
                              >
                                {area}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[12px] font-bold text-[#364153] uppercase tracking-wider">Engagement Intent</label>
                        <div className="grid grid-cols-1 gap-3">
                          {engagementOptions.map((opt) => {
                            const isSelected = formData.engagements.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  const next = isSelected 
                                    ? formData.engagements.filter(e => e !== opt.id)
                                    : [...formData.engagements, opt.id];
                                  updateFormData('engagements', next);
                                }}
                                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-[#FF6A3D] bg-[#FF6A3D]/5 text-[#0F172A]'
                                    : 'border-gray-100 text-gray-500 hover:border-gray-300 bg-white'
                                }`}
                              >
                                <span className="text-sm font-medium">{opt.label}</span>
                                {isSelected && <CheckCircle2 className="w-5 h-5 text-[#FF6A3D]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full h-14 bg-[#FF6A3D] hover:bg-[#E55A2D] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] transition-all flex items-center justify-center gap-3 mt-12 shadow-xl shadow-[#FF6A3D]/20"
                    >
                      Complete Sign Up
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
