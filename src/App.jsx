import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBento from './components/FeaturesBento';
import RulesSection from './components/RulesSection';
import SecurityShowcase from './components/SecurityShowcase';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CustomCursor from './components/CustomCursor';
import LeftSidebar from './components/LeftSidebar';
import AdminPortal from './components/AdminPortal';

export default function App() {
  // Sadece adres çubuğunda /admins (veya #admins) yazıldığında admin paneli açılır!
  const [isAdminView, setIsAdminView] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admins' || path.startsWith('/admin') || hash === '#admins';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminView(path === '/admins' || path.startsWith('/admin') || hash === '#admins');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ToastProvider>
      {/* Apple Dynamic Spring Cursor Follower */}
      <CustomCursor />

      {/* Main Toast Host */}
      <Toast />

      {isAdminView ? (
        /* Gizli KeyAuth Admin Portal (/admins) */
        <AdminPortal onBackToHome={navigateToHome} />
      ) : (
        /* Herkese Açık Apple Vitrin Sitesi (Admin paneline dair hiçbir buton veya ipucu bulunmaz) */
        <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col relative selection:bg-blue-500/20 selection:text-blue-600">
          
          {/* Floating Left Soft Drawer Menu */}
          <LeftSidebar />

          {/* Floating Apple White Navbar */}
          <Navbar />

          {/* Main Sections */}
          <main className="flex-1">
            <Hero />
            <FeaturesBento />
            <RulesSection />
            <SecurityShowcase />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </ToastProvider>
  );
}
