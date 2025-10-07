
// Runway usa s3Url como referência de imagem
export const PROMPTS_DATA = {
    masculino: {
        CLAY_OFFICE: "as an insurance broker in his work setup, office setting, closing a deal on the phone, claymation style, visible facial expression",

        CORRETOR_FUTURO: "as an insurance broker, showing popular items on the table that surrounds the insurance market, like a house, car, health, education, family and travel as little toys in a futuristic high-tech office setting, showing what the company provides",

        HOLOGRAMAS_SEGUROS: "as an insurance worker, standing on an insurance office where half the room is solid and half hologram, with products representing insurance products in holograms, money, cars, houses, family, health and travel",

        LIVRARIA_SEGUROS: "as a sophisticated and knowledgeable insurance provider inside a grand modern library of insurance knowledge, surrounded by floating books, holographic charts about risk and finance, elegant atmosphere, professional yet visionary, clear face",

        PALESTRANDO: "As an insurance host, on a stage lit insurance language, giving a keynote on the future of learning in insurance",

        PODERES: "portrait of an insurance broker holding a ball with symbols of a hospital, family, plane, money, house and car all in his palm like it is his superpowers",

        SALA_FUTURO: "a man insurance instructor lecturing amid holographic insurance modules, neon-blue lecture hall with students and floating insurance priorities, insurance lists, insurance symbols, insurance panels, highly accurate likeness, true resemblance, natural beauty, no exaggeration, realistic lighting",

        SALA_PIXAR: "as an insurance teacher in Pixar animation style, lecturing amid holographic insurance modules, neon-blue lecture hall with floating data panels, full classroom",

        SEGUROS_ONLINE: "A laptop screen showing an insurance broker, normal casual business attire, selling health, family and house insurance, in the zoom meeting, office background"
    },

    feminino: {
        CLAY_OFFICE: "as an insurance broker in her work setup, office setting, closing a deal on the phone, claymation style, visible facial expression",

        CORRETOR_FUTURO: "as an insurance broker, showing popular items on the table that surrounds the insurance market, like a house, car, health, education, family and travel as little toys in a futuristic high-tech office setting, showing what the company provides",

        HOLOGRAMAS_SEGUROS: "as an insurance worker, standing on an insurance office where half the room is solid and half hologram, with products representing insurance products in holograms, money, cars, houses, family, health and travel",

        LIVRARIA_SEGUROS: "as a sophisticated and knowledgeable insurance provider inside a grand modern library of insurance knowledge, surrounded by floating books, holographic charts about risk and finance, elegant atmosphere, professional yet visionary, clear face",

        PALESTRANDO: "As an insurance host, on a stage lit insurance language, giving a keynote on the future of learning in insurance",

        PODERES: "portrait of an insurance broker holding a ball with symbols of a hospital, family, plane, money, house and car all in her palm like it is her superpowers",

        SALA_FUTURO: "an woman insurance instructor lecturing amid holographic insurance modules, neon-blue lecture hall with students and floating insurance priorities, insurance lists, insurance symbols, insurance panels, highly accurate likeness, true resemblance, natural beauty, no exaggeration, realistic lighting",

        SALA_PIXAR: "as an insurance teacher in Pixar animation style, lecturing amid holographic insurance modules, neon-blue lecture hall with floating data panels, full classroom",

        SEGUROS_ONLINE: "A laptop screen showing an insurance broker, normal casual business attire, selling health, family and house insurance, in the zoom meeting, office background"
    }
};

