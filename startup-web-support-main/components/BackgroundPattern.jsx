import React from "react";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Repeating Hexagonal Honeycomb Grid using SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ color: 'var(--bg-hex-stroke)' }}>
        <defs>
          {/* Hexagon Pattern Definition: width 56, height 97 creates a perfect seamless tiling honeycomb mesh */}
          <pattern 
            id="honeycomb" 
            width="56" 
            height="97" 
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.8)"
          >
            <path 
              d="M28,0 L56,16 L56,48 L28,64 L0,48 L0,16 Z M28,97 L56,81 L56,49 L28,33 L0,49 L0,81 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.75" 
            />
          </pattern>
        </defs>
        
        {/* Fill the viewport with the seamless honeycomb pattern, masked with a soft radial fade */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#honeycomb)" 
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 60%, transparent 100%)'
          }}
        />
      </svg>



      {/* 3. Floating Geometric Node Particles (gently floating in deep 3D-like parallax space) */}
      {/* Node 1: Floating circle in top-left */}
      <div 
        className="absolute top-[20%] left-[10%] w-6 h-6 rounded-full border border-current animate-float-node-1 transition-all duration-300 flex items-center justify-center"
        style={{ color: 'var(--bg-node-stroke)', borderWidth: '1px' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
      </div>

      {/* Node 2: Floating larger double-ring node in mid-right */}
      <div 
        className="absolute top-[40%] right-[15%] w-10 h-10 rounded-full border border-current animate-float-node-2 transition-all duration-300 flex items-center justify-center"
        style={{ color: 'var(--bg-node-stroke)', borderWidth: '0.75px' }}
      >
        <div className="w-6 h-6 rounded-full border border-current border-dashed flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-current" />
        </div>
      </div>

      {/* Node 3: Floating node in bottom-right */}
      <div 
        className="absolute bottom-[25%] right-[25%] w-5 h-5 rounded-full border border-current animate-float-node-3 transition-all duration-300 flex items-center justify-center"
        style={{ color: 'var(--bg-node-stroke)', borderWidth: '1.25px' }}
      >
        <div className="w-1 h-1 rounded-full bg-current" />
      </div>

      {/* Node 4: Floating node in bottom-left */}
      <div 
        className="absolute bottom-[35%] left-[20%] w-8 h-8 rounded-full border border-current animate-float-node-4 transition-all duration-300 flex items-center justify-center"
        style={{ color: 'var(--bg-node-stroke)', borderWidth: '1px' }}
      >
        <div className="w-3 h-3 rounded-full border border-current border-dotted flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-current" />
        </div>
      </div>
    </div>
  );
}
