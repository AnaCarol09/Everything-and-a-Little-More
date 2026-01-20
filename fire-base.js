// fire-base.js (VERSÃO CORRETA PARA NAVEGADOR)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase (a sua)
const firebaseConfig = {
  apiKey: "AIzaSyCPKmhm5IEADtuxwx2Ec3VeD4B1VSiQnRo",
  authDomain: "everything-and-a-little-more.firebaseapp.com",
  projectId: "everything-and-a-little-more",
  storageBucket: "everything-and-a-little-more.appspot.com",
  messagingSenderId: "58792553938",
  appId: "1:58792553938:web:a639f351a5ca33dc592c0b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
