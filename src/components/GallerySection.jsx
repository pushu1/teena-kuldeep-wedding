import React, { useState } from 'react';

const galleryPhotos = [
  {
    src: 'assets/gallery_groom.png',
    caption: 'Chiranjeev Kuldeep (Groom)',
  },
  {
    src: 'assets/gallery_bride.png',
    caption: 'Sou. Ka. Teena (Bride)',
  },
  {
    src: 'assets/gallery_couple_1.png',
    caption: 'Kuldeep & Teena — Royal Union',
  },
  {
    src: 'assets/gallery_couple_2.png',
    caption: 'Sacred Vows & Eternal Love',
  },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="moments-gallery-section" id="our-gallery">
      {/* Header */}
      <div className="section-title-wrap">
        <p className="section-pre-title">MOMENTS</p>
        <h2 className="section-script-title">Our Gallery</h2>

        {/* Golden Flourish Divider */}
        <div className="golden-flourish-divider compact" aria-hidden="true">
          <span className="flourish-line"></span>
          <svg className="flourish-icon" viewBox="0 0 40 16" fill="none">
            <path d="M0 8 C10 8 13 2 20 2 C27 2 30 8 40 8 C30 8 27 14 20 14 C13 14 10 8 0 8 Z" fill="#C8A86B" />
            <polygon points="20,5 23,8 20,11 17,8" fill="#B5904D" />
          </svg>
          <span className="flourish-line"></span>
        </div>
      </div>

      {/* Arched Photo Slider Viewport */}
      <div className="gallery-slider-viewport">
        <div className="gallery-slide-card">
          <div className="gallery-arch-frame">
            <img
              src={galleryPhotos[currentIndex].src}
              alt={galleryPhotos[currentIndex].caption}
              className="gallery-couple-img"
            />
          </div>
          <p className="gallery-photo-caption">{galleryPhotos[currentIndex].caption}</p>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="gallery-controls-bar">
          <button
            onClick={prevPhoto}
            className="gallery-nav-arrow arrow-left"
            aria-label="Previous photograph"
            title="Previous"
          >
            &lsaquo;
          </button>

          {/* Dot Pagination */}
          <div className="gallery-dots-row">
            {galleryPhotos.map((_, idx) => (
              <button
                key={idx}
                className={`gallery-dot-btn ${idx === currentIndex ? 'is-active-dot' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPhoto}
            className="gallery-nav-arrow arrow-right"
            aria-label="Next photograph"
            title="Next"
          >
            &rsaquo;
          </button>
        </div>
      </div>
    </section>
  );
}
