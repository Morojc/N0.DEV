import { AnimatedLogo } from './animated-logo'

export function BackgroundLines() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-white">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.02)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Flowing lines */}
        <path d="M0,500 Q250,450 500,500 T1000,500" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" />
        <path d="M0,700 Q250,650 500,700 T1000,700" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
        <path d="M0,300 Q250,250 500,300 T1000,300" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" />
        
        {/* Subtle geometric shapes */}
        <circle cx="50" cy="50" r="20" fill="rgba(0, 0, 0, 0.03)" />
        <rect x="900" y="900" width="60" height="60" fill="rgba(0, 0, 0, 0.03)" />
        <polygon points="500,20 480,60 520,60" fill="rgba(0, 0, 0, 0.03)" />
      </svg>
      
      {/* Animated Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-96">
          <AnimatedLogo />
        </div>
      </div>
    </div>
  )
}
