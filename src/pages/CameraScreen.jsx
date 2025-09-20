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
  const [useTestPhoto, setUseTestPhoto] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let activeStream;
    let isInitialized = false;
    
    const startCamera = async () => {
      if (isInitialized) return;
      
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
          // Limpa srcObject anterior se existir
          if (video.srcObject) {
            video.srcObject = null;
          }
          
          video.srcObject = stream;
          
          // Aguarda o vídeo estar pronto antes de tentar play
          const handleLoadedMetadata = async () => {
            try {
              if (video.paused) {
                await video.play();
              }
              isInitialized = true;
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            } catch (playError) {
              console.warn('Erro ao reproduzir vídeo:', playError);
              // Continua mesmo com erro de play
              isInitialized = true;
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
          };
          
          video.addEventListener('loadedmetadata', handleLoadedMetadata);
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
        
        // Salva dados com estrutura correta
        const photoData = {
          photoId: result.id,
          nome: result.nome,
          original_url: result.original_url,
          ia_url: result.ia_url,
          quantidade: result.quantidade,
          impressa: result.impressa
        };
        
        console.log('Salvando dados da foto:', photoData);
        localStorage.setItem('uploadedPhoto', JSON.stringify(photoData));
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
    setUseTestPhoto(false);
  };

  const handleUseTestPhoto = async () => {
    try {
      console.log('Usando foto de teste...');
      setUseTestPhoto(true);
      
      // Carrega a foto de teste
      const testPhotoUrl = '/src/assets/ramirex.jpg';
      const response = await fetch(testPhotoUrl);
      const blob = await response.blob();
      
      // Converte para data URL para preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setCapturedBlob(blob);
        console.log('Foto de teste carregada:', testPhotoUrl);
      };
      reader.readAsDataURL(blob);
      
    } catch (error) {
      console.error('Erro ao carregar foto de teste:', error);
      alert('Erro ao carregar foto de teste');
    }
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
            <div className="capture-options">
              <button className="capture-button" onClick={handleCapture}>
                Tirar foto
              </button>
              <button className="test-photo-button" onClick={handleUseTestPhoto}>
                Usar foto de teste
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
