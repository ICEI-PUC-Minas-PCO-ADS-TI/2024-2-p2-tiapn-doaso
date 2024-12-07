// Função para obter o ID da meta da URL
function getMetaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Retorna o ID da meta
}

// Pega o ID da meta
const metaId = getMetaIdFromUrl();


// Exemplo de requisição ao backend (substitua pela lógica do seu backend)
fetch(`http://localhost:3307/api/meta/${metaId}`)
    .then(response => response.json())
    .then(data => {
        // Verifica se o array retornado contém algum item
        if (data.length > 0) {
            const meta = data[0];
            console.log("Dados recebidos da API:", meta);
            console.log("Descrição da meta:", meta.desc_meta);

            const descricaoTruncada = meta.desc_meta.length > 300 
            ? meta.desc_meta.substring(0, 300) + "..." 
            : meta.desc_meta;

            // Atualiza os elementos HTML com os dados da meta
            document.querySelector('.nomeMeta').textContent = meta.titulo_meta;
            document.querySelector('.localizacao').textContent = meta.localizacao || "Localização não especificada";
            document.querySelector('.desc h4').textContent = descricaoTruncada;
            document.querySelector('.barra-Total').textContent = 'R$' + meta.valor_objetivo_meta;
            document.querySelector('.barra-arrecadado').style.width = `${meta.valor_recebido_meta / meta.valor_objetivo_meta * 100}%`;
            document.querySelector('.barra-arrecadado').textContent = `${meta.valor_recebido_meta / meta.valor_objetivo_meta * 100}%`;
        } else {
            console.error("Nenhum dado encontrado para esta meta.");
            document.querySelector('.desc h4').textContent = "Meta não encontrada.";
        }
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });