import React, { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ audioSrc = 'assets/wedding_audio_reference.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;

    // Optional autoplay on first user interaction anywhere on the window
    const handleFirstGesture = () => {
      if (!hasInteracted && audio && audio.paused) {
        setHasInteracted(true);
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Browser prevented autoplay without explicit button press; keep paused
        });
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
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
      }).catch(err => {
        console.warn('Audio play request interrupted:', err);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      <aside className="music-player-aside" aria-label="Royal Wedding Shehnai Music">
        <button
          className={`floating-music-btn ${isPlaying ? 'is-playing' : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
          title={isPlaying ? 'Pause Royal Wedding Music' : 'Play Royal Wedding Music'}
        >
          <div className="music-btn-glow"></div>
          {isPlaying ? (
            <div className="audio-equalizer">
              <span className="eq-bar bar-1"></span>
              <span className="eq-bar bar-2"></span>
              <span className="eq-bar bar-3"></span>
            </div>
          ) : (
            <span className="music-note-icon">♫</span>
          )}
        </button>
      </aside>
    </>
  );
}
