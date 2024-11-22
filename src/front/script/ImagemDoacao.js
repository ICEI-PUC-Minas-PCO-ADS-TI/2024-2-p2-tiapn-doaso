const url = "http://localhost:3307/api/proposta/imagem";

const ImagemHelper = {
    getImagemByIdProposta: async function(id){
        return fetch(url+"/"+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => {
            console.log("Resposta do servidor:", responseData);
            return responseData;
        })
        .catch(error => {
            console.error("Erro ao fazer a requisição GET:", error);
            throw error;
        });
    },
    
    postImagem: async function(body){
        fetch(url, {
            method: "POST", // Método HTTP
            headers: {
                "Content-Type": "application/json" // Tipo de conteúdo sendo enviado
            },
            body: JSON.stringify(body) // Dados no formato JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição:", response.status);
                }
                return response.json(); // Extrai o JSON da resposta
            })
            .then(responseData => {
                console.log("Resposta do servidor:", responseData);
            })
            .catch(error => {
                console.error("Erro ao fazer a requisição POST:", error);
            });
    }
}

export default ImagemHelper;