import { useAuth } from '../contexts/AuthContext';
import BoltBadge from '../components/common/BoltBadge';
import LandingNav from '../components/landing/LandingNav';
import HeroSection from '../components/landing/HeroSection';
import ScriptureQuotes from '../components/landing/ScriptureQuotes';
import ChallengeSection from '../components/landing/ChallengeSection';
import InvitationSection from '../components/landing/InvitationSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CallToAction from '../components/landing/CallToAction';
import LandingFooter from '../components/landing/LandingFooter';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-parchment-50">
      <LandingNav />
      <BoltBadge />

      {/* Hero Section */}
      <HeroSection isAuthenticated={isAuthenticated} />

      {/* The Enduring Word */}
      <ScriptureQuotes />

      {/* The Challenge of Clarity */}
      <ChallengeSection />

      {/* Our Invitation to All Seekers */}
      <InvitationSection />

      {/* Discover the Core Features */}
      <FeaturesSection />

      {/* Begin Your Journey */}
      <CallToAction isAuthenticated={isAuthenticated} />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;