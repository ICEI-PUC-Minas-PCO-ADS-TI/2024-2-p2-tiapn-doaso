import UsuarioHelper from "../script/Usuario.js";

var btnLogin = document.getElementById("btnLogin")

btnLogin.addEventListener('click', verificaLogin)

async function verificaLogin() {    

    // Captura os valores dos campos do formulário
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    // Obtém todos os doadores e centros
    var doadores = await UsuarioHelper.getDoador();
    var centros = await UsuarioHelper.getCentro();
    var tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked').value;

    console.log("123", doadores, centros, tipoUsuario)
    
    // Verifica se o login (email) existe em doadores ou centros
    if(tipoUsuario == "Doador"){
        doadores.forEach(doador => {
            if(doador.email_doador == login){
                if(doador.senha_doador == senha){
                    logarUsuario(doador);
                }
                else {
                    window.alert(`A senha para o usuário ${doador.nome_doador} está incorreta`);
                }
            }

        });
    }
    else if(tipoUsuario == "Centro"){
        centros.forEach(centro => {
            if(centro.email_centro == login){
                if(centro.senha_centro == senha){
                    logarUsuario(centro);
                }
                else {
                    window.alert(`A senha para o usuário ${centro.nome_centro} está incorreta`);
                }
            }
        });
    } else {
        console.log("Tipo Inválido")
    }
}

function logarUsuario(usuario){
    localStorage.setItem("UsuarioLogado", JSON.stringify(usuario))
    window.alert(`Usuário logado`)
    window.location.href = "../Home/index.html";
}
