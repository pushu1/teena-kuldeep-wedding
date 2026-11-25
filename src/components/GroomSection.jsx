import React from 'react';

export default function GroomSection() {
  return (
    <section className="parchment-section person-intro-section groom-section" id="groom-intro">
      <div className="person-card-inner">
        <div className="person-portrait-wrapper">
          <div className="regal-arch-frame">
            <img
              src="assets/groom_arch.png"
              alt="Groom Kuldeep"
              className="person-arch-photo"
              loading="lazy"
            />
            <div className="arch-inner-gold-border"></div>
          </div>
          <div className="portrait-filigree-base">❖</div>
        </div>

        <div className="person-bio-wrap">
          <span className="person-title-badge">THE GROOM</span>
          <h3 className="person-name">Chiranjeev Kuldeep</h3>
          
          <p className="person-parentage">
            Beloved Son of <strong>Mrs. Chanda Devi</strong> &amp; <strong>Mr. Jasraj Ji Upadhyay</strong>
          </p>

          <div className="person-ancestral-line">
            <p className="ancestor-text">
              Grandson of Late Mrs. Pepi Devi &amp; Late Mr. Champalal Ji Upadhyay
            </p>
          </div>

          <div className="person-quote-box">
            <p className="quote-text">
              "A journey of honour, love, and sacred devotion begins with the blessings of elders and the presence of family."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
