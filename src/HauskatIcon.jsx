import React from 'react';

const HauskatIcon = ({ className = "w-8 h-8", color = "#9333ea" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cat head outline */}
      <path
        d="M 20 35 Q 20 15, 35 15 L 35 25 Q 30 20, 25 30 L 25 60 Q 25 75, 50 75 Q 75 75, 75 60 L 75 30 Q 70 20, 65 25 L 65 15 Q 80 15, 80 35 L 80 55 Q 80 80, 50 80 Q 20 80, 20 55 Z"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left ear inner */}
      <path
        d="M 30 22 L 28 28"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Right ear inner */}
      <path
        d="M 70 22 L 72 28"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Left eye */}
      <circle cx="38" cy="45" r="4" fill={color} />

      {/* Right eye */}
      <circle cx="62" cy="45" r="4" fill={color} />

      {/* Nose */}
      <path
        d="M 50 55 L 47 52 L 53 52 Z"
        fill={color}
      />

      {/* Mouth - left */}
      <path
        d="M 50 55 Q 42 60, 38 58"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Mouth - right */}
      <path
        d="M 50 55 Q 58 60, 62 58"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HauskatIcon;
