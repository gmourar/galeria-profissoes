// Estrutura de dados com prompts organizados por gênero e estilo
export const PROMPTS_DATA = {
    masculino: {
        // Novos prompts masculinos
        CLAY_OFFICE: "as an insurance broker in his work setup, office setting, closing a deal on the phone, claymation style, visible facial expression --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaClayOfficeHomem.png --ar 9:16 --iw 2",

        CORRETOR_FUTURO: "as an insurance broker, showing popular items on the table that surrounds the insurance market, like a house, car, health, education, family and travel as little toys in a futuristic high-tech office setting, showing what the company provides --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaCorretorFuturoHomem.png --ar 9:16 --iw 2",

        HOLOGRAMAS_SEGUROS: "as an insurance worker, standing on an insurance office where half the room is solid and half hologram, with products representing insurance products in holograms, money, cars, houses, family, health and travel --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaHologramasSegurosHomem.png --ar 9:16 --iw 2",

        LIVRARIA_SEGUROS: "as a sophisticated and knowledgeable insurance provider inside a grand modern library of insurance knowledge, surrounded by floating books, holographic charts about risk and finance, elegant atmosphere, professional yet visionary, clear face --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaLivrariaSegurosHomem.png --ar 9:16 --iw 2",

        PALESTRANDO: "As an insurance host, on a stage lit insurance language, giving a keynote on the future of learning in insurance --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPalestrandoHomem.png --ar 9:16 --iw 2",

        PODERES: "portrait of an insurance broker holding a ball with symbols of a hospital, family, plane, money, house and car all in his palm like it is his superpowers --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPoderesHomem.png --ar 9:16 --iw 2",

        SALA_FUTURO: "an insurance instructor lecturing amid holographic insurance modules, neon-blue lecture hall with students and floating insurance priorities, insurance lists, insurance symbols, insurance panels --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaFuturoHomem.png --ar 9:16 --iw 2",

        SALA_PIXAR: "as an insurance teacher in Pixar animation style, lecturing amid holographic insurance modules, neon-blue lecture hall with floating data panels, full classroom --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaPixarHomem.png --ar 9:16 --iw 2",

        SEGUROS_ONLINE: "A laptop screen showing an insurance broker, normal casual business attire, selling health, family and house insurance, in the zoom meeting, office background --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSegurosOnlineHomem.png --ar 9:16 --iw 2"
    },

    feminino: {
        // Novos prompts femininos
        CLAY_OFFICE: "as an insurance broker in her work setup, office setting, closing a deal on the phone, claymation style, visible facial expression --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaClayOfficeMulher.png --ar 9:16 --iw 2",

        CORRETOR_FUTURO: "as an insurance broker, showing popular items on the table that surrounds the insurance market, like a house, car, health, education, family and travel as little toys in a futuristic high-tech office setting, showing what the company provides --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaCorretorFuturoMulher.png --ar 9:16 --iw 2",

        HOLOGRAMAS_SEGUROS: "as an insurance worker, standing on an insurance office where half the room is solid and half hologram, with products representing insurance products in holograms, money, cars, houses, family, health and travel --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaHologramasSegurosMulher.png --ar 9:16 --iw 2",

        LIVRARIA_SEGUROS: "as a sophisticated and knowledgeable insurance provider inside a grand modern library of insurance knowledge, surrounded by floating books, holographic charts about risk and finance, elegant atmosphere, professional yet visionary, clear face --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaLivrariaSegurosMulher.png --ar 9:16 --iw 2",

        PALESTRANDO: "As an insurance host, on a stage lit insurance language, giving a keynote on the future of learning in insurance --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPalestrandoMulher.png --ar 9:16 --iw 2",

        PODERES: "portrait of an insurance broker holding a ball with symbols of a hospital, family, plane, money, house and car all in her palm like it is her superpowers --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaPoderesMulher.png --ar 9:16 --iw 2",

        SALA_FUTURO: "an insurance instructor lecturing amid holographic insurance modules, neon-blue lecture hall with students and floating insurance priorities, insurance lists, insurance symbols, insurance panels --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaFuturoMulher.png --ar 9:16 --iw 2",

        SALA_PIXAR: "as an insurance teacher in Pixar animation style, lecturing amid holographic insurance modules, neon-blue lecture hall with floating data panels, full classroom --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSalaPixarMulher.png --ar 9:16 --iw 2",

        SEGUROS_ONLINE: "A laptop screen showing an insurance broker, normal casual business attire, selling health, family and house insurance, in the zoom meeting, office background --cref {photoUrl} --sref https://foto-ai-picbrand-ns.s3.sa-east-1.amazonaws.com/referenciaSegurosOnlineMulher.png --ar 9:16 --iw 2"
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
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado
 * @param {string} photoUrl - URL da foto original
 * @returns {string} - Prompt formatado
 */
export const getPrompt = (gender, style, photoUrl) => {
    const promptTemplate = PROMPTS_DATA[gender]?.[style];
    if (!promptTemplate) {
        throw new Error(`Prompt não encontrado para gênero: ${gender} e estilo: ${style}`);
    }

    return promptTemplate.replace('{photoUrl}', photoUrl);
};
