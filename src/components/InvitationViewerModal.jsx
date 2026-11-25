import React, { useState, useEffect, useRef } from 'react';

export default function InvitationViewerModal({ isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef(null);

  const coverPage = {
    src: 'assets/pdf_card_cover.png',
    title: 'Single-Page Digital Wedding Invitation Cover',
    sub: 'Teena & Kuldeep • Friday, 11 December 2026 • Interactive PDF'
  };

  const pdfUrl = 'Teena_Kuldeep_New_Royal_Digital_Invitation.pdf';

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    const elem = modalRef.current || document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  return (
    <div className="royal-invitation-modal-backdrop" onClick={onClose} ref={modalRef}>
      <div
        className="royal-invitation-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Royal Wedding Invitation Card Viewer"
      >
        {/* Top Control Bar */}
        <header className="viewer-top-toolbar">
          <div className="viewer-info-strip">
            <span className="viewer-brand-title">👑 DIGITAL WEDDING CARD VIEWER</span>
            <span className="viewer-page-counter">Single Page Edition</span>
          </div>

          <div className="viewer-action-controls">
            {/* Zoom Controls */}
            <div className="zoom-ctrl-group">
              <button
                className="viewer-ctrl-btn"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                title="Zoom Out"
                aria-label="Zoom out"
              >
                🔍-
              </button>
              <button
                className="viewer-ctrl-btn zoom-level-display"
                onClick={handleResetZoom}
                title="Reset Zoom to 100%"
                aria-label="Reset zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                className="viewer-ctrl-btn"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.0}
                title="Zoom In"
                aria-label="Zoom in"
              >
                🔍+
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              className="viewer-ctrl-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? '⤓ Normal' : '⤢ Fullscreen'}
            </button>

            {/* Open in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="viewer-ctrl-btn btn-new-tab"
              title="Open PDF directly in a new browser tab"
            >
              ↗ Open in Tab
            </a>

            {/* Download PDF Button */}
            <a
              href={pdfUrl}
              download="Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
              className="viewer-ctrl-btn btn-download-gold"
              title="Download high-resolution official 1-page vector PDF"
            >
              📥 Download PDF
            </a>

            {/* Close Button */}
            <button
              className="viewer-ctrl-btn btn-close-modal"
              onClick={onClose}
              title="Close Viewer (Esc)"
              aria-label="Close invitation viewer"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Center Stage: Card Display Area */}
        <div className="viewer-card-display-stage">
          {/* Card Page Presentation */}
          <div className="viewer-card-viewport">
            <div
              className="viewer-card-frame"
              style={{
                transform: `scale(${zoomLevel})`
              }}
            >
              <img
                src={coverPage.src}
                alt={coverPage.title}
                className="viewer-card-page-img"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Page Title & Download Hint */}
        <footer className="viewer-bottom-bar">
          <div className="page-caption-block">
            <div className="caption-title">{coverPage.title}</div>
            <div className="caption-subtitle">{coverPage.sub}</div>
          </div>

          <div className="viewer-thumbnail-strip">
            <a
              href="https://pushu1.github.io/teena-kuldeep-wedding/"
              target="_blank"
              rel="noopener noreferrer"
              className="thumb-btn active"
              title="Launch Website directly"
            >
              <span>🌐 Open Live Website</span>
            </a>
            <a
              href={pdfUrl}
              download="Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
              className="thumb-btn"
              title="Download PDF"
            >
              <span>📥 Download PDF</span>
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
