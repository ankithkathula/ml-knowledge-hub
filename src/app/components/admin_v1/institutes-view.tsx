import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Users, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft,
  X,
  Globe,
  Clock,
  LayoutDashboard,
  Edit3,
  Info,
  Phone,
  Mail,
  User,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { ImageWithFallback } from "./figma/ImageWithFallback";

// --- Types ---

interface Course {
  id: string;
  name: string;
  discipline: string;
  duration: string;
  level: 'Undergraduate' | 'Postgraduate';
}

interface Institute {
  id: string;
  name: string;
  city: string;
  type: string;
  affiliation: string;
  studentCount: number;
  courseCount: number;
  logo: string;
  website: string;
  overview: string;
  foundedYear: string;
  status: 'Active' | 'Inactive';
}

interface ContactPerson {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
}

// --- Mock Data ---

const MOCK_INSTITUTES: Institute[] = [
  {
    id: '1',
    name: 'National Institute of Design (NID)',
    city: 'Ahmedabad',
    type: 'Design School',
    affiliation: 'Statutory Body',
    studentCount: 450,
    courseCount: 12,
    logo: 'NID',
    website: 'www.nid.edu',
    overview: 'The National Institute of Design is a premier design school in India, established by the Government of India under the Ministry of Commerce and Industry.',
    foundedYear: '1961',
    status: 'Active'
  },
  {
    id: '2',
    name: 'CEPT University',
    city: 'Ahmedabad',
    type: 'University',
    affiliation: 'UGC',
    studentCount: 320,
    courseCount: 8,
    logo: 'CEPT',
    website: 'www.cept.ac.in',
    overview: 'CEPT University focuses on understanding, designing, planning, constructing and managing human habitats.',
    foundedYear: '1962',
    status: 'Active'
  },
  {
    id: '3',
    name: 'School of Planning and Architecture (SPA)',
    city: 'Delhi',
    type: 'College',
    affiliation: 'Statutory Body',
    studentCount: 280,
    courseCount: 6,
    logo: 'SPA',
    website: 'www.spa.ac.in',
    overview: 'SPA Delhi is a specialized University providing training at different levels in different aspects of human habitat and environment.',
    foundedYear: '1941',
    status: 'Active'
  },
  {
    id: '4',
    name: 'NIFT',
    city: 'Mumbai',
    type: 'Design School',
    affiliation: 'Statutory Body',
    studentCount: 390,
    courseCount: 15,
    logo: 'NIFT',
    website: 'www.nift.ac.in',
    overview: 'NIFT is the pioneering institute of fashion education in the country and has been in the vanguard of providing professional human resource to the textile and apparel industry.',
    foundedYear: '1986',
    status: 'Active'
  },
];

const MOCK_COURSES: Course[] = [
  { id: 'c1', name: 'B.Des Interior Design', discipline: 'Interior', duration: '4 Years', level: 'Undergraduate' },
  { id: 'c2', name: 'B.Des Product Design', discipline: 'Product', duration: '4 Years', level: 'Undergraduate' },
  { id: 'c3', name: 'B.Des Fashion Design', discipline: 'Fashion', duration: '4 Years', level: 'Undergraduate' },
  { id: 'c4', name: 'B.Des Graphic Design', discipline: 'Communication', duration: '4 Years', level: 'Undergraduate' },
  { id: 'c5', name: 'B.Des Textile Design', discipline: 'Textile', duration: '4 Years', level: 'Undergraduate' },
  { id: 'c6', name: 'B.Des Animation Design', discipline: 'Digital Media', duration: '4 Years', level: 'Undergraduate' },
];

const YEAR_DISTRIBUTION = [
  { year: '1st Year', students: 120 },
  { year: '2nd Year', students: 105 },
  { year: '3rd Year', students: 95 },
  { year: '4th Year', students: 80 },
  { year: '5th Year', students: 50 },
];

const DISCIPLINE_DISTRIBUTION = [
  { name: 'Interior', value: 35 },
  { name: 'Product', value: 25 },
  { name: 'Fashion', value: 20 },
  { name: 'Media', value: 15 },
  { name: 'Textile', value: 5 },
];

const COLORS = ['#FF7A59', '#FF9F87', '#FFC4B5', '#FFE9E3', '#F2F4F7'];

// --- Helper Components ---

