import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSelectedPhoto } from '../services/photoService';
import '../styles/PhotoSelectionScreen.css';

const PhotoSelectionScreen = () => {
  const [generatedPhotos, setGeneratedPhotos] = useState([]);
  const [selectionData, setSelectionData] = useState(null);
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

  const handleContinue = async () => {
    if (generatedPhotos.length === 0) {
      alert('Nenhuma foto disponível');
      return;
    }

    // Seleciona automaticamente a primeira (e única) foto
    const selectedPhoto = generatedPhotos[0];
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
    }
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
    localStorage.removeItem('savedIaUrl');

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
      <div className="photo-container single-photo-mode">
        <div className="header">
          <h2>Sua foto está pronta!</h2>
          <p>Confira o resultado abaixo:</p>
        </div>

        <div className="single-photo-display">
          <div className="photo-frame">
            <img
              src={generatedPhotos[0].url}
              alt="Foto gerada"
              className="photo-image"
            />
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="continue-button" 
            onClick={handleContinue}
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Continuar'}
          </button>
          
          <button 
            className="start-over-button" 
            onClick={handleStartOver}
            disabled={isSaving}
          >
            Começar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoSelectionScreen;