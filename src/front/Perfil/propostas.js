//PROPOSTAS DE DOAÇÃO
import PropostaHelper from "../script/Proposta.js";
import { postImgAPI } from '../script/API_img.js';
import { link } from "fs";

var btnEnviarProposta = document.getElementById('btnCadastrarProposta');
btnEnviarProposta.addEventListener('click', cadastrarProposta);

var linkImagemProposta = "https://jornalsemanario.com.br/wp-content/uploads/2023/05/9pxteoew-01_agasalhos.jpg";


// document.getElementById('imagemProposta').addEventListener('change', async function (event) {
//     const inputElement = event.target;

//     if (!inputElement.files || inputElement.files.length === 0) {
//         alert("Por favor, selecione uma imagem.");
//         return;
//     }

//     try {
//         // Chame a função para enviar a imagem e obter o URL
//         const url = await postImgAPI('imagemProposta');
//         console.log("Imagem carregada em:", url);
//         linkImagemPerfil = url;

//     } catch (error) {
//         console.error("Erro ao enviar a imagem:", error);
//         alert("Falha ao carregar a imagem.");
//     }
// });


function obterDataAtual() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  function getUsuarioLogado(){
    var usuarioLogado = localStorage.getItem("UsuarioLogado");
    return usuarioLogado;
  }

  function getCentroId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var idCentro = urlParams.get('id');

    return idCentro;
  }

async function cadastrarProposta(){

    var descProposta = document.getElementById('descricaoProposta').value;
    var doador = getUsuarioLogado();
    var centro = getCentroId();

    let bodyProposta ={
        descricaoProposta: descProposta,
        dataProposta: obterDataAtual(),
        idDoadorRemetente: doador.id_doador,
        idCentroDestinatario: centro.id_Centro,
        imagemProposta: linkImagemProposta
    }   

    await PropostaHelper.postProposta(bodyProposta, linkImagemProposta)
    window.alert("Proposta enviada com sucesso")
}


