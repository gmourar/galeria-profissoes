// src/pages/StyleSelectionScreen.jsx (ou .tsx se usar TS)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_STYLES, getPrompt, getStyleReference } from '../data/prompts';
import { generatePhotoWithAI, buildPhotoUrl, resetMockProgress } from '../services/photoService';
import '../styles/StyleSelectionScreen.css';

// 🔁 Novo: mapeia ID -> pasta exata em /assets (com acentos/espaços)
const STYLE_ASSET_FOLDER = {
  AGENCIA: 'AGÊNCIA',
  CLINICA_DE_ANIMAIS: 'CLÍNICA DE ANIMAIS',
  CONSTRUCAO: 'CONSTRUCAO',
  COZINHA: 'COZINHA',
  ESPORTE: 'ESPORTE',
  FABRICA: 'FÁBRICA',
  HOSPITAL: 'HOSPITAL',
  INFLUENCIADOR: 'INFLUENCIADOR',
  LABORATORIO: 'LABORATÓRIO',
  OFFICE: 'OFFICE',
  SALA_DE_AULA: 'SALA DE AULA',
  TECH: 'TECH',
};

const StyleSelectionScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const navigate = useNavigate();

  const uploadedPhotoData = JSON.parse(localStorage.getItem('uploadedPhoto') || '{}');
  const selectedGender = localStorage.getItem('selectedGender');

  useEffect(() => {
    if (!uploadedPhotoData.photoId || !selectedGender) {
      navigate('/camera');
    }
  }, [navigate, uploadedPhotoData.photoId, selectedGender]);

  const handleStyleSelect = (styleId) => setSelectedStyle(styleId);

  const handleConfirm = async () => {
    if (!selectedStyle || !uploadedPhotoData.photoId || !selectedGender) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    resetMockProgress();

    try {
      const photoName = localStorage.getItem('uploadedPhotoName');
      if (!photoName) throw new Error('Nome da foto não encontrado');

      const s3PhotoUrl = buildPhotoUrl(photoName);
      const prompt = getPrompt(selectedGender, selectedStyle);
      const styleRefUrl = getStyleReference(selectedGender, selectedStyle);

      const selectionData = {
        gender: selectedGender,
        style: selectedStyle,
        prompt,
        originalPhoto: uploadedPhotoData,
        s3PhotoUrl,
        styleRefUrl,
      };
      localStorage.setItem('selectionData', JSON.stringify(selectionData));

      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const aiResponse = await generatePhotoWithAI(
        prompt,
        s3PhotoUrl,
        styleRefUrl,
        '9:16'
      );

      clearInterval(progressInterval);
      setGenerationProgress(100);
      localStorage.setItem('aiTaskId', aiResponse.task_id);

      setTimeout(() => navigate('/loading'), 1000);
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
        <h2>Escolha o estilo da sua foto:</h2>

        <div className="styles-grid">
          {AVAILABLE_STYLES.map((style) => {
            const folder = STYLE_ASSET_FOLDER[style.id] || style.id; // fallback: usa o próprio id
            const fileName = selectedGender === 'masculino' ? 'MASC.png' : 'FEM.png';
            const imagePath = new URL(`../assets/${folder}/${fileName}`, import.meta.url).href;

            return (
              <button
                key={style.id}
                className={`style-button ${selectedStyle === style.id ? 'selected' : ''}`}
                onClick={() => handleStyleSelect(style.id)}
                disabled={isGenerating}
              >
                <div className="style-image">
                  <img
                    src={imagePath}
                    alt={`${style.name} - ${fileName.replace('.png', '')}`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fb = e.currentTarget.nextSibling;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div className="style-fallback" style={{ display: 'none' }}>
                    {style.name}
                  </div>
                </div>
                <div className="style-name">{style.name}</div>
              </button>
            );
          })}
        </div>

        {isGenerating ? (
          <div className="generation-progress">
            <div className="progress-info">
              <h3>Salvando estilo...</h3>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${generationProgress}%` }} />
            </div>
            <div className="progress-percentage">{generationProgress}%</div>
          </div>
        ) : (
          <button className="confirm-button" disabled={!selectedStyle} onClick={handleConfirm}>
            Gerar Fotos
          </button>
        )}
      </div>
    </div>
  );
};

export default StyleSelectionScreen;
