import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Courses from './components/Courses'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Courses />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
