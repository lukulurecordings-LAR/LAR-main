import { ApplicationSection } from '../components/ApplicationSection';
import { HeroSection } from '../components/HeroSection';
import { CoursesSection } from '../components/CoursesSection';
import { PricingSection } from '../components/PricingSection';
import { Footer } from '../components/Footer';
import { ServiceGateway } from '../components/ServiceGateway';
import { DocumentTitle } from '../components/DocumentTitle';
export function HomePage() {
  return (
    <>
      <DocumentTitle title="Learn. Create. Release." description="Practical FL Studio, Cubase and music business courses, production services and student support in South Africa." />
      <HeroSection />
      <ServiceGateway />
      <CoursesSection />
      <ApplicationSection />
      <PricingSection />

      <Footer />
    </>);

}
