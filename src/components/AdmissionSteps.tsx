import { motion } from 'motion/react';
import { Search, FileCheck, Send, MapPin } from 'lucide-react';

const steps = [
  {
    icon: <Search className="text-blue-600" size={32} />,
    title: "Initial Consultation",
    desc: "Speak with our experts to find the best destination and course for your career goals."
  },
  {
    icon: <FileCheck className="text-blue-600" size={32} />,
    title: "Application Filing",
    desc: "We help you gather documents and submit your application to your chosen universities."
  },
  {
    icon: <Send className="text-blue-600" size={32} />,
    title: "Visa Processing",
    desc: "Comprehensive guidance for visa interviews and financial documentation support."
  },
  {
    icon: <MapPin className="text-blue-600" size={32} />,
    title: "Pre-Departure",
    desc: "Flight bookings, housing assistance, and briefing before you start your journey."
  }
];

export default function AdmissionSteps() {
  return (
    <section id="admission" className="py-24 border-b border-zinc-200 bg-zinc-50 overflow-hidden">
      <div className="px-8 md:px-12 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-4 block underline decoration-2 underline-offset-8">
              Four Simple Steps
            </span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9]">
              How it <span className="text-zinc-400 font-light">Works</span>
            </h2>
          </div>
          <p className="max-w-sm text-zinc-500 text-sm leading-relaxed">
            Our streamlined process ensures you have the highest chance of success with minimum stress.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 p-12 hover:bg-white transition-all group relative"
            >
              <div className="text-zinc-200 font-black text-6xl absolute top-8 right-8 group-hover:text-blue-100 transition-colors">
                0{i + 1}
              </div>
              <div className="mb-12 relative z-10 transition-transform group-hover:scale-110">
                {step.icon}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">
                {step.desc}
              </p>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
