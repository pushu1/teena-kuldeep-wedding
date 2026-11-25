
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
  var import_react14 = __toESM(__require("react"));
  var import_client = __toESM(__require("react-dom/client"));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/App.jsx
  var import_react13 = __toESM(__require("react"));

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/CinematicEnvelopeOpening.jsx
  var import_react = __toESM(__require("react"));
  function CinematicEnvelopeOpening({ onOpenComplete, onToggleMusic, isMuted }) {
    const [stage, setStage] = (0, import_react.useState)("closed");
    const canvasRef = (0, import_react.useRef)(null);
    const dustCanvasRef = (0, import_react.useRef)(null);
    const fireworksAnimRef = (0, import_react.useRef)(null);
    const dustAnimRef = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      const canvas = dustCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
      const count = width < 768 ? 30 : 60;
      const particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2
      }));
      const renderDust = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.y -= p.speedY;
          p.x += Math.sin(p.angle) * 0.3 + p.speedX;
          p.angle += 0.02;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.angle * 2));
          ctx.fillStyle = `rgba(232, 213, 163, ${currentAlpha})`;
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = "#D4AF65";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        dustAnimRef.current = requestAnimationFrame(renderDust);
      };
      renderDust();
      return () => {
        window.removeEventListener("resize", handleResize);
        if (dustAnimRef.current) cancelAnimationFrame(dustAnimRef.current);
      };
    }, []);
    (0, import_react.useEffect)(() => {
      if (stage !== "fireworks" && stage !== "opening") return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
      const fireworks = [];
      const particles = [];
      const colors = [
        "#FFD700",
        // Gold
        "#F4A460",
        // Champagne Amber
        "#FF4500",
        // Crimson Orange
        "#FF69B4",
        // Royal Pink
        "#00FA9A",
        // Emerald
        "#FFE4E1",
        // Ivory Gold
        "#E6C280"
        // Antique Gold
      ];
      class Firework {
        constructor(targetX, targetY) {
          this.x = width * (0.2 + Math.random() * 0.6);
          this.y = height + 10;
          this.targetX = targetX;
          this.targetY = targetY;
          this.speed = Math.random() * 3 + 7;
          this.angle = Math.atan2(targetY - this.y, targetX - this.x);
          this.vx = Math.cos(this.angle) * this.speed;
          this.vy = Math.sin(this.angle) * this.speed;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.trail = [];
          this.alive = true;
        }
        update() {
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > 5) this.trail.shift();
          this.x += this.vx;
          this.y += this.vy;
          const dist = Math.hypot(this.targetX - this.x, this.targetY - this.y);
          if (dist < 15 || this.vy >= 0) {
            this.alive = false;
            this.explode();
          }
        }
        explode() {
          const particleCount = width < 768 ? 36 : 65;
          for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(this.targetX, this.targetY, this.color));
          }
        }
        draw() {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          if (this.trail.length > 0) {
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let p of this.trail) ctx.lineTo(p.x, p.y);
          } else {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.vx, this.y - this.vy);
          }
          ctx.stroke();
        }
      }
      class Particle {
        constructor(x, y, color) {
          this.x = x;
          this.y = y;
          this.color = color;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 1.5;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.alpha = 1;
          this.decay = Math.random() * 0.015 + 0.012;
          this.gravity = 0.06;
          this.size = Math.random() * 2.5 + 1.2;
        }
        update() {
          this.vx *= 0.96;
          this.vy *= 0.96;
          this.vy += this.gravity;
          this.x += this.vx;
          this.y += this.vy;
          this.alpha -= this.decay;
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = Math.max(0, this.alpha);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      let lastLaunch = 0;
      const loop = (timestamp) => {
        ctx.fillStyle = "rgba(10, 8, 16, 0.22)";
        ctx.fillRect(0, 0, width, height);
        if (timestamp - lastLaunch > (width < 768 ? 450 : 320)) {
          const tx = width * (0.15 + Math.random() * 0.7);
          const ty = height * (0.15 + Math.random() * 0.45);
          fireworks.push(new Firework(tx, ty));
          lastLaunch = timestamp;
        }
        for (let i = fireworks.length - 1; i >= 0; i--) {
          const fw = fireworks[i];
          fw.update();
          fw.draw();
          if (!fw.alive) fireworks.splice(i, 1);
        }
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw();
          if (p.alpha <= 0) particles.splice(i, 1);
        }
        fireworksAnimRef.current = requestAnimationFrame(loop);
      };
      fireworksAnimRef.current = requestAnimationFrame(loop);
      return () => {
        window.removeEventListener("resize", handleResize);
        if (fireworksAnimRef.current) cancelAnimationFrame(fireworksAnimRef.current);
      };
    }, [stage]);
    const handleOpenInvitation = () => {
      if (stage !== "closed") return;
      setStage("opening");
      try {
        const audio = document.getElementById("bgm-player");
        if (audio && audio.paused) {
          audio.play().catch(() => {
          });
        }
      } catch (e) {
      }
      setTimeout(() => {
        setStage("fireworks");
      }, 800);
      setTimeout(() => {
        setStage("completed");
        if (onOpenComplete) onOpenComplete();
      }, 4200);
    };
    const handleSkipIntro = () => {
      try {
        const audio = document.getElementById("bgm-player");
        if (audio && audio.paused) {
          audio.play().catch(() => {
          });
        }
      } catch (e) {
      }
      setStage("completed");
      if (onOpenComplete) onOpenComplete();
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `cinematic-opening-container stage-${stage}` }, /* @__PURE__ */ import_react.default.createElement("canvas", { ref: dustCanvasRef, className: "dust-particles-canvas" }), (stage === "opening" || stage === "fireworks") && /* @__PURE__ */ import_react.default.createElement("canvas", { ref: canvasRef, className: "fireworks-canvas" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "royal-palace-backdrop", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 1200 300", className: "palace-silhouette-svg", preserveAspectRatio: "none" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M0,300 L0,220 Q50,220 70,180 Q90,130 110,180 Q130,220 180,220 L240,220 L240,160 Q260,130 280,160 L280,220 L350,220 Q400,100 450,220 L520,220 L520,140 Q550,90 580,140 L580,220 L620,220 L620,140 Q650,90 680,140 L680,220 L750,220 Q800,100 850,220 L920,220 L920,160 Q940,130 960,160 L960,220 L1020,220 Q1070,130 1090,180 Q1110,220 1200,220 L1200,300 Z",
        fill: "rgba(212, 175, 101, 0.12)"
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M0,300 L0,240 Q100,230 150,200 Q200,170 300,240 L400,240 Q450,160 500,240 L700,240 Q750,160 800,240 L900,240 Q1000,170 1050,200 Q1100,230 1200,240 L1200,300 Z",
        fill: "rgba(100, 27, 46, 0.25)"
      }
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "opening-corner-frame corner-tl", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 100 100", className: "corner-flourish-svg" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z", fill: "rgba(212, 175, 101, 0.15)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70", fill: "none", stroke: "#D4AF65", strokeWidth: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "25", cy: "25", r: "4", fill: "#D4AF65" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "opening-corner-frame corner-tr", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 100 100", className: "corner-flourish-svg", style: { transform: "scaleX(-1)" } }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z", fill: "rgba(212, 175, 101, 0.15)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70", fill: "none", stroke: "#D4AF65", strokeWidth: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "25", cy: "25", r: "4", fill: "#D4AF65" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "opening-corner-frame corner-bl", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 100 100", className: "corner-flourish-svg", style: { transform: "scaleY(-1)" } }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z", fill: "rgba(212, 175, 101, 0.15)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70", fill: "none", stroke: "#D4AF65", strokeWidth: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "25", cy: "25", r: "4", fill: "#D4AF65" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "opening-corner-frame corner-br", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 100 100", className: "corner-flourish-svg", style: { transform: "scale(-1)" } }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M 0,0 L 100,0 C 70,0 40,10 30,30 C 10,40 0,70 0,100 Z", fill: "rgba(212, 175, 101, 0.15)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M 10,10 L 70,10 C 50,10 30,20 20,30 C 20,50 10,70 10,70", fill: "none", stroke: "#D4AF65", strokeWidth: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "25", cy: "25", r: "4", fill: "#D4AF65" }))), /* @__PURE__ */ import_react.default.createElement("header", { className: "opening-top-bar" }, onToggleMusic && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "top-ctrl-btn music-btn",
        onClick: onToggleMusic,
        title: isMuted ? "Unmute Royal Instrumental" : "Mute Music"
      },
      /* @__PURE__ */ import_react.default.createElement("span", { className: "ctrl-icon" }, isMuted ? "\u{1F507}" : "\u{1F3B5}"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "ctrl-text" }, isMuted ? "Music Off" : "Royal Music")
    ), /* @__PURE__ */ import_react.default.createElement("button", { className: "top-ctrl-btn skip-btn", onClick: handleSkipIntro, title: "Skip directly to Wedding Invitation" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "ctrl-text" }, "Skip Intro"), /* @__PURE__ */ import_react.default.createElement("span", { className: "ctrl-icon" }, "\u2794"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-perspective-wrapper" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `royal-3d-envelope ${stage !== "closed" ? "is-opening" : ""}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-pocket-back" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-inner-card" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "card-ornamental-border" }, /* @__PURE__ */ import_react.default.createElement("img", { src: "assets/champagne_ganesha_bright.png", alt: "Ganesha", className: "card-ganesha-mini" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "card-sacred-text" }, "|| Shree Ganeshay Namah ||"), /* @__PURE__ */ import_react.default.createElement("div", { className: "card-title" }, "THE ROYAL WEDDING"), /* @__PURE__ */ import_react.default.createElement("div", { className: "card-couple" }, "Teena & Kuldeep"), /* @__PURE__ */ import_react.default.createElement("div", { className: "card-date" }, "11 DECEMBER 2026"), /* @__PURE__ */ import_react.default.createElement("div", { className: "card-venue" }, "JAIPUR, RAJASTHAN"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-flap-left" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-flap-right" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-pocket-front" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-flap-top" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "top-flap-crest" }, /* @__PURE__ */ import_react.default.createElement("img", { src: "assets/champagne_ganesha_bright.png", alt: "Embossed Ganesha", className: "flap-ganesha-img" }))), /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: `royal-wax-seal ${stage !== "closed" ? "seal-break" : ""}`,
        onClick: handleOpenInvitation,
        role: "button",
        tabIndex: 0,
        title: "Click to break wax seal and open invitation"
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "wax-outer-ring" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "wax-inner-core" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "wax-monogram" }, "T & K"))),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "seal-spark-halo" })
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "envelope-front-copy" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "env-invitation-label" }, "YOU ARE CORDIALLY INVITED"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "env-couple-title" }, "TEENA & KULDEEP"), /* @__PURE__ */ import_react.default.createElement("div", { className: "env-sub-title" }, "THE ROYAL WEDDING CELEBRATION"), /* @__PURE__ */ import_react.default.createElement("div", { className: "env-date-strip" }, "FRIDAY, 11 DECEMBER 2026"), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "btn-royal-open-invitation",
        onClick: handleOpenInvitation,
        "aria-label": "Open your royal wedding invitation"
      },
      /* @__PURE__ */ import_react.default.createElement("span", { className: "btn-shimmer" }),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "btn-royal-icon" }, "\u2709"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "btn-royal-text" }, "OPEN YOUR INVITATION"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "btn-royal-sparkle" }, "\u2726")
    )))), /* @__PURE__ */ import_react.default.createElement("div", { className: "opening-bottom-hint" }, /* @__PURE__ */ import_react.default.createElement("span", null, "Tap to unveil the sacred celebration \u2022 11.12.2026")));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/WeddingHero.jsx
  var import_react2 = __toESM(__require("react"));
  function WeddingHero({ onOpenCardViewer, onDownloadPDF }) {
    const scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    return /* @__PURE__ */ import_react2.default.createElement("section", { className: "wedding-hero-section", id: "hero-section" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-palace-backdrop", "aria-hidden": "true" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-radial-vignette" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-palace-silhouette" })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-royal-arch-frame", "aria-hidden": "true" }, /* @__PURE__ */ import_react2.default.createElement("svg", { viewBox: "0 0 400 120", className: "hero-arch-svg", preserveAspectRatio: "none" }, /* @__PURE__ */ import_react2.default.createElement(
      "path",
      {
        d: "M 0,0 L 400,0 L 400,30 Q 300,30 250,70 Q 200,110 150,70 Q 100,30 0,30 Z",
        fill: "rgba(100, 27, 46, 0.45)"
      }
    ), /* @__PURE__ */ import_react2.default.createElement(
      "path",
      {
        d: "M 0,0 L 400,0 L 400,20 Q 300,20 250,55 Q 200,95 150,55 Q 100,20 0,20 Z",
        fill: "none",
        stroke: "#D4AF65",
        strokeWidth: "1.5"
      }
    ))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-content-wrapper" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-invocation-group" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-ganesha-emblem" }, /* @__PURE__ */ import_react2.default.createElement(
      "img",
      {
        src: "assets/champagne_ganesha_bright.png",
        alt: "Lord Ganesha",
        className: "hero-ganesha-img"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-shloka-text" }, "|| SHREE GANESHAY NAMAH ||"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-shubh-vivah" }, "Auspicious Wedding Celebration")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-royal-badge" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "badge-flourish" }, "\u2726"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "badge-text" }, "THE ROYAL WEDDING CELEBRATION"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "badge-flourish" }, "\u2726")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-names-display" }, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "hero-name-primary" }, "TEENA"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-ampersand-wrapper" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "ampersand-line" }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "ampersand-symbol" }, "&"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "ampersand-line" })), /* @__PURE__ */ import_react2.default.createElement("h1", { className: "hero-name-primary" }, "KULDEEP")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-date-badge" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "date-icon" }, "\u2726"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "date-main" }, "FRIDAY | 11 DECEMBER 2026"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "date-icon" }, "\u2726")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "hero-journey-quote" }, "\u201CTwo Hearts, One Beautiful Journey\u201D"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hero-cta-button-group" }, /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        className: "hero-btn btn-view-card",
        onClick: onOpenCardViewer,
        "aria-label": "View interactive wedding invitation card"
      },
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-icon" }, "\u{1F4DC}"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-text" }, "VIEW WEDDING CARD")
    ), /* @__PURE__ */ import_react2.default.createElement(
      "a",
      {
        href: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
        download: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
        className: "hero-btn btn-download-pdf",
        onClick: onDownloadPDF,
        "aria-label": "Download official royal wedding invitation PDF"
      },
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-icon" }, "\u{1F4E5}"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-text" }, "DOWNLOAD PDF")
    ), /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        className: "hero-btn btn-secondary-itinerary",
        onClick: () => scrollToSection("events-section"),
        "aria-label": "Jump to event schedule"
      },
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-icon" }, "\u{1F5D3}\uFE0F"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-text" }, "ITINERARY")
    ), /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        className: "hero-btn btn-secondary-venue",
        onClick: () => scrollToSection("venue-section"),
        "aria-label": "Jump to venue directions"
      },
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-icon" }, "\u{1F4CD}"),
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "btn-text" }, "VENUE")
    )), /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        className: "hero-scroll-indicator",
        onClick: () => scrollToSection("bride-section"),
        role: "button",
        tabIndex: 0,
        "aria-label": "Scroll down to bride's family details"
      },
      /* @__PURE__ */ import_react2.default.createElement("span", { className: "scroll-label" }, "Scroll to Explore"),
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "scroll-chevron-bounce" }, /* @__PURE__ */ import_react2.default.createElement("svg", { viewBox: "0 0 24 24", className: "chevron-svg" }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M7 10l5 5 5-5", fill: "none", stroke: "#D4AF65", strokeWidth: "2", strokeLinecap: "round" })))
    )));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/BrideFamilySection.jsx
  var import_react3 = __toESM(__require("react"));
  function BrideFamilySection() {
    return /* @__PURE__ */ import_react3.default.createElement("section", { className: "wedding-section bride-family-section", id: "bride-section" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "section-royal-card" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "card-border-gold-outer" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "card-border-gold-inner" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "section-header-flourish" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "shloka-text" }, "|| \u0935\u0927\u0941 \u092A\u0915\u094D\u0937 \u2022 \u091C\u092F\u092A\u0941\u0930 ||"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "family-origin-pill" }, "THE RESIGNED VAJPAYEE FAMILY OF JAIPUR"), /* @__PURE__ */ import_react3.default.createElement("h2", { className: "section-title-gold" }, "THE BRIDE'S FAMILY"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "section-subtitle-script" }, "Welcoming you with heartfelt warmth & traditional Rajasthani hospitality"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "section-title-divider" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "divider-line" }), /* @__PURE__ */ import_react3.default.createElement("span", { className: "divider-star" }, "\u2726"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "divider-line" }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "family-showcase-container" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "couple-profile-card bride-card prominent-family-card" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "profile-frame-jharokha" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "avatar-art-container" }, /* @__PURE__ */ import_react3.default.createElement("svg", { viewBox: "0 0 140 140", className: "avatar-silhouette-svg" }, /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "70", cy: "70", r: "65", fill: "#641B2E", stroke: "#D4AF65", strokeWidth: "2" }), /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "70", cy: "70", r: "60", fill: "none", stroke: "rgba(212, 175, 101, 0.4)", strokeWidth: "1", strokeDasharray: "3 3" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: "M70 30 C58 30 50 38 50 50 C50 62 58 68 70 68 C82 68 90 62 90 50 C90 38 82 30 70 30 Z", fill: "#E8D5A3" }), /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "70", cy: "38", r: "3", fill: "#D4AF65" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: "M70 30 L70 38", stroke: "#D4AF65", strokeWidth: "1.5" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: "M44 48 C40 65 32 90 28 115 C52 118 88 118 112 115 C108 90 100 65 96 48 C92 42 85 36 70 36 C55 36 48 42 44 48 Z", fill: "#3B101C", stroke: "#D4AF65", strokeWidth: "1.2", opacity: "0.9" }), /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "63", cy: "54", r: "3", fill: "none", stroke: "#D4AF65", strokeWidth: "1" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: "M63 54 Q56 50 52 46", fill: "none", stroke: "#D4AF65", strokeWidth: "0.8" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: "M48 85 L70 95 L92 85 L96 115 L44 115 Z", fill: "#8C1D40" }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "profile-role-badge" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "role-tag" }, "THE BRIDE"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "profile-details-content" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "profile-name" }, "TEENA"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "relationship-heading" }, "DAUGHTER OF"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "profile-lineage-block" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "parent-name" }, "Mrs. Manju Devi"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "parent-connector" }, "and"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "parent-name prominent-father" }, "Mr. Ramgopal Vajpayee")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "profile-location-tag" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "loc-icon" }, "\u{1F4CD}"), /* @__PURE__ */ import_react3.default.createElement("span", null, "Jaipur, Rajasthan, India")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "family-welcome-note" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "note-text" }, "\u201CThe Vajpayee family of Jaipur cordially invites you to grace the auspicious wedding celebration of our beloved daughter Teena with Kuldeep.\u201D")))))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/GroomFamilySection.jsx
  var import_react4 = __toESM(__require("react"));
  function GroomFamilySection() {
    return /* @__PURE__ */ import_react4.default.createElement("section", { className: "wedding-section groom-family-section", id: "groom-section" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "section-royal-card" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "card-border-gold-outer" }), /* @__PURE__ */ import_react4.default.createElement("div", { className: "card-border-gold-inner" }), /* @__PURE__ */ import_react4.default.createElement("div", { className: "section-header-flourish" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "shloka-text" }, "|| \u0935\u0930 \u092A\u0915\u094D\u0937 \u2022 \u092A\u093E\u0932\u0940 ||"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "family-origin-pill" }, "THE ESTEEMED UPADHYAY FAMILY OF PALI"), /* @__PURE__ */ import_react4.default.createElement("h2", { className: "section-title-gold" }, "THE GROOM'S FAMILY"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "section-subtitle-script" }, "With the divine blessings of beloved ancestral elders"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "section-title-divider" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "divider-line" }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "divider-star" }, "\u2726"), /* @__PURE__ */ import_react4.default.createElement("span", { className: "divider-line" }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "family-showcase-container" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "couple-profile-card groom-card prominent-family-card" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "profile-frame-jharokha" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "avatar-art-container" }, /* @__PURE__ */ import_react4.default.createElement("svg", { viewBox: "0 0 140 140", className: "avatar-silhouette-svg" }, /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "70", cy: "70", r: "65", fill: "#3B101C", stroke: "#D4AF65", strokeWidth: "2" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "70", cy: "70", r: "60", fill: "none", stroke: "rgba(212, 175, 101, 0.4)", strokeWidth: "1", strokeDasharray: "3 3" }), /* @__PURE__ */ import_react4.default.createElement("path", { d: "M70 38 C60 38 52 46 52 56 C52 66 60 72 70 72 C80 72 88 66 88 56 C88 46 80 38 70 38 Z", fill: "#E8D5A3" }), /* @__PURE__ */ import_react4.default.createElement("path", { d: "M46 44 C46 30 60 22 70 22 C80 22 94 30 94 44 C92 48 85 52 70 52 C55 52 48 48 46 44 Z", fill: "#D4AF65", stroke: "#8C6A28", strokeWidth: "1" }), /* @__PURE__ */ import_react4.default.createElement("path", { d: "M70 12 Q75 18 70 24 Q65 18 70 12 Z", fill: "#FFF9ED", stroke: "#D4AF65", strokeWidth: "1" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "70", cy: "24", r: "3", fill: "#8C1D40" }), /* @__PURE__ */ import_react4.default.createElement("path", { d: "M42 80 L70 90 L98 80 L102 118 L38 118 Z", fill: "#641B2E", stroke: "#D4AF65", strokeWidth: "1.2" }), /* @__PURE__ */ import_react4.default.createElement("line", { x1: "70", y1: "90", x2: "70", y2: "118", stroke: "#D4AF65", strokeWidth: "1.5" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "70", cy: "95", r: "1.5", fill: "#FFF9ED" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "70", cy: "103", r: "1.5", fill: "#FFF9ED" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "70", cy: "111", r: "1.5", fill: "#FFF9ED" }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "profile-role-badge" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "role-tag" }, "THE GROOM"))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "profile-details-content" }, /* @__PURE__ */ import_react4.default.createElement("h3", { className: "profile-name" }, "KULDEEP"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "relationship-heading" }, "SON OF"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "profile-lineage-block" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "parent-name" }, "Late Mrs. Pepi Devi"), /* @__PURE__ */ import_react4.default.createElement("span", { className: "parent-connector" }, "and"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "parent-name prominent-father" }, "Late Mr. Champalal Ji Upadhyay"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "grandparents-sublineage" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "grandparent-label" }, "GRANDSON OF"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "grandparent-names" }, "Mrs. Chanda Devi & Mr. Jasraj Ji Upadhyay"))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "profile-location-tag" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "loc-icon" }, "\u{1F4CD}"), /* @__PURE__ */ import_react4.default.createElement("span", null, "Pali, Rajasthan, India")))))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/WeddingTimeline.jsx
  var import_react5 = __toESM(__require("react"));
  function WeddingTimeline() {
    const [activeDay, setActiveDay] = (0, import_react5.useState)("all");
    const day1Events = [
      {
        num: "01",
        title: "Ganesh Invocation Ceremony",
        time: "5:15 AM",
        icon: "\u{1F549}\uFE0F",
        desc: "Commencing the holy wedding celebrations with divine prayers and invocations to Lord Ganesha for unobstructed auspiciousness and prosperity."
      },
      {
        num: "02",
        title: "Lagan Vinayak Puja",
        time: "10:00 AM",
        icon: "\u{1FA94}",
        desc: "Sacred Vedic rituals worshipping Lord Vinayaka, sanctifying the wedding alliance with Vedic chants and parental blessings."
      },
      {
        num: "03",
        title: "Chak Pujan Ceremony",
        time: "4:00 PM",
        icon: "\u{1F3FA}",
        desc: "Traditional ancestral pot-making and fertility worship ceremony, honoring age-old Rajasthani heritage and cultural roots."
      }
    ];
    const day2Events = [
      {
        num: "01",
        title: "Wedding Reception Dinner (Preeti Bhoj)",
        time: "6:00 PM onwards until the arrival of guests",
        icon: "\u{1F37D}\uFE0F",
        desc: "A grand royal feast hosted to welcome esteemed family, relatives, and cherished guests to celebrate the joyous union."
      },
      {
        num: "02",
        title: "Wedding Procession Welcome (Baraat Swagat)",
        time: "10:30 PM",
        icon: "\u{1F3BA}",
        desc: "Festive arrival of the groom with ceremonial music and procession, followed by the grand traditional welcome by the bride\u2019s family."
      },
      {
        num: "03",
        title: "Sacred Wedding Rituals (Panigrahan Sanskar)",
        time: "As per the auspicious wedding muhurat",
        icon: "\u{1F525}",
        desc: "The sacred Vedic rites, Kanyadaan, and the seven holy circumambulations (Saptapadi) around the sacred fire uniting two souls for eternity."
      }
    ];
    const handleAddToCalendar = (day) => {
      let title = "";
      let details = "";
      let location = "Shri Adigaud Brahmin Samaj Dharamshala, Tejaji Nagar, 80 Feet Road, Mahesh Nagar, Jaipur, Rajasthan, India";
      let dates = "";
      if (day === 1) {
        title = "Pre-Wedding Ceremonies - Teena & Kuldeep";
        details = "Ganesh Invocation Ceremony (5:15 AM), Lagan Vinayak Puja (10:00 AM), Chak Pujan (4:00 PM)";
        dates = "20261207T051500/20261207T180000";
      } else {
        title = "The Royal Wedding - Teena & Kuldeep";
        details = "Wedding Reception Dinner / Preeti Bhoj (6:00 PM), Baraat Swagat (10:30 PM), Panigrahan Sanskar";
        dates = "20261211T180000/20261212T030000";
      }
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
      window.open(url, "_blank");
    };
    return /* @__PURE__ */ import_react5.default.createElement("section", { className: "wedding-section timeline-events-section", id: "events-section" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "section-royal-card" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-border-gold-outer" }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-border-gold-inner" }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "section-header-flourish" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "shloka-text" }, "|| \u0936\u0941\u092D \u0932\u0917\u094D\u0928 \u0935 \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E ||"), /* @__PURE__ */ import_react5.default.createElement("h2", { className: "section-title-gold" }, "WEDDING EVENTS & ITINERARY"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "section-subtitle-script" }, "Two days of sacred ceremonies, joyful celebrations, and timeless traditions"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "section-title-divider" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "divider-line" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "divider-star" }, "\u2726"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "divider-line" }))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "timeline-day-filter" }, /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: `filter-pill ${activeDay === "all" ? "active" : ""}`,
        onClick: () => setActiveDay("all")
      },
      "All Ceremonies"
    ), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: `filter-pill ${activeDay === "day1" ? "active" : ""}`,
        onClick: () => setActiveDay("day1")
      },
      "Day 1: Mon, 07 Dec"
    ), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: `filter-pill ${activeDay === "day2" ? "active" : ""}`,
        onClick: () => setActiveDay("day2")
      },
      "Day 2: Fri, 11 Dec (Wedding)"
    )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "itinerary-cards-container" }, (activeDay === "all" || activeDay === "day1") && /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-itinerary-card card-day1" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-card-header" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-badge-chip" }, "PRE-WEDDING CEREMONIES"), /* @__PURE__ */ import_react5.default.createElement("h3", { className: "day-main-heading" }, "DAY 1 \u2014 MONDAY"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-calendar-date" }, "07 DECEMBER 2026"), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: "btn-add-cal",
        onClick: () => handleAddToCalendar(1),
        title: "Add Day 1 ceremonies to Google Calendar"
      },
      /* @__PURE__ */ import_react5.default.createElement("span", { className: "cal-icon" }, "\u{1F4C5}"),
      /* @__PURE__ */ import_react5.default.createElement("span", null, "Add to Calendar")
    )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-events-vertical-list" }, day1Events.map((evt, idx) => /* @__PURE__ */ import_react5.default.createElement("div", { className: "timeline-event-item", key: idx }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-marker-node" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "marker-icon" }, evt.icon), idx < day1Events.length - 1 && /* @__PURE__ */ import_react5.default.createElement("span", { className: "vertical-timeline-spine" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-content-box" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-top-row" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "event-index-badge" }, evt.num), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "event-title" }, evt.title)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-time-badge" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "time-clock-icon" }, "\u23F0"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "time-val" }, evt.time)), /* @__PURE__ */ import_react5.default.createElement("p", { className: "event-description" }, evt.desc)))))), (activeDay === "all" || activeDay === "day2") && /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-itinerary-card card-day2 featured-wedding-day" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-card-header" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-badge-chip chip-gold" }, "MAIN AUSPICIOUS WEDDING"), /* @__PURE__ */ import_react5.default.createElement("h3", { className: "day-main-heading" }, "DAY 2 \u2014 FRIDAY"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-calendar-date" }, "11 DECEMBER 2026"), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: "btn-add-cal",
        onClick: () => handleAddToCalendar(2),
        title: "Add Wedding Day to Google Calendar"
      },
      /* @__PURE__ */ import_react5.default.createElement("span", { className: "cal-icon" }, "\u{1F4C5}"),
      /* @__PURE__ */ import_react5.default.createElement("span", null, "Add to Calendar")
    )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "day-events-vertical-list" }, day2Events.map((evt, idx) => /* @__PURE__ */ import_react5.default.createElement("div", { className: "timeline-event-item", key: idx }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-marker-node" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "marker-icon" }, evt.icon), idx < day2Events.length - 1 && /* @__PURE__ */ import_react5.default.createElement("span", { className: "vertical-timeline-spine" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-content-box" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-top-row" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "event-index-badge" }, evt.num), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "event-title" }, evt.title)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "event-time-badge highlight-wedding-time" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "time-clock-icon" }, "\u23F0"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "time-val" }, evt.time)), /* @__PURE__ */ import_react5.default.createElement("p", { className: "event-description" }, evt.desc)))))))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/VenueSection.jsx
  var import_react6 = __toESM(__require("react"));
  function VenueSection() {
    const [copied, setCopied] = (0, import_react6.useState)(false);
    const venueName = "SHRI ADIGAUD BRAHMIN SAMAJ DHARAMSHALA";
    const venueAddress = "Tejaji Nagar, 80 Feet Road, Mahesh Nagar, Jaipur, Rajasthan, India.";
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Shri+Adigaud+Brahmin+Samaj+Dharamshala+Tejaji+Nagar+80+Feet+Road+Mahesh+Nagar+Jaipur+Rajasthan";
    const handleCopyAddress = () => {
      navigator.clipboard.writeText(`${venueName}, ${venueAddress}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2800);
      }).catch(() => {
      });
    };
    return /* @__PURE__ */ import_react6.default.createElement("section", { className: "wedding-section venue-section", id: "venue-section" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "section-royal-card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-border-gold-outer" }), /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-border-gold-inner" }), /* @__PURE__ */ import_react6.default.createElement("div", { className: "section-header-flourish" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "shloka-text" }, "|| \u0935\u093F\u0935\u093E\u0939 \u0938\u094D\u0925\u0932 ||"), /* @__PURE__ */ import_react6.default.createElement("h2", { className: "section-title-gold" }, "WEDDING VENUE"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "section-subtitle-script" }, "The royal auspicious destination where family & friends unite"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "section-title-divider" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "divider-line" }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "divider-star" }, "\u2726"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "divider-line" }))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "venue-grand-card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "venue-arch-illustration" }, /* @__PURE__ */ import_react6.default.createElement("svg", { viewBox: "0 0 500 160", className: "palace-arch-svg", preserveAspectRatio: "xMidYMid meet" }, /* @__PURE__ */ import_react6.default.createElement("defs", null, /* @__PURE__ */ import_react6.default.createElement("linearGradient", { id: "goldArchGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%" }, /* @__PURE__ */ import_react6.default.createElement("stop", { offset: "0%", stopColor: "#E8D5A3" }), /* @__PURE__ */ import_react6.default.createElement("stop", { offset: "50%", stopColor: "#D4AF65" }), /* @__PURE__ */ import_react6.default.createElement("stop", { offset: "100%", stopColor: "#8C6A28" }))), /* @__PURE__ */ import_react6.default.createElement("rect", { x: "50", y: "40", width: "400", height: "110", rx: "8", fill: "rgba(100, 27, 46, 0.3)" }), /* @__PURE__ */ import_react6.default.createElement(
      "path",
      {
        d: "M 250,15 C 240,35 210,40 190,60 C 180,70 180,85 180,120 L 320,120 C 320,85 320,70 310,60 C 290,40 260,35 250,15 Z",
        fill: "rgba(212, 175, 101, 0.22)",
        stroke: "url(#goldArchGrad)",
        strokeWidth: "2"
      }
    ), /* @__PURE__ */ import_react6.default.createElement("path", { d: "M 250,5 L 250,15", stroke: "url(#goldArchGrad)", strokeWidth: "3" }), /* @__PURE__ */ import_react6.default.createElement("circle", { cx: "250", cy: "5", r: "4", fill: "#D4AF65" }), /* @__PURE__ */ import_react6.default.createElement(
      "path",
      {
        d: "M 120,40 C 115,55 95,60 85,75 C 80,82 80,95 80,120 L 160,120 C 160,95 160,82 155,75 C 145,60 125,55 120,40 Z",
        fill: "rgba(212, 175, 101, 0.15)",
        stroke: "url(#goldArchGrad)",
        strokeWidth: "1.5"
      }
    ), /* @__PURE__ */ import_react6.default.createElement(
      "path",
      {
        d: "M 380,40 C 375,55 355,60 345,75 C 340,82 340,95 340,120 L 420,120 C 420,95 420,82 415,75 C 405,60 385,55 380,40 Z",
        fill: "rgba(212, 175, 101, 0.15)",
        stroke: "url(#goldArchGrad)",
        strokeWidth: "1.5"
      }
    ), /* @__PURE__ */ import_react6.default.createElement("line", { x1: "60", y1: "120", x2: "440", y2: "120", stroke: "url(#goldArchGrad)", strokeWidth: "2.5" }), /* @__PURE__ */ import_react6.default.createElement("line", { x1: "50", y1: "140", x2: "450", y2: "140", stroke: "url(#goldArchGrad)", strokeWidth: "3" }), /* @__PURE__ */ import_react6.default.createElement("line", { x1: "120", y1: "120", x2: "120", y2: "135", stroke: "#D4AF65", strokeWidth: "1" }), /* @__PURE__ */ import_react6.default.createElement("circle", { cx: "120", cy: "136", r: "3", fill: "#D4AF65" }), /* @__PURE__ */ import_react6.default.createElement("line", { x1: "380", y1: "120", x2: "380", y2: "135", stroke: "#D4AF65", strokeWidth: "1" }), /* @__PURE__ */ import_react6.default.createElement("circle", { cx: "380", cy: "136", r: "3", fill: "#D4AF65" }))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "venue-info-body" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "venue-location-pin" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "pin-pulse" }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "pin-icon" }, "\u{1F4CD}")), /* @__PURE__ */ import_react6.default.createElement("h3", { className: "venue-name-title" }, venueName), /* @__PURE__ */ import_react6.default.createElement("div", { className: "venue-address-badge" }, /* @__PURE__ */ import_react6.default.createElement("p", { className: "address-line" }, venueAddress)), /* @__PURE__ */ import_react6.default.createElement("p", { className: "venue-welcome-note" }, "Conveniently situated in Tejaji Nagar on 80 Feet Road in Jaipur, with comfortable banquet facilities, guest accommodations, and ample vehicle parking."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "venue-buttons-row" }, /* @__PURE__ */ import_react6.default.createElement(
      "a",
      {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "venue-btn btn-google-maps",
        "aria-label": "Open verified venue in Google Maps"
      },
      /* @__PURE__ */ import_react6.default.createElement("span", { className: "btn-icon" }, "\u{1F5FA}\uFE0F"),
      /* @__PURE__ */ import_react6.default.createElement("span", { className: "btn-text" }, "OPEN IN GOOGLE MAPS"),
      /* @__PURE__ */ import_react6.default.createElement("span", { className: "btn-arrow" }, "\u2197")
    ), /* @__PURE__ */ import_react6.default.createElement(
      "button",
      {
        className: `venue-btn btn-copy-address ${copied ? "copied" : ""}`,
        onClick: handleCopyAddress,
        "aria-label": "Copy venue address to clipboard"
      },
      /* @__PURE__ */ import_react6.default.createElement("span", { className: "btn-icon" }, copied ? "\u2713" : "\u{1F4CB}"),
      /* @__PURE__ */ import_react6.default.createElement("span", { className: "btn-text" }, copied ? "COPIED TO CLIPBOARD!" : "COPY ADDRESS FOR CAB")
    ))))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/CountdownSection.jsx
  var import_react7 = __toESM(__require("react"));
  function CountdownSection() {
    const targetDate = (/* @__PURE__ */ new Date("2026-12-11T18:00:00+05:30")).getTime();
    const [timeLeft, setTimeLeft] = (0, import_react7.useState)({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: false
    });
    (0, import_react7.useEffect)(() => {
      const calculateTime = () => {
        const now = (/* @__PURE__ */ new Date()).getTime();
        const difference = targetDate - now;
        if (difference <= 0) {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isCompleted: true
          });
          return;
        }
        const days = Math.floor(difference / (1e3 * 60 * 60 * 24));
        const hours = Math.floor(difference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        const minutes = Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60));
        const seconds = Math.floor(difference % (1e3 * 60) / 1e3);
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isCompleted: false
        });
      };
      calculateTime();
      const interval = setInterval(calculateTime, 1e3);
      return () => clearInterval(interval);
    }, [targetDate]);
    return /* @__PURE__ */ import_react7.default.createElement("section", { className: "wedding-section countdown-timer-section", id: "countdown-section" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "section-royal-card" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "card-border-gold-outer" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "card-border-gold-inner" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "section-header-flourish" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "shloka-text" }, "|| \u092E\u0902\u0917\u0932 \u0918\u095C\u0940 \u0915\u0940 \u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E ||"), /* @__PURE__ */ import_react7.default.createElement("h2", { className: "section-title-gold" }, "WEDDING COUNTDOWN"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "section-subtitle-script" }, "Counting every sacred moment until two souls unite"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "section-title-divider" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "divider-line" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "divider-star" }, "\u2726"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "divider-line" }))), timeLeft.isCompleted ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-completed-banner" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "completed-sparkles" }, "\u{1F389} \u{1F38A} \u2728"), /* @__PURE__ */ import_react7.default.createElement("h3", { className: "completed-title" }, "The Auspicious Wedding Day Is Here!"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "completed-subtitle" }, "Celebrating the eternal union of Teena & Kuldeep with blessings and love.")) : /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-grid-container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-unit-box" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-circle-badge" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-number" }, String(timeLeft.days).padStart(2, "0"))), /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-label" }, "DAYS")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-colon" }, ":"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-unit-box" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-circle-badge" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-number" }, String(timeLeft.hours).padStart(2, "0"))), /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-label" }, "HOURS")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-colon" }, ":"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-unit-box" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-circle-badge" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-number" }, String(timeLeft.minutes).padStart(2, "0"))), /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-label" }, "MINUTES")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-colon" }, ":"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-unit-box" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-circle-badge seconds-pulse" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-number" }, String(timeLeft.seconds).padStart(2, "0"))), /* @__PURE__ */ import_react7.default.createElement("span", { className: "unit-label" }, "SECONDS"))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "countdown-muhurat-strip" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "muhurat-star" }, "\u2726"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "muhurat-text" }, "Auspicious Wedding Muhurat \u2022 Friday, 11 December 2026 \u2022 Jaipur, Rajasthan"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "muhurat-star" }, "\u2726"))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/FamilyBlessingsSection.jsx
  var import_react8 = __toESM(__require("react"));
  function FamilyBlessingsSection() {
    const [guestName, setGuestName] = (0, import_react8.useState)("");
    const [guestCity, setGuestCity] = (0, import_react8.useState)("");
    const [blessingMsg, setBlessingMsg] = (0, import_react8.useState)("Heartiest congratulations to Teena & Kuldeep on your royal wedding! May God bless you both with lifelong love, happiness, and prosperity.");
    const [sentSuccess, setSentSuccess] = (0, import_react8.useState)(false);
    const phone1 = "+919782715591";
    const phone2 = "+919024538960";
    const handleSendWhatsApp = (phoneTarget) => {
      const formattedText = `Namaste! \u{1F64F}

*Wedding Blessings for Teena & Kuldeep*
From: ${guestName || "Well-Wisher"}${guestCity ? ` (${guestCity})` : ""}

"${blessingMsg}"

Looking forward to celebrating this royal wedding on 11 Dec 2026!`;
      const cleanPhone = phoneTarget.replace(/[^0-9]/g, "");
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedText)}`;
      window.open(url, "_blank");
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 4e3);
    };
    return /* @__PURE__ */ import_react8.default.createElement("section", { className: "wedding-section family-compliments-section", id: "family-section" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "section-royal-card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "card-border-gold-outer" }), /* @__PURE__ */ import_react8.default.createElement("div", { className: "card-border-gold-inner" }), /* @__PURE__ */ import_react8.default.createElement("div", { className: "section-header-flourish" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "shloka-text" }, "|| \u0938\u0938\u094D\u0928\u0947\u0939 \u0928\u093F\u092E\u0902\u0924\u094D\u0930\u0923 ||"), /* @__PURE__ */ import_react8.default.createElement("h2", { className: "section-title-gold" }, "WITH BEST COMPLIMENTS FROM"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "section-subtitle-script" }, "Warmest hospitality from the family elders and hosts"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "section-title-divider" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "divider-line" }), /* @__PURE__ */ import_react8.default.createElement("span", { className: "divider-star" }, "\u2726"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "divider-line" }))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "family-invitation-quote-box" }, /* @__PURE__ */ import_react8.default.createElement("p", { className: "quote-text" }, "\u201CWith the blessings of the Almighty and our beloved elders, we cordially invite you and your family to grace the auspicious occasion of the wedding celebration of ", /* @__PURE__ */ import_react8.default.createElement("strong", null, "Teena & Kuldeep"), "."), /* @__PURE__ */ import_react8.default.createElement("p", { className: "quote-text" }, "Your gracious presence and blessings will make this special occasion even more memorable. We look forward to celebrating this beautiful union with you.\u201D")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "compliments-hosts-grid" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "host-contact-card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "host-ornament-header" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "host-namaste-icon" }, "\u{1F64F}"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "host-honorific" }, "FAMILY ELDER & HOST")), /* @__PURE__ */ import_react8.default.createElement("h3", { className: "host-name" }, "Pandit Ramgopal Vajpayee"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "host-relation" }, "Father of the Bride"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "host-contact-action-row" }, /* @__PURE__ */ import_react8.default.createElement("a", { href: `tel:${phone1}`, className: "contact-action-btn btn-call", title: "Call Pandit Ramgopal Vajpayee" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-icon" }, "\u{1F4DE}"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-text" }, "+91 9782715591")), /* @__PURE__ */ import_react8.default.createElement(
      "a",
      {
        href: `https://wa.me/919782715591`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "contact-action-btn btn-whatsapp",
        title: "Message on WhatsApp"
      },
      /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-icon" }, "\u{1F4AC}"),
      /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-text" }, "WhatsApp")
    ))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "host-contact-card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "host-ornament-header" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "host-namaste-icon" }, "\u{1F64F}"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "host-honorific" }, "FAMILY HOST & BROTHER")), /* @__PURE__ */ import_react8.default.createElement("h3", { className: "host-name" }, "Pandit Lokesh Vajpayee"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "host-relation" }, "Bride\u2019s Family Host"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "host-contact-action-row" }, /* @__PURE__ */ import_react8.default.createElement("a", { href: `tel:${phone2}`, className: "contact-action-btn btn-call", title: "Call Pandit Lokesh Vajpayee" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-icon" }, "\u{1F4DE}"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-text" }, "+91 9024538960")), /* @__PURE__ */ import_react8.default.createElement(
      "a",
      {
        href: `https://wa.me/919024538960`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "contact-action-btn btn-whatsapp",
        title: "Message on WhatsApp"
      },
      /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-icon" }, "\u{1F4AC}"),
      /* @__PURE__ */ import_react8.default.createElement("span", { className: "action-text" }, "WhatsApp")
    )))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "direct-blessings-card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "blessings-card-header" }, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "blessings-title" }, "\u{1F48C} Send Your RSVP & Blessings to the Family"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "blessings-subtitle" }, "Send your personal congratulations and arrival confirmation directly to the hosts on WhatsApp.")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "blessings-inputs-form" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "form-row-dual" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "form-input-group" }, /* @__PURE__ */ import_react8.default.createElement("label", { className: "input-label" }, "Your Name / Family Name"), /* @__PURE__ */ import_react8.default.createElement(
      "input",
      {
        type: "text",
        className: "royal-text-input",
        placeholder: "e.g. Sharma Family / Rajesh Sharma",
        value: guestName,
        onChange: (e) => setGuestName(e.target.value)
      }
    )), /* @__PURE__ */ import_react8.default.createElement("div", { className: "form-input-group" }, /* @__PURE__ */ import_react8.default.createElement("label", { className: "input-label" }, "Your City"), /* @__PURE__ */ import_react8.default.createElement(
      "input",
      {
        type: "text",
        className: "royal-text-input",
        placeholder: "e.g. Jaipur, Delhi, Mumbai",
        value: guestCity,
        onChange: (e) => setGuestCity(e.target.value)
      }
    ))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "form-input-group" }, /* @__PURE__ */ import_react8.default.createElement("label", { className: "input-label" }, "Your Heartfelt Blessings"), /* @__PURE__ */ import_react8.default.createElement(
      "textarea",
      {
        className: "royal-text-area",
        rows: "2",
        value: blessingMsg,
        onChange: (e) => setBlessingMsg(e.target.value)
      }
    )), /* @__PURE__ */ import_react8.default.createElement("div", { className: "form-submit-row" }, /* @__PURE__ */ import_react8.default.createElement(
      "button",
      {
        className: "btn-send-blessing btn-to-ramgopal",
        onClick: () => handleSendWhatsApp(phone1)
      },
      /* @__PURE__ */ import_react8.default.createElement("span", null, "\u{1F4AC} Send to Pt. Ramgopal (+91 9782715591)")
    ), /* @__PURE__ */ import_react8.default.createElement(
      "button",
      {
        className: "btn-send-blessing btn-to-lokesh",
        onClick: () => handleSendWhatsApp(phone2)
      },
      /* @__PURE__ */ import_react8.default.createElement("span", null, "\u{1F4AC} Send to Pt. Lokesh (+91 9024538960)")
    )), sentSuccess && /* @__PURE__ */ import_react8.default.createElement("div", { className: "blessing-sent-notification" }, "\u2713 Opening WhatsApp to deliver your royal blessings!")))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/FinalBlessingsFooter.jsx
  var import_react9 = __toESM(__require("react"));
  function FinalBlessingsFooter({ onOpenCardViewer, onDownloadPDF }) {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return /* @__PURE__ */ import_react9.default.createElement("footer", { className: "wedding-final-blessings-footer", id: "footer-section" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-golden-flowers-band", "aria-hidden": "true" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "floating-flower fl-1" }, "\u{1F338}"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "floating-flower fl-2" }, "\u2728"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "floating-flower fl-3" }, "\u{1F33A}"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "floating-flower fl-4" }, "\u2728"), /* @__PURE__ */ import_react9.default.createElement("span", { className: "floating-flower fl-5" }, "\u{1F338}")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-content-container" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-ganesha-wrapper" }, /* @__PURE__ */ import_react9.default.createElement(
      "img",
      {
        src: "assets/champagne_ganesha_bright.png",
        alt: "Lord Ganesha",
        className: "footer-ganesha-img"
      }
    )), /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-sacred-blessing" }, "|| \u0950 \u0936\u094D\u0930\u0940 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903 \u2022 \u0936\u0941\u092D\u0902 \u092D\u0935\u0924\u0941 ||"), /* @__PURE__ */ import_react9.default.createElement("blockquote", { className: "footer-treasured-quote" }, "\u201CYour Presence Is Our Greatest Gift.", /* @__PURE__ */ import_react9.default.createElement("br", null), "Your Blessings Are Our Greatest Treasure.\u201D"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-couple-signature" }, /* @__PURE__ */ import_react9.default.createElement("h2", { className: "footer-couple-names" }, "TEENA & KULDEEP"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "footer-regards-line" }, "With Love and Warm Regards"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "footer-family-signoff" }, "Vajpayee & Upadhyay Families \u2022 Pali & Jaipur, Rajasthan")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-actions-row" }, /* @__PURE__ */ import_react9.default.createElement(
      "button",
      {
        className: "footer-btn btn-view-card-footer",
        onClick: onOpenCardViewer,
        "aria-label": "Open digital wedding invitation card"
      },
      /* @__PURE__ */ import_react9.default.createElement("span", { className: "btn-icon" }, "\u{1F4DC}"),
      /* @__PURE__ */ import_react9.default.createElement("span", { className: "btn-text" }, "VIEW WEDDING CARD")
    ), /* @__PURE__ */ import_react9.default.createElement(
      "a",
      {
        href: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
        download: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
        className: "footer-btn btn-download-pdf-footer",
        onClick: onDownloadPDF,
        "aria-label": "Download official royal wedding invitation PDF"
      },
      /* @__PURE__ */ import_react9.default.createElement("span", { className: "btn-icon" }, "\u{1F4E5}"),
      /* @__PURE__ */ import_react9.default.createElement("span", { className: "btn-text" }, "DOWNLOAD PDF INVITATION")
    ), /* @__PURE__ */ import_react9.default.createElement(
      "button",
      {
        className: "footer-btn btn-scroll-top",
        onClick: scrollToTop,
        "aria-label": "Scroll back to top of invitation"
      },
      /* @__PURE__ */ import_react9.default.createElement("span", { className: "btn-icon" }, "\u2B06"),
      /* @__PURE__ */ import_react9.default.createElement("span", { className: "btn-text" }, "BACK TO TOP")
    )), /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-bottom-divider" }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "footer-sub-bar" }, /* @__PURE__ */ import_react9.default.createElement("p", { className: "sub-bar-text" }, "The Royal Wedding Celebration 2026 \u2022 Teena & Kuldeep \u2022 Jaipur, Rajasthan"))));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/InvitationViewerModal.jsx
  var import_react10 = __toESM(__require("react"));
  function InvitationViewerModal({ isOpen, onClose }) {
    const [zoomLevel, setZoomLevel] = (0, import_react10.useState)(1);
    const [isFullscreen, setIsFullscreen] = (0, import_react10.useState)(false);
    const modalRef = (0, import_react10.useRef)(null);
    const coverPage = {
      src: "assets/pdf_card_cover.png",
      title: "Single-Page Digital Wedding Invitation Cover",
      sub: "Teena & Kuldeep \u2022 Friday, 11 December 2026 \u2022 Interactive PDF"
    };
    const pdfUrl = "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf";
    (0, import_react10.useEffect)(() => {
      if (!isOpen) return;
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);
    if (!isOpen) return null;
    const handleZoomIn = () => {
      setZoomLevel((prev) => Math.min(prev + 0.25, 2));
    };
    const handleZoomOut = () => {
      setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    };
    const handleResetZoom = () => {
      setZoomLevel(1);
    };
    const toggleFullscreen = () => {
      const elem = modalRef.current || document.documentElement;
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
          });
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {
          });
        }
      }
    };
    return /* @__PURE__ */ import_react10.default.createElement("div", { className: "royal-invitation-modal-backdrop", onClick: onClose, ref: modalRef }, /* @__PURE__ */ import_react10.default.createElement(
      "div",
      {
        className: "royal-invitation-modal-dialog",
        onClick: (e) => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Royal Wedding Invitation Card Viewer"
      },
      /* @__PURE__ */ import_react10.default.createElement("header", { className: "viewer-top-toolbar" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "viewer-info-strip" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "viewer-brand-title" }, "\u{1F451} DIGITAL WEDDING CARD VIEWER"), /* @__PURE__ */ import_react10.default.createElement("span", { className: "viewer-page-counter" }, "Single Page Edition")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "viewer-action-controls" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "zoom-ctrl-group" }, /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          className: "viewer-ctrl-btn",
          onClick: handleZoomOut,
          disabled: zoomLevel <= 0.75,
          title: "Zoom Out",
          "aria-label": "Zoom out"
        },
        "\u{1F50D}-"
      ), /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          className: "viewer-ctrl-btn zoom-level-display",
          onClick: handleResetZoom,
          title: "Reset Zoom to 100%",
          "aria-label": "Reset zoom"
        },
        Math.round(zoomLevel * 100),
        "%"
      ), /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          className: "viewer-ctrl-btn",
          onClick: handleZoomIn,
          disabled: zoomLevel >= 2,
          title: "Zoom In",
          "aria-label": "Zoom in"
        },
        "\u{1F50D}+"
      )), /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          className: "viewer-ctrl-btn",
          onClick: toggleFullscreen,
          title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
          "aria-label": "Toggle fullscreen"
        },
        isFullscreen ? "\u2913 Normal" : "\u2922 Fullscreen"
      ), /* @__PURE__ */ import_react10.default.createElement(
        "a",
        {
          href: pdfUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "viewer-ctrl-btn btn-new-tab",
          title: "Open PDF directly in a new browser tab"
        },
        "\u2197 Open in Tab"
      ), /* @__PURE__ */ import_react10.default.createElement(
        "a",
        {
          href: pdfUrl,
          download: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
          className: "viewer-ctrl-btn btn-download-gold",
          title: "Download high-resolution official 1-page vector PDF"
        },
        "\u{1F4E5} Download PDF"
      ), /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          className: "viewer-ctrl-btn btn-close-modal",
          onClick: onClose,
          title: "Close Viewer (Esc)",
          "aria-label": "Close invitation viewer"
        },
        "\u2715"
      ))),
      /* @__PURE__ */ import_react10.default.createElement("div", { className: "viewer-card-display-stage" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "viewer-card-viewport" }, /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          className: "viewer-card-frame",
          style: {
            transform: `scale(${zoomLevel})`
          }
        },
        /* @__PURE__ */ import_react10.default.createElement(
          "img",
          {
            src: coverPage.src,
            alt: coverPage.title,
            className: "viewer-card-page-img"
          }
        )
      ))),
      /* @__PURE__ */ import_react10.default.createElement("footer", { className: "viewer-bottom-bar" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "page-caption-block" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "caption-title" }, coverPage.title), /* @__PURE__ */ import_react10.default.createElement("div", { className: "caption-subtitle" }, coverPage.sub)), /* @__PURE__ */ import_react10.default.createElement("div", { className: "viewer-thumbnail-strip" }, /* @__PURE__ */ import_react10.default.createElement(
        "a",
        {
          href: "https://pushu1.github.io/param-pummy-wedding/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "thumb-btn active",
          title: "Launch Website directly"
        },
        /* @__PURE__ */ import_react10.default.createElement("span", null, "\u{1F310} Open Live Website")
      ), /* @__PURE__ */ import_react10.default.createElement(
        "a",
        {
          href: pdfUrl,
          download: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
          className: "thumb-btn",
          title: "Download PDF"
        },
        /* @__PURE__ */ import_react10.default.createElement("span", null, "\u{1F4E5} Download PDF")
      )))
    ));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/MusicPlayer.jsx
  var import_react11 = __toESM(__require("react"));
  function MusicPlayer({ audioSrc = "assets/wedding_bgm.mp3" }) {
    const [isPlaying, setIsPlaying] = (0, import_react11.useState)(false);
    const audioRef = (0, import_react11.useRef)(null);
    (0, import_react11.useEffect)(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.5;
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      return () => {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }, []);
    const toggleMusic = (e) => {
      e.stopPropagation();
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => {
          console.warn("Playback gesture required:", err);
        });
      }
    };
    return /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement("audio", { id: "bgm-player", ref: audioRef, src: audioSrc, loop: true, preload: "auto" }), /* @__PURE__ */ import_react11.default.createElement("aside", { className: "music-player-aside", "aria-label": "Royal Wedding Music" }, /* @__PURE__ */ import_react11.default.createElement(
      "button",
      {
        className: `floating-music-btn ${isPlaying ? "is-playing" : ""}`,
        onClick: toggleMusic,
        "aria-label": isPlaying ? "Pause wedding music" : "Play wedding music",
        title: isPlaying ? "Pause Royal Instrumental Music" : "Play Royal Instrumental Music"
      },
      /* @__PURE__ */ import_react11.default.createElement("div", { className: "music-btn-glow" }),
      isPlaying ? /* @__PURE__ */ import_react11.default.createElement("div", { className: "audio-equalizer" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "eq-bar bar-1" }), /* @__PURE__ */ import_react11.default.createElement("span", { className: "eq-bar bar-2" }), /* @__PURE__ */ import_react11.default.createElement("span", { className: "eq-bar bar-3" })) : /* @__PURE__ */ import_react11.default.createElement("span", { className: "music-note-icon" }, "\u{1F3B5}")
    )));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/components/PetalsCanvas.jsx
  var import_react12 = __toESM(__require("react"));
  function PetalsCanvas() {
    const canvasRef = (0, import_react12.useRef)(null);
    (0, import_react12.useEffect)(() => {
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
      const petalCount = 20;
      const petals = [];
      const colors = [
        "rgba(216, 195, 154, 0.45)",
        // Soft Champagne
        "rgba(232, 216, 186, 0.40)",
        // Light Champagne
        "rgba(151, 171, 151, 0.40)",
        // Muted Sage
        "rgba(175, 195, 175, 0.35)",
        // Soft Sage Leaf
        "rgba(250, 248, 242, 0.50)"
        // Pearl White Shimmer
      ];
      for (let i = 0; i < petalCount; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          r: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          isLeaf: Math.random() > 0.5,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.9 + 0.6,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 1.5,
          swing: Math.random() * Math.PI * 2,
          vSwing: Math.random() * 0.02 + 8e-3
        });
      }
      const render = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          p.swing += p.vSwing;
          p.x += p.vx + Math.sin(p.swing) * 0.7;
          p.y += p.vy;
          p.rot += p.vRot;
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * Math.PI / 180);
          ctx.fillStyle = p.color;
          if (p.isLeaf) {
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r * 1.5, p.r * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.r, 0, Math.PI * 2);
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
    return /* @__PURE__ */ import_react12.default.createElement("canvas", { ref: canvasRef, className: "petals-ambient-canvas", "aria-hidden": "true" });
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/App.jsx
  function App() {
    const [hasOpenedEnvelope, setHasOpenedEnvelope] = (0, import_react13.useState)(false);
    const [isViewerOpen, setIsViewerOpen] = (0, import_react13.useState)(false);
    const [isMuted, setIsMuted] = (0, import_react13.useState)(false);
    const toggleMusic = () => {
      const audio = document.getElementById("bgm-player");
      if (!audio) return;
      if (audio.paused) {
        audio.play().then(() => setIsMuted(false)).catch(() => {
        });
      } else {
        audio.pause();
        setIsMuted(true);
      }
    };
    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    return /* @__PURE__ */ import_react13.default.createElement("div", { className: "royal-wedding-app" }, /* @__PURE__ */ import_react13.default.createElement(PetalsCanvas, null), /* @__PURE__ */ import_react13.default.createElement(MusicPlayer, { audioSrc: "assets/wedding_bgm.mp3" }), !hasOpenedEnvelope ? /* @__PURE__ */ import_react13.default.createElement(
      CinematicEnvelopeOpening,
      {
        onOpenComplete: () => setHasOpenedEnvelope(true),
        onToggleMusic: toggleMusic,
        isMuted
      }
    ) : /* @__PURE__ */ import_react13.default.createElement("div", { className: "invitation-main-flow fade-enter" }, /* @__PURE__ */ import_react13.default.createElement("header", { className: "sticky-royal-nav", role: "banner" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "nav-container" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "nav-brand", onClick: () => scrollTo("hero-section") }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "brand-crest" }, "\u{1F451}"), /* @__PURE__ */ import_react13.default.createElement("span", { className: "brand-title" }, "TEENA & KULDEEP")), /* @__PURE__ */ import_react13.default.createElement("nav", { className: "nav-links-row", "aria-label": "Wedding sections navigation" }, /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("hero-section") }, "Welcome"), /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("bride-section") }, "Bride's Family"), /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("groom-section") }, "Groom's Family"), /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("events-section") }, "Celebrations"), /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("venue-section") }, "Venue"), /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("countdown-section") }, "Countdown"), /* @__PURE__ */ import_react13.default.createElement("button", { className: "nav-link-btn", onClick: () => scrollTo("family-section") }, "Compliments")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "nav-actions-group" }, /* @__PURE__ */ import_react13.default.createElement(
      "button",
      {
        className: "nav-btn-view-card",
        onClick: () => setIsViewerOpen(true),
        title: "Open Royal Wedding Invitation Card"
      },
      /* @__PURE__ */ import_react13.default.createElement("span", { className: "btn-icon" }, "\u{1F4DC}"),
      /* @__PURE__ */ import_react13.default.createElement("span", { className: "btn-text" }, "VIEW CARD")
    ), /* @__PURE__ */ import_react13.default.createElement(
      "a",
      {
        href: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
        download: "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf",
        className: "nav-btn-download-pdf",
        title: "Download High-Resolution PDF Invitation"
      },
      /* @__PURE__ */ import_react13.default.createElement("span", { className: "btn-icon" }, "\u{1F4E5}"),
      /* @__PURE__ */ import_react13.default.createElement("span", { className: "btn-text" }, "PDF")
    )))), /* @__PURE__ */ import_react13.default.createElement("main", { className: "invitation-content-column" }, /* @__PURE__ */ import_react13.default.createElement(
      WeddingHero,
      {
        onOpenCardViewer: () => setIsViewerOpen(true),
        onDownloadPDF: () => {
        }
      }
    ), /* @__PURE__ */ import_react13.default.createElement(BrideFamilySection, null), /* @__PURE__ */ import_react13.default.createElement(GroomFamilySection, null), /* @__PURE__ */ import_react13.default.createElement(WeddingTimeline, null), /* @__PURE__ */ import_react13.default.createElement(VenueSection, null), /* @__PURE__ */ import_react13.default.createElement(CountdownSection, null), /* @__PURE__ */ import_react13.default.createElement(FamilyBlessingsSection, null), /* @__PURE__ */ import_react13.default.createElement(
      FinalBlessingsFooter,
      {
        onOpenCardViewer: () => setIsViewerOpen(true),
        onDownloadPDF: () => {
        }
      }
    ))), /* @__PURE__ */ import_react13.default.createElement(
      InvitationViewerModal,
      {
        isOpen: isViewerOpen,
        onClose: () => setIsViewerOpen(false)
      }
    ));
  }

  // ../../../../.gemini/antigravity/scratch/param-pummy-wedding/src/main.jsx
  var rootElement = document.getElementById("root");
  if (rootElement) {
    const root = import_client.default.createRoot(rootElement);
    root.render(/* @__PURE__ */ import_react14.default.createElement(App, null));
  }
})();