// URLs de referência de estilo para cada prompt
export const STYLE_REFERENCES = {
    masculino: {
        CLAY_OFFICE: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaClayOfficeHomem.png",
        CORRETOR_FUTURO: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaCorretorFuturoHomem.png",
        HOLOGRAMAS_SEGUROS: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaHologramasSegurosHomem.png",
        LIVRARIA_SEGUROS: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaLivrariaSegurosHomem.png",
        PALESTRANDO: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPalestrandoHomem.png",
        PODERES: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPoderesHomem.png",
        SALA_FUTURO: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaFuturoHomem.png",
        SALA_PIXAR: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaPixarHomem.png",
        SEGUROS_ONLINE: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSegurosOnlineHomem.png"
    },
    feminino: {
        CLAY_OFFICE: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaClayOfficeMulher.png",
        CORRETOR_FUTURO: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaCorretorFuturoMulher.png",
        HOLOGRAMAS_SEGUROS: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaHologramasSegurosMulher.png",
        LIVRARIA_SEGUROS: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaLivrariaSegurosMulher.png",
        PALESTRANDO: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPalestrandoMulher.png",
        PODERES: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPoderesMulher.png",
        SALA_FUTURO: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaFuturoMulher.png",
        SALA_PIXAR: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaPixarMulher.png",
        SEGUROS_ONLINE: "https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSegurosOnlineMulher.png"
    }
};

// Estilos disponíveis
export const AVAILABLE_STYLES = [
    { id: 'CLAY_OFFICE', name: 'Clay Office' },
    { id: 'CORRETOR_FUTURO', name: 'Corretor do Futuro' },
    { id: 'HOLOGRAMAS_SEGUROS', name: 'Hologramas de Seguros' },
    { id: 'LIVRARIA_SEGUROS', name: 'Livraria dos Seguros' },
    { id: 'PALESTRANDO', name: 'Palestrando' },
    { id: 'PODERES', name: 'Poderes' },
    { id: 'SALA_FUTURO', name: 'Sala do Futuro' },
    { id: 'SALA_PIXAR', name: 'Sala Pixar' },
    { id: 'SEGUROS_ONLINE', name: 'Seguros Online' }
];

/**
 * Obtém o prompt baseado no gênero e estilo selecionados
 * Para Runway: retorna apenas o texto descritivo, sem URLs
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado (ex: 'CLAY_OFFICE')
 * @returns {string} - Prompt formatado para Runway
 */
export const getPrompt = (gender, style) => {
    const promptTemplate = PROMPTS_DATA[gender]?.[style];
    if (!promptTemplate) {
        console.error(`Prompt não encontrado para gênero: ${gender} e estilo: ${style}`);
        // Fallback para CLAY_OFFICE
        return PROMPTS_DATA[gender]?.CLAY_OFFICE || PROMPTS_DATA.masculino.CLAY_OFFICE;
    }

    console.log('=== PROMPT SELECIONADO ===');
    console.log('Gênero:', gender);
    console.log('Estilo:', style);
    console.log('Prompt:', promptTemplate);

    return promptTemplate;
};

/**
 * Obtém a URL de referência de estilo
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado (ex: 'CLAY_OFFICE')
 * @returns {string} - URL da imagem de referência
 */
export const getStyleReference = (gender, style) => {
    const styleRef = STYLE_REFERENCES[gender]?.[style];
    if (!styleRef) {
        console.warn(`Referência de estilo não encontrada para ${gender} - ${style}`);
        return STYLE_REFERENCES[gender]?.CLAY_OFFICE || STYLE_REFERENCES.masculino.CLAY_OFFICE;
    }

    console.log('=== REFERÊNCIA DE ESTILO ===');
    console.log('Gênero:', gender);
    console.log('Estilo:', style);
    console.log('URL:', styleRef);

    return styleRef;
};

/**
 * Valida se um estilo existe
 * @param {string} styleId - ID do estilo
 * @returns {boolean}
 */
export const isValidStyle = (styleId) => {
    return AVAILABLE_STYLES.some(s => s.id === styleId);
};

/**
 * Obtém informações de um estilo
 * @param {string} styleId - ID do estilo
 * @returns {object|null}
 */
export const getStyleInfo = (styleId) => {
    return AVAILABLE_STYLES.find(s => s.id === styleId) || null;
};