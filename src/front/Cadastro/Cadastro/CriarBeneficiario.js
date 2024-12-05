import UsuarioHelper from "../../script/Metas.js";

var btn = document.getElementById('btnCriarDoador');
var btn2 = document.getElementById('btnDeletarDoador');

async function postarDoador() {
    var nome = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var imagemPerfil = document.getElementById('link.imagem').value;
    var descricao = document.getElementById('descricao').value;
    var cpf = document.getElementById('cpf').value;
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

        // Verifica se o e-mail ou CPF já existem
        const existeUsuario = [...doadores, ...centros].some(user => user.email === email || user.cpf === cpf);

        if (existeUsuario) {
            alert("E-mail ou CPF já estão cadastrados no sistema.");
            return;
        }

        const body = {
            nome: nome,
            email: email,
            senha: senha,
            imagemPerfil: imagemPerfil,
            descricao: descricao,
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
        alert("Beneficiário cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar beneficiário:", error);
        alert("Erro ao cadastrar beneficiário. Tente novamente mais tarde.");
    }
}

function deletarDoador() {
    UsuarioHelper.deleteDoador("id");

}

btn.addEventListener('click', postarDoador);
btn2.addEventListener('click', deletarDoador);