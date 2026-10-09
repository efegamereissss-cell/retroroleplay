import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBento from './components/FeaturesBento';
import RulesSection from './components/RulesSection';
import SecurityShowcase from './components/SecurityShowcase';
import AuthModal from './components/AuthModal';
import UcpDashboard from './components/UcpDashboard';
import Footer from './components/Footer';
import Toast from './components/Toast';

function MainApp() {
  const [isUcpOpen, setIsUcpOpen] = useState(false);
  const { user, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const handleOpenAuth = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenUcp = () => {
    if (user) {
      setIsUcpOpen(true);
    } else {
      handleOpenAuth();
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col relative selection:bg-blue-500/20 selection:text-blue-600">
      {/* Toast Notification Container */}
      <Toast />

      {/* Navigation */}
      <Navbar onOpenUcp={handleOpenUcp} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenAuth={handleOpenAuth} />
        <FeaturesBento />
        <RulesSection />
        <SecurityShowcase onOpenAuth={handleOpenAuth} />
      </main>

      {/* Auth Modal (Login / Register / 2FA) */}
      <AuthModal />

      {/* User Control Panel (UCP Dashboard) */}
      <UcpDashboard isOpen={isUcpOpen} onClose={() => setIsUcpOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
