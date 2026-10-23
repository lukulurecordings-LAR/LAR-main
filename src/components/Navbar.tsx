import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogInIcon, MenuIcon, XIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const NAV_LINKS = [
  { label: 'Courses', to: '/#courses', section: 'learn' },
  { label: 'Services', to: '/#services', section: 'services' },
  { label: 'Pricing', to: '/#pricing', section: 'pricing' },
  { label: 'How to apply', to: '/#apply', section: 'apply' },
  { label: 'Enquire', to: '/enquire', section: 'enquire' },
  { label: 'Student portal', to: '/student/login', section: 'student', icon: LogInIcon },
];

const OBSERVED_SECTIONS: Record<string, string> = {
  home: 'home',
  about: 'home',
  courses: 'learn',
  'remote-courses': 'learn',
  pricing: 'pricing',
  apply: 'apply',
  benefits: 'learn',
  journey: 'learn',
  services: 'services',
  studio: 'services',
  beats: 'services',
  design: 'services',
  label: 'news',
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = Object.keys(OBSERVED_SECTIONS)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(OBSERVED_SECTIONS[visible.target.id] ?? 'home');
      },
      { rootMargin: '-20% 0px -68% 0px', threshold: [0, 0.15, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          mobileNavRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey && (activeElement === firstElement || !mobileNavRef.current?.contains(activeElement))) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && (activeElement === lastElement || !mobileNavRef.current?.contains(activeElement))) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const isCurrent = (section: string) => {
    if (section === 'news') return location.pathname === '/news';
    if (section === 'enquire') return location.pathname === '/enquire';
    if (section === 'student') return location.pathname.startsWith('/student');
    return location.pathname === '/' && activeSection === section;
  };

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Lukulu Academy & Recordings home">
          <img src="/Lukulu_Logo.png" alt="" />
          <span><strong>LUKULU</strong><small>Academy & Recordings</small></span>
        </Link>

        <div className="desktop-nav" aria-label="Main destinations">
          {NAV_LINKS.map((link) => {
            const current = isCurrent(link.section);
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={link.section === 'student' ? 'nav-cta' : current ? 'is-current' : undefined}
                aria-current={current ? 'page' : undefined}
              >
                {Icon && <Icon aria-hidden="true" />}{link.label}
              </Link>
            );
          })}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileNavRef}
            id="mobile-navigation"
            className="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mobile-nav__signal" aria-hidden="true"><span>MENU / SIGNAL PATH</span><i /></div>
            {NAV_LINKS.map((link, index) => {
              const current = isCurrent(link.section);
              return (
                <Link
                  key={link.to}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  to={link.to}
                  className={current ? 'is-current' : undefined}
                  aria-current={current ? 'page' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{link.label}
                </Link>
              );
            })}
            <Link className="button button-primary" to="/enquire">
              Join the academy
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}