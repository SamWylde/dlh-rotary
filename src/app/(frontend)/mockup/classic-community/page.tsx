'use client'

const events = [
  { title: 'Weekly Club Meeting', date: 'Mar 4, 2026', time: '5:30 PM', icon: '🤝' },
  { title: 'Flags of Honor — Label Plaques', date: 'May 5, 2026', time: '5:30 PM', icon: '🇺🇸' },
  { title: 'Flags of Honor — Installation', date: 'May 22, 2026', time: '9:00 AM', icon: '🏴' },
  { title: 'Cash Bingo (Rescheduled)', date: 'Sep 20, 2026', time: '1:00 PM', icon: '🎯' },
]

const announcements = [
  {
    title: 'Welcome to Our New Website!',
    date: 'Feb 25, 2026',
    excerpt:
      "We're excited to launch our new online home for the Rotary Club of Downtown Lock Haven.",
  },
  {
    title: "Flags of Honor 2026 — Celebrating America's 250th!",
    date: 'Feb 24, 2026',
    excerpt: 'This Memorial Day marks a special milestone as we honor those who served.',
  },
  {
    title: 'DLH Rotary Featured in The Express',
    date: 'Feb 14, 2026',
    excerpt: "Our Valentine's delivery to first responders made the front page!",
  },
]

const projects = [
  { name: 'Little Red Schoolhouse Libraries', desc: 'Free book stations around town', icon: '📚' },
  { name: 'Flags of Honor', desc: 'Memorial Day tribute in Triangle Park', icon: '🇺🇸' },
  { name: 'Angel Lights', desc: '9/11 remembrance luminaries', icon: '🕯️' },
  {
    name: "Valentine's Treats for Heroes",
    desc: 'Goody trays to 14 first-responder stops',
    icon: '💝',
  },
  {
    name: 'CMHS Scholarships',
    desc: 'Three memorial scholarships for graduating seniors',
    icon: '🎓',
  },
  { name: 'Boxes of Hope', desc: 'Care packages for women battling cancer', icon: '📦' },
]

export default function ClassicCommunityMockup() {
  return (
    <div
      style={{
        fontFamily: "'Libre Baskerville', 'Georgia', serif",
        color: '#1a1a2e',
        background: '#faf9f6',
        /* Reset the parent layout padding */
        margin: '-32px -16px',
        width: 'calc(100% + 32px)',
      }}
    >
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #003DA5 0%, #001f5c 60%, #000d2b 100%)',
          padding: '80px 40px 70px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(247,168,27,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(247,168,27,0.05)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#F7A81B',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Service Above Self
          </div>
          <h1
            style={{
              fontSize: 42,
              color: '#fff',
              margin: '0 0 16px',
              lineHeight: 1.2,
              fontWeight: 700,
            }}
          >
            Rotary Club of
            <br />
            Downtown Lock Haven
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 17,
              maxWidth: 520,
              margin: '0 auto 32px',
              lineHeight: 1.6,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Together, we inspire. Community projects, scholarships, and weekly fellowship serving
            Clinton County for over 22 years.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span
              style={{
                background: '#F7A81B',
                color: '#1a1a2e',
                padding: '12px 28px',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              Join Us
            </span>
            <span
              style={{
                border: '2px solid rgba(255,255,255,0.4)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: 4,
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              View Projects
            </span>
          </div>
        </div>
      </div>

      {/* Meeting bar */}
      <div
        style={{
          background: '#F7A81B',
          padding: '14px 40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: '#1a1a2e',
        }}
      >
        <span>📍 Every Tuesday at 5:30 PM</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Poorman Gallery, 352 E. Water St., Lock Haven, PA</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Social time starts at 5:15</span>
      </div>

      {/* About */}
      <div
        style={{ maxWidth: 800, margin: '0 auto', padding: '56px 40px 40px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 28, color: '#003DA5', marginBottom: 16 }}>Who We Are</h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: '#555',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          We&apos;re neighbors, friends, and community leaders who come together each week to create
          positive, lasting change — locally and around the world. For over 22 years, the Rotary
          Club of Downtown Lock Haven has served Clinton County through community projects,
          scholarships, and fellowship. All are welcome.
        </p>
      </div>

      {/* Events + Announcements side by side */}
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '20px 40px 56px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 22,
              color: '#003DA5',
              marginBottom: 20,
              borderBottom: '2px solid #F7A81B',
              paddingBottom: 8,
              display: 'inline-block',
            }}
          >
            Upcoming Events
          </h2>
          {events.map((e, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 0',
                borderBottom: '1px solid #e8e6e1',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontSize: 24, lineHeight: 1 }}>{e.icon}</div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#1a1a2e',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {e.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#888',
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: 2,
                  }}
                >
                  {e.date} · {e.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2
            style={{
              fontSize: 22,
              color: '#003DA5',
              marginBottom: 20,
              borderBottom: '2px solid #F7A81B',
              paddingBottom: 8,
              display: 'inline-block',
            }}
          >
            Latest Announcements
          </h2>
          {announcements.map((a, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #e8e6e1' }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#1a1a2e',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {a.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#999',
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: 2,
                }}
              >
                {a.date}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#666',
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: 6,
                  lineHeight: 1.5,
                }}
              >
                {a.excerpt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div style={{ background: '#fff', padding: '56px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2
            style={{ fontSize: 28, color: '#003DA5', textAlign: 'center', marginBottom: 32 }}
          >
            What We Do
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {projects.map((p, i) => (
              <div
                key={i}
                style={{
                  background: '#faf9f6',
                  border: '1px solid #e8e6e1',
                  borderRadius: 8,
                  padding: 24,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#1a1a2e',
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 6,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#777',
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facebook CTA */}
      <div style={{ background: '#003DA5', padding: '48px 40px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 12 }}>Stay Connected</h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            marginBottom: 24,
          }}
        >
          Follow us on Facebook for photos, event updates, and community news.
        </p>
        <div style={{ display: 'inline-flex', gap: 16 }}>
          <span
            style={{
              background: '#F7A81B',
              color: '#1a1a2e',
              padding: '12px 28px',
              borderRadius: 4,
              fontWeight: 700,
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer',
            }}
          >
            📘 Follow on Facebook
          </span>
          <span
            style={{
              border: '2px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: 4,
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer',
            }}
          >
            ✉️ Contact Us
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: '#0a0a1a',
          color: 'rgba(255,255,255,0.5)',
          padding: '32px 40px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>
            Rotary Club of Downtown Lock Haven
          </div>
          <div>PO Box 634, Lock Haven, PA 17745</div>
          <div>📞 (814) 571-5324 · ✉️ dlhrotary@gmail.com</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Rotary District 7360 · Rotary International</div>
          <div style={{ marginTop: 4 }}>© 2026 Rotary Club of Downtown Lock Haven</div>
        </div>
      </footer>
    </div>
  )
}
