function iniciarCatalogo(colecao) {

  const nomeInput = document.getElementById("nome");
  const imagemInput = document.getElementById("imagem");
  const linkInput = document.getElementById("link");
  const lista = document.getElementById("lista");

  // Se não passar coleção, usa "filmes"
  const colecaoNome = colecao || "filmes";
  const filmesRef = collection(db, colecaoNome);

  async function renderizar() {
    lista.innerHTML = "";

    const snapshot = await getDocs(filmesRef);

    if (snapshot.empty) {
      lista.innerHTML = "<p style='text-align:center; color:#999;'>Nenhum item adicionado ainda</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const f = docSnap.data();
      const id = docSnap.id;

      const div = document.createElement("div");
      div.className = "filme";

      div.innerHTML = `
        <img src="${f.imagem}" alt="${f.nome}">
        <a href="${f.link}" target="_blank">${f.nome}</a>
        <button class="remover">Remover</button>
      `;

      div.querySelector(".remover").addEventListener("click", async () => {
        await deleteDoc(doc(db, colecaoNome, id));
        renderizar();
      });

      lista.appendChild(div);
    });
  }

  window.adicionar = async function () {
    // Verifica se o usuário está logado
    if (!localStorage.getItem("logado")) {
      alert("Você precisa estar logado para adicionar itens");
      window.location.href = "index.html";
      return;
    }

    // Pede a senha para confirmar a adição
    const senhaConfirmacao = prompt("Digite sua senha para adicionar um item:");
    if (senhaConfirmacao !== "2629") {
      alert("Senha incorreta!");
      return;
    }

    const nome = nomeInput.value.trim();
    const imagem = imagemInput.value.trim();
    const link = linkInput.value.trim();

    if (!nome || !imagem || !link) {
      alert("Preencha todos os campos");
      return;
    }

    await addDoc(filmesRef, {
      nome,
      imagem,
      link,
      dataCriacao: new Date().toISOString(),
      usuario: localStorage.getItem("usuario") || "anonimo"
    });

    nomeInput.value = "";
    imagemInput.value = "";
    linkInput.value = "";

    renderizar();
  };

  // carrega ao entrar
  renderizar();
}
