import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  BookOpen, 
  Users, 
  Building2, 
  ArrowLeft,
  ArrowUpDown,
  MoreVertical,
  Info,
  Plus,
  Download,
  X,
  ShieldCheck,
  Award
} from 'lucide-react';

// --- Types ---

interface Course {
  id: string;
  name: string;
  discipline: string;
  duration: string;
  institutesCount: number;
  studentCount: number;
  overview: string;
}

// --- Mock Data ---

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    name: 'B.Des Interior Design',
    discipline: 'Interior Design',
    duration: '4 Years',
    institutesCount: 15,
    studentCount: 1240,
    overview: 'This program focuses on creating functional and aesthetically pleasing interior environments, emphasizing material selection, spatial planning, and sustainable practices.'
  },
  {
    id: 'c2',
    name: 'B.Arch',
    discipline: 'Architecture',
    duration: '5 Years',
    institutesCount: 42,
    studentCount: 3500,
    overview: 'The Bachelor of Architecture is a professional degree program that prepares students for the practice of architecture, covering design, theory, history, and technical systems.'
  },
  {
    id: 'c3',
    name: 'B.Des Product Design',
    discipline: 'Product Design',
    duration: '4 Years',
    institutesCount: 12,
    studentCount: 850,
    overview: 'Product Design involves the creation of new products, from conceptualization to manufacturing, with a focus on user needs and technological feasibility.'
  },
  {
    id: 'c4',
    name: 'M.Des Furniture Design',
    discipline: 'Interior Design',
    duration: '2 Years (PG)',
    institutesCount: 5,
    studentCount: 120,
    overview: 'A specialized postgraduate program exploring the advanced aspects of furniture design, material exploration, and manufacturing craftsmanship.'
  },
  {
    id: 'c5',
    name: 'B.Tech Civil Engineering',
    discipline: 'Construction & Materials',
    duration: '4 Years',
    institutesCount: 85,
    studentCount: 12000,
    overview: 'Civil Engineering deals with the design, construction, and maintenance of the physical and naturally built environment, including infrastructure and buildings.'
  }
];

