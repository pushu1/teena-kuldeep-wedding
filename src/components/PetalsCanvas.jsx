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

    // Particle pool for petals and golden stardust
    const petalCount = 28;
    const petals = [];
    const colors = [
      'rgba(215, 123, 154, 0.75)', // Floral Pink
      'rgba(235, 158, 183, 0.65)', // Light Blossom
      'rgba(248, 215, 225, 0.8)',  // Soft Rose
      'rgba(196, 154, 69, 0.85)',  // Antique Gold stardust
      'rgba(243, 229, 171, 0.75)', // Light Gold
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        isGold: Math.random() > 0.6,
        vx: (Math.random() - 0.5) * 1.2,
        vy: Math.random() * 1.4 + 0.8,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 2.5,
        swing: Math.random() * Math.PI * 2,
        vSwing: Math.random() * 0.03 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swing += p.vSwing;
        p.x += p.vx + Math.sin(p.swing) * 0.9;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);

        if (p.isGold) {
          // Draw sparkling 4-pointed golden star or soft particle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw organic curved rose petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
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

  return <canvas ref={canvasRef} className="petals-canvas" aria-hidden="true" />;
}
