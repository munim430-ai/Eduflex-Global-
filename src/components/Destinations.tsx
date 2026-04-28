import { motion } from 'motion/react';
import { Plane } from 'lucide-react';

const cities = [
  { name: "Seoul", country: "South Korea", code: "ICN", image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1000&auto=format&fit=crop" },
  { name: "London", country: "United Kingdom", code: "LHR", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop" },
  { name: "Toronto", country: "Canada", code: "YYZ", image: "https://images.unsplash.com/photo-1503106692755-2121af997fe6?q=80&w=1000&auto=format&fit=crop" },
  { name: "Sydney", country: "Australia", code: "SYD", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop" },
  { name: "Berlin", country: "Germany", code: "BER", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1000&auto=format&fit=crop" },
  { name: "New York", country: "USA", code: "JFK", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop" }
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 border-b border-zinc-200">
      <div className="px-8 md:px-12 mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 mb-6">
            Global <span className="font-light not-italic text-zinc-400">Destinations</span>
          </h2>
          <div className="flex items-center gap-4 text-zinc-500 font-bold uppercase text-xs tracking-widest">
            <Plane size={18} className="text-blue-600" /> Choose your path across continents
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] overflow-hidden bg-zinc-900"
            >
              <img 
                src={city.image} 
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-widest block mb-2">
                       {city.country}
                    </span>
                    <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter mb-4">
                      {city.name}
                    </h3>
                  </div>
                  <div className="text-white opacity-20 group-hover:opacity-100 transition-opacity font-mono text-4xl font-black">
                    {city.code}
                  </div>
                </div>
                <button className="w-full py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                  Read Guide
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
