import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const AnimatedBackgroundLines: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lines: Line[] = [];
    const lineCount = 30;

    const colorPalette = {
      light: [
        'rgba(147, 51, 234, 0.1)',  // Purple
        'rgba(236, 72, 153, 0.1)',  // Pink
        'rgba(59, 130, 246, 0.1)',  // Blue
        'rgba(16, 185, 129, 0.1)',  // Green
        'rgba(245, 158, 11, 0.1)',  // Yellow
      ],
      dark: [
        'rgba(167, 139, 250, 0.15)', // Light Purple
        'rgba(244, 114, 182, 0.15)', // Light Pink
        'rgba(96, 165, 250, 0.15)',  // Light Blue
        'rgba(52, 211, 153, 0.15)',  // Light Green
        'rgba(251, 191, 36, 0.15)',  // Light Yellow
      ]
    };

    class Line {
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      color: CanvasGradient;
      width: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.dx = (Math.random() - 0.5) * 1.5;
        this.dy = (Math.random() - 0.5) * 1.5;
        this.length = Math.random() * 150 + 100;
        this.width = Math.random() * 2 + 0.5;
        this.color = this.getGradientColor();
      }

      getGradientColor(): CanvasGradient {
        const palette = theme === 'dark' ? colorPalette.dark : colorPalette.light;
        const startColor = palette[Math.floor(Math.random() * palette.length)];
        const endColor = palette[Math.floor(Math.random() * palette.length)];
        const gradient = ctx!.createLinearGradient(this.x, this.y, this.x + this.length, this.y + this.length);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        return gradient;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length * Math.cos(Math.atan2(this.dy, this.dx)), this.y + this.length * Math.sin(Math.atan2(this.dy, this.dx)));
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }

      update() {
        if (!canvas) return;
        if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
        if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    for (let i = 0; i < lineCount; i++) {
      lines.push(new Line());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(line => line.update());
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lines.forEach(line => {
        line.color = line.getGradientColor();
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default AnimatedBackgroundLines;
