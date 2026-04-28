import { motion } from 'motion/react';
import { GraduationCap, FileText, Globe, Headset, PlaneLanding, Users } from 'lucide-react';

const services = [
  {
    icon: <GraduationCap size={24} />,
    title: "University Admission",
    desc: "Complete support for Bachelor's, Master's, and PhD programs in world-class universities.",
    highlight: false
  },
  {
    icon: <FileText size={24} />,
    title: "Visa Documentation",
    desc: "Expert guidance for hassle-free visa processing with a 100% success record.",
    highlight: true
  },
  {
    icon: <Headset size={24} />,
    title: "Embassy Preparation",
    desc: "Mock interviews and detailed guidance to help you face the embassy with confidence.",
    highlight: false
  },
  {
    icon: <PlaneLanding size={24} />,
    title: "Pre-Departure Support",
    desc: "Guidance on travel, accommodation, and essential tips for your new life abroad.",
    highlight: false
  },
  {
    icon: <Globe size={24} />,
    title: "Language Training",
    desc: "IELTS, TOPIK, and language proficiency courses to meet admission requirements.",
    highlight: true
  },
  {
    icon: <Users size={24} />,
    title: "Post-Arrival Support",
    desc: "We stay connected even after you land, helping you settle in your new destination.",
    highlight: false
  }
];

export default function Features() {
  return (
    <section id="services" className="border-b border-zinc-200">
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-12 md:p-16 flex flex-col gap-8 border-zinc-200 transition-all group hover:z-10 ${
              i % 3 !== 2 ? 'lg:border-r' : ''
            } border-b ${s.highlight ? 'bg-zinc-900 text-white shadow-2xl scale-[1.02]' : 'bg-white text-zinc-900 hover:bg-zinc-50'}`}
          >
            <div className={`w-12 h-12 border flex items-center justify-center text-xs font-bold font-mono transition-transform group-hover:rotate-12 ${
              s.highlight ? 'border-blue-600 text-blue-600' : 'border-zinc-900 text-zinc-900'
            }`}>
              {s.icon}
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest text-sm mb-4">{s.title}</h3>
              <p className={`text-sm leading-relaxed ${s.highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
