import { motion } from 'motion/react';
import StudentPortal from './Portal/StudentPortal';

export default function PortalSection() {
  return (
    <section id="portal" className="py-24 px-8 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">
             EduFlex Student Services
          </span>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-8">
            Student <span className="text-zinc-400 font-light italic">Portal</span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-500 text-sm md:text-lg leading-relaxed">
            Access your application status, track embassy appointments, and download admission guides in our unified student dashboard.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <StudentPortal />
        </div>
      </div>
    </section>
  );
}
