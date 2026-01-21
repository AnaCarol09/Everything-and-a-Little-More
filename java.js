import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  collection, getDocs, addDoc, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./fire-base.js";


onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

export function iniciarCatalogo(colecao) {

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

    // Converte para array e ordena alfabeticamente
    const itens = [];
    snapshot.forEach((docSnap) => {
      itens.push({ id: docSnap.id, data: docSnap.data() });
    });

    itens.sort((a, b) => a.data.nome.localeCompare(b.data.nome));

    itens.forEach(({ id, data: f }) => {
      const div = document.createElement("div");
      div.className = "filme";

      div.innerHTML = `
        <img src="${f.imagem}" alt="${f.nome}">
        <a href="${f.link}" target="_blank">${f.nome}</a>
        ${auth.currentUser && auth.currentUser.uid === f.usuario 
          ? `<button class="remover">Remover</button>` 
          : ""}
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
    if (!auth.currentUser) {
      alert("Você precisa estar logado");
      window.location.href = "index.html";
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
      usuario: auth.currentUser.uid,
      email: auth.currentUser.email,
      criadoEm: new Date()
    });

    nomeInput.value = "";
    imagemInput.value = "";
    linkInput.value = "";

    renderizar();
  };

  // Conecta o botão à função
  const btnAdicionar = document.getElementById("btnAdicionar");
  if (btnAdicionar) {
    btnAdicionar.addEventListener("click", window.adicionar);
  }

  // carrega ao entrar
  renderizar();
}

const botaoLogout = document.getElementById("logout");

if (botaoLogout) {
  botaoLogout.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html"; // tela de login
  });
}


