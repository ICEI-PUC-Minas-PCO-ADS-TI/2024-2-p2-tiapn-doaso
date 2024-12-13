import MetaHelper from "../../script/Metas.js";
import { postImgAPI } from '../../script/API_img.js';

var btn = document.getElementById('btnCriarMeta');
var btn2 = document.getElementById('btnDeletarMeta');
var imagem_meta = "";

document.getElementById('btnCriarMeta').addEventListener('click', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão
    
    const inputElement = document.getElementById('imageMetaInput');
    
    if (!inputElement.files || inputElement.files.length === 0) {
        alert("Por favor, selecione uma imagem antes de cadastrar.");
        return;
    }

    try {
        
        const url = await postImgAPI('imageMetaInput');
        console.log("Imagem carregada em:", url);
        imagem_meta = url;
        
        postarMeta();
        
    } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        alert("Falha ao carregar a imagem.");
    }
});

function postarMeta() {
    var valorObjetivo = document.getElementById('valorObjetivo').value;
    var titulo = document.getElementById('tituloMeta').value;
    var descricao = document.getElementById('descricaoMeta').value;
    
    const body = {
        valorObjetivo: valorObjetivo,
        valorArrecadado: 0,
        descricao: descricao,
        titulo: titulo,
        idCentroCriador: 2,
        imagemMeta: imagem_meta
    }

    MetaHelper.postMeta(body);
}

function deletarMeta() {
    MetaHelper.deleteMeta(8);

}

btn.addEventListener('click', postarMeta);
btn2.addEventListener('click', deletarMeta);