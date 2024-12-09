import UsuarioHelper from "../../script/Usuario.js";

var btnCadastrar = document.getElementById('btnCadastrar');
var btnDeletar = document.getElementById('btnDeletar');

async function postarDoador() {
    var nome = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    // var senha = document.getElementById('senha').value;
    // var imagemPerfil = document.getElementById('link.imagem').value;
    // var descricao = document.getElementById('descricao').value;
    var cpf = document.getElementById('cpf').value;
    var ruaEnd = document.getElementById('rua').value;
    var bairroEnd = document.getElementById('bairro').value;
    // var numeroEnd = document.getElementById('numero do endereço').value;
    var cidadeEnd = document.getElementById('cidade').value;
    var estadoEnd = document.getElementById('estado').value;
    var cepEnd = document.getElementById('CEP').value;
    var numeroTel = document.getElementById('telefone').value;

    try{
        // if(await verificaCadastro(email, cpf) == false){
        //     return;
        // }
        const body = {
            nome: nome,
            email: email,
            senha: "1234",
            imagemPerfil: "link da imagem.png",
            descricao: "",
            cpf: cpf,
            ruaEnd: ruaEnd,
            bairroEnd: bairroEnd,
            numeroEnd: 1,
            cidadeEnd: cidadeEnd,
            estadoEnd: estadoEnd,
            cepEnd: cepEnd,
            numeroTel: numeroTel
        };

        await UsuarioHelper.postDoador(body);
        await UsuarioHelper.getDoador();
        // alert("Beneficiário cadastrado com sucesso!");
    } catch(error){
        console.log(error);
    }
}

function deletarDoador() {
    for (let i = 29; i < 34; i++){
        UsuarioHelper.deleteDoador(i);
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

btnCadastrar.addEventListener('click', postarDoador);
btnDeletar.addEventListener('click', deletarDoador);

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