import React from 'react';

export default function BrideSection() {
  return (
    <section className="parchment-section person-intro-section bride-section" id="bride-intro">
      <div className="person-card-inner">
        <div className="person-portrait-wrapper">
          <div className="regal-arch-frame">
            <img
              src="assets/bride_arch.png"
              alt="Bride Teena"
              className="person-arch-photo"
              loading="lazy"
            />
            <div className="arch-inner-gold-border"></div>
          </div>
          <div className="portrait-filigree-base">❖</div>
        </div>

        <div className="person-bio-wrap">
          <span className="person-title-badge">THE BRIDE</span>
          <h3 className="person-name">Sou. Ka. Teena</h3>
          
          <p className="person-parentage">
            Beloved Daughter of <strong>Smt. Manju Devi</strong> &amp; <strong>Shri Ramgopalji Vajpayee</strong>
          </p>

          <div className="person-ancestral-line">
            <p className="ancestor-text">
              Granddaughter of Late Smt. Janki Devi &amp; Late Shri Chhogalalji Vajpayee
            </p>
          </div>

          <div className="person-quote-box">
            <p className="quote-text">
              "Stepping into a lifetime of auspicious joy, grace, and happiness with heartfelt prayers and warm wishes."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
