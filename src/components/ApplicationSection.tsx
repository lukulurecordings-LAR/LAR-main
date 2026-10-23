import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionIntro } from './SectionIntro';

const steps = [
  ['Choose your course', 'Browse FL Studio, Cubase or music business. Check the level, duration and practical outcome.'],
  ['Send your application', 'Tell us your preferred course, experience and availability using the Academy enquiry form.'],
  ['Confirm your place', 'We confirm availability, requirements, fees and access instructions before you start.'],
];

export function ApplicationSection() {
  return <section id="apply" className="signal-section section-pad" aria-labelledby="apply-heading"><div className="page-shell">
    <SectionIntro headingId="apply-heading" number="03" eyebrow="Enrolment" title="Your next step, made simple" description="You do not need a finished song to apply. Tell us where you are starting and we will help you choose a suitable course." />
    <ol className="application-steps">{steps.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    <div className="hero-actions"><Link className="button button-primary" to="/enquire?category=academy&service=remote-course">Apply for a course <ArrowRightIcon aria-hidden="true" /></Link><Link className="button button-quiet" to="/student/login">Already enrolled? Student portal</Link></div>
    <p className="application-note">Submitting an application does not confirm a place or take payment.</p>
  </div></section>;
}
