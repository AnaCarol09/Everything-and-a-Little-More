function iniciarCatalogo(chaveStorage) {

  const filmes = JSON.parse(localStorage.getItem(chaveStorage)) || [];

  const nomeInput = document.getElementById("nome");
  const imagemInput = document.getElementById("imagem");
  const linkInput = document.getElementById("link");
  const lista = document.getElementById("lista");

  function salvar() {
    localStorage.setItem(chaveStorage, JSON.stringify(filmes));
  }

  function renderizar() {
    lista.innerHTML = "";

    filmes.forEach((f, index) => {
      const div = document.createElement("div");
      div.className = "filme";

      div.innerHTML = `
        <img src="${f.imagem}" alt="${f.nome}">
        <a href="${f.link}" target="_blank">${f.nome}</a>
        <button class="remover">Remover</button>
      `;

      div.querySelector(".remover").addEventListener("click", () => {
        filmes.splice(index, 1);
        salvar();
        renderizar();
      });

      lista.appendChild(div);
    });
  }

  window.adicionar = function () {
    const nome = nomeInput.value.trim();
    const imagem = imagemInput.value.trim();
    const link = linkInput.value.trim();

    if (!nome || !imagem || !link) {
      alert("Preencha todos os campos");
      return;
    }

    filmes.push({ nome, imagem, link });
    filmes.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    salvar();
    renderizar();

    nomeInput.value = "";
    imagemInput.value = "";
    linkInput.value = "";
  };

  // renderiza ao entrar na página
  renderizar();
}
