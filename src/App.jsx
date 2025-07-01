import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAnimation } from "./contexts/AnimationContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Influencers from "./pages/Influencers.jsx";
import InfluencerProfile from "./pages/InfluencerProfile.jsx";
import Services from "./pages/Services.jsx";
import Packages from "./pages/Packages.jsx";
import Studio from "./pages/Studio.jsx";

function App() {
  const { initializeAnimations } = useAnimation();

  useEffect(() => {
    initializeAnimations();
  }, [initializeAnimations]);

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
