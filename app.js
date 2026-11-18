
window.require = function(mod) {
  if (mod === 'react') return window.React;
  if (mod === 'react-dom' || mod === 'react-dom/client') return window.ReactDOM;
  return {};
};

var RoyalWeddingApp = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/main.jsx
  var import_react17 = __toESM(__require("react"));
  var import_client = __toESM(__require("react-dom/client"));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/App.jsx
  var import_react16 = __toESM(__require("react"));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/PhoneFrame.jsx
  var import_react15 = __toESM(__require("react"));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/MandapHero.jsx
  var import_react = __toESM(__require("react"));
  function MandapHero({ onScrollClick }) {
    return /* @__PURE__ */ import_react.default.createElement("section", { className: "mandap-hero-section", id: "mandap-hero" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "hero-header-card" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "sacred-invocation-tag" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "shloka-ornament" }, "\u2726"), /* @__PURE__ */ import_react.default.createElement("span", { className: "shloka-devanagari" }, "\u0965 \u0936\u094D\u0930\u0940 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903 \u0965"), /* @__PURE__ */ import_react.default.createElement("span", { className: "shloka-ornament" }, "\u2726")), /* @__PURE__ */ import_react.default.createElement("h1", { className: "hero-main-title" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "hero-name" }, "KULDEEP"), /* @__PURE__ */ import_react.default.createElement("span", { className: "hero-weds" }, "weds"), /* @__PURE__ */ import_react.default.createElement("span", { className: "hero-name" }, "TEENA")), /* @__PURE__ */ import_react.default.createElement("div", { className: "hero-invitation-subtitle" }, "UPADHYAY FAMILY INVITATION"), /* @__PURE__ */ import_react.default.createElement("div", { className: "hero-date-badge" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "date-leaf" }, "\u2767"), /* @__PURE__ */ import_react.default.createElement("span", { className: "date-text" }, "Friday, 11 December 2026"), /* @__PURE__ */ import_react.default.createElement("span", { className: "date-leaf" }, "\u2767"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-stage-viewport" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-sky-backdrop" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-camera-rig" }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "assets/mandap_pristine.jpg",
        alt: "Traditional Indian Wedding Mandap",
        className: "mandap-base-image"
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "banana-leaf-wrapper leaf-left" }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "assets/banana_leaf_left_perfect.png",
        alt: "Swaying Banana Leaf",
        className: "banana-leaf-img leaf-left-anim"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "banana-leaf-wrapper leaf-right" }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "assets/banana_leaf_right_perfect.png",
        alt: "Swaying Banana Leaf",
        className: "banana-leaf-img leaf-right-anim"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-garlands-breeze-layer", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "festoons-row" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "garland-petal p-1" }, "\u{1F338}"), /* @__PURE__ */ import_react.default.createElement("span", { className: "garland-petal p-2" }, "\u{1F33C}"), /* @__PURE__ */ import_react.default.createElement("span", { className: "garland-petal p-3" }, "\u{1F338}"), /* @__PURE__ */ import_react.default.createElement("span", { className: "garland-petal p-4" }, "\u{1F33C}"), /* @__PURE__ */ import_react.default.createElement("span", { className: "garland-petal p-5" }, "\u{1F338}"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-bells-swing-layer", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-bell bell-1" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-string" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-brass" }, "\u{1F514}")), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-bell bell-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-string" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-brass" }, "\u{1F514}")), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-bell bell-3" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-string" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-brass" }, "\u{1F514}")), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-bell bell-4" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-string" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "bell-brass" }, "\u{1F514}")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mandap-threshold-blend" }), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "mandap-scroll-indicator",
        onClick: onScrollClick,
        "aria-label": "Scroll to read wedding invitation"
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "scroll-mouse-pill" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "scroll-wheel-dot" })),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "scroll-cta-text" }, "Scroll to Enter"),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "scroll-bouncing-chevron" }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("polyline", { points: "6 9 12 15 18 9" })))
    )));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/MeetCouple.jsx
  var import_react3 = __toESM(__require("react"));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/AnimatedCoupleMedallion.jsx
  var import_react2 = __toESM(__require("react"));
  function AnimatedCoupleMedallion() {
    const [animKey, setAnimKey] = (0, import_react2.useState)(0);
    const handleReplay = () => {
      setAnimKey((prev) => prev + 1);
    };
    return /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        className: "medallion-container",
        onClick: handleReplay,
        title: "Tap to replay royal greeting animation",
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") handleReplay();
        }
      },
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "medallion-aura-halo" }),
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "medallion-outer-ring" }, /* @__PURE__ */ import_react2.default.createElement(
        "svg",
        {
          key: animKey,
          className: "medallion-svg-canvas",
          viewBox: "0 0 1024 1024",
          width: "100%",
          height: "100%",
          "aria-label": "Animated Indian Wedding Couple Illustration"
        },
        /* @__PURE__ */ import_react2.default.createElement("defs", null, /* @__PURE__ */ import_react2.default.createElement("clipPath", { id: "couple-circle-clip" }, /* @__PURE__ */ import_react2.default.createElement("circle", { cx: "512", cy: "512", r: "506" }))),
        /* @__PURE__ */ import_react2.default.createElement("g", { clipPath: "url(#couple-circle-clip)" }, /* @__PURE__ */ import_react2.default.createElement(
          "image",
          {
            href: "assets/couple_looking_circle.png",
            width: "1024",
            height: "1024",
            className: "anim-layer layer-base-looking"
          }
        ), /* @__PURE__ */ import_react2.default.createElement(
          "image",
          {
            href: "assets/couple_namaste_circle.png",
            width: "1024",
            height: "1024",
            className: "anim-layer layer-base-namaste"
          }
        ), /* @__PURE__ */ import_react2.default.createElement("g", { className: "anim-layer layer-groom-head-looking" }, /* @__PURE__ */ import_react2.default.createElement("image", { href: "assets/layer_groom_head_looking.png", width: "1024", height: "1024" }), /* @__PURE__ */ import_react2.default.createElement(
          "image",
          {
            href: "assets/eyelids_groom_pose1.png",
            width: "1024",
            height: "1024",
            className: "eyelid-blink-layer eyelid-groom-p1"
          }
        )), /* @__PURE__ */ import_react2.default.createElement("g", { className: "anim-layer layer-bride-head-looking" }, /* @__PURE__ */ import_react2.default.createElement("image", { href: "assets/layer_bride_head_looking.png", width: "1024", height: "1024" }), /* @__PURE__ */ import_react2.default.createElement(
          "image",
          {
            href: "assets/eyelids_bride_pose1.png",
            width: "1024",
            height: "1024",
            className: "eyelid-blink-layer eyelid-bride-p1"
          }
        )), /* @__PURE__ */ import_react2.default.createElement("g", { className: "anim-layer layer-groom-head-front" }, /* @__PURE__ */ import_react2.default.createElement("image", { href: "assets/layer_groom_head_front.png", width: "1024", height: "1024" }), /* @__PURE__ */ import_react2.default.createElement(
          "image",
          {
            href: "assets/eyelids_groom_pose2.png",
            width: "1024",
            height: "1024",
            className: "eyelid-blink-layer eyelid-groom-p2"
          }
        )), /* @__PURE__ */ import_react2.default.createElement("g", { className: "anim-layer layer-bride-head-front" }, /* @__PURE__ */ import_react2.default.createElement("image", { href: "assets/layer_bride_head_front.png", width: "1024", height: "1024" }), /* @__PURE__ */ import_react2.default.createElement(
          "image",
          {
            href: "assets/eyelids_bride_pose2.png",
            width: "1024",
            height: "1024",
            className: "eyelid-blink-layer eyelid-bride-p2"
          }
        )), /* @__PURE__ */ import_react2.default.createElement("g", { className: "anim-layer layer-namaste-hands" }, /* @__PURE__ */ import_react2.default.createElement("image", { href: "assets/namaste_hands_layer.png", width: "1024", height: "1024" })))
      ), /* @__PURE__ */ import_react2.default.createElement("div", { className: "medallion-inner-gold-rim" })),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "sparkle-star s-top-left" }, "\u2726"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "sparkle-star s-top-right" }, "\u2726"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "sparkle-star s-bot-left" }, "\u2726"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "sparkle-star s-bot-right" }, "\u2726"),
      /* @__PURE__ */ import_react2.default.createElement("p", { className: "medallion-tap-hint" }, "\u2726 Tap portrait to replay greeting \u2726")
    );
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/MeetCouple.jsx
  function MeetCouple() {
    return /* @__PURE__ */ import_react3.default.createElement("section", { className: "parchment-section meet-couple-section", id: "meet-couple" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "corner-hanging-toran toran-left", "aria-hidden": "true" }, /* @__PURE__ */ import_react3.default.createElement(
      "img",
      {
        src: "assets/hanging_bell_toran.png",
        alt: "Hanging Garland",
        className: "hanging-toran-img anim-swing-left"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "corner-hanging-toran toran-right", "aria-hidden": "true" }, /* @__PURE__ */ import_react3.default.createElement(
      "img",
      {
        src: "assets/hanging_bell_toran.png",
        alt: "Hanging Garland",
        className: "hanging-toran-img anim-swing-right"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "section-header-wrap" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "small-section-tag" }, "BEGINNING OF FOREVER"), /* @__PURE__ */ import_react3.default.createElement("h2", { className: "main-section-heading" }, "Meet the Couple"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "gold-ornamental-divider" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "divider-flourish" }, "\u2766"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "couple-animated-illustration-card" }, /* @__PURE__ */ import_react3.default.createElement(AnimatedCoupleMedallion, null), /* @__PURE__ */ import_react3.default.createElement("div", { className: "couple-names-caption" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "caption-couple-names" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "name-kuldeep" }, "Kuldeep"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "name-amp" }, "&"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "name-teena" }, "Teena")), /* @__PURE__ */ import_react3.default.createElement("p", { className: "caption-subtext" }, "Two souls uniting under the eternal sacred fire of love, trust, and tradition."))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/GroomSection.jsx
  var import_react4 = __toESM(__require("react"));
  function GroomSection() {
    return /* @__PURE__ */ import_react4.default.createElement("section", { className: "parchment-section person-intro-section groom-section", id: "groom-intro" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "person-card-inner" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "person-portrait-wrapper" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "regal-arch-frame" }, /* @__PURE__ */ import_react4.default.createElement(
      "img",
      {
        src: "assets/groom_arch.png",
        alt: "Groom Kuldeep",
        className: "person-arch-photo",
        loading: "lazy"
      }
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "arch-inner-gold-border" })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "portrait-filigree-base" }, "\u2756")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "person-bio-wrap" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "person-title-badge" }, "THE GROOM"), /* @__PURE__ */ import_react4.default.createElement("h3", { className: "person-name" }, "Chiranjeev Kuldeep"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "person-parentage" }, "Beloved Son of ", /* @__PURE__ */ import_react4.default.createElement("strong", null, "Smt. Chandra Devi"), " & ", /* @__PURE__ */ import_react4.default.createElement("strong", null, "Shri Jasrajji Upadhyay")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "person-ancestral-line" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "ancestor-text" }, "Great-grandson of Late Smt. Jamna Devi & Late Shri Harchandji Upadhyay"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "ancestor-text" }, "Grandson of Late Smt. Pepi Devi & Late Shri Champalalji Upadhyay")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "person-quote-box" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "quote-text" }, '"A journey of honour, love, and sacred devotion begins with the blessings of elders and the presence of family."')))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/BrideSection.jsx
  var import_react5 = __toESM(__require("react"));
  function BrideSection() {
    return /* @__PURE__ */ import_react5.default.createElement("section", { className: "parchment-section person-intro-section bride-section", id: "bride-intro" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "person-card-inner" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "person-portrait-wrapper" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "regal-arch-frame" }, /* @__PURE__ */ import_react5.default.createElement(
      "img",
      {
        src: "assets/bride_arch.png",
        alt: "Bride Teena",
        className: "person-arch-photo",
        loading: "lazy"
      }
    ), /* @__PURE__ */ import_react5.default.createElement("div", { className: "arch-inner-gold-border" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "portrait-filigree-base" }, "\u2756")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "person-bio-wrap" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "person-title-badge" }, "THE BRIDE"), /* @__PURE__ */ import_react5.default.createElement("h3", { className: "person-name" }, "Sou. Ka. Teena"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "person-parentage" }, "Beloved Daughter of ", /* @__PURE__ */ import_react5.default.createElement("strong", null, "Smt. Manju Devi"), " & ", /* @__PURE__ */ import_react5.default.createElement("strong", null, "Shri Ramgopalji Vajpayee")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "person-ancestral-line" }, /* @__PURE__ */ import_react5.default.createElement("p", { className: "ancestor-text" }, "Granddaughter of Late Smt. Janki Devi & Late Shri Chhogalalji Vajpayee")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "person-quote-box" }, /* @__PURE__ */ import_react5.default.createElement("p", { className: "quote-text" }, '"Stepping into a lifetime of auspicious joy, grace, and happiness with heartfelt prayers and warm wishes."')))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/FamilyInvitation.jsx
  var import_react6 = __toESM(__require("react"));
  function FamilyInvitation() {
    return /* @__PURE__ */ import_react6.default.createElement("section", { className: "parchment-section family-invitation-section", id: "family-invitation" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "ornate-border-card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-top-sacred-header" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "holy-symbol" }, "\u0950"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "holy-shloka" }, "\u0965 \u0936\u094D\u0930\u0940 \u0935\u093F\u0928\u093E\u092F\u0915\u091C\u0940 \u092E\u0939\u093E\u0930\u093E\u091C \u0915\u0940 \u0905\u0938\u0940\u092E \u0905\u0928\u0941\u0915\u092E\u094D\u092A\u093E \u0938\u0947 \u0965"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "holy-symbol" }, "\u5350")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "gold-ornamental-divider compact" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "divider-flourish" }, "\u2756")), /* @__PURE__ */ import_react6.default.createElement("h2", { className: "family-invitation-heading" }, "UPADHYAY FAMILY INVITATION"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "formal-hosts-title" }, /* @__PURE__ */ import_react6.default.createElement("strong", null, "Smt. Chandra Devi"), " & ", /* @__PURE__ */ import_react6.default.createElement("strong", null, "Shri Jasrajji Upadhyay")), /* @__PURE__ */ import_react6.default.createElement("p", { className: "formal-invitation-lead" }, "cordially invite your gracious presence with family and friends to celebrate the auspicious wedding ceremony of their beloved son"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "couple-formal-names-block" }, /* @__PURE__ */ import_react6.default.createElement("h3", { className: "formal-groom-name" }, "Chiranjeev Kuldeep"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "formal-weds-script" }, "\u2014 \u0938\u0902\u0917 \u2014"), /* @__PURE__ */ import_react6.default.createElement("h3", { className: "formal-bride-name" }, "Sou. Ka. Teena"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "formal-bride-parents" }, "(Daughter of Smt. Manju Devi & Shri Ramgopalji Vajpayee)")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "family-blessing-message" }, /* @__PURE__ */ import_react6.default.createElement("p", null, '"With the divine blessings of our revered ancestors and elders, we humbly seek your presence to shower your warmest blessings, love, and felicitations upon the newly wedded couple as they embark on this sacred lifelong journey together."')), /* @__PURE__ */ import_react6.default.createElement("div", { className: "wax-seal-display-wrap" }, /* @__PURE__ */ import_react6.default.createElement(
      "img",
      {
        src: "assets/kt_wax_seal.png",
        alt: "Royal Monogram Wax Seal",
        className: "card-wax-seal-img"
      }
    ))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/DateAnnouncement.jsx
  var import_react7 = __toESM(__require("react"));
  function DateAnnouncement() {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kuldeep+weds+Teena+-+Royal+Wedding+Celebration&dates=20261211T020000/20261213T230000&details=Upadhyay+Family+Royal+Wedding+Celebration+of+Kuldeep+and+Teena.+Pali,+Rajasthan.&location=Jain+Bagbera+Dadawadi,+Venkatesh+Marg,+Pali,+Rajasthan`;
    return /* @__PURE__ */ import_react7.default.createElement("section", { className: "parchment-section date-announcement-section", id: "date-announcement" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-banner-inner" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "small-section-tag" }, "SAVE THE DATES"), /* @__PURE__ */ import_react7.default.createElement("h2", { className: "main-section-heading" }, "Wedding Celebrations"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "dates-showcase-grid" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-card-hero" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-badge-top" }, "AUSPICIOUS WEDDING DAY"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-calendar-box" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-day-name" }, "FRIDAY"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-date-number" }, "11"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-month-year" }, "DECEMBER 2026")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-muhurat-text" }, /* @__PURE__ */ import_react7.default.createElement("strong", null, "\u092A\u093E\u0923\u093F\u0917\u094D\u0930\u0939\u0923 \u0938\u0902\u0938\u094D\u0915\u093E\u0930 (Wedding Ceremony)"), /* @__PURE__ */ import_react7.default.createElement("span", null, "Madhya-Ratri 02:00 AM \u2022 Sacred Mandap"))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-card-secondary" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-badge-top" }, "GRAND RECEPTION"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-calendar-box" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-day-name" }, "SUNDAY"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-date-number" }, "13"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-month-year" }, "DECEMBER 2026")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "date-muhurat-text" }, /* @__PURE__ */ import_react7.default.createElement("strong", null, "\u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926 \u0938\u092E\u093E\u0930\u094B\u0939 \u090F\u0935\u0902 \u092A\u094D\u0930\u0940\u0924\u093F\u092D\u094B\u091C"), /* @__PURE__ */ import_react7.default.createElement("span", null, "Evening 06:00 PM Onwards \u2022 Pali")))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "calendar-action-wrap" }, /* @__PURE__ */ import_react7.default.createElement(
      "a",
      {
        href: googleCalendarUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "calendar-btn",
        title: "Save wedding dates to your Google Calendar"
      },
      /* @__PURE__ */ import_react7.default.createElement("span", { className: "cal-icon" }, "\u{1F4C5}"),
      /* @__PURE__ */ import_react7.default.createElement("span", null, "Add to Google Calendar")
    ))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/CeremoniesSchedule.jsx
  var import_react8 = __toESM(__require("react"));
  var ceremonies = [
    {
      id: "ghritpan",
      titleHindi: "\u0918\u0943\u0924\u092A\u093E\u0928 (\u0927\u0942\u092A\u0935\u093E\u0928)",
      titleEn: "Ghritpan (Dhoopwan) Ceremony",
      date: "05 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0936\u0928\u093F\u0935\u093E\u0930",
      dateEn: "Saturday, 05 December 2026",
      time: "\u092A\u094D\u0930\u093E\u0924\u0903 07:30 \u092C\u091C\u0947",
      venue: "\u0928\u093F\u091C \u0928\u093F\u0935\u093E\u0938 (Residence)",
      image: "assets/func_ghritpan.jpg",
      desc: "The auspicious beginning with sacred Vedic ghee rituals and sacred invocations invoking divine purity and blessings."
    },
    {
      id: "vinayak",
      titleHindi: "\u0935\u093F\u0928\u093E\u092F\u0915 \u0938\u094D\u0925\u093E\u092A\u0928\u093E",
      titleEn: "Vinayak Sthapana",
      date: "07 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0938\u094B\u092E\u0935\u093E\u0930",
      dateEn: "Monday, 07 December 2026",
      time: "\u092A\u094D\u0930\u093E\u0924\u0903 09:15 \u092C\u091C\u0947",
      venue: "\u0928\u093F\u091C \u0928\u093F\u0935\u093E\u0938 (Residence)",
      image: "assets/func_vinayak.jpg",
      desc: "Ceremonial installation of Lord Ganesha to bestow success, auspicious harmony, and remove any obstacles from the ceremonies."
    },
    {
      id: "mayra",
      titleHindi: "\u092E\u093E\u092F\u0930\u093E (\u092D\u093E\u0924)",
      titleEn: "Mayra (Bhaat) Ceremony",
      date: "10 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0917\u0941\u0930\u0942\u0935\u093E\u0930",
      dateEn: "Thursday, 10 December 2026",
      time: "\u092A\u094D\u0930\u093E\u0924\u0903 10:00 \u092C\u091C\u0947",
      venue: "\u0928\u093F\u091C \u0928\u093F\u0935\u093E\u0938 (Residence)",
      image: "assets/func_mayra.jpg",
      desc: "Heartwarming welcoming of maternal uncles (Mama Parivaar) presenting ceremonial clothes, jewellery, and shagun amidst joyous songs."
    },
    {
      id: "jeneu",
      titleHindi: "\u091C\u0928\u0947\u090A \u0938\u0902\u0938\u094D\u0915\u093E\u0930",
      titleEn: "Janeu Sanskar",
      date: "10 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0917\u0941\u0930\u0942\u0935\u093E\u0930",
      dateEn: "Thursday, 10 December 2026",
      time: "\u0938\u093E\u092F\u0902 04:00 \u092C\u091C\u0947",
      venue: "\u0928\u093F\u091C \u0928\u093F\u0935\u093E\u0938 (Residence)",
      image: "assets/func_jeneu.jpg",
      desc: "Traditional investiture of the holy thread signifying devotion to truth, ancestral values, and moral righteousness."
    },
    {
      id: "bandoli",
      titleHindi: "\u092C\u0902\u0926\u094B\u0932\u0940",
      titleEn: "Bandoli Procession",
      date: "10 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0917\u0941\u0930\u0942\u0935\u093E\u0930",
      dateEn: "Thursday, 10 December 2026",
      time: "\u0938\u093E\u092F\u0902 07:00 \u092C\u091C\u0947",
      venue: "\u0928\u093F\u091C \u0928\u093F\u0935\u093E\u0938 (Residence)",
      image: "assets/func_bandoli.jpg",
      desc: "Vibrant musical night and royal procession with dhol, traditional folk melodies, dancing, and heartfelt festivities."
    },
    {
      id: "baraat",
      titleHindi: "\u092C\u093E\u0930\u093E\u0924 \u092A\u094D\u0930\u0938\u094D\u0925\u093E\u0928",
      titleEn: "Baraat Prasthan",
      date: "11 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930",
      dateEn: "Friday, 11 December 2026",
      time: "\u092A\u094D\u0930\u093E\u0924\u0903 07:30 \u092C\u091C\u0947",
      venue: "\u0928\u093F\u091C \u0928\u093F\u0935\u093E\u0938 (Residence)",
      image: "assets/func_baraat.jpg",
      desc: "The groom departs majestically accompanied by family and friends, leading the royal procession towards the wedding pavilion."
    },
    {
      id: "panigrahan",
      titleHindi: "\u092A\u093E\u0923\u093F\u0917\u094D\u0930\u0939\u0923 \u0938\u0902\u0938\u094D\u0915\u093E\u0930 (\u0936\u0941\u092D \u0935\u093F\u0935\u093E\u0939)",
      titleEn: "Panigrahan Sanskar (Wedding Ceremony)",
      date: "11 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930",
      dateEn: "Friday, 11 December 2026",
      time: "\u092E\u0927\u094D\u092F\u0930\u093E\u0924\u094D\u0930\u093F 02:00 \u092C\u091C\u0947 (Madhya-Ratri)",
      venue: "\u0936\u0941\u092D \u0935\u093F\u0935\u093E\u0939 \u092E\u0902\u0921\u092A (Wedding Mandap)",
      image: "assets/func_panigrahan.jpg",
      desc: "The eternal union: Vedic chants, Seven Pheras around the holy Agni, Kanyadaan, and taking the sacred lifelong vows."
    },
    {
      id: "reception",
      titleHindi: "\u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926 \u0938\u092E\u093E\u0930\u094B\u0939 \u090F\u0935\u0902 \u092A\u094D\u0930\u0940\u0924\u093F\u092D\u094B\u091C",
      titleEn: "Grand Reception & Blessings",
      date: "13 \u0926\u093F\u0938\u092E\u094D\u092C\u0930 2026, \u0930\u0935\u093F\u0935\u093E\u0930",
      dateEn: "Sunday, 13 December 2026",
      time: "\u0938\u093E\u092F\u0902 06:00 \u092C\u091C\u0947 \u0938\u0947 (Evening Onwards)",
      venue: "\u091C\u0948\u0928 \u092C\u093E\u0917\u092C\u0947\u0930\u093E \u0926\u093E\u0926\u093E\u0935\u093E\u0921\u0940, \u0935\u0947\u0902\u0915\u091F\u0947\u0936 \u092E\u093E\u0930\u094D\u0917, \u092A\u093E\u0932\u0940 (\u0930\u093E\u091C.)",
      image: "assets/palace_card_pristine.jpg",
      desc: "Grand celebratory banquet, joyous felicitations, and an evening of warm blessings welcoming the newly wedded couple."
    }
  ];
  function CeremoniesSchedule() {
    return /* @__PURE__ */ import_react8.default.createElement("section", { className: "parchment-section ceremonies-schedule-section", id: "wedding-ceremonies" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "section-header-wrap" }, /* @__PURE__ */ import_react8.default.createElement("p", { className: "small-section-tag" }, "\u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u092A\u0932\u094B\u0902 \u0915\u093E \u0938\u092B\u0930"), /* @__PURE__ */ import_react8.default.createElement("h2", { className: "main-section-heading" }, "Wedding Ceremonies"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "gold-ornamental-divider" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "divider-flourish" }, "\u2766"))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ceremonies-timeline-stream" }, ceremonies.map((c, idx) => /* @__PURE__ */ import_react8.default.createElement("article", { key: c.id, className: "ceremony-stream-card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ceremony-visual-thumb" }, /* @__PURE__ */ import_react8.default.createElement(
      "img",
      {
        src: c.image,
        alt: c.titleHindi,
        className: "ceremony-img",
        loading: "lazy"
      }
    ), /* @__PURE__ */ import_react8.default.createElement("span", { className: "ceremony-step-badge" }, "0", idx + 1)), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ceremony-content-body" }, /* @__PURE__ */ import_react8.default.createElement("h3", { className: "ceremony-title-hindi" }, c.titleHindi), /* @__PURE__ */ import_react8.default.createElement("h4", { className: "ceremony-title-en" }, c.titleEn), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ceremony-meta-chips" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "meta-chip chip-date" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "chip-icon" }, "\u{1F5D3}\uFE0F"), /* @__PURE__ */ import_react8.default.createElement("span", null, c.date)), /* @__PURE__ */ import_react8.default.createElement("span", { className: "meta-chip chip-time" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "chip-icon" }, "\u23F0"), /* @__PURE__ */ import_react8.default.createElement("span", null, c.time)), /* @__PURE__ */ import_react8.default.createElement("span", { className: "meta-chip chip-venue" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "chip-icon" }, "\u{1F4CD}"), /* @__PURE__ */ import_react8.default.createElement("span", null, c.venue))), /* @__PURE__ */ import_react8.default.createElement("p", { className: "ceremony-description" }, c.desc))))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/WeddingCountdown.jsx
  var import_react9 = __toESM(__require("react"));
  function WeddingCountdown() {
    const targetDate = (/* @__PURE__ */ new Date("2026-12-11T02:00:00+05:30")).getTime();
    const [timeLeft, setTimeLeft] = (0, import_react9.useState)({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    (0, import_react9.useEffect)(() => {
      const calculateTime = () => {
        const now = (/* @__PURE__ */ new Date()).getTime();
        const difference = targetDate - now;
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1e3 * 60 * 60 * 24)),
            hours: Math.floor(difference / (1e3 * 60 * 60) % 24),
            minutes: Math.floor(difference / 1e3 / 60 % 60),
            seconds: Math.floor(difference / 1e3 % 60)
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };
      calculateTime();
      const interval = setInterval(calculateTime, 1e3);
      return () => clearInterval(interval);
    }, [targetDate]);
    return /* @__PURE__ */ import_react9.default.createElement("section", { className: "parchment-section countdown-section", id: "wedding-countdown" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "countdown-card-inner" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "small-section-tag" }, "AUSPICIOUS TIMING"), /* @__PURE__ */ import_react9.default.createElement("h2", { className: "main-section-heading" }, "Wedding Countdown"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "countdown-lead-sub" }, "Counting down every blessed second to the sacred vows & Seven Pheras"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "countdown-timer-grid" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-unit-box" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-number" }, String(timeLeft.days).padStart(2, "0")), /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-label" }, "DAYS")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-colon" }, ":"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-unit-box" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-number" }, String(timeLeft.hours).padStart(2, "0")), /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-label" }, "HOURS")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-colon" }, ":"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-unit-box" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-number" }, String(timeLeft.minutes).padStart(2, "0")), /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-label" }, "MINUTES")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-colon" }, ":"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "timer-unit-box" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-number" }, String(timeLeft.seconds).padStart(2, "0")), /* @__PURE__ */ import_react9.default.createElement("span", { className: "timer-label" }, "SECONDS"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "countdown-footer-note" }, /* @__PURE__ */ import_react9.default.createElement("span", null, "\u2728 11 December 2026 \u2022 02:00 AM IST \u2728"))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/ReceptionSection.jsx
  var import_react10 = __toESM(__require("react"));
  function ReceptionSection() {
    return /* @__PURE__ */ import_react10.default.createElement("section", { className: "parchment-section reception-invitation-section", id: "reception-invitation" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "reception-card-inner" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "small-section-tag" }, "CELEBRATORY BANQUET"), /* @__PURE__ */ import_react10.default.createElement("h2", { className: "main-section-heading" }, "Grand Reception & Blessings"), /* @__PURE__ */ import_react10.default.createElement("div", { className: "gold-ornamental-divider compact" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "divider-flourish" }, "\u2766")), /* @__PURE__ */ import_react10.default.createElement("p", { className: "reception-ceremony-hindi" }, "\u0965 \u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926 \u0938\u092E\u093E\u0930\u094B\u0939 \u090F\u0935\u0902 \u092A\u094D\u0930\u0940\u0924\u093F\u092D\u094B\u091C \u0965"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "reception-lead-text" }, "Following the sacred wedding ceremony, the Upadhyay Family cordially invites you to join us for an evening of joy, celebration, felicitations, and royal dining in honour of the newly married couple."), /* @__PURE__ */ import_react10.default.createElement("div", { className: "reception-details-box" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "reception-detail-item" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "detail-icon" }, "\u{1F5D3}\uFE0F"), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("p", { className: "detail-label" }, "DATE & DAY"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "detail-value" }, "Sunday, 13 December 2026"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "reception-detail-item" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "detail-icon" }, "\u23F0"), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("p", { className: "detail-label" }, "TIME"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "detail-value" }, "06:00 PM Onwards"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "reception-detail-item" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "detail-icon" }, "\u{1F3DB}\uFE0F"), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("p", { className: "detail-label" }, "VENUE"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "detail-value" }, "\u091C\u0948\u0928 \u092C\u093E\u0917\u092C\u0947\u0930\u093E \u0926\u093E\u0926\u093E\u0935\u093E\u0921\u0940 (Jain Bagbera Dadawadi)", /* @__PURE__ */ import_react10.default.createElement("br", null), "\u0935\u0947\u0902\u0915\u091F\u0947\u0936 \u092E\u093E\u0930\u094D\u0917, \u092A\u093E\u0932\u0940, \u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928 (Venkatesh Marg, Pali)"))))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/VenueLocation.jsx
  var import_react11 = __toESM(__require("react"));
  function VenueLocation() {
    const mapsUrl = "https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9";
    return /* @__PURE__ */ import_react11.default.createElement("section", { className: "parchment-section venue-location-section", id: "venue-location" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "section-header-wrap" }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "small-section-tag" }, "DIRECTIONS & VENUE"), /* @__PURE__ */ import_react11.default.createElement("h2", { className: "main-section-heading" }, "Venue & Navigation"), /* @__PURE__ */ import_react11.default.createElement("div", { className: "gold-ornamental-divider" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "divider-flourish" }, "\u2766"))), /* @__PURE__ */ import_react11.default.createElement("div", { className: "venue-card-content" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "venue-info-header" }, /* @__PURE__ */ import_react11.default.createElement("h3", { className: "venue-name-hi" }, "\u091C\u0948\u0928 \u092C\u093E\u0917\u092C\u0947\u0930\u093E \u0926\u093E\u0926\u093E\u0935\u093E\u0921\u0940"), /* @__PURE__ */ import_react11.default.createElement("h4", { className: "venue-name-en" }, "Jain Bagbera Dadawadi"), /* @__PURE__ */ import_react11.default.createElement("p", { className: "venue-address-line" }, "Venkatesh Marg, Pali, Rajasthan, India")), /* @__PURE__ */ import_react11.default.createElement("div", { className: "venue-qr-row" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "qr-wrapper" }, /* @__PURE__ */ import_react11.default.createElement(
      "img",
      {
        src: "assets/venue_maps_qr.png",
        alt: "Scan for Google Maps Navigation",
        className: "venue-qr-image"
      }
    ), /* @__PURE__ */ import_react11.default.createElement("span", { className: "qr-caption" }, "Scan with Phone Camera")), /* @__PURE__ */ import_react11.default.createElement("div", { className: "qr-directions-cta" }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "directions-hint" }, "Tap the button below for seamless GPS navigation directly to the celebration venue."), /* @__PURE__ */ import_react11.default.createElement(
      "a",
      {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "primary-gold-btn maps-nav-btn",
        title: "Open Google Maps for turn-by-turn navigation"
      },
      /* @__PURE__ */ import_react11.default.createElement("span", { className: "btn-icon" }, "\u{1F4CD}"),
      /* @__PURE__ */ import_react11.default.createElement("span", null, "Open in Google Maps \u2197")
    ))), /* @__PURE__ */ import_react11.default.createElement("div", { className: "embedded-map-container" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "map-art-backdrop" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "map-pin-badge" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "pin-pulse" }), /* @__PURE__ */ import_react11.default.createElement("span", { className: "pin-symbol" }, "\u{1F4CD}"), /* @__PURE__ */ import_react11.default.createElement("span", { className: "pin-label" }, "Jain Bagbera Dadawadi, Pali")), /* @__PURE__ */ import_react11.default.createElement(
      "a",
      {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "map-tap-overlay",
        title: "Click to navigate with Google Maps"
      },
      /* @__PURE__ */ import_react11.default.createElement("span", null, "Tap to Open Live GPS Navigation \u2197")
    )), /* @__PURE__ */ import_react11.default.createElement(
      "iframe",
      {
        title: "Reception Venue Location",
        src: "https://maps.google.com/maps?q=Jain%20Bagbera%20Dadawadi%2C%20Venkatesh%20Marg%2C%20Pali%2C%20Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed",
        className: "venue-iframe-map",
        loading: "lazy",
        allowFullScreen: true
      }
    ))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/BlessingsThankYou.jsx
  var import_react12 = __toESM(__require("react"));
  function BlessingsThankYou() {
    const [copied, setCopied] = (0, import_react12.useState)(false);
    const whatsappWishUrl = `https://wa.me/919461061236?text=${encodeURIComponent(
      "Heartiest congratulations and warmest blessings to Kuldeep & Teena on their royal wedding! May God bless the couple with lifelong happiness, prosperity, and togetherness. \u{1F490}\u2728"
    )}`;
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Kuldeep weds Teena \u2014 Upadhyay Family Wedding Invitation",
            text: "Upadhyay Family cordially invites you to the royal wedding celebrations of Kuldeep & Teena. 11 December 2026 \u2022 Pali, Rajasthan.",
            url: window.location.href
          });
        } catch {
        }
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3e3);
        });
      }
    };
    return /* @__PURE__ */ import_react12.default.createElement("footer", { className: "parchment-section blessings-footer-section", id: "blessings-thankyou" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "blessings-card-inner" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "sacred-ganesha-badge" }, /* @__PURE__ */ import_react12.default.createElement("span", { className: "ganesha-symbol" }, "\u0950")), /* @__PURE__ */ import_react12.default.createElement("span", { className: "small-section-tag" }, "WITH LOVE & GRATITUDE"), /* @__PURE__ */ import_react12.default.createElement("h2", { className: "main-section-heading" }, "Warm Wishes & Blessings"), /* @__PURE__ */ import_react12.default.createElement("p", { className: "blessings-lead-quote" }, '"Your love, presence, and heartfelt prayers are the greatest gifts we cherish on this sacred day."'), /* @__PURE__ */ import_react12.default.createElement("div", { className: "hosts-acknowledgement-box" }, /* @__PURE__ */ import_react12.default.createElement("p", { className: "hosts-label" }, "\u0909\u0924\u094D\u0924\u0930\u093E\u0915\u093E\u0902\u0915\u094D\u0937\u0940 (With Warm Compliments):"), /* @__PURE__ */ import_react12.default.createElement("h4", { className: "hosts-main-name" }, "\u091C\u0938\u0930\u093E\u091C \u092E\u093E\u0902\u0917\u0940\u0932\u093E\u0932 \u0909\u092A\u093E\u0927\u094D\u092F\u093E\u092F"), /* @__PURE__ */ import_react12.default.createElement("p", { className: "hosts-lineage-sub" }, "(\u0938\u0941\u092A\u0941\u0924\u094D\u0930 \u0938\u094D\u0935. \u0936\u094D\u0930\u0940 \u091A\u092E\u094D\u092A\u093E\u0932\u093E\u0932\u091C\u0940 \u0909\u092A\u093E\u0927\u094D\u092F\u093E\u092F)"), /* @__PURE__ */ import_react12.default.createElement("p", { className: "hosts-address-line" }, "255, 256, \u0930\u093E\u092E \u0928\u0917\u0930, \u0924\u0940\u0938\u0930\u0940 \u0917\u0932\u0940, \u092A\u093E\u0932\u0940 (\u0930\u093E\u091C.)"), /* @__PURE__ */ import_react12.default.createElement("div", { className: "hosts-contact-line" }, /* @__PURE__ */ import_react12.default.createElement("span", null, "\u{1F4DE} \u0938\u0902\u092A\u0930\u094D\u0915: \u091C\u0938\u0930\u093E\u091C\u091C\u0940 \u0909\u092A\u093E\u0927\u094D\u092F\u093E\u092F \u2014 "), /* @__PURE__ */ import_react12.default.createElement("a", { href: "tel:9461061236", className: "tel-link" }, "9461061236"), /* @__PURE__ */ import_react12.default.createElement("span", null, ", "), /* @__PURE__ */ import_react12.default.createElement("a", { href: "tel:9887997822", className: "tel-link" }, "9887997822"))), /* @__PURE__ */ import_react12.default.createElement("div", { className: "footer-action-buttons-grid" }, /* @__PURE__ */ import_react12.default.createElement(
      "a",
      {
        href: whatsappWishUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "action-btn-pill btn-whatsapp",
        title: "Send your blessings directly on WhatsApp"
      },
      /* @__PURE__ */ import_react12.default.createElement("span", { className: "btn-icon" }, "\u{1F4AC}"),
      /* @__PURE__ */ import_react12.default.createElement("span", null, "Send Wishes on WhatsApp")
    ), /* @__PURE__ */ import_react12.default.createElement(
      "button",
      {
        onClick: handleShare,
        className: "action-btn-pill btn-share",
        title: "Share this invitation with family & friends"
      },
      /* @__PURE__ */ import_react12.default.createElement("span", { className: "btn-icon" }, "\u{1F4E4}"),
      /* @__PURE__ */ import_react12.default.createElement("span", null, copied ? "Link Copied to Clipboard! \u2713" : "Share Invitation")
    ), /* @__PURE__ */ import_react12.default.createElement(
      "a",
      {
        href: "public/downloads/kuldeep-teena-wedding-invitation.pdf",
        download: "Kuldeep-Teena-Wedding-Invitation.pdf",
        className: "action-btn-pill btn-download-pdf",
        title: "Download Wedding Invitation PDF"
      },
      /* @__PURE__ */ import_react12.default.createElement("span", { className: "btn-icon" }, "\u{1F4DC}"),
      /* @__PURE__ */ import_react12.default.createElement("span", null, "Download Wedding Invitation PDF")
    )), /* @__PURE__ */ import_react12.default.createElement("div", { className: "footer-copyright-note" }, /* @__PURE__ */ import_react12.default.createElement("p", null, "KULDEEP WEDS TEENA \u2022 UPADHYAY FAMILY INVITATION"), /* @__PURE__ */ import_react12.default.createElement("p", { className: "footer-mini-sub" }, "11 December 2026 \u2022 Pali, Rajasthan"))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/MusicPlayer.jsx
  var import_react13 = __toESM(__require("react"));
  function MusicPlayer({ audioSrc = "assets/wedding_audio_reference.mp3" }) {
    const [isPlaying, setIsPlaying] = (0, import_react13.useState)(false);
    const [hasInteracted, setHasInteracted] = (0, import_react13.useState)(false);
    const audioRef = (0, import_react13.useRef)(null);
    (0, import_react13.useEffect)(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.55;
      const handleFirstGesture = () => {
        if (!hasInteracted && audio && audio.paused) {
          setHasInteracted(true);
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
          });
        }
      };
      window.addEventListener("click", handleFirstGesture, { once: true });
      window.addEventListener("touchstart", handleFirstGesture, { once: true });
      return () => {
        window.removeEventListener("click", handleFirstGesture);
        window.removeEventListener("touchstart", handleFirstGesture);
      };
    }, [hasInteracted]);
    const toggleMusic = (e) => {
      e.stopPropagation();
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Audio play request interrupted:", err);
        });
      }
    };
    return /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement("audio", { ref: audioRef, src: audioSrc, loop: true, preload: "auto" }), /* @__PURE__ */ import_react13.default.createElement("aside", { className: "music-player-aside", "aria-label": "Royal Wedding Shehnai Music" }, /* @__PURE__ */ import_react13.default.createElement(
      "button",
      {
        className: `floating-music-btn ${isPlaying ? "is-playing" : ""}`,
        onClick: toggleMusic,
        "aria-label": isPlaying ? "Pause wedding music" : "Play wedding music",
        title: isPlaying ? "Pause Royal Wedding Music" : "Play Royal Wedding Music"
      },
      /* @__PURE__ */ import_react13.default.createElement("div", { className: "music-btn-glow" }),
      isPlaying ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "audio-equalizer" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "eq-bar bar-1" }), /* @__PURE__ */ import_react13.default.createElement("span", { className: "eq-bar bar-2" }), /* @__PURE__ */ import_react13.default.createElement("span", { className: "eq-bar bar-3" })) : /* @__PURE__ */ import_react13.default.createElement("span", { className: "music-note-icon" }, "\u266B")
    )));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/PetalsCanvas.jsx
  var import_react14 = __toESM(__require("react"));
  function PetalsCanvas() {
    const canvasRef = (0, import_react14.useRef)(null);
    (0, import_react14.useEffect)(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let animationFrameId;
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
      const petalCount = 28;
      const petals = [];
      const colors = [
        "rgba(215, 123, 154, 0.75)",
        // Floral Pink
        "rgba(235, 158, 183, 0.65)",
        // Light Blossom
        "rgba(248, 215, 225, 0.8)",
        // Soft Rose
        "rgba(196, 154, 69, 0.85)",
        // Antique Gold stardust
        "rgba(243, 229, 171, 0.75)"
        // Light Gold
      ];
      for (let i = 0; i < petalCount; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          r: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          isGold: Math.random() > 0.6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * 1.4 + 0.8,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 2.5,
          swing: Math.random() * Math.PI * 2,
          vSwing: Math.random() * 0.03 + 0.01
        });
      }
      const render = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          p.swing += p.vSwing;
          p.x += p.vx + Math.sin(p.swing) * 0.9;
          p.y += p.vy;
          p.rot += p.vRot;
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * Math.PI / 180);
          if (p.isGold) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.r * 0.45, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
        animationFrameId = requestAnimationFrame(render);
      };
      render();
      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);
    return /* @__PURE__ */ import_react14.default.createElement("canvas", { ref: canvasRef, className: "petals-canvas", "aria-hidden": "true" });
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/PhoneFrame.jsx
  function PhoneFrame() {
    const scrollContainerRef = (0, import_react15.useRef)(null);
    const handleScrollToContent = () => {
      const el = document.getElementById("meet-couple");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    return /* @__PURE__ */ import_react15.default.createElement("div", { className: "app-viewport-wrapper" }, /* @__PURE__ */ import_react15.default.createElement(PetalsCanvas, null), /* @__PURE__ */ import_react15.default.createElement(MusicPlayer, null), /* @__PURE__ */ import_react15.default.createElement("div", { className: "phone-device-container" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "phone-hardware-shell", "aria-hidden": "true" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "phone-bezel-rim" }), /* @__PURE__ */ import_react15.default.createElement("div", { className: "phone-glare-reflection" }), /* @__PURE__ */ import_react15.default.createElement("div", { className: "phone-top-island" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "speaker-slot" }), /* @__PURE__ */ import_react15.default.createElement("span", { className: "camera-lens" }))), /* @__PURE__ */ import_react15.default.createElement(
      "div",
      {
        ref: scrollContainerRef,
        className: "phone-screen-viewport",
        id: "invitation-scroll-pane"
      },
      /* @__PURE__ */ import_react15.default.createElement(MandapHero, { onScrollClick: handleScrollToContent }),
      /* @__PURE__ */ import_react15.default.createElement(MeetCouple, null),
      /* @__PURE__ */ import_react15.default.createElement(GroomSection, null),
      /* @__PURE__ */ import_react15.default.createElement(BrideSection, null),
      /* @__PURE__ */ import_react15.default.createElement(FamilyInvitation, null),
      /* @__PURE__ */ import_react15.default.createElement(DateAnnouncement, null),
      /* @__PURE__ */ import_react15.default.createElement(CeremoniesSchedule, null),
      /* @__PURE__ */ import_react15.default.createElement(WeddingCountdown, null),
      /* @__PURE__ */ import_react15.default.createElement(ReceptionSection, null),
      /* @__PURE__ */ import_react15.default.createElement(VenueLocation, null),
      /* @__PURE__ */ import_react15.default.createElement(BlessingsThankYou, null)
    )));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/App.jsx
  function App() {
    return /* @__PURE__ */ import_react16.default.createElement("div", { className: "royal-wedding-app" }, /* @__PURE__ */ import_react16.default.createElement(PhoneFrame, null));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/main.jsx
  var rootElement = document.getElementById("root");
  if (rootElement) {
    const root = import_client.default.createRoot(rootElement);
    root.render(/* @__PURE__ */ import_react17.default.createElement(App, null));
  }
})();
