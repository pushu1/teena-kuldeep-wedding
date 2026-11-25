import React from 'react';

export default function ReceptionVenueSection() {
  const mapsUrl = 'https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9';

  return (
    <section className="reception-bottom-venue-section" id="reception-venue-bottom">
      {/* Premium Gold Ornamental Frame around Venue Section */}
      <div className="venue-ornamental-frame">
        <span className="frame-filigree tl">❖</span>
        <span className="frame-filigree tr">❖</span>
        <span className="frame-filigree bl">❖</span>
        <span className="frame-filigree br">❖</span>

        {/* Header: RECEPTION — 13 DECEMBER 2026 */}
        <div className="venue-section-header">
          <span className="venue-tag-mini">GRAND CELEBRATION</span>
          <h2 className="venue-reception-title">
            RECEPTION — 13 DECEMBER 2026
          </h2>
          <div className="venue-gold-underline">
            <span className="line"></span>
            <span className="gem">✦</span>
            <span className="line"></span>
          </div>
        </div>

        {/* VENUE: Jain Bagbera Dadawadi, Venkatesh Marg, Pali, Rajasthan, India */}
        <div className="venue-primary-callout">
          <span className="venue-prefix">VENUE:</span>
          <h3 className="venue-name-highlight">Jain Bagbera Dadawadi</h3>
          <p className="venue-address-full">
            Venkatesh Marg, Pali, Rajasthan, India
          </p>
          <p className="venue-timing-note">
            Aashirwad Samaroh &amp; Preetibhoj • 06:00 PM Onwards
          </p>
        </div>

        {/* Two-Column Responsive Card: QR Code (Left) & Directions Action (Right) */}
        <div className="venue-qr-action-grid">
          {/* QR Code Container */}
          <div className="venue-qr-card">
            <div className="qr-image-frame">
              <img
                src="assets/venue_maps_qr.png"
                alt="Scan QR code for Google Maps navigation to Jain Bagbera Dadawadi"
                className="venue-qr-code-img"
              />
            </div>
            <p className="qr-scan-caption">SCAN FOR DIRECTIONS</p>
            <p className="qr-hint-sub">Point phone camera to open in Google Maps</p>
          </div>

          {/* Direct Clickable Link & Instructions */}
          <div className="venue-navigation-cta-card">
            <p className="nav-lead-text">
              Join us in blessing the newlyweds. Tap the button below for turn-by-turn GPS navigation directly to the celebration venue.
            </p>
            
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="open-maps-action-btn"
              title="Open Google Maps navigation"
            >
              <span className="btn-icon">📍</span>
              <span className="btn-text">OPEN GOOGLE MAPS</span>
              <span className="btn-arrow">↗</span>
            </a>

            <div className="pdf-download-quick-wrap">
              <a
                href="public/downloads/kuldeep-teena-wedding-invitation.pdf"
                download="Kuldeep-Teena-Wedding-Invitation.pdf"
                className="download-pdf-secondary-link"
                title="Download Single-Page Official PDF Invitation"
              >
                <span>📜 Download Invitation PDF (Single Page)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Upadhyay Family RSVP & Compliments Note */}
        <div className="venue-family-rsvp-footer">
          <p className="rsvp-family-title">UPADHYAY FAMILY • PALI, RAJASTHAN</p>
          <div className="rsvp-contact-phones">
            <span>RSVP: </span>
            <a href="tel:9461061236" className="phone-link">+91 94610 61236</a>
            <span> • </span>
            <a href="tel:9887997822" className="phone-link">+91 98879 97822</a>
          </div>
        </div>
      </div>
    </section>
  );
}
