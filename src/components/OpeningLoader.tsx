"use client";
import React, { useEffect, useState } from 'react';

interface OpeningLoaderProps {
  isVisible: boolean;
}

export default function OpeningLoader({ isVisible }: OpeningLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Total loading duration: 1.5 seconds
    const duration = 1500;
    const intervalTime = 16; // ~60fps
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const t = Math.min(currentStep / steps, 1);
      // Ease out: 1 - Math.pow(1 - t, 2.5)
      const easedProgress = 1 - Math.pow(1 - t, 2.5);
      setProgress(easedProgress * 100);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Container to hold elements fading in on mount */}
      <div 
        className={`flex flex-col items-center transition-opacity duration-600 ease-out ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        
        {/* Ring Segment */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 mb-10">
          <svg className="w-full h-full animate-[spin_1.5s_linear_infinite]" viewBox="0 0 100 100">
            {Array.from({ length: 36 }).map((_, i) => {
              const norm = i / 36;
              const angle = norm * Math.PI * 2;
              // opacity per segment calculated as Math.pow(Math.max(0, Math.cos(norm * Math.PI * 2 - Math.PI * 0.12)), 1.8) clamped between 0.15 and 1
              const rawOpacity = Math.pow(Math.max(0, Math.cos(norm * Math.PI * 2 - Math.PI * 0.12)), 1.8);
              const opacity = Math.max(0.15, Math.min(1, rawOpacity));
              
              const radius = 45;
              const innerRadius = 28;
              const cx = 50;
              const cy = 50;
              
              const x1 = (cx + innerRadius * Math.cos(angle)).toFixed(4);
              const y1 = (cy + innerRadius * Math.sin(angle)).toFixed(4);
              const x2 = (cx + radius * Math.cos(angle)).toFixed(4);
              const y2 = (cy + radius * Math.sin(angle)).toFixed(4);
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth="5"
                  style={{ opacity: Number(opacity.toFixed(4)) }}
                />
              );
            })}
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-[90vw] max-w-[460px] h-[32px] rounded-full border-[2px] border-white p-[3px] mb-8">
          <div
            className="h-full rounded-full overflow-hidden transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          >
            <div 
              className="h-full w-[calc(90vw-10px)] max-w-[450px] rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  #1a1a1a 0%, #1a1a1a 10%, 
                  #333333 10%, #333333 20%, 
                  #4d4d4d 20%, #4d4d4d 30%, 
                  #666666 30%, #666666 40%, 
                  #808080 40%, #808080 50%, 
                  #999999 50%, #999999 60%, 
                  #b3b3b3 60%, #b3b3b3 70%, 
                  #cccccc 70%, #cccccc 80%, 
                  #e6e6e6 80%, #e6e6e6 90%, 
                  #ffffff 90%, #ffffff 100%)`
              }}
            />
          </div>
        </div>

        {/* Name Text */}
        <h1 className="text-white font-poppins font-light text-[11px] sm:text-[13px] md:text-[15px] tracking-[0.6em] uppercase text-center ml-[0.6em]">
          PATRESIA MARSHANDA SIREGAR
        </h1>
      </div>
    </div>
  );
}
