# Configuração da API

## Como configurar a URL base

Para configurar a URL base da API, você tem duas opções:

### Opção 1: Variável de ambiente (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione a seguinte linha:
```
REACT_APP_API_URL=http://localhost:3000
```

### Opção 2: Modificar diretamente o código

Edite o arquivo `src/config/api.js` e altere a linha:
```javascript
BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
```

## Endpoint de Upload

O app faz upload das fotos para:
```
POST {{urlbase}}/photos/upload
```

### Formato do FormData:
- Campo: `file`
- Tipo: Arquivo de imagem (Blob)
- Nome: `photo.jpg`

### Exemplo de uso:
```javascript
const formData = new FormData();
formData.append('file', imageBlob, 'photo.jpg');
```

## Modo de Desenvolvimento

Por padrão, o app está configurado para usar simulação de upload durante o desenvolvimento. Para usar a API real, altere no arquivo `src/pages/CameraScreen.jsx`:

```javascript
// Trocar esta linha:
simulateUpload(photo, ...)

// Por esta:
uploadPhoto(photo, ...)
```
