import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Admission', href: '#admission' },
    { name: 'Success Stories', href: '#work' },
    { name: 'Founder', href: '#founder' },
    { name: 'Portal', href: '#portal', portal: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 h-24 flex items-center">
      <div className="w-full px-8 md:px-12 mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Logo />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-[12px] font-bold tracking-widest uppercase text-zinc-500 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="h-4 w-px bg-zinc-200" />
          <div className="flex items-center gap-3 text-zinc-900 font-bold text-sm tracking-tight">
             <Phone size={16} className="text-blue-600" />
             01334-916900
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 text-white text-[11px] font-bold px-6 py-3 uppercase tracking-widest rounded-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Apply Now
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-900">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-0 w-full bg-white border-b border-zinc-200 p-8 lg:hidden flex flex-col gap-6 shadow-xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-xs font-black tracking-widest uppercase text-zinc-500 hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
          <div className="py-4 border-t border-zinc-100">
            <div className="flex items-center gap-3 text-zinc-900 font-bold text-sm mb-6">
              <Phone size={18} className="text-blue-600" />
              01334-916900
            </div>
            <button className="w-full py-4 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase rounded-sm shadow-xl">
              Apply Now
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
