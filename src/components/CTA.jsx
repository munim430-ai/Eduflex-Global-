import './CTA.css'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <h2 className="cta-title">Start Your Learning Journey Today</h2>
        <p className="cta-subtitle">
          Join over 500,000 learners worldwide. Sign up for free and get instant
          access to hundreds of courses.
        </p>
        <div className="cta-actions">
          <a href="#courses" className="btn btn-white">Browse Courses</a>
          <a href="#" className="btn btn-outline-white">Sign Up Free</a>
        </div>
        <p className="cta-note">No credit card required · Cancel anytime · 30-day money-back guarantee</p>
      </div>
    </section>
  )
}
