import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>
      <div className="container hero-content">
        <div className="hero-badge">
          <span>🌍</span> Now Available in 150+ Countries
        </div>
        <h1 className="hero-title">
          Learn Without <span className="gradient-text">Limits</span> with<br />
          Eduflex Global
        </h1>
        <p className="hero-subtitle">
          Access world-class courses from top instructors, earn recognized certificates,
          and advance your career — all at your own pace, from anywhere in the world.
        </p>
        <div className="hero-actions">
          <a href="#courses" className="btn btn-primary">Explore Courses</a>
          <a href="#features" className="btn btn-outline">How It Works</a>
        </div>
        <div className="hero-trust">
          <div className="trust-avatars">
            {['A','B','C','D','E'].map((l, i) => (
              <div key={i} className="avatar" style={{background: `hsl(${i*60},70%,55%)`}}>{l}</div>
            ))}
          </div>
          <p><strong>500,000+</strong> learners already enrolled</p>
        </div>
      </div>
    </section>
  )
}
