import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const students = [
  {
    name: "Munim Ahmed",
    destination: "South Korea",
    university: "Yonsei University",
    program: "KLP + Bachelor",
    year: "2024",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Sadia Islam",
    destination: "Canada",
    university: "University of Toronto",
    program: "Masters in CS",
    year: "2023",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tanvir Hossain",
    destination: "Australia",
    university: "Monash University",
    program: "Bachelor of Business",
    year: "2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Nusrat Jahan",
    destination: "UK",
    university: "King's College London",
    program: "MSc Finance",
    year: "2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Portfolio() {
  return (
    <section id="work" className="border-b border-zinc-200 bg-white">
      <div className="p-12 md:p-24 border-b border-zinc-200">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 mb-6">
          Visa Success <span className="font-light not-italic text-zinc-400">Stories</span>
        </h2>
        <p className="max-w-xl text-zinc-500 text-lg">
          Meet some of our successful students who are now pursuing their dreams in world-class institutions across the globe.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {students.map((student, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden bg-zinc-100 ${
              i !== students.length - 1 ? 'border-b md:border-b-0 md:border-r border-zinc-200' : ''
            }`}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={student.image} 
                alt={student.name}
                className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
               <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-blue-500 text-[10px] font-mono font-bold uppercase tracking-widest">
                    {student.destination} • {student.year}
                  </span>
                  <h4 className="text-white font-black uppercase text-lg leading-tight tracking-tight">
                    {student.name}
                  </h4>
                  <p className="text-zinc-400 text-xs font-medium">
                    {student.university}
                  </p>
                </div>
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white">
                  <ArrowUpRight size={18} />
                </div>
               </div>
            </div>

            <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur font-mono text-[9px] font-black uppercase tracking-widest text-zinc-900">
              {student.program}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
