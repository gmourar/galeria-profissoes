import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProgress } from '../services/photoService';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeoutCount, setTimeoutCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const taskId = localStorage.getItem('aiTaskId');
    console.log('=== LOADING SCREEN RUNWAY INICIADA ===');
    console.log('Task ID recuperado:', taskId);

    if (!taskId) {
      console.log('❌ Task ID não encontrado, redirecionando');
      navigate('/style-selection');
      return;
    }

    const pollProgress = async () => {
      try {
        console.log('=== VERIFICANDO PROGRESSO RUNWAY ===');
        console.log('Task ID:', taskId);

        const response = await checkProgress(taskId);

        console.log('=== RESPOSTA DO PROGRESSO ===');
        console.log('Progress:', response.progress);
        console.log('Image URLs:', response.image_urls);

        if (response.progress !== undefined) {
          setProgress(response.progress);
          console.log('Progresso atualizado:', response.progress + '%');

          // Reset timeout count se progresso mudou
          if (response.progress > 0) {
            setTimeoutCount(0);
            setStartTime(Date.now());
          } else {
            // Incrementa contador se progresso está zerado
            const newCount = timeoutCount + 1;
            setTimeoutCount(newCount);
            console.log('Progresso zerado, contador:', newCount);

            // Verifica timeout
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000;

            console.log('Tempo decorrido:', elapsedTime.toFixed(1), 'segundos');
            console.log('Tentativas com progresso zero:', newCount);

            // Runway pode demorar mais, então aumentamos os limites
            if (newCount >= 80 || elapsedTime >= 170) {
              console.log('⚠️ TIMEOUT DETECTADO');
              console.log('- Tentativas:', newCount, '(limite: 30)');
              console.log('- Tempo:', elapsedTime.toFixed(1), 's (limite: 60s)');

              alert('Erro: O processamento está demorando muito. Voltando para tirar uma nova foto.');

              // Limpa dados e volta para câmera
              localStorage.removeItem('aiTaskId');
              localStorage.removeItem('generatedImages');
              localStorage.removeItem('uploadedPhoto');
              localStorage.removeItem('uploadedPhotoName');
              localStorage.removeItem('selectedGender');
              localStorage.removeItem('selectionData');

              navigate('/camera');
              return;
            }
          }

          // Se chegou a 100% e tem URLs das imagens
          if (response.progress === 100 && response.image_urls) {
            console.log('✅ PROGRESSO COMPLETO!');
            console.log('URLs das imagens:', response.image_urls);
            console.log('Número de imagens:', response.image_urls.length);

            setIsLoading(false);

            // Salva as URLs (Runway geralmente retorna 1 imagem)
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
          console.log('Progresso < 100%, verificando novamente em 3.5 segundos...');
          setTimeout(pollProgress, 3500);
        }

      } catch (err) {
        console.error('❌ ERRO AO VERIFICAR PROGRESSO:', err);
        console.error('Detalhes do erro:', err.message);
        setError('Erro ao verificar progresso. Tente novamente.');
        setIsLoading(false);
      }
    };

    // Inicia o polling
    console.log('Iniciando polling de progresso Runway...');
    pollProgress();

    // Cleanup
    return () => {
      console.log('Cleanup do polling');
      setIsLoading(false);
    };
  }, [navigate, timeoutCount, startTime]);

  const getProgressColor = () => {
    return '#f4f1e1';
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
            <h2>Gerando suas fotos com Runway...</h2>
            <p>A IA está criando sua imagem personalizada</p>
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