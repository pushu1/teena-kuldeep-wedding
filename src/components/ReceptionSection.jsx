import React from 'react';

export default function ReceptionSection() {
  return (
    <section className="parchment-section reception-invitation-section" id="reception-invitation">
      <div className="reception-card-inner">
        <span className="small-section-tag">CELEBRATORY BANQUET</span>
        <h2 className="main-section-heading">Grand Reception &amp; Blessings</h2>
        
        <div className="gold-ornamental-divider compact">
          <span className="divider-flourish">❦</span>
        </div>

        <p className="reception-ceremony-hindi">
          ॥ आशीर्वाद समारोह एवं प्रीतिभोज ॥
        </p>

        <p className="reception-lead-text">
          Following the sacred wedding ceremony, the Upadhyay Family cordially invites you to join us for an evening of joy, celebration, felicitations, and royal dining in honour of the newly married couple.
        </p>

        <div className="reception-details-box">
          <div className="reception-detail-item">
            <span className="detail-icon">🗓️</span>
            <div>
              <p className="detail-label">DATE &amp; DAY</p>
              <p className="detail-value">Sunday, 13 December 2026</p>
            </div>
          </div>

          <div className="reception-detail-item">
            <span className="detail-icon">⏰</span>
            <div>
              <p className="detail-label">TIME</p>
              <p className="detail-value">06:00 PM Onwards</p>
            </div>
          </div>

          <div className="reception-detail-item">
            <span className="detail-icon">🏛️</span>
            <div>
              <p className="detail-label">VENUE</p>
              <p className="detail-value">
                जैन बागबेरा दादावाडी (Jain Bagbera Dadawadi)<br />
                वेंकटेश मार्ग, पाली, राजस्थान (Venkatesh Marg, Pali)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
