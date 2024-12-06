import UsuarioHelper from "../script/Usuario.js";

function getUsuarioLogado() {
    var idUsuarioLogado = localStorage.getItem("id");
    return idUsuarioLogado;
}

function carregaPerfilDoador(idDoador) {
    // Obtém os dados do doador pelo ID
    let dadosDoador = UsuarioHelper.getDoadorById(idDoador);

    if (!dadosDoador) {
        console.error("Doador não encontrado");
        return;
    }

    // Atualiza os elementos do HTML com os dados do doador
    document.querySelector(".imgPerfil").src = dadosDoador.imagemPerfil || "../images/default-profile.png";
    document.querySelector(".nomeItem").textContent = dadosDoador.nome || "Nome não disponível";

    const infos = [
        { selector: ".infosItens:nth-child(1) .info", value: dadosDoador.cpf },
        { selector: ".infosItens:nth-child(2) .info", value: dadosDoador.cepEnd },
        { selector: ".infosItens:nth-child(3) .info", value: dadosDoador.numeroTel },
        { selector: ".infosItens:nth-child(4) .info", value: dadosDoador.email },
    ];

    infos.forEach(info => {
        const element = document.querySelector(info.selector);
        if (element) {
            element.textContent = info.value || "Não informado";
        }
    });
}

// Carrega o perfil do doador ao iniciar a página
const idDoador = getUsuarioLogado();
if (idDoador) {
    carregaPerfilDoador(idDoador);
} else {
    console.error("Usuário não está logado");
}

function editarPerfilDoador(idDoador){
    //Aqui voce vai fazer o processo reverso da função anterior. Você vai colocar um modal na pagina de perfil que abra somente quando clicar no botao de editar perfil (inclui esse botao na pagina)
    //Com isso, vc vai montar o seu objeto "dadosDoador" com as informações que vc coletar desse formulário do modal. No final vc vai ter essa estrutura:

    let dadosDoador = {
        nome: "input do nome",
        email: "input do email", //Esse nao pode ser alterado, ent vc nem precisa colocar na requisicao pq ele n vai entrar no banco
        senha: "input da senha", //Aqui tem que ter algum método de confirmação, tipo digitar duas vezes e ver se é igual
        imagemPerfil: "input da imagem", //Aqui vai ser necessário usar uma função que jogue o arquivo fa imagem numa api externa que retorne um link. Depois te ajudo nisso
        descricao: "input da descricao",
        cpf: 12345678910, //Esse nao pode ser alterado, ent vc nem precisa colocar na requisicao pq ele n vai entrar no banco
        ruaEnd: "input nome da rua",
        bairroEnd: "input nome do bairro",
        numeroEnd: 100, //input numero do endereço
        cidadeEnd: "input nome da cidade",
        estadoEnd: "MG", //O estado deve sempre ser sigla. Faz uma select box com os 26 estados
        cepEnd: 12345678,
        numeroTel: "12 34567-8910"
    }

    UsuarioHelper.putDoador(idDoador, dadosDoador);

    //O idDoador no parametro da função sempre vai ser o id do usuário logado. Esse id vc vai conseguir chamadno a função que escrevi la em cima mas, como mencionado anteriormente, nao vai funcionar pq a função de login n foi implementada.
    //É só vc fazer algo tipo: 
    // let idDoadorLogado = getUsuarioLogado();
    // editarPerfilDoador(idDoadorLogado); 
    //
    //Faz a mesma coisa pra carregar o perfil, mas a função de carregar deve vir junto com o load do documento, pq os dados tem que estarem la assim que for carregada a pagina
}
