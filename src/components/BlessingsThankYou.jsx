import React, { useState } from 'react';

export default function BlessingsThankYou() {
  const [copied, setCopied] = useState(false);

  const whatsappWishUrl = `https://wa.me/919461061236?text=${encodeURIComponent(
    'Heartiest congratulations and warmest blessings to Kuldeep & Teena on their royal wedding! May God bless the couple with lifelong happiness, prosperity, and togetherness. 💐✨'
  )}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kuldeep weds Teena — Upadhyay Family Wedding Invitation',
          text: 'Upadhyay Family cordially invites you to the royal wedding celebrations of Kuldeep & Teena. 11 December 2026 • Pali, Rajasthan.',
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  return (
    <footer className="parchment-section blessings-footer-section" id="blessings-thankyou">
      <div className="blessings-card-inner">
        <div className="sacred-ganesha-badge">
          <span className="ganesha-symbol">ॐ</span>
        </div>

        <span className="small-section-tag">WITH LOVE &amp; GRATITUDE</span>
        <h2 className="main-section-heading">Warm Wishes &amp; Blessings</h2>

        <p className="blessings-lead-quote">
          "Your love, presence, and heartfelt prayers are the greatest gifts we cherish on this sacred day."
        </p>

        {/* Compliments & Family Lineage */}
        <div className="hosts-acknowledgement-box">
          <p className="hosts-label">उत्तराकांक्षी (With Warm Compliments):</p>
          <h4 className="hosts-main-name">जसराज मांगीलाल उपाध्याय</h4>
          <p className="hosts-lineage-sub">
            (सुपुत्र स्व. श्री चम्पालालजी उपाध्याय)
          </p>
          <p className="hosts-address-line">
            255, 256, राम नगर, तीसरी गली, पाली (राज.)
          </p>
          <div className="hosts-contact-line">
            <span>📞 संपर्क: जसराजजी उपाध्याय — </span>
            <a href="tel:9461061236" className="tel-link">9461061236</a>
            <span>, </span>
            <a href="tel:9887997822" className="tel-link">9887997822</a>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="footer-action-buttons-grid">
          <a
            href={whatsappWishUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn-pill btn-whatsapp"
            title="Send your blessings directly on WhatsApp"
          >
            <span className="btn-icon">💬</span>
            <span>Send Wishes on WhatsApp</span>
          </a>

          <button
            onClick={handleShare}
            className="action-btn-pill btn-share"
            title="Share this invitation with family & friends"
          >
            <span className="btn-icon">📤</span>
            <span>{copied ? 'Link Copied to Clipboard! ✓' : 'Share Invitation'}</span>
          </button>

          <a
            href="public/downloads/kuldeep-teena-wedding-invitation.pdf"
            download="Kuldeep-Teena-Wedding-Invitation.pdf"
            className="action-btn-pill btn-download-pdf"
            title="Download Wedding Invitation PDF"
          >
            <span className="btn-icon">📜</span>
            <span>Download Wedding Invitation PDF</span>
          </a>
        </div>

        <div className="footer-copyright-note">
          <p>KULDEEP WEDS TEENA • UPADHYAY FAMILY INVITATION</p>
          <p className="footer-mini-sub">11 December 2026 • Pali, Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}
