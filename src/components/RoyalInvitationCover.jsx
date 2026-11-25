import React from 'react';

export default function RoyalInvitationCover() {
  const pdfUrl = 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf';

  const handleOpenPdf = () => {
    // Open the PDF directly in the current browser tab using native PDF viewer
    window.location.href = pdfUrl;
  };

  return (
    <section className="emerald-cover-screen" id="invitation-cover">
      {/* Subtle Ambient Radial Aura Backdrop */}
      <div className="emerald-backdrop-aura" aria-hidden="true" />

      {/* Decorative Outer & Inner Borders */}
      <div className="cover-frame-outer" aria-hidden="true" />
      <div className="cover-frame-inner" aria-hidden="true" />

      {/* Minimal Botanical Corner Illustrations */}
      <svg className="cover-botanical corner-tl" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M10 10 L60 10 M10 10 L10 60" stroke="#D8C39A" strokeWidth="2" />
        <polygon points="10,10 16,16 10,22 4,16" fill="#D8C39A" />
        <path d="M16 16 C35 30 50 50 65 80" stroke="#97AB97" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 26 C25 22 30 18 36 22 C37 28 32 30 28 26 Z" fill="#97AB97" />
        <path d="M42 38 C39 34 44 30 50 34 C51 40 46 42 42 38 Z" fill="#97AB97" />
        <path d="M54 54 C51 50 56 46 62 50 C63 56 58 58 54 54 Z" fill="#97AB97" />
        <circle cx="34" cy="24" r="2.5" fill="#D8C39A" />
        <circle cx="48" cy="36" r="2.5" fill="#D8C39A" />
      </svg>
      <svg className="cover-botanical corner-tr" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M10 10 L60 10 M10 10 L10 60" stroke="#D8C39A" strokeWidth="2" />
        <polygon points="10,10 16,16 10,22 4,16" fill="#D8C39A" />
        <path d="M16 16 C35 30 50 50 65 80" stroke="#97AB97" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 26 C25 22 30 18 36 22 C37 28 32 30 28 26 Z" fill="#97AB97" />
        <path d="M42 38 C39 34 44 30 50 34 C51 40 46 42 42 38 Z" fill="#97AB97" />
        <path d="M54 54 C51 50 56 46 62 50 C63 56 58 58 54 54 Z" fill="#97AB97" />
        <circle cx="34" cy="24" r="2.5" fill="#D8C39A" />
        <circle cx="48" cy="36" r="2.5" fill="#D8C39A" />
      </svg>
      <svg className="cover-botanical corner-bl" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M10 10 L60 10 M10 10 L10 60" stroke="#D8C39A" strokeWidth="2" />
        <polygon points="10,10 16,16 10,22 4,16" fill="#D8C39A" />
        <path d="M16 16 C35 30 50 50 65 80" stroke="#97AB97" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 26 C25 22 30 18 36 22 C37 28 32 30 28 26 Z" fill="#97AB97" />
        <path d="M42 38 C39 34 44 30 50 34 C51 40 46 42 42 38 Z" fill="#97AB97" />
        <path d="M54 54 C51 50 56 46 62 50 C63 56 58 58 54 54 Z" fill="#97AB97" />
        <circle cx="34" cy="24" r="2.5" fill="#D8C39A" />
        <circle cx="48" cy="36" r="2.5" fill="#D8C39A" />
      </svg>
      <svg className="cover-botanical corner-br" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M10 10 L60 10 M10 10 L10 60" stroke="#D8C39A" strokeWidth="2" />
        <polygon points="10,10 16,16 10,22 4,16" fill="#D8C39A" />
        <path d="M16 16 C35 30 50 50 65 80" stroke="#97AB97" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 26 C25 22 30 18 36 22 C37 28 32 30 28 26 Z" fill="#97AB97" />
        <path d="M42 38 C39 34 44 30 50 34 C51 40 46 42 42 38 Z" fill="#97AB97" />
        <path d="M54 54 C51 50 56 46 62 50 C63 56 58 58 54 54 Z" fill="#97AB97" />
        <circle cx="34" cy="24" r="2.5" fill="#D8C39A" />
        <circle cx="48" cy="36" r="2.5" fill="#D8C39A" />
      </svg>

      <div className="cover-content-container">
        {/* Top Auspicious Invocations */}
        <header className="cover-header-section">
          <div className="ganesha-emblem-wrap">
            <img
              src="assets/champagne_ganesha_bright.png"
              alt="Lord Ganesha"
              className="ganesha-top-emblem"
            />
          </div>
          <p className="cover-ganesh-shloka">॥ श्री गणेशाय नमः ॥</p>
          <h2 className="cover-divine-heading">BY THE DIVINE BLESSINGS OF LORD GANESHA</h2>
          <h1 className="cover-main-title">
            <span className="name-part">KULDEEP</span>
            <span className="title-star">✦</span>
            <span className="name-part">TEENA</span>
          </h1>
          <p className="cover-subtitle">ROYAL WEDDING INVITATION</p>
        </header>

        {/* Groom & Bride Portraits Showcase */}
        <div className="cover-portraits-showcase">
          {/* Groom: Kuldeep */}
          <div className="cover-portrait-card portrait-groom">
            <div className="portrait-regal-frame">
              <img
                src="assets/groom_kuldeep.jpg"
                alt="Groom – Kuldeep"
                className="couple-photo-img"
              />
            </div>
            <p className="portrait-caption-label">GROOM – Kuldeep</p>
          </div>

          {/* Minimal connecting symbol */}
          <div className="portraits-connector" aria-hidden="true">
            <div className="connector-stem"></div>
            <div className="connector-star">✦</div>
            <div className="connector-stem"></div>
          </div>

          {/* Bride: Teena */}
          <div className="cover-portrait-card portrait-bride">
            <div className="portrait-regal-frame">
              <img
                src="assets/bride_teena.jpg"
                alt="Bride – Teena"
                className="couple-photo-img"
              />
            </div>
            <p className="portrait-caption-label">BRIDE – Teena</p>
          </div>
        </div>

        {/* Auspicious Date Headline */}
        <div className="cover-date-headline">
          <div className="date-separator-wrap">
            <span className="date-dash"></span>
            <span className="date-value">11 DECEMBER 2026</span>
            <span className="date-dash"></span>
          </div>
          <p className="cover-location-text">PALI, RAJASTHAN</p>
        </div>

        {/* Primary Call-to-Actions */}
        <div className="cover-action-buttons-wrap">
          {/* 1. Open PDF Invitation in Browser */}
          <button
            className="cover-btn cover-btn-primary"
            onClick={handleOpenPdf}
            id="btn-open-invitation"
            aria-label="Open wedding invitation PDF directly in browser"
          >
            <span className="btn-icon">📜</span>
            <span className="btn-label">OPEN INVITATION (PDF)</span>
            <span className="btn-shimmer" aria-hidden="true"></span>
          </button>

          {/* 2. Download PDF */}
          <a
            href={pdfUrl}
            download="Kuldeep_Teena_Royal_Wedding_Invitation.pdf"
            className="cover-btn cover-btn-secondary"
            id="btn-download-pdf-cover"
            title="Download wedding invitation PDF"
          >
            <span className="btn-icon">⬇</span>
            <span className="btn-label">DOWNLOAD PDF</span>
          </a>
        </div>

        {/* Quick Link Shortcuts */}
        <div className="cover-bottom-shortcuts">
          <a
            href="https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9"
            target="_blank"
            rel="noopener noreferrer"
            className="cover-venue-quick-link"
            title="Open Reception Venue in Google Maps"
          >
            <span>📍 Reception: Jain Bagbera Dadawadi, Pali (Google Maps ↗)</span>
          </a>
          <div className="cover-sub-links-row">
            <a
              href="https://wa.me/919461061236?text=Heartiest%20Congratulations%20to%20Kuldeep%20%26%20Teena%20and%20Upadhyay%20Family%20on%20their%20auspicious%20wedding!"
              target="_blank"
              rel="noopener noreferrer"
              className="cover-mini-link"
            >
              💬 Send Wishes on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
