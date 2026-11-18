# Let's craft the vector SVG for the Royal Rajasthani Groom and Bride
svg_code = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%" class="royal-couple-svg">
  <defs>
    <!-- Gradients -->
    <!-- Medallion Background Gradient -->
    <radialGradient id="medallion-bg" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#144C54"/>
      <stop offset="50%" stop-color="#0E383E"/>
      <stop offset="85%" stop-color="#092428"/>
      <stop offset="100%" stop-color="#05171A"/>
    </radialGradient>

    <!-- Gold Gradients -->
    <linearGradient id="gold-grad-rich" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E3B5"/>
      <stop offset="35%" stop-color="#D9B76E"/>
      <stop offset="70%" stop-color="#BF9748"/>
      <stop offset="100%" stop-color="#8E6A26"/>
    </linearGradient>

    <linearGradient id="gold-grad-light" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF3D6"/>
      <stop offset="50%" stop-color="#E5C785"/>
      <stop offset="100%" stop-color="#C59F50"/>
    </linearGradient>

    <!-- Rose Gold Gradient for Bride -->
    <linearGradient id="rosegold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCEAE6"/>
      <stop offset="40%" stop-color="#E8B4A8"/>
      <stop offset="75%" stop-color="#C9867A"/>
      <stop offset="100%" stop-color="#9C594E"/>
    </linearGradient>

    <!-- Groom Sherwani Teal Gradient -->
    <linearGradient id="sherwani-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18565F"/>
      <stop offset="50%" stop-color="#103F46"/>
      <stop offset="100%" stop-color="#0A2A2F"/>
    </linearGradient>

    <!-- Skin Tones -->
    <linearGradient id="groom-skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBE6D6"/>
      <stop offset="60%" stop-color="#F3CBB3"/>
      <stop offset="100%" stop-color="#E2B193"/>
    </linearGradient>

    <linearGradient id="bride-skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0E5"/>
      <stop offset="60%" stop-color="#F8D6C3"/>
      <stop offset="100%" stop-color="#EABDA6"/>
    </linearGradient>

    <!-- Translucent Dupatta Gradient -->
    <linearGradient id="dupatta-veil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCEAE6" stop-opacity="0.88"/>
      <stop offset="50%" stop-color="#E8B4A8" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#C9867A" stop-opacity="0.82"/>
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="royal-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Clip Path for Circular Medallion -->
    <clipPath id="medallion-clip">
      <circle cx="400" cy="400" r="350" />
    </clipPath>
  </defs>

  <!-- ============================================================= -->
  <!-- 1. ORNAMENTAL CIRCULAR MANDALA & AURA                         -->
  <!-- ============================================================= -->
  <!-- Outer Aura Glow -->
  <circle cx="400" cy="400" r="375" fill="none" stroke="url(#gold-grad-rich)" stroke-width="2" opacity="0.4" />
  <circle cx="400" cy="400" r="365" fill="none" stroke="url(#gold-grad-light)" stroke-width="1.2" stroke-dasharray="4,8" opacity="0.6" />

  <!-- Outer Filigree Floral Petals (24 Petals) -->
  <g id="mandala-ring" stroke="url(#gold-grad-rich)" fill="none" stroke-width="1.5" opacity="0.75">
    <circle cx="400" cy="400" r="356" stroke-width="2.5" />
    <!-- Radiating Lotus Pearls -->
    <circle cx="400" cy="38" r="4.5" fill="url(#gold-grad-light)" />
    <circle cx="400" cy="762" r="4.5" fill="url(#gold-grad-light)" />
    <circle cx="38" cy="400" r="4.5" fill="url(#gold-grad-light)" />
    <circle cx="762" cy="400" r="4.5" fill="url(#gold-grad-light)" />
    <circle cx="144" cy="144" r="3.5" fill="url(#gold-grad-light)" />
    <circle cx="656" cy="144" r="3.5" fill="url(#gold-grad-light)" />
    <circle cx="144" cy="656" r="3.5" fill="url(#gold-grad-light)" />
    <circle cx="656" cy="656" r="3.5" fill="url(#gold-grad-light)" />
  </g>

  <!-- Main Medallion Background with Clip -->
  <g clip-path="url(#medallion-clip)">
    <!-- Deep Peacock Teal Radial Background -->
    <circle cx="400" cy="400" r="350" fill="url(#medallion-bg)" />

    <!-- Subtle Royal Palace Arch Silhouette in Background -->
    <g opacity="0.18" stroke="url(#gold-grad-rich)" fill="none" stroke-width="1.8">
      <!-- Scalloped Jharokha Arch -->
      <path d="M150,750 V380 C150,260 260,160 400,160 C540,160 650,260 650,380 V750" />
      <path d="M180,750 V390 C180,285 280,195 400,195 C520,195 620,285 620,390 V750" stroke-dasharray="6,6" />
      <!-- Arch Peak Finial -->
      <path d="M400,120 L400,160 M390,145 L410,145" />
      <circle cx="400" cy="115" r="5" fill="url(#gold-grad-rich)" />
      <!-- Subtle Celestial Stars -->
      <circle cx="280" cy="240" r="1.5" fill="#FFF" opacity="0.6"/>
      <circle cx="520" cy="240" r="1.5" fill="#FFF" opacity="0.6"/>
      <circle cx="330" cy="210" r="2" fill="url(#gold-grad-light)" opacity="0.7"/>
      <circle cx="470" cy="210" r="2" fill="url(#gold-grad-light)" opacity="0.7"/>
      <circle cx="400" cy="235" r="2.5" fill="url(#gold-grad-light)" opacity="0.8"/>
    </g>

    <!-- Warm Golden Backlight Halo behind Couple -->
    <ellipse cx="400" cy="420" rx="260" ry="240" fill="url(#gold-grad-rich)" opacity="0.12" filter="url(#royal-glow)" />

    <!-- ============================================================= -->
    <!-- 2. GROOM VECTOR ARTWORK (LEFT, FACING BRIDE)                  -->
    <!-- ============================================================= -->
    <g id="groom-character" class="groom-char-group">
      
      <!-- Groom Body & Sherwani -->
      <!-- Back Stole / Doshala -->
      <path d="M220,530 C190,580 170,680 160,760 H280 C270,690 260,600 250,540 Z" fill="#96742E" opacity="0.8"/>
      <path d="M220,530 C190,580 170,680 160,760 H240 C245,690 248,600 245,540 Z" fill="url(#gold-grad-rich)"/>
      <!-- Stole gold border -->
      <path d="M162,750 C172,675 192,578 221,532" stroke="url(#gold-grad-light)" stroke-width="3" fill="none"/>

      <!-- Main Sherwani Torso -->
      <path d="M230,510 C260,500 340,510 380,530 C390,600 395,680 400,760 H210 C215,670 220,580 230,510 Z" fill="url(#sherwani-grad)" stroke="#092428" stroke-width="1.5"/>

      <!-- Sherwani Royal Collar (Mandarin Bandhgala) -->
      <path d="M280,455 C305,450 335,455 350,470 L345,495 C325,485 295,485 275,492 Z" fill="#0C343A" stroke="url(#gold-grad-rich)" stroke-width="2"/>
      <!-- Gold Zari Embroidery Placket & Royal Buttons -->
      <path d="M320,490 L335,760" stroke="url(#gold-grad-rich)" stroke-width="8" stroke-linecap="round"/>
      <path d="M320,490 L335,760" stroke="#FFF" stroke-width="1.5" stroke-dasharray="2,6"/>
      <!-- Golden Sherwani Buttons -->
      <circle cx="323" cy="515" r="3" fill="url(#gold-grad-light)"/>
      <circle cx="325" cy="545" r="3" fill="url(#gold-grad-light)"/>
      <circle cx="328" cy="575" r="3" fill="url(#gold-grad-light)"/>
      <circle cx="330" cy="605" r="3" fill="url(#gold-grad-light)"/>
      <circle cx="332" cy="635" r="3" fill="url(#gold-grad-light)"/>

      <!-- Royal Multi-Strand Emerald & Pearl Necklace (Satlada Haar) -->
      <path d="M275,490 C295,540 345,545 365,505" fill="none" stroke="url(#gold-grad-light)" stroke-width="2.5" stroke-dasharray="3,3"/>
      <path d="M265,505 C295,570 355,575 375,520" fill="none" stroke="url(#gold-grad-light)" stroke-width="2.5" stroke-dasharray="3,3"/>
      <!-- Emerald Center Pendant -->
      <polygon points="325,565 332,574 325,583 318,574" fill="#157A54" stroke="url(#gold-grad-light)" stroke-width="1.2"/>

      <!-- Groom Neck -->
      <path d="M290,430 C290,460 340,460 340,430 V405 H290 Z" fill="url(#groom-skin)"/>
      <!-- Subtle Neck Shadow -->
      <path d="M290,430 C305,448 335,448 340,430 Z" fill="#D49E7C" opacity="0.45"/>

      <!-- Groom Head (Profile / 3-Quarter Looking at Bride) -->
      <g id="groom-head" class="groom-head-group">
        <!-- Ears & Earring -->
        <path d="M275,385 C265,385 265,410 275,415 C280,418 285,410 282,395 Z" fill="url(#groom-skin)" stroke="#C88E6D" stroke-width="1"/>
        <circle cx="272" cy="405" r="2" fill="url(#gold-grad-light)"/>

        <!-- Face Contour -->
        <path d="M280,360 C290,340 330,340 350,360 C365,375 365,395 360,410 C355,425 345,438 330,442 C310,445 285,435 280,400 Z" fill="url(#groom-skin)"/>

        <!-- Royal Beard & Mustache -->
        <!-- Jaw Beard -->
        <path d="M278,390 C285,420 310,442 332,442 C342,442 352,430 355,418 C345,424 330,428 318,422 C305,416 295,402 290,388 Z" fill="#241612"/>
        <!-- Mustache -->
        <path d="M328,408 C338,406 352,408 358,414 C350,418 338,418 330,414 Z" fill="#241612"/>

        <!-- Lips (Sweet Gentle Smile) -->
        <path d="M336,418 C342,423 350,422 354,418" stroke="#A8524B" stroke-width="2.2" stroke-linecap="round" fill="none" class="groom-smile"/>

        <!-- Nose -->
        <path d="M346,370 L362,395 L350,400" stroke="#C88E6D" stroke-width="1.8" stroke-linejoin="round" fill="none"/>

        <!-- Groom Eye (Expressive, Loving Look) -->
        <g id="groom-eye" class="groom-eye-group">
          <!-- Eye Base Sclera -->
          <ellipse cx="340" cy="378" rx="8" ry="5.5" fill="#FFFFFF"/>
          <!-- Iris (Warm Amber Brown) -->
          <circle cx="342" cy="378" r="4" fill="#3D2013"/>
          <!-- Pupil & Catchlight sparkle -->
          <circle cx="342.5" cy="378" r="2.2" fill="#120A06"/>
          <circle cx="343.5" cy="376.5" r="1.3" fill="#FFFFFF"/>
          <circle cx="340.5" cy="379.5" r="0.8" fill="#FFFFFF" opacity="0.8"/>
          <!-- Upper Eyelid / Lash Line -->
          <path d="M331,376 C336,372 344,372 349,376" stroke="#241612" stroke-width="1.8" fill="none"/>
          <!-- Eyebrow -->
          <path d="M330,368 C338,363 348,364 355,369" stroke="#241612" stroke-width="2.8" stroke-linecap="round" fill="none"/>
          
          <!-- Blinking Eyelid (CSS Animated) -->
          <path d="M331,374 C337,370 345,370 349,374 C349,374 346,384 340,384 C334,384 331,374 331,374 Z" fill="url(#groom-skin)" class="groom-eyelid" opacity="0"/>
        </g>

        <!-- Forehead Tilak (Chandan & Kumkum) -->
        <path d="M344,352 H354" stroke="url(#gold-grad-light)" stroke-width="1.5"/>
        <circle cx="349" cy="355" r="1.5" fill="#B31D28"/>

        <!-- ============================================================= -->
        <!-- GROOM ROYAL RAJASTHANI SAFA (TURBAN)                          -->
        <!-- ============================================================= -->
        <g id="groom-safa" class="groom-safa-group">
          <!-- Base Turban Dome -->
          <path d="M270,365 C260,330 280,285 330,280 C375,275 400,310 395,350 C380,365 350,370 320,368 C290,366 275,372 270,365 Z" fill="url(#gold-grad-rich)"/>
          
          <!-- Turban Swirl Folds (Zari bands in Champagne & Rose-Gold) -->
          <path d="M272,355 C295,335 345,335 390,352" stroke="url(#gold-grad-light)" stroke-width="7" fill="none"/>
          <path d="M275,340 C300,320 350,320 388,338" stroke="url(#rosegold-grad)" stroke-width="6" fill="none"/>
          <path d="M282,325 C305,305 350,305 382,325" stroke="url(#gold-grad-light)" stroke-width="6" fill="none"/>
          <path d="M295,308 C315,295 345,295 372,312" stroke="url(#rosegold-grad)" stroke-width="5" fill="none"/>
          <path d="M310,292 C325,285 345,285 360,296" stroke="url(#gold-grad-light)" stroke-width="5" fill="none"/>

          <!-- Royal Kalgi / Sarpech Jewel at Top Front -->
          <g id="groom-kalgi">
            <!-- Jewel Base Mount -->
            <ellipse cx="370" cy="315" rx="8" ry="12" fill="url(#gold-grad-rich)" stroke="#FFF" stroke-width="0.8"/>
            <circle cx="370" cy="315" r="4.5" fill="#157A54"/> <!-- Emerald Gem -->
            <circle cx="371" cy="314" r="1.5" fill="#FFF"/>
            <!-- Hanging Pearl Droplet -->
            <circle cx="370" cy="331" r="3" fill="#FFF"/>
            <!-- Golden Feathers / Aigrette Plume -->
            <path d="M370,303 C372,275 385,255 395,245 C388,260 380,280 374,303 Z" fill="url(#gold-grad-light)"/>
            <path d="M368,303 C365,278 355,260 345,252 C355,265 364,282 368,303 Z" fill="url(#gold-grad-rich)"/>
          </g>

          <!-- Flowing Safa Tail (Animated Breeze Flutter) -->
          <path d="M265,360 C250,390 240,450 245,510 C240,460 255,400 270,370 Z" fill="url(#gold-grad-rich)" class="safa-palla-tail"/>
          <path d="M268,365 C255,400 248,460 252,510" stroke="url(#gold-grad-light)" stroke-width="2" fill="none" class="safa-palla-tail"/>
        </g>
      </g>

      <!-- Groom Namaste Hands (Hidden in Cover State, Gracefully Displayed in Greeting State) -->
      <g id="groom-namaste-hand" class="namaste-hand-groom" opacity="0">
        <!-- Arm reaching center -->
        <path d="M280,550 C320,530 360,510 385,490 L395,515 C370,535 330,560 280,580 Z" fill="url(#sherwani-grad)"/>
        <!-- Hand palm & fingers in Anjali mudra -->
        <path d="M382,490 C388,475 394,460 398,455 C400,458 402,475 398,495 C394,505 388,515 382,510 Z" fill="url(#groom-skin)" stroke="#C88E6D" stroke-width="1"/>
      </g>
    </g>

    <!-- ============================================================= -->
    <!-- 3. BRIDE VECTOR ARTWORK (RIGHT, FACING GROOM)                 -->
    <!-- ============================================================= -->
    <g id="bride-character" class="bride-char-group">
      
      <!-- Bride Body & Choli -->
      <!-- Main Blouse & Shoulder -->
      <path d="M420,530 C460,510 540,500 570,510 C580,580 585,670 590,760 H400 C405,680 410,600 420,530 Z" fill="url(#rosegold-grad)" stroke="#7A3F35" stroke-width="1.5"/>

      <!-- Zari Embroidery Patterns on Blouse -->
      <path d="M440,535 C480,555 520,555 560,535" stroke="url(#gold-grad-light)" stroke-width="3" fill="none"/>
      <path d="M445,555 C480,575 520,575 555,555" stroke="url(#gold-grad-light)" stroke-width="2" stroke-dasharray="2,4" fill="none"/>

      <!-- Royal Kundan Choker & Rani Haar -->
      <!-- High Choker -->
      <path d="M445,475 C470,490 495,490 515,475 L518,490 C495,505 470,505 442,490 Z" fill="url(#gold-grad-rich)" stroke="#FFF" stroke-width="0.8"/>
      <!-- Emerald drop pearls on choker -->
      <circle cx="460" cy="495" r="2.5" fill="#157A54"/>
      <circle cx="480" cy="498" r="3" fill="#157A54"/>
      <circle cx="500" cy="495" r="2.5" fill="#157A54"/>
      
      <!-- Long Rani Haar with Emerald Droplets -->
      <path d="M435,505 C455,570 510,570 535,505" fill="none" stroke="url(#gold-grad-light)" stroke-width="2.5" stroke-dasharray="3,3"/>
      <!-- Center Floral Polki Pendant -->
      <circle cx="485" cy="565" r="6" fill="url(#gold-grad-rich)"/>
      <circle cx="485" cy="565" r="3" fill="#B31D28"/> <!-- Ruby center -->
      <circle cx="485" cy="576" r="3" fill="#FFF"/> <!-- Pearl droplet -->

      <!-- Bride Neck -->
      <path d="M460,430 C460,460 510,460 510,430 V405 H460 Z" fill="url(#bride-skin)"/>
      <!-- Subtle Neck Shadow -->
      <path d="M460,430 C475,448 495,448 510,430 Z" fill="#D99E82" opacity="0.4"/>

      <!-- Bride Head (Profile / 3-Quarter Looking at Groom) -->
      <g id="bride-head" class="bride-head-group">
        
        <!-- Ears & Elaborate Jhumka Earring -->
        <path d="M520,385 C530,385 530,410 520,415 C515,418 512,410 515,395 Z" fill="url(#bride-skin)"/>
        <!-- Golden Kundan Jhumka -->
        <g id="bride-jhumka">
          <circle cx="525" cy="405" r="3" fill="url(#gold-grad-light)"/>
          <path d="M520,412 C520,418 530,418 530,412 Z" fill="url(#gold-grad-rich)"/>
          <circle cx="522" cy="422" r="1.2" fill="#FFF"/>
          <circle cx="525" cy="423" r="1.5" fill="#157A54"/>
          <circle cx="528" cy="422" r="1.2" fill="#FFF"/>
        </g>

        <!-- Face Contour -->
        <path d="M515,360 C505,340 465,340 448,360 C435,375 435,395 440,410 C445,425 455,438 470,442 C490,445 515,435 520,400 Z" fill="url(#bride-skin)"/>

        <!-- Soft Blush on Cheeks -->
        <ellipse cx="460" cy="405" rx="14" ry="8" fill="#E8827A" opacity="0.32"/>

        <!-- Traditional Rajasthani Nath (Nose Ring with Pearl Chain) -->
        <g id="bride-nath">
          <!-- Circular Nose Ring -->
          <circle cx="442" cy="398" r="7.5" fill="none" stroke="url(#gold-grad-rich)" stroke-width="1.6"/>
          <circle cx="438" cy="398" r="1.8" fill="#B31D28"/> <!-- Ruby bead on ring -->
          <circle cx="440" cy="402" r="1.5" fill="#FFF"/> <!-- Pearl bead -->
          <!-- Fine Pearl Chain connecting to Ear -->
          <path d="M449,396 C470,395 500,398 522,402" fill="none" stroke="url(#gold-grad-light)" stroke-width="1" stroke-dasharray="1.5,2"/>
        </g>

        <!-- Lips (Sweet Subtle Smile) -->
        <path d="M446,418 C452,423 460,422 466,418" stroke="#C24E56" stroke-width="2.5" stroke-linecap="round" fill="none" class="bride-smile"/>
        <!-- Upper Lip Contour -->
        <path d="M450,416 C454,414 458,414 462,416" stroke="#A63C44" stroke-width="1.2" fill="none"/>

        <!-- Nose -->
        <path d="M452,370 L438,395 L448,400" stroke="#D99E82" stroke-width="1.6" stroke-linejoin="round" fill="none"/>

        <!-- Auspicious Red Bindi between brows -->
        <circle cx="452" cy="362" r="2.2" fill="#B31D28"/>
        <circle cx="452" cy="362" r="0.8" fill="#FFD700"/>

        <!-- Bride Eye (Tender, Expressive Kohl-Rimmed Almond Eye) -->
        <g id="bride-eye" class="bride-eye-group">
          <!-- Kohl Shadow Rim -->
          <path d="M448,377 C454,370 466,370 472,377 C466,384 454,384 448,377 Z" fill="#1C100B" opacity="0.15"/>
          <!-- Eye Sclera -->
          <ellipse cx="460" cy="378" rx="8" ry="5" fill="#FFFFFF"/>
          <!-- Iris (Dark Hazel Honey) -->
          <circle cx="458" cy="378" r="3.8" fill="#422213"/>
          <!-- Pupil & Dual Catchlight Sparkles -->
          <circle cx="457.5" cy="378" r="2" fill="#120A06"/>
          <circle cx="456.5" cy="376.5" r="1.3" fill="#FFFFFF"/>
          <circle cx="459.5" cy="379.5" r="0.8" fill="#FFFFFF" opacity="0.9"/>
          
          <!-- Upper Kohl Eyeliner & Winged Lash -->
          <path d="M447,377 C453,371 465,371 472,376 L476,374" stroke="#1C100B" stroke-width="2" stroke-linecap="round" fill="none"/>
          <!-- Lower Eyelid Kohl Line -->
          <path d="M450,381 C456,384 465,384 470,380" stroke="#1C100B" stroke-width="1.2" fill="none"/>
          <!-- Delicate Eyebrow -->
          <path d="M445,368 C453,362 465,363 472,368" stroke="#241612" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          
          <!-- Blinking Eyelid (CSS Animated) -->
          <path d="M448,374 C454,370 466,370 472,374 C472,374 468,384 460,384 C452,384 448,374 448,374 Z" fill="url(#bride-skin)" class="bride-eyelid" opacity="0"/>
        </g>

        <!-- Bridal Hair Parting & Maang Tikka -->
        <!-- Hair Base -->
        <path d="M460,345 C485,325 530,345 530,375 C530,385 525,395 520,400 C515,375 490,355 460,345 Z" fill="#1F130E"/>
        <!-- Matha Patti along Hairline -->
        <path d="M455,348 C480,338 515,355 525,375" stroke="url(#gold-grad-rich)" stroke-width="3" fill="none"/>
        <path d="M455,348 C480,338 515,355 525,375" stroke="#FFF" stroke-width="1.2" stroke-dasharray="2,3" fill="none"/>
        <!-- Center Maang Tikka Bell Pendant -->
        <g id="bride-tikka">
          <path d="M472,328 L458,350" stroke="url(#gold-grad-light)" stroke-width="1.5"/>
          <circle cx="457" cy="352" r="4.5" fill="url(#gold-grad-rich)"/>
          <circle cx="457" cy="352" r="2" fill="#B31D28"/>
          <circle cx="456" cy="358" r="1.5" fill="#FFF"/>
        </g>

        <!-- ============================================================= -->
        <!-- BRIDE ROYAL DUPATTA (SHEER VEIL WITH GOLD KIRAN GOTA)         -->
        <!-- ============================================================= -->
        <g id="bride-dupatta" class="dupatta-group">
          <!-- Back Veil Dome over Bun -->
          <path d="M450,335 C470,305 530,305 555,340 C565,355 565,390 560,430 C540,430 530,370 515,350 Z" fill="url(#dupatta-veil)" class="dupatta-wave-back"/>
          
          <!-- Flowing Translucent Dupatta Veil cascading over Shoulder -->
          <path d="M455,335 C485,315 540,320 565,365 C580,410 585,490 575,570 C560,530 545,460 535,420 C525,375 490,350 455,335 Z" fill="url(#dupatta-veil)" class="dupatta-wave-front"/>
          
          <!-- Golden Scalloped Kiran Gota Lace Border -->
          <path d="M455,336 C485,316 540,321 565,366 C580,411 585,491 575,571" stroke="url(#gold-grad-rich)" stroke-width="4" stroke-linecap="round" fill="none" class="dupatta-wave-front"/>
          <path d="M455,336 C485,316 540,321 565,366 C580,411 585,491 575,571" stroke="#FFF" stroke-width="1.5" stroke-dasharray="3,3" fill="none" class="dupatta-wave-front"/>

          <!-- Floral Gold Bootis on Dupatta -->
          <circle cx="520" cy="370" r="2" fill="url(#gold-grad-light)" opacity="0.8"/>
          <circle cx="545" cy="410" r="2" fill="url(#gold-grad-light)" opacity="0.8"/>
          <circle cx="555" cy="460" r="2" fill="url(#gold-grad-light)" opacity="0.8"/>
          <circle cx="560" cy="510" r="2" fill="url(#gold-grad-light)" opacity="0.8"/>
        </g>
      </g>

      <!-- Bride Namaste Hands (Hidden in Cover State, Gracefully Displayed in Greeting State) -->
      <g id="bride-namaste-hand" class="namaste-hand-bride" opacity="0">
        <!-- Arm reaching center with red chooda & gold bangles -->
        <path d="M520,550 C480,530 440,510 415,490 L405,515 C430,535 470,560 520,580 Z" fill="url(#rosegold-grad)"/>
        <!-- Gold Bangles & Chooda -->
        <path d="M440,515 L432,530" stroke="url(#gold-grad-rich)" stroke-width="3"/>
        <path d="M435,512 L427,527" stroke="#B31D28" stroke-width="4"/>
        <!-- Hand palm & fingers with Mehendi in Anjali mudra -->
        <path d="M418,490 C412,475 406,460 402,455 C400,458 398,475 402,495 C406,505 412,515 418,510 Z" fill="url(#bride-skin)" stroke="#C88E6D" stroke-width="1"/>
        <!-- Delicate Henna / Mehendi motif on back of hand -->
        <circle cx="406" cy="485" r="2" fill="#8B3A2B"/>
        <circle cx="404" cy="470" r="1.2" fill="#8B3A2B"/>
      </g>
    </g>

    <!-- Center Union Flourish Heart / Love Sparkle -->
    <g id="center-love-flourish" opacity="0.85">
      <path d="M400,430 C395,418 382,418 382,430 C382,442 400,454 400,454 C400,454 418,442 418,430 C418,418 405,418 400,430 Z" fill="url(#gold-grad-light)" filter="url(#royal-glow)" class="heart-pulse"/>
      <circle cx="400" cy="405" r="2.5" fill="url(#gold-grad-light)" class="sparkle-1"/>
      <circle cx="375" cy="445" r="1.5" fill="url(#gold-grad-light)" class="sparkle-2"/>
      <circle cx="425" cy="445" r="1.5" fill="url(#gold-grad-light)" class="sparkle-3"/>
    </g>

  </g> <!-- End of medallion clip-path -->

  <!-- Inner Gold Medallion Rim Frame -->
  <circle cx="400" cy="400" r="350" fill="none" stroke="url(#gold-grad-rich)" stroke-width="6" />
  <circle cx="400" cy="400" r="344" fill="none" stroke="url(#gold-grad-light)" stroke-width="1.5" stroke-dasharray="3,5" />
</svg>'''

with open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\royal_couple_vector.svg', 'w', encoding='utf-8') as f:
    f.write(svg_code)
print('Generated assets/royal_couple_vector.svg successfully!')
