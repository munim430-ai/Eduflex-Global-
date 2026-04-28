import './Features.css'

const features = [
  { icon: '🎓', title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience at top companies worldwide.' },
  { icon: '📱', title: 'Learn Anywhere', desc: 'Access your courses on any device — desktop, tablet, or mobile — whenever you want.' },
  { icon: '🏆', title: 'Recognized Certificates', desc: 'Earn certificates trusted by thousands of employers globally to boost your career.' },
  { icon: '🔄', title: 'Lifetime Access', desc: 'Buy once, access forever. Including all future updates and new course materials.' },
  { icon: '🤝', title: 'Community Support', desc: 'Join a vibrant community of learners and get help from peers and instructors 24/7.' },
  { icon: '📊', title: 'Track Your Progress', desc: 'Detailed analytics help you stay on track and celebrate every milestone achieved.' },
]

export default function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="container">
        <h2 className="section-title">Why Choose Eduflex Global?</h2>
        <p className="section-subtitle">
          Everything you need to succeed in your learning journey, all in one place
        </p>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
