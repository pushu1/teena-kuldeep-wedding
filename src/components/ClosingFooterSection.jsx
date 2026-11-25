import React from 'react';

export default function ClosingFooterSection() {
  const pdfUrl = 'assets/Kuldeep_Teena_Royal_Wedding_Invitation.pdf';

  const handleOpenPdf = () => {
    window.location.href = pdfUrl;
  };

  return (
    <footer className="closing-footer-section" id="closing-footer">
      {/* Monogram Crest */}
      <div className="footer-monogram-crest-wrap">
        <div className="footer-crest-circle">
          <span className="crest-monogram-text">K &amp; T</span>
        </div>
      </div>

      {/* Joyous Closing Text */}
      <div className="footer-text-block">
        <p className="footer-lead-caps">WITH HEARTS FULL OF JOY</p>
        <h2 className="footer-couple-script">Kuldeep &amp; Teena</h2>
        <p className="footer-date-stamp">11 &middot; DEC &middot; 2026</p>

        {/* Golden Flourish Divider */}
        <div className="golden-flourish-divider compact" aria-hidden="true">
          <span className="flourish-line"></span>
          <svg className="flourish-icon" viewBox="0 0 40 16" fill="none">
            <path d="M0 8 C10 8 13 2 20 2 C27 2 30 8 40 8 C30 8 27 14 20 14 C13 14 10 8 0 8 Z" fill="#C8A86B" />
            <polygon points="20,5 23,8 20,11 17,8" fill="#B5904D" />
          </svg>
          <span className="flourish-line"></span>
        </div>

        <p className="footer-message-italic">
          We look forward to celebrating this beautiful beginning with you.
        </p>

        <p className="footer-families-names">
          WITH LOVE &amp; WARMEST WISHES &mdash; THE UPADHYAY &amp; VAJPAYEE FAMILIES
        </p>

        <p className="footer-wedding-hashtag">#KuldeepWedsTeena</p>
      </div>

      {/* Scenic Lake Palace Reflection View */}
      <div className="footer-scenic-reflection-wrap">
        <img
          src="assets/ref_palace_lake_clean.jpg"
          alt="Palace by the Lake"
          className="footer-palace-reflection-img"
        />
      </div>

      {/* Preserved PDF Actions */}
      <div className="footer-pdf-actions-bar">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill-dark"
          id="btn-footer-open-pdf"
          aria-label="Open wedding invitation PDF in a new tab"
        >
          <span className="btn-icon">📜</span>
          <span>OPEN INVITATION (PDF)</span>
        </a>
        <a
          href={pdfUrl}
          download="Kuldeep_Teena_Royal_Wedding_Invitation.pdf"
          className="btn-pill-outline"
          id="btn-footer-download-pdf"
          title="Download wedding invitation PDF"
        >
          <span className="btn-icon">⬇</span>
          <span>DOWNLOAD PDF</span>
        </a>
      </div>

      <div className="footer-credit-note">
        <p>DIGITAL ROYAL WEDDING INVITATION &middot; KULDEEP &amp; TEENA</p>
      </div>
    </footer>
  );
}
