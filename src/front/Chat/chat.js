import MensagemHelper from "../../script/Mensagem.js";
import UsuarioHelper from "../../script/Usuario.js";
import PropostaHelper from "../../script/Proposta.js";
import ImagemHelper from "../../script/ImagemDoacao.js";



const propostas = await PropostaHelper.getProposta();

const propostasFiltradas = propostas.filter((proposta) => {
    return proposta.id_doador_remetente === userId || proposta.id_centro_destinatario === userId;
  });
const propostaId = localStorage.getItem('propostaId');

const mensagemInput = document.getElementById('mensagem');
const enviarButton = document.getElementById('enviar');
const mensagensDiv = document.getElementById('mensagens');
const data = new Date();

const usuarioLogado = localStorage.getItem('usuarioLogado');
let remetenteId;
let destinatarioId;

let proposta = getProposta(propostaId);

const doadorId = proposta.id_doador_remetente;
const centroDeDoacaoId = proposta.id_centro_destinatario;


async function renderizarPropostas() {
    const chatsDiv = document.querySelector('.chats');
    chatsDiv.innerHTML = '';
  
    propostas.forEach((proposta) => {
      const imagem = await ImagemHelper.getImagemByIdProposta(proposta.id_proposta);
    
      const chatDiv = document.createElement('div');
      chatDiv.classList.add('chats');
  
      const dadosDiv = document.createElement('div');
      dadosDiv.classList.add('dados');
  
      const imagemDiv = document.createElement('div');
      imagemDiv.classList.add('imagem');
      imagemDiv.style.backgroundImage = `url(${imagem})`;
  
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
  
      const nomeH2 = document.createElement('h2');
      nomeH2.classList.add('nome');
      nomeH2.textContent = proposta.destinatario.nome;
  
      const tipoUsuarioH3 = document.createElement('h3');
      tipoUsuarioH3.classList.add('tipoUsuario');
      tipoUsuarioH3.textContent = proposta.destinatario.tipoUsuario;
  
      userDiv.appendChild(nomeH2);
      userDiv.appendChild(tipoUsuarioH3);
  
      dadosDiv.appendChild(imagemDiv);
      dadosDiv.appendChild(userDiv);
  
      chatDiv.appendChild(dadosDiv);
  
      chatsDiv.appendChild(chatDiv);
    });
  }

if(usuarioLogado.equals(doadorId)){
    remetenteId = doadorId;
    destinatarioId = centroDeDoacaoId;
    let destinatario = coletarDadosCentro(centroDeDoacaoId);
}
else{
    remetenteId = centroDeDoacaoId;
    destinatarioId = doadorId;
    let destinatario = coletarDadosDoador(doadorId);
}

enviarButton.addEventListener('click', enviarMensagem);

async function coletarDadosCentro(id) {
    return await UsuarioHelper.getCentroById(id);
}

async function coletarDadosDoador(id) {
    return await UsuarioHelper.getDoadorById(id);
}

async function getProposta(propostaId){
   return await PropostaHelper.getProposta(propostaId);
}

async function getImagem(propostaId){
    return await ImagemHelper.getImagemByIdProposta(propostaId);
 }

async function enviarMensagem() {
  const conteudoMensagem = mensagemInput.value;
  const mensagem = {
    dataMensagem : data,
    conteudoMensagem: conteudoMensagem,
    visualizacaoMensagem: false,
    idProposta: propostaId,
    idRemetente: remetente,
    idDestinatario: destinatario
  }
  if (mensagem.trim() !== '') {
    await MensagemHelper.postMensagem(mensagem);
  }
}

async function atualizarMensagens() {
  
    await MensagemHelper.getMensagemByIdProposta(propostaId);
}

atualizarMensagens();