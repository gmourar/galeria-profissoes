import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();
  const handleStart = () => navigate('/camera');

  const videoSrc = new URL('../assets/ensplash.mp4', import.meta.url).href;

  return (
    <div
      className="splash-screen"
      onClick={handleStart}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleStart();
      }}
    >
      <video
        className="splash-video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
      />
      <div className="splash-overlay">
        <div className="splash-brand">
          {/* Se desejar, pode-se trocar por uma imagem de logo */}
        </div>
        <div className="splash-instruction">Toque para começar</div>
      </div>
    </div>
  );
};

export default SplashScreen;
