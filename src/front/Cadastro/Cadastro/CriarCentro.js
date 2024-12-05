import UsuarioHelper from "../../script/Metas.js";

var btn = document.getElementById('btnCriarMeta');
var btn2 = document.getElementById('btnDeletarMeta');

async function postarCentro() {
    var nome = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var imagemPerfil = document.getElementById('link.imagem').value;
    var descricao = document.getElementById('descricao').value;
    var cnpj = document.getElementById('cnpj').value;
    var valorArrecadado = document.getElementById('valor arrecadado').value;
    var ruaEnd = document.getElementById('nome da rua').value;
    var bairroEnd = document.getElementById('bairro').value;
    var numeroEnd = document.getElementById('numero do endereço').value;
    var cidadeEnd = document.getElementById('cidade').value;
    var estadoEnd = document.getElementById('estado').value;
    var cepEnd = document.getElementById('CEP').value;
    var numeroTel = document.getElementById('telefone').value;

    try {
        // Obtém todos os doadores e centros
        const doadores = await UsuarioHelper.getDoador();
        const centros = await UsuarioHelper.getCentro();

        // Verifica se o e-mail ou CNPJ já existem
        const existeUsuario = [...doadores, ...centros].some(user => user.email === email || user.cnpj === cnpj);

        if (existeUsuario) {
            alert("E-mail ou CNPJ já estão cadastrados no sistema.");
            return;
        }

        const body = {
            nome: nome,
            email: email,
            senha: senha,
            imagemPerfil: imagemPerfil,
            descricao: descricao,
            cnpj: cnpj,
            valorArrecadado: valorArrecadado,
            ruaEnd: ruaEnd,
            bairroEnd: bairroEnd,
            numeroEnd: numeroEnd,
            cidadeEnd: cidadeEnd,
            estadoEnd: estadoEnd,
            cepEnd: cepEnd,
            numeroTel: numeroTel
        };

        await UsuarioHelper.postCentro(body);
        alert("Centro cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar centro:", error);
        alert("Erro ao cadastrar centro. Tente novamente mais tarde.");
    }
}

function deletarCentro() {
    UsuarioHelper.deleteDoador("id");

}

btn.addEventListener('click', postarCentro);
btn2.addEventListener('click', deletarCentro);