import React from 'react';

export default function GroomFamilySection() {
  return (
    <section className="wedding-section groom-family-section" id="groom-section">
      <div className="section-royal-card">
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Section Header */}
        <div className="section-header-flourish">
          <span className="shloka-text">|| वर पक्ष • पाली ||</span>
          <div className="family-origin-pill">THE ESTEEMED UPADHYAY FAMILY OF PALI</div>
          <h2 className="section-title-gold">THE GROOM'S FAMILY</h2>
          <p className="section-subtitle-script">
            With the divine blessings of beloved ancestral elders
          </p>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Main Groom Profile Showcase Card */}
        <div className="family-showcase-container">
          <div className="couple-profile-card groom-card prominent-family-card">
            <div className="profile-frame-jharokha">
              <div className="avatar-art-container">
                <svg viewBox="0 0 140 140" className="avatar-silhouette-svg">
                  <circle cx="70" cy="70" r="65" fill="#3B101C" stroke="#D4AF65" strokeWidth="2" />
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(212, 175, 101, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Head Face */}
                  <path d="M70 38 C60 38 52 46 52 56 C52 66 60 72 70 72 C80 72 88 66 88 56 C88 46 80 38 70 38 Z" fill="#E8D5A3" />
                  {/* Royal Safa / Pagri */}
                  <path d="M46 44 C46 30 60 22 70 22 C80 22 94 30 94 44 C92 48 85 52 70 52 C55 52 48 48 46 44 Z" fill="#D4AF65" stroke="#8C6A28" strokeWidth="1" />
                  {/* Kalgi */}
                  <path d="M70 12 Q75 18 70 24 Q65 18 70 12 Z" fill="#FFF9ED" stroke="#D4AF65" strokeWidth="1" />
                  <circle cx="70" cy="24" r="3" fill="#8C1D40" />
                  {/* Royal Sherwani Body */}
                  <path d="M42 80 L70 90 L98 80 L102 118 L38 118 Z" fill="#641B2E" stroke="#D4AF65" strokeWidth="1.2" />
                  <line x1="70" y1="90" x2="70" y2="118" stroke="#D4AF65" strokeWidth="1.5" />
                  <circle cx="70" cy="95" r="1.5" fill="#FFF9ED" />
                  <circle cx="70" cy="103" r="1.5" fill="#FFF9ED" />
                  <circle cx="70" cy="111" r="1.5" fill="#FFF9ED" />
                </svg>
              </div>

              <div className="profile-role-badge">
                <span className="role-tag">THE GROOM</span>
              </div>
            </div>

            <div className="profile-details-content">
              <h3 className="profile-name">KULDEEP</h3>

              <div className="relationship-heading">SON OF</div>

              <div className="profile-lineage-block">
                <p className="parent-name">Mrs. Chanda Devi</p>
                <span className="parent-connector">and</span>
                <p className="parent-name prominent-father">Mr. Jasraj Ji Upadhyay</p>
                
                <div className="grandparents-sublineage">
                  <span className="grandparent-label">GRANDSON OF</span>
                  <p className="grandparent-names">Late Mrs. Pepi Devi &amp; Late Mr. Champalal Ji Upadhyay</p>
                </div>
              </div>

              <div className="profile-location-tag">
                <span className="loc-icon">📍</span>
                <span>Pali, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
