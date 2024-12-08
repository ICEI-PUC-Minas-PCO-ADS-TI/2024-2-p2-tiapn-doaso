// Função para obter o ID da meta da URL
function getMetaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Retorna o ID da meta
}

// Pega o ID da meta
const metaId = getMetaIdFromUrl();
var id_centro_criador = 0;

// Requisição dos dados da meta
fetch(`http://localhost:3307/api/meta/${metaId}`)
    .then(response => response.json())
    .then(data => {
        // Verifica se o array retornado contém algum item
        if (data.length > 0) {
            const meta = data[0];
            console.log("Dados recebidos da API:", meta);
            console.log("Descrição da meta:", meta.desc_meta);

            const descricaoTruncada = meta.desc_meta.length > 100
            ? meta.desc_meta.substring(0, 100) + "..." 
            : meta.desc_meta;

            // Atualiza os elementos HTML com os dados da meta
            document.querySelector('.nomeMeta').textContent = meta.titulo_meta;
            document.querySelector('.desc h4').textContent = descricaoTruncada;
            document.querySelector('.barra-Total').textContent = 'R$' + meta.valor_objetivo_meta;
            document.querySelector('.barra-arrecadado').style.width = `${meta.valor_recebido_meta / meta.valor_objetivo_meta * 100}%`;
            document.querySelector('.barra-arrecadado').textContent = `${meta.valor_recebido_meta / meta.valor_objetivo_meta * 100}%`;

            //Busca os dados do Centro
            id_centro_criador = meta.id_centro_criador;

            fetch(`http://localhost:3307/api/centro/${id_centro_criador}`)
            .then(response => response.json())
            .then(data => {
                // Verifica se o array retornado contém algum item
                if (data.length > 0) {
                    const centro = data[0];
                    console.log("Dados recebidos da API:", centro);

                    //Troca as informações para informações sobre o Centro
                    document.querySelector('.nomeCentro').textContent = centro.nome_centro;
                    document.querySelector('.localizacao').textContent = centro.endereco_bairro + " " + centro.endereco_cidade;

                } else {
                    console.error("Nenhum dado encontrado para esta centro.");
                    document.querySelector('.desc h4').textContent = "Centro não encontrado.";
                }
            })
            .catch(error => {
                console.error("Erro ao buscar os dados do centro:", error);
            });

        } else {
            console.error("Nenhum dado encontrado para esta meta.");
            document.querySelector('.desc h4').textContent = "Meta não encontrada.";
        }
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });


    // Adiciona o evento de clique ao botão de ver perfil
    document.addEventListener("DOMContentLoaded", function () {
        const verPerfilBtn = document.getElementById("verPerfilBtn");

        // Verifica se o botão existe no DOM
        if (verPerfilBtn) {
            verPerfilBtn.addEventListener("click", function () {
                // Redireciona para a página de perfil com o ID
                window.location.href = `../Perfil/perfilCentro.html?id=${id_centro_criador}`;
            });
        } else {
            console.error("Botão com a classe '.verPerfilBtn' não encontrado!");
        }
    });