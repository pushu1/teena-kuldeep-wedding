import React from 'react';

export default function DateAnnouncement() {
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kuldeep+weds+Teena+-+Royal+Wedding+Celebration&dates=20261211T020000/20261213T230000&details=Upadhyay+Family+Royal+Wedding+Celebration+of+Kuldeep+and+Teena.+Pali,+Rajasthan.&location=Jain+Bagbera+Dadawadi,+Venkatesh+Marg,+Pali,+Rajasthan`;

  return (
    <section className="parchment-section date-announcement-section" id="date-announcement">
      <div className="date-banner-inner">
        <span className="small-section-tag">SAVE THE DATES</span>
        <h2 className="main-section-heading">Wedding Celebrations</h2>
        
        <div className="dates-showcase-grid">
          {/* Main Wedding Day */}
          <div className="date-card-hero">
            <div className="date-badge-top">AUSPICIOUS WEDDING DAY</div>
            <div className="date-calendar-box">
              <span className="cal-day-name">FRIDAY</span>
              <span className="cal-date-number">11</span>
              <span className="cal-month-year">DECEMBER 2026</span>
            </div>
            <div className="date-muhurat-text">
              <strong>पाणिग्रहण संस्कार (Wedding Ceremony)</strong>
              <span>Madhya-Ratri 02:00 AM • Sacred Mandap</span>
            </div>
          </div>

          {/* Grand Reception Day */}
          <div className="date-card-secondary">
            <div className="date-badge-top">GRAND RECEPTION</div>
            <div className="date-calendar-box">
              <span className="cal-day-name">SUNDAY</span>
              <span className="cal-date-number">13</span>
              <span className="cal-month-year">DECEMBER 2026</span>
            </div>
            <div className="date-muhurat-text">
              <strong>आशीर्वाद समारोह एवं प्रीतिभोज</strong>
              <span>Evening 06:00 PM Onwards • Pali</span>
            </div>
          </div>
        </div>

        {/* Add to Calendar Action */}
        <div className="calendar-action-wrap">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-btn"
            title="Save wedding dates to your Google Calendar"
          >
            <span className="cal-icon">📅</span>
            <span>Add to Google Calendar</span>
          </a>
        </div>
      </div>
    </section>
  );
}
