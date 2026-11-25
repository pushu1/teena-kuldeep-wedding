import React from 'react';

export default function ReceptionDetailsPage({ onBack, onOpenInvitation }) {
  const mapsUrl = 'https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9';

  return (
    <div className="reception-details-page-wrapper" id="reception-details-screen">
      {/* Ambient Radial Golden Aura Backdrop */}
      <div className="venue-page-aura"></div>

      {/* Sticky Top Navigation Bar with Back Button */}
      <header className="venue-page-top-bar">
        <button
          className="royal-back-nav-btn"
          onClick={onBack}
          aria-label="Return to wedding invitation"
          title="Return to wedding invitation"
        >
          <span className="back-arrow">←</span>
          <span className="back-label">BACK TO INVITATION</span>
        </button>

        <span className="top-bar-divider-dot">•</span>

        <button
          className="royal-invitation-nav-btn"
          onClick={onOpenInvitation}
          aria-label="Open complete digital wedding invitation"
          title="Open complete digital wedding invitation"
        >
          <span>OPEN INVITATION ➔</span>
        </button>
      </header>

      {/* Main Ornamental Card */}
      <div className="venue-details-card">
        {/* Double Gold Ornamental Frame with Corner Filigrees */}
        <div className="venue-card-ornamental-frame" aria-hidden="true">
          <span className="frame-corner top-left">✦</span>
          <span className="frame-corner top-right">✦</span>
          <span className="frame-corner bottom-left">✦</span>
          <span className="frame-corner bottom-right">✦</span>
        </div>

        {/* Sacred Invocation */}
        <div className="venue-page-invocation">
          <div className="shloka-row">
            <span className="shloka-diamond">❖</span>
            <span className="shloka-text">॥ श्री गणेशाय नमः ॥</span>
            <span className="shloka-diamond">❖</span>
          </div>
          <p className="blessings-subtitle">WITH THE DIVINE BLESSINGS OF BELOVED ELDERS</p>
        </div>

        {/* Reception Date Header */}
        <div className="venue-date-header">
          <span className="event-pill-tag">AUSPICIOUS CELEBRATION</span>
          <h1 className="reception-main-title">RECEPTION — 13 DECEMBER 2026</h1>
          <div className="ornate-gold-divider" aria-hidden="true">
            <span className="div-line"></span>
            <span className="div-gem">❖</span>
            <span className="div-line"></span>
          </div>
        </div>

        {/* Venue Information Block */}
        <div className="venue-address-showcase">
          <span className="venue-label-badge">VENUE LOCATION</span>
          <h2 className="venue-name-title">Jain Bagbera Dadawadi</h2>
          <p className="venue-street-line">Venkatesh Marg, Near Venkatesh Temple</p>
          <p className="venue-city-line">Pali, Rajasthan — 306401, India</p>

          <div className="venue-timing-badge">
            <span className="timing-icon">⏰</span>
            <span className="timing-text">Aashirwad Samaroh & Preetibhoj • 06:00 PM Onwards</span>
          </div>
        </div>

        {/* QR Code and Direct Google Maps Navigation Section */}
        <div className="venue-qr-navigation-panel">
          {/* Scannable QR Code Card */}
          <div className="venue-qr-container">
            <div className="qr-image-frame">
              <img
                src="assets/venue_maps_qr.png"
                alt="Scannable Google Maps QR Code for Jain Bagbera Dadawadi Pali"
                className="venue-qr-image"
                width="170"
                height="170"
              />
            </div>
            <div className="qr-captions-group">
              <span className="qr-caption-main">SCAN FOR DIRECTIONS</span>
              <span className="qr-caption-sub">Point phone camera to open Maps</span>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="venue-cta-column">
            <p className="cta-lead-text">
              Navigate seamlessly to Jain Bagbera Dadawadi with turn-by-turn directions via Google Maps:
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="prominent-google-maps-btn"
              id="btn-open-google-maps-direct"
              title="Open Google Maps in new window"
            >
              <span className="btn-pin-icon">📍</span>
              <span className="btn-text-content">OPEN GOOGLE MAPS ↗</span>
              <div className="btn-glow-aura"></div>
            </a>

            <div className="maps-url-preview-pill">
              <span className="url-label">Direct Link:</span>
              <span className="url-text">maps.app.goo.gl/hPi6DXWJZEpUG5Vm9</span>
            </div>
          </div>
        </div>

        {/* Upadhyay Family Host & RSVP Footer */}
        <div className="venue-host-rsvp-bar">
          <p className="host-family-text">
            Upadhyay Family • Pali (Rajasthan)
          </p>
          <div className="rsvp-numbers-row">
            <span className="rsvp-tag">RSVP & INQUIRIES:</span>
            <a href="tel:+919461061236" className="rsvp-link">+91 94610 61236</a>
            <span className="rsvp-sep">•</span>
            <a href="tel:+919887997822" className="rsvp-link">+91 98879 97822</a>
          </div>
        </div>

        {/* Bottom Quick Navigation */}
        <div className="venue-page-bottom-actions">
          <button
            className="bottom-nav-secondary-btn"
            onClick={onBack}
          >
            ← Return to Wedding Card
          </button>
          <button
            className="bottom-nav-primary-btn"
            onClick={onOpenInvitation}
          >
            Open Wedding Ceremonies ➔
          </button>
        </div>
      </div>
    </div>
  );
}