import UsuarioHelper from "../../script/Usuario.js";

async function testeGet(){
    var a = await UsuarioHelper.getCentro();

        for(let ab in a){
            console.log(ab);
        }
}

testeGet();