import UsuarioHelper from "../script/Usuario.js";

function getUsuarioLogado(){
    var idUsuarioLogado = localStorage.getItem("id");
    return idUsuarioLogado;
}

function carregaPerfilDoador(idDoador){
    let dadosDoador = UsuarioHelper.getDoadorById(idDoador);
    
    //no dadosDoador você vai ter o seguinte JSON armazenado: EXEMEPLO
    //      dadosDoador: {
    //         "nome": "nome",
    //        "email": "email",
    //         "senha": "senha",
    //         "imagemPerfil": "link.imagem",
    //         "descricao": "descricao",
    //         "cpf": 12345678910,
    //         "ruaEnd": "nome da rua",
    //         "bairroEnd": "nome do bairro",
    //         "numeroEnd": 100,
    //         "cidadeEnd": "nome da cidade",
    //         "estadoEnd": "MG",
    //         "cepEnd": 12345678,
    //         "numeroTel": "12 34567-8910"
    //      }
    //
    //Pega o valor dessas variaveis e coloca no HTML, para carregar os dados do perfil do doador, seguindo os ids e classes usadas nas divs/h1/p/etc no arquivo de perfilDoador.html
    //Não vai funcionar de cara, pq a função de login n ta implementada. Só faz a funcionalidade e eu corrijo se não funcionar depois
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
