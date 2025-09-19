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
/**
 * Faz upload de uma foto para o servidor. Aceita base64 ou Blob/File
 * @param {string|Blob|File} photoInput - Imagem em base64 ou Blob/File
 * @param {Function} onProgress
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export const uploadPhoto = async (photoInput, onProgress, onSuccess, onError) => {
  try {
    // Normaliza para Blob
    let blob;
    if (typeof photoInput === 'string') {
      blob = base64ToBlob(photoInput);
    } else if (photoInput instanceof Blob) {
      blob = photoInput;
    } else {
      throw new Error('Formato de imagem não suportado para upload');
    }
    
    // Cria FormData
    const formData = new FormData();
    formData.append('file', blob, 'photo.jpg');
    
    // URL completa do endpoint
    const uploadUrl = getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_PHOTO);
    
    // Decide entre mock e API real
    if (API_CONFIG.USE_MOCKS) {
      // Mantém o comportamento simulado existente, suportando Blob ou base64
      return simulateUpload(photoInput, onProgress, onSuccess, onError);
    }
    
    // Configuração do fetch
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
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
export const simulateUpload = (photoInput, onProgress, onSuccess, onError) => {
  // Simula progresso do upload
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (onProgress) {
      onProgress(progress);
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      
      // Gera URL de visualização
      let previewUrl;
      if (typeof photoInput === 'string') {
        previewUrl = photoInput; // data URL
      } else if (photoInput instanceof Blob) {
        previewUrl = URL.createObjectURL(photoInput);
      }

      // Simula resposta de sucesso
      const mockResponse = {
        success: true,
        message: 'Foto enviada com sucesso',
        photoId: `photo_${Date.now()}`,
        url: previewUrl // Em produção seria a URL da imagem no servidor
      };
      
      if (onSuccess) {
        onSuccess(mockResponse);
      }
    }
  }, 200);
};

/**
 * Gera fotos usando IA baseado no prompt fornecido
 * @param {string} prompt - Prompt para geração da foto
 * @returns {Promise<Array>} - Array com as fotos geradas
 */
export const generatePhotos = async (prompt) => {
  try {
    // Se estiver com mocks ligados, retorna simulado direto
    if (API_CONFIG.USE_MOCKS) {
      return simulateGeneratedPhotos();
    }

    // URL da API de geração
    const generateUrl = getApiUrl(API_CONFIG.ENDPOINTS.GENERATE_PHOTOS);

    const response = await fetch(generateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Erro na geração: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    // Backends podem responder com { photos: [...] } ou outra chave; padroniza
    if (Array.isArray(result)) return result;
    return result.photos || result.data || [];
    
  } catch (error) {
    console.error('Erro ao gerar fotos:', error);
    // Em caso de erro, retorna fotos simuladas para desenvolvimento
    return simulateGeneratedPhotos();
  }
};

/**
 * Simula fotos geradas para desenvolvimento
 * @returns {Array} - Array com fotos simuladas
 */
export const simulateGeneratedPhotos = () => {
  const mockPhotos = [];
  for (let i = 1; i <= 4; i++) {
    mockPhotos.push({
      id: `generated_${Date.now()}_${i}`,
      url: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`,
      style: 'professional',
      generatedAt: new Date().toISOString()
    });
  }
  return mockPhotos;
};