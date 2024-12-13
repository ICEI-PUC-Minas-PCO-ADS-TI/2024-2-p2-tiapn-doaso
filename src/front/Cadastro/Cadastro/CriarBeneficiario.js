import UsuarioHelper from "../../script/Usuario.js";

var btnCadastrar = document.getElementById('btnCadastrar');
btnCadastrar.addEventListener('click', postarDoador);


async function postarDoador() {
    var nome = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    // var imagemPerfil = document.getElementById('link.imagem').value;
    var descricao = document.getElementById('descricao').value;
    var cpf = document.getElementById('cpf').value;
    var ruaEnd = document.getElementById('rua').value;
    var bairroEnd = document.getElementById('bairro').value;
    var numeroEnd = document.getElementById('numero').value;
    var cidadeEnd = document.getElementById('cidade').value;
    var estadoEnd = document.getElementById('estado').value;
    var cepEnd = document.getElementById('CEP').value;
    var numeroTel = document.getElementById('telefone').value;

    try{
        if(await verificaCadastro(email, cpf) == false){
             return;
        }
        const body = {
            nome: nome,
            email: email,
            senha: senha,
            imagemPerfil: "link da imagem.png",
            descricao: "",
            cpf: cpf,
            ruaEnd: ruaEnd,
            bairroEnd: bairroEnd,
            numeroEnd: numeroEnd,
            cidadeEnd: cidadeEnd,
            estadoEnd: estadoEnd,
            cepEnd: cepEnd,
            numeroTel: numeroTel
        };

        await UsuarioHelper.postDoador(body);
        window.alert("Beneficiário cadastrado com sucesso!");
    } catch(error){
        console.log(error);
    }
}

async function verificaCadastro(emailCad, cpfCad){
        const doadores = await UsuarioHelper.getDoador();
        const centros = await UsuarioHelper.getCentro();
        var existeUsuario = 0;

        console.log(doadores, centros)

        // Verifica se o e-mail ou CPF já existem
        for(let doador of doadores){
            if(doador.email === emailCad){
                window.alert("Esse endereço de e-mail ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            }
            if(doador.cpf === cpfCad){
                window.alert("Esse CPF ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            }
        }

        for(let centro of centros){
            if(centro.email === emailCad){
                window.alert("Esse endereço de e-mail ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            }
        }

        if(existeUsuario > 0){  
            return false;
        }

}

