import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, GraduationCap, Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const stats = [
    { label: 'Success Rate', value: '100%' },
    { label: 'Students Placed', value: '500+' },
    { label: 'Partner Unis', value: '150+' },
    { label: 'Countries', value: '6+' },
  ];

  const destinations = ["Canada", "UK", "Australia", "South Korea", "Europe", "USA"];

  return (
    <section ref={containerRef} className="relative min-h-screen pt-24 overflow-hidden bg-white">
      {/* 3D Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-40 right-[10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 left-[5%] w-96 h-96 bg-zinc-50 rounded-full blur-3xl opacity-50 -z-10" 
      />

      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Content */}
        <div className="w-full lg:w-3/5 p-8 md:p-20 xl:p-24 flex flex-col justify-center border-r border-zinc-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                EduFlex Global // Your Compass to Success
              </span>
              <div className="h-px w-12 bg-blue-200" />
            </div>
            
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.85] text-zinc-900 mb-8 uppercase italic">
              Your Dream <br />
              <span className="font-light not-italic text-zinc-400">Education</span> <br />
              <span className="text-blue-600">Starts Here.</span>
            </h1>
            
            <p className="max-w-lg text-zinc-500 leading-relaxed text-lg mb-10">
              EduFlex is your trusted partner for authentic visa services. Our approach is centered on you, prioritizing your academic goals and career aspirations across the globe.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-zinc-900 text-white text-[11px] font-black px-8 py-5 uppercase tracking-widest rounded-sm hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-3">
                Free Consultation <ArrowRight size={16} />
              </button>
              <button className="border border-zinc-200 text-zinc-900 text-[11px] font-black px-8 py-5 uppercase tracking-widest rounded-sm hover:bg-zinc-50 transition-colors">
                Explore Programs
              </button>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                <ShieldCheck size={16} className="text-blue-600" /> 100% Transparency
              </div>
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                <Globe2 size={16} className="text-blue-600" /> Global Network
              </div>
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                <CheckCircle2 size={16} className="text-blue-600" /> End-to-End Support
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content / Interactive Section */}
        <div className="w-full lg:w-2/5 bg-zinc-50 relative flex flex-col items-center justify-center p-8 overflow-hidden">
          {/* Animated 3D Elements Placeholder */}
          <div className="relative w-full aspect-square max-w-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-zinc-200 rounded-full border-dashed"
            />
             <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border-[1px] border-zinc-200 rounded-full border-dashed"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-12 bg-blue-600/10 blur-3xl rounded-full" />
                <GraduationCap size={120} className="text-blue-600 relative z-10" strokeWidth={1} />
              </motion.div>
            </div>

            {/* Floating Destinations */}
            {destinations.map((city, i) => (
              <motion.div
                key={city}
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4 + i, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="absolute bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-xl text-[10px] font-bold uppercase tracking-widest text-zinc-900"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: i % 2 === 0 ? '-10%' : '70%',
                }}
              >
                {city}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 w-full gap-1 border-t border-zinc-200 bg-zinc-200">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-zinc-50 p-8 flex flex-col"
              >
                <span className="text-4xl font-black text-zinc-900 mb-1">{stat.value}</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
