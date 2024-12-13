import UsuarioHelper from "../../script/Usuario.js";

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
var btnCadastrar = document.getElementById('btnCadastrarCentro');
btnCadastrar.addEventListener('click', postarCentro);

async function postarCentro() {
    var nome = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var descricao = document.getElementById('descricao').value;
    var cnpj = document.getElementById('cnpj').value;
    var ruaEnd = document.getElementById('rua').value;
    var bairroEnd = document.getElementById('bairro').value;
    var numeroEnd = document.getElementById('numero').value;
    var cidadeEnd = document.getElementById('cidade').value;
    var estadoEnd = document.getElementById('estado').value;
    var cepEnd = document.getElementById('CEP').value;
    var numeroTel = document.getElementById('telefone').value;

    try{
        if(await verificaCadastro(email, cnpj) == false){
            return;
        }
        const body = {
            nome: nome,
            email: email,
            senha: senha,
            imagemPerfil: linkImagemPerfil,
            descricao: descricao,
            cnpj: cnpj,
            valorArrecadado: 0,
            ruaEnd: ruaEnd,
            bairroEnd: bairroEnd,
            numeroEnd: numeroEnd,
            cidadeEnd: cidadeEnd,
            estadoEnd: estadoEnd,
            cepEnd: cepEnd,
            numeroTel: numeroTel
        };

        await UsuarioHelper.postCentro(body);
        window.alert("Usuario Cadastrado!");
        window.location.href = "../../Login/login.html"
    } catch(error){
        console.log(error);
    }
}

async function verificaCadastro(emailCad, cnpjCad){
        var doadores = await UsuarioHelper.getDoador();
        var centros = await UsuarioHelper.getCentro();
        var existeUsuario = 0;

        console.log(doadores, centros)

        // Verifica se o e-mail ou CPF já existem
        doadores.forEach(doador => {
            if(doador.email_doador === emailCad){
                window.alert("Esse endereço de e-mail ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            } else if(doador.cpf === cnpjCad){
                window.alert("Esse CPF ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            }
        });

        centros.forEach(centro => {
            if(centro.email_centro === emailCad){
                window.alert("Esse endereço de e-mail ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            } else if(centro.cnpj === cnpjCad){
                window.alert("Esse CPF ja está cadastrado no sistema! Por favor, use outro!")
                existeUsuario++;
            }
        });

        if(existeUsuario != 0){  
            return false;
        }

}

// Salvar a foto de perfil no localStorage
// function selecionarFoto() {
//     const inputFile = document.getElementById('selecaoFoto');
//     inputFile.click(); // Abre o seletor de arquivos

//     inputFile.addEventListener('change', function () {
//         const file = inputFile.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 const fotoBase64 = e.target.result;
//                 document.getElementById('fotoPreview').src = fotoBase64; // Atualiza o preview
//                 localStorage.setItem('fotoPerfil', fotoBase64); // Salva no localStorage
//             };
//             reader.readAsDataURL(file); // Lê o arquivo como base64
//         }
//     });
// }


// async function postarCentro() {
//     var nome = document.getElementById('nomeCompleto').value;
//     var email = document.getElementById('email').value;
//     var senha = document.getElementById('senha').value;
//     var imagemPerfil = document.getElementById('link.imagem').value;
//     var descricao = document.getElementById('descricao').value;
//     var cnpj = document.getElementById('cnpj').value;
//     var valorArrecadado = document.getElementById('valor arrecadado').value;
//     var ruaEnd = document.getElementById('nome da rua').value;
//     var bairroEnd = document.getElementById('bairro').value;
//     var numeroEnd = document.getElementById('numero do endereço').value;
//     var cidadeEnd = document.getElementById('cidade').value;
//     var estadoEnd = document.getElementById('estado').value;
//     var cepEnd = document.getElementById('CEP').value;
//     var numeroTel = document.getElementById('telefone').value;

//     try {
//         // Obtém todos os doadores e centros
//         const doadores = await UsuarioHelper.getDoador();
//         const centros = await UsuarioHelper.getCentro();

//         // Verifica se o e-mail ou CNPJ já existem
//         const existeUsuario = [...doadores, ...centros].some(user => user.email === email || user.cnpj === cnpj);

//         if (existeUsuario) {
//             alert("E-mail ou CNPJ já estão cadastrados no sistema.");
//             return;
//         }

//         const body = {
//             nome: nome,
//             email: email,
//             senha: senha,
//             imagemPerfil: imagemPerfil,
//             descricao: descricao,
//             cnpj: cnpj,
//             valorArrecadado: valorArrecadado,
//             ruaEnd: ruaEnd,
//             bairroEnd: bairroEnd,
//             numeroEnd: numeroEnd,
//             cidadeEnd: cidadeEnd,
//             estadoEnd: estadoEnd,
//             cepEnd: cepEnd,
//             numeroTel: numeroTel
//         };

//         await UsuarioHelper.postCentro(body);
//         alert("Centro cadastrado com sucesso!");
//     } catch (error) {
//         console.error("Erro ao cadastrar centro:", error);
//         alert("Erro ao cadastrar centro. Tente novamente mais tarde.");
//     }
// }

// function deletarCentro() {
//     UsuarioHelper.deleteDoador("id");

// }

// btn.addEventListener('click', postarCentro);
// btn2.addEventListener('click', deletarCentro);