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
        const idUsuario = result.insertId;

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
    const { valorObjetivo, valorArrecadado, descricao, titulo, idCentroCriador, imagemMeta} = req.body;

    db.query("INSERT INTO Meta_de_doacao(valor_objetivo_meta, valor_recebido_meta, desc_meta, titulo_meta, id_centro_criador, imagem_meta) VALUES (?, ?, ?, ?, ?, ?)", [valorObjetivo, valorArrecadado, descricao, titulo, idCentroCriador, imagemMeta], (err, result) => {
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
    const { valorObjetivo, valorArrecadado, descricao, titulo } = req.body;


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



// GET todas as propostas de doação
app.get("/api/proposta", (req, res) => {
    db.query("SELECT * FROM Proposta_de_doacao", (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
// GET proposta de doação por id
app.get("/api/proposta/:id", (req, res) => {
    const idProposta = req.params.id;
    db.query("SELECT * FROM Proposta_de_doacao WHERE id_proposta = ?", [idProposta], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
// POST proposta de doação
app.post('/api/proposta', (req, res) => {
    const { descricaoProposta, dataProposta, idDoadorRemetente, idCentroDestinatario, imagemProposta } = req.body;
    const statusProposta = false;
    db.query("INSERT INTO Proposta_de_doacao (desc_proposta, data_proposta, id_doador_remetente, id_centro_destinatario, status_proposta, imagem_proposta) VALUES (?, ?, ?, ?, ?, ?)", 
    [descricaoProposta, dataProposta, idDoadorRemetente, idCentroDestinatario, statusProposta, imagemProposta], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Proposta de doação criada com sucesso");
        }
    });
});
// DELETE proposta de doação
app.delete('/api/proposta/:id', (req, res) => {
    const idProposta = req.params.id;
    db.query("DELETE FROM Proposta_de_doacao WHERE id_proposta = ?", [idProposta], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar proposta' });
        }
        res.status(200).json({ message: 'Proposta deletada com sucesso' });
    });
});



// GET todas as Imagens da proposta by id da proposta
app.get("/api/proposta/imagem/:id", (req, res) => {

    const idImg = req.params.id;   
    db.query("SELECT * FROM Imagem_doacao WHERE id_proposta = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
// POST imagem da proposta
app.post('/api/proposta/imagem', (req, res) => {
    const { idProposta, linkImagem} = req.body;
    db.query("INSERT INTO Imagem_doacao (id_proposta, imagem) VALUES (?,?)", 
    [idProposta, linkImagem], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Imagem adicionada com sucesso");
        }
    });
});




//GET Mensagens da proposta
app.get("/api/proposta/mensagem/:idProposta", (req, res) => {

    const idProposta = req.params.idProposta;
    db.query("SELECT * FROM Mensagem WHERE  id_proposta = ?", [idProposta], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
// POST Mensagens na proposta de doação
app.post('/api/proposta/mensagem', (req, res) => {
    const { dataMensagem, conteudoMensagem, visualizacaoMensagem, idPropost, idRemetente, idDestinatario } = req.body;
    db.query("INSERT INTO Mensagem (data_mensagem, conteudo_mensagem, visualizacao_mensagem, id_proposta, id_remetente, id_destinatario) VALUES (?, ?, ?, ?, ?, ?)", 
    [dataMensagem, conteudoMensagem, visualizacaoMensagem, idProposta, idRemetente, idDestinatario], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Proposta de doação criada com sucesso");
        }
    });
});
// PUT Mensagens proposta de doação
app.put('/api/proposta/mensagem/:idProposta/:idMensagem', (req, res) => {
    const idProposta = req.params.idProposta;
    const idMensagem = req.params.idMensagem;
    const {conteudoMensagem, visualizacaoMensagem} = req.body;

    db.query("UPDATE Mensagem SET conteudo_mensagem = ?, visualizacao_mensagem = ? WHERE id_proposta = ? AND id_mensagem = ?", [conteudoMensagem, visualizacaoMensagem, idProposta, idMensagem], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar proposta' });
        }
        res.status(200).json({ message: 'Proposta deletada com sucesso' });
    });
});
// DELETE mensagens proposta de doação
app.delete('/api/proposta/mensagem/:idProposta/:idMensagem', (req, res) => {
    const idProposta = req.params.idProposta;
    const idMensagem = req.params.idMensagem;

    db.query("DELETE FROM Mensagem WHERE id_proposta = ? AND id_mensagem = ?", [idProposta, idMensagem], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar proposta' });
        }
        res.status(200).json({ message: 'Proposta deletada com sucesso' });
    });
});




//Rotas para Favoritar um centro
//GET favoritos por id do doador
app.get("/api/favorito/:idDoador", (req, res) => {

    const idDoador = req.params.idDoador;
    db.query("SELECT * FROM Favorito WHERE  id_doador = ?", [idDoador], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
// POST favorito no banco
app.post('/api/favorito', (req, res) => {
    const { idDoador, idCentroFavoritado } = req.body;
    db.query("INSERT INTO Favorito (id_centro_favoritado, id_doador) VALUES (?, ?)", 
    [idCentroFavoritado, idDoador], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Favorito registrado com sucesso");
        }
    });
});
// DELETE favorito
app.delete('/api/favorito/:idDoador/:idCentroFavoritado', (req, res) => {
    const idDoador = req.params.idDoador;
    const idCentroFavoritado = req.params.idCentroFavoritado;

    db.query("DELETE FROM Favorito WHERE id_doador = ? AND id_centro_favoritado = ?", [idDoador, idCentroFavoritado], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar favorito' });
        }
        res.status(200).json({ message: 'Favorito deletao com sucesso' });
    });
});


//ROTAS DAS NOTIFICACOES
//GET notificao por id
app.get("/api/favorito/:idUsuario", (req, res) => {

    const idUsuario = req.params.idDoador;

    db.query("SELECT * FROM Notificacao WHERE  id_usuario = ?", [idUsuario], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
// POST favorito no banco
app.post('/api/notificacao', (req, res) => {
    const { tipoNotificacao, idUsuario, visualizacaoNotificacao, dataNotificacao } = req.body;
    db.query("INSERT INTO Notificacao (tipo_notificacao, id_ususario, visualizacao_notificacao, data_notificacao) VALUES (?, ?, ?, ?)", 
    [tipoNotificacao, idUsuario, visualizacaoNotificacao, dataNotificacao], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send("Favorito registrado com sucesso");
        }
    });
});
// PUT Mensagens proposta de doação
app.put('/api/notificacao', (req, res) => {
    const { idNotificacao, tipoNotificacao, idUsuario, visualizacaoNotificacao, dataNotificacao } = req.body;
    db.query("UPDATE Mensagem SET visualizacao_notificacao= ? WHERE id_notificacao = ?", [visualizacaoNotificacao, idNotificacao], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao atualizar notificacao' });
        }
        res.status(200).json({ message: 'Proposta deletada com sucesso' });
    });
});

//Ativação do servidor
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});