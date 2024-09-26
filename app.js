const express = require("express");
const multer = require("multer");
const { createWorker } = require("tesseract.js");
const fs = require("fs");
const app = require("./server");

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });

// Rota para upload de imagem e extração de texto
app.post("/extract-text", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhuma imagem foi enviada.");
  }

  const imagePath = req.file.path;
  console.log("Caminho da imagem:", imagePath); // Log do caminho da imagem

  try {
    const worker = await createWorker("por"); // Criar o worker para cada requisição

    const {
      data: { text },
    } = await worker.recognize(imagePath); // variavel para o texto extraido
    console.log("texto extraido: ", text);

    await worker.terminate();
    fs.unlinkSync(imagePath); // Remove o arquivo após o processamento

    res.json({ text });
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
    res.status(500).send("Erro ao processar a imagem");
  }
});

//Rota para a pagina exemplo
app.get("/exemplo", (req, res) => {
  res.sendFile(__dirname + "/public/exemplo.html");
});
