import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const LenisContext = createContext();

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}; 