export default perfilCentro;

import UsuarioHelper from "../script/Usuario.js";

function getUsuarioLogado(){
    var idUsuarioLogado = localStorage.getItem("id");
    return idUsuarioLogado;
}
function carregaPerfilCentro(idCentro){
    // Obtém os dados do Centro pelo ID
    let dadosCentro = UsuarioHelper.getCentroById(idCentro);

    if (!dadosCentro) {
        console.error("Centro não encontrado");
        return;
    }

    // Atualiza os elementos do HTML com os dados do Centro
    document.querySelector(".imgPerfil").src = dadosCentro.imagemPerfil || "../images/default-profile.png";
    document.querySelector(".nomeItem").textContent = dadosCentro.nome || "Nome não disponível";

    const infos = [
        { selector: ".infosItens:nth-child(1) .info", value: dadosCentro.cnpj },
        { selector: ".infosItens:nth-child(2) .info", value: dadosCentro.cepEnd },
        { selector: ".infosItens:nth-child(3) .info", value: dadosCentro.numeroTel },
        { selector: ".infosItens:nth-child(4) .info", value: dadosCentro.email },
    ];

    infos.forEach(info => {
        const element = document.querySelector(info.selector);
        if (element) {
            element.textContent = info.value || "Não informado";
        }
    });
}

// Carrega o perfil do Centro ao iniciar a página
const idCentro = getUsuarioLogado();
if (idCentro) {
    carregaPerfilCentro(idCentro);
} else {
    console.error("Usuário não está logado");
}

function editarPerfilCentro(idCentro){
    //Aqui voce vai fazer o processo reverso da função anterior. Você vai colocar um modal na pagina de perfil que abra somente quando clicar no botao de editar perfil (inclui esse botao na pagina)
    //Com isso, vc vai montar o seu objeto "dadosCentro" com as informações que vc coletar desse formulário do modal. No final vc vai ter essa estrutura:

    let dadosCentro = {
        nome: "input do nome",
        email: "input do email", //Esse nao pode ser alterado, ent vc nem precisa colocar na requisicao pq ele n vai entrar no banco
        senha: "input da senha", //Aqui tem que ter algum método de confirmação, tipo digitar duas vezes e ver se é igual
        imagemPerfil: "input da imagem", //Aqui vai ser necessário usar uma função que jogue o arquivo fa imagem numa api externa que retorne um link. Depois te ajudo nisso
        descricao: "input da descricao",
        cnpj: 12345678912345, //Esse nao pode ser alterado, ent vc nem precisa colocar na requisicao pq ele n vai entrar no banco
        ruaEnd: "input nome da rua",
        bairroEnd: "input nome do bairro",
        numeroEnd: 100, //input numero do endereço
        cidadeEnd: "input nome da cidade",
        estadoEnd: "MG", //O estado deve sempre ser sigla. Faz uma select box com os 26 estados
        cepEnd: 12345678,
        numeroTel: "12 34567-8910"
    }

    UsuarioHelper.putCentro(idCentro, dadosCentro);

    //O idCentro no parametro da função sempre vai ser o id do usuário logado. Esse id vc vai conseguir chamadno a função que escrevi la em cima mas, como mencionado anteriormente, nao vai funcionar pq a função de login n foi implementada.
    //É só vc fazer algo tipo: 
    // let idCentroLogado = getUsuarioLogado();
    // editarPerfilCentro(idCentroLogado); 
    //
    //Faz a mesma coisa pra carregar o perfil, mas a função de carregar deve vir junto com o load do documento, pq os dados tem que estarem la assim que for carregada a pagina
}
