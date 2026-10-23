import {
  ArrowRightIcon,
  CheckIcon,
  CrownIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  ZapIcon,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'R0',
    note: 'Get a taste of what we offer',
    features: ['Intro lessons', 'Community access', 'Demo submission'],
    icon: StarIcon,
  },
  {
    id: 'plan_basic',
    name: 'Basic',
    price: 'R149',
    note: 'For beginners starting out',
    features: ['All beginner courses', 'Guidance on free production tools', 'Download learning materials', 'Community support'],
    icon: StarIcon,
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    price: 'R349',
    note: 'For serious musicians',
    features: ['All courses at every level', 'Guidance on free production tools', 'Mastering at R100 per song', 'Live classes', 'Feedback on your music', 'Release preparation guidance'],
    icon: ZapIcon,
    featured: true,
  },
  {
    id: 'plan_vip',
    name: 'VIP',
    price: 'R999',
    note: 'The full experience',
    features: ['Everything in Pro', 'Guidance on free production tools', 'Mastering support; scope confirmed on application', 'Studio session discount', 'Direct mentorship', 'Personal development plan'],
    icon: CrownIcon,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="signal-section section-pad section-paper" aria-labelledby="pricing-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="pricing-heading"
          number="03"
          eyebrow="Memberships"
          title="Choose your plan"
          description="Straightforward monthly options for South African musicians. Start with the course previews, then upgrade when you need deeper access and support."
        />

        <Reveal className="pricing-ledger">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article key={plan.id} className={`plan-row ${plan.featured ? 'plan-row--featured' : ''}`}>
                <div className="plan-row__identity">
                  <Icon aria-hidden="true" />
                  <span>
                    <small>{plan.featured ? 'Most popular' : 'Monthly plan'}</small>
                    <h3>{plan.name}</h3>
                  </span>
                </div>
                <div className="plan-row__price">
                  <strong>{plan.price}</strong>
                  {plan.id !== 'free' && <span>/ month</span>}
                  <small>{plan.note}</small>
                </div>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><CheckIcon aria-hidden="true" /> {feature}</li>
                  ))}
                </ul>
                <div className="plan-row__action">
                  {plan.id === 'free' ? (
                    <a href="#courses" className="button button-quiet">
                      View free lessons <ArrowRightIcon aria-hidden="true" />
                    </a>
                  ) : (
                    <Link to={`/enquire?category=academy&service=${plan.name.toLowerCase()}`} className={plan.featured ? 'button button-primary' : 'button button-quiet'}>
                      Apply for {plan.name} <ArrowRightIcon aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </Reveal>

        <div className="pricing-footnotes">
          <p><ShieldCheckIcon aria-hidden="true" /> Apply first. We confirm the plan, fees and availability before payment.</p>
          <Link to="/enquire?category=accounts&service=subscription-help">
            <UsersIcon aria-hidden="true" /> Membership, invoice or referral help
          </Link>
        </div>
      </div>
    </section>
  );
}
