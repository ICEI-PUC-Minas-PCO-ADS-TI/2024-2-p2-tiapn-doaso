import MensagemHelper from "../script/Mensagem.js";
import UsuarioHelper from "../script/Usuario.js";
import PropostaHelper from "../script/Proposta.js";
import ImagemHelper from "../script/ImagemDoacao.js";


const propostas = await PropostaHelper.getProposta();




const propostaId = localStorage.getItem('propostaId');

const mensagemInput = document.getElementById('mensagem');
const enviarButton = document.getElementById('enviar');
const mensagensDiv = document.getElementById('mensagens');
const data = new Date();

const usuarioLogado = JSON.parse(localStorage.getItem('UsuarioLogado'));
const userId = usuarioLogado.id_doador;

console.log(usuarioLogado);

let tipo;

const propostasFiltradas = propostas.filter((proposta) => {
  if (proposta.id_doador_remetente === userId)
    tipo = "doador";
  if (proposta.id_centro_destinatario === userId)
    tipo = "centro";
  const isDoadorSimilar = proposta.id_doador_remetente === (userId);
  const isCentroSimilar = proposta.id_centro_destinatario === (userId);
  return isDoadorSimilar || isCentroSimilar;
});

let remetenteId;
let destinatarioId;

let centros = await coletarTodosCentros();
const centrosArray = Object.values(centros);
let doadores = await coletarTodosDoadores();

let proposta = await getProposta(propostaId);

const doadorId = proposta.id_doador_remetente;
const centroDeDoacaoId = proposta.id_centro_destinatario;


function renderizarPropostasDoador() {
  const chatsDiv = document.querySelector('.chats');
  chatsDiv.innerHTML = '';

  propostasFiltradas.forEach((proposta) => {
    const destinatario = Object.values(centros).find(centro => centro.id_centro === proposta.id_centro_destinatario);

    const imagem = destinatario.imagem_perfil_centro;

    const chatDiv = document.createElement('div');
    chatDiv.classList.add('chats');
    chatDiv.addEventListener('click', () => abrirChat(destinatario));

    const dadosDiv = document.createElement('div');
    dadosDiv.classList.add('dados');

    const imagemDiv = document.createElement('div');
    imagemDiv.classList.add('imagem');
    imagemDiv.style.backgroundImage = `url(${imagem})`;

    const userDiv = document.createElement('div');
    userDiv.classList.add('user');

    const nomeH2 = document.createElement('h2');
    nomeH2.classList.add('nome');
    nomeH2.textContent = destinatario.nome_centro;

    const tipoUsuarioH3 = document.createElement('h3');
    tipoUsuarioH3.classList.add('tipoUsuario');
    tipoUsuarioH3.textContent = "Centro de Doação";

    userDiv.appendChild(nomeH2);
    userDiv.appendChild(tipoUsuarioH3);

    dadosDiv.appendChild(imagemDiv);
    dadosDiv.appendChild(userDiv);

    chatDiv.appendChild(dadosDiv);

    chatsDiv.appendChild(chatDiv);
  });
}

renderizarPropostasDoador();

function abrirChat(destinatario) {
  // Limpa o container de chat
  const chatContainer = document.querySelector('.conversa');
  chatContainer.innerHTML = ''; // Limpa o conteúdo anterior

  // Cria a div cabecalho
  const cabecalhoDiv = document.createElement('div');
  cabecalhoDiv.classList.add('cabecalho');

  // Cria a div dados
  const dadosDiv = document.createElement('div');
  dadosDiv.classList.add('dados');

  // Cria a div imagem
  const imagemDiv = document.createElement('div');
  imagemDiv.classList.add('imagem');

  // Cria a div user
  const userDiv = document.createElement('div');
  userDiv.classList.add('user');

  // Cria o nome
  const nomeH2 = document.createElement('h2');
  nomeH2.classList.add('nome');
  nomeH2.textContent = destinatario.nome_centro;

  // Cria o tipo de usuário
  const tipoH3 = document.createElement('h3');
  tipoH3.classList.add('tipoUsuario');
  tipoH3.textContent = "Centro de Doação";

  // Monta a estrutura
  userDiv.appendChild(nomeH2);
  userDiv.appendChild(tipoH3);
  dadosDiv.appendChild(imagemDiv);
  dadosDiv.appendChild(userDiv);
  cabecalhoDiv.appendChild(dadosDiv);
  chatContainer.appendChild(cabecalhoDiv);

  if (proposta.status_proposta) {
    // Cria a div mensagens
    const mensagensDiv = document.createElement('div');
    mensagensDiv.classList.add('mensagens');
    conversaDiv.appendChild(mensagensDiv);

    // Cria a div para escrever mensagem
    const escreverMensagemDiv = document.createElement('div');
    escreverMensagemDiv.classList.add('escreverMensagem', 'd-flex', 'align-items-center', 'mt-3', 'p-3');

    const inputMensagem = document.createElement('input');
    inputMensagem.type = 'text';
    inputMensagem.classList.add('form-control', 'me-2');
    inputMensagem.placeholder = 'Digite uma mensagem';
    inputMensagem.setAttribute('aria-label', 'Mensagem');

    const buttonEnviar = document.createElement('button');
    buttonEnviar.type = 'button';
    buttonEnviar.classList.add('btn');
    buttonEnviar.textContent = 'Enviar';

    escreverMensagemDiv.appendChild(inputMensagem);
    escreverMensagemDiv.appendChild(buttonEnviar);
    chatContainer.appendChild(escreverMensagemDiv);
  } else {
    // Cria a div de aviso
    // Cria a div de aviso
    const avisoDiv = document.createElement('div');
    avisoDiv.classList.add('aviso');
    avisoDiv.textContent = 'Proposta pendente ou recusada';
    chatContainer.appendChild(avisoDiv);
  }

}

if (userId === doadorId) {
  remetenteId = doadorId;
  destinatarioId = centroDeDoacaoId;
  let destinatario = coletarDadosCentro(centroDeDoacaoId);
}
else {
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

async function getProposta(propostaId) {
  return await PropostaHelper.getProposta(propostaId);
}

async function getImagem(propostaId) {
  return await ImagemHelper.getImagemByIdProposta(propostaId);
}

async function coletarTodosCentros() {
  return await UsuarioHelper.getCentro();
}

async function coletarTodosDoadores() {
  return await UsuarioHelper.getDoador();
}


async function enviarMensagem() {
  const conteudoMensagem = mensagemInput.value;
  const mensagem = {
    dataMensagem: data,
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