import React from 'react';

export const MoserGrid = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="checkerboard" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#D4AF37" fillOpacity="0.1" />
        <rect x="20" y="20" width="20" height="20" fill="#D4AF37" fillOpacity="0.1" />
        <rect x="20" y="0" width="20" height="20" fill="#1A1A1A" fillOpacity="0.05" />
        <rect x="0" y="20" width="20" height="20" fill="#1A1A1A" fillOpacity="0.05" />
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#checkerboard)" />
    <g fill="none" stroke="#D4AF37" strokeWidth="2">
      <rect x="40" y="40" width="320" height="320" strokeWidth="4" />
      <rect x="50" y="50" width="300" height="300" stroke="#1A1A1A" strokeWidth="1" />
      <rect x="80" y="80" width="240" height="240" />
    </g>
    <g fill="#D4AF37">
      <rect x="60" y="60" width="20" height="20" />
      <rect x="320" y="320" width="20" height="20" />
      <rect x="60" y="320" width="20" height="20" />
      <rect x="320" y="60" width="20" height="20" />
    </g>
    <g fill="#8B0000">
      <rect x="180" y="40" width="40" height="20" />
      <rect x="180" y="340" width="40" height="20" />
      <rect x="40" y="180" width="20" height="40" />
      <rect x="340" y="180" width="20" height="40" />
    </g>
  </svg>
);

export const KlimtCascade = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 600" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="#D4AF37">
      {/* Golden rectangles */}
      <rect x="20" y="20" width="60" height="100" />
      <rect x="100" y="60" width="80" height="40" />
      <rect x="40" y="160" width="120" height="30" />
      <rect x="120" y="230" width="50" height="120" />
      <rect x="30" y="300" width="60" height="60" />
      <rect x="60" y="400" width="100" height="40" />
      <rect x="80" y="480" width="40" height="90" />
      
      {/* Golden circles */}
      <circle cx="150" cy="130" r="25" />
      <circle cx="60" cy="250" r="35" />
      <circle cx="140" cy="400" r="20" />
      <circle cx="50" cy="500" r="15" />
    </g>
    
    <g fill="#1A1A1A">
      {/* Black accents inside gold */}
      <rect x="30" y="30" width="10" height="80" />
      <rect x="110" y="70" width="20" height="20" />
      <rect x="50" y="165" width="100" height="10" />
      <rect x="130" y="250" width="30" height="30" />
      <rect x="40" y="310" width="20" height="40" />
      <rect x="70" y="410" width="20" height="20" />
      <rect x="90" y="490" width="20" height="70" />
      
      {/* Black circles / eyes */}
      <circle cx="150" cy="130" r="10" fill="#F9F6F0" />
      <circle cx="150" cy="130" r="4" />
      <circle cx="60" cy="250" r="15" fill="#F9F6F0" />
      <circle cx="60" cy="250" r="6" />
    </g>
    
    <g fill="#8B0000">
      {/* Red accents */}
      <rect x="60" y="40" width="10" height="10" />
      <rect x="150" y="70" width="20" height="20" />
      <circle cx="100" cy="200" r="12" />
      <rect x="140" y="320" width="15" height="15" />
      <circle cx="80" cy="380" r="8" />
      <rect x="100" y="520" width="10" height="10" />
    </g>
  </svg>
);

export const HoffmannLeaves = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <g stroke="#D4AF37" strokeWidth="2" fill="none">
      <circle cx="100" cy="100" r="90" />
      <circle cx="100" cy="100" r="75" stroke="#1A1A1A" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" />
    </g>
    
    <g fill="#D4AF37">
      {/* Stylized leaves */}
      <path d="M100 10 C 115 10, 125 25, 100 40 C 75 25, 85 10, 100 10 Z" />
      <path d="M100 160 C 115 160, 125 175, 100 190 C 75 175, 85 160, 100 160 Z" />
      <path d="M10 100 C 10 85, 25 75, 40 100 C 25 125, 10 115, 10 100 Z" />
      <path d="M160 100 C 160 85, 175 75, 190 100 C 175 125, 160 115, 160 100 Z" />
      
      {/* Three-dot clusters (Hoffmann signature) */}
      <circle cx="55" cy="55" r="4" />
      <circle cx="65" cy="45" r="4" />
      <circle cx="45" cy="65" r="4" />
      
      <circle cx="145" cy="145" r="4" />
      <circle cx="155" cy="135" r="4" />
      <circle cx="135" cy="155" r="4" />
      
      <circle cx="145" cy="55" r="4" />
      <circle cx="135" cy="45" r="4" />
      <circle cx="155" cy="65" r="4" />
      
      <circle cx="55" cy="145" r="4" />
      <circle cx="65" cy="155" r="4" />
      <circle cx="45" cy="135" r="4" />
    </g>
    
    <g fill="#8B0000">
      <rect x="90" y="90" width="20" height="20" />
    </g>
    <g fill="#1A1A1A">
      <rect x="95" y="95" width="10" height="10" />
      <rect x="98" y="40" width="4" height="120" />
      <rect x="40" y="98" width="120" height="4" />
    </g>
  </svg>
);
