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
    if (!taskId) {
      navigate('/style-selection');
      return;
    }

    const pollProgress = async () => {
      try {
        const response = await checkProgress(taskId);
        
        if (response.progress !== undefined) {
          setProgress(response.progress);
          
          // Se chegou a 100% e tem URLs das imagens
          if (response.progress === 100 && response.image_urls) {
            setIsLoading(false);
            // Salva as URLs das imagens geradas
            localStorage.setItem('generatedImages', JSON.stringify(response.image_urls));
            // Navega para a tela de resultados
            setTimeout(() => {
              navigate('/photo-selection');
            }, 1000);
            return;
          }
        }
        
        // Se ainda não terminou, continua verificando
        if (response.progress < 100) {
          setTimeout(pollProgress, 2000); // Verifica a cada 2 segundos
        }
        
      } catch (err) {
        console.error('Erro ao verificar progresso:', err);
        setError('Erro ao verificar progresso. Tente novamente.');
        setIsLoading(false);
      }
    };

    // Inicia o polling
    pollProgress();

    // Cleanup
    return () => {
      setIsLoading(false);
    };
  }, [navigate]);

  const getProgressMessage = () => {
    if (progress < 20) return 'Iniciando processamento...';
    if (progress < 40) return 'Analisando sua foto...';
    if (progress < 60) return 'Aplicando estilo profissional...';
    if (progress < 80) return 'Gerando variações...';
    if (progress < 100) return 'Finalizando imagens...';
    return 'Concluído!';
  };

  const getProgressColor = () => {
    if (progress < 30) return '#ff6b6b';
    if (progress < 60) return '#ffa726';
    if (progress < 90) return '#42a5f5';
    return '#66bb6a';
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
            <p className="progress-message">{getProgressMessage()}</p>
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
              <span className="progress-time">
                {progress < 50 ? 'Aguarde alguns minutos...' : 'Quase pronto!'}
              </span>
            </div>
          </div>

          <div className="loading-tips">
            <h3>Dicas enquanto aguarda:</h3>
            <ul>
              <li>✨ Suas fotos estão sendo processadas com IA de última geração</li>
              <li>🎨 Cada variação terá um estilo único e profissional</li>
              <li>📱 Você poderá escolher sua favorita na próxima tela</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
