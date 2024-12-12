// Função para criar os cards
function createCentroCard(centro) {

    // Limita a descrição a 50 caracteres e adiciona reticências se necessário
    const descricaoTruncada = centro.desc_centro.length > 50 
    ? centro.desc_centro.substring(0, 50) + "..." 
    : centro.desc_centro;

    // Monta o HTML do card
    return `
    <div class="cardCentros shadow-lg mb-3 mt-5 rounded-4" onclick="abrirPerfil(${centro.id_centro})">
        <div class="row g-0">
                <div class="col-md-4 mt-5 ps-3 pt-4">
                    <img src="../images/logo sem fundo.jpeg" class="img-fluid rounded-5" alt="...">
                </div>
            <div class="cardCentroContainer col-md-8">
                <div class="cardCentroBody">
                    <h5 class="card-title">${centro.nome_centro}</h5>
                    <p class="card-text mt-4">${descricaoTruncada}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Chama a API e renderiza os cards
async function renderCentros() {
    try {
        const centroContainer = document.getElementById("centroContainer");
        const url = "http://localhost:3307/api/centro";
        const centros = await fetch(url, {
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
        centroContainer.innerHTML = centros.map(createCentroCard).join('');
    } catch (error) {
        console.error("Erro ao carregar as centro:", error);
    }
}

// Executa a função ao carregar a página
renderCentros();

//REDIRECIONAMENTO PARA DETALHAMENTO

function abrirPerfil(id_centro) {
    // Redireciona para a página de detalhes, passando o ID da meta na URL
    window.location.href = `../Perfil/perfilCentro.html?id=${id_centro}`;
}