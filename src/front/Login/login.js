import UsuarioHelper from "../script/Usuario.js";

async function loginUsuario(event) {
    event.preventDefault();

    // Captura os valores dos campos do formulário
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!login || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

        // Obtém todos os doadores e centros
        const doadores = await UsuarioHelper.getDoador();
        const centros = await UsuarioHelper.getCentro();
        const tipoUsuario = document.getElementById("tipoUsuario").value;

        // Verifica se o login (email) existe em doadores ou centros
        if(tipoUsuario == "Doador"){
            doadores.array.forEach(doador => {
                if(doador.email === login){
                    if(doador.senha === senha){
                        logarUsuario(doador.id);
                    }
                    else {
                        window.alert(`A senha para o usuário ${doador.nome} está incorreta`);
                    }
                } else {
                    window.alert(`O email para o usuário ${doador.nome} está incorreto`);
                }
    
            });
        }
        else if(tipoUsuario == "Centro"){
            centros.array.forEach(centro => {
                if(centro.email === login){
                    if(centro.senha === senha){
                        logarUsuario(centro.id);
                    }
                    else {
                        window.alert(`A senha para o usuário ${centro.nome} está incorreta`);
                    }
                } else {
                    window.alert(`O email para o usuário ${centro.nome} está incorreto`);
                }
    
            });
        }
}

function logarUsuario(id){
    localStorage.setItem("UsuarioLogado", id)
}

// Adiciona o evento de submit ao formulário
document.querySelector('.formulario').addEventListener('submit', loginUsuario);
