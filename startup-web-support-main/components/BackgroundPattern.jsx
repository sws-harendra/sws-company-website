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

      {/* 2. Concentric Scientific HUD elements (spinning slow in opposing corners) */}
      {/* HUD 1: Top-Right rotating concentric HUD dials */}
      <svg 
        className="absolute top-[5%] right-[-5%] w-[450px] h-[450px] opacity-75 pointer-events-none select-none transition-all duration-300 animate-spin-hud" 
        style={{ color: 'var(--bg-hud-stroke)' }}
        viewBox="0 0 400 400" 
        fill="none"
      >
        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="2.5" strokeDasharray="30 15" />
        <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 4" />
        <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="0.75" />
        <path d="M 200 0 L 200 400 M 0 200 L 400 200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        {/* Outer tick markings */}
        <path d="M10,200 L20,200 M380,200 L390,200 M200,10 L200,20 M200,380 L200,390" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* HUD 2: Bottom-Left rotating concentric HUD dials */}
      <svg 
        className="absolute bottom-[5%] left-[-8%] w-[350px] h-[350px] opacity-70 pointer-events-none select-none transition-all duration-300 animate-spin-hud" 
        style={{ color: 'var(--bg-hud-stroke)', animationDirection: 'reverse', animationDuration: '60s' }}
        viewBox="0 0 300 300" 
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="1.25" strokeDasharray="4 6" />
        <circle cx="150" cy="150" r="120" stroke="currentColor" strokeWidth="2" strokeDasharray="20 40" />
        <circle cx="150" cy="150" r="90" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 150 0 L 150 300 M 0 150 L 300 150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
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
