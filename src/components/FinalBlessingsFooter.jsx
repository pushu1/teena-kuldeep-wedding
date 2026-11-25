import React from 'react';

export default function FinalBlessingsFooter({ onOpenCardViewer, onDownloadPDF }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="wedding-final-blessings-footer" id="footer-section">
      {/* Animated Golden Flowers Floating Band */}
      <div className="footer-golden-flowers-band" aria-hidden="true">
        <span className="floating-flower fl-1">🌸</span>
        <span className="floating-flower fl-2">✨</span>
        <span className="floating-flower fl-3">🌺</span>
        <span className="floating-flower fl-4">✨</span>
        <span className="floating-flower fl-5">🌸</span>
      </div>

      <div className="footer-content-container">
        
        {/* Lord Ganesha Small Emblem */}
        <div className="footer-ganesha-wrapper">
          <img
            src="assets/champagne_ganesha_bright.png"
            alt="Lord Ganesha"
            className="footer-ganesha-img"
          />
        </div>

        {/* Sacred Shloka */}
        <div className="footer-sacred-blessing">
          || ॐ श्री गणेशाय नमः • शुभं भवतु ||
        </div>

        {/* Golden Quote */}
        <blockquote className="footer-treasured-quote">
          “Your Presence Is Our Greatest Gift.<br />
          Your Blessings Are Our Greatest Treasure.”
        </blockquote>

        {/* Couple Signoff */}
        <div className="footer-couple-signature">
          <h2 className="footer-couple-names">TEENA &amp; KULDEEP</h2>
          <p className="footer-regards-line">With Love and Warm Regards</p>
          <p className="footer-family-signoff">
            Vajpayee &amp; Upadhyay Families • Pali &amp; Jaipur, Rajasthan
          </p>
        </div>

        <div className="footer-bottom-divider"></div>

        {/* Bottom Year & Traditional Copyright */}
        <div className="footer-sub-bar">
          <p className="sub-bar-text">
            The Royal Wedding Celebration 2026 • Teena &amp; Kuldeep • Jaipur, Rajasthan
          </p>
        </div>

      </div>
    </footer>
  );
}
