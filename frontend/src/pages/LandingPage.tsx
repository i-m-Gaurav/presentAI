// src/pages/LandingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Landing/Hero";
import { ShowcaseSection } from "../components/Landing/ShowcaseSection";
import { Features } from "../components/Landing/Features";
import { Pricing } from "../components/Landing/Pricing";
import { Footer } from "../components/Landing/Footer";
import { AuthModal } from "../components/Auth/AuthModal";

export function LandingPage() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGetStarted = () => setShowAuthModal(true);
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero onGetStarted={handleGetStarted} />
      <ShowcaseSection />
      <Features />
      <Pricing onSelectPlan={() => setShowAuthModal(true)} />
      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
