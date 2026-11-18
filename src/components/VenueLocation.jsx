import React from 'react';

export default function VenueLocation() {
  const mapsUrl = 'https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9';

  return (
    <section className="parchment-section venue-location-section" id="venue-location">
      <div className="section-header-wrap">
        <p className="small-section-tag">DIRECTIONS &amp; VENUE</p>
        <h2 className="main-section-heading">Venue &amp; Navigation</h2>
        <div className="gold-ornamental-divider">
          <span className="divider-flourish">❦</span>
        </div>
      </div>

      <div className="venue-card-content">
        <div className="venue-info-header">
          <h3 className="venue-name-hi">जैन बागबेरा दादावाडी</h3>
          <h4 className="venue-name-en">Jain Bagbera Dadawadi</h4>
          <p className="venue-address-line">
            Venkatesh Marg, Pali, Rajasthan, India
          </p>
        </div>

        {/* QR Code and Direct Navigation Link */}
        <div className="venue-qr-row">
          <div className="qr-wrapper">
            <img
              src="assets/venue_maps_qr.png"
              alt="Scan for Google Maps Navigation"
              className="venue-qr-image"
            />
            <span className="qr-caption">Scan with Phone Camera</span>
          </div>

          <div className="qr-directions-cta">
            <p className="directions-hint">
              Tap the button below for seamless GPS navigation directly to the celebration venue.
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-gold-btn maps-nav-btn"
              title="Open Google Maps for turn-by-turn navigation"
            >
              <span className="btn-icon">📍</span>
              <span>Open in Google Maps ↗</span>
            </a>
          </div>
        </div>

        {/* Embedded Map Visual Card */}
        <div className="embedded-map-container">
          <div className="map-art-backdrop">
            <div className="map-pin-badge">
              <span className="pin-pulse"></span>
              <span className="pin-symbol">📍</span>
              <span className="pin-label">Jain Bagbera Dadawadi, Pali</span>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-tap-overlay"
              title="Click to navigate with Google Maps"
            >
              <span>Tap to Open Live GPS Navigation ↗</span>
            </a>
          </div>
          <iframe
            title="Reception Venue Location"
            src="https://maps.google.com/maps?q=Jain%20Bagbera%20Dadawadi%2C%20Venkatesh%20Marg%2C%20Pali%2C%20Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="venue-iframe-map"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
