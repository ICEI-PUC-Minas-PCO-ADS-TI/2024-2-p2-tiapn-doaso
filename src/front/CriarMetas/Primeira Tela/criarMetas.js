import UsuarioHelper from "../../script/Usuario.js";
import MetaHelper from "../../script/Metas.js";
import PropostaHelper from "../../script/Proposta.js";

var btn = document.getElementById('btnCriarMeta');

function postarMeta() {
    var valorObjetivo = document.getElementById('valorObjetivo').value;
    var titulo = document.getElementById('tituloMeta').value;
    var descricao = document.getElementById('descricaoMeta').value;

    const body = {
        valorObjetivo: valorObjetivo,
        valorArrecadado: 0,
        descricao: descricao,
        titulo: titulo,
        idCentroCriador: 3
    }

    MetaHelper.postMeta(body);

}

btn.addEventListener('click', postarMeta);