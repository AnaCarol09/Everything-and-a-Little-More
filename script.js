  function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "topmais" && senha === "2629") {
      localStorage.setItem("logado", "true");
      window.location.href = "index-f.html";
    } else {
      document.getElementById("erro").innerText = "Usuário ou senha inválidos";
    }
  }