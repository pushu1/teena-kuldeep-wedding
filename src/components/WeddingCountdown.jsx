import React, { useState, useEffect } from 'react';

export default function WeddingCountdown() {
  const targetDate = new Date('2026-12-11T02:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="parchment-section countdown-section" id="wedding-countdown">
      <div className="countdown-card-inner">
        <span className="small-section-tag">AUSPICIOUS TIMING</span>
        <h2 className="main-section-heading">Wedding Countdown</h2>
        <p className="countdown-lead-sub">
          Counting down every blessed second to the sacred vows &amp; Seven Pheras
        </p>

        <div className="countdown-timer-grid">
          <div className="timer-unit-box">
            <span className="timer-number">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="timer-label">DAYS</span>
          </div>
          <div className="timer-colon">:</div>
          <div className="timer-unit-box">
            <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="timer-label">HOURS</span>
          </div>
          <div className="timer-colon">:</div>
          <div className="timer-unit-box">
            <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="timer-label">MINUTES</span>
          </div>
          <div className="timer-colon">:</div>
          <div className="timer-unit-box">
            <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="timer-label">SECONDS</span>
          </div>
        </div>

        <div className="countdown-footer-note">
          <span>✨ 11 December 2026 • 02:00 AM IST ✨</span>
        </div>
      </div>
    </section>
  );
}
