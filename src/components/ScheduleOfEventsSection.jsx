import React from 'react';

const weddingEvents = [
  {
    num: 'I',
    title: 'Ghritpan (Dhoopwan)',
    date: '05 DEC',
    time: '07:30 AM',
    desc: 'The auspicious beginning with sacred Vedic ghee rituals and divine invocations invoking purity and blessings.',
    image: 'assets/arch_func_ghritpan.png',
  },
  {
    num: 'II',
    title: 'Vinayak Sthapana',
    date: '07 DEC',
    time: '09:15 AM',
    desc: 'Ceremonial installation of Lord Ganesha to bestow success, auspicious harmony, and remove all obstacles.',
    image: 'assets/arch_func_vinayak.png',
  },
  {
    num: 'III',
    title: 'Mayra (Bhaat) Ceremony',
    date: '10 DEC',
    time: '10:00 AM',
    desc: 'Heartwarming welcoming of maternal uncles presenting ceremonial gifts and shagun amidst traditional songs.',
    image: 'assets/arch_func_mayra.png',
  },
  {
    num: 'IV',
    title: 'Janeu Sanskar',
    date: '10 DEC',
    time: '04:00 PM',
    desc: 'Traditional investiture of the holy thread signifying devotion to truth, ancestral values, and moral righteousness.',
    image: 'assets/arch_func_jeneu.png',
  },
  {
    num: 'V',
    title: 'Bandoli Procession',
    date: '10 DEC',
    time: '07:00 PM',
    desc: 'Vibrant musical night and royal procession with dhol beats, traditional folk melodies, and heartfelt celebrations.',
    image: 'assets/arch_func_bandoli.png',
  },
  {
    num: 'VI',
    title: 'Baraat Prasthan',
    date: '11 DEC',
    time: '07:30 AM',
    desc: 'The groom departs majestically accompanied by family and friends, leading the royal procession to the wedding pavilion.',
    image: 'assets/arch_func_baraat.png',
  },
  {
    num: 'VII',
    title: 'Panigrahan Sanskar',
    date: '11 DEC',
    time: '02:00 AM (Madhya-Ratri)',
    desc: 'The sacred Seven Pheras around the holy Agni, taking the lifelong vows of love, honour, and togetherness.',
    image: 'assets/arch_func_panigrahan.png',
  },
  {
    num: 'VIII',
    title: 'Grand Reception & Blessings',
    date: '13 DEC',
    time: '06:00 PM Onwards',
    desc: 'Grand celebratory banquet, joyous felicitations, and an evening of warm blessings welcoming the newly wedded couple.',
    image: 'assets/arch_func_reception.png',
  },
];

export default function ScheduleOfEventsSection() {
  return (
    <section className="events-schedule-section" id="schedule-of-events">
      {/* Section Header */}
      <div className="section-title-wrap">
        <p className="section-pre-title">DAYS OF CELEBRATION</p>
        <h2 className="section-script-title">Schedule of Events</h2>

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

      {/* Alternating Event Cards Stream */}
      <div className="events-alternating-stream">
        {weddingEvents.map((evt, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={evt.num}
              className={`event-row-card ${isReversed ? 'row-reversed' : 'row-normal'}`}
            >
              {/* Photo Box with Arch Frame */}
              <div className="event-photo-arch-wrap">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="event-arched-thumb"
                  loading="lazy"
                />
              </div>

              {/* Text Info Box */}
              <div className="event-info-box">
                <span className="event-roman-num">{evt.num}</span>
                <p className="event-date-stamp">{evt.date}</p>
                <p className="event-time-stamp">{evt.time}</p>
                <h3 className="event-name-serif">{evt.title}</h3>
                <p className="event-tagline-italic">{evt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
