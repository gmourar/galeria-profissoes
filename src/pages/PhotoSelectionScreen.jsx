import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSelectedPhoto } from '../services/photoService';
import '../styles/PhotoSelectionScreen.css';

const PhotoSelectionScreen = () => {
  const [generatedPhotos, setGeneratedPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectionData, setSelectionData] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
    if (!selectedPhoto) {
      alert('Nenhuma foto selecionada');
      return;
    }

    setIsSaving(true);

    try {
      console.log('Foto selecionada para salvar no banco:', selectedPhoto);

      const uploadedPhotoName = localStorage.getItem('uploadedPhotoName');
      if (!uploadedPhotoName) {
        throw new Error('Nome da foto original não encontrado');
      }

      // Extrai o nome correto da foto para salvar no banco
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

      console.log('Salvando foto no banco:', {
        photoName,
        imageUrl: selectedPhoto.url
      });

      // IMPORTANTE: Salva a foto selecionada no banco com gênero e tema (style)
      const result = await saveSelectedPhoto(photoName, selectedPhoto.url, {
        gender: selectionData?.gender,
        style: selectionData?.style
      });

      console.log('Foto salva no banco com sucesso:', result);

      // Salva no localStorage o ia_url retornado pela API
      if (result && result.ia_url) {
        localStorage.setItem('savedIaUrl', result.ia_url);
      } else {
        // fallback: salva a própria URL selecionada
        localStorage.setItem('savedIaUrl', selectedPhoto.url);
      }

      // Remove a foto do localStorage pois agora vamos buscar do banco
      localStorage.removeItem('selectedPhoto');

      // Navega para a tela de impressão
      navigate('/print');

    } catch (error) {
      console.error('Erro ao salvar foto no banco:', error);
      alert('Erro ao salvar foto. Tente novamente.');
    } finally {
      setIsSaving(false);
      setShowPrintModal(false);
    }
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
    localStorage.removeItem('savedIaUrl'); // também limpa a URL salva

    navigate('/');
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
          <h2>Suas fotos estão prontas!</h2>
          <p>Clique na foto que você mais gostou para salvar:</p>
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
                    alt={`Foto ${photo.id}`}
                    className="photo-image"
                  />
                </div>
                <div className="photo-overlay">
                  <div className="selection-indicator">Selecionar</div>
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

      </div>

      {/* Modal de Confirmação */}
      {showPrintModal && selectedPhoto && (
        <div className="print-modal">
          <div className="print-modal-content">
            <div className="print-modal-header">
              <h3>Confirmar seleção</h3>
            </div>

            <div className="print-modal-body">
              <div className="print-preview">
                <img src={selectedPhoto.url} alt="Foto selecionada" />
              </div>
              <p>Deseja continuar com esta foto?</p>
              {isSaving && <p><strong>Salvando foto...</strong></p>}
            </div>

            <div className="print-modal-buttons">
              <button 
                className="print-cancel-button" 
                onClick={handlePrintCancel}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button 
                className="print-confirm-button" 
                onClick={handlePrintConfirm}
                disabled={isSaving}
              >
                {isSaving ? 'Salvando...' : 'Continuar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSelectionScreen;
