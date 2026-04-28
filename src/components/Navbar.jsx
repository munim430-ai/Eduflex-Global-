import { useState } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="logo">
          <span className="logo-icon">E</span>
          <span className="logo-text">Eduflex <span>Global</span></span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
          <li><a href="#" className="btn btn-primary">Get Started</a></li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
