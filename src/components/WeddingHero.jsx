import React from 'react';

export default function WeddingHero({ onOpenCardViewer, onDownloadPDF }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="wedding-hero-section" id="hero-section">
      {/* Royal Palace Background & Atmospheric Overlay */}
      <div className="hero-palace-backdrop" aria-hidden="true">
        <div className="hero-radial-vignette"></div>
        <div className="hero-palace-silhouette"></div>
      </div>

      {/* Floating Animated Floral Garland & Jharokha Arch */}
      <div className="hero-royal-arch-frame" aria-hidden="true">
        <svg viewBox="0 0 400 120" className="hero-arch-svg" preserveAspectRatio="none">
          <path
            d="M 0,0 L 400,0 L 400,30 Q 300,30 250,70 Q 200,110 150,70 Q 100,30 0,30 Z"
            fill="rgba(100, 27, 46, 0.45)"
          />
          <path
            d="M 0,0 L 400,0 L 400,20 Q 300,20 250,55 Q 200,95 150,55 Q 100,20 0,20 Z"
            fill="none"
            stroke="#D4AF65"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="hero-content-wrapper">
        {/* Sacred Top Shloka & Lord Ganesha Emblem */}
        <div className="hero-invocation-group">
          <div className="hero-ganesha-emblem">
            <img
              src="assets/champagne_ganesha_bright.png"
              alt="Lord Ganesha"
              className="hero-ganesha-img"
            />
          </div>
          <div className="hero-shloka-text">|| SHREE GANESHAY NAMAH ||</div>
          <div className="hero-shubh-vivah">Auspicious Wedding Celebration</div>
        </div>

        {/* Grand Wedding Heading */}
        <div className="hero-royal-badge">
          <span className="badge-flourish">✦</span>
          <span className="badge-text">THE ROYAL WEDDING CELEBRATION</span>
          <span className="badge-flourish">✦</span>
        </div>

        {/* Bride & Groom Names */}
        <div className="hero-names-display">
          <h1 className="hero-name-primary">
            TEENA
          </h1>
          <div className="hero-ampersand-wrapper">
            <span className="ampersand-line"></span>
            <span className="ampersand-symbol">&amp;</span>
            <span className="ampersand-line"></span>
          </div>
          <h1 className="hero-name-primary">KULDEEP</h1>
        </div>

        {/* Date Announcement */}
        <div className="hero-date-badge">
          <div className="date-icon">✦</div>
          <div className="date-main">FRIDAY | 11 DECEMBER 2026</div>
          <div className="date-icon">✦</div>
        </div>

        {/* Romantic Heritage Tagline */}
        <p className="hero-journey-quote">
          “Two Hearts, One Beautiful Journey”
        </p>

        {/* Interactive Action Hub */}
        <div className="hero-cta-button-group">
          <button
            className="hero-btn btn-view-card"
            onClick={onOpenCardViewer}
            aria-label="View interactive wedding invitation card"
          >
            <span className="btn-icon">📜</span>
            <span className="btn-text">VIEW WEDDING CARD</span>
          </button>

          <a
            href="Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
            download="Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
            className="hero-btn btn-download-pdf"
            onClick={onDownloadPDF}
            aria-label="Download official royal wedding invitation PDF"
          >
            <span className="btn-icon">📥</span>
            <span className="btn-text">DOWNLOAD PDF</span>
          </a>

          <button
            className="hero-btn btn-secondary-itinerary"
            onClick={() => scrollToSection('events-section')}
            aria-label="Jump to event schedule"
          >
            <span className="btn-icon">🗓️</span>
            <span className="btn-text">ITINERARY</span>
          </button>

          <button
            className="hero-btn btn-secondary-venue"
            onClick={() => scrollToSection('venue-section')}
            aria-label="Jump to venue directions"
          >
            <span className="btn-icon">📍</span>
            <span className="btn-text">VENUE</span>
          </button>
        </div>

        {/* Smooth Scroll Down Indicator */}
        <div
          className="hero-scroll-indicator"
          onClick={() => scrollToSection('bride-section')}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to bride's family details"
        >
          <span className="scroll-label">Scroll to Explore</span>
          <div className="scroll-chevron-bounce">
            <svg viewBox="0 0 24 24" className="chevron-svg">
              <path d="M7 10l5 5 5-5" fill="none" stroke="#D4AF65" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
