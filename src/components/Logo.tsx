import { motion } from 'motion/react';
import { GraduationCap, Compass } from 'lucide-react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div 
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-10 h-10 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-45" />
        <GraduationCap className="relative z-10 text-white w-6 h-6" />
      </motion.div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter uppercase italic text-zinc-900 leading-none">
          Edu<span className="text-blue-600">Flex</span>
        </span>
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 mt-1">
          Global
        </span>
      </div>
    </div>
  );
}
