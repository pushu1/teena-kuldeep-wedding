import React from 'react';

const ceremonies = [
  {
    id: 'ghritpan',
    titleHindi: 'घृतपान (धूपवान)',
    titleEn: 'Ghritpan (Dhoopwan) Ceremony',
    date: '05 दिसम्बर 2026, शनिवार',
    dateEn: 'Saturday, 05 December 2026',
    time: 'प्रातः 07:30 बजे',
    venue: 'निज निवास (Residence)',
    image: 'assets/func_ghritpan.jpg',
    desc: 'The auspicious beginning with sacred Vedic ghee rituals and sacred invocations invoking divine purity and blessings.',
  },
  {
    id: 'vinayak',
    titleHindi: 'विनायक स्थापना',
    titleEn: 'Vinayak Sthapana',
    date: '07 दिसम्बर 2026, सोमवार',
    dateEn: 'Monday, 07 December 2026',
    time: 'प्रातः 09:15 बजे',
    venue: 'निज निवास (Residence)',
    image: 'assets/func_vinayak.jpg',
    desc: 'Ceremonial installation of Lord Ganesha to bestow success, auspicious harmony, and remove any obstacles from the ceremonies.',
  },
  {
    id: 'mayra',
    titleHindi: 'मायरा (भात)',
    titleEn: 'Mayra (Bhaat) Ceremony',
    date: '10 दिसम्बर 2026, गुरूवार',
    dateEn: 'Thursday, 10 December 2026',
    time: 'प्रातः 10:00 बजे',
    venue: 'निज निवास (Residence)',
    image: 'assets/func_mayra.jpg',
    desc: 'Heartwarming welcoming of maternal uncles (Mama Parivaar) presenting ceremonial clothes, jewellery, and shagun amidst joyous songs.',
  },
  {
    id: 'jeneu',
    titleHindi: 'जनेऊ संस्कार',
    titleEn: 'Janeu Sanskar',
    date: '10 दिसम्बर 2026, गुरूवार',
    dateEn: 'Thursday, 10 December 2026',
    time: 'सायं 04:00 बजे',
    venue: 'निज निवास (Residence)',
    image: 'assets/func_jeneu.jpg',
    desc: 'Traditional investiture of the holy thread signifying devotion to truth, ancestral values, and moral righteousness.',
  },
  {
    id: 'bandoli',
    titleHindi: 'बंदोली',
    titleEn: 'Bandoli Procession',
    date: '10 दिसम्बर 2026, गुरूवार',
    dateEn: 'Thursday, 10 December 2026',
    time: 'सायं 07:00 बजे',
    venue: 'निज निवास (Residence)',
    image: 'assets/func_bandoli.jpg',
    desc: 'Vibrant musical night and royal procession with dhol, traditional folk melodies, dancing, and heartfelt festivities.',
  },
  {
    id: 'baraat',
    titleHindi: 'बारात प्रस्थान',
    titleEn: 'Baraat Prasthan',
    date: '11 दिसम्बर 2026, शुक्रवार',
    dateEn: 'Friday, 11 December 2026',
    time: 'प्रातः 07:30 बजे',
    venue: 'निज निवास (Residence)',
    image: 'assets/func_baraat.jpg',
    desc: 'The groom departs majestically accompanied by family and friends, leading the royal procession towards the wedding pavilion.',
  },
  {
    id: 'panigrahan',
    titleHindi: 'पाणिग्रहण संस्कार (शुभ विवाह)',
    titleEn: 'Panigrahan Sanskar (Wedding Ceremony)',
    date: '11 दिसम्बर 2026, शुक्रवार',
    dateEn: 'Friday, 11 December 2026',
    time: 'मध्यरात्रि 02:00 बजे (Madhya-Ratri)',
    venue: 'शुभ विवाह मंडप (Wedding Mandap)',
    image: 'assets/func_panigrahan.jpg',
    desc: 'The eternal union: Vedic chants, Seven Pheras around the holy Agni, Kanyadaan, and taking the sacred lifelong vows.',
  },
  {
    id: 'reception',
    titleHindi: 'आशीर्वाद समारोह एवं प्रीतिभोज',
    titleEn: 'Grand Reception & Blessings',
    date: '13 दिसम्बर 2026, रविवार',
    dateEn: 'Sunday, 13 December 2026',
    time: 'सायं 06:00 बजे से (Evening Onwards)',
    venue: 'जैन बागबेरा दादावाडी, वेंकटेश मार्ग, पाली (राज.)',
    image: 'assets/palace_card_pristine.jpg',
    desc: 'Grand celebratory banquet, joyous felicitations, and an evening of warm blessings welcoming the newly wedded couple.',
  },
];

export default function CeremoniesSchedule() {
  return (
    <section className="parchment-section ceremonies-schedule-section" id="wedding-ceremonies">
      <div className="section-header-wrap">
        <p className="small-section-tag">मांगलिक पलों का सफर</p>
        <h2 className="main-section-heading">Wedding Ceremonies</h2>
        <div className="gold-ornamental-divider">
          <span className="divider-flourish">❦</span>
        </div>
      </div>

      <div className="ceremonies-timeline-stream">
        {ceremonies.map((c, idx) => (
          <article key={c.id} className="ceremony-stream-card">
            <div className="ceremony-visual-thumb">
              <img
                src={c.image}
                alt={c.titleHindi}
                className="ceremony-img"
                loading="lazy"
              />
              <span className="ceremony-step-badge">0{idx + 1}</span>
            </div>

            <div className="ceremony-content-body">
              <h3 className="ceremony-title-hindi">{c.titleHindi}</h3>
              <h4 className="ceremony-title-en">{c.titleEn}</h4>

              <div className="ceremony-meta-chips">
                <span className="meta-chip chip-date">
                  <span className="chip-icon">🗓️</span>
                  <span>{c.date}</span>
                </span>
                <span className="meta-chip chip-time">
                  <span className="chip-icon">⏰</span>
                  <span>{c.time}</span>
                </span>
                <span className="meta-chip chip-venue">
                  <span className="chip-icon">📍</span>
                  <span>{c.venue}</span>
                </span>
              </div>

              <p className="ceremony-description">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
