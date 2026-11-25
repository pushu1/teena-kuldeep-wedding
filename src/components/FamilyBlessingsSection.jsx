import React, { useState } from 'react';

export default function FamilyBlessingsSection() {
  const [guestName, setGuestName] = useState('');
  const [guestCity, setGuestCity] = useState('');
  const [blessingMsg, setBlessingMsg] = useState('Heartiest congratulations to Teena & Kuldeep on your royal wedding! May God bless you both with lifelong love, happiness, and prosperity.');
  const [sentSuccess, setSentSuccess] = useState(false);

  const phone1 = '+919782715591';
  const phone2 = '+919024538960';

  const handleSendWhatsApp = (phoneTarget) => {
    const formattedText = `Namaste! 🙏\n\n*Wedding Blessings for Teena & Kuldeep*\nFrom: ${guestName || 'Well-Wisher'}${guestCity ? ` (${guestCity})` : ''}\n\n"${blessingMsg}"\n\nLooking forward to celebrating this royal wedding on 11 Dec 2026!`;
    const cleanPhone = phoneTarget.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section className="wedding-section family-compliments-section" id="family-section">
      <div className="section-royal-card">
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Section Header */}
        <div className="section-header-flourish">
          <span className="shloka-text">|| सस्नेह निमंत्रण ||</span>
          <h2 className="section-title-gold">WITH BEST COMPLIMENTS FROM</h2>
          <p className="section-subtitle-script">
            Warmest hospitality from the family elders and hosts
          </p>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Warm Message Quote */}
        <div className="family-invitation-quote-box">
          <p className="quote-text">
            “With the blessings of the Almighty and our beloved elders, we cordially invite you and your family to grace the auspicious occasion of the wedding celebration of <strong>Teena &amp; Kuldeep</strong>.
          </p>
          <p className="quote-text">
            Your gracious presence and blessings will make this special occasion even more memorable. We look forward to celebrating this beautiful union with you.”
          </p>
        </div>

        {/* Host Contacts Cards */}
        <div className="compliments-hosts-grid">
          
          {/* Host 1: Pandit Ramgopal Vajpayee */}
          <div className="host-contact-card">
            <div className="host-ornament-header">
              <span className="host-namaste-icon">🙏</span>
              <span className="host-honorific">FAMILY ELDER &amp; HOST</span>
            </div>

            <h3 className="host-name">Pandit Ramgopal Vajpayee</h3>
            <p className="host-relation">Father of the Bride</p>

            <div className="host-contact-action-row">
              <a href={`tel:${phone1}`} className="contact-action-btn btn-call" title="Call Pandit Ramgopal Vajpayee">
                <span className="action-icon">📞</span>
                <span className="action-text">+91 9782715591</span>
              </a>

              <a
                href={`https://wa.me/919782715591`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-btn btn-whatsapp"
                title="Message on WhatsApp"
              >
                <span className="action-icon">💬</span>
                <span className="action-text">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Host 2: Pandit Lokesh Vajpayee */}
          <div className="host-contact-card">
            <div className="host-ornament-header">
              <span className="host-namaste-icon">🙏</span>
              <span className="host-honorific">FAMILY HOST &amp; BROTHER</span>
            </div>

            <h3 className="host-name">Pandit Lokesh Vajpayee</h3>
            <p className="host-relation">Bride’s Family Host</p>

            <div className="host-contact-action-row">
              <a href={`tel:${phone2}`} className="contact-action-btn btn-call" title="Call Pandit Lokesh Vajpayee">
                <span className="action-icon">📞</span>
                <span className="action-text">+91 9024538960</span>
              </a>

              <a
                href={`https://wa.me/919024538960`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-btn btn-whatsapp"
                title="Message on WhatsApp"
              >
                <span className="action-icon">💬</span>
                <span className="action-text">WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Interactive RSVP & Blessing Sender */}
        <div className="direct-blessings-card">
          <div className="blessings-card-header">
            <h4 className="blessings-title">💌 Send Your RSVP &amp; Blessings to the Family</h4>
            <p className="blessings-subtitle">
              Send your personal congratulations and arrival confirmation directly to the hosts on WhatsApp.
            </p>
          </div>

          <div className="blessings-inputs-form">
            <div className="form-row-dual">
              <div className="form-input-group">
                <label className="input-label">Your Name / Family Name</label>
                <input
                  type="text"
                  className="royal-text-input"
                  placeholder="e.g. Sharma Family / Rajesh Sharma"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>

              <div className="form-input-group">
                <label className="input-label">Your City</label>
                <input
                  type="text"
                  className="royal-text-input"
                  placeholder="e.g. Jaipur, Delhi, Mumbai"
                  value={guestCity}
                  onChange={(e) => setGuestCity(e.target.value)}
                />
              </div>
            </div>

            <div className="form-input-group">
              <label className="input-label">Your Heartfelt Blessings</label>
              <textarea
                className="royal-text-area"
                rows="2"
                value={blessingMsg}
                onChange={(e) => setBlessingMsg(e.target.value)}
              />
            </div>

            <div className="form-submit-row">
              <button
                className="btn-send-blessing btn-to-ramgopal"
                onClick={() => handleSendWhatsApp(phone1)}
              >
                <span>💬 Send to Pt. Ramgopal (+91 9782715591)</span>
              </button>

              <button
                className="btn-send-blessing btn-to-lokesh"
                onClick={() => handleSendWhatsApp(phone2)}
              >
                <span>💬 Send to Pt. Lokesh (+91 9024538960)</span>
              </button>
            </div>

            {sentSuccess && (
              <div className="blessing-sent-notification">
                ✓ Opening WhatsApp to deliver your royal blessings!
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
