import React, { useState } from 'react';

export default function AnimatedCoupleMedallion() {
  const [animKey, setAnimKey] = useState(0);

  const handleReplay = () => {
    setAnimKey(prev => prev + 1);
  };

  return (
    <div
      className="medallion-container"
      onClick={handleReplay}
      title="Tap to replay royal greeting animation"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleReplay();
      }}
    >
      {/* Golden Aura Glow Effect */}
      <div className="medallion-aura-halo"></div>

      {/* Decorative Outer Bevel Rim */}
      <div className="medallion-outer-ring">
        <svg
          key={animKey}
          className="medallion-svg-canvas"
          viewBox="0 0 1024 1024"
          width="100%"
          height="100%"
          aria-label="Animated Indian Wedding Couple Illustration"
        >
          <defs>
            <clipPath id="couple-circle-clip">
              <circle cx="512" cy="512" r="506" />
            </clipPath>
          </defs>

          <g clipPath="url(#couple-circle-clip)">
            {/* 1. Base Gazing (0s to ~2s: Looking at each other) */}
            <image
              href="assets/couple_looking_circle.png"
              width="1024"
              height="1024"
              className="anim-layer layer-base-looking"
            />

            {/* 2. Base Namaste (2s onwards: Forward facing joined in prayer) */}
            <image
              href="assets/couple_namaste_circle.png"
              width="1024"
              height="1024"
              className="anim-layer layer-base-namaste"
            />

            {/* 3. Groom Head Looking (Turned towards Bride) + Eyelid Blink */}
            <g className="anim-layer layer-groom-head-looking">
              <image href="assets/layer_groom_head_looking.png" width="1024" height="1024" />
              <image
                href="assets/eyelids_groom_pose1.png"
                width="1024"
                height="1024"
                className="eyelid-blink-layer eyelid-groom-p1"
              />
            </g>

            {/* 4. Bride Head Looking (Turned towards Groom) + Eyelid Blink */}
            <g className="anim-layer layer-bride-head-looking">
              <image href="assets/layer_bride_head_looking.png" width="1024" height="1024" />
              <image
                href="assets/eyelids_bride_pose1.png"
                width="1024"
                height="1024"
                className="eyelid-blink-layer eyelid-bride-p1"
              />
            </g>

            {/* 5. Groom Head Front (Turns towards Viewer at 2.0s) + Eyelid Blink */}
            <g className="anim-layer layer-groom-head-front">
              <image href="assets/layer_groom_head_front.png" width="1024" height="1024" />
              <image
                href="assets/eyelids_groom_pose2.png"
                width="1024"
                height="1024"
                className="eyelid-blink-layer eyelid-groom-p2"
              />
            </g>

            {/* 6. Bride Head Front (Turns towards Viewer at 2.0s) + Eyelid Blink */}
            <g className="anim-layer layer-bride-head-front">
              <image href="assets/layer_bride_head_front.png" width="1024" height="1024" />
              <image
                href="assets/eyelids_bride_pose2.png"
                width="1024"
                height="1024"
                className="eyelid-blink-layer eyelid-bride-p2"
              />
            </g>

            {/* 7. Raised Namaste Hands Layer (Smoothly joins at chest at 2.0s) */}
            <g className="anim-layer layer-namaste-hands">
              <image href="assets/namaste_hands_layer.png" width="1024" height="1024" />
            </g>
          </g>
        </svg>

        {/* Inner Gold Filigree Bezel Rim */}
        <div className="medallion-inner-gold-rim"></div>
      </div>

      {/* Floating Gold Sparkle Accents */}
      <span className="sparkle-star s-top-left">✦</span>
      <span className="sparkle-star s-top-right">✦</span>
      <span className="sparkle-star s-bot-left">✦</span>
      <span className="sparkle-star s-bot-right">✦</span>

      <p className="medallion-tap-hint">✦ Tap portrait to replay greeting ✦</p>
    </div>
  );
}
