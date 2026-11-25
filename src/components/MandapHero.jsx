import React from 'react';

export default function MandapHero({ onScrollClick }) {
  return (
    <section className="mandap-hero-section" id="mandap-hero">
      {/* Top Auspicious Invocations & Couple Title */}
      <div className="hero-header-card">
        <div className="sacred-invocation-tag">
          <span className="shloka-ornament">✦</span>
          <span className="shloka-devanagari">॥ श्री गणेशाय नमः ॥</span>
          <span className="shloka-ornament">✦</span>
        </div>

        <h1 className="hero-main-title">
          <span className="hero-name">KULDEEP</span>
          <span className="hero-weds">weds</span>
          <span className="hero-name">TEENA</span>
        </h1>

        <div className="hero-invitation-subtitle">
          UPADHYAY FAMILY INVITATION
        </div>

        <div className="hero-date-badge">
          <span className="date-leaf">❧</span>
          <span className="date-text">Friday, 11 December 2026</span>
          <span className="date-leaf">❧</span>
        </div>
      </div>

      {/* The Animated Wedding Mandap Stage */}
      <div className="mandap-stage-viewport">
        {/* Sky & Clouds Horizon */}
        <div className="mandap-sky-backdrop"></div>

        {/* Mandap Base Architectural Structure with Slow Cinematic Camera Zoom */}
        <div className="mandap-camera-rig">
          <img
            src="assets/mandap_pristine.jpg"
            alt="Traditional Indian Wedding Mandap"
            className="mandap-base-image"
          />

          {/* Swaying Banana Trees & Foliage (Left & Right) */}
          <div className="banana-leaf-wrapper leaf-left">
            <img
              src="assets/banana_leaf_left_perfect.png"
              alt="Swaying Banana Leaf"
              className="banana-leaf-img leaf-left-anim"
            />
          </div>

          <div className="banana-leaf-wrapper leaf-right">
            <img
              src="assets/banana_leaf_right_perfect.png"
              alt="Swaying Banana Leaf"
              className="banana-leaf-img leaf-right-anim"
            />
          </div>

          {/* Interactive Hanging Flower Garlands Breeze Layer */}
          <div className="mandap-garlands-breeze-layer" aria-hidden="true">
            <div className="festoons-row">
              <span className="garland-petal p-1">🌸</span>
              <span className="garland-petal p-2">🌼</span>
              <span className="garland-petal p-3">🌸</span>
              <span className="garland-petal p-4">🌼</span>
              <span className="garland-petal p-5">🌸</span>
            </div>
          </div>

          {/* Gentle Hanging Golden Temple Bells (Swinging) */}
          <div className="mandap-bells-swing-layer" aria-hidden="true">
            <div className="mandap-bell bell-1">
              <span className="bell-string"></span>
              <span className="bell-brass">🔔</span>
            </div>
            <div className="mandap-bell bell-2">
              <span className="bell-string"></span>
              <span className="bell-brass">🔔</span>
            </div>
            <div className="mandap-bell bell-3">
              <span className="bell-string"></span>
              <span className="bell-brass">🔔</span>
            </div>
            <div className="mandap-bell bell-4">
              <span className="bell-string"></span>
              <span className="bell-brass">🔔</span>
            </div>
          </div>
        </div>

        {/* Subtle Atmospheric Mist & Floral Petal Drift at Mandap Threshold */}
        <div className="mandap-threshold-blend"></div>

        {/* The Two Royal Circular Action Buttons Side-by-Side */}
        <div className="hero-circular-buttons-row">
          {/* Button A: INVITATION BUTTON (CLICK HERE) */}
          <button
            className="royal-circle-action-btn btn-invitation"
            onClick={onScrollClick}
            aria-label="Click here to open royal wedding invitation"
            title="Click here to enter and view wedding ceremonies"
          >
            <div className="circle-glow-halo"></div>
            <div className="circle-rotating-ring">
              <svg viewBox="0 0 100 100" className="rotating-ring-svg" aria-hidden="true">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              </svg>
            </div>
            <div className="circle-bevel-border"></div>
            <div className="circle-core-teal">
              <span className="circle-jewel-star top">✦</span>
              <span className="circle-btn-text main">CLICK</span>
              <span className="circle-btn-text sub">HERE</span>
              <span className="circle-jewel-star bottom">✦</span>
            </div>
            <span className="circle-btn-label">Open Invitation</span>
          </button>

          {/* Button B: VENUE BUTTON (VIEW VENUE) */}
          <a
            href="https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9"
            target="_blank"
            rel="noopener noreferrer"
            className="royal-circle-action-btn btn-venue"
            aria-label="View Venue on Google Maps"
            title="Open Google Maps navigation to Jain Bagbera Dadawadi"
          >
            <div className="circle-glow-halo"></div>
            <div className="circle-rotating-ring">
              <svg viewBox="0 0 100 100" className="rotating-ring-svg" aria-hidden="true">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              </svg>
            </div>
            <div className="circle-bevel-border"></div>
            <div className="circle-core-teal">
              <span className="circle-pin-icon">📍</span>
              <span className="circle-btn-text main">VIEW</span>
              <span className="circle-btn-text sub">VENUE</span>
              <span className="circle-jewel-star bottom">✦</span>
            </div>
            <span className="circle-btn-label">Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
