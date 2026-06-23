import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  X,
  Filter,
  Check,
  Download,
  ExternalLink,
  MessageSquare,
  FileText
} from 'lucide-react';

// --- Types ---

type YearOfStudy = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | '5th Year' | 'PG' | 'Extended / Other';
type Discipline = 'Architecture' | 'Interior Design' | 'Product Design' | 'Fashion Design' | 'Construction & Materials' | 'Civil Engineering' | 'Urban Design';
type EngagementType = 'Learning resources & knowledge center' | 'Jobs, internships & off-campus placements' | 'Brand collaborations & live projects' | 'Workshops & events';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  institute: string;
  course: string;
  yearOfStudy: YearOfStudy;
  discipline: Discipline;
  interests: EngagementType[];
  lastActive: string;
  profileCompletion: number;
  signupDate: string;
  motivation: string;
  areasOfInterest: string[];
  lastUpdated?: string;
}

// --- Mock Data ---

const MOCK_INSTITUTES_LIST = [
  { name: 'National Institute of Design (NID)', city: 'Ahmedabad', count: 450 },
  { name: 'CEPT University', city: 'Ahmedabad', count: 320 },
  { name: 'SPA Delhi', city: 'Delhi', count: 280 },
  { name: 'NIFT', city: 'Mumbai', count: 390 },
  { name: 'MIT Institute of Design', city: 'Pune', count: 210 },
];

const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Ananya Sharma',
    email: 'ananya.s@nid.edu',
    phone: '+91 98765 43210',
    institute: 'National Institute of Design (NID)',
    course: 'B.Des Interior Design',
    yearOfStudy: '3rd Year',
    discipline: 'Interior Design',
    interests: ['Learning resources & knowledge center', 'Jobs, internships & off-campus placements'],
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    profileCompletion: 85,
    signupDate: '2025-11-15',
    motivation: 'I joined Material Library to explore sustainable material innovations and connect with brands that are pushing the boundaries of architectural products.',
    areasOfInterest: ['Sustainable Design', 'Material Science', 'Acoustics', 'Eco-friendly Composites']
  },
  {
    id: 's2',
    name: 'Rohan Mehta',
    email: 'rohan.m@spa.edu',
    phone: '+91 87654 32109',
    institute: 'SPA Delhi',
    course: 'B.Arch',
    yearOfStudy: '4th Year',
    discipline: 'Architecture',
    interests: ['Workshops & events', 'Brand collaborations & live projects'],
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    profileCompletion: 60,
    signupDate: '2025-12-01',
    motivation: 'As a final year architecture student, I am looking for live industry collaborations to understand the practical application of building materials.',
    areasOfInterest: ['Urban Planning', 'Structural Engineering', 'Glass Façades']
  },
  {
    id: 's3',
    name: 'Priya Iyer',
    email: 'priya.i@nift.edu',
    phone: '+91 76543 21098',
    institute: 'NIFT',
    course: 'M.Des Textile Design',
    yearOfStudy: 'PG',
    discipline: 'Fashion Design',
    interests: ['Learning resources & knowledge center', 'Brand collaborations & live projects'],
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    profileCompletion: 100,
    signupDate: '2025-10-20',
    motivation: 'My interest lies in the intersection of fashion and interior textiles. Material Library provides the perfect database for sourcing niche fabricators.',
    areasOfInterest: ['Soft Furnishings', 'Smart Fabrics', 'Natural Fibers']
  }
];

// --- Components ---

