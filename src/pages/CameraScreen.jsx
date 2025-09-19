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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let activeStream;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });
        activeStream = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
        }
      } catch (err) {
        console.error('Erro ao acessar a câmera:', err);
        alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
      }
    };
    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
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
        // Captura frame do vídeo no canvas
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

        // Converte para Blob (upload) e DataURL (preview)
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
        console.log('Upload realizado com sucesso:', result);
        setIsUploading(false);
        setUploadProgress(0);
        localStorage.setItem('uploadedPhoto', JSON.stringify(result));
        navigate('/gender-selection');
      },
      (error) => {
        console.error('Erro no upload:', error);
        setIsUploading(false);
        setUploadProgress(0);
        alert('Erro ao enviar foto. Tente novamente.');
      }
    );
  };

  const handleRetake = () => {
    setPhoto(null);
    setCapturedBlob(null);
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
            <video ref={videoRef} className="camera-video" autoPlay muted playsInline />
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
            <button className="capture-button" onClick={handleCapture}>
              Tirar foto
            </button>
          )}
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraScreen;
