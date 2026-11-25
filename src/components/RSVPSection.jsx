import React, { useState } from 'react';

export default function RSVPSection() {
  const [guestName, setGuestName] = useState('');
  const [wishes, setWishes] = useState('');

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const phone = '919829312488'; // Upadhyay Family contact
    const text = `Namaste! Heartfelt wedding congratulations and blessings for Kuldeep & Teena!\n\nFrom: ${guestName || 'Well-wisher'}\nBlessings & Wishes: ${wishes || 'May God bless the couple with lifelong happiness, joy, and prosperity!'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <section className="rsvp-wishes-section" id="rsvp-section">
      <div className="rsvp-card-surface">
        {/* Header */}
        <div className="section-title-wrap">
          <h2 className="rsvp-main-heading">RSVP</h2>

          {/* Golden Flourish Divider */}
          <div className="golden-flourish-divider compact" aria-hidden="true">
            <span className="flourish-line"></span>
            <svg className="flourish-icon" viewBox="0 0 40 16" fill="none">
              <path d="M0 8 C10 8 13 2 20 2 C27 2 30 8 40 8 C30 8 27 14 20 14 C13 14 10 8 0 8 Z" fill="#C8A86B" />
              <polygon points="20,5 23,8 20,11 17,8" fill="#B5904D" />
            </svg>
            <span className="flourish-line"></span>
          </div>
        </div>

        <form onSubmit={handleSendWhatsApp} className="rsvp-form-container">
          {/* Guest Name Input */}
          <div className="rsvp-input-group">
            <label htmlFor="rsvp-guest-name" className="rsvp-field-label">
              YOUR NAME
            </label>
            <input
              type="text"
              id="rsvp-guest-name"
              className="rsvp-text-input"
              placeholder="Full name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>

          {/* Blessings & Wishes Textarea */}
          <div className="rsvp-input-group">
            <label htmlFor="rsvp-wishes-text" className="rsvp-field-label sr-only">
              Your blessings &amp; wishes...
            </label>
            <textarea
              id="rsvp-wishes-text"
              rows="3"
              className="rsvp-textarea-input"
              placeholder="Your blessings &amp; wishes..."
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
            />
          </div>

          {/* Send Reply on WhatsApp Dark Navy Pill Button */}
          <div className="rsvp-submit-wrap">
            <button
              type="submit"
              className="btn-pill-navy full-width"
              id="btn-whatsapp-rsvp"
            >
              SEND REPLY ON WHATSAPP
            </button>
          </div>

          <p className="rsvp-deadline-text">Kindly reply by 5 Dec 2026</p>
        </form>
      </div>
    </section>
  );
}
