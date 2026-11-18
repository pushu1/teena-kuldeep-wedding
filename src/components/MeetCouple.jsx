import React from 'react';
import AnimatedCoupleMedallion from './AnimatedCoupleMedallion';

export default function MeetCouple() {
  return (
    <section className="parchment-section meet-couple-section" id="meet-couple">
      {/* Hanging Marigold Garlands with Swinging Bells at Section Corners */}
      <div className="corner-hanging-toran toran-left" aria-hidden="true">
        <img
          src="assets/hanging_bell_toran.png"
          alt="Hanging Garland"
          className="hanging-toran-img anim-swing-left"
        />
      </div>
      <div className="corner-hanging-toran toran-right" aria-hidden="true">
        <img
          src="assets/hanging_bell_toran.png"
          alt="Hanging Garland"
          className="hanging-toran-img anim-swing-right"
        />
      </div>

      <div className="section-header-wrap">
        <p className="small-section-tag">BEGINNING OF FOREVER</p>
        <h2 className="main-section-heading">Meet the Couple</h2>
        <div className="gold-ornamental-divider">
          <span className="divider-flourish">❦</span>
        </div>
      </div>

      {/* The Original Vector-Style Animated Bride and Groom Illustration */}
      <div className="couple-animated-illustration-card">
        <AnimatedCoupleMedallion />
        
        <div className="couple-names-caption">
          <h3 className="caption-couple-names">
            <span className="name-kuldeep">Kuldeep</span>
            <span className="name-amp">&amp;</span>
            <span className="name-teena">Teena</span>
          </h3>
          <p className="caption-subtext">
            Two souls uniting under the eternal sacred fire of love, trust, and tradition.
          </p>
        </div>
      </div>
    </section>
  );
}
