import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: '',
    agreed: false
  });

  const destinations = [
    "Canada", 
    "United Kingdom", 
    "Australia", 
    "South Korea", 
    "Germany", 
    "USA", 
    "Other Europe"
  ];

  const isFormValid = 
    formData.name.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.phone.trim() !== '' && 
    formData.destination !== '' && 
    formData.message.trim() !== '' && 
    formData.agreed;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formData);
      alert('Thank you for your request! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        message: '',
        agreed: false
      });
    }
  };

  return (
    <footer id="contact" className="bg-white border-t border-zinc-200">
      <div className="px-8 md:px-12 py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <Logo className="mb-10" />
            <p className="max-w-md text-zinc-500 text-lg leading-relaxed mb-10">
              Transforming aspirations into achievements through expert educational consultancy and authentic visa services.
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="tel:01334916900" className="flex items-center gap-4 group cursor-pointer hover:no-underline">
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest leading-none mb-1">Call Us Now</p>
                  <p className="text-xl text-zinc-900 font-black group-hover:text-blue-600 transition-colors">01334-916900</p>
                </div>
              </a>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest leading-none mb-1">Email Us</p>
                  <p className="text-zinc-900 font-bold">admission@eduflexglobal.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest leading-none mb-1">Visit Us</p>
                  <p className="text-zinc-900 font-bold">Dhanmondi, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 p-12 border border-zinc-200">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-8">
              Quick <span className="font-light text-zinc-400">Consultation</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="FULL NAME" 
                  className="bg-white border border-zinc-200 p-4 text-[10px] font-black tracking-widest outline-none focus:border-blue-600 uppercase" 
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL ADDRESS" 
                  className="bg-white border border-zinc-200 p-4 text-[10px] font-black tracking-widest outline-none focus:border-blue-600 uppercase" 
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="PHONE NUMBER" 
                  className="bg-white border border-zinc-200 p-4 text-[10px] font-black tracking-widest outline-none focus:border-blue-600 uppercase" 
                  required
                />
                <div className="relative">
                  <select 
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full bg-white border border-zinc-200 p-4 text-[10px] font-black tracking-widest outline-none focus:border-blue-600 uppercase appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>SELECT DESTINATION</option>
                    {destinations.map(d => (
                      <option key={d} value={d}>{d.toUpperCase()}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="HOW CAN WE HELP?" 
                rows={4} 
                className="w-full bg-white border border-zinc-200 p-4 text-[10px] font-black tracking-widest outline-none focus:border-blue-600 uppercase resize-none"
                required
              ></textarea>
              
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="pt-1">
                  <input 
                    type="checkbox" 
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${formData.agreed ? 'bg-blue-600 border-blue-600' : 'bg-white border-zinc-300 group-hover:border-blue-600'}`}>
                    {formData.agreed && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-white -rotate-45 -mt-0.5" />}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                  I agree to the terms and conditions and consent to being contacted by EduFlex Global.
                </span>
              </label>

              <button 
                type="submit"
                disabled={!isFormValid}
                className={`w-full p-5 text-[11px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 shadow-xl ${
                  isFormValid 
                    ? 'bg-zinc-900 text-white hover:bg-blue-600 cursor-pointer' 
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Send Request <MessageSquare size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
              © 2024 EduFlex Global. All rights reserved.
            </p>
            <a 
              href="https://keystone-nextjs-virid.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] font-mono font-black text-zinc-300 hover:text-blue-600 transition-all uppercase tracking-[0.2em]"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-100 group-hover:bg-blue-50 rounded-sm rotate-45 transition-colors" />
                <span className="relative text-[8px] text-zinc-500 group-hover:text-blue-600 font-black">K</span>
              </div>
              Made by <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors underline decoration-zinc-200 underline-offset-4">Keystone Education Software</span>
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600">— the bedrock of smart learning</span>
            </a>
          </div>
          <div className="flex gap-8">
            {['Fb', 'Tw', 'Ln', 'Ig'].map(social => (
              <a key={social} href="#" className="text-[10px] font-mono font-bold text-zinc-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
