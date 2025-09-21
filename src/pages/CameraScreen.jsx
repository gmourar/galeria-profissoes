import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPhoto } from '../services/photoService';
import '../styles/CameraScreen.css';

const CameraScreen = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [capturedBlob, setCapturedBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cameraKey, setCameraKey] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let activeStream;
    const startCamera = async () => {
      try {
        if (activeStream) {
          activeStream.getTracks().forEach(track => track.stop());
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });
        activeStream = stream;
        const video = videoRef.current;
        if (video) {
          if (video.srcObject) {
            video.srcObject = null;
          }
          video.srcObject = stream;
          const handleLoadedMetadata = async () => {
            try {
              if (video.paused) {
                await video.play();
              }
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            } catch (playError) {
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
          };
          video.addEventListener('loadedmetadata', handleLoadedMetadata);
        }
      } catch (err) {
        alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
      }
    };
    const timer = setTimeout(startCamera, 100);
    return () => {
      clearTimeout(timer);
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [cameraKey]);

  useEffect(() => {
    const checkAndRestartCamera = () => {
      const video = videoRef.current;
      if (video) {
        const hasNoStream = !video.srcObject;
        const isPaused = video.paused;
        const isEnded = video.ended;
        if (hasNoStream || (isPaused && !isEnded)) {
          setCameraKey(prev => prev + 1);
        }
      }
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(checkAndRestartCamera, 100);
      }
    };
    const handleFocus = () => {
      setTimeout(checkAndRestartCamera, 100);
    };
    setTimeout(checkAndRestartCamera, 500);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
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
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) {
          setIsCapturing(false);
          setCountdown(null);
          return;
        }
        const width = video.videoWidth || 1080;
        const height = video.videoHeight || 1920;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCapturedBlob(blob);
              const reader = new FileReader();
              reader.onloadend = () => {
                setPhoto(reader.result);
                setIsCapturing(false);
                setCountdown(null);
              };
              reader.readAsDataURL(blob);
            } else {
              setIsCapturing(false);
              setCountdown(null);
              alert('Falha ao capturar a foto.');
            }
          },
          'image/jpeg',
          0.92
        );
      }
    }, 1000);
  };

  const handleContinue = () => {
    if (!capturedBlob) return;
    setIsUploading(true);
    setUploadProgress(0);
    uploadPhoto(
      capturedBlob,
      (progress) => {
        setUploadProgress(progress);
      },
      (result) => {
        const photoData = {
          photoId: result.id,
          nome: result.nome,
          original_url: result.original_url,
          ia_url: result.ia_url,
          quantidade: result.quantidade,
          impressa: result.impressa
        };
        localStorage.setItem('uploadedPhoto', JSON.stringify(photoData));
        setIsUploading(false);
        setUploadProgress(0);
        navigate('/gender-selection');
      },
      (error) => {
        setIsUploading(false);
        setUploadProgress(0);
        alert('Erro ao enviar foto. Tente novamente.');
      }
    );
  };

  const handleRetake = () => {
    window.location.reload();
  };

  return (
    <div className="camera-screen">
      <div className="camera-logo-container">
        <img src="/src/assets/villa11.png" alt="Logo Villa" className="camera-logo" />
      </div>
      <div className="camera-container">
        <div className="camera-preview">
          {photo ? (
            <img src={photo} alt="Foto capturada" className="captured-photo" />
          ) : (
            <video
              key={cameraKey}
              ref={videoRef}
              className="camera-video"
              autoPlay
              muted
              playsInline
            />
          )}
        </div>
      </div>
      {photo ? (
        <div className="photo-modal">
          <div className="modal-content">
            <div className="modal-photo-preview">
              <img src={photo} alt="Foto capturada" className="modal-photo" />
            </div>
            <div className="modal-buttons">
              <button
                className="retake-button"
                onClick={handleRetake}
                disabled={isUploading}
              >
                Tirar novamente
              </button>
              <button
                className="continue-button"
                onClick={handleContinue}
                disabled={isUploading}
              >
                {isUploading ? `Enviando... ${uploadProgress}%` : 'Continuar'}
              </button>
            </div>
            {isUploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
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
            <div className="capture-options">
              <button className="capture-button" onClick={handleCapture}>
                Tirar foto
              </button>
            </div>
          )}
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraScreen;