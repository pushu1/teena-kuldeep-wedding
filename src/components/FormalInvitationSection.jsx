import React from 'react';

export default function FormalInvitationSection() {
  return (
    <section className="wedding-section formal-invitation-section" id="invitation-section">
      <div className="section-royal-card">
        {/* Ornate Gold Border & Corners */}
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Top Header Flourish */}
        <div className="section-header-flourish">
          <div className="flourish-icon">
            <img src="assets/champagne_ganesha_bright.png" alt="Ganesha" className="shloka-ganesha-mini" />
          </div>
          <span className="shloka-text">|| मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः ||</span>
          <h2 className="section-title-gold">WEDDING INVITATION</h2>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Warm Family Invitation Body */}
        <div className="formal-letter-body">
          <p className="invitation-salutation">
            Dear Respected Family Members, Friends, and Well-Wishers,
          </p>

          <p className="invitation-primary-text">
            “With the blessings of the Almighty and our beloved elders, we cordially invite you and your family to grace the auspicious occasion of the wedding celebration of <strong>Teena &amp; Kuldeep</strong>.
          </p>

          <p className="invitation-primary-text">
            Your gracious presence and blessings will make this special occasion even more memorable. We look forward to celebrating this beautiful union with you.”
          </p>

          <div className="family-hosts-signature">
            <div className="signature-ornament">❧</div>
            <div className="signature-host-names">
              VAJPAYEE &amp; UPADHYAY FAMILIES
            </div>
            <div className="signature-dates">
              Jaipur &amp; Pali, Rajasthan • December 2026
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="invitation-highlights-strip">
          <div className="highlight-item">
            <span className="hl-icon">🗓️</span>
            <span className="hl-label">Wedding Date</span>
            <span className="hl-val">11 December 2026</span>
          </div>
          <div className="highlight-item">
            <span className="hl-icon">📍</span>
            <span className="hl-label">City</span>
            <span className="hl-val">Jaipur, Rajasthan</span>
          </div>
          <div className="highlight-item">
            <span className="hl-icon">✨</span>
            <span className="hl-label">Ceremonies</span>
            <span className="hl-val">07 &amp; 11 December</span>
          </div>
        </div>
      </div>
    </section>
  );
}
