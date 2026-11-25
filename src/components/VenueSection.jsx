import React, { useState } from 'react';

export default function VenueSection() {
  const [copied, setCopied] = useState(false);

  const venueName = 'SHRI ADIGAUD BRAHMIN SAMAJ DHARAMSHALA';
  const venueAddress = 'Tejaji Nagar, 80 Feet Road, Mahesh Nagar, Jaipur, Rajasthan, India.';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shri+Adigaud+Brahmin+Samaj+Dharamshala+Tejaji+Nagar+80+Feet+Road+Mahesh+Nagar+Jaipur+Rajasthan';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    }).catch(() => {});
  };

  return (
    <section className="wedding-section venue-section" id="venue-section">
      <div className="section-royal-card">
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Section Header */}
        <div className="section-header-flourish">
          <span className="shloka-text">|| विवाह स्थल ||</span>
          <h2 className="section-title-gold">WEDDING VENUE</h2>
          <p className="section-subtitle-script">
            The royal auspicious destination where family &amp; friends unite
          </p>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Venue Showcase Card */}
        <div className="venue-grand-card">
          
          {/* Royal Architectural Illustration */}
          <div className="venue-arch-illustration">
            <svg viewBox="0 0 500 160" className="palace-arch-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8D5A3" />
                  <stop offset="50%" stopColor="#D4AF65" />
                  <stop offset="100%" stopColor="#8C6A28" />
                </linearGradient>
              </defs>

              {/* Background Pavilion Glow */}
              <rect x="50" y="40" width="400" height="110" rx="8" fill="rgba(100, 27, 46, 0.3)" />

              {/* Grand Central Chhatri Dome */}
              <path
                d="M 250,15 C 240,35 210,40 190,60 C 180,70 180,85 180,120 L 320,120 C 320,85 320,70 310,60 C 290,40 260,35 250,15 Z"
                fill="rgba(212, 175, 101, 0.22)"
                stroke="url(#goldArchGrad)"
                strokeWidth="2"
              />
              {/* Kalash on Dome */}
              <path d="M 250,5 L 250,15" stroke="url(#goldArchGrad)" strokeWidth="3" />
              <circle cx="250" cy="5" r="4" fill="#D4AF65" />

              {/* Left & Right Flanking Chhatris */}
              <path
                d="M 120,40 C 115,55 95,60 85,75 C 80,82 80,95 80,120 L 160,120 C 160,95 160,82 155,75 C 145,60 125,55 120,40 Z"
                fill="rgba(212, 175, 101, 0.15)"
                stroke="url(#goldArchGrad)"
                strokeWidth="1.5"
              />
              <path
                d="M 380,40 C 375,55 355,60 345,75 C 340,82 340,95 340,120 L 420,120 C 420,95 420,82 415,75 C 405,60 385,55 380,40 Z"
                fill="rgba(212, 175, 101, 0.15)"
                stroke="url(#goldArchGrad)"
                strokeWidth="1.5"
              />

              {/* Arched Pillars & Jali Screen Base */}
              <line x1="60" y1="120" x2="440" y2="120" stroke="url(#goldArchGrad)" strokeWidth="2.5" />
              <line x1="50" y1="140" x2="450" y2="140" stroke="url(#goldArchGrad)" strokeWidth="3" />

              {/* Royal Hanging Lanterns */}
              <line x1="120" y1="120" x2="120" y2="135" stroke="#D4AF65" strokeWidth="1" />
              <circle cx="120" cy="136" r="3" fill="#D4AF65" />
              <line x1="380" y1="120" x2="380" y2="135" stroke="#D4AF65" strokeWidth="1" />
              <circle cx="380" cy="136" r="3" fill="#D4AF65" />
            </svg>
          </div>

          <div className="venue-info-body">
            <div className="venue-location-pin">
              <span className="pin-pulse"></span>
              <span className="pin-icon">📍</span>
            </div>

            <h3 className="venue-name-title">{venueName}</h3>

            <div className="venue-address-badge">
              <p className="address-line">{venueAddress}</p>
            </div>

            <p className="venue-welcome-note">
              Conveniently situated in Tejaji Nagar on 80 Feet Road in Jaipur, with comfortable banquet facilities, guest accommodations, and ample vehicle parking.
            </p>

            {/* Action Buttons */}
            <div className="venue-buttons-row">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-btn btn-google-maps"
                aria-label="Open verified venue in Google Maps"
              >
                <span className="btn-icon">🗺️</span>
                <span className="btn-text">OPEN IN GOOGLE MAPS</span>
                <span className="btn-arrow">↗</span>
              </a>

              <button
                className={`venue-btn btn-copy-address ${copied ? 'copied' : ''}`}
                onClick={handleCopyAddress}
                aria-label="Copy venue address to clipboard"
              >
                <span className="btn-icon">{copied ? '✓' : '📋'}</span>
                <span className="btn-text">{copied ? 'COPIED TO CLIPBOARD!' : 'COPY ADDRESS FOR CAB'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
