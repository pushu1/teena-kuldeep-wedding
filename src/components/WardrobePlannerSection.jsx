import React, { useState } from 'react';

const wardrobeThemes = {
  haldi: {
    title: 'Haldi',
    sub: 'Rajasthani Theme',
    date: 'WEDNESDAY, 10 DECEMBER 2026',
    code: 'Bright and Colourful Rajasthani Shades',
    colors: ['#F5C518', '#E67E22', '#D35400', '#27AE60', '#C0392B'],
    image: 'assets/ref_wardrobe_haldi.jpg',
  },
  sangeet: {
    title: 'Sangeet & Bandoli',
    sub: 'Glitter and Glam',
    date: 'THURSDAY, 10 DECEMBER 2026',
    code: 'All that Glitters & Indo-Western Splendour',
    colors: ['#7F8C8D', '#BDC3C7', '#D4AC0D', '#99A3A4', '#17202A'],
    image: 'assets/ref_wardrobe_sangeet.jpg',
  },
  wedding: {
    title: 'Shubh Vivah (Wedding)',
    sub: 'Royal Heritage',
    date: 'FRIDAY, 11 DECEMBER 2026',
    code: 'Ivory, Creme, Champagne with Shimmers',
    colors: ['#FDFEFE', '#F7F9F9', '#D5D8DC', '#FAD7A0', '#F5CBA7'],
    image: 'assets/ref_wardrobe_wedding.jpg',
  },
  reception: {
    title: 'Grand Reception',
    sub: 'Regal Elegance',
    date: 'SUNDAY, 13 DECEMBER 2026',
    code: 'Classic Black Tie, Emerald & Champagne Cocktail Attire',
    colors: ['#1A5276', '#117A65', '#B7950B', '#1C2833', '#F4F6F6'],
    image: 'assets/ref_wardrobe_wedding.jpg',
  },
};

export default function WardrobePlannerSection() {
  const [activeTab, setActiveTab] = useState('haldi');
  const [modalOpen, setModalOpen] = useState(false);

  const currentTheme = wardrobeThemes[activeTab];

  return (
    <section className="wardrobe-planner-section" id="wardrobe-planner">
      {/* Header */}
      <div className="section-title-wrap">
        <p className="section-pre-title">DRESS FOR THE MOMENT</p>
        <h2 className="section-script-title">Wardrobe Planner</h2>

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

      {/* Pill Tabs Selector */}
      <div className="wardrobe-tabs-bar">
        {Object.keys(wardrobeThemes).map((tabKey) => (
          <button
            key={tabKey}
            className={`wardrobe-tab-pill ${activeTab === tabKey ? 'is-active-tab' : ''}`}
            onClick={() => setActiveTab(tabKey)}
          >
            {tabKey.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Wardrobe Visual Card */}
      <div className="wardrobe-card-container">
        <div
          className="wardrobe-card-surface"
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          title="Tap to view full size"
        >
          {/* Framed Heading Block */}
          <div className="wardrobe-inner-heading">
            <h3 className="wardrobe-event-title">{currentTheme.title}</h3>
            <p className="wardrobe-theme-subtitle">({currentTheme.sub})</p>
          </div>

          <p className="wardrobe-event-date">{currentTheme.date}</p>

          <div className="wardrobe-dresscode-box">
            <span className="dresscode-label">DRESS CODE</span>
            <p className="dresscode-text-script">{currentTheme.code}</p>

            {/* Color Swatch Circles */}
            <div className="color-swatches-row">
              {currentTheme.colors.map((c, i) => (
                <span
                  key={i}
                  className="color-swatch-circle"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Mannequin Attire Illustration */}
          <div className="wardrobe-artwork-wrap">
            <img
              src={currentTheme.image}
              alt={`${currentTheme.title} Wardrobe Inspiration`}
              className="wardrobe-mannequin-img"
              loading="lazy"
            />
          </div>

          <p className="wardrobe-tap-hint">TAP TO VIEW FULL SIZE</p>
        </div>
      </div>

      {/* Interactive Full-Size Modal Popup */}
      {modalOpen && (
        <div className="wardrobe-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="wardrobe-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="wardrobe-modal-close-btn"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={currentTheme.image}
              alt={`${currentTheme.title} Full Size`}
              className="wardrobe-modal-full-img"
            />
            <div className="wardrobe-modal-caption">
              <h3>{currentTheme.title} &middot; {currentTheme.sub}</h3>
              <p>{currentTheme.code}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
