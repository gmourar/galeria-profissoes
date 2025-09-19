// Estrutura de dados com prompts organizados por gênero e estilo
export const PROMPTS_DATA = {
  masculino: {
    AGRO: "portrait of a confident man wearing a rugged denim jacket over a plaid shirt, paired with sturdy work boots and a cowboy hat, holding agricultural tools, standing in a vast field with tractors and farm equipment in the background, professional lighting, clean skin, wrinkle-free, smooth complexion --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    BEAUTY: "portrait of a handsome man with perfect grooming, wearing a tailored black suit with a crisp white shirt, elegant watch, standing in a modern studio with soft professional lighting, flawless skin, smooth complexion, professional headshot style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    CRYPTO: "portrait of a tech-savvy man wearing a sleek black hoodie with subtle crypto-themed accessories, modern minimalist background with digital elements, professional lighting, clean skin, smooth complexion, contemporary tech entrepreneur style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    ENTREPENEUR: "portrait of a successful businessman wearing a premium navy blue suit with a silk tie, standing in a modern office with city skyline view, confident posture, professional lighting, flawless skin, executive presence --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    FASHION: "portrait of a stylish man wearing a designer leather jacket over a fitted black t-shirt, paired with dark jeans and fashionable sneakers, urban background with artistic lighting, trendy accessories, smooth skin, fashion-forward style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    TECH: "portrait of a professional man wearing a modern tech company polo shirt, standing in a high-tech office environment with screens and gadgets, clean minimalist background, professional lighting, smooth skin, tech industry executive style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    REAL_STATE: "portrait of a trustworthy man wearing a classic navy suit with a subtle pattern, standing in front of a luxury property or modern building, professional real estate setting, confident smile, clean skin, real estate professional style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50"
  },
  
  feminino: {
    AGRO: "portrait of a confident woman wearing a practical denim jacket over a comfortable blouse, paired with sturdy boots and a sun hat, holding agricultural tools, standing in a beautiful field with farm equipment in the background, natural lighting, clean skin, smooth complexion --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    BEAUTY: "portrait of a beautiful woman with elegant makeup and styling, wearing a sophisticated black dress, standing in a modern studio with professional lighting, flawless skin, smooth complexion, glamorous headshot style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    CRYPTO: "portrait of a modern woman wearing a sleek black blazer with subtle tech accessories, contemporary minimalist background with digital elements, professional lighting, clean skin, smooth complexion, tech entrepreneur style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    ENTREPENEUR: "portrait of a successful businesswoman wearing a tailored charcoal suit with a silk blouse, standing in a modern office with city view, confident posture, professional lighting, flawless skin, executive presence --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    FASHION: "portrait of a stylish woman wearing a designer blazer over a chic top, paired with fashionable pants and elegant accessories, urban background with artistic lighting, trendy styling, smooth skin, fashion-forward style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    TECH: "portrait of a professional woman wearing a modern tech company blouse, standing in a high-tech office environment with screens and modern equipment, clean minimalist background, professional lighting, smooth skin, tech industry executive style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50",
    
    REAL_STATE: "portrait of a trustworthy woman wearing a classic navy suit with elegant accessories, standing in front of a luxury property or modern building, professional real estate setting, confident smile, clean skin, real estate professional style --cref {photoUrl} --sref {styleRef} --ar 9:16 --cw 50 --sw 50"
  }
};

// Estilos disponíveis
export const AVAILABLE_STYLES = [
  { id: 'AGRO', name: 'Agro', icon: '🌾' },
  { id: 'BEAUTY', name: 'Beauty', icon: '✨' },
  { id: 'CRYPTO', name: 'Crypto', icon: '₿' },
  { id: 'ENTREPENEUR', name: 'Empreendedor', icon: '💼' },
  { id: 'FASHION', name: 'Fashion', icon: '👗' },
  { id: 'TECH', name: 'Tech', icon: '💻' },
  { id: 'REAL_STATE', name: 'Real Estate', icon: '🏢' }
];

/**
 * Obtém o prompt baseado no gênero e estilo selecionados
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado
 * @param {string} photoUrl - URL da foto original
 * @param {string} styleRef - URL de referência de estilo
 * @returns {string} - Prompt formatado
 */
export const getPrompt = (gender, style, photoUrl, styleRef) => {
  const promptTemplate = PROMPTS_DATA[gender]?.[style];
  if (!promptTemplate) {
    throw new Error(`Prompt não encontrado para gênero: ${gender} e estilo: ${style}`);
  }
  
  return promptTemplate
    .replace('{photoUrl}', photoUrl)
    .replace('{styleRef}', styleRef);
};
