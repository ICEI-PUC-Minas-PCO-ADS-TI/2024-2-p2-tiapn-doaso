import MetaHelper from "../../script/Metas.js";

var btn = document.getElementById('btnCriarMeta');
var btn2 = document.getElementById('btnDeletarMeta');

function postarMeta() {
    var valorObjetivo = document.getElementById('valorObjetivo').value;
    var titulo = document.getElementById('tituloMeta').value;
    var descricao = document.getElementById('descricaoMeta').value;

    const body = {
        valorObjetivo: valorObjetivo,
        valorArrecadado: 0,
        descricao: descricao,
        titulo: titulo,
        idCentroCriador: 1
    }

    MetaHelper.postMeta(body);

}

function deletarMeta() {
    MetaHelper.deleteMeta(8);

}

btn.addEventListener('click', postarMeta);
btn2.addEventListener('click', deletarMeta);