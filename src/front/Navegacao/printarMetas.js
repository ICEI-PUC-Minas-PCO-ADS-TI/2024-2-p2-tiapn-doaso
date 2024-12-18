// Função para criar os cards
function createMetaCard(meta) {
    // Calcula o progresso
    const progresso = (meta.valor_recebido_meta / meta.valor_objetivo_meta) * 100;

    // Limita a descrição a 75 caracteres e adiciona reticências se necessário
    var descricaoTruncada = ""
    if(meta.desc_meta != null){
        if(meta.desc_meta.length > 75){
            descricaoTruncada = meta.desc_meta.substring(0, 75) + "..."
        } else {
            descricaoTruncada = meta.desc_meta;
        }
    } else{
        descricaoTruncada = "Meta sem descrição"
    }
    
    // Monta o HTML do card
    return `
    <div class="cardMetas shadow-lg mb-3 mt-5 rounded-4" onclick="abrirDetalhes(${meta.id_meta})">
            <h5 class="card-title mt-5 mb-5 ">${meta.titulo_meta}</h5>
            <img src="${meta.imagem_meta}" class="card-img-top rounded-2" alt="...">
            <div class="card-body">
                <p class="card-text">${descricaoTruncada}</p>
                <div class="progress barraCard mt-3 mb-5" role="progressbar" aria-label="Example with label" aria-valuenow="${progresso}"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${progresso}%">${progresso}%</div>
                </div>
            </div>
    </div>
    `;
}

// Chama a API e renderiza os cards
async function renderMetas() {
    try {
        const metasContainer = document.getElementById("metasContainer");
        const url = "http://localhost:3307/api/meta";
        const metas = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        });

        // Renderiza os cards no container
        metasContainer.innerHTML = metas.map(createMetaCard).join('');
    } catch (error) {
        console.error("Erro ao carregar as metas:", error);
    }
}

// Executa a função ao carregar a página
renderMetas();

//REDIRECIONAMENTO PARA DETALHAMENTO

function abrirDetalhes(metaId) {
    // Redireciona para a página de detalhes, passando o ID da meta na URL
    window.location.href = `../DetalhamentoDeMetas/telaMetas.html?id=${metaId}`;
}