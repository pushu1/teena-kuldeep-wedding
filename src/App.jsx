import React, { useState } from 'react';
import CinematicEnvelopeOpening from './components/CinematicEnvelopeOpening';
import WeddingHero from './components/WeddingHero';
import BrideFamilySection from './components/BrideFamilySection';
import GroomFamilySection from './components/GroomFamilySection';
import WeddingTimeline from './components/WeddingTimeline';
import VenueSection from './components/VenueSection';
import CountdownSection from './components/CountdownSection';
import FamilyBlessingsSection from './components/FamilyBlessingsSection';
import FinalBlessingsFooter from './components/FinalBlessingsFooter';
import InvitationViewerModal from './components/InvitationViewerModal';
import MusicPlayer from './components/MusicPlayer';
import PetalsCanvas from './components/PetalsCanvas';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    if (typeof window.toggleWeddingMusic === 'function') {
      window.toggleWeddingMusic();
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="royal-wedding-app">
      {/* Background Falling Golden Sparkles & Rose Petals */}
      <PetalsCanvas />

      {/* Background Royal Wedding Music Player (YouTube IFrame API) */}
      <MusicPlayer />

      {/* Cinematic Opening Screen vs Main Wedding Celebration */}
      {!hasOpenedEnvelope ? (
        <CinematicEnvelopeOpening
          onOpenComplete={() => setHasOpenedEnvelope(true)}
          onToggleMusic={toggleMusic}
          isMuted={isMuted}
        />
      ) : (
        <div className="invitation-main-flow fade-enter">
          
          {/* Sticky Royal Navigation Bar */}
          <header className="sticky-royal-nav" role="banner">
            <div className="nav-container">
              <div className="nav-brand" onClick={() => scrollTo('hero-section')}>
                <span className="brand-crest">👑</span>
                <span className="brand-title">TEENA &amp; KULDEEP</span>
              </div>

              <nav className="nav-links-row" aria-label="Wedding sections navigation">
                <button className="nav-link-btn" onClick={() => scrollTo('hero-section')}>
                  Welcome
                </button>
                <button className="nav-link-btn" onClick={() => scrollTo('bride-section')}>
                  Bride's Family
                </button>
                <button className="nav-link-btn" onClick={() => scrollTo('groom-section')}>
                  Groom's Family
                </button>
                <button className="nav-link-btn" onClick={() => scrollTo('events-section')}>
                  Celebrations
                </button>
                <button className="nav-link-btn" onClick={() => scrollTo('venue-section')}>
                  Venue
                </button>
                <button className="nav-link-btn" onClick={() => scrollTo('countdown-section')}>
                  Countdown
                </button>
                <button className="nav-link-btn" onClick={() => scrollTo('family-section')}>
                  Compliments
                </button>
              </nav>

              <div className="nav-actions-group">
                <button
                  className="nav-btn-view-card"
                  onClick={() => setIsViewerOpen(true)}
                  title="Open Royal Wedding Invitation Card"
                >
                  <span className="btn-icon">📜</span>
                  <span className="btn-text">VIEW CARD</span>
                </button>

                <a
                  href="Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
                  download="Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
                  className="nav-btn-download-pdf"
                  title="Download High-Resolution PDF Invitation"
                >
                  <span className="btn-icon">📥</span>
                  <span className="btn-text">PDF</span>
                </a>
              </div>
            </div>
          </header>

          {/* Central Mobile-Friendly Content Column */}
          <main className="invitation-content-column">
            {/* SECTION 1: ROYAL WELCOME */}
            <WeddingHero
              onOpenCardViewer={() => setIsViewerOpen(true)}
              onDownloadPDF={() => {}}
            />

            {/* SECTION 2: THE BRIDE'S FAMILY (JAIPUR VAJPAYEE FAMILY) */}
            <BrideFamilySection />

            {/* SECTION 3: THE GROOM'S FAMILY (PALI UPADHYAY FAMILY) */}
            <GroomFamilySection />

            {/* SECTION 4: WEDDING CELEBRATIONS */}
            <WeddingTimeline />

            {/* SECTION 5: WEDDING VENUE */}
            <VenueSection />

            {/* SECTION 6: LIVE WEDDING COUNTDOWN */}
            <CountdownSection />

            {/* SECTION 7: FAMILY INVITATION / WITH BEST COMPLIMENTS FROM */}
            <FamilyBlessingsSection />

            {/* SECTION 8: FINAL BLESSINGS & ROYAL FOOTER */}
            <FinalBlessingsFooter
              onOpenCardViewer={() => setIsViewerOpen(true)}
              onDownloadPDF={() => {}}
            />
          </main>
        </div>
      )}

      {/* SECTION 10: FULL-SCREEN DIGITAL INVITATION VIEWER MODAL */}
      <InvitationViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
