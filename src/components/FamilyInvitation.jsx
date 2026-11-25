import React from 'react';

export default function FamilyInvitation() {
  return (
    <section className="parchment-section family-invitation-section" id="family-invitation">
      <div className="ornate-border-card">
        <div className="card-top-sacred-header">
          <span className="holy-symbol">ॐ</span>
          <span className="holy-shloka">॥ श्री विनायकजी महाराज की असीम अनुकम्पा से ॥</span>
          <span className="holy-symbol">卐</span>
        </div>

        <div className="gold-ornamental-divider compact">
          <span className="divider-flourish">❖</span>
        </div>

        <h2 className="family-invitation-heading">
          UPADHYAY FAMILY INVITATION
        </h2>

        <p className="formal-hosts-title">
          <strong>Mrs. Chanda Devi</strong> &amp; <strong>Mr. Jasraj Ji Upadhyay</strong>
        </p>

        <p className="formal-invitation-lead">
          cordially invite your gracious presence with family and friends to celebrate the auspicious wedding ceremony of their beloved son
        </p>

        <div className="couple-formal-names-block">
          <h3 className="formal-groom-name">Chiranjeev Kuldeep</h3>
          <span className="formal-weds-script">— संग —</span>
          <h3 className="formal-bride-name">Sou. Ka. Teena</h3>
          <p className="formal-bride-parents">
            (Daughter of Smt. Manju Devi &amp; Shri Ramgopalji Vajpayee)
          </p>
        </div>

        <div className="family-blessing-message">
          <p>
            "With the divine blessings of our revered ancestors and elders, we humbly seek your presence to shower your warmest blessings, love, and felicitations upon the newly wedded couple as they embark on this sacred lifelong journey together."
          </p>
        </div>

        <div className="wax-seal-display-wrap">
          <img
            src="assets/kt_wax_seal.png"
            alt="Royal Monogram Wax Seal"
            className="card-wax-seal-img"
          />
        </div>
      </div>
    </section>
  );
}
