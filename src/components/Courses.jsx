import './Courses.css'

const courses = [
  {
    emoji: '💻',
    tag: 'Technology',
    tagColor: '#dbeafe',
    tagText: '#2563eb',
    title: 'Full-Stack Web Development Bootcamp',
    instructor: 'Dr. Sarah Mitchell',
    rating: 4.9,
    students: '42K',
    duration: '48h',
    level: 'Beginner',
  },
  {
    emoji: '📊',
    tag: 'Business',
    tagColor: '#d1fae5',
    tagText: '#059669',
    title: 'Data Science & Machine Learning Fundamentals',
    instructor: 'Prof. James Chen',
    rating: 4.8,
    students: '35K',
    duration: '36h',
    level: 'Intermediate',
  },
  {
    emoji: '🎨',
    tag: 'Design',
    tagColor: '#ede9fe',
    tagText: '#7c3aed',
    title: 'UI/UX Design Masterclass: From Zero to Pro',
    instructor: 'Maria Rodriguez',
    rating: 4.9,
    students: '28K',
    duration: '30h',
    level: 'All Levels',
  },
  {
    emoji: '📈',
    tag: 'Marketing',
    tagColor: '#fef3c7',
    tagText: '#d97706',
    title: 'Digital Marketing & Growth Hacking',
    instructor: 'Alex Thompson',
    rating: 4.7,
    students: '19K',
    duration: '22h',
    level: 'Beginner',
  },
  {
    emoji: '🔐',
    tag: 'Security',
    tagColor: '#fee2e2',
    tagText: '#dc2626',
    title: 'Cybersecurity: Ethical Hacking & Defense',
    instructor: 'Dr. Kevin Park',
    rating: 4.8,
    students: '15K',
    duration: '40h',
    level: 'Advanced',
  },
  {
    emoji: '🤖',
    tag: 'AI',
    tagColor: '#e0f2fe',
    tagText: '#0284c7',
    title: 'Artificial Intelligence & Deep Learning',
    instructor: 'Prof. Aisha Nkosi',
    rating: 4.9,
    students: '31K',
    duration: '52h',
    level: 'Intermediate',
  },
]

function Stars({ rating }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span className="rating-num">{rating}</span>
    </span>
  )
}

export default function Courses() {
  return (
    <section id="courses" className="section courses-section">
      <div className="container">
        <h2 className="section-title">Top-Rated Courses</h2>
        <p className="section-subtitle">
          Learn from industry experts and gain the skills employers are looking for
        </p>
        <div className="courses-grid">
          {courses.map(c => (
            <div key={c.title} className="course-card">
              <div className="course-emoji">{c.emoji}</div>
              <div className="course-body">
                <span
                  className="tag"
                  style={{ background: c.tagColor, color: c.tagText }}
                >{c.tag}</span>
                <h3 className="course-title">{c.title}</h3>
                <p className="course-instructor">by {c.instructor}</p>
                <div className="course-meta">
                  <Stars rating={c.rating} />
                  <span className="meta-dot">·</span>
                  <span>{c.students} students</span>
                  <span className="meta-dot">·</span>
                  <span>{c.duration}</span>
                </div>
                <div className="course-footer">
                  <span className="course-level">{c.level}</span>
                  <a href="#" className="btn btn-primary btn-sm">Enroll Free</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
