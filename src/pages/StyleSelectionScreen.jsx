import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_STYLES, getPrompt } from '../data/prompts';
import { generatePhotos } from '../services/photoService';
import '../styles/StyleSelectionScreen.css';

const StyleSelectionScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const navigate = useNavigate();

  // Recupera dados do localStorage
  const uploadedPhotoData = JSON.parse(localStorage.getItem('uploadedPhoto') || '{}');
  const selectedGender = localStorage.getItem('selectedGender');

  useEffect(() => {
    // Se não há dados necessários, volta para a câmera
    if (!uploadedPhotoData.photoId || !selectedGender) {
      navigate('/camera');
    }
  }, [navigate, uploadedPhotoData, selectedGender]);

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handleConfirm = async () => {
    if (!selectedStyle || !uploadedPhotoData.photoId || !selectedGender) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Obtém o prompt baseado no gênero e estilo
      const prompt = getPrompt(
        selectedGender,
        selectedStyle,
        uploadedPhotoData.url,
        'https://koala.sh/api/image/v2-c9lyf-7aovd.jpg?width=1216&height=832&dream' // URL de referência padrão
      );

      // Salva os dados da seleção
      const selectionData = {
        gender: selectedGender,
        style: selectedStyle,
        prompt: prompt,
        originalPhoto: uploadedPhotoData
      };
      localStorage.setItem('selectionData', JSON.stringify(selectionData));

      // Simula progresso da geração
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Envia prompt para o backend gerar as fotos
      const generatedPhotos = await generatePhotos(prompt);
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Salva as fotos geradas
      localStorage.setItem('generatedPhotos', JSON.stringify(generatedPhotos));

      // Navega para a tela de seleção de fotos
      setTimeout(() => {
        navigate('/photo-selection');
      }, 1000);

    } catch (error) {
      console.error('Erro ao gerar fotos:', error);
      setIsGenerating(false);
      setGenerationProgress(0);
      alert('Erro ao gerar fotos. Tente novamente.');
    }
  };

  return (
    <div className="style-selection-screen">
      <div className="style-container">
        <h2>Escolha o estilo da sua foto profissional:</h2>
        
        <div className="styles-grid">
          {AVAILABLE_STYLES.map((style) => (
            <button
              key={style.id}
              className={`style-button ${selectedStyle === style.id ? 'selected' : ''}`}
              onClick={() => handleStyleSelect(style.id)}
              disabled={isGenerating}
            >
              <div className="style-icon">{style.icon}</div>
              <div className="style-name">{style.name}</div>
            </button>
          ))}
        </div>

        {isGenerating ? (
          <div className="generation-progress">
            <div className="progress-info">
              <h3>Gerando suas fotos profissionais...</h3>
              <p>Isso pode levar alguns minutos</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>
            <div className="progress-percentage">{generationProgress}%</div>
          </div>
        ) : (
          <button 
            className="confirm-button"
            disabled={!selectedStyle}
            onClick={handleConfirm}
          >
            Gerar Fotos Profissionais
          </button>
        )}
      </div>
    </div>
  );
};

export default StyleSelectionScreen;
