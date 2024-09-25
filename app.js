const express = require("express");
const multer = require("multer");
const { createWorker } = require("tesseract.js");
const fs = require("fs");

// Config do express
const app = express();
const port = 8888;

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

// Rota para upload de imagem e extração de texto
app.post("/extract-text", upload.single("image"), async (req, res) => {
  console.log("Imagem recebida:", req.file); // Log da imagem recebida
  if (!req.file) {
    return res.status(400).send("Nenhuma imagem foi enviada.");
  }

  const imagePath = req.file.path;
  console.log("Caminho da imagem:", imagePath); // Log do caminho da imagem

  try {
    const worker = await createWorker("por"); // Criar o worker para cada requisição

    const {
      data: { text },
    } = await worker.recognize(imagePath); // Reconhecer o texto

    console.log("Texto extraído:", text); // Log do texto extraído

    await worker.terminate(); // Terminar o worker após a extração
    fs.unlinkSync(imagePath); // Remove o arquivo após o processamento

    res.json({ text }); // Retornar o texto extraído
  } catch (error) {
    console.error("Erro ao processar a imagem:", error); // Log do erro
    res.status(500).send("Erro ao processar a imagem");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
