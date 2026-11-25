import React, { useState } from 'react';

export default function RoyalGateLanding({ onOpenGate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleGateClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      if (onOpenGate) onOpenGate();
    }, 1300);
  };

  return (
    <div className={`royal-gate-screen ${isOpening ? 'gate-is-opening' : ''} ${isOpen ? 'gate-is-open' : ''}`}>
      {/* Background Celestial Sky */}
      <div className="gate-sky-backdrop" />

      {/* Side Periwinkle Floral Garlands */}
      <div className="gate-side-floral floral-left" aria-hidden="true">
        <img src="assets/floral_border_left.png" alt="" className="floral-garland-img" />
      </div>
      <div className="gate-side-floral floral-right" aria-hidden="true">
        <img src="assets/floral_border_right.png" alt="" className="floral-garland-img" />
      </div>

      {/* Top Wedding Announcement */}
      <header className="gate-header-block">
        <p className="gate-pre-title">THE WEDDING OF</p>
        <h1 className="gate-couple-names">Kuldeep &amp; Teena</h1>
      </header>

      {/* Haveli Arch with Double Doors */}
      <div className="gate-arch-structure">
        {/* Arch Finial & Spire */}
        <div className="arch-finial-spire" aria-hidden="true">
          <svg viewBox="0 0 40 80" className="spire-svg">
            <path d="M20 0 C22 15 26 25 20 40 C14 25 18 15 20 0 Z" fill="#D4AF37" />
            <circle cx="20" cy="45" r="4" fill="#D4AF37" />
            <path d="M12 55 L28 55 L24 75 L16 75 Z" fill="#D4AF37" />
          </svg>
        </div>

        {/* Outer White Marble Arch Frame */}
        <div className="arch-marble-frame">
          <div className="arch-scallop-cusp" />

          {/* 3D Double Doors Viewport */}
          <div
            className="gate-doors-viewport"
            onClick={handleGateClick}
            role="button"
            tabIndex={0}
            aria-label="Tap to open royal wedding invitation doors"
          >
            {/* Palace Courtyard Revealed Directly Behind Doors */}
            <div className="gate-revealed-courtyard" aria-hidden="true">
              <img
                src="assets/ref_palace_lake_clean.jpg"
                alt="Royal Palace Courtyard"
                className="courtyard-img"
              />
              <div className="courtyard-glow" />
            </div>

            {/* Left Door Leaf */}
            <div className={`door-leaf door-leaf-left ${isOpening ? 'door-open-left' : ''}`}>
              <img src="assets/door_left.png" alt="" className="door-texture-img" />
            </div>

            {/* Right Door Leaf */}
            <div className={`door-leaf door-leaf-right ${isOpening ? 'door-open-right' : ''}`}>
              <img src="assets/door_right.png" alt="" className="door-texture-img" />
            </div>

            {/* Central Golden Crest with Crown & K & T */}
            <div className={`gate-center-crest ${isOpening ? 'crest-lift-fade' : ''}`}>
              <img src="assets/royal_crest_kt.png" alt="Royal K & T Crest" className="crest-medallion-img" />
              <div className="crest-pulse-ring" />
            </div>

            {/* Instructional Invitation Prompt */}
            <div className="gate-tap-prompt">
              <span className="prompt-text">Tap the crest to open the doors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
