import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useAnimation } from "./contexts/AnimationContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Lazy load all pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const Influencers = lazy(() => import("./pages/Influencers.jsx"));
const InfluencerProfile = lazy(() => import("./pages/InfluencerProfile.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Packages = lazy(() => import("./pages/Packages.jsx"));
const Studio = lazy(() => import("./pages/Studio.jsx"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
  </div>
);

function App() {
  const { initializeAnimations } = useAnimation();

  useEffect(() => {
    initializeAnimations();
  }, [initializeAnimations]);

  return (
    <div className="min-h-screen bg-gray-50 font-emerald">
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/influencer/:id" element={<InfluencerProfile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/studio" element={<Studio />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
