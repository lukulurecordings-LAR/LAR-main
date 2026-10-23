import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowUpRightIcon, Disc3Icon } from 'lucide-react';
import { Link } from 'react-router';

const stats = [
  { value: '11', label: 'Programmes' },
  { value: 'Online', label: 'Learning' },
  { value: 'ZA', label: 'Based' },
];

export function HeroSection() {
  return (
    <section id="home" className="hero signal-section" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="hero-disc hero-disc--one" />
        <span className="hero-disc hero-disc--two" />
      </div>

      <div className="page-shell hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="signal-label hero-signal">
            <span>00</span>
            <span className="live-dot">Enrolment signal live</span>
          </div>
          <h1 id="hero-title">
            <span>Build your sound.</span>
            <span className="hero-title-accent">Launch your career.</span>
          </h1>
          <p className="hero-lede">
            Learn production, music business, and release strategy through practical projects, feedback, and a South African music ecosystem behind you.
          </p>
          <div className="hero-actions">
            <a href="#courses" className="button button-primary">
              Start learning <ArrowDownIcon aria-hidden="true" />
            </a>
            <Link to="/#apply" className="button button-quiet">
              How to apply <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.aside
          className="hero-console"
          aria-label="Lukulu at a glance"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-logo-wrap">
            <span className="console-label">LAR / SOUTH AFRICA</span>
            <img src="/Lukulu_Logo.png" alt="Lukulu Academy & Recordings logo" />
            <Disc3Icon className="console-disc" aria-hidden="true" />
          </div>
          <div className="hero-waveform" aria-hidden="true">
            {Array.from({ length: 32 }, (_, index) => (
              <i key={index} style={{ height: `${18 + ((index * 17) % 58)}%` }} />
            ))}
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p>Remote learning available across South Africa.</p>
        </motion.aside>
      </div>
    </section>
  );
}