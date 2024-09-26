const express = require("express");

const server = express();
const port = 5555;

server.use(express.static("public"));
const errorDefault = "Erro ao iniciar o servidor";
try {
  const Server = server.listen(port, (e) => {
    if (e) console.error(errorDefault, e);
    else {
      console.log("Servidor rodando na porta: " + port);
    }
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor: ", error);
}

module.exports = server;
