import React, { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ audioSrc = 'assets/wedding_bgm.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const toggleMusic = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.warn('Playback gesture required:', err);
      });
    }
  };

  return (
    <>
      <audio id="bgm-player" ref={audioRef} src={audioSrc} loop preload="auto" />
      
      <aside className="music-player-aside" aria-label="Royal Wedding Music">
        <button
          className={`floating-music-btn ${isPlaying ? 'is-playing' : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
          title={isPlaying ? 'Pause Royal Instrumental Music' : 'Play Royal Instrumental Music'}
        >
          <div className="music-btn-glow"></div>
          {isPlaying ? (
            <div className="audio-equalizer">
              <span className="eq-bar bar-1"></span>
              <span className="eq-bar bar-2"></span>
              <span className="eq-bar bar-3"></span>
            </div>
          ) : (
            <span className="music-note-icon">🎵</span>
          )}
        </button>
      </aside>
    </>
  );
}
