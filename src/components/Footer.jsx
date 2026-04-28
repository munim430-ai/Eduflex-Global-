import './Footer.css'

const links = {
  Platform: ['Browse Courses', 'Become an Instructor', 'Enterprise', 'Pricing'],
  Learn: ['Web Development', 'Data Science', 'Design', 'Business'],
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">E</span>
              <span className="logo-text">Eduflex <span>Global</span></span>
            </div>
            <p className="footer-tagline">
              Flexible, world-class education for everyone, everywhere.
            </p>
            <div className="social-links">
              {['Twitter', 'LinkedIn', 'YouTube', 'Instagram'].map(s => (
                <a key={s} href="#" className="social-link" aria-label={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat} className="footer-col">
              <h4 className="footer-heading">{cat}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>© 2024 Eduflex Global. All rights reserved.</p>
          <p>Built with ❤️ for learners worldwide</p>
        </div>
      </div>
    </footer>
  )
}
