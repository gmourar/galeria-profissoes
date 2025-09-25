import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePhotoQuantity } from '../services/photoService';
import QRCode from 'qrcode';
import '../styles/PrintScreen.css';

const PrintScreen = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [iaImageUrl, setIaImageUrl] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Recupera dados do localStorage
  const uploadedPhotoName = localStorage.getItem('uploadedPhotoName');
  const savedIaUrl = localStorage.getItem('savedIaUrl'); // NOVO: Pega o ia_url salvo

  // Quantidade sempre será 1
  const selectedQuantity = 1;

  // MODIFICADO: Usa o ia_url salvo do localStorage em vez de fazer GET
  useEffect(() => {
    const loadSavedImage = async () => {
      console.log('=== VERIFICANDO IA_URL NO LOCALSTORAGE ===');
      console.log('savedIaUrl do localStorage:', savedIaUrl);
      console.log('uploadedPhotoName do localStorage:', uploadedPhotoName);
      
      if (!savedIaUrl) {
        console.error('ia_url não encontrado no localStorage');
        console.log('Todas as chaves do localStorage:', Object.keys(localStorage));
        setError('URL da imagem IA não encontrada. Você precisa selecionar uma foto primeiro.');
        setIsLoadingImage(false);
        return;
      }

      // Validação adicional da URL
      if (!savedIaUrl.startsWith('http')) {
        console.error('ia_url inválido:', savedIaUrl);
        setError('URL da imagem IA inválida. Tente selecionar a foto novamente.');
        setIsLoadingImage(false);
        return;
      }

      try {
        setIsLoadingImage(true);
        console.log('Usando ia_url salvo do localStorage:', savedIaUrl);
        
        // Define a URL da imagem IA
        setIaImageUrl(savedIaUrl);
        
        // Gera o QR code com a URL da IA salva
        await generateQRCode(savedIaUrl);
        
        console.log('Processo concluído com sucesso');
        
      } catch (error) {
        console.error('Erro ao carregar imagem salva:', error);
        setError(error.message || 'Erro ao carregar a foto salva');
      } finally {
        setIsLoadingImage(false);
      }
    };

    loadSavedImage();
  }, [savedIaUrl]);

  const generateQRCode = async (imageUrl) => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(imageUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#009db7',
          light: '#f4f1e1'
        }
      });
      setQrCodeUrl(qrCodeDataURL);
      console.log('QR Code gerado com sucesso para URL:', imageUrl);
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
      setError('Erro ao gerar QR code');
    }
  };

  const handlePrint = async () => {
    if (!uploadedPhotoName) {
      alert('Erro: Nome da foto não encontrado');
      return;
    }

    try {
      setIsPrinting(true);
      setPrintProgress(0);

      // Simula progresso da impressão
      const progressInterval = setInterval(() => {
        setPrintProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Extrai o nome base da foto
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

      console.log('Enviando quantidade para impressão:', {
        photoName,
        quantidade: selectedQuantity
      });

      // Chama a API para definir a quantidade
      const result = await updatePhotoQuantity(photoName, selectedQuantity);
      
      clearInterval(progressInterval);
      setPrintProgress(100);

      console.log('Resposta da API:', result);


    } catch (error) {
      console.error('Erro ao imprimir foto:', error);
      setIsPrinting(false);
      setPrintProgress(0);
      alert('Erro ao enviar para impressão. Tente novamente.');
    }
  };

  const handleBack = () => {
    navigate('/');
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
    localStorage.removeItem('savedIaUrl'); // NOVO: Limpa também o ia_url salvo
    
    navigate('/');
  };

  // Estados de loading e erro
  if (isLoadingImage) {
    return (
      <div className="print-screen">
        <div className="loading-container">
          <h2>Carregando...</h2>
          <p>Preparando sua foto salva...</p>
        </div>
      </div>
    );
  }

  if (error || !iaImageUrl) {
    return (
      <div className="print-screen">
        <div className="error-container">
          <h2>Erro</h2>
          <p>{error || 'Foto não encontrada'}</p>
          <p>Você precisa selecionar uma foto primeiro.</p>
          <div className="error-buttons">
            <button onClick={handleBack} className="back-button">
              Voltar para Seleção
            </button>
            <button onClick={handleStartOver} className="start-over-button">
              Começar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="print-screen">
      <div className="print-container">
        <div className="print-header">
          <h2>Sua foto está pronta!</h2>
        </div>

        <div className="photo-preview">
          <img src={iaImageUrl} alt="Foto selecionada" className="selected-photo" />
        </div>

        {isPrinting ? (
          <div className="printing-section">
            <div className="printing-info">
              <h3>salvando suas fotos...</h3>
              <p>Por favor, aguarde enquanto processamos o salvamento da imagem</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${printProgress}%` }}
              ></div>
            </div>
            <div className="progress-percentage">{printProgress}%</div>
          </div>
        ) : (
          <div className="qrcode-section">
            <div className="qrcode-info">
              <h3>QR Code da sua foto</h3>
              <p>Escaneie o QR code abaixo para acessar sua foto:</p>
            </div>
            <div className="qrcode-container">
              {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="qrcode-image" />}
            </div>
            <div className="qrcode-message">
              <p>Use a câmera do seu celular para escanear o código</p>
            </div>
            <div className="action-buttons">
              <button 
                className="print-button"
                onClick={handleBack}
                disabled={isPrinting}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintScreen;