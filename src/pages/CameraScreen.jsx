import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CameraScreen.css';

const CameraScreen = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular acesso à câmera DSLR conectada
    // Em produção, aqui seria a integração real com a câmera
    const video = videoRef.current;
    if (video) {
      // Simular stream de vídeo (placeholder)
      video.style.backgroundColor = '#f0f0f0';
      video.style.border = '2px solid #333';
    }
  }, []);

  const handleCapture = () => {
    setIsCapturing(true);
    setCountdown(3);

    let counter = 3;
    const interval = setInterval(() => {
      counter--;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(interval);
        
        // Simular captura da foto
        const mockPhoto = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
        setPhoto(mockPhoto);
        setIsCapturing(false);
        setCountdown(null);
      }
    }, 1000);
  };

  const handleContinue = () => {
    navigate('/gender-selection');
  };

  const handleRetake = () => {
    setPhoto(null);
    setIsCapturing(false);
    setCountdown(null);
  };

  return (
    <div className="camera-screen">
      <div className="camera-container">
        <div className="camera-preview">
          {photo ? (
            <img src={photo} alt="Foto capturada" className="captured-photo" />
          ) : (
            <div className="video-placeholder">
              <div className="camera-icon">CAMERA</div>
              <p>Preview da Câmera DSLR</p>
            </div>
          )}
        </div>
      </div>

      {photo ? (
        <div className="photo-modal">
          <div className="modal-content">
            <div className="modal-buttons">
              <button className="retake-button" onClick={handleRetake}>
                Tirar novamente
              </button>
              <button className="continue-button" onClick={handleContinue}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="capture-section">
          {isCapturing ? (
            <div className="countdown-display">
              <div className="countdown-number">{countdown}</div>
              <p>Tirando foto em...</p>
            </div>
          ) : (
            <button className="capture-button" onClick={handleCapture}>
              Tirar foto
            </button>
          )}
        </div>
      )}

      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraScreen;
