import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProgress } from '../services/photoService';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const taskId = localStorage.getItem('aiTaskId');
    console.log('=== LOADING SCREEN INICIADA ===');
    console.log('Task ID recuperado:', taskId);
    
    if (!taskId) {
      console.log('❌ Task ID não encontrado, redirecionando para style-selection');
      navigate('/style-selection');
      return;
    }

    const pollProgress = async () => {
      try {
        console.log('=== VERIFICANDO PROGRESSO ===');
        console.log('Task ID:', taskId);
        console.log('URL da requisição:', `http://127.0.0.1:8000/progress/${taskId}`);
        
        const response = await checkProgress(taskId);
        
        console.log('=== RESPOSTA DO PROGRESSO ===');
        console.log('Resposta completa:', response);
        console.log('Progress:', response.progress);
        console.log('Image URLs:', response.image_urls);
        
        if (response.progress !== undefined) {
          setProgress(response.progress);
          console.log('Progresso atualizado para:', response.progress + '%');
          
          // Se chegou a 100% e tem URLs das imagens
          if (response.progress === 100 && response.image_urls) {
            console.log('✅ PROGRESSO COMPLETO!');
            console.log('URLs das imagens:', response.image_urls);
            setIsLoading(false);
            // Salva as URLs das imagens geradas
            localStorage.setItem('generatedImages', JSON.stringify(response.image_urls));
            console.log('URLs salvas no localStorage');
            // Navega para a tela de resultados
            setTimeout(() => {
              console.log('Navegando para photo-selection');
              navigate('/photo-selection');
            }, 1000);
            return;
          }
        }
        
        // Se ainda não terminou, continua verificando
        if (response.progress < 100) {
          console.log('Progresso < 100%, verificando novamente em 2 segundos...');
          setTimeout(pollProgress, 2000); // Verifica a cada 2 segundos
        }
        
      } catch (err) {
        console.error('❌ ERRO AO VERIFICAR PROGRESSO:', err);
        console.error('Detalhes do erro:', err.message);
        setError('Erro ao verificar progresso. Tente novamente.');
        setIsLoading(false);
      }
    };

    // Inicia o polling
    console.log('Iniciando polling de progresso...');
    pollProgress();

    // Cleanup
    return () => {
      console.log('Cleanup do polling');
      setIsLoading(false);
    };
  }, [navigate]);

  const getProgressColor = () => {
    return '#ffffff'; // Cor branca consistente com outras páginas
  };

  if (error) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Ops! Algo deu errado</h2>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-animation">
            <div className="spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
          </div>
          
          <div className="loading-text">
            <h2>Gerando suas fotos profissionais</h2>
          </div>

          <div className="progress-section">
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: getProgressColor()
                }}
              ></div>
            </div>
            <div className="progress-info">
              <span className="progress-percentage">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
