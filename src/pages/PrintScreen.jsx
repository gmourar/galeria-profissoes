import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePhotoQuantity } from '../services/photoService';
import QRCode from 'qrcode';
import '../styles/PrintScreen.css';

const PrintScreen = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQRCode, setShowQRCode] = useState(true);
  const navigate = useNavigate();

  // Recupera dados do localStorage
  const selectedPhoto = JSON.parse(localStorage.getItem('selectedPhoto') || '{}');
  const uploadedPhotoName = localStorage.getItem('uploadedPhotoName');

  const quantities = [1, 2, 3];

  // Gera QR code com o link da imagem selecionada
  useEffect(() => {
    if (selectedPhoto && selectedPhoto.url) {
      generateQRCode(selectedPhoto.url);
    }
  }, [selectedPhoto]);

  const generateQRCode = async (imageUrl) => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(imageUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCodeDataURL);
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
    }
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  const handlePrint = async () => {
    if (!selectedPhoto || !uploadedPhotoName) {
      alert('Erro: Dados da foto não encontrados');
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

      // Extrai o nome base da foto (ex: foto_1234567890.jpg -> foto1)
      const photoBaseName = uploadedPhotoName.replace(/\.(jpg|jpeg|png)$/i, '');
      // Se o nome já começa com "foto", usa diretamente, senão extrai o número
      let photoName;
      if (photoBaseName.startsWith('foto_')) {
        const photoNumber = photoBaseName.split('_').pop();
        photoName = `foto${photoNumber || '1'}`;
      } else if (photoBaseName.startsWith('foto')) {
        // Se já é "foto" + número, usa diretamente
        photoName = photoBaseName;
      } else {
        // Fallback para casos inesperados
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

      // Verifica se a impressão foi concluída
      if (result.impressa) {
        alert('Impressão concluída com sucesso!');
        navigate('/camera');
      } else {
        alert('Impressão iniciada com sucesso!');
        navigate('/camera');
      }

    } catch (error) {
      console.error('Erro ao imprimir foto:', error);
      setIsPrinting(false);
      setPrintProgress(0);
      alert('Erro ao enviar para impressão. Tente novamente.');
    }
  };

  const handleBack = () => {
    navigate('/photo-selection');
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
    
    // Volta para a câmera
    navigate('/camera');
  };

  if (!selectedPhoto || !selectedPhoto.url) {
    return (
      <div className="print-screen">
        <div className="error-container">
          <h2>Erro</h2>
          <p>Foto selecionada não encontrada</p>
          <button onClick={handleBack} className="back-button">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="print-screen">
      <div className="print-container">
        <div className="print-header">
          <h2>Configurar Impressão</h2>
          <p>Selecione a quantidade de cópias que deseja imprimir</p>
        </div>

        <div className="photo-preview">
          <img src={selectedPhoto.url} alt="Foto selecionada" className="selected-photo" />
        </div>

        <div className="quantity-selection">
          <label htmlFor="quantity-select" className="quantity-label">
            Quantidade de cópias:
          </label>
          <select
            id="quantity-select"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            disabled={isPrinting}
            className="quantity-select"
          >
            {quantities.map(qty => (
              <option key={qty} value={qty}>
                {qty} {qty === 1 ? 'cópia' : 'cópias'}
              </option>
            ))}
          </select>
        </div>

        {isPrinting ? (
          <div className="printing-section">
            <div className="printing-info">
              <h3>Imprimindo suas fotos...</h3>
              <p>Por favor, aguarde enquanto processamos sua impressão</p>
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
                className="back-button"
                onClick={handleBack}
                disabled={isPrinting}
              >
                Voltar
              </button>
              <button 
                className="print-button"
                onClick={handlePrint}
                disabled={isPrinting}
              >
                Imprimir {selectedQuantity} {selectedQuantity === 1 ? 'cópia' : 'cópias'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintScreen;
