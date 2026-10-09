import React from 'react';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBento from './components/FeaturesBento';
import RulesSection from './components/RulesSection';
import SecurityShowcase from './components/SecurityShowcase';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col relative selection:bg-blue-500/20 selection:text-blue-600">
        {/* Apple Style Toast Notification Host */}
        <Toast />

        {/* Floating Apple White Navbar */}
        <Navbar />

        {/* Main Presentation Sections */}
        <main className="flex-1">
          <Hero />
          <FeaturesBento />
          <RulesSection />
          <SecurityShowcase />
        </main>

        {/* Apple Sleek Light Footer */}
        <Footer />
      </div>
    </ToastProvider>
  );
}
