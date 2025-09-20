import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_STYLES, getPrompt } from '../data/prompts';
import { generatePhotoWithAI, getStyleReferenceUrl, buildPhotoUrl, resetMockProgress } from '../services/photoService';
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
    console.log('=== STYLE SELECTION SCREEN ===');
    console.log('uploadedPhotoData:', uploadedPhotoData);
    console.log('selectedGender:', selectedGender);
    console.log('uploadedPhotoData.photoId:', uploadedPhotoData.photoId);
    
    // Se não há dados necessários, volta para a câmera
    if (!uploadedPhotoData.photoId || !selectedGender) {
      console.log('Dados insuficientes, redirecionando para câmera');
      navigate('/camera');
    } else {
      console.log('Dados OK, exibindo tela de seleção de profissões');
    }
  }, [navigate]);

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handleConfirm = async () => {
    if (!selectedStyle || !uploadedPhotoData.photoId || !selectedGender) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Reseta o progresso mock para nova geração
    resetMockProgress();

    try {
      // Obtém o nome da foto salvo no localStorage
      const photoName = localStorage.getItem('uploadedPhotoName');
      if (!photoName) {
        throw new Error('Nome da foto não encontrado');
      }

      // Constrói a URL da foto original
      const photoUrl = buildPhotoUrl(photoName);
      
      // Obtém a URL da referência de estilo
      const styleRef = getStyleReferenceUrl(selectedStyle, selectedGender);

      // Obtém o prompt baseado no gênero e estilo
      const prompt = getPrompt(
        selectedGender,
        selectedStyle,
        photoUrl,
        styleRef
      );

      // Salva os dados da seleção
      const selectionData = {
        gender: selectedGender,
        style: selectedStyle,
        prompt: prompt,
        originalPhoto: uploadedPhotoData,
        photoUrl: photoUrl,
        styleRef: styleRef
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
      const aiResponse = await generatePhotoWithAI(prompt, photoUrl, styleRef);
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Salva a resposta da IA (task_id)
      localStorage.setItem('aiTaskId', aiResponse.task_id);

      // Navega para a tela de loading
      setTimeout(() => {
        navigate('/loading');
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
