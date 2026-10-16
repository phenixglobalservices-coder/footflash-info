import React, { useEffect, useRef } from 'react';

export const AdBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create the ad script element
    const script = document.createElement('script');
    script.src = 'https://pl31860041.profitableratecpmnetwork.com/35018a58244bcfb45d5cf5f097ccbe88/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    container.appendChild(script);

    return () => {
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center">
      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 font-semibold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
        Espace Publicitaire
      </div>
      <div
        ref={containerRef}
        id="container-35018a58244bcfb45d5cf5f097ccbe88"
        className="w-full min-h-[90px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 p-2 text-center"
      >
        {/* Ad network injects content into this container */}
      </div>
    </div>
  );
};
