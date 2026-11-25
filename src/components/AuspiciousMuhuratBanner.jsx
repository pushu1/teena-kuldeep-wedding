import React from 'react';

export default function AuspiciousMuhuratBanner() {
  return (
    <section className="auspicious-muhurat-section" id="auspicious-muhurat">
      <div className="muhurat-arch-banner">
        {/* Radiant Golden Sun Emblem */}
        <div className="sun-emblem-wrap" aria-hidden="true">
          <svg viewBox="0 0 60 60" className="sun-svg-icon">
            <circle cx="30" cy="30" r="9" fill="none" stroke="#C8A86B" strokeWidth="2" />
            <circle cx="30" cy="30" r="3.5" fill="#B5904D" />
            {/* 12 Radiant Rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="30"
                y1="13"
                x2="30"
                y2="7"
                stroke="#C8A86B"
                strokeWidth="1.8"
                strokeLinecap="round"
                transform={`rotate(${deg} 30 30)`}
              />
            ))}
          </svg>
        </div>

        {/* Script & Serif Muhurat Headings */}
        <h3 className="muhurat-script-title">Auspicious Muhurat</h3>
        <h4 className="muhurat-ceremony-name">PANIGRAHAN SANSKAR &amp; PHERAS</h4>
        <p className="muhurat-timing-line">
          Friday, 11 December 2026 &middot; Madhya-Ratri 02:00 AM
        </p>
      </div>
    </section>
  );
}
