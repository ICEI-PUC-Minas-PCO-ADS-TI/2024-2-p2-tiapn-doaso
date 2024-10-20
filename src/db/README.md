## Arquivo .sql

```sql
-- Criação da tabela Mensagens
CREATE TABLE Mensagens (
    id_mensagens INT PRIMARY KEY,
    data_chat DATE,
    conteudo_chat VARCHAR(500),
    visualizacao_chat INT,
    Chat_id_chat INT,
    Chat_Proposta_de_doacao_id_proposta INT,
    Chat_Proposta_de_doacao_Doador_CPF CHAR(11),
    Chat_Proposta_de_doacao_Centro_de_doacao_CNPJ CHAR(14),
    Chat_Proposta_de_doacao_Centro_de_doacao_meta_de_doacao_id_meta INT,
    FOREIGN KEY (Chat_id_chat) REFERENCES Chat(id_chat),
    FOREIGN KEY (Chat_Proposta_de_doacao_id_proposta) REFERENCES Proposta_de_doacao(id_proposta),
    FOREIGN KEY (Chat_Proposta_de_doacao_Doador_CPF) REFERENCES Doador(CPF),
    FOREIGN KEY (Chat_Proposta_de_doacao_Centro_de_doacao_CNPJ) REFERENCES Centro_de_doacao(CNPJ),
    FOREIGN KEY (Chat_Proposta_de_doacao_Centro_de_doacao_meta_de_doacao_id_meta) REFERENCES Meta_de_doacao(id_meta)
);

-- Criação da tabela Chat
CREATE TABLE Chat (
    id_chat INT PRIMARY KEY,
    Proposta_de_doacao_id_proposta INT,
    Proposta_de_doacao_Doador_CPF CHAR(11),
    Proposta_de_doacao_Centro_de_doacao_CNPJ CHAR(14),
    Proposta_de_doacao_Centro_de_doacao_meta_de_doacao_id_meta INT,
    FOREIGN KEY (Proposta_de_doacao_id_proposta) REFERENCES Proposta_de_doacao(id_proposta),
    FOREIGN KEY (Proposta_de_doacao_Doador_CPF) REFERENCES Doador(CPF),
    FOREIGN KEY (Proposta_de_doacao_Centro_de_doacao_CNPJ) REFERENCES Centro_de_doacao(CNPJ),
    FOREIGN KEY (Proposta_de_doacao_Centro_de_doacao_meta_de_doacao_id_meta) REFERENCES Meta_de_doacao(id_meta)
);

-- Criação da tabela Imagem da doação
CREATE TABLE Imagem_doacao (
    Proposta_de_doacao_id_proposta INT,
    chat_id_chat INT,
    PRIMARY KEY (Proposta_de_doacao_id_proposta, chat_id_chat),
    FOREIGN KEY (Proposta_de_doacao_id_proposta) REFERENCES Proposta_de_doacao(id_proposta),
    FOREIGN KEY (chat_id_chat) REFERENCES Chat(id_chat)
);

-- Criação da tabela Proposta de doação
CREATE TABLE Proposta_de_doacao (
    id_proposta INT PRIMARY KEY,
    desc_proposta VARCHAR(1000),
    data_proposta DATE,
    Doador_CPF CHAR(11),
    Centro_de_doacao_CNPJ CHAR(14),
    FOREIGN KEY (Doador_CPF) REFERENCES Doador(CPF),
    FOREIGN KEY (Centro_de_doacao_CNPJ) REFERENCES Centro_de_doacao(CNPJ)
);

-- Criação da tabela Doador 
CREATE TABLE Doador (
    CPF CHAR(11) PRIMARY KEY,
    nome_doador VARCHAR(50),
    email_doador VARCHAR(100),
    senha_doador VARCHAR(50),
    imagem_perfil_doador MEDIUMBLOB,
    bio_doador VARCHAR(1000)
);

CREATE TABLE Doador_has_Meta_de_doacao (
    Doador_CPF CHAR(11),
    Meta_de_doacao_id_meta INT,
    PRIMARY KEY (Doador_CPF, Meta_de_doacao_id_meta),
    FOREIGN KEY (Doador_CPF) REFERENCES Doador(CPF),
    FOREIGN KEY (Meta_de_doacao_id_meta) REFERENCES Meta_de_doacao(id_meta)
);

-- Criação da tabela Telefone
CREATE TABLE Telefone (
    numero_telefone CHAR(11),
    Doador_CPF CHAR(11),
    Centro_de_doacao_CNPJ CHAR(14),
    Centro_de_doacao_Meta_de_doacao_id_meta INT,
    PRIMARY KEY (numero_telefone),
    FOREIGN KEY (Doador_CPF) REFERENCES Doador(CPF),
    FOREIGN KEY (Centro_de_doacao_CNPJ) REFERENCES Centro_de_doacao(CNPJ),
    FOREIGN KEY (Centro_de_doacao_Meta_de_doacao_id_meta) REFERENCES Meta_de_doacao(id_meta)
);

-- Criação da tabela Meta de doação
CREATE TABLE Meta_de_doacao (
    id_meta INT PRIMARY KEY,
    valor_objetivo_meta DOUBLE,
    valor_recebido_meta DOUBLE,
    desc_meta VARCHAR(1000),
    titulo_meta VARCHAR(50)
);

-- Criação da tabela Centro de doação
CREATE TABLE Centro_de_doacao (
    CNPJ CHAR(14) PRIMARY KEY,
    nome_centro VARCHAR(50),
    desc_centro VARCHAR(1000),
    email_centro VARCHAR(100),
    senha_centro VARCHAR(50),
    imagem_perfil_centro MEDIUMBLOB,
    valor_total_arrecadado DOUBLE,
    Meta_de_doacao_id_meta INT,
    FOREIGN KEY (Meta_de_doacao_id_meta) REFERENCES Meta_de_doacao(id_meta)
);

-- Criação da tabela Endereço
CREATE TABLE Endereco (
    cep CHAR(8),
    estado CHAR(2),
    bairro VARCHAR(30),
    numero INT,
    logradouro VARCHAR(100),
    Centro_de_doacao_CNPJ CHAR(14),
    Centro_de_doacao_Meta_de_doacao_id_meta INT,
    PRIMARY KEY (cep, numero),
    FOREIGN KEY (Centro_de_doacao_CNPJ) REFERENCES Centro_de_doacao(CNPJ),
    FOREIGN KEY (Centro_de_doacao_Meta_de_doacao_id_meta) REFERENCES Meta_de_doacao(id_meta)
);
```
