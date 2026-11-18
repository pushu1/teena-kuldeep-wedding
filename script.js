/**
 * UPADHYAY FAMILY ROYAL WEDDING INVITATION — JAVASCRIPT
 * Custom Canvas Particle System, Vector Animation Controls & Audio
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioPlayer();
  initNamasteSequence();
  initSealButton();
  initPetalsCanvas();
  initSheetControls();
});

/* ==========================================================================
   0. NAMASTE GREETING SEQUENCE & MEDALLION REPLAY CONTROLS
   ========================================================================== */
function initNamasteSequence() {
  const urlParams = new URLSearchParams(window.location.search);
  const medallion = document.getElementById('medallion-hero-wrap');
  const svg = document.getElementById('medallion-svg-art');

  // URL state parameter testing support:
  if (urlParams.get('state') === 'gazing') {
    document.body.classList.add('force-gazing');
    return;
  }
  if (urlParams.get('state') === 'namaste') {
    document.body.classList.add('is-namaste-turn');
    document.body.classList.add('force-namaste');
    return;
  }
  if (urlParams.get('state') === 'sheet') {
    document.body.classList.add('is-namaste-turn');
    document.body.classList.add('is-opened');
    document.body.classList.add('force-namaste');
    const sheet = document.getElementById('invitation-reveal-sheet');
    if (sheet) sheet.classList.add('is-active');
    return;
  }

  // Medallion tap: Replay the complete 3-stage royal animation sequence
  if (medallion && svg) {
    medallion.addEventListener('click', () => {
      const layers = svg.querySelectorAll('.svg-layer, .eyelid-layer');
      layers.forEach(el => {
        el.style.animation = 'none';
      });
      void svg.offsetWidth; // Force reflow
      layers.forEach(el => {
        el.style.animation = '';
      });
    });
  }

  // After 2.0s, ensure namaste class is present for persistent hold state
  setTimeout(() => {
    document.body.classList.add('is-namaste-turn');
  }, 2000);
}

/* ==========================================================================
   1. ROYAL SHEHNAI BGM AUDIO PLAYER
   ========================================================================== */
