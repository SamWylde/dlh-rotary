import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Join Us | Rotary Club of Downtown Lock Haven',
  description:
    'Join the Rotary Club of Downtown Lock Haven. Weekly meetings every Tuesday at 5:30 PM at the Poorman Gallery. All are welcome.',
}

export default function JoinPage() {
  return (
    <div className="-mt-8 -mb-8">
      {/* Hero */}
      <section
        className="full-bleed relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 60%, var(--color-primary-deep) 100%)',
          padding: '70px 40px 60px',
          textAlign: 'center',
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            top: '-60px',
            right: '-60px',
            width: '300px',
            height: '300px',
            background: 'var(--color-decorative-light)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            bottom: '-40px',
            left: '-40px',
            width: '200px',
            height: '200px',
            background: 'var(--color-decorative-lighter)',
          }}
        />
        <div className="relative" style={{ zIndex: 1 }}>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            People of Action
          </p>
          <h1
            style={{
              fontSize: '38px',
              color: 'var(--color-on-dark)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Join Our Club
          </h1>
          <p
            style={{
              color: 'var(--color-on-dark-75)',
              fontSize: '17px',
              maxWidth: '540px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
            }}
          >
            Whether you&apos;re looking to give back, build friendships, or make a difference in
            Clinton County &mdash; you belong here. Our meetings are open, and visitors are always welcome.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                background: 'var(--color-secondary)',
                color: 'var(--color-secondary-foreground)',
                padding: '12px 28px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
            >
              Get in Touch
            </Link>
            <Link
              href="/projects"
              style={{
                border: '2px solid var(--color-on-dark-40)',
                color: 'var(--color-on-dark)',
                padding: '12px 28px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                background: 'transparent',
              }}
            >
              See What We Do
            </Link>
          </div>
        </div>
      </section>

      {/* Meeting Info Bar */}
      <div
        className="full-bleed"
        style={{
          background: 'var(--color-secondary)',
          padding: '14px 40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            color: 'var(--color-secondary-foreground)',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}
        >
          <span>📅 Every Tuesday at 5:30 PM</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>📍 Poorman Gallery, 352 E. Water St., Lock Haven</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>☕ Social time starts at 5:15</span>
        </div>
      </div>

      {/* Just Show Up section */}
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '56px 40px 40px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            color: 'var(--color-primary)',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Just Show Up
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'var(--color-muted-foreground)',
            fontFamily: 'var(--font-body)',
          }}
        >
          No invitation needed. Come to any Tuesday meeting as our guest &mdash; grab a seat, meet the members,
          and see what we&apos;re all about. We alternate between regular meetings with guest speakers and
          work sessions for active projects. In severe weather, Zoom is available.
        </p>
      </section>

      {/* What to Expect Cards */}
      <section
        className="full-bleed"
        style={{ background: 'var(--color-background-white, #fff)' }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '56px 40px',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              color: 'var(--color-primary)',
              textAlign: 'center',
              marginBottom: '32px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            What to Expect
          </h2>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: '20px' }}
          >
            {[
              {
                icon: '🤝',
                title: 'Fellowship',
                desc: 'Weekly gatherings with neighbors, friends, and community leaders. Social time starts at 5:15 PM with the meeting at 5:30.',
              },
              {
                icon: '🎤',
                title: 'Guest Speakers',
                desc: 'Learn from community leaders, nonprofit directors, and district officials who present at our regular meetings.',
              },
              {
                icon: '🏗️',
                title: 'Hands-On Service',
                desc: 'From assembling Valentine trays for first responders to installing flags in Triangle Park — we get things done together.',
              },
              {
                icon: '🎓',
                title: 'Scholarships',
                desc: 'We award $5,500 annually in scholarships to Central Mountain High School seniors pursuing careers in education.',
              },
              {
                icon: '💛',
                title: 'Happy Dollars',
                desc: 'At each meeting, members share good news and contribute voluntarily to a local charity — currently the Lock Haven Area Shoe Bank.',
              },
              {
                icon: '🌎',
                title: 'Rotary International',
                desc: 'Be part of a global network of 1.4 million members working to promote peace, fight disease, and support communities worldwide.',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '15px',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                    marginBottom: '8px',
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Membership Works */}
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '56px 40px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            color: 'var(--color-primary)',
            textAlign: 'center',
            marginBottom: '32px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          How Membership Works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            {
              step: '1',
              title: 'Visit a Meeting',
              desc: 'Come to any Tuesday meeting at the Poorman Gallery. No commitment — just show up and see if it feels right. We\'d love to buy you a coffee.',
            },
            {
              step: '2',
              title: 'Find a Sponsor',
              desc: 'Once you decide to join, an existing member becomes your sponsor. They\'ll guide you through the process and propose your membership to the board.',
            },
            {
              step: '3',
              title: 'Get Inducted',
              desc: 'New members are inducted at a club dinner. You\'ll receive your Rotary pin from your sponsor and a certificate. Welcome to the family!',
            },
            {
              step: '4',
              title: 'Tell Your Story',
              desc: 'At a later meeting, you\'ll give a short "about me" talk so the club can get to know you. It\'s relaxed and fun — no pressure.',
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  color: 'var(--color-on-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {item.step}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--color-muted-foreground)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* From Interact to Rotary */}
      <section
        className="full-bleed"
        style={{ background: 'var(--color-background-white, #fff)' }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '56px 40px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              color: 'var(--color-primary)',
              marginBottom: '16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            From Interact to Rotary
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
              marginBottom: '20px',
            }}
          >
            The club co-sponsors the Interact Club at Central Mountain High School &mdash; Rotary&apos;s
            organization for high school students. Several Interact alumni have gone on to become
            full Rotarians, carrying the spirit of service into adulthood.
          </p>
          <div
            className="grid md:grid-cols-2"
            style={{ gap: '20px', maxWidth: '600px', margin: '0 auto' }}
          >
            <div
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'left',
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--color-foreground)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Emma Persun
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  marginTop: '4px',
                }}
              >
                Former Interact alumna. Works at Rachel K Creations. Incoming club treasurer for 2026-27.
              </p>
            </div>
            <div
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'left',
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--color-foreground)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Nate Akeley
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  marginTop: '4px',
                }}
              >
                Former CMHS class president and Interact member. Now studying electrical engineering at Penn State.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dues & Practical Info */}
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '56px 40px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            color: 'var(--color-primary)',
            textAlign: 'center',
            marginBottom: '32px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Good to Know
        </h2>
        <div
          className="grid md:grid-cols-2"
          style={{ gap: '20px' }}
        >
          {[
            {
              icon: '💰',
              title: 'Dues',
              desc: 'Annual dues cover Rotary International and district assessments. The most important investment is your time and heart.',
            },
            {
              icon: '📅',
              title: 'Commitment',
              desc: 'Members are encouraged to attend meetings and participate in projects — but life comes first. Show up when you can.',
            },
            {
              icon: '💻',
              title: 'Zoom Available',
              desc: 'In severe weather, the president sends a Zoom link so you can participate from home. We stay connected rain or shine.',
            },
            {
              icon: '🎉',
              title: 'Social Events',
              desc: 'Holiday dinner at Fox\'s Market House, annual birthday celebration, picnic with officer installation — it\'s not all work!',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: '24px', lineHeight: 1 }}>{card.icon}</span>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '15px',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                    marginBottom: '4px',
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Four-Way Test */}
      <section
        className="full-bleed"
        style={{
          background: 'var(--color-background-white, #fff)',
          padding: '56px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '28px',
              color: 'var(--color-primary)',
              marginBottom: '20px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            The Four-Way Test
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
              marginBottom: '24px',
            }}
          >
            The ethical framework that guides every Rotarian:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Is it the TRUTH?',
              'Is it FAIR to all concerned?',
              'Will it build GOODWILL and BETTER FRIENDSHIPS?',
              'Will it be BENEFICIAL to all concerned?',
            ].map((test) => (
              <p
                key={test}
                style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--color-foreground)',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                }}
              >
                {test}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="full-bleed"
        style={{
          background: 'var(--color-primary)',
          padding: '48px 40px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: 'var(--color-on-dark)',
            fontSize: '24px',
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Ready to Visit?
        </h2>
        <p
          style={{
            color: 'var(--color-on-dark-70)',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            marginBottom: '24px',
            maxWidth: '500px',
            margin: '0 auto 24px',
          }}
        >
          Drop in any Tuesday at 5:15 PM. Or reach out first &mdash; we&apos;re happy to answer questions.
        </p>
        <div
          style={{
            display: 'inline-flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="mailto:dlhrotary@gmail.com"
            style={{
              background: 'var(--color-secondary)',
              color: 'var(--color-secondary-foreground)',
              padding: '12px 28px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            ✉️ dlhrotary@gmail.com
          </a>
          <a
            href="tel:814-244-2929"
            style={{
              border: '2px solid var(--color-on-dark-30)',
              color: 'var(--color-on-dark)',
              padding: '12px 28px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              background: 'transparent',
            }}
          >
            📞 Lisa Schropp: 814-244-2929
          </a>
        </div>
      </section>
    </div>
  )
}
