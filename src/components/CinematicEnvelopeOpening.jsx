import React, { useState, useEffect, useRef } from 'react';

export default function CinematicEnvelopeOpening({ onOpenComplete, onToggleMusic, isMuted }) {
  const [stage, setStage] = useState('closed'); // 'closed' | 'opening' | 'fireworks' | 'completed'
  const canvasRef = useRef(null);
  const dustCanvasRef = useRef(null);
  const fireworksAnimRef = useRef(null);
  const dustAnimRef = useRef(null);

  // ----------------------------------------------------
  // Golden Ambient Dust Particles (Always running in background)
  // ----------------------------------------------------
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = width < 768 ? 30 : 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2
    }));

    const renderDust = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += Math.sin(p.angle) * 0.3 + p.speedX;
        p.angle += 0.02;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.angle * 2));
        ctx.fillStyle = `rgba(232, 213, 163, ${currentAlpha})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = '#D4AF65';

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      dustAnimRef.current = requestAnimationFrame(renderDust);
    };

    renderDust();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (dustAnimRef.current) cancelAnimationFrame(dustAnimRef.current);
    };
  }, []);

  // ----------------------------------------------------
  // Dynamic HTML5 Canvas Fireworks Engine
  // ----------------------------------------------------
  useEffect(() => {
    if (stage !== 'fireworks' && stage !== 'opening') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const fireworks = [];
    const particles = [];
    const colors = [
      '#FFD700', // Gold
      '#F4A460', // Champagne Amber
      '#FF4500', // Crimson Orange
      '#FF69B4', // Royal Pink
      '#00FA9A', // Emerald
      '#FFE4E1', // Ivory Gold
      '#E6C280'  // Antique Gold
    ];

    class Firework {
      constructor(targetX, targetY) {
        this.x = width * (0.2 + Math.random() * 0.6);
        this.y = height + 10;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = Math.random() * 3 + 7;
        this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = [];
        this.alive = true;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;

        // Check if reached destination
        const dist = Math.hypot(this.targetX - this.x, this.targetY - this.y);
        if (dist < 15 || this.vy >= 0) {
          this.alive = false;
          this.explode();
        }
      }

      explode() {
        const particleCount = width < 768 ? 36 : 65;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.targetX, this.targetY, this.color));
        }
      }

      draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        if (this.trail.length > 0) {
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let p of this.trail) ctx.lineTo(p.x, p.y);
        } else {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - this.vx, this.y - this.vy);
        }
        ctx.stroke();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.gravity = 0.06;
        this.size = Math.random() * 2.5 + 1.2;
      }

      update() {
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let lastLaunch = 0;

    const loop = (timestamp) => {
      // Semi-transparent clear creates motion trails
      ctx.fillStyle = 'rgba(10, 8, 16, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Launch fireworks periodically
      if (timestamp - lastLaunch > (width < 768 ? 450 : 320)) {
        const tx = width * (0.15 + Math.random() * 0.7);
        const ty = height * (0.15 + Math.random() * 0.45);
        fireworks.push(new Firework(tx, ty));
        lastLaunch = timestamp;
      }

      // Update & draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw();
        if (!fw.alive) fireworks.splice(i, 1);
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      fireworksAnimRef.current = requestAnimationFrame(loop);
    };

    fireworksAnimRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (fireworksAnimRef.current) cancelAnimationFrame(fireworksAnimRef.current);
    };
  }, [stage]);

  // ----------------------------------------------------
  // Handle Opening Trigger
  // ----------------------------------------------------
  const handleOpenInvitation = () => {
    if (stage !== 'closed') return;
    setStage('opening');

    // Attempt to start wedding background music on user gesture
    try {
      if (typeof window.playWeddingMusic === 'function') {
        window.playWeddingMusic();
      }
    } catch (e) {}

    // Timeline:
    // 0s: seal crack/dissolve
    // 400ms: envelope flap opens in 3D
    // 800ms: fireworks start
    // 3800ms: transition smoothly to main website
    setTimeout(() => {
      setStage('fireworks');
    }, 800);

    setTimeout(() => {
      setStage('completed');
      if (onOpenComplete) onOpenComplete();
    }, 4200);
  };

  const handleSkipIntro = () => {
    // Attempt audio on skip as user intent
    try {
      if (typeof window.playWeddingMusic === 'function') {
        window.playWeddingMusic();
      }
    } catch (e) {}

    setStage('completed');
    if (onOpenComplete) onOpenComplete();
  };

  return (
    <div className={`cinematic-opening-container stage-${stage}`}>
      {/* Background Golden Dust Canvas */}
      <canvas ref={dustCanvasRef} className="dust-particles-canvas" />

      {/* Fireworks Canvas (Active during opening/fireworks stage) */}
      {(stage === 'opening' || stage === 'fireworks') && (
        <canvas ref={canvasRef} className="fireworks-canvas" />
      )}

      {/* Royal Palace Silhouette Backdrop */}
      <div className="royal-palace-backdrop" aria-hidden="true">
        <svg viewBox="0 0 1200 300" className="palace-silhouette-svg" preserveAspectRatio="none">
          <path
            d="M0,300 L0,220 Q50,220 70,180 Q90,130 110,180 Q130,220 180,220 L240,220 L240,160 Q260,130 280,160 L280,220 L350,220 Q400,100 450,220 L520,220 L520,140 Q550,90 580,140 L580,220 L620,220 L620,140 Q650,90 680,140 L680,220 L750,220 Q800,100 850,220 L920,220 L920,160 Q940,130 960,160 L960,220 L1020,220 Q1070,130 1090,180 Q1110,220 1200,220 L1200,300 Z"
            fill="rgba(212, 175, 101, 0.12)"
          />
          <path
            d="M0,300 L0,240 Q100,230 150,200 Q200,170 300,240 L400,240 Q450,160 500,240 L700,240 Q750,160 800,240 L900,240 Q1000,170 1050,200 Q1100,230 1200,240 L1200,300 Z"
            fill="rgba(100, 27, 46, 0.25)"
          />
        </svg>
      </div>

      {/* Golden Floral Corner Frames */}
      <div className="opening-corner-frame corner-tl" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="corner-flourish-svg">
          <path d="M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z" fill="rgba(212, 175, 101, 0.15)" />
          <path d="M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70" fill="none" stroke="#D4AF65" strokeWidth="2" />
          <circle cx="25" cy="25" r="4" fill="#D4AF65" />
        </svg>
      </div>
      <div className="opening-corner-frame corner-tr" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="corner-flourish-svg" style={{ transform: 'scaleX(-1)' }}>
          <path d="M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z" fill="rgba(212, 175, 101, 0.15)" />
          <path d="M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70" fill="none" stroke="#D4AF65" strokeWidth="2" />
          <circle cx="25" cy="25" r="4" fill="#D4AF65" />
        </svg>
      </div>
      <div className="opening-corner-frame corner-bl" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="corner-flourish-svg" style={{ transform: 'scaleY(-1)' }}>
          <path d="M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z" fill="rgba(212, 175, 101, 0.15)" />
          <path d="M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70" fill="none" stroke="#D4AF65" strokeWidth="2" />
          <circle cx="25" cy="25" r="4" fill="#D4AF65" />
        </svg>
      </div>
      <div className="opening-corner-frame corner-br" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="corner-flourish-svg" style={{ transform: 'scale(-1)' }}>
          <path d="M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z" fill="rgba(212, 175, 101, 0.15)" />
          <path d="M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70" fill="none" stroke="#D4AF65" strokeWidth="2" />
          <circle cx="25" cy="25" r="4" fill="#D4AF65" />
        </svg>
      </div>

      {/* Top Controls: Audio & Skip Intro */}
      <header className="opening-top-bar">
        {onToggleMusic && (
          <button
            className="top-ctrl-btn music-btn"
            onClick={onToggleMusic}
            title={isMuted ? 'Unmute Royal Instrumental' : 'Mute Music'}
          >
            <span className="ctrl-icon">{isMuted ? '🔇' : '🎵'}</span>
            <span className="ctrl-text">{isMuted ? 'Music Off' : 'Royal Music'}</span>
          </button>
        )}

        <button className="top-ctrl-btn skip-btn" onClick={handleSkipIntro} title="Skip directly to Wedding Invitation">
          <span className="ctrl-text">Skip Intro</span>
          <span className="ctrl-icon">➔</span>
        </button>
      </header>

      {/* 3D Realistic Royal Wedding Envelope */}
      <div className="envelope-perspective-wrapper">
        <div className={`royal-3d-envelope ${stage !== 'closed' ? 'is-opening' : ''}`}>
          
          {/* Back Pocket of Envelope */}
          <div className="envelope-pocket-back"></div>

          {/* Invitation Card that slides up when opened */}
          <div className="envelope-inner-card">
            <div className="card-ornamental-border">
              <img src="assets/champagne_ganesha_bright.png" alt="Ganesha" className="card-ganesha-mini" />
              <div className="card-sacred-text">|| Shree Ganeshay Namah ||</div>
              <div className="card-title">THE ROYAL WEDDING</div>
              <div className="card-couple">Teena &amp; Kuldeep</div>
              <div className="card-date">11 DECEMBER 2026</div>
              <div className="card-venue">JAIPUR, RAJASTHAN</div>
            </div>
          </div>

          {/* Front Triangles / Left & Right Flaps */}
          <div className="envelope-flap-left"></div>
          <div className="envelope-flap-right"></div>
          <div className="envelope-pocket-front"></div>

          {/* Top Flap with 3D Flip */}
          <div className="envelope-flap-top">
            <div className="top-flap-crest">
              <img src="assets/champagne_ganesha_bright.png" alt="Embossed Ganesha" className="flap-ganesha-img" />
            </div>
          </div>

          {/* Royal Wax Seal with Initials T & K */}
          <div
            className={`royal-wax-seal ${stage !== 'closed' ? 'seal-break' : ''}`}
            onClick={handleOpenInvitation}
            role="button"
            tabIndex={0}
            title="Click to break wax seal and open invitation"
          >
            <div className="wax-outer-ring">
              <div className="wax-inner-core">
                <span className="wax-monogram">T &amp; K</span>
              </div>
            </div>
            <div className="seal-spark-halo"></div>
          </div>

          {/* Envelope Front Details */}
          <div className="envelope-front-copy">
            <div className="env-invitation-label">YOU ARE CORDIALLY INVITED</div>
            <h1 className="env-couple-title">TEENA &amp; KULDEEP</h1>
            <div className="env-sub-title">THE ROYAL WEDDING CELEBRATION</div>
            <div className="env-date-strip">FRIDAY, 11 DECEMBER 2026</div>

            <button
              className="btn-royal-open-invitation"
              onClick={handleOpenInvitation}
              aria-label="Open your royal wedding invitation"
            >
              <span className="btn-shimmer"></span>
              <span className="btn-royal-icon">✉</span>
              <span className="btn-royal-text">OPEN YOUR INVITATION</span>
              <span className="btn-royal-sparkle">✦</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Hint */}
      <div className="opening-bottom-hint">
        <span>Tap to unveil the sacred celebration • 11.12.2026</span>
      </div>
    </div>
  );
}
