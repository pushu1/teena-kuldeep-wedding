import React, { useRef } from 'react';
import MandapHero from './MandapHero';
import MeetCouple from './MeetCouple';
import GroomSection from './GroomSection';
import BrideSection from './BrideSection';
import FamilyInvitation from './FamilyInvitation';
import DateAnnouncement from './DateAnnouncement';
import CeremoniesSchedule from './CeremoniesSchedule';
import WeddingCountdown from './WeddingCountdown';
import ReceptionSection from './ReceptionSection';
import VenueLocation from './VenueLocation';
import BlessingsThankYou from './BlessingsThankYou';
import MusicPlayer from './MusicPlayer';
import PetalsCanvas from './PetalsCanvas';

export default function PhoneFrame() {
  const scrollContainerRef = useRef(null);

  const handleScrollToContent = () => {
    const el = document.getElementById('meet-couple');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-viewport-wrapper">
      {/* Background Petals and Gold Sparkles Canvas */}
      <PetalsCanvas />

      {/* Floating Circular Music Control */}
      <MusicPlayer />

      {/* The Central Smartphone Frame on Desktop / Edge-to-Edge on Mobile */}
      <div className="phone-device-container">
        {/* Smartphone Hardware Shell Elements (Desktop Only) */}
        <div className="phone-hardware-shell" aria-hidden="true">
          <div className="phone-bezel-rim"></div>
          <div className="phone-glare-reflection"></div>
          <div className="phone-top-island">
            <span className="speaker-slot"></span>
            <span className="camera-lens"></span>
          </div>
        </div>

        {/* The Scrollable Screen Viewport */}
        <div
          ref={scrollContainerRef}
          className="phone-screen-viewport"
          id="invitation-scroll-pane"
        >
          {/* Section 1: Opening Wedding Mandap Hero */}
          <MandapHero onScrollClick={handleScrollToContent} />

          {/* Section 2: Meet the Couple with Animated Bride & Groom Vector Illustration */}
          <MeetCouple />

          {/* Section 3: Groom Introduction */}
          <GroomSection />

          {/* Section 4: Bride Introduction */}
          <BrideSection />

          {/* Section 5: Upadhyay Family Formal Invitation */}
          <FamilyInvitation />

          {/* Section 6: Wedding Date Announcement */}
          <DateAnnouncement />

          {/* Section 7: Wedding Ceremony Details (All 8 Ceremonies) */}
          <CeremoniesSchedule />

          {/* Section 8: Real-Time Wedding Countdown */}
          <WeddingCountdown />

          {/* Section 9: Reception Invitation */}
          <ReceptionSection />

          {/* Section 10: Venue Location & Google Maps Navigation */}
          <VenueLocation />

          {/* Section 11: Final Blessings and Thank-You Section */}
          <BlessingsThankYou />
        </div>
      </div>
    </div>
  );
}
