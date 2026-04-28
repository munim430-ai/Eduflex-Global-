import { motion } from 'motion/react';
import { Quote, Linkedin, Facebook, Mail, GraduationCap, MapPin, Languages, ArrowRight, Phone } from 'lucide-react';

export default function Founder() {
  return (
    <section id="founder" className="py-24 px-8 md:px-12 bg-zinc-950 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-800 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-white/5 bg-zinc-900">
              <img 
                src="/Eduflex-Global-/founder.jpg"
                alt="Emdadur Rahman - Founder" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 text-blue-400 mb-3">
                   <div className="w-8 h-px bg-blue-500" />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em]">The Visionary</p>
                </div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Emdadur Rahman</h3>
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-2">Founder & Strategic Lead</p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="space-y-6">
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.6em] font-black block">
                Executive Leadership
              </span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                Bridging <span className="text-zinc-600 font-light italic">World</span> <br /> 
                <span className="text-blue-600 italic">Class</span> Talent
              </h2>
            </div>

            <div className="relative">
              <div className="absolute -left-12 -top-4 opacity-5 hidden xl:block">
                <Quote size={120} className="text-white" />
              </div>
              <p className="text-xl md:text-2xl font-black italic leading-tight text-white mb-8">
                "EduFlex Global was born from a simple mission: to ensure that no student's potential is limited by their geography. Our bedrock is transparency and personalized mentorship."
              </p>
              
              <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                <p>
                  As an alumnus of <span className="text-white font-bold">Kyungdong University</span>, Emdadur Rahman built EduFlex upon the principles of cross-border educational excellence.
                </p>
                <p>
                  Now based in <span className="text-white font-bold">Winnipeg, Manitoba</span>, he leverages his multi-cultural experience and linguistic proficiency in <span className="text-blue-500 font-bold">Bangla, Arabic, Urdu, and English</span> to guide the next generation of global scholars.
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-white/5">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">Education</p>
                <p className="text-xs font-black text-white uppercase tracking-tight">KDU Graduate</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">Official Phone</p>
                <p className="text-xl font-black text-blue-500 uppercase tracking-tight">01334-916900</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">Expertise</p>
                <p className="text-xs font-black text-white uppercase tracking-tight">Canada / S. Korea</p>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">Languages</p>
                <p className="text-xs font-black text-white uppercase tracking-tight">Polyglot Multi-Lang</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-10">
              <div className="flex flex-wrap items-center gap-6">
                <a href="tel:01334916900" className="text-zinc-500 hover:text-blue-500 transition-colors uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
                  <Phone size={16} /> 01334-916900
                </a>
                <a href="mailto:admission@eduflexglobal.com" className="text-zinc-500 hover:text-blue-500 transition-colors uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
                  <Mail size={16} /> Contact Email
                </a>
                <a href="#" className="text-zinc-500 hover:text-blue-500 transition-colors uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="#" className="text-zinc-500 hover:text-blue-600 transition-colors uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
                  <Facebook size={16} /> Facebook
                </a>
              </div>
              
              <button className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded flex items-center gap-3">
                Book Consultation <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
