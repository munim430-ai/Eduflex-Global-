import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import Founder from './components/Founder';
import AdmissionSteps from './components/AdmissionSteps';
import PortalSection from './components/PortalSection';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <main className="w-full bg-white text-zinc-900 scroll-smooth relative">
        <Navbar />
        <Hero />
        <Destinations />
        <Features />
        <AdmissionSteps />
        <Portfolio />
        <Founder />
        <PortalSection />
        <Footer />
        
        {/* Floating WhatsApp */}
        <a 
          href="https://wa.me/8801334916900" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:bg-green-600"
        >
          <MessageCircle size={28} />
        </a>
      </main>
    </AuthProvider>
  );
}
