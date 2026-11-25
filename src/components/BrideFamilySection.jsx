import React from 'react';

export default function BrideFamilySection() {
  return (
    <section className="wedding-section bride-family-section" id="bride-section">
      <div className="section-royal-card">
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Section Header */}
        <div className="section-header-flourish">
          <span className="shloka-text">|| वधु पक्ष • जयपुर ||</span>
          <div className="family-origin-pill">THE RESPECTED VAJPAYEE FAMILY OF JAIPUR</div>
          <h2 className="section-title-gold">THE BRIDE'S FAMILY</h2>
          <p className="section-subtitle-script">
            Welcoming you with heartfelt warmth &amp; traditional Rajasthani hospitality
          </p>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Main Bride Profile Showcase Card */}
        <div className="family-showcase-container">
          <div className="couple-profile-card bride-card prominent-family-card">
            <div className="profile-frame-jharokha">
              <div className="avatar-art-container">
                <svg viewBox="0 0 140 140" className="avatar-silhouette-svg">
                  <circle cx="70" cy="70" r="65" fill="#641B2E" stroke="#D4AF65" strokeWidth="2" />
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(212, 175, 101, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Traditional Royal Bride Icon Silhouette */}
                  <path d="M70 30 C58 30 50 38 50 50 C50 62 58 68 70 68 C82 68 90 62 90 50 C90 38 82 30 70 30 Z" fill="#E8D5A3" />
                  {/* Maang Tikka */}
                  <circle cx="70" cy="38" r="3" fill="#D4AF65" />
                  <path d="M70 30 L70 38" stroke="#D4AF65" strokeWidth="1.5" />
                  {/* Ornate Dupatta Veil */}
                  <path d="M44 48 C40 65 32 90 28 115 C52 118 88 118 112 115 C108 90 100 65 96 48 C92 42 85 36 70 36 C55 36 48 42 44 48 Z" fill="#3B101C" stroke="#D4AF65" strokeWidth="1.2" opacity="0.9" />
                  {/* Traditional Nath */}
                  <circle cx="63" cy="54" r="3" fill="none" stroke="#D4AF65" strokeWidth="1" />
                  <path d="M63 54 Q56 50 52 46" fill="none" stroke="#D4AF65" strokeWidth="0.8" />
                  {/* Royal Bridal Attire Silhouette */}
                  <path d="M48 85 L70 95 L92 85 L96 115 L44 115 Z" fill="#8C1D40" />
                </svg>
              </div>

              <div className="profile-role-badge">
                <span className="role-tag">THE BRIDE</span>
              </div>
            </div>

            <div className="profile-details-content">
              <h3 className="profile-name">TEENA</h3>

              <div className="relationship-heading">DAUGHTER OF</div>

              <div className="profile-lineage-block">
                <p className="parent-name">Mrs. Manju Devi</p>
                <span className="parent-connector">and</span>
                <p className="parent-name prominent-father">Mr. Ramgopal Vajpayee</p>
              </div>

              <div className="profile-location-tag">
                <span className="loc-icon">📍</span>
                <span>Jaipur, Rajasthan, India</span>
              </div>

              <div className="family-welcome-note">
                <p className="note-text">
                  “The Vajpayee family of Jaipur cordially invites you to grace the auspicious wedding celebration of our beloved daughter Teena with Kuldeep.”
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