export function CoursesView() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCourses = MOCK_COURSES.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.discipline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCourse) {
    return <CourseDetailPage course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="p-8 space-y-6 font-normal bg-white min-h-full">
      {/* Search, Filters, and Action Buttons Row */}
      <div className="flex flex-col xl:flex-row items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 font-normal">
        {/* Search Bar */}
        <div className="relative flex-1 w-full font-normal">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3] font-normal" />
          <input 
            type="text"
            placeholder="Search by course name or discipline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all placeholder:text-[#98A2B3]"
          />
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-3 w-full xl:w-auto shrink-0 font-normal">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-[#667085] bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-normal uppercase tracking-widest cursor-pointer whitespace-nowrap shadow-sm">
            <Filter className="w-4 h-4 text-[#98A2B3] font-normal" />
            Filters
          </button>
          
          <button 
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[#667085] rounded-xl text-xs font-normal shadow-sm hover:bg-gray-50 transition-all uppercase tracking-widest cursor-pointer whitespace-nowrap"
            onClick={() => alert('Downloading Course Template (Excel/CSV)...')}
          >
            <Download className="w-4 h-4 text-[#98A2B3]" />
            Download Template
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF7A59] text-white rounded-xl text-xs font-normal shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-widest cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm font-normal">
        <div className="overflow-x-auto font-normal">
          <table className="w-full text-left border-collapse font-normal">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-4 text-[10px] font-normal text-[#98A2B3] uppercase tracking-[0.2em]">Course Name</th>
                <th className="px-8 py-4 text-[10px] font-normal text-[#98A2B3] uppercase tracking-[0.2em]">Discipline</th>
                <th className="px-8 py-4 text-[10px] font-normal text-[#98A2B3] uppercase tracking-[0.2em]">Duration</th>
                <th className="px-8 py-4 text-[10px] font-normal text-[#98A2B3] uppercase tracking-[0.2em]">Offered By</th>
                <th className="px-8 py-4 text-[10px] font-normal text-[#98A2B3] uppercase tracking-[0.2em]">Enrollment</th>
                <th className="px-8 py-4 w-10 font-normal"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-normal">
              {filteredCourses.map((course) => (
                <tr 
                  key={course.id} 
                  onClick={() => setSelectedCourse(course)}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer group font-normal"
                >
                  <td className="px-8 py-5 font-normal">
                    <div className="flex items-center gap-3 font-normal">
                      <div className="w-10 h-10 rounded-lg bg-[#F9FAFB] flex items-center justify-center text-[#98A2B3] border border-[#F2F4F7] font-normal group-hover:bg-[#FF7A59]/5 group-hover:text-[#FF7A59] group-hover:border-[#FF7A59]/10 transition-colors">
                        <BookOpen className="w-5 h-5 font-normal" strokeWidth={1.5} />
                      </div>
                      <span className="text-[14px] font-normal text-[#101828] group-hover:text-[#FF7A59] transition-colors leading-tight uppercase tracking-tight">{course.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-normal">
                    <span className="text-[13px] text-[#667085] font-normal uppercase tracking-tight">{course.discipline}</span>
                  </td>
                  <td className="px-8 py-5 font-normal">
                    <span className="text-[13px] text-[#98A2B3] font-normal uppercase tracking-tight">{course.duration}</span>
                  </td>
                  <td className="px-8 py-5 font-normal">
                    <div className="flex items-center gap-2 text-[#101828] font-normal">
                      <Building2 className="w-3.5 h-3.5 text-[#98A2B3] font-normal" />
                      <span className="text-[13px] font-normal uppercase tracking-tight">{course.institutesCount} <span className="text-[11px] text-[#98A2B3] uppercase tracking-widest ml-1 font-normal">Institutes</span></span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-normal">
                    <div className="flex items-center gap-2 text-[#101828] font-normal">
                      <Users className="w-3.5 h-3.5 text-[#98A2B3] font-normal" />
                      <span className="text-[13px] font-normal uppercase tracking-tight">{course.studentCount.toLocaleString()} <span className="text-[11px] text-[#98A2B3] uppercase tracking-widest ml-1 font-normal">Students</span></span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-normal">
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF7A59] transition-colors inline-block font-normal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCourses.length === 0 && (
          <div className="py-24 text-center font-normal">
            <BookOpen className="w-12 h-12 text-gray-100 mx-auto mb-4 font-normal" />
            <p className="text-[#98A2B3] font-normal uppercase tracking-widest">No courses found</p>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
           <div className="bg-white rounded-3xl w-full max-w-2xl h-fit overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between font-normal">
                 <h3 className="text-sm font-normal text-[#101828] uppercase tracking-widest">Add New Course</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 cursor-pointer"><X className="w-5 h-5 font-normal" /></button>
              </div>
              <div className="p-10 space-y-8 font-normal">
                 <div className="space-y-2 font-normal">
                    <label className="text-[10px] text-[#98A2B3] uppercase tracking-widest ml-1 font-normal">Course Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] transition-all" placeholder="e.g. B.Des Interior Design" />
                 </div>
                 <div className="grid grid-cols-2 gap-6 font-normal">
                   <div className="space-y-2 font-normal">
                      <label className="text-[10px] text-[#98A2B3] uppercase tracking-widest ml-1 font-normal">Discipline</label>
                      <select className="w-full px-5 py-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl text-sm outline-none transition-all cursor-pointer">
                        <option>Interior Design</option>
                        <option>Architecture</option>
                        <option>Product Design</option>
                        <option>Fashion Design</option>
                      </select>
                   </div>
                   <div className="space-y-2 font-normal">
                      <label className="text-[10px] text-[#98A2B3] uppercase tracking-widest ml-1 font-normal">Duration</label>
                      <input type="text" className="w-full px-5 py-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] transition-all" placeholder="e.g. 4 Years" />
                   </div>
                 </div>
              </div>
              <div className="px-10 py-8 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-4 font-normal">
                 <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 text-[#98A2B3] hover:text-[#667085] text-[11px] font-normal uppercase tracking-widest cursor-pointer transition-colors">Cancel</button>
                 <button className="px-10 py-3 bg-[#FF7A59] text-white rounded-xl text-[11px] font-normal uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all cursor-pointer">Create Course</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function CourseDetailPage({ course, onBack }: { course: Course, onBack: () => void }) {
  return (
    <div className="p-8 space-y-6 font-normal bg-gray-50/30 min-h-full overflow-y-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] text-[#667085] hover:text-[#FF7A59] transition-colors font-normal uppercase tracking-widest cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 font-normal" />
        Back to Courses
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start font-normal">
        <div className="lg:col-span-2 space-y-6 font-normal">
          {/* Course Overview Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-8 font-normal">
            <div className="flex items-start justify-between font-normal">
              <div className="space-y-4 font-normal">
                <div className="flex items-center gap-4 font-normal">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF7A59]/10 flex items-center justify-center text-[#FF7A59] font-normal">
                    <BookOpen className="w-7 h-7 font-normal" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-normal text-[#101828] uppercase tracking-tight leading-tight">{course.name}</h1>
                    <p className="text-[11px] text-[#98A2B3] uppercase tracking-[0.2em] mt-1 font-normal">{course.discipline} • {course.duration}</p>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#F0F9FF] text-[#0066CC] border border-[#B9E6FE] rounded-full text-[10px] font-normal uppercase tracking-widest">Priority Course</span>
            </div>

            <div className="pt-8 border-t border-gray-50 font-normal">
              <p className="text-[11px] text-[#98A2B3] uppercase tracking-[0.2em] mb-4 font-normal">Course Overview</p>
              <p className="text-[14px] text-[#667085] leading-relaxed font-normal">{course.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 font-normal border-t border-gray-50">
              <div className="space-y-1 font-normal">
                <p className="text-[10px] text-[#98A2B3] uppercase tracking-widest font-normal">Total Associated Institutes</p>
                <div className="flex items-center gap-2 font-normal">
                  <span className="text-2xl font-normal text-[#101828]">{course.institutesCount}</span>
                  <Building2 className="w-4 h-4 text-[#98A2B3] font-normal" />
                </div>
              </div>
              <div className="space-y-1 font-normal">
                <p className="text-[10px] text-[#98A2B3] uppercase tracking-widest font-normal">Total Enrolled Students</p>
                <div className="flex items-center gap-2 font-normal">
                  <span className="text-2xl font-normal text-[#101828]">{course.studentCount.toLocaleString()}</span>
                  <Users className="w-4 h-4 text-[#98A2B3] font-normal" />
                </div>
              </div>
            </div>
          </div>

          {/* Affiliated Body Section */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6 font-normal">
            <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.2em]">Affiliated Body</h3>
            <div className="flex flex-wrap gap-4 font-normal">
              {[
                { name: 'UGC', sub: 'Statutory Authority' },
                { name: 'AICTE', sub: 'Government Body' },
                { name: 'Ministry of Education', sub: 'Govt. of India' }
              ].map((body, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-[#FF7A59]/20 transition-all cursor-default min-w-[200px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#FF7A59]">
                    <ShieldCheck className="w-5 h-5 font-normal" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[13px] font-normal text-[#101828] uppercase tracking-tight">{body.name}</p>
                    <p className="text-[10px] text-[#98A2B3] uppercase tracking-widest font-normal mt-0.5">{body.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offering Institutes Section */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm font-normal">
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between font-normal">
              <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-widest">Offering Institutes</h3>
              <span className="text-[11px] text-[#98A2B3] font-normal uppercase tracking-widest">Top Partners</span>
            </div>
            <div className="divide-y divide-gray-50 font-normal">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-default font-normal">
                  <div className="flex items-center gap-4 font-normal">
                    <div className="w-10 h-10 rounded-lg bg-[#F9FAFB] flex items-center justify-center text-[#98A2B3] uppercase text-[10px] font-normal border border-[#F2F4F7]">Inst</div>
                    <div className="font-normal">
                      <h4 className="text-sm font-normal text-[#101828] uppercase tracking-tight">Academic Institute {i}</h4>
                      <p className="text-[11px] text-[#98A2B3] uppercase tracking-widest mt-0.5 font-normal">Location, State • 245 Students</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-200 hover:text-[#FF7A59] transition-colors font-normal">
                    <ChevronRight className="w-5 h-5 font-normal" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 font-normal">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6 font-normal">
            <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.2em] mb-6">Strategic Actions</h3>
            <div className="space-y-4 font-normal">
              <button className="w-full py-3.5 bg-[#FF7A59] text-white rounded-xl text-[11px] font-normal shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer">
                <Users className="w-4 h-4 font-normal" />
                View Enrolled Students
              </button>
              <button className="w-full py-3.5 bg-white border border-gray-200 text-[#667085] rounded-xl text-[11px] font-normal hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer">
                <ArrowUpDown className="w-4 h-4 font-normal" />
                Sort by Performance
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6 font-normal">
            <h3 className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.2em] flex items-center gap-2 font-normal">
              <Info className="w-3.5 h-3.5 font-normal" />
              Course Metadata
            </h3>
            <div className="space-y-4 font-normal">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 font-normal">
                <span className="text-[11px] text-[#98A2B3] uppercase tracking-widest font-normal">Added On</span>
                <span className="text-[12px] text-[#101828] font-normal uppercase tracking-tight font-normal">Dec 12, 2025</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 font-normal">
                <span className="text-[11px] text-[#98A2B3] uppercase tracking-widest font-normal">Last Updated</span>
                <span className="text-[12px] text-[#101828] font-normal uppercase tracking-tight font-normal">Jan 24, 2026</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 font-normal">
                <span className="text-[11px] text-[#98A2B3] uppercase tracking-widest font-normal">Status</span>
                <span className="text-[11px] px-2 py-0.5 bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6] rounded-full font-normal uppercase tracking-tight font-normal">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
