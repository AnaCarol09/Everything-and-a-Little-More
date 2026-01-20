import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./fire-base.js";

const botao = document.getElementById("btnLogin");
const erro = document.getElementById("erro");

botao.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "index-f.html";
  } catch (e) {
    erro.innerText = "Usuário ou senha inválidos";
    console.error(e);
  }
});
