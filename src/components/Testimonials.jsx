import './Testimonials.css'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    initials: 'PS',
    color: '#6366f1',
    text: 'Eduflex Global completely transformed my career. I went from a beginner to landing a job at Google in just 8 months. The curriculum is world-class!',
  },
  {
    name: 'Carlos Mendez',
    role: 'UX Designer at Adobe',
    initials: 'CM',
    color: '#ec4899',
    text: 'The UI/UX Design course is absolutely incredible. The projects were practical and the instructor feedback was invaluable. Worth every minute!',
  },
  {
    name: 'Amara Osei',
    role: 'Data Scientist at Microsoft',
    initials: 'AO',
    color: '#0891b2',
    text: 'As someone from Ghana, having access to this quality of education online has been life-changing. The community is supportive and the content is top-tier.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Learners Say</h2>
        <p className="section-subtitle">
          Real stories from real people who transformed their lives with Eduflex Global
        </p>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
