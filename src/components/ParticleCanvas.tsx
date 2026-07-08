"use client";

export default function ParticleCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Architectural Grid Pattern */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-15">
        <defs>
          <pattern
            id="hero-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Concentric Architectural Arcs (Top Right) */}
      <svg
        className="absolute -top-[10%] -right-[10%] w-[60%] h-[80%] max-w-[800px] opacity-25"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="600" cy="0" r="100" stroke="white" strokeWidth="1" />
        <circle cx="600" cy="0" r="200" stroke="white" strokeWidth="1" />
        <circle cx="600" cy="0" r="300" stroke="white" strokeWidth="1" />
        <circle cx="600" cy="0" r="400" stroke="white" strokeWidth="1" />
        <circle cx="600" cy="0" r="500" stroke="white" strokeWidth="1" />
        <circle cx="600" cy="0" r="600" stroke="white" strokeWidth="1" />
        <circle cx="100" cy="500" r="4" fill="#0E6461" />
      </svg>

      {/* Concentric Architectural Arcs (Bottom Left) */}
      <svg
        className="absolute -bottom-[15%] -left-[10%] w-[50%] h-[70%] max-w-[700px] opacity-15"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="0" cy="600" r="150" stroke="white" strokeWidth="1" />
        <circle cx="0" cy="600" r="250" stroke="white" strokeWidth="1" />
        <circle cx="0" cy="600" r="350" stroke="white" strokeWidth="1" />
        <circle cx="0" cy="600" r="450" stroke="white" strokeWidth="1" />
        <circle cx="0" cy="600" r="550" stroke="white" strokeWidth="1" />
        <circle cx="500" cy="150" r="3" fill="#0E6461" />
      </svg>
    </div>
  );
}
