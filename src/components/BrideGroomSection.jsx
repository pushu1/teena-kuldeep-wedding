import React from 'react';

export default function BrideGroomSection() {
  return (
    <section className="wedding-section bride-groom-section" id="couple-section">
      <div className="section-royal-card">
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Section Header */}
        <div className="section-header-flourish">
          <span className="shloka-text">|| शुभ विवाह ||</span>
          <h2 className="section-title-gold">THE BRIDE &amp; THE GROOM</h2>
          <p className="section-subtitle-script">
            United by love, blessed by elders, bound by sacred Vedic vows
          </p>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Two Royal Cards Grid */}
        <div className="couple-cards-grid">
          
          {/* BRIDE CARD (Left) */}
          <div className="couple-profile-card bride-card">
            <div className="profile-frame-jharokha">
              {/* Royal Bride Silhouette Illustration */}
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
                  {/* Traditional Nath (Nose Ring) */}
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
              <h3 className="profile-name">
                TEENA
              </h3>

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
            </div>
          </div>

          {/* Center Sacred Knot / Gathbandhan Flourish */}
          <div className="couple-center-divider" aria-hidden="true">
            <div className="divider-knot-icon">
              <svg viewBox="0 0 50 50" className="mandala-center-svg">
                <circle cx="25" cy="25" r="22" fill="none" stroke="#D4AF65" strokeWidth="1.5" />
                <circle cx="25" cy="25" r="16" fill="rgba(212, 175, 101, 0.15)" stroke="#D4AF65" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M15 25 Q25 15 35 25 Q25 35 15 25 Z" fill="#D4AF65" />
                <circle cx="25" cy="25" r="3" fill="#FFF9ED" />
              </svg>
            </div>
            <span className="knot-label">|| शुभ बंधन ||</span>
          </div>

          {/* GROOM CARD (Right) */}
          <div className="couple-profile-card groom-card">
            <div className="profile-frame-jharokha">
              {/* Royal Groom Silhouette Illustration */}
              <div className="avatar-art-container">
                <svg viewBox="0 0 140 140" className="avatar-silhouette-svg">
                  <circle cx="70" cy="70" r="65" fill="#3B101C" stroke="#D4AF65" strokeWidth="2" />
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(212, 175, 101, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Traditional Royal Groom Sherwani & Safa/Turban */}
                  {/* Head Face */}
                  <path d="M70 38 C60 38 52 46 52 56 C52 66 60 72 70 72 C80 72 88 66 88 56 C88 46 80 38 70 38 Z" fill="#E8D5A3" />
                  {/* Royal Safa / Pagri (Turban) */}
                  <path d="M46 44 C46 30 60 22 70 22 C80 22 94 30 94 44 C92 48 85 52 70 52 C55 52 48 48 46 44 Z" fill="#D4AF65" stroke="#8C6A28" strokeWidth="1" />
                  {/* Royal Kalgi (Turban Brooch Feather) */}
                  <path d="M70 12 Q75 18 70 24 Q65 18 70 12 Z" fill="#FFF9ED" stroke="#D4AF65" strokeWidth="1" />
                  <circle cx="70" cy="24" r="3" fill="#8C1D40" />
                  {/* Royal Sherwani Body */}
                  <path d="M42 80 L70 90 L98 80 L102 118 L38 118 Z" fill="#641B2E" stroke="#D4AF65" strokeWidth="1.2" />
                  {/* Gold Buttons & Necklace */}
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
                <p className="parent-name">Late Mrs. Pepi Devi</p>
                <span className="parent-connector">and</span>
                <p className="parent-name prominent-father">Late Mr. Champalal Ji Upadhyay</p>
                
                <div className="grandparents-sublineage">
                  <span className="grandparent-label">Grandson of</span>
                  <p className="grandparent-names">Mrs. Chanda Devi &amp; Mr. Jasraj Ji Upadhyay</p>
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
