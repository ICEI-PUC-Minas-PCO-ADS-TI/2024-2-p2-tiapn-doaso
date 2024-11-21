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
// Rota para cadastrar/post um usuário Doador
app.post('/api/doador', (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var imagemPerfil = req.body.imagemPerfil;
    var descricao = req.body.descricao;
    var cpf = req.body.cpf;
    var ruaEnd = req.body.ruaEnd;
    var bairroEnd = req.body.bairroEnd;
    var numeroEnd = req.body.numeroEnd;
    var cidadeEnd = req.body.cidadeEnd;
    var estadoEnd = req.body.estadoEnd; //Sigla do estado
    var cepEnd = req.body.cepEnd;
    var numeroTel = req.body.numeroTel;


    db.query("INSERT INTO Usuario (tipo_usuario) VALUES (?)", ["Doador"], (err, result) => {
        if (err) {
            console.log(err)
        }
        var idUsuario = result.insertId;

        db.query("INSERT INTO Doador (id_doador, CPF, nome_doador, email_doador, senha_doador, imagem_perfil_doador, bio_doador, endereco_rua, endereco_bairro, endereco_numero, endereco_cidade, endereco_estado_sigla, endereco_cep, telefone_numero) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [idUsuario, cpf, nome, email, senha, imagemPerfil, descricao, ruaEnd, bairroEnd, numeroEnd, cidadeEnd, estadoEnd, cepEnd, numeroTel], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
    });
});
//Rota para cadastrar/post um usuário CENTRO DE DOAÇÃO
app.post('/api/centro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const imagemPerfil = req.body.imagemPerfil;
    const descricao = req.body.descricao;
    const cnpj = req.body.cnpj;
    const valorArrecadado = req.body.valorArrecadado;
    var ruaEnd = req.body.ruaEnd;
    var bairroEnd = req.body.bairroEnd;
    var numeroEnd = req.body.numeroEnd;
    var cidadeEnd = req.body.cidadeEnd;
    var estadoEnd = req.body.estadoEnd; //Sigla do estado
    var cepEnd = req.body.cepEnd;
    var numeroTel = req.body.numeroTel;

    db.query("INSERT INTO Usuario (tipo_usuario) VALUES (?)", ["Centro"], (err, result) => {
        if (err) {
            console.log(err)
        }
        const idUsuario = result.insertId;

        db.query("INSERT INTO Centro_de_doacao (id_centro, CNPJ, nome_centro, email_centro, senha_centro, imagem_perfil_centro, desc_centro, valor_total_arrecadado, endereco_rua, endereco_bairro, endereco_numero, endereco_cidade, endereco_estado_sigla, endereco_cep, telefone_numero) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [idUsuario, cnpj, nome, email, senha, imagemPerfil, descricao, valorArrecadado, ruaEnd, bairroEnd, numeroEnd, cidadeEnd, estadoEnd, cepEnd, numeroTel], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });
    });
});
// Rota para remover/delete usuarios
// DELETE doador
app.delete('/api/doador/:id', (req, res) => {
    var idUsuario = req.params.id;

    // Deleta o usuário da tabela Doador
    db.query("DELETE FROM Doador WHERE id_doador = ?", [idUsuario], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar doador' });
        }

        // Deleta o usuário da tabela Usuario
        db.query("DELETE FROM Usuario WHERE id_usuario = ?", [idUsuario], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao deletar usuário' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        });
    });
});
//DELETE centros de doação
app.delete('/api/centro/:id', (req, res) => {
    var idUsuario = req.params.id;

    // Deleta o usuário da tabela Doador
    db.query("DELETE FROM Centro_de_doacao WHERE id_centro = ?", [idUsuario], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar doador' });
        }

        // Deleta o usuário da tabela Usuario
        db.query("DELETE FROM Usuario WHERE id_usuario = ?", [idUsuario], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao deletar usuário' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        });
    });
});
//PUT usuarios
app.put('/api/doador/:id', (req, res) => {
    var idUsuario = req.params.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var imagemPerfil = req.body.imagemPerfil;
    var descricao = req.body.descricao;
    var ruaEnd = req.body.ruaEnd;
    var bairroEnd = req.body.bairroEnd;
    var numeroEnd = req.body.numeroEnd;
    var cidadeEnd = req.body.cidadeEnd;
    var estadoEnd = req.body.estadoEnd;
    var cepEnd = req.body.cepEnd;
    var numeroTel = req.body.numeroTel;

    db.query("UPDATE Doador SET nome_doador = ?, email_doador = ?, senha_doador = ?, imagem_perfil_doador = ?, bio_doador = ?, endereco_rua = ?, endereco_bairro = ?, endereco_numero = ?, endereco_cidade = ?, endereco_estado_sigla = ?, endereco_cep = ?, telefone_numero = ? WHERE id_doador = ?", 
    [nome, email, senha, imagemPerfil, descricao, ruaEnd, bairroEnd, numeroEnd, cidadeEnd, estadoEnd, cepEnd, numeroTel, idUsuario], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao atualizar doador' });
        }
        res.status(200).json({ message: 'Doador atualizado com sucesso' });
    });
});
//PUT Centros de doação
app.put('/api/centro/:id', (req, res) => {
    var idUsuario = req.params.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var imagemPerfil = req.body.imagemPerfil;
    var descricao = req.body.descricao;
    var valorArrecadado = req.body.valorArrecadado;
    var ruaEnd = req.body.ruaEnd;
    var bairroEnd = req.body.bairroEnd;
    var numeroEnd = req.body.numeroEnd;
    var cidadeEnd = req.body.cidadeEnd;
    var estadoEnd = req.body.estadoEnd;
    var cepEnd = req.body.cepEnd;
    var numeroTel = req.body.numeroTel;

    db.query("UPDATE Centro_de_doacao SET nome_centro = ?, email_centro = ?, senha_centro = ?, imagem_perfil_centro = ?, desc_centro = ?, valor_total_arrecadado = ?, endereco_rua = ?, endereco_bairro = ?, endereco_numero = ?, endereco_cidade = ?, endereco_estado_sigla = ?, endereco_cep = ?, telefone_numero = ? WHERE id_centro = ?", 
    [nome, email, senha, imagemPerfil, descricao, valorArrecadado, ruaEnd, bairroEnd, numeroEnd, cidadeEnd, estadoEnd, cepEnd, numeroTel, idUsuario], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao atualizar centro de doação' });
        }
        res.status(200).json({ message: 'Centro de doação atualizado com sucesso' });
    });
});




