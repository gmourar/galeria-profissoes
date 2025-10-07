import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_STYLES, getPrompt, getStyleReference } from '../data/prompts';
import { generatePhotoWithAI, buildPhotoUrl, resetMockProgress } from '../services/photoService';
import '../styles/StyleSelectionScreen.css';

// Mapa de IDs de estilo para as pastas em /assets
const ASSET_FOLDER_MAP = {
  CLAY_OFFICE: 'CLAY OFFICE',
  CORRETOR_FUTURO: 'CORRETOR DO FUTURO',
  HOLOGRAMAS_SEGUROS: 'HOLOGRAMA DE SEGUROS',
  LIVRARIA_SEGUROS: 'LIVRARIA DE SEGUROS',
  PALESTRANDO: 'PALESTRANDO',
  PODERES: 'PODERES',
  SALA_FUTURO: 'SALA DO FUTURO',
  SALA_PIXAR: 'SALA PIXAR',
  SEGUROS_ONLINE: 'SEGUROS ONLINE',
};

const StyleSelectionScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const navigate = useNavigate();

  const uploadedPhotoData = JSON.parse(localStorage.getItem('uploadedPhoto') || '{}');
  const selectedGender = localStorage.getItem('selectedGender');

  useEffect(() => {
    console.log('=== STYLE SELECTION SCREEN (RUNWAY) ===');
    console.log('uploadedPhotoData:', uploadedPhotoData);
    console.log('selectedGender:', selectedGender);

    if (!uploadedPhotoData.photoId || !selectedGender) {
      console.log('Dados insuficientes, redirecionando para câmera');
      navigate('/camera');
    }
  }, [navigate, uploadedPhotoData.photoId, selectedGender]);

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handleConfirm = async () => {
    if (!selectedStyle || !uploadedPhotoData.photoId || !selectedGender) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    resetMockProgress();

    try {
      const photoName = localStorage.getItem('uploadedPhotoName');
      if (!photoName) {
        throw new Error('Nome da foto não encontrado');
      }

      // 1. Constrói a URL S3 da foto original (foto tirada na câmera)
      const s3PhotoUrl = buildPhotoUrl(photoName);

      // 2. Obtém o prompt textual (sem URLs)
      const prompt = getPrompt(selectedGender, selectedStyle);

      // 3. Obtém a URL da imagem de referência de estilo
      const styleRefUrl = getStyleReference(selectedGender, selectedStyle);

      console.log('=== DADOS PARA RUNWAY ===');
      console.log('Foto do usuário (s3Url):', s3PhotoUrl);
      console.log('Referência de estilo (styleRef):', styleRefUrl);
      console.log('Prompt:', prompt);
      console.log('Gender:', selectedGender);
      console.log('Style:', selectedStyle);

      // Salva os dados da seleção
      const selectionData = {
        gender: selectedGender,
        style: selectedStyle,
        prompt: prompt,
        originalPhoto: uploadedPhotoData,
        s3PhotoUrl: s3PhotoUrl,
        styleRefUrl: styleRefUrl
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

      console.log('Enviando para Runway API...');
      console.log('Prompt:', prompt);
      console.log('Foto do usuário:', s3PhotoUrl);
      console.log('Referência de estilo:', styleRefUrl);
      console.log('Aspect Ratio: 9:16 (retrato)');

      // IMPORTANTE: Envia para o backend Runway
      // O backend vai receber:
      // 1. prompt: texto descritivo
      // 2. s3Url: URL da FOTO DO USUÁRIO (tirada na câmera)
      // 3. styleRefUrl: URL da IMAGEM DE REFERÊNCIA (estilo visual)
      // 4. aspect_ratio: proporção da imagem
      //
      // O backend vai:
      // - Baixar AMBAS as URLs
      // - Converter para data URI
      // - Enviar para Runway em reference_images: [foto_usuario, ref_estilo]

      const aiResponse = await generatePhotoWithAI(
        prompt,           // Texto descritivo
        s3PhotoUrl,       // Foto do usuário (rosto/pessoa)
        styleRefUrl,      // Referência de estilo (ambiente/cenário)
        '9:16'           // Aspect ratio
      );

      clearInterval(progressInterval);
      setGenerationProgress(100);

      console.log('✅ Task ID recebido:', aiResponse.task_id);

      // Salva o task_id para polling
      localStorage.setItem('aiTaskId', aiResponse.task_id);

      // Navega para a tela de loading
      setTimeout(() => {
        console.log('Navegando para loading screen');
        navigate('/loading');
      }, 1000);

    } catch (error) {
      console.error('❌ Erro ao gerar fotos:', error);
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
            const genderCode = selectedGender === 'masculino' ? 'MASC' : 'FEM';
            const professionFolder = ASSET_FOLDER_MAP[style.id] || style.id;
            const imagePath = new URL(`../assets/${professionFolder}/${genderCode}.png`, import.meta.url).href;

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
                    alt={`${style.name} - ${genderCode}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
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
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <div className="progress-info">
              <h3>Gerando suas fotos com Runway...</h3>
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
            Gerar Fotos
          </button>
        )}
      </div>
    </div>
  );
};

export default StyleSelectionScreen;