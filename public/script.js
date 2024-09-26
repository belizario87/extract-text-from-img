// Registre o evento de mudança do input de arquivo
document
  .getElementById("input-upload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB
    const validTypes = ["image/jpeg", "image/png"];

    // Verifica o tamanho da imagem
    if (file) {
      if (file.size > maxSize) {
        alert("A imagem deve ter no máximo 2 MB.");
        return;
      }

      // Verifica o formato da imagem
      if (!validTypes.includes(file.type)) {
        alert("Por favor, selecione uma imagem no formato JPG ou PNG.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.getElementById("selected-image");
        img.src = e.target.result;
        img.classList.remove("hidden");
        document.getElementById("label-upload").classList.add("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

// Registre o evento de clique do botão de upload
document
  .getElementById("button-upload")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Previne o comportamento padrão do botão

    const input = document.getElementById("input-upload");
    const file = input.files[0]; // Verifica se um arquivo foi selecionado
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/extract-text", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar a imagem");
        }

        const result = await response.json();

        document.getElementById("extracted-text").value = result.text; // Coloca o texto extraído no textarea
      } catch (error) {
        console.error("Erro:", error);
        document.getElementById("extracted-text").value =
          "Erro ao extrair texto da imagem";
      }
    } else {
      alert("Por favor, selecione uma imagem primeiro.");
    }
  });

function copyToClipboard() {
  var textarea = document.getElementById("extracted-text");
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      alert("Texto copiado para a área de transferência");
    })
    .catch((err) => {
      console.error("Erro ao copiar o texto: ", err);
    });
}
