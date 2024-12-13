import UsuarioHelper from "../../script/Usuario.js";
import { postImgAPI } from '../../script/API_img.js';

document.getElementById('btnMudarFoto').addEventListener('click', () => {
    document.getElementById('inputFoto').click();
});

var linkImagemPerfil;

document.getElementById('inputFoto').addEventListener('change', async function (event) {
    const inputElement = event.target;

    if (!inputElement.files || inputElement.files.length === 0) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    try {
        // Chame a função para enviar a imagem e obter o URL
        const url = await postImgAPI('inputFoto');
        console.log("Imagem carregada em:", url);
        linkImagemPerfil = url;
        // Atualize a imagem de perfil
        document.getElementById('fotoPerfil').src = url;

        alert("Foto de perfil alterada com sucesso!");

    } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        alert("Falha ao carregar a imagem.");
    }
});

var btnCadastrar = document.getElementById('btnCadastrar');
btnCadastrar.addEventListener('click', postarDoador);


async function postarDoador() {
    var nome = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var imagemPerfil = linkImagemPerfil;
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
            imagemPerfil: imagemPerfil,
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
        window.location.href = "../../Login/login.html"
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

