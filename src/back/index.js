const express = require('express');
const db = require('./connection_mysql')
const cors = require('cors')

const app = express();

const PORT = 3307;
app.use(cors());
app.use(express.json())

//GET DOADORES
// Rota para requisitar todos os DOADORES
app.get("/api/doador", (req, res) => {
    db.query("SELECT * FROM Doador", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});
// Rota para requisitar um DOADOR especifico pelo id
app.get("/api/doador/:id", (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    db.query("SELECT * FROM Doador WHERE id_doador = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});
// Rota para requisitar um DOADOR especifico pelo cpf
app.get("/api/doador/:cpf", (req, res) => {
    console.log(req.params.cpf)
    const cpf = req.params.cpf;
    db.query("SELECT * FROM Doador WHERE CPF = ?", cpf, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});



//GET CENTROS DE DOAÇÃO
// Rota para requisitar todos os CENTROS DE DOAÇÃO
app.get("/api/centro", (req, res) => {
    db.query("SELECT * FROM Centro_de_doacao", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});
// Rota para requisitar um CENTRO DE DOAÇÃO especifico pelo id
app.get("/api/centro/:id", (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    db.query("SELECT * FROM Centro_de_doacao WHERE id_centro = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});
// Rota para requisitar um CENTRO DE DOAÇÃO especifico pelo cnpj
app.get("/api/centro/:cnpj", (req, res) => {
    console.log(req.params.cnpj)
    const cnpj = req.params.cnpj;
    db.query("SELECT * FROM Centro_de_doacao WHERE CNPJ = ?", cnpj, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});



// Rota para cadastrar um usuário Doador
app.post('/api/usuario/doador', (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var imagemPerfil = req.body.imagemPerfil;
    var descricao = "";
    var cpf = req.body.cpf;
    db.query("INSERT INTO Usuario (tipo_usuario) VALUES (?)", ["Doador"], (err, result) => {
        if (err) {
            console.log(err)
        }
        var idUsuario = result.insertId;

        db.query("INSERT INTO Doador (id_doador, CPF, nome_doador, email_doador, senha_doador, imagem_perfil_doador, bio_doador) VALUES (?,?,?,?,?,?,?)", [idUsuario, cpf, nome, email, senha, imagemPerfil, descricao], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
    });
});

//Rota para cadastrar um usuário CENTRO DE DOAÇÃO
app.post('/api/usuario/centro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const imagemPerfil = req.body.imagemPerfil;
    const descricao = "";
    const cnpj = req.body.cpf;
    const valorArrecadado = 0;

    db.query("INSERT INTO Usuario (tipo_usuario) VALUES (?)", ["Centro"], (err, result) => {
        if (err) {
            console.log(err)
        }
        const idUsuario = result.insertId;

        db.query("INSERT INTO Centro_de_doacao (id_centro, CNPJ, nome_centro, email_centro, senha_centro, imagem_perfil_centro, desc_centro, valor_total_arrecadado) VALUES (?,?,?,?,?,?,?,?)", [idUsuario, cpf, nome, email, senha, imagemPerfil, descricao, valorArrecadado], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
    });
});


// Route to delete a post

// app.delete('/api/delete/:id', (req, res) => {
//     console.log("api delete")
//     const id = req.params.id;
//     console.log(id)
    
//     db.query("DELETE FROM post WHERE id= ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         result.send('post deletado.')
//     })
// })


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})