//GET todas as Metas de doação
app.get("/api/meta", (req, res) => {
    db.query("SELECT * FROM Meta_de_doacao", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});
//GET Metas de doação por id
app.get("/api/meta/:id", (req, res) => {
    const idMeta = req.params.id
    db.query("SELECT * FROM Meta_de_doacao WHERE id_meta = ?", idMeta, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});
//POST Metas de Doacao
app.post('/api/meta', (req, res) => {
    var valorObjetivo = req.body.valorObjetivo;
    var valorArrecadado = 0;
    var descricao = req.body.descricao;
    var titulo = req.body.titulo;
    var idCentroCriador = req.body.idCentroCriador;

    db.query("INSERT INTO Meta_de_doacao(valor_objetivo_meta, valor_recebido_meta, desc_meta, titulo_meta, id_centro_criador) VALUES (?, ?, ?, ?, ?)", [valorObjetivo, valorArrecadado, descricao, titulo, idCentroCriador], (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});
//DELETE metas de doação
app.delete('/api/meta/:id', (req, res) => {
    
    id = req.params.id;

    db.query("DELETE FROM Meta_de_doacao WHERE id_meta = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar meta' });
        }   
    });
});
//PUT metas de doação
app.put('/api/meta/:id', (req, res) => {
    var id = req.params.id;
    var valorObjetivo = req.body.valorObjetivo;
    var valorArrecadado = req.body.valorArrecadado;
    var descricao = req.body.descricao;
    var titulo = req.body.titulo;

    db.query("UPDATE Meta_de_doacao SET valor_objetivo_meta = ?, valor_recebido_meta = ?, desc_meta = ?, titulo_meta = ? WHERE id_meta = ?", 
    [valorObjetivo, valorArrecadado, descricao, titulo, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao atualizar a meta");
        } else {
            res.status(200).send("Meta atualizada com sucesso");
        }
    });
});





//Ativação do servidor
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});