function initAudioPlayer() {
  const bgm = document.getElementById('bgm-player');
  const toggleBtn = document.getElementById('audio-toggle');
  const widget = document.getElementById('audio-widget');
  const speakerIcon = document.getElementById('speaker-icon');

  if (!bgm || !toggleBtn) return;

  bgm.volume = 0.55;

  function toggleAudio() {
    if (bgm.paused) {
      bgm.play().then(() => {
        widget.classList.add('is-playing');
        speakerIcon.textContent = '🔊';
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    } else {
      bgm.pause();
      widget.classList.remove('is-playing');
      speakerIcon.textContent = '🔇';
    }
  }

  toggleBtn.addEventListener('click', toggleAudio);

  // Play audio on first user interaction anywhere if permitted
  window.playRoyalAudio = function() {
    if (bgm.paused) {
      bgm.play().then(() => {
        widget.classList.add('is-playing');
        speakerIcon.textContent = '🔊';
      }).catch(e => console.log('Audio playback pending user click'));
    }
  };
}

/* ==========================================================================
   2. ROYAL SEAL "CLICK HERE" BUTTON & GREETING TRANSITION
   ========================================================================== */
function initSealButton() {
  const openBtn = document.getElementById('open-invitation-btn');
  const sheet = document.getElementById('invitation-reveal-sheet');

  if (!openBtn) return;

  openBtn.addEventListener('click', () => {
    // 1. Play Royal Music
    if (window.playRoyalAudio) {
      window.playRoyalAudio();
    }

    // 2. Trigger body state: couple greets in Namaste and opens sheet
    document.body.classList.add('is-namaste-turn');
    document.body.classList.add('is-opened');

    // 3. Trigger burst of celebratory particles
    if (window.triggerCelebrationBurst) {
      window.triggerCelebrationBurst();
    }

    // 4. Reveal invitation details sheet after brief cinematic transition
    setTimeout(() => {
      if (sheet) {
        sheet.classList.add('is-active');
        sheet.setAttribute('aria-hidden', 'false');
      }
    }, 450);
  });
}

/* ==========================================================================
   3. REVEAL SHEET MODAL CONTROLS
   ========================================================================== */
function initSheetControls() {
  const sheet = document.getElementById('invitation-reveal-sheet');
  const closeBtn = document.getElementById('sheet-close-btn');
  const backdrop = document.getElementById('sheet-backdrop');

  function closeSheet() {
    if (sheet) {
      sheet.classList.remove('is-active');
      sheet.setAttribute('aria-hidden', 'true');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSheet);
  if (backdrop) backdrop.addEventListener('click', closeSheet);
}

/* ==========================================================================
   4. AMBIENT ROSE PETALS & GOLDEN PARTICLES CANVAS SYSTEM
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const sparkles = [];
  const NUM_PETALS = 22;
  const NUM_SPARKLES = 28;

  // Petal class
  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.5 + 0.4;
      this.flip = Math.random() * 2 * Math.PI;
      this.flipSpeed = Math.random() * 0.03 + 0.01;
      
      // Color: Soft Rose-Pink and Crimson Petals
      const colors = [
        'rgba(235, 138, 148, ',
        'rgba(214, 107, 120, ',
        'rgba(245, 178, 186, ',
        'rgba(189, 74, 90, '
      ];
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.9 + this.speedX;
      this.rotation += this.rotSpeed;
      this.flip += this.flipSpeed;

      if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(Math.sin(this.flip), 1);

      ctx.beginPath();
      // Draw organic petal curvature
      ctx.moveTo(0, -this.size / 2);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 1.5, this.size / 3, 0, this.size / 1.2);
      ctx.bezierCurveTo(-this.size / 1.5, this.size / 3, -this.size / 2, -this.size / 2, 0, -this.size / 2);
      ctx.fillStyle = this.colorBase + this.opacity + ')';
      ctx.fill();

      ctx.restore();
    }
  }

  // Golden Stardust Particle class
  class Sparkle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.5 + 0.3;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.y -= this.speedY;
      this.pulse += 0.03;
      this.currentOpacity = Math.abs(Math.sin(this.pulse)) * this.opacity;

      if (this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248, 228, 186, ${this.currentOpacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(223, 191, 119, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < NUM_PETALS; i++) petals.push(new Petal());
  for (let i = 0; i < NUM_SPARKLES; i++) sparkles.push(new Sparkle());

  // Celebration burst generator
  window.triggerCelebrationBurst = function() {
    for (let i = 0; i < 35; i++) {
      const p = new Petal();
      p.x = width / 2 + (Math.random() - 0.5) * 120;
      p.y = height * 0.45 + (Math.random() - 0.5) * 120;
      p.speedY = (Math.random() - 0.5) * 4 + 1.5;
      p.speedX = (Math.random() - 0.5) * 4;
      petals.push(p);
    }
  };

  // Main Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let s of sparkles) {
      s.update();
      s.draw();
    }

    for (let p of petals) {
      p.update();
      p.draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. CALENDAR & GUESTBOOK ACTIONS
   ========================================================================== */
window.addWeddingToCalendar = function() {
  const title = encodeURIComponent("Kuldeep & Teena — Royal Wedding & Reception");
  const details = encodeURIComponent("Auspicious wedding ceremony of Kuldeep & Teena. Upadhyay Family cordially invites you!\n\nWedding: Friday, 11 Dec 2026\nReception: Sunday, 13 Dec 2026 (06:00 PM Onwards)\nVenue: Jain Bagbera Dadawadi, Pali (Rajasthan)");
  const location = encodeURIComponent("Jain Bagbera Dadawadi, Venkatesh Marg, Pali, Rajasthan");
  const dates = "20261211T020000/20261213T230000";
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  window.open(gcalUrl, '_blank');
};

window.handleSendWish = function(e) {
  e.preventDefault();
  const name = document.getElementById('guest-name').value.trim();
  const msg = document.getElementById('guest-message').value.trim();
  const status = document.getElementById('wishes-status');

  if (!name || !msg) return;

  const wish = { name, msg, time: new Date().toLocaleDateString() };
  try {
    const existing = JSON.parse(localStorage.getItem('kuldeep_teena_wishes') || '[]');
    existing.push(wish);
    localStorage.setItem('kuldeep_teena_wishes', JSON.stringify(existing));
  } catch (err) {}

  status.textContent = "✦ Thank you! Your warm blessing has been received. ✦";
  status.style.color = "#DFBF77";
  document.getElementById('wishes-form').reset();
};
