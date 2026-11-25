import React, { useState } from 'react';

export default function WeddingTimeline() {
  const [activeDay, setActiveDay] = useState('all'); // 'all' | 'day1' | 'day2'

  const day1Events = [
    {
      num: '01',
      title: 'Ganesh Invocation Ceremony',
      time: '5:15 AM',
      icon: '🕉️',
      desc: 'Commencing the holy wedding celebrations with divine prayers and invocations to Lord Ganesha for unobstructed auspiciousness and prosperity.'
    },
    {
      num: '02',
      title: 'Lagan Vinayak Puja',
      time: '10:00 AM',
      icon: '🪔',
      desc: 'Sacred Vedic rituals worshipping Lord Vinayaka, sanctifying the wedding alliance with Vedic chants and parental blessings.'
    },
    {
      num: '03',
      title: 'Chak Pujan Ceremony',
      time: '4:00 PM',
      icon: '🏺',
      desc: 'Traditional ancestral pot-making and fertility worship ceremony, honoring age-old Rajasthani heritage and cultural roots.'
    }
  ];

  const day2Events = [
    {
      num: '01',
      title: 'Wedding Reception Dinner (Preeti Bhoj)',
      time: '6:00 PM onwards until the arrival of guests',
      icon: '🍽️',
      desc: 'A grand royal feast hosted to welcome esteemed family, relatives, and cherished guests to celebrate the joyous union.'
    },
    {
      num: '02',
      title: 'Wedding Procession Welcome (Baraat Swagat)',
      time: '10:30 PM',
      icon: '🎺',
      desc: 'Festive arrival of the groom with ceremonial music and procession, followed by the grand traditional welcome by the bride’s family.'
    },
    {
      num: '03',
      title: 'Sacred Wedding Rituals (Panigrahan Sanskar)',
      time: 'As per the auspicious wedding muhurat',
      icon: '🔥',
      desc: 'The sacred Vedic rites, Kanyadaan, and the seven holy circumambulations (Saptapadi) around the sacred fire uniting two souls for eternity.'
    }
  ];

  const handleAddToCalendar = (day) => {
    let title = '';
    let details = '';
    let location = 'Shri Adigaud Brahmin Samaj Dharamshala, Tejaji Nagar, 80 Feet Road, Mahesh Nagar, Jaipur, Rajasthan, India';
    let dates = '';

    if (day === 1) {
      title = 'Pre-Wedding Ceremonies - Teena & Kuldeep';
      details = 'Ganesh Invocation Ceremony (5:15 AM), Lagan Vinayak Puja (10:00 AM), Chak Pujan (4:00 PM)';
      dates = '20261207T051500/20261207T180000';
    } else {
      title = 'The Royal Wedding - Teena & Kuldeep';
      details = 'Wedding Reception Dinner / Preeti Bhoj (6:00 PM), Baraat Swagat (10:30 PM), Panigrahan Sanskar';
      dates = '20261211T180000/20261212T030000';
    }

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="wedding-section timeline-events-section" id="events-section">
      <div className="section-royal-card">
        <div className="card-border-gold-outer"></div>
        <div className="card-border-gold-inner"></div>

        {/* Section Header */}
        <div className="section-header-flourish">
          <span className="shloka-text">|| शुभ लग्न व कार्यक्रम ||</span>
          <h2 className="section-title-gold">WEDDING EVENTS &amp; ITINERARY</h2>
          <p className="section-subtitle-script">
            Two days of sacred ceremonies, joyful celebrations, and timeless traditions
          </p>
          <div className="section-title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Day Filter Pills */}
        <div className="timeline-day-filter">
          <button
            className={`filter-pill ${activeDay === 'all' ? 'active' : ''}`}
            onClick={() => setActiveDay('all')}
          >
            All Ceremonies
          </button>
          <button
            className={`filter-pill ${activeDay === 'day1' ? 'active' : ''}`}
            onClick={() => setActiveDay('day1')}
          >
            Day 1: Mon, 07 Dec
          </button>
          <button
            className={`filter-pill ${activeDay === 'day2' ? 'active' : ''}`}
            onClick={() => setActiveDay('day2')}
          >
            Day 2: Fri, 11 Dec (Wedding)
          </button>
        </div>

        {/* Timeline Itinerary Cards Grid */}
        <div className="itinerary-cards-container">
          
          {/* DAY 1 CARD */}
          {(activeDay === 'all' || activeDay === 'day1') && (
            <div className="day-itinerary-card card-day1">
              <div className="day-card-header">
                <div className="day-badge-chip">PRE-WEDDING CEREMONIES</div>
                <h3 className="day-main-heading">DAY 1 — MONDAY</h3>
                <div className="day-calendar-date">07 DECEMBER 2026</div>

                <button
                  className="btn-add-cal"
                  onClick={() => handleAddToCalendar(1)}
                  title="Add Day 1 ceremonies to Google Calendar"
                >
                  <span className="cal-icon">📅</span>
                  <span>Add to Calendar</span>
                </button>
              </div>

              <div className="day-events-vertical-list">
                {day1Events.map((evt, idx) => (
                  <div className="timeline-event-item" key={idx}>
                    <div className="event-marker-node">
                      <span className="marker-icon">{evt.icon}</span>
                      {idx < day1Events.length - 1 && <span className="vertical-timeline-spine"></span>}
                    </div>

                    <div className="event-content-box">
                      <div className="event-top-row">
                        <span className="event-index-badge">{evt.num}</span>
                        <h4 className="event-title">{evt.title}</h4>
                      </div>
                      <div className="event-time-badge">
                        <span className="time-clock-icon">⏰</span>
                        <span className="time-val">{evt.time}</span>
                      </div>
                      <p className="event-description">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DAY 2 CARD */}
          {(activeDay === 'all' || activeDay === 'day2') && (
            <div className="day-itinerary-card card-day2 featured-wedding-day">
              <div className="day-card-header">
                <div className="day-badge-chip chip-gold">MAIN AUSPICIOUS WEDDING</div>
                <h3 className="day-main-heading">DAY 2 — FRIDAY</h3>
                <div className="day-calendar-date">11 DECEMBER 2026</div>

                <button
                  className="btn-add-cal"
                  onClick={() => handleAddToCalendar(2)}
                  title="Add Wedding Day to Google Calendar"
                >
                  <span className="cal-icon">📅</span>
                  <span>Add to Calendar</span>
                </button>
              </div>

              <div className="day-events-vertical-list">
                {day2Events.map((evt, idx) => (
                  <div className="timeline-event-item" key={idx}>
                    <div className="event-marker-node">
                      <span className="marker-icon">{evt.icon}</span>
                      {idx < day2Events.length - 1 && <span className="vertical-timeline-spine"></span>}
                    </div>

                    <div className="event-content-box">
                      <div className="event-top-row">
                        <span className="event-index-badge">{evt.num}</span>
                        <h4 className="event-title">{evt.title}</h4>
                      </div>
                      <div className="event-time-badge highlight-wedding-time">
                        <span className="time-clock-icon">⏰</span>
                        <span className="time-val">{evt.time}</span>
                      </div>
                      <p className="event-description">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
