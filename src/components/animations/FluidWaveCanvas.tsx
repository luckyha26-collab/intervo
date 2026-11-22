import React, { useEffect, useRef } from 'react';

interface FluidWaveCanvasProps {
  className?: string;
  height?: number;
  interactive?: boolean;
}

export const FluidWaveCanvas: React.FC<FluidWaveCanvasProps> = ({
  className = '',
  height = 240,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let step = 0;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (interactive && canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      if (!canvas) return;
      const width = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, h);
      step += 0.025;

      // Draw 3 layers of fluid waves
      const waves = [
        {
          color: 'rgba(234, 179, 8, 0.18)', // Buttermax amber/yellow
          frequency: 0.007,
          amplitude: 28,
          speed: 1.0,
          yOffset: h * 0.55
        },
        {
          color: 'rgba(14, 165, 233, 0.22)', // Sky neon
          frequency: 0.012,
          amplitude: 22,
          speed: -1.3,
          yOffset: h * 0.62
        },
        {
          color: 'rgba(99, 102, 241, 0.18)', // Indigo
          frequency: 0.009,
          amplitude: 18,
          speed: 0.8,
          yOffset: h * 0.7
        }
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, w.yOffset);

        for (let x = 0; x <= width; x += 6) {
          // Calculate distance to mouse for interactive surge
          let mouseInfluence = 0;
          if (mouse.active) {
            const dist = Math.abs(x - mouse.x);
            if (dist < 180) {
              mouseInfluence = Math.cos((dist / 180) * (Math.PI / 2)) * 25;
            }
          }

          const y =
            w.yOffset +
            Math.sin(x * w.frequency + step * w.speed) * (w.amplitude + mouseInfluence) +
            Math.cos(x * w.frequency * 0.5 + step * 0.5) * 8;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, h);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (interactive && canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
