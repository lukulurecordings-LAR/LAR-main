import { ArrowRightIcon, BookOpenIcon, Mic2Icon, RadioIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

const services = [
  { number: '01', label: 'Learn', note: 'Practical courses in FL Studio, Cubase and music business.', explore: '#courses', icon: BookOpenIcon },
  { number: '02', label: 'Create', note: 'Recording, mixing, mastering, beats and artwork.', explore: '/enquire?category=studio&service=recording', icon: Mic2Icon },
  { number: '03', label: 'Release', note: 'Release planning, metadata advice and artist support.', explore: '/enquire?category=label&service=release-distribution', icon: RadioIcon },
] as const;

export function ServiceGateway() {
  return (
    <section id="services" className="service-gateway quick-paths section-paper" aria-labelledby="services-heading">
      <div className="page-shell">
        <Reveal className="service-gateway__head">
          <p className="console-label">CHOOSE ONE PATH</p>
          <h2 id="services-heading">What do you want to do?</h2>
          <p>Start with the goal that matters now. You can explore everything else later.</p>
        </Reveal>
        <div className="quick-path-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const body = <><span className="quick-path__number">{service.number}</span><Icon aria-hidden="true" /><div><h3>{service.label}</h3><p>{service.note}</p></div><strong>{service.label === 'Release' ? 'Get help' : 'Open'} <ArrowRightIcon aria-hidden="true" /></strong></>;
            return (
              <Reveal key={service.label} delay={index * 0.05}>
                {service.explore.startsWith('#') ? <a href={service.explore} className="quick-path">{body}</a> : <Link to={service.explore} className="quick-path">{body}</Link>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
