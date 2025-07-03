import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAnimation } from './contexts/AnimationContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Influencers from './pages/Influencers.jsx';
import InfluencerProfile from './pages/InfluencerProfile.jsx';
import Services from './pages/Services.jsx';
import Packages from './pages/Packages.jsx';
import Studio from './pages/Studio.jsx';
import { useLenis } from "./contexts/LenisContext";

function App() {
  const { initializeAnimations } = useAnimation();
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    initializeAnimations();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [initializeAnimations, location, lenis]);

  return (
    <div className="min-h-screen bg-gray-50 font-emerald">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/influencer/:id" element={<InfluencerProfile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/studio" element={<Studio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;