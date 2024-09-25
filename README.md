# Extrair Texto de Imagem

Este projeto é uma aplicação em JavaScript para extrair texto de imagens utilizando a biblioteca Tesseract.js.

## Módulos Utilizados

- **Tesseract.js**: Biblioteca JavaScript para reconhecimento óptico de caracteres (OCR).
- **Express**: Framework para construção de aplicações web em Node.js.
- **Multer**: Middleware para upload de arquivos.
- **Path**: Módulo para manipulação de caminhos de arquivos.

## Como Funciona

1. **Instalação**:

   - Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
   - Navegue até o diretório do projeto: `cd extrair-text-de-img`
   - Instale as dependências: `npm install`

2. **Uso**:
   - Inicie o servidor: `node server.js`
   - Acesse `http://localhost:3000` no seu navegador.
   - Faça upload de uma imagem através da interface web.
   - O texto extraído será exibido na tela.

## Estrutura do Projeto

- **app.js**: Arquivo principal que configura e inicia o servidor Express.
- **public/**: Diretório para arquivos estáticos (HTML, CSS, JS).
- **uploads/**: Diretório onde as imagens enviadas são armazenadas temporariamente.
