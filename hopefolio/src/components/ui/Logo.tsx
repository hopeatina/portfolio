import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 50,
  height = 50,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Modern architectural motif: an abstract 'H'/'A' intersecting node */}
      <g>
        {/* Left vertical pillar */}
        <rect x="20" y="20" width="12" height="60" rx="4" fill="currentColor" />
        
        {/* Right vertical pillar */}
        <rect x="68" y="20" width="12" height="60" rx="4" fill="currentColor" />
        
        {/* Center orbital ring (the node/orchestration concept) */}
        <path 
          d="M 50 15 C 69.33 15 85 30.67 85 50 C 85 69.33 69.33 85 50 85 C 30.67 85 15 69.33 15 50" 
          stroke="var(--color-primary)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        
        {/* Central connecting beam */}
        <rect x="32" y="44" width="36" height="12" rx="2" fill="var(--color-primary)" />
        
        {/* Core logic diamond */}
        <rect x="42" y="42" width="16" height="16" transform="rotate(45 50 50)" fill="var(--color-background)" />
        <rect x="46" y="46" width="8" height="8" transform="rotate(45 50 50)" fill="currentColor" />
      </g>
    </svg>
  );
};

export default Logo;
