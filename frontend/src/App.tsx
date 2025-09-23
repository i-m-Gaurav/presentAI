import React, { useState } from 'react';
import { Hero } from './components/Landing/Hero';
import { ShowcaseSection } from './components/Landing/ShowcaseSection';
import { Features } from './components/Landing/Features';
import { Pricing } from './components/Landing/Pricing';
import { Footer } from './components/Landing/Footer';
import { AuthModal } from './components/Auth/AuthModal';
import { PaymentModal } from './components/Dashboard/PaymentModal';
import { Sidebar } from './components/Dashboard/Sidebar';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { CreatePresentation } from './components/Dashboard/CreatePresentation';
import { PresentationsList } from './components/Dashboard/PresentationsList';
import { UploadPDF } from './components/Dashboard/UploadPDF';
import { BillingPage } from './components/Dashboard/BillingPage';
import { Menu } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', amount: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userPlan, setUserPlan] = useState('free');
  const [freeUsage, setFreeUsage] = useState({ presentations: 3, limit: 5 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setUserPlan('free');
    setFreeUsage({ presentations: 3, limit: 5 });
    setIsMobileMenuOpen(false);
  };

  const handleSelectPlan = (plan: string) => {
    if (isAuthenticated) {
      if (plan === 'Pro') {
        setSelectedPlan({ name: 'Pro', amount: '$19' });
        setShowPaymentModal(true);
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setUserPlan('pro');
    setShowPaymentModal(false);
  };

  const handleCreatePresentation = () => {
    if (userPlan === 'free' && freeUsage.presentations >= freeUsage.limit) {
      setSelectedPlan({ name: 'Pro', amount: '$19' });
      setShowPaymentModal(true);
      return false;
    }
    
    if (userPlan === 'free') {
      setFreeUsage(prev => ({ ...prev, presentations: prev.presentations + 1 }));
    }
    return true;
  };

  const handleUpgrade = () => {
    setSelectedPlan({ name: 'Pro', amount: '$19' });
    setShowPaymentModal(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          userPlan={userPlan}
          freeUsage={freeUsage}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={toggleMobileMenu}
        />
        
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'create' && 'Create Presentation'}
              {activeTab === 'presentations' && 'My Presentations'}
              {activeTab === 'upload' && 'Upload PDF'}
              {activeTab === 'billing' && 'Billing & Usage'}
              {activeTab === 'templates' && 'Templates'}
              {activeTab === 'settings' && 'Settings'}
              {activeTab === 'profile' && 'Profile'}
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          <div className="p-4 md:p-8">
            {activeTab === 'dashboard' && (
              <DashboardHome 
                onTabChange={setActiveTab}
                userPlan={userPlan}
                freeUsage={freeUsage}
                onUpgrade={handleUpgrade}
              />
            )}
            {activeTab === 'create' && (
              <CreatePresentation 
                onTabChange={setActiveTab}
                onCreatePresentation={handleCreatePresentation}
                userPlan={userPlan}
                freeUsage={freeUsage}
                onUpgrade={handleUpgrade}
              />
            )}
            {activeTab === 'presentations' && (
              <PresentationsList 
                onUpgrade={handleUpgrade}
              />
            )}
            {activeTab === 'upload' && (
              <UploadPDF 
                onTabChange={setActiveTab}
                onUpgrade={handleUpgrade}
              />
            )}
            {activeTab === 'billing' && (
              <BillingPage onUpgrade={handleUpgrade} />
            )}
            {activeTab === 'templates' && (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Templates</h2>
                <p className="text-gray-600">Template gallery coming soon...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
                <p className="text-gray-600">Profile management coming soon...</p>
              </div>
            )}
          </div>
        </main>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          plan={selectedPlan.name}
          amount={selectedPlan.amount}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero onGetStarted={handleGetStarted} />
      <ShowcaseSection />
      <Features />
      <Pricing onSelectPlan={handleSelectPlan} />
      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        plan={selectedPlan.name}
        amount={selectedPlan.amount}
      />
    </div>
  );
}

export default App;