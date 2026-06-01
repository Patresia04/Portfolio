"use client";
import React, { useState, useEffect } from "react";
import OpeningLoader from "./OpeningLoader";
import SocialSidebar from "./social/SocialSidebar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // After 3000ms: set loaderVisible = false (triggers fade-out)
    const hideLoaderTimeout = setTimeout(() => {
      setLoaderVisible(false);
      
      // After +700ms: set isLoading = false, set contentVisible = true, unlock scroll
      const removeLoaderTimeout = setTimeout(() => {
        setIsLoading(false);
        setContentVisible(true);
        document.body.style.overflow = "";
      }, 700);

      return () => clearTimeout(removeLoaderTimeout);
    }, 1500);

    return () => {
      clearTimeout(hideLoaderTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {isLoading && <OpeningLoader isVisible={loaderVisible} />}
      {!isLoading && <SocialSidebar />}
      
      <div 
        className={`relative z-10 transition-opacity duration-700 ease-in-out ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
