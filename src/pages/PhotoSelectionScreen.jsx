import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSelectedPhoto } from '../services/photoService';
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
      url,
      style: data.style,
      generatedAt: new Date().toISOString(),
    }));

    setGeneratedPhotos(photos);
    setSelectionData(data);
  }, [navigate]);

  const handlePhotoSelect = (photoId) => {
    const photo = generatedPhotos.find((p) => p.id === photoId);
    setSelectedPhoto(photo);
    setShowPrintModal(true);
  };

  const handlePrintConfirm = async () => {
    if (selectedPhoto) {
      try {
        console.log('Foto selecionada para impressão:', selectedPhoto);

        const uploadedPhotoName = localStorage.getItem('uploadedPhotoName');
        if (!uploadedPhotoName) {
          throw new Error('Nome da foto original não encontrado');
        }

        const photoBaseName = uploadedPhotoName.replace(/\.(jpg|jpeg|png)$/i, '');
        let photoName;
        if (photoBaseName.startsWith('foto_')) {
          const photoNumber = photoBaseName.split('_').pop();
          photoName = `foto${photoNumber || '1'}`;
        } else if (photoBaseName.startsWith('foto')) {
          photoName = photoBaseName;
        } else {
          photoName = 'foto1';
        }

         console.log('Enviando para API:', {
           photoName,
           imageUrl: selectedPhoto.url
         });

         // Chama a API para salvar a foto selecionada
         const result = await saveSelectedPhoto(photoName, selectedPhoto.url);

         console.log('Resposta da API:', result);

         // Salva a foto selecionada no localStorage para a tela de impressão
         localStorage.setItem('selectedPhoto', JSON.stringify(selectedPhoto));

        navigate('/print');
      } catch (error) {
        console.error('Erro ao salvar foto selecionada:', error);
        alert('Erro ao enviar foto para impressão. Tente novamente.');
      }
    }
    setShowPrintModal(false);
  };

  const handlePrintCancel = () => {
    setShowPrintModal(false);
    setSelectedPhoto(null);
  };

  const handleStartOver = () => {
    // Limpa TODOS os dados do localStorage
    localStorage.removeItem('uploadedPhoto');
    localStorage.removeItem('uploadedPhotoName');
    localStorage.removeItem('uploadedPhotoUrl');
    localStorage.removeItem('selectedGender');
    localStorage.removeItem('selectionData');
    localStorage.removeItem('generatedPhotos');
    localStorage.removeItem('generatedImages');
    localStorage.removeItem('selectedPhoto');
    localStorage.removeItem('aiTaskId');
    localStorage.removeItem('mockProgress');

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
        <div className="logo-container">
          {/* Se a logo estiver em /public, use /villa11.png. 
             Se estiver em src/assets, importe com import logo from '...'; */}
          <img src="/villa11.png" alt="Logo Villa" className="brand-logo" />
        </div>

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
                <div className="photo-frame">
                  <img
                    src={photo.url}
                    alt={`Foto profissional ${photo.id}`}
                    className="photo-image"
                  />
                </div>
                <div className="photo-overlay">
                  <div className="selection-indicator">Imprimir</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="start-over-button" onClick={handleStartOver}>
            Começar Novamente
          </button>
        </div>

        <div className="style-info">
          <p>
            Gênero:{' '}
            <strong>{selectionData.gender ? selectionData.gender : '—'}</strong>
          </p>
        </div>
      </div>

      {/* Modal de Impressão */}
      {showPrintModal && selectedPhoto && (
        <div className="print-modal">
          <div className="print-modal-content">
            <div className="print-modal-header">
              <h3>Deseja salvar esta foto?</h3>
            </div>

            <div className="print-modal-body">
              <div className="print-preview">
                <img src={selectedPhoto.url} alt="Foto selecionada" />
              </div>
              <p>Esta foto será enviada para impressão.</p>
            </div>

            <div className="print-modal-buttons">
              <button className="print-cancel-button" onClick={handlePrintCancel}>
                Cancelar
              </button>
              <button className="print-confirm-button" onClick={handlePrintConfirm}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSelectionScreen;

