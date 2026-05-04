import { ReactNode, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [videoPlaying, setVideoPlaying] = useState(false); // start false until actually playing
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = async () => {
      try {
        await video.play();
        setVideoPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked, waiting for interaction...", err);
        setVideoPlaying(false);
      }
    };

    // Attempt to play immediately
    playVideo();
    
    // Also try when data is loaded
    video.addEventListener('loadeddata', playVideo);

    // Re-attempt on user interaction
    const unlock = () => {
      if (video.paused) {
        playVideo();
      }
    };

    // Many iOS users scroll and touch, use these to trigger playback
    document.addEventListener('touchstart', unlock, { passive: true });
    document.addEventListener('click', unlock);
    document.addEventListener('scroll', unlock, { passive: true });
    
    // Also handle visibility changes
    const onVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
      document.removeEventListener('scroll', unlock);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen viewport-border">

      {/* Fond fixe — vidéo ou fallback selon capacité iOS */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: -1,
          overflow: 'hidden',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      >
        {/* Fallback : image affichée si la vidéo est bloquée (iOS) ou en cours de chargement */}
        <img
          src="/IMG-20260428-WA0128.jpg"
          alt="Ambiance Pollo Gigante"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] pointer-events-none"
          style={{
            opacity: videoPlaying ? 0 : 0.6,
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)'
          }}
        />

        {/* Vidéo */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] pointer-events-none"
          style={{
            opacity: videoPlaying ? 0.6 : 0,
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)'
          }}
        >
          <source src="/VID-20260428-WA0031.mp4" type="video/mp4" />
        </video>

        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13, 13, 13, 0.4)' }} />
      </div>

      <PublicNavbar />
      <main className="relative z-10">{children}</main>

      <footer className="py-6 bg-white/10 backdrop-blur-md border-t border-ink/5 relative z-10">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-2xl text-ink font-light italic">Pollo Gigante</h2>
              <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-ink/40">Pontedera • Via Roma 11 • Est. 1994</p>
            </div>

            <Link
              to="/reservations"
              className="flex items-center justify-center min-w-[120px] px-6 py-2 bg-ink text-white text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-bordeaux transition-all"
            >
              Prenota un tavolo
            </Link>

            <div className="flex flex-col items-center md:items-end gap-1 text-[8px] uppercase tracking-[0.3em] text-ink/30">
              <p>
                <Link to="/admin/login" className="hover:text-ink transition-colors">©</Link> 2024 Pollo Gigante
              </p>
              <p className="tracking-[0.5em] font-bold text-ink/20">PUER DEI</p>
              <span className="text-bordeaux font-bold pt-1">12:00 - 23:00</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
