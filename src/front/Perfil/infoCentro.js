// Função para obter o ID da meta da URL
function getMetaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Retorna o ID da meta
}

// Pega o ID da meta
const centroId = getMetaIdFromUrl();

// Função para formatar o número de telefone
function formatarTelefone(numero) {
    if (numero.length === 10) {
        // Formato: (31) 4002-8922
        return `(${numero.slice(0, 2)}) ${numero.slice(2, 6)}-${numero.slice(6)}`;
    } else if (numero.length === 11) {
        // Formato: (31) 94002-8922
        return `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
    } else {
        return "Número inválido"; // Caso o número não tenha 10 ou 11 dígitos
    }
}
//Busca dos dados do centro
fetch(`http://localhost:3307/api/centro/${centroId}`)
    .then(response => response.json())
    .then(data => {
        // Verifica se o array retornado contém algum item
        if (data.length > 0) {
            const centro = data[0];
            console.log("Dados recebidos da API:", centro);

            //Troca as informações para informações sobre o Centro
            document.querySelector('.nomeItem').textContent = centro.nome_centro;
            document.querySelector('.cnpj').textContent = centro.CNPJ;
            document.querySelector('.cep').textContent = centro.endereco_cep;
            document.querySelector('.telefone').textContent = formatarTelefone(centro.telefone_numero);
            document.querySelector('.email').textContent = centro.email_centro;

        } else {
            console.error("Nenhum dado encontrado para esta centro.");
            document.querySelector('.desc h4').textContent = "Centro não encontrado.";
        }
    })
    .catch(error => {
        console.error("Erro ao buscar os dados do centro:", error);
    });

// Busca das metas cadastradas que tenham o id_centro_criador == ao id do Centro
fetch('http://localhost:3307/api/meta/')
    .then(response => response.json())
    .then(data => {
        // Filtrar metas pelo id_centro_criador
        const metasFiltradas = data.filter(meta => meta.id_centro_criador === parseInt(centroId));
        console.log("Metas filtradas:", metasFiltradas);

        // Container onde os cards serão adicionados
        const container = document.querySelector('#containerMetas'); // Certifique-se de que há um elemento com esse ID no HTML

        if (metasFiltradas.length > 0) {
            metasFiltradas.forEach(meta => {
                // Trunca a descrição se for muito longa
                var descricaoTruncada = ""
                if(meta.desc_meta != null){
                    if(meta.desc_meta.length > 100){
                        descricaoTruncada = meta.desc_meta.substring(0, 100) + "..."
                    } else {
                        descricaoTruncada = meta.desc_meta;
                    }
                } else{
                    descricaoTruncada = "Meta sem descrição"
                }

                // Calcula o progresso da meta
                const progresso = (meta.valor_recebido_meta / meta.valor_objetivo_meta) * 100;

                // Cria o card dinamicamente
                const cardHTML = `
                <div class="cardMetas shadow-lg mb-3 mt-5 rounded-4" onclick="abrirDetalhes(${meta.id_meta})">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${meta.imagem_meta} class="img-fluid rounded-start" alt="Logo">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${meta.titulo_meta}</h5>
                                <p class="card-text">${descricaoTruncada}</p>
                                <div class="barraProgresso">
                                    <div class="progress" role="progressbar" aria-label="Progresso da meta"
                                        aria-valuenow="${progresso.toFixed(0)}" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar" style="width: ${progresso.toFixed(0)}%">
                                            ${progresso.toFixed(0)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                // Insere o card no container
                container.innerHTML += cardHTML;
            });
        } else {
            console.log("Nenhuma meta encontrada para este centro.");
        }
    })
    .catch(error => console.error('Erro ao buscar metas:', error));

//REDIRECIONAMENTO PARA DETALHAMENTO

function abrirDetalhes(metaId) {
    // Redireciona para a página de detalhes, passando o ID da meta na URL
    window.location.href = `../DetalhamentoDeMetas/telaMetas.html?id=${metaId}`;
}