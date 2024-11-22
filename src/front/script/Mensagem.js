const url = "http://localhost:3307/api/proposta/mensagem";

const MensagemHelper = {
    getMensagemByIdProposta: async function(id){
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

    postMensagem: async function(body){
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
    },

    putMensagem: async function(idProposta, idMensagem, body){
        return fetch(url+"/"+idProposta+"/"+idMensagem, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
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
            console.error("Erro ao fazer a requisição PUT:", error);
            throw error;
        });
    },

    deleteMensagem: async function(idProposta, idMensagem){
        return fetch(url+"/"+idProposta+"/"+idMensagem, {
            method: "DELETE",
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
            console.error("Erro ao fazer a requisição DELETE:", error);
            throw error;
        });
    }
}

export default MensagemHelper;