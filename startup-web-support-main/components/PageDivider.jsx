import React from 'react';

const PageDivider = ({ upperColor, lowerColor, height = 'h-24' }) => {
  const svgPattern = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
      <path fill="${upperColor}" d="M0,30 C300,70 700,0 1000,30 L1000,0 L0,0 Z" />
      <path fill="${lowerColor}" d="M0,30 C300,70 700,0 1000,30 L1000,100 L0,100 Z" />
    </svg>
  `);

  return (
    <div className={`relative w-full ${height}`} style={{backgroundColor: upperColor}}>
      <div className="absolute bottom-0 left-0 w-full h-full" style={{backgroundImage: `url("data:image/svg+xml;utf8,${svgPattern}")`,backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}></div>
    </div>
  );
};

export default PageDivider;