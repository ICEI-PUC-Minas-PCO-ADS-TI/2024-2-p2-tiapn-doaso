function cadastrarUsuario(){
    const url = "http://localhost:3307/api/centro";

    // Dados que serão enviados na requisição
    const doador = {
        nome: "nome",
        email: "email",
        senha: "senha",
        imagemPerfil: "link.imagem",
        descricao: "descricao",
        cnpj: 12345678910111,
        ruaEnd: "nome da rua",
        valorArrecadado: 0,
        bairroEnd: "nome do bairro",
        numeroEnd: 100,
        cidadeEnd: "nome da cidade",
        estadoEnd: "MG",
        cepEnd: 12345678,
        numeroTel: "12 34567-8910"
    };

    // Configurando a requisição com o método PUT
    fetch(url, {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json" // Tipo de conteúdo sendo enviado
        },
        body: JSON.stringify(doador) // Dados no formato JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
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

function deleteUsuario() {
    userId = 1;
    fetch(`http://localhost:3307/api/centro/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            console.log('Success:', data.message);
            alert('User deleted successfully');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function postarMeta(){
    const doador = {
        valorObjetivo: 1000,
        valorArrecadado: 0,
        descricao: "descricao da meta",
        titulo: "titulo da meta",
        idCentroCriador: "2"
    };

    fetch(`http://localhost:3307/api/meta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doador) // Dados no formato JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            console.log('Success:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}