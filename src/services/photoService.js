import { getApiUrl, API_CONFIG } from '../config/api';

/**
 * Converte uma imagem base64 para Blob
 * @param {string} base64String - String base64 da imagem
 * @param {string} mimeType - Tipo MIME da imagem (ex: 'image/jpeg')
 * @returns {Blob} - Blob da imagem
 */
export const base64ToBlob = (base64String, mimeType = 'image/jpeg') => {
  // Remove o prefixo data:image/jpeg;base64, se existir
  const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
  
  // Converte base64 para bytes
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

/**
 * Faz upload de uma foto para o servidor
 * @param {string} base64Photo - Foto em formato base64
 * @param {Function} onProgress - Callback para progresso do upload
 * @param {Function} onSuccess - Callback para sucesso
 * @param {Function} onError - Callback para erro
 */
export const uploadPhoto = async (base64Photo, onProgress, onSuccess, onError) => {
  try {
    // Converte base64 para Blob
    const blob = base64ToBlob(base64Photo);
    
    // Cria FormData
    const formData = new FormData();
    formData.append('file', blob, 'photo.jpg');
    
    // URL completa do endpoint
    const uploadUrl = getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_PHOTO);
    
    // Configuração do fetch com progresso
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Erro no upload: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (onSuccess) {
      onSuccess(result);
    }
    
  } catch (error) {
    console.error('Erro no upload da foto:', error);
    if (onError) {
      onError(error);
    }
  }
};

/**
 * Simula upload para desenvolvimento (quando não há backend)
 * @param {string} base64Photo - Foto em formato base64
 * @param {Function} onProgress - Callback para progresso
 * @param {Function} onSuccess - Callback para sucesso
 * @param {Function} onError - Callback para erro
 */
export const simulateUpload = (base64Photo, onProgress, onSuccess, onError) => {
  // Simula progresso do upload
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (onProgress) {
      onProgress(progress);
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      
      // Simula resposta de sucesso
      const mockResponse = {
        success: true,
        message: 'Foto enviada com sucesso',
        photoId: `photo_${Date.now()}`,
        url: base64Photo // Em produção seria a URL da imagem no servidor
      };
      
      if (onSuccess) {
        onSuccess(mockResponse);
      }
    }
  }, 200);
};
