import MetaHelper from "../script/Metas.js";

// Função para criar os cards
function createMetaCard(meta) {
    // Calcula o progresso
    const progresso = (meta.valor_recebido_meta / meta.valor_objetivo_meta) * 100;

     // Limita a descrição a 300 caracteres e adiciona reticências se necessário
    const descricaoTruncada = meta.desc_meta.length > 300 
    ? meta.desc_meta.substring(0, 300) + "..." 
    : meta.desc_meta;

    // Monta o HTML do card
    return `
    <div class="cardMetas shadow-lg mb-3 mt-5 rounded-4">
            <h5 class="card-title mt-3">${meta.titulo_meta}</h5>
            <img src="../images/logo sem fundo.jpeg" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${meta.desc_meta}</p>
                <div class="progress barraCard mt-3" role="progressbar" aria-label="Example with label" aria-valuenow="${progresso}"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${progresso}%">25%</div>
                </div>
            </div>
    </div>
    `;
}

// Chama a API e renderiza os cards
async function renderMetas() {
    try {
        const metasContainer = document.getElementById("metasContainer");
        const url = "http://localhost:3307/api/meta"; // Substitua pela URL correta
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