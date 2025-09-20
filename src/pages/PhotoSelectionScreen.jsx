import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PhotoSelectionScreen.css';

const PhotoSelectionScreen = () => {
  const [generatedPhotos, setGeneratedPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectionData, setSelectionData] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera dados do localStorage
    const imageUrls = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    const data = JSON.parse(localStorage.getItem('selectionData') || '{}');
    
    if (imageUrls.length === 0 || !data.style) {
      navigate('/camera');
      return;
    }
    
    // Converte URLs em objetos de foto
    const photos = imageUrls.map((url, index) => ({
      id: `generated_${index + 1}`,
      url: url,
      style: data.style,
      generatedAt: new Date().toISOString()
    }));
    
    setGeneratedPhotos(photos);
    setSelectionData(data);
  }, [navigate]);

  const handlePhotoSelect = (photoId) => {
    const photo = generatedPhotos.find(p => p.id === photoId);
    setSelectedPhoto(photo);
    setShowPrintModal(true);
  };

  const handlePrintConfirm = () => {
    if (selectedPhoto) {
      console.log('Foto selecionada para impressão:', selectedPhoto);
      alert('Foto enviada para impressão!');
      // Aqui seria implementada a lógica real de impressão
    }
    setShowPrintModal(false);
  };

  const handlePrintCancel = () => {
    setShowPrintModal(false);
    setSelectedPhoto(null);
  };

  const handleStartOver = () => {
    // Limpa todos os dados do localStorage
    localStorage.removeItem('uploadedPhoto');
    localStorage.removeItem('selectedGender');
    localStorage.removeItem('selectionData');
    localStorage.removeItem('generatedPhotos');
    
    navigate('/camera');
  };

  if (!selectionData || generatedPhotos.length === 0) {
    return (
      <div className="photo-selection-screen">
        <div className="loading-container">
          <h2>Carregando fotos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-selection-screen">
      <div className="photo-container">
        <div className="header">
          <h2>Suas fotos profissionais estão prontas!</h2>
          <p>Clique na foto que você mais gostou para imprimir:</p>
        </div>

        <div className="photos-grid">
          {generatedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item"
              onClick={() => handlePhotoSelect(photo.id)}
            >
              <div className="photo-wrapper">
                <img src={photo.url} alt={`Foto profissional ${photo.id}`} />
                <div className="photo-overlay">
                  <div className="selection-indicator">
                    Imprimir
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button 
            className="start-over-button"
            onClick={handleStartOver}
          >
            Começar Novamente
          </button>
        </div>

        <div className="style-info">
          <p>Estilo selecionado: <strong>{selectionData.style}</strong></p>
          <p>Gênero: <strong>{selectionData.gender}</strong></p>
        </div>
      </div>

      {/* Modal de Impressão */}
      {showPrintModal && selectedPhoto && (
        <div className="print-modal">
          <div className="print-modal-content">
            <div className="print-modal-header">
              <h3>Deseja imprimir esta foto?</h3>
            </div>
            
            <div className="print-modal-body">
              <div className="print-preview">
                <img src={selectedPhoto.url} alt="Foto selecionada" />
              </div>
              <p>Esta foto será enviada para impressão.</p>
            </div>
            
            <div className="print-modal-buttons">
              <button 
                className="print-cancel-button"
                onClick={handlePrintCancel}
              >
                Cancelar
              </button>
              <button 
                className="print-confirm-button"
                onClick={handlePrintConfirm}
              >
                Sim, Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSelectionScreen;
