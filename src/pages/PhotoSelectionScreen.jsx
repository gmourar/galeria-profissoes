import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PhotoSelectionScreen.css';

const PhotoSelectionScreen = () => {
  const [generatedPhotos, setGeneratedPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectionData, setSelectionData] = useState(null);
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
    setSelectedPhotos(prev => {
      if (prev.includes(photoId)) {
        // Remove se já estiver selecionada
        return prev.filter(id => id !== photoId);
      } else {
        // Adiciona se não estiver selecionada (máximo 4)
        return prev.length < 4 ? [...prev, photoId] : prev;
      }
    });
  };

  const handleDownload = () => {
    if (selectedPhotos.length === 0) {
      alert('Selecione pelo menos uma foto para download');
      return;
    }

    // Simula download das fotos selecionadas
    const photosToDownload = generatedPhotos.filter(photo => 
      selectedPhotos.includes(photo.id)
    );
    
    console.log('Fotos selecionadas para download:', photosToDownload);
    alert(`${selectedPhotos.length} foto(s) selecionada(s) para download!`);
    
    // Aqui seria implementada a lógica real de download
    // Por exemplo, criar um ZIP com as fotos ou fazer download individual
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
          <p>Selecione até 4 fotos que você mais gostou:</p>
          <div className="selection-info">
            <span className="selected-count">{selectedPhotos.length}/4 fotos selecionadas</span>
          </div>
        </div>

        <div className="photos-grid">
          {generatedPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`photo-item ${selectedPhotos.includes(photo.id) ? 'selected' : ''}`}
              onClick={() => handlePhotoSelect(photo.id)}
            >
              <div className="photo-wrapper">
                <img src={photo.url} alt={`Foto profissional ${photo.id}`} />
                <div className="photo-overlay">
                  <div className="selection-indicator">
                    {selectedPhotos.includes(photo.id) ? '✓' : '+'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button 
            className="download-button"
            onClick={handleDownload}
            disabled={selectedPhotos.length === 0}
          >
            Baixar Fotos Selecionadas ({selectedPhotos.length})
          </button>
          
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
    </div>
  );
};

export default PhotoSelectionScreen;