function InstituteDetailPage({ institute, onBack }: { institute: Institute, onBack: () => void }) {
  const [contacts, setContacts] = useState<ContactPerson[]>([
    { id: '1', name: 'Dr. Aradhana Singh', designation: 'Dean of Academic Affairs', email: 'dean@nid.edu', phone: '+91 98765 43210' },
    { id: '2', name: 'Prof. Rajesh Khanna', designation: 'Head of Interior Design', email: 'rkhanna@nid.edu', phone: '+91 98765 43211' }
  ]);
  const [expandedContact, setExpandedContact] = useState<string | null>('1');

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-full font-['Satoshi'] font-normal overflow-x-hidden">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] text-gray-500 hover:text-[#FF7A59] transition-colors uppercase tracking-widest cursor-pointer font-normal"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Institutes
      </button>

      <div className="flex flex-col gap-1 font-normal">
        <h1 className="text-2xl font-normal text-[#101828] leading-tight uppercase tracking-tight">{institute.name}</h1>
        <div className="flex flex-wrap items-center gap-6 mt-1 font-normal">
          <div className="flex items-center gap-2 text-[#667085] text-[10px] uppercase tracking-widest font-normal">
            <MapPin className="w-3.5 h-3.5" />
            <span>{institute.city}</span>
          </div>
          <div className="flex items-center gap-2 text-[#667085] text-[10px] uppercase tracking-widest font-normal">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{institute.type}</span>
          </div>
          <a href={`https://${institute.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#FF7A59] hover:text-orange-600 text-[10px] uppercase tracking-widest font-normal">
            <Globe className="w-3.5 h-3.5" />
            {institute.website}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-normal">
        <div className="lg:col-span-8 space-y-6 min-w-0 w-full font-normal">
          {/* Institute Overview Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 font-normal">
            <div className="w-20 h-20 rounded-2xl bg-[#F9FAFB] flex items-center justify-center text-2xl font-normal text-gray-300 border border-gray-100 uppercase tracking-widest shrink-0 overflow-hidden">
              {institute.logo.startsWith('http') ? (
                <ImageWithFallback src={institute.logo} alt={institute.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-300">{institute.logo.slice(0, 2)}</span>
              )}
            </div>
            <div className="space-y-3 flex-1 font-normal">
              <p className="text-[14px] text-[#667085] leading-relaxed line-clamp-2 font-normal">{institute.overview}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1 border-t border-gray-50 font-normal">
                <div>
                  <p className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Founded</p>
                  <p className="text-[12px] text-[#101828] font-normal mt-0.5">{institute.foundedYear}</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Type</p>
                  <p className="text-[12px] text-[#101828] font-normal mt-0.5">{institute.type}</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Affiliation</p>
                  <p className="text-[12px] text-[#101828] font-normal mt-0.5">{institute.affiliation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compact 2-Column: Address & Contact Persons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-normal">
            {/* Institute Address Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col font-normal">
              <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.1em] mb-4">Institute Address</h3>
              <div className="flex-1 space-y-4 font-normal">
                <div className="text-[13px] text-[#101828] leading-relaxed font-normal">
                  <p>National Institute of Design, Paldi</p>
                  <p>Opposite Sanskar Kendra</p>
                  <p className="text-[#667085]">{institute.city}, Gujarat 380007, India</p>
                  <p className="text-[#98A2B3] mt-1 italic">Landmark: Near Sabarmati Riverfront</p>
                </div>
                <div className="relative w-full h-[120px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group font-normal">
                  {/* Mock Map Preview */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <MapPin className="w-12 h-12 text-[#FF7A59]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-200">
                    <Search className="w-3 h-3 text-[#98A2B3]" />
                    <input 
                      type="text" 
                      placeholder="Search / Update Location" 
                      className="flex-1 bg-transparent text-[10px] outline-none placeholder:text-[#98A2B3] font-normal"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Persons Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col font-normal">
              <div className="flex items-center justify-between mb-4 font-normal">
                <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.1em]">Contact Persons</h3>
                <button 
                  onClick={() => {}} 
                  className="text-[10px] text-[#FF7A59] font-normal uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[220px] custom-scrollbar pr-1 font-normal">
                {contacts.map((contact, index) => {
                  const isExpanded = expandedContact === contact.id;
                  return (
                    <div 
                      key={contact.id} 
                      className={`border rounded-xl transition-all font-normal ${isExpanded ? 'border-[#FF7A59]/20 bg-[#FF7A59]/5' : 'border-gray-50 hover:border-gray-100 bg-white'}`}
                    >
                      <button 
                        onClick={() => setExpandedContact(isExpanded ? null : contact.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left font-normal cursor-pointer"
                      >
                        <div className="flex items-center gap-3 font-normal">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isExpanded ? 'bg-[#FF7A59] text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <User className="w-4 h-4" />
                          </div>
                          <div className="font-normal">
                            <p className={`text-[13px] font-normal ${isExpanded ? 'text-[#101828]' : 'text-[#667085]'}`}>{contact.name}</p>
                            <p className="text-[10px] text-[#98A2B3] uppercase tracking-widest font-normal">{contact.designation}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#98A2B3] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-2 border-t border-[#FF7A59]/10 pt-3 font-normal">
                          <div className="flex items-center gap-2 text-[11px] text-[#667085] font-normal">
                            <Mail className="w-3.5 h-3.5 text-[#98A2B3]" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#667085] font-normal">
                            <Phone className="w-3.5 h-3.5 text-[#98A2B3]" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Courses Offered Section */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm font-normal">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white font-normal">
              <div>
                <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.1em]">Courses Offered</h3>
                <p className="text-[9px] text-[#98A2B3] mt-0.5 uppercase tracking-widest font-normal">{institute.courseCount} total programs</p>
              </div>
              <button className="text-[10px] text-[#FF7A59] font-normal uppercase tracking-widest hover:underline cursor-pointer">View All</button>
            </div>
            <div className="divide-y divide-gray-100 font-normal">
              {MOCK_COURSES.slice(0, 4).map((course) => (
                <div key={course.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer font-normal">
                  <div className="flex-1 font-normal">
                    <h4 className="text-[13px] font-normal text-[#101828] uppercase tracking-tight group-hover:text-[#FF7A59] transition-colors">{course.name}</h4>
                    <div className="flex items-center gap-3 mt-1 font-normal">
                      <p className="text-[10px] text-[#667085] uppercase tracking-widest font-normal">{course.discipline}</p>
                      <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                      <p className="text-[10px] text-[#667085] uppercase tracking-widest font-normal">{course.duration}</p>
                      <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                      <p className="text-[10px] text-[#667085] uppercase tracking-widest font-normal">{course.level}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-[#FF7A59] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-normal">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col font-normal">
              <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.1em] mb-6">Year-wise Distribution</h3>
              <div className="relative w-full h-[180px] min-h-[180px] font-normal">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={YEAR_DISTRIBUTION} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF', fontWeight: 400 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF', fontWeight: 400 }} />
                    <Tooltip cursor={{ fill: '#FFF5F2' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '11px' }} />
                    <Bar dataKey="students" fill="#FF7A59" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col font-normal">
              <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.1em] mb-6">Discipline breakdown</h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full font-normal">
                <div className="relative w-full sm:w-1/2 h-[160px] min-h-[160px] font-normal">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={DISCIPLINE_DISTRIBUTION} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                        {DISCIPLINE_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-2 pl-0 sm:pl-2 font-normal">
                  {DISCIPLINE_DISTRIBUTION.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between font-normal">
                      <div className="flex items-center gap-2 font-normal">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-[10px] text-[#667085] uppercase tracking-widest font-normal">{entry.name}</span>
                      </div>
                      <span className="text-[10px] text-[#101828] font-normal">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Stats & Admin Note */}
        <div className="lg:col-span-4 space-y-6 min-w-0 w-full sticky top-8 font-normal">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 font-normal">
            <div className="flex items-center justify-between font-normal">
               <h3 className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Quick Stats</h3>
               <span className="px-2.5 py-0.5 bg-[#ECFDF3] text-[#027A48] rounded-full text-[9px] uppercase tracking-widest font-normal border border-[#ABEFC6]">Active</span>
            </div>
            <div className="space-y-5 font-normal">
              <div className="flex items-center gap-3 font-normal">
                <div className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-[#98A2B3] border border-[#F2F4F7] font-normal"><Building2 className="w-4.5 h-4.5" /></div>
                <div className="font-normal">
                  <p className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Affiliation</p>
                  <p className="text-[13px] text-[#101828] font-normal uppercase mt-0.5">{institute.affiliation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 font-normal">
                <div className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-[#98A2B3] border border-[#F2F4F7] font-normal"><Users className="w-4.5 h-4.5" /></div>
                <div className="font-normal">
                  <p className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Population</p>
                  <p className="text-[13px] text-[#101828] font-normal uppercase mt-0.5">{institute.studentCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 font-normal">
                <div className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-[#98A2B3] border border-[#F2F4F7] font-normal"><LayoutDashboard className="w-4.5 h-4.5" /></div>
                <div className="font-normal">
                  <p className="text-[9px] text-[#98A2B3] uppercase tracking-widest font-normal">Programs</p>
                  <p className="text-[13px] text-[#101828] font-normal uppercase mt-0.5">{institute.courseCount}</p>
                </div>
              </div>
            </div>
            <div className="pt-2 font-normal">
              <button className="w-full py-3 bg-[#FF7A59] text-white rounded-xl text-[11px] font-normal uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" /> Edit Meta
              </button>
            </div>
          </div>

          <div className="bg-[#FFF4F1] border border-[#FF7A59]/10 rounded-2xl p-6 space-y-4 font-normal">
            <div className="flex items-center gap-2 text-[#FF7A59] font-normal">
              <span className="font-normal"><Info className="w-4 h-4" /></span>
              <h3 className="text-[11px] font-normal uppercase tracking-widest">Admin Note</h3>
            </div>
            <p className="text-[13px] text-[#7A271A] leading-relaxed italic font-normal">
              “This institute is part of the priority design curriculum partnership.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main View Component ---

export function InstitutesView() {
  const [view, setView] = useState<'grid' | 'detail'>('grid');
  const [selectedInst, setSelectedInst] = useState<Institute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInstitutes = MOCK_INSTITUTES.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (inst: Institute) => {
    setSelectedInst(inst);
    setView('detail');
  };

  if (view === 'detail' && selectedInst) {
    return <InstituteDetailPage institute={selectedInst} onBack={() => setView('grid')} />;
  }

  return (
    <div className="p-8 pt-2 space-y-6 bg-white min-h-full font-['Satoshi'] font-normal">
      {/* Search, Filter, and Add Action Row */}
      <div className="flex items-center gap-4 font-normal">
        <div className="relative flex-1 font-normal">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-normal" />
          <input 
            type="text"
            placeholder="Search institute name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all"
          />
        </div>
        
        <button className="flex items-center gap-2 px-6 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-xs font-normal uppercase tracking-widest cursor-pointer whitespace-nowrap">
          <Filter className="w-4 h-4 text-gray-400 font-normal" />
          Filters
        </button>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF7A59] text-white rounded-xl text-xs font-normal shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-widest cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Institute
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-normal">
        {filteredInstitutes.map((inst) => (
          <div 
            key={inst.id}
            className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#FF7A59]/30 transition-all flex flex-col min-w-0 font-normal"
          >
            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-xl font-normal text-gray-400 uppercase border border-gray-100 mb-5 group-hover:bg-[#FF7A59]/5 group-hover:text-[#FF7A59] transition-colors overflow-hidden font-normal">
              {inst.logo.startsWith('http') ? (
                <ImageWithFallback src={inst.logo} alt={inst.name} className="w-full h-full object-cover font-normal" />
              ) : (
                <span className="text-gray-300 font-normal">{inst.logo.slice(0, 2)}</span>
              )}
            </div>
            <div className="flex-1 space-y-4 font-normal">
              <div className="font-normal">
                <h3 className="text-base font-normal text-[#101828] group-hover:text-[#FF7A59] transition-colors line-clamp-1 leading-snug uppercase tracking-tight font-normal">{inst.name}</h3>
                <div className="flex items-center gap-1.5 mt-1 text-[#98A2B3] uppercase tracking-widest text-[10px] font-normal">
                  <MapPin className="w-3 h-3 font-normal" />
                  <span>{inst.city}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 space-y-3 font-normal">
                <div className="flex items-center justify-between text-[10px] font-normal">
                  <span className="text-[#98A2B3] uppercase tracking-widest font-normal">Affiliation</span>
                  <span className="text-[#101828] uppercase tracking-tight font-normal">{inst.affiliation}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-normal">
                  <span className="text-[#98A2B3] uppercase tracking-widest font-normal">Students</span>
                  <span className="text-[#101828] font-normal">{inst.studentCount}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleViewDetails(inst)}
              className="mt-6 w-full py-3 bg-gray-50 text-[#667085] rounded-xl text-[11px] font-normal uppercase tracking-widest hover:bg-[#FF7A59] hover:text-white transition-all shadow-sm cursor-pointer font-normal"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-normal">
           <div className="bg-white rounded-3xl w-full max-w-2xl h-fit overflow-hidden flex flex-col shadow-2xl font-normal">
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between font-normal">
                 <h3 className="text-sm font-normal text-[#101828] uppercase tracking-widest font-normal">Register New Institute</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 cursor-pointer font-normal"><X className="w-5 h-5 font-normal" /></button>
              </div>
              <div className="p-10 space-y-8 font-normal">
                 <div className="space-y-2 font-normal">
                    <label className="text-[10px] text-[#98A2B3] uppercase tracking-widest ml-1 font-normal">Institute Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-normal" placeholder="e.g. CEPT University" />
                 </div>
              </div>
              <div className="px-10 py-8 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-4 font-normal">
                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-gray-400 hover:text-gray-600 text-[11px] font-normal uppercase tracking-widest cursor-pointer font-normal">Cancel</button>
                 <button className="px-10 py-3 bg-[#FF7A59] text-white rounded-xl text-[11px] font-normal uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all cursor-pointer font-normal">Add Institute</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
