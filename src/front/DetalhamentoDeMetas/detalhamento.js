// Função para obter o ID da meta da URL
function getMetaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Retorna o ID da meta
}

// Pega o ID da meta
const metaId = getMetaIdFromUrl();
var id_centro_criador = 0;
let valorAtualArrecadado = 0; // Valor atual arrecadado da meta
let valorObjetivo = 0; // Valor objetivo da meta

// Requisição dos dados da meta
fetch(`http://localhost:3307/api/meta/${metaId}`)
    .then(response => response.json())
    .then(data => {
        // Verifica se o array retornado contém algum item
        if (data.length > 0) {
            const meta = data[0];
            console.log("Dados recebidos da API:", meta);

            const descricaoTruncada = meta.desc_meta.length > 650
                ? meta.desc_meta.substring(0, 650) + "..."
                : meta.desc_meta;

            // Atualiza os elementos HTML com os dados da meta
            document.querySelector('.nomeMeta').textContent = meta.titulo_meta;
            document.querySelector('.desc h4').textContent = descricaoTruncada;
            document.querySelector('.barra-Total').textContent = 'R$' + meta.valor_objetivo_meta;
            document.querySelector('.barra-arrecadado').style.width = `${meta.valor_recebido_meta / meta.valor_objetivo_meta * 100}%`;
            document.querySelector('.barra-arrecadado').textContent = `${(meta.valor_recebido_meta / meta.valor_objetivo_meta * 100).toFixed(2)}%`;

            valorAtualArrecadado = meta.valor_recebido_meta; // Atualiza o valor atual arrecadado
            valorObjetivo = meta.valor_objetivo_meta; // Atualiza o valor objetivo

            const imgMeta = meta.imagem_meta;

            function carregaImgMeta() {
                const imgDoacao = document.getElementById("imgDoacao");
                imgDoacao.innerHTML = `
                    <img src="${imgMeta}" class="imgDoacaoItem" alt="...">
                `;
            }
            carregaImgMeta();

            // Busca os dados do Centro
            id_centro_criador = meta.id_centro_criador;

            fetch(`http://localhost:3307/api/centro/${id_centro_criador}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const centro = data[0];
                        console.log("Dados recebidos da API:", centro);

                        document.querySelector('.nomeCentro').textContent = centro.nome_centro;
                        document.querySelector('.localizacao').textContent = centro.endereco_bairro + " " + centro.endereco_cidade;

                    } else {
                        console.error("Nenhum dado encontrado para este centro.");
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

// Função para atualizar a barra de progresso
function atualizarBarraProgresso(novoValor) {
    const progresso = Math.min((novoValor / valorObjetivo) * 100, 100); // Limite máximo de 100%
    document.querySelector('.barra-arrecadado').style.width = `${progresso}%`;
    document.querySelector('.barra-arrecadado').textContent = `${progresso.toFixed(2)}%`;
}

// Função para atualizar a meta no backend
async function atualizarMetaBackend(novoValorArrecadado) {
    try {
        const response = await fetch(`http://localhost:3307/api/meta/${metaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                valorObjetivo: valorObjetivo,
                valorArrecadado: novoValorArrecadado,
                descricao: document.querySelector('.desc h4').textContent,
                titulo: document.querySelector('.nomeMeta').textContent
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar a meta no backend.");
        }

        const data = await response.json();
        console.log("Meta atualizada com sucesso:", data);
    } catch (error) {
        console.error("Erro ao atualizar a meta:", error);
    }
}

// Evento de clique no botão de confirmar contribuição
document.addEventListener("DOMContentLoaded", function () {
    const btnConfirmar = document.getElementById("confirmarContribuicao");
    const inputContribuicao = document.getElementById("valorContribuicao");

    if (btnConfirmar && inputContribuicao) {
        btnConfirmar.addEventListener("click", function () {
            const valorContribuido = parseFloat(inputContribuicao.value);

            if (!isNaN(valorContribuido) && valorContribuido > 0) {
                const novoValorArrecadado = valorAtualArrecadado + valorContribuido;

                // Atualiza a barra de progresso
                atualizarBarraProgresso(novoValorArrecadado);

                // Atualiza a meta no backend
                atualizarMetaBackend(novoValorArrecadado);

                // Atualiza o valor atual arrecadado
                valorAtualArrecadado = novoValorArrecadado;

                // Limpa o campo de input e fecha o modal
                inputContribuicao.value = "";
                const modalElement = document.querySelector("#contribuirModal");
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
            } else {
                alert("Por favor, insira um valor válido para a contribuição.");
            }
        });
    }

    const verPerfilBtn = document.getElementById("verPerfilBtn");
    if (verPerfilBtn) {
        verPerfilBtn.addEventListener("click", function () {
            window.location.href = `../Perfil/perfilCentro.html?id=${id_centro_criador}`;
        });
    }
});
