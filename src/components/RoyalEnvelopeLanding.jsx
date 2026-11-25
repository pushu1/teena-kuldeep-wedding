import React, { useState } from 'react';

export default function RoyalEnvelopeLanding({ onOpenComplete, onBackToCover, onOpenVenue }) {
  const [stage, setStage] = useState('closed'); // 'closed' | 'opening' | 'opened'

  const handleOpenEnvelope = () => {
    if (stage !== 'closed') return;
    setStage('opening');

    // Trigger audio if available
    try {
      const audio = document.getElementById('bgm-player');
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    } catch (e) {}

    // Timeline: 
    // 0s: seal glow burst
    // 400ms: flap flips up
    // 800ms: card slides up
    // 1600ms: transition to full interactive invitation
    setTimeout(() => {
      setStage('opened');
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 1600);
  };

  return (
    <section className={`royal-envelope-landing-stage stage-${stage}`} id="royal-envelope-stage">
      {/* 1. Ambient Background Layer: Deep Wine/Burgundy with Floating Stardust */}
      <div className="envelope-ambient-backdrop" aria-hidden="true">
        <div className="radial-burgundy-glow"></div>
        <div className="golden-mesh-pattern"></div>
        {/* Floating Golden Sparks */}
        <div className="floating-sparkle sp-1">✦</div>
        <div className="floating-sparkle sp-2">✦</div>
        <div className="floating-sparkle sp-3">✦</div>
        <div className="floating-sparkle sp-4">✦</div>
        <div className="floating-sparkle sp-5">✦</div>
      </div>

      {/* Top Floating Navigation Header */}
      <header className="envelope-top-nav-bar">
        <button
          className="env-nav-btn btn-back"
          onClick={onBackToCover}
          title="Return to Main Wedding Card"
        >
          <span className="btn-icon">←</span>
          <span className="btn-text">Back to Card</span>
        </button>

        <span className="env-nav-title">✦ Royal Wedding Invitation ✦</span>

        {onOpenVenue && (
          <button
            className="env-nav-btn btn-venue"
            onClick={onOpenVenue}
            title="View Reception Venue & QR Code"
          >
            <span className="btn-icon">📍</span>
            <span className="btn-text">Venue</span>
          </button>
        )}
      </header>

      {/* Main Royal Showcase Container */}
      <div className="envelope-showcase-container">
        
        {/* 2. Top Invocations & Palace Arch Art */}
        <div className="royal-palace-arch-header">
          {/* Hanging Golden Temple Lanterns (Left & Right) */}
          <div className="hanging-lantern lantern-left" aria-hidden="true">
            <svg viewBox="0 0 60 140" className="lantern-svg">
              <line x1="30" y1="0" x2="30" y2="45" stroke="#DFBF77" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M20 45 L40 45 L46 65 L14 65 Z" fill="#C49A45" stroke="#F8E4BA" strokeWidth="1" />
              <rect x="18" y="65" width="24" height="40" rx="3" fill="rgba(248, 228, 186, 0.25)" stroke="#DFBF77" strokeWidth="1.5" />
              <circle cx="30" cy="85" r="7" fill="#FFF5DE" filter="drop-shadow(0 0 8px #FFD700)" />
              <path d="M16 105 L44 105 L30 128 Z" fill="#C49A45" stroke="#F8E4BA" strokeWidth="1" />
              <circle cx="30" cy="135" r="3.5" fill="#DFBF77" />
            </svg>
          </div>

          <div className="hanging-lantern lantern-right" aria-hidden="true">
            <svg viewBox="0 0 60 140" className="lantern-svg">
              <line x1="30" y1="0" x2="30" y2="45" stroke="#DFBF77" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M20 45 L40 45 L46 65 L14 65 Z" fill="#C49A45" stroke="#F8E4BA" strokeWidth="1" />
              <rect x="18" y="65" width="24" height="40" rx="3" fill="rgba(248, 228, 186, 0.25)" stroke="#DFBF77" strokeWidth="1.5" />
              <circle cx="30" cy="85" r="7" fill="#FFF5DE" filter="drop-shadow(0 0 8px #FFD700)" />
              <path d="M16 105 L44 105 L30 128 Z" fill="#C49A45" stroke="#F8E4BA" strokeWidth="1" />
              <circle cx="30" cy="135" r="3.5" fill="#DFBF77" />
            </svg>
          </div>

          {/* Ganesha & Sacred Blessings */}
          <div className="sacred-invocation-block">
            <span className="shloka-flourish">❖</span>
            <span className="sacred-ganesha-text">॥ श्री गणेशाय नमः ॥</span>
            <span className="shloka-flourish">❖</span>
          </div>
          <p className="divine-elders-blessing">WITH THE DIVINE BLESSINGS OF BELOVED ELDERS</p>
          <h1 className="upadhyay-family-title">UPADHYAY FAMILY INVITATION</h1>
        </div>

        {/* 3. GROOM & BRIDE ROYAL ARCH-SHAPED PORTRAITS */}
        <div className="couple-royal-portraits-row">
          {/* Groom Arch Card */}
          <div className="royal-portrait-card groom-card">
            <div className="portrait-arch-frame">
              <div className="portrait-inner-halo"></div>
              <img
                src="assets/groom_photo.jpg"
                alt="Groom - Kuldeep Upadhyay"
                className="portrait-img"
              />
              <div className="arch-ornamental-rim" aria-hidden="true">
                <span className="arch-top-floret">⚜</span>
              </div>
            </div>
            <div className="portrait-name-badge">
              <h3 className="portrait-name">KULDEEP</h3>
              <p className="portrait-parentage">S/o Smt. &amp; Shri Upadhyay</p>
            </div>
          </div>

          {/* Center Union Monogram */}
          <div className="couple-union-divider">
            <div className="mandala-orbit" aria-hidden="true">
              <svg viewBox="0 0 80 80" className="mandala-orbit-svg">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#DFBF77" strokeWidth="1" strokeDasharray="3 4" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#F8E4BA" strokeWidth="0.8" opacity="0.6" />
              </svg>
            </div>
            <span className="union-weds">WEDS</span>
            <span className="union-gem">✦</span>
          </div>

          {/* Bride Arch Card */}
          <div className="royal-portrait-card bride-card">
            <div className="portrait-arch-frame">
              <div className="portrait-inner-halo"></div>
              <img
                src="assets/bride_photo.jpg"
                alt="Bride - Teena Upadhyay"
                className="portrait-img"
              />
              <div className="arch-ornamental-rim" aria-hidden="true">
                <span className="arch-top-floret">⚜</span>
              </div>
            </div>
            <div className="portrait-name-badge">
              <h3 className="portrait-name">TEENA</h3>
              <p className="portrait-parentage">D/o Smt. &amp; Shri Sharma</p>
            </div>
          </div>
        </div>

        {/* Auspicious Wedding Dates Banner */}
        <div className="envelope-date-announcement">
          <span className="date-icon">📅</span>
          <span className="date-main">11 DECEMBER 2026</span>
          <span className="date-sep">•</span>
          <span className="date-reception">RECEPTION — 13 DECEMBER 2026</span>
        </div>

        {/* 4. THE CUSTOM ILLUSTRATED ROYAL WEDDING ENVELOPE (SVG/VECTOR) */}
        <div className="royal-envelope-scene-wrapper">
          <div
            className={`custom-royal-envelope ${stage === 'opening' ? 'is-opening' : ''} ${stage === 'opened' ? 'is-opened' : ''}`}
            onClick={handleOpenEnvelope}
            role="button"
            tabIndex={0}
            aria-label="Royal wedding invitation envelope. Tap wax seal to open."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
            }}
          >
            {/* Ambient Envelope Golden Aura */}
            <div className="envelope-golden-aura-glow"></div>

            {/* A. Envelope Pocket Back & Interior Velvet Lining */}
            <div className="envelope-back-pocket">
              <div className="pocket-interior-damask"></div>
            </div>

            {/* B. The Golden Sliding Invitation Card (Slides Up on Click) */}
            <div className="envelope-sliding-invitation-card">
              <div className="card-ornamental-gold-border">
                <div className="card-top-ganesha">॥ श्री गणेशाय नमः ॥</div>
                <h4 className="card-couple-calligraphy">Kuldeep &amp; Teena</h4>
                <div className="card-divider-flourish">❧ ✦ ❧</div>
                <p className="card-wedding-date-tag">Shubh Vivah • 11 December 2026</p>
                <p className="card-venue-tag">Pali, Rajasthan</p>
              </div>
            </div>

            {/* C. Envelope Front Pocket (Left, Right & Bottom Folds) */}
            <div className="envelope-front-pocket">
              {/* Subtle Damask Watermark on Warm Silk Ivory */}
              <div className="envelope-ivory-texture"></div>

              {/* Embossed Golden Seam Lines and Pocket Folds */}
              <svg viewBox="0 0 440 280" className="envelope-front-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="ivoryBottomGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#F8F0E3" />
                    <stop offset="100%" stopColor="#ECE0CD" />
                  </linearGradient>
                  <linearGradient id="ivorySideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF5EC" />
                    <stop offset="100%" stopColor="#EFE3D0" />
                  </linearGradient>
                </defs>

                {/* Left Side Pocket Flap */}
                <polygon points="0,0 0,280 220,140" fill="url(#ivorySideGrad)" stroke="#DFBF77" strokeWidth="1" />
                
                {/* Right Side Pocket Flap */}
                <polygon points="440,0 440,280 220,140" fill="url(#ivorySideGrad)" stroke="#DFBF77" strokeWidth="1" />

                {/* Bottom Pocket Flap */}
                <polygon points="0,280 440,280 220,140" fill="url(#ivoryBottomGrad)" stroke="#DFBF77" strokeWidth="1.5" />

                {/* Outer Delicate Gold Border */}
                <rect x="2" y="2" width="436" height="276" rx="8" fill="none" stroke="#DFBF77" strokeWidth="1.5" />
                <rect x="7" y="7" width="426" height="266" rx="6" fill="none" stroke="#A8843B" strokeWidth="0.8" strokeDasharray="4 3" />

                {/* Inner Decorative Seam Line */}
                <polygon points="20,270 420,270 220,152" fill="none" stroke="#C49A45" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.6" />

                {/* 4 Corner Ornamental Filigrees */}
                <path d="M12 12 L36 12 Q20 20 12 36 Z" fill="#DFBF77" opacity="0.85" />
                <path d="M428 12 L404 12 Q420 20 428 36 Z" fill="#DFBF77" opacity="0.85" />
                <path d="M12 268 L36 268 Q20 260 12 244 Z" fill="#DFBF77" opacity="0.85" />
                <path d="M428 268 L404 268 Q420 260 428 244 Z" fill="#DFBF77" opacity="0.85" />

                {/* Center Pocket Medallion Accent */}
                <circle cx="220" cy="140" r="5" fill="#DFBF77" />
              </svg>

              {/* Delicate Gold Floral Vine Accents around the Pocket */}
              <div className="envelope-corner-accent tl" aria-hidden="true">❦</div>
              <div className="envelope-corner-accent tr" aria-hidden="true">❦</div>
              <div className="envelope-corner-accent bl" aria-hidden="true">❦</div>
              <div className="envelope-corner-accent br" aria-hidden="true">❦</div>
            </div>

            {/* D. Envelope 3D Fold Top Triangular Flap */}
            <div className="envelope-top-folding-flap">
              <svg viewBox="0 0 440 160" className="envelope-flap-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="ivoryFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="100%" stopColor="#F5ECE0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,0 440,0 220,150"
                  fill="url(#ivoryFlapGrad)"
                  stroke="#DFBF77"
                  strokeWidth="2"
                />
                {/* Inner Gold Foil Filigree on Flap */}
                <polygon
                  points="16,6 424,6 220,140"
                  fill="none"
                  stroke="#C49A45"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                {/* Flap Tip Lotus Ornament */}
                <circle cx="220" cy="130" r="6" fill="#DFBF77" />
              </svg>
            </div>

            {/* E. Central Circular Golden Wax Seal (K & T Monogram) */}
            <div className="envelope-wax-seal-hotspot" title="Tap wax seal to open invitation">
              <div className="seal-pulse-halo"></div>
              <div className="seal-rotating-stardust" aria-hidden="true">
                <span className="seal-star st-1">✦</span>
                <span className="seal-star st-2">✦</span>
                <span className="seal-star st-3">✦</span>
                <span className="seal-star st-4">✦</span>
              </div>
              <div className="wax-seal-medallion-rim">
                <img
                  src="assets/kt_wax_seal_luxury_512.png"
                  alt="Royal K & T Wax Seal"
                  className="wax-seal-texture-img"
                />
              </div>
            </div>
          </div>

          {/* 5. Visible Tap Instruction Banner */}
          <div
            className="envelope-tap-instruction-banner"
            onClick={handleOpenEnvelope}
            role="button"
            tabIndex={0}
          >
            <span className="instruction-diamond">✦</span>
            <span className="instruction-text">TAP THE SEAL TO OPEN YOUR INVITATION</span>
            <span className="instruction-diamond">✦</span>
          </div>

          {/* 6. PREMIUM GOLDEN ORNAMENTAL ACTION BUTTON */}
          <div className="envelope-primary-cta-wrap">
            <button
              className="royal-gold-action-btn btn-open-invitation"
              onClick={handleOpenEnvelope}
              disabled={stage !== 'closed'}
              aria-label="Open Wedding Invitation"
              id="btn-open-wedding-invitation"
            >
              <div className="btn-glow-aura"></div>
              <div className="btn-rotating-border">
                <svg viewBox="0 0 200 60" className="btn-border-svg" preserveAspectRatio="none">
                  <rect x="2" y="2" width="196" height="56" rx="28" fill="none" stroke="#DFBF77" strokeWidth="1.5" strokeDasharray="6 4" />
                </svg>
              </div>
              <span className="btn-icon-lead" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="#1A040A" style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                  <path d="M12 2.5C12.4 5 14.2 8.5 16.5 10C14.2 11 13 13 12.6 15.5C12.2 13 11 11 8.7 10C11 8.5 11.6 5 12 2.5Z" />
                  <path d="M12 7.5C14.2 9.5 18 9.5 20.5 7.5C18.5 11.5 16 13.5 13.2 14.5C14.5 12.5 14.5 10.5 12 7.5Z" opacity="0.8" />
                  <path d="M12 7.5C9.8 9.5 6 9.5 3.5 7.5C5.5 11.5 8 13.5 10.8 14.5C9.5 12.5 9.5 10.5 12 7.5Z" opacity="0.8" />
                  <path d="M8 17.5C10.5 18.5 13.5 18.5 16 17.5C15 19.5 13.5 20.5 12 20.5C10.5 20.5 9 19.5 8 17.5Z" />
                </svg>
              </span>
              <span className="btn-main-label">OPEN WEDDING INVITATION</span>
              <span className="btn-arrow-tail">⟶</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
