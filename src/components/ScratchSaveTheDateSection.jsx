import React, { useState, useEffect, useRef } from 'react';

function ScratchCard({ id, value, label, isRevealed, onRevealed }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const scratchedPixels = useRef(0);
  const totalPixels = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth || 90);
    const height = (canvas.height = canvas.offsetHeight || 130);
    totalPixels.current = width * height;

    if (isRevealed) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    // Draw frosted silver-pearl metallic scratch coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D6DDE6');
    grad.addColorStop(0.3, '#EAEFF5');
    grad.addColorStop(0.7, '#C5CFDC');
    grad.addColorStop(1, '#BAC5D4');
    ctx.fillStyle = grad;

    // Arched shape clip
    ctx.beginPath();
    ctx.arc(width / 2, width / 2, width / 2, Math.PI, 0, false);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Subtle scratch instruction text
    ctx.font = '600 11px Montserrat, sans-serif';
    ctx.fillStyle = '#6E7C8E';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH', width / 2, height / 2 + 5);
  }, [isRevealed]);

  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2, false);
    ctx.fill();

    scratchedPixels.current += 1;
    // Auto-reveal when enough scratches performed
    if (scratchedPixels.current > 20) {
      if (onRevealed) onRevealed(id);
    }
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      className={`scratch-card-box ${isRevealed ? 'is-scratched-open' : ''}`}
      onClick={() => onRevealed && onRevealed(id)}
      role="button"
      tabIndex={0}
      title="Scratch to reveal date"
    >
      {/* Revealed Date Content Underneath */}
      <div className="scratch-card-under-content">
        <span className="scratch-val-text">{value}</span>
        <span className="scratch-lbl-text">{label}</span>
      </div>

      {/* Interactive Scratch Canvas Layer */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="scratch-interactive-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />
      )}
    </div>
  );
}

export default function ScratchSaveTheDateSection() {
  const [revealed, setRevealed] = useState({ day: false, month: false, year: false });

  const remainingCount = [revealed.day, revealed.month, revealed.year].filter(v => !v).length;

  const handleCardRevealed = (cardKey) => {
    setRevealed(prev => ({ ...prev, [cardKey]: true }));
  };

  const revealAllCards = () => {
    setRevealed({ day: true, month: true, year: true });
  };

  // Real-time Live Countdown to 11 Dec 2026, 02:00 AM IST
  const targetDate = new Date('2026-12-11T02:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="save-the-date-section" id="save-the-date">
      {/* Header */}
      <div className="section-title-wrap">
        <p className="section-pre-title">SAVE THE DATE</p>
        <h2 className="section-script-title">For the Wedding Celebration</h2>
      </div>

      {/* Watercolor Blue Ribbon Bow */}
      <div className="ribbon-bow-wrap" aria-hidden="true">
        <img src="assets/blue_bow.png" alt="Decorative Bow" className="ribbon-bow-img" />
      </div>

      {/* 3 Interactive Arched Scratch Cards */}
      <div className="scratch-cards-grid">
        <ScratchCard
          id="day"
          value="11"
          label="DAY"
          isRevealed={revealed.day}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          id="month"
          value="DEC"
          label="MONTH"
          isRevealed={revealed.month}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          id="year"
          value="2026"
          label="YEAR"
          isRevealed={revealed.year}
          onRevealed={handleCardRevealed}
        />
      </div>

      {/* Reveal Progress or Action */}
      <div className="reveal-progress-row">
        {remainingCount > 0 ? (
          <button onClick={revealAllCards} className="btn-reveal-hint" title="Tap to reveal all date cards">
            ✦ {remainingCount} MORE TO REVEAL ✦
          </button>
        ) : (
          <span className="reveal-success-badge">✦ ALL REVEALED! SAVE THE DATE ✦</span>
        )}
      </div>

      {/* Timing Details */}
      <div className="save-date-subtext">
        <p className="day-name-caps">FRIDAY</p>
        <p className="celebration-time-caps">Celebrations begin at 7:30 PM</p>
      </div>

      {/* Live Countdown Timer */}
      <div className="wedding-countdown-block">
        <p className="countdown-prompt-title">The wedding begins in</p>
        <div className="countdown-rings-container">
          <div className="countdown-ring-circle">
            <span className="count-num">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="count-lbl">DAYS</span>
          </div>
          <div className="countdown-ring-circle">
            <span className="count-num">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="count-lbl">HOURS</span>
          </div>
          <div className="countdown-ring-circle">
            <span className="count-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="count-lbl">MINUTES</span>
          </div>
          <div className="countdown-ring-circle">
            <span className="count-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="count-lbl">SECONDS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
