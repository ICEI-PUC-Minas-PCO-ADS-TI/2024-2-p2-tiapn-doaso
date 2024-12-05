import UsuarioHelper from "../../script/Metas.js";

async function loginUsuario(event) {
    event.preventDefault();

    // Captura os valores dos campos do formulário
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!login || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Obtém todos os doadores e centros
        const doadores = await UsuarioHelper.getDoador();
        const centros = await UsuarioHelper.getCentro();

        // Verifica se o login (email) existe em doadores ou centros
        const usuario = [...doadores, ...centros].find(user => user.email === login);

        if (!usuario) {
            alert("E-mail não encontrado.");
            return;
        }

        // Verifica a senha
        if (usuario.senha === senha) {
            alert("Login Realizado!");
            console.log("Usuário logado:", usuario);

            // Redireciona para a página inicial
            // aqui precisa colocar a url da home
            window.location.href = "../Home/Home.html";
        } else {
            alert("Senha incorreta.");
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao realizar login.");
    }
}

// Adiciona o evento de submit ao formulário
document.querySelector('.formulario').addEventListener('submit', loginUsuario);
