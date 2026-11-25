import React, { useState, useEffect, useRef } from 'react';

const YOUTUBE_VIDEO_ID = 'qJFPtcK8qBg';
const START_TIME_SECONDS = 30;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const hasInitiallyStartedRef = useRef(false);
  const pendingPlayRef = useRef(false);

  useEffect(() => {
    let checkInterval = null;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) return false;
      
      const container = document.getElementById('youtube-bgm-container');
      if (!container) return false;

      // Prevent duplicate initialization if iframe already created
      if (playerRef.current) return true;

      try {
        playerRef.current = new window.YT.Player('youtube-bgm-container', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            start: START_TIME_SECONDS,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            origin: window.location.origin
          },
          events: {
            onReady: () => {
              setIsReady(true);
              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                startPlayAt30();
              }
            },
            onStateChange: (event) => {
              // YT.PlayerState: PLAYING=1, PAUSED=2, BUFFERING=3, CUED=5, ENDED=0
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Loop back to 30s
                if (playerRef.current && playerRef.current.seekTo) {
                  playerRef.current.seekTo(START_TIME_SECONDS, true);
                  playerRef.current.playVideo();
                }
              }
            },
            onError: (err) => {
              console.warn('YouTube BGM Player notice:', err);
            }
          }
        });
        return true;
      } catch (err) {
        console.warn('Error setting up YT Player:', err);
        return false;
      }
    };

    if (!setupPlayer()) {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        setupPlayer();
      };

      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          if (setupPlayer()) {
            clearInterval(checkInterval);
          }
        }
      }, 400);
    }

    // Expose global window helpers
    window.playWeddingMusic = () => {
      startPlayAt30();
    };

    window.pauseWeddingMusic = () => {
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    };

    window.toggleWeddingMusic = () => {
      toggleMusic();
    };

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      window.playWeddingMusic = null;
      window.pauseWeddingMusic = null;
      window.toggleWeddingMusic = null;
    };
  }, []);

  const startPlayAt30 = () => {
    if (!playerRef.current || !playerRef.current.playVideo) {
      pendingPlayRef.current = true;
      return;
    }

    try {
      if (!hasInitiallyStartedRef.current) {
        // Enforce exact 30s start on initial playback
        playerRef.current.seekTo(START_TIME_SECONDS, true);
        hasInitiallyStartedRef.current = true;
      }
      playerRef.current.playVideo();
      setIsPlaying(true);
    } catch (e) {
      console.warn('Playback gesture required:', e);
    }
  };

  const toggleMusic = (e) => {
    if (e) e.stopPropagation();
    if (!playerRef.current || !playerRef.current.playVideo) {
      pendingPlayRef.current = true;
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        if (!hasInitiallyStartedRef.current) {
          playerRef.current.seekTo(START_TIME_SECONDS, true);
          hasInitiallyStartedRef.current = true;
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn('Toggle music error:', err);
    }
  };

  return (
    <>
      {/* Persistent Invisible YouTube IFrame Container */}
      <div
        id="youtube-bgm-container"
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: '1px',
          height: '1px',
          bottom: '0',
          right: '0',
          opacity: '0.001',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Floating Royal Music Control Pill (Burgundy & Antique Gold) */}
      <aside className="royal-music-aside" aria-label="Royal Wedding Background Music">
        <button
          className={`royal-music-pill-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Turn Royal Music OFF (Pause)' : 'Turn Royal Music ON (Play)'}
          title={isPlaying ? 'Turn Royal Music OFF (Pause)' : 'Turn Royal Music ON (Play from 00:30)'}
        >
          <span className="pill-music-icon" aria-hidden="true">♪</span>
          <span className="pill-title-text">ROYAL MUSIC</span>
          
          <span className="pill-status-badge">
            <span className={`status-dot ${isPlaying ? 'dot-on' : 'dot-off'}`}></span>
            <span className="status-label">{isPlaying ? 'ON' : 'OFF'}</span>
          </span>

          {isPlaying && (
            <span className="pill-mini-equalizer" aria-hidden="true">
              <span className="eq-bar bar-1"></span>
              <span className="eq-bar bar-2"></span>
              <span className="eq-bar bar-3"></span>
            </span>
          )}
        </button>
      </aside>
    </>
  );
}
