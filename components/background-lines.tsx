import { AnimatedLogo } from './animated-logo'

export function BackgroundLines() {
  return (
    <div className="fixed top-0 left-16 right-0 h-16 -z-10 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.05)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Flowing lines */}
        <path d="M0,50 Q250,45 500,50 T1000,50" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" />
        <path d="M0,70 Q250,65 500,70 T1000,70" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
        <path d="M0,30 Q250,25 500,30 T1000,30" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" />
        
        {/* Subtle geometric shapes */}
        <circle cx="50" cy="50" r="10" fill="rgba(0, 0, 0, 0.05)" />
        <rect x="900" y="20" width="30" height="30" fill="rgba(0, 0, 0, 0.05)" />
        <polygon points="500,10 490,30 510,30" fill="rgba(0, 0, 0, 0.05)" />
      </svg>
      
      {/* Animated Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-48 h-12">
          <AnimatedLogo />
        </div>
      </div>
    </div>
  )
}
