import React from 'react';

export default function HeroCoverSection() {
  return (
    <section className="invitation-hero-section" id="hero-cover">
      <div className="hero-names-wrap">
        <h1 className="hero-couple-title">
          <span className="name-script">Kuldeep</span>
          <span className="ampersand-script">&amp;</span>
          <span className="name-script">Teena</span>
        </h1>

        {/* Elegant Golden Flourish Divider */}
        <div className="golden-flourish-divider" aria-hidden="true">
          <span className="flourish-line"></span>
          <svg className="flourish-icon" viewBox="0 0 60 20" fill="none">
            <path d="M0 10 C15 10 20 2 30 2 C40 2 45 10 60 10 C45 10 40 18 30 18 C20 18 15 10 0 10 Z" fill="#C8A86B" />
            <polygon points="30,5 34,10 30,15 26,10" fill="#B5904D" />
          </svg>
          <span className="flourish-line"></span>
        </div>

        {/* Auspicious Date & Location */}
        <div className="hero-date-location">
          <p className="hero-date-line">11 &middot; DEC &middot; 2026</p>
          <p className="hero-venue-line">PALI, RAJASTHAN</p>
        </div>
      </div>

      {/* Arched Palace Lake Hero View */}
      <div className="hero-arched-view-wrap">
        <div className="hero-arch-frame">
          <img
            src="assets/ref_palace_lake_clean.jpg"
            alt="Royal Lake Palace Celebration Venue"
            className="hero-palace-img"
          />
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-chevron"></div>
      </div>
    </section>
  );
}
