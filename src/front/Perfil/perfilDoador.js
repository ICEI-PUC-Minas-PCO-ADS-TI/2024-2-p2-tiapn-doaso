document.addEventListener("DOMContentLoaded", function () {
    // Recupera os dados do localStorage
    const nomeCompleto = localStorage.getItem("nomeCompleto");
    const email = localStorage.getItem("email");
    const cpf = localStorage.getItem("cpf");
    const telefone = localStorage.getItem("telefone");
    const cep = localStorage.getItem("cep");
    const fotoPerfil = localStorage.getItem("fotoPerfil");

    // Preenche os campos do perfil
    if (nomeCompleto) {
        document.querySelector(".nomeItem").textContent = nomeCompleto;
    }

    if (cpf) {
        document.querySelector(".infosItens:nth-child(1) .info").textContent = cpf;
    }

    if (cep) {
        document.querySelector(".infosItens:nth-child(2) .info").textContent = cep;
    }

    if (telefone) {
        document.querySelector(".infosItens:nth-child(3) .info").textContent = telefone;
    }

    if (email) {
        document.querySelector(".infosItens:nth-child(4) .info").textContent = email;
    }

    if (fotoPerfil) {
        document.querySelector(".imgPerfil").src = fotoPerfil;
    }
});
