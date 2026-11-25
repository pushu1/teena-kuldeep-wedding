import React, { useEffect, useRef } from 'react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle, soft champagne (#D8C39A) and muted sage (#97AB97) floating botanical elements
    const petalCount = 20;
    const petals = [];
    const colors = [
      'rgba(216, 195, 154, 0.45)', // Soft Champagne
      'rgba(232, 216, 186, 0.40)', // Light Champagne
      'rgba(151, 171, 151, 0.40)', // Muted Sage
      'rgba(175, 195, 175, 0.35)', // Soft Sage Leaf
      'rgba(250, 248, 242, 0.50)', // Pearl White Shimmer
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        isLeaf: Math.random() > 0.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * 0.9 + 0.6,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 1.5,
        swing: Math.random() * Math.PI * 2,
        vSwing: Math.random() * 0.02 + 0.008,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swing += p.vSwing;
        p.x += p.vx + Math.sin(p.swing) * 0.7;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.isLeaf) {
          // Elongated delicate leaf
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.5, p.r * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft petal
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="petals-ambient-canvas" aria-hidden="true" />;
}