const FilterSection = ({ title, children, defaultOpen = true }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4 last:border-0 font-normal">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-[13px] font-normal text-gray-700 hover:text-[#FF7A59] transition-colors mb-2"
      >
        {title}
        {isOpen ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
      </button>
      {isOpen && (
        <div className="space-y-1.5 pt-1 font-normal">
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxFilter = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
  <label className="flex items-center gap-2.5 group cursor-pointer py-1.5 font-normal">
    <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${checked ? 'bg-[#FF7A59] border-[#FF7A59]' : 'border-gray-200 group-hover:border-gray-300'}`}>
      {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className={`text-[13px] flex-1 font-normal transition-colors ${checked ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>{label}</span>
  </label>
);

export function StudentsView() {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [instSearch, setInstSearch] = useState('');
  
  // Filters State
  const [filters, setFilters] = useState({
    institutes: [] as string[],
    years: [] as YearOfStudy[],
    disciplines: [] as Discipline[],
    interests: [] as EngagementType[],
    completion: 'all' as string,
  });

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                           s.email.toLowerCase().includes(search.toLowerCase()) ||
                           s.institute.toLowerCase().includes(search.toLowerCase());
      
      const matchesInstitute = filters.institutes.length === 0 || filters.institutes.includes(s.institute);
      const matchesYear = filters.years.length === 0 || filters.years.includes(s.yearOfStudy);
      const matchesDiscipline = filters.disciplines.length === 0 || filters.disciplines.includes(s.discipline);
      const matchesInterests = filters.interests.length === 0 || filters.interests.some(i => s.interests.includes(i));
      
      let matchesCompletion = true;
      if (filters.completion === '0-50') matchesCompletion = s.profileCompletion <= 50;
      else if (filters.completion === '50-80') matchesCompletion = s.profileCompletion > 50 && s.profileCompletion <= 80;
      else if (filters.completion === '80-100') matchesCompletion = s.profileCompletion > 80;

      return matchesSearch && matchesInstitute && matchesYear && matchesDiscipline && matchesInterests && matchesCompletion;
    });
  }, [search, filters]);

  const toggleFilter = (category: keyof typeof filters, value: any) => {
    setFilters(prev => {
      const current = prev[category] as any[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(i => i !== value) };
      }
      return { ...prev, [category]: [...current, value] };
    });
  };

  const clearFilters = () => {
    setFilters({
      institutes: [],
      years: [],
      disciplines: [],
      interests: [],
      completion: 'all',
    });
    setSearch('');
  };

  return (
    <div className="flex flex-col h-full bg-white font-['Satoshi'] overflow-hidden">
      {/* Header removed to use global TopBar */}

      <div className="flex flex-1 overflow-hidden font-normal">
        {/* --- LEFT PANEL: Filters --- */}
        <div className="w-[320px] border-r border-gray-100 flex flex-col h-full shrink-0 bg-white sticky top-0 overflow-y-auto custom-scrollbar font-normal">
          <div className="p-6 space-y-6 font-normal">
            {/* Search Bar */}
            <div className="relative group font-normal">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF7A59] transition-colors" />
              <input 
                type="text" 
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] transition-all font-normal"
              />
            </div>

            <div className="flex items-center justify-between py-1 font-normal">
              <span className="text-[12px] font-normal text-gray-900 tracking-tight">Advanced filters</span>
              <button onClick={clearFilters} className="text-[11px] font-normal text-[#FF7A59] hover:underline tracking-tight">Clear all</button>
            </div>

            <div className="space-y-1 font-normal">
              {/* Order: Institute, Discipline, Year of Study, Intent & Interest, Profile Completeness */}
              <FilterSection title="Institute">
                <div className="relative mb-3 font-normal">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search institutes..."
                    value={instSearch}
                    onChange={(e) => setInstSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:border-[#FF7A59] font-normal"
                  />
                </div>
                <div className="max-h-[180px] overflow-y-auto custom-scrollbar space-y-0.5 pr-1 font-normal">
                  {MOCK_INSTITUTES_LIST.filter(i => i.name.toLowerCase().includes(instSearch.toLowerCase())).map(inst => (
                    <CheckboxFilter 
                      key={inst.name} 
                      label={inst.name} 
                      checked={filters.institutes.includes(inst.name)}
                      onChange={() => toggleFilter('institutes', inst.name)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Discipline">
                {[
                  'Architecture', 'Interior Design', 'Product Design', 'Fashion Design', 'Construction & Materials'
                ].map(d => (
                  <CheckboxFilter 
                    key={d} 
                    label={d} 
                    checked={filters.disciplines.includes(d as Discipline)}
                    onChange={() => toggleFilter('disciplines', d)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Year of study">
                {[
                  '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'PG', 'Extended / Other'
                ].map(year => (
                  <CheckboxFilter 
                    key={year} 
                    label={year} 
                    checked={filters.years.includes(year as YearOfStudy)}
                    onChange={() => toggleFilter('years', year)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Intent & interest">
                {[
                  'Learning resources & knowledge center', 
                  'Jobs, internships & off-campus placements', 
                  'Brand collaborations & live projects', 
                  'Workshops & events'
                ].map(e => (
                  <CheckboxFilter 
                    key={e} 
                    label={e} 
                    checked={filters.interests.includes(e as EngagementType)}
                    onChange={() => toggleFilter('interests', e)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Profile completeness">
                {[
                  { id: 'all', label: 'All profiles' },
                  { id: '0-50', label: '0–50%' },
                  { id: '50-80', label: '50–80%' },
                  { id: '80-100', label: '80–100%' },
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setFilters({ ...filters, completion: opt.id })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors font-normal ${filters.completion === opt.id ? 'bg-[#FF7A59]/5 text-[#FF7A59]' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </FilterSection>
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: Student List --- */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-y-auto custom-scrollbar p-8 font-normal">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm font-normal">
            {/* List Header Labels */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50 font-normal">
              <div className="col-span-4 text-[11px] font-normal text-gray-400 uppercase tracking-wider">Student information</div>
              <div className="col-span-4 text-[11px] font-normal text-gray-400 uppercase tracking-wider">Institute & curriculum</div>
              <div className="col-span-4 text-[11px] font-normal text-gray-400 uppercase tracking-wider">Areas of engagement</div>
            </div>

            <div className="divide-y divide-gray-100 font-normal">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 cursor-pointer transition-colors group items-center font-normal"
                  >
                    <div className="col-span-4 flex items-center gap-4 font-normal">
                      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-[#FF7A59] font-normal text-base group-hover:bg-[#FF7A59]/10 transition-colors shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0 font-normal">
                        <h4 className="text-[15px] font-normal text-gray-900 group-hover:text-[#FF7A59] transition-colors truncate tracking-tight">{student.name}</h4>
                        <p className="text-xs text-gray-500 font-normal truncate mt-0.5">{student.email}</p>
                      </div>
                    </div>
                    <div className="col-span-4 min-w-0 font-normal">
                      <p className="text-[13px] text-gray-700 font-normal truncate">{student.institute}</p>
                      <div className="flex items-center gap-1.5 mt-1 font-normal">
                        <span className="text-xs text-gray-400 font-normal truncate uppercase tracking-tight">{student.course}</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[11px] text-gray-500 font-normal shrink-0 uppercase tracking-tight">{student.yearOfStudy}</span>
                      </div>
                    </div>
                    <div className="col-span-4 flex flex-wrap gap-1.5 font-normal">
                      {student.interests.slice(0, 2).map((interest, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-normal text-gray-500 uppercase tracking-tight">
                          {interest.split(' & ')[0].split(' resources')[0]}
                        </span>
                      ))}
                      {student.interests.length > 2 && (
                        <span className="text-[10px] text-gray-400 font-normal">+{student.interests.length - 2}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 flex flex-col items-center justify-center text-center font-normal">
                  <Search className="w-12 h-12 text-gray-200 mb-4 font-normal" />
                  <h3 className="text-lg font-normal text-gray-900 tracking-tight">No students found</h3>
                  <p className="text-sm text-gray-500 mt-1 font-normal">Adjust your filters to see more results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Student Detail Modal (Replacing Drawer for robustness) --- */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-normal">
          <div className="bg-white rounded-3xl w-full max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl font-normal">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gray-50 font-normal">
              <h3 className="text-sm font-normal text-gray-900 uppercase tracking-widest">Student profile</h3>
              <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar font-normal">
              <div className="flex items-start gap-6 font-normal">
                <div className="w-20 h-20 rounded-2xl bg-[#FF7A59]/5 flex items-center justify-center text-2xl font-normal text-[#FF7A59] border border-[#FF7A59]/10">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 font-normal">
                  <h2 className="text-2xl font-normal text-gray-900 leading-tight tracking-tight">{selectedStudent.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedStudent.email}</p>
                  <div className="flex items-center gap-4 mt-4 font-normal">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest font-normal">
                      <Calendar className="w-3.5 h-3.5" /> Joined {new Date(selectedStudent.signupDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-normal text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-100 shadow-sm">
                      {selectedStudent.profileCompletion}% complete
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-normal">
                <h4 className="text-[11px] font-normal text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Academic details
                </h4>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6 font-normal">
                  <div className="grid grid-cols-2 gap-8 font-normal">
                    <div className="col-span-2">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-normal">Institute</p>
                      <p className="text-[15px] font-normal text-gray-900 tracking-tight">{selectedStudent.institute}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-normal">Course</p>
                      <p className="text-sm font-normal text-gray-900 tracking-tight">{selectedStudent.course}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-normal">Year</p>
                      <p className="text-sm font-normal text-gray-900 tracking-tight">{selectedStudent.yearOfStudy}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-normal">
                <h4 className="text-[11px] font-normal text-gray-400 uppercase tracking-widest">Interests & motivation</h4>
                <div className="bg-orange-50/20 border border-orange-100 rounded-2xl p-6 font-normal italic">
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">"{selectedStudent.motivation}"</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 font-normal">
                  {selectedStudent.areasOfInterest.map((area, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-normal text-gray-600 uppercase tracking-widest shadow-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-normal">
                <button className="flex items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-100 rounded-xl font-normal text-xs uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors">
                  <FileText className="w-4 h-4" /> View resume
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-100 rounded-xl font-normal text-xs uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Portfolio
                </button>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 bg-gray-50 flex items-center justify-between font-normal">
              <button className="px-6 py-3 bg-[#FF7A59] text-white rounded-xl text-xs font-normal uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100">
                Contact student
              </button>
              <button onClick={() => setSelectedStudent(null)} className="px-6 py-3 text-gray-400 hover:text-gray-600 text-xs font-normal uppercase tracking-widest">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
