// Configuração da API atualizada para Runway
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8010',
  ENDPOINTS: {
    UPLOAD_PHOTO: '/photos/upload',
    GENERATE_PHOTOS: '/generate',
    GENERATE_UPLOAD: '/generate-upload'
  },
  USE_MOCKS: false
};

export const getApiUrl = (endpoint) => {
  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  console.log('=== GET API URL ===');
  console.log('Endpoint:', endpoint);
  console.log('URL completa:', fullUrl);
  return fullUrl;
};

/**
 * Converte uma imagem base64 para Blob
 */
export const base64ToBlob = (base64String, mimeType = 'image/jpeg') => {
  const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
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
 */
export const uploadPhoto = async (photoInput, onProgress, onSuccess, onError) => {
  try {
    let blob;
    if (typeof photoInput === 'string') {
      blob = base64ToBlob(photoInput);
    } else if (photoInput instanceof Blob) {
      blob = photoInput;
    } else {
      throw new Error('Formato de imagem não suportado para upload');
    }

    const formData = new FormData();
    formData.append('file', blob, 'photo.jpg');

    console.log('=== UPLOAD PHOTO DEBUG ===');
    console.log('API_CONFIG.USE_MOCKS:', API_CONFIG.USE_MOCKS);
    console.log('API_CONFIG.BASE_URL:', API_CONFIG.BASE_URL);

    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para desenvolvimento');
      return simulateUpload(photoInput, onProgress, onSuccess, onError);
    }

    const uploadUrl = getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_PHOTO);
    console.log('=== CONECTANDO NA API REAL ===');
    console.log('URL COMPLETA:', uploadUrl);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    console.log('=== RESPOSTA RECEBIDA ===');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    if (!response.ok) {
      throw new Error(`Erro no upload: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.nome) {
      localStorage.setItem('uploadedPhotoName', result.nome);
    }

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
 * Simula upload para desenvolvimento
 */
export const simulateUpload = (photoInput, onProgress, onSuccess, onError) => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (onProgress) {
      onProgress(progress);
    }

    if (progress >= 100) {
      clearInterval(interval);

      const photoName = `foto_${Date.now()}.jpg`;
      let previewUrl;

      if (typeof photoInput === 'string') {
        previewUrl = photoInput;
      } else if (photoInput instanceof Blob) {
        previewUrl = URL.createObjectURL(photoInput);
      }

      const mockResponse = {
        id: Math.floor(Math.random() * 1000) + 1,
        nome: photoName,
        original_url: previewUrl,
        ia_url: null,
        quantidade: 0,
        impressa: false
      };

      localStorage.setItem('uploadedPhotoName', photoName);
      localStorage.setItem('uploadedPhotoUrl', previewUrl);

      if (onSuccess) {
        onSuccess(mockResponse);
      }
    }
  }, 200);
};

/**
 * Obtém a URL da referência de estilo baseada na profissão e gênero
 */
export const getStyleReferenceUrl = (profession, gender) => {
  const styleReferences = {
    CLAY_OFFICE: {
      masculino: 'https://cdn.midjourney.com/47d0a76c-b252-4eee-b944-40f79918c3d7/0_0.png',
      feminino: 'https://cdn.midjourney.com/32b3d58d-46fb-486d-b802-d33b1015fabb/0_0.png'
    },
    CORRETOR_FUTURO: {
      masculino: 'https://cdn.midjourney.com/b7cb8eaf-f128-416e-b1b5-fe22babcd044/0_0.png',
      feminino: 'https://cdn.midjourney.com/4b429b29-16fe-4529-babd-d9a78b05de4b/0_0.png'
    },
    HOLOGRAMAS_SEGUROS: {
      masculino: 'https://cdn.midjourney.com/9480a46b-c47e-411c-ba7f-2a94e6438287/0_0.png',
      feminino: 'https://cdn.midjourney.com/9480a46b-c47e-411c-ba7f-2a94e6438287/0_0.png'
    },
    LIVRARIA_SEGUROS: {
      masculino: 'https://cdn.midjourney.com/fa8a1254-332f-4aa4-a67c-0eb888a814a5/0_0.png',
      feminino: 'https://cdn.midjourney.com/58b19852-1468-433c-ad85-7f2d08f8b464/0_0.png'
    },
    PALESTRANDO: {
      masculino: 'https://cdn.midjourney.com/7ef601cc-b74d-4014-9e53-b6a29b9e01d4/0_0.png',
      feminino: 'https://cdn.midjourney.com/b1b09b2e-9148-4c37-963b-f9ad083094c3/0_0.png'
    },
    PODERES: {
      masculino: 'https://cdn.midjourney.com/d765e7b4-1561-47c0-ae07-ad2ff046f1f0/0_0.png',
      feminino: 'https://cdn.midjourney.com/e95e5b2a-644b-4d71-86f5-4cb76a705941/0_0.png'
    },
    SALA_FUTURO: {
      masculino: 'https://cdn.midjourney.com/88a7cb28-0a47-4606-a58a-f7a02e5a2867/0_0.png',
      feminino: 'https://cdn.midjourney.com/58b19852-1468-433c-ad85-7f2d08f8b464/0_0.png'
    },
    SALA_PIXAR: {
      masculino: 'https://cdn.midjourney.com/47d0a76c-b252-4eee-b944-40f79918c3d7/0_0.png',
      feminino: 'https://cdn.midjourney.com/32b3d58d-46fb-486d-b802-d33b1015fabb/0_0.png'
    },
    SEGUROS_ONLINE: {
      masculino: 'https://cdn.midjourney.com/fa8a1254-332f-4aa4-a67c-0eb888a814a5/0_0.png',
      feminino: 'https://cdn.midjourney.com/58b19852-1468-433c-ad85-7f2d08f8b464/0_0.png'
    }
  };

  const professionKey = profession.toUpperCase().replace(/ /g, '_');
  const genderKey = gender.toLowerCase();

  if (styleReferences[professionKey] && styleReferences[professionKey][genderKey]) {
    return styleReferences[professionKey][genderKey];
  }

  console.warn(`Referência de estilo não encontrada para ${profession} - ${gender}`);
  return styleReferences.CLAY_OFFICE[genderKey] || styleReferences.CLAY_OFFICE.masculino;
};

/**
 * Constrói a URL completa da foto original
 * Remove extensão existente antes de adicionar .png
 * URL sem "ns" conforme bucket correto
 */
export const buildPhotoUrl = (photoName) => {
  // Remove extensão .jpg, .jpeg, .png se existir
  const nameWithoutExt = photoName.replace(/\.(jpg|jpeg|png)$/i, '');
  return `https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/${nameWithoutExt}.png`;
};

/**
 * Gera foto com IA usando Runway (novo backend)
 * @param {string} prompt - Prompt textual
 * @param {string} s3Url - URL pública da foto do usuário no S3
 * @param {string} styleRefUrl - URL pública da imagem de referência de estilo
 * @param {string} aspectRatio - "1:1", "9:16" ou "16:9"
 * @returns {Promise<Object>} - Resposta com task_id
 */
export const generatePhotoWithAI = async (prompt, s3Url, styleRefUrl, aspectRatio = '1080:1920') => {
  try {
    console.log('=== GENERATE PHOTO WITH AI (NEW FORMAT) ===');
    console.log('Prompt:', prompt);
    console.log('S3 URL (foto do usuário):', s3Url);
    console.log('Style Ref URL (referência de estilo):', styleRefUrl);

    const generateUrl = getApiUrl(API_CONFIG.ENDPOINTS.GENERATE_PHOTOS);
    console.log('POST ->', generateUrl);

    // Body no novo formato solicitado
    const requestBody = {
      promptText: prompt,
      model: "gen4_image_turbo",
      referenceImages: [
        { uri: s3Url, tag: "user" },
        { uri: styleRefUrl, tag: "ref" }
      ]
    };

    console.log('=== BODY ENVIADO ===');
    console.log(JSON.stringify(requestBody, null, 2));

    const response = await fetch(generateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API:', errorText);
      throw new Error(`Erro na geração: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Resultado recebido:', result);
    return result;

  } catch (error) {
    console.error('❌ ERRO AO GERAR FOTO COM IA:', error);
    throw error;
  }
};


/**
 * Verifica o progresso de uma tarefa de geração (Runway)
 * @param {string} taskId - ID da tarefa
 * @returns {Promise<Object>} - { progress: number, image_urls?: string[] }
 */
export const checkProgress = async (taskId) => {
  try {
    console.log('=== CHECK PROGRESS INICIADO ===');
    console.log('Task ID:', taskId);

    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para verificação de progresso');

      const currentProgress = parseInt(localStorage.getItem('mockProgress') || '0');
      let newProgress = currentProgress + Math.floor(Math.random() * 20) + 10;
      if (newProgress > 100) newProgress = 100;

      localStorage.setItem('mockProgress', newProgress.toString());

      if (newProgress === 100) {
        const originalPhotoUrl = localStorage.getItem('uploadedPhotoUrl');

        // Runway geralmente retorna 1 imagem
        const mockImages = originalPhotoUrl
          ? [originalPhotoUrl]
          : [`https://cdn.runway.ml/mock-${taskId}-1.png`];

        return {
          progress: 100,
          image_urls: mockImages
        };
      }

      return { progress: newProgress };
    }

    const progressUrl = getApiUrl(`/progress/${taskId}`);
    console.log('=== FAZENDO REQUISIÇÃO REAL ===');
    console.log('URL completa:', progressUrl);

    if (!taskId || typeof taskId !== 'string' || taskId.trim() === '') {
      throw new Error('Task ID inválido ou vazio');
    }

    const response = await fetch(progressUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('=== RESPOSTA DA API DE PROGRESSO ===');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    if (!response.ok) {
      throw new Error(`Erro ao verificar progresso: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('=== RESULTADO DA API ===');
    console.log('Progress:', result.progress);
    console.log('Image URLs:', result.image_urls);

    return result;

  } catch (error) {
    console.error(' ERRO AO VERIFICAR PROGRESSO:', error);
    throw error;
  }
};

/**
 * Aplica moldura e logo a uma imagem
 */
export const applyFrameToImageBlob = async (imageUrl, opts = {}) => {
  const {
    logoSrc = '/moldura.png',
    frameSrc,
    quality = 0.9
  } = opts;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';

    baseImg.onload = () => {
      try {
        const maxW = 800;
        const maxH = 1200;
        const r = baseImg.width / baseImg.height;
        let w, h;
        if (r > maxW / maxH) { w = maxW; h = Math.round(maxW / r); }
        else { h = maxH; w = Math.round(maxH * r); }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(baseImg, 0, 0, w, h);

        const finishToBlob = () => {
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Falha ao gerar blob'));
            resolve(blob);
          }, 'image/jpeg', quality);
        };

        const drawBorderLast = () => {
          const border = Math.round(Math.min(w, h) * 0.02);
          ctx.lineWidth = border;
          ctx.strokeStyle = '#f4f1e1';
          ctx.strokeRect(border / 2, border / 2, w - border, h - border);
          finishToBlob();
        };

        const drawLogoThenBorder = () => {
          if (!logoSrc) { drawBorderLast(); return; }
          const logo = new Image();
          logo.crossOrigin = 'anonymous';
          logo.onload = () => {
            const size = Math.round(Math.min(w, h) * 0.08);
            const x = Math.round(size * 0.6);
            const y = Math.round(size * 0.6);
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.fillRect(x - 6, y - 6, size + 12, size + 12);
            ctx.drawImage(logo, x, y, size, size);
            drawBorderLast();
          };
          logo.onerror = () => drawBorderLast();
          logo.src = logoSrc;
        };

        const drawFrameThenLogo = () => {
          if (!frameSrc) { drawLogoThenBorder(); return; }
          const frame = new Image();
          frame.crossOrigin = 'anonymous';
          frame.onload = () => { ctx.drawImage(frame, 0, 0, w, h); drawLogoThenBorder(); };
          frame.onerror = () => { drawLogoThenBorder(); };
          frame.src = frameSrc;
        };

        drawFrameThenLogo();
      } catch (e) { reject(e); }
    };

    baseImg.onerror = () => reject(new Error('Erro ao carregar imagem base'));
    baseImg.src = imageUrl;
  });
};

/**
 * Mapa de IDs de estilos para slugs do backend
 */
const TEMA_MAP = {
  CLAY_OFFICE: 'clayoffice',
  SALA_PIXAR: 'salapixar',
  SALA_FUTURO: 'salafuturo',
  PALESTRANDO: 'palestra',
  LIVRARIA_SEGUROS: 'livariaseguros',
  CORRETOR_FUTURO: 'corretorfuturo',
  PODERES: 'poderes',
  SEGUROS_ONLINE: 'segurosonline',
  HOLOGRAMAS_SEGUROS: 'hologramas',
};

const resolveTemaFromStyle = (styleId) => {
  if (!styleId) return '';
  return TEMA_MAP[styleId] || String(styleId).toLowerCase();
};

/**
 * Salva a foto selecionada pela IA
 */
export const saveSelectedPhoto = async (photoName, imageUrl, meta = {}) => {
  try {
    console.log('=== SAVE SELECTED PHOTO INICIADO ===');
    console.log('Photo Name:', photoName);
    console.log('Image URL:', imageUrl);

    const selectionData = JSON.parse(localStorage.getItem('selectionData') || '{}');
    const gender = meta.gender || selectionData.gender || null;
    const styleId = meta.style || selectionData.style || null;
    const tema = resolveTemaFromStyle(styleId);

    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para salvar foto selecionada');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'Foto salva com sucesso',
        photo_name: photoName,
        image_url: imageUrl,
        genero: gender,
        tema,
      };
    }

    const saveUrl = getApiUrl(`/photos/${photoName}/save-ia`);
    console.log('=== FAZENDO POST PARA SAVE-IA ===');
    console.log('URL completa:', saveUrl);

    const requestBody = {
      image_url: imageUrl,
      ...(gender ? { genero: gender } : {}),
      ...(tema ? { tema } : {}),
    };

    console.log('Body JSON:', JSON.stringify(requestBody));

    const response = await fetch(saveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('=== RESPOSTA DA API SAVE-IA ===');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    if (!response.ok) {
      throw new Error(`Erro ao salvar foto: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Foto salva:', result);
    return result;

  } catch (error) {
    console.error('❌ ERRO AO SALVAR FOTO:', error);
    throw error;
  }
};

export const updatePhotoQuantity = async (photoName, quantidade) => {
  try {
    console.log('=== UPDATE PHOTO QUANTITY INICIADO ===');
    console.log('Photo Name:', photoName);
    console.log('Quantidade:', quantidade);

    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para atualizar quantidade');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        id: 1,
        nome: photoName,
        original_url: `https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/${photoName}.png`,
        ia_url: `https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/${photoName}IA.png`,
        quantidade: quantidade,
        impressa: true
      };
    }

    const updateUrl = getApiUrl(`/photos/${photoName}/quantidade`);
    
    const response = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantidade })
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar quantidade: ${response.status}`);
    }

    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('❌ ERRO AO ATUALIZAR QUANTIDADE:', error);
    throw error;
  }
};

/**
 * Marca a foto como impressa no banco de dados
 */
export const markPhotoAsPrinted = async (photoName, quantidade = 1) => {
  try {
    console.log('=== MARK PHOTO AS PRINTED INICIADO ===');
    console.log('Photo Name:', photoName);
    console.log('Quantidade:', quantidade);

    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para marcar foto como impressa');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        message: 'Foto marcada como impressa',
        photo_name: photoName,
        quantidade: quantidade,
        impressa: true
      };
    }

    const printUrl = getApiUrl(`/photos/${photoName}/quantidade`);
    console.log('=== FAZENDO PATCH PARA IMPRIMIR ===');
    console.log('URL completa:', printUrl);

    const response = await fetch(printUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantidade })
    });

    console.log('=== RESPOSTA DA API IMPRIMIR ===');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API:', errorText);
      throw new Error(`Erro ao marcar foto como impressa: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Foto marcada como impressa:', result);
    return result;
    
  } catch (error) {
    console.error('❌ ERRO AO MARCAR FOTO COMO IMPRESSA:', error);
    throw error;
  }
};

/**
 * Reseta o progresso mock
 */
export const resetMockProgress = () => {
  localStorage.removeItem('mockProgress');
};