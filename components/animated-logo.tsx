export function AnimatedLogo() {
  return (
    <svg className="w-full h-full" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          .text {
            font-family: Arial, sans-serif;
            font-size: 60px;
            font-weight: bold;
            fill: none;
            stroke: rgba(0, 0, 0, 0.2);
            stroke-width: 2;
          }
          .animate-draw {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: draw 5s linear forwards infinite;
          }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <text x="10" y="70" className="text">N0.DEV</text>
      <text x="10" y="70" className="text animate-draw">N0.DEV</text>
    </svg>
  )
}
