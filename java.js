function iniciarCatalogo() {

  const nomeInput = document.getElementById("nome");
  const imagemInput = document.getElementById("imagem");
  const linkInput = document.getElementById("link");
  const lista = document.getElementById("lista");

  const filmesRef = collection(db, "filmes");

  async function renderizar() {
    lista.innerHTML = "";

    const snapshot = await getDocs(filmesRef);

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
        await deleteDoc(doc(db, "filmes", id));
        renderizar();
      });

      lista.appendChild(div);
    });
  }

  window.adicionar = async function () {
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
      link
    });

    nomeInput.value = "";
    imagemInput.value = "";
    linkInput.value = "";

    renderizar();
  };

  // carrega ao entrar
  renderizar();
}
