create database doaso;
use doaso;

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    tipo_usuario ENUM('Doador', 'Centro') NOT NULL
);

-- Criação da tabela Doador 
CREATE TABLE Doador (
    id_doador INT PRIMARY KEY,
    CPF CHAR(11),
    nome_doador VARCHAR(50),
    email_doador VARCHAR(100),
    senha_doador VARCHAR(50),
    imagem_perfil_doador MEDIUMBLOB,
    bio_doador VARCHAR(1000),
    endereco_rua VARCHAR(200),
    endereco_bairro VARCHAR(50),
    endereco_numero INT,
    endereco_cidade VARCHAR(100),
    endereco_estado_sigla CHAR(2),
    endereco_cep CHAR(8),
    telefone_numero VARCHAR(13), 
    FOREIGN KEY (id_doador) REFERENCES Usuario(id_usuario)
);

-- Criação da tabela Centro de doação
CREATE TABLE Centro_de_doacao (
    id_centro INT PRIMARY KEY,
    CNPJ CHAR(14),
    nome_centro VARCHAR(50),
    desc_centro VARCHAR(1000),
    email_centro VARCHAR(100),
    senha_centro VARCHAR(50),
    imagem_perfil_centro MEDIUMBLOB,
    valor_total_arrecadado DOUBLE,    
    endereco_rua VARCHAR(200),
    endereco_bairro VARCHAR(50),
    endereco_numero INT,
    endereco_cidade VARCHAR(100),
    endereco_estado_sigla CHAR(2),
    endereco_cep CHAR(8),
    telefone_numero VARCHAR(13), 
    FOREIGN KEY (id_centro) REFERENCES Usuario(id_usuario)
);

-- Criação da tabela Meta de doação
CREATE TABLE Meta_de_doacao (
    id_meta INT PRIMARY KEY AUTO_INCREMENT,
    valor_objetivo_meta DOUBLE,
    valor_recebido_meta DOUBLE,
    desc_meta VARCHAR(1000),
    titulo_meta VARCHAR(50),
    id_centro_criador INT,
    FOREIGN KEY (id_centro_criador) REFERENCES Centro_de_doacao(id_centro)
    );

-- Criação da tabela Proposta de doação
CREATE TABLE Proposta_de_doacao (
    id_proposta INT PRIMARY KEY AUTO_INCREMENT,
    desc_proposta VARCHAR(1000),
    data_proposta DATE,
    Doador_id_doador INT,
    Centro_de_doacao_id_centro INT,
    FOREIGN KEY (Doador_id_doador) REFERENCES Doador(id_doador),
    FOREIGN KEY (Centro_de_doacao_id_centro) REFERENCES Centro_de_doacao(id_centro)
);

-- Criação da tabela Chat
CREATE TABLE Chat (
    id_chat INT PRIMARY KEY AUTO_INCREMENT,
    Proposta_de_doacao_id_proposta INT,
    FOREIGN KEY (Proposta_de_doacao_id_proposta) REFERENCES Proposta_de_doacao(id_proposta)
);

-- Criação da tabela Imagem da doação
CREATE TABLE Imagem_doacao (
    id_proposta INT AUTO_INCREMENT,
    id_chat INT,
    PRIMARY KEY (id_proposta, id_chat),
    FOREIGN KEY (id_proposta) REFERENCES Proposta_de_doacao(id_proposta),
    FOREIGN KEY (id_chat) REFERENCES Chat(id_chat)
);


-- Criação da tabela Mensagem
CREATE TABLE Mensagem (
    id_mensagem INT PRIMARY KEY AUTO_INCREMENT,
    data_chat DATE,
    conteudo_chat VARCHAR(500),
    visualizacao_chat INT,
	id_chat INT,
    FOREIGN KEY (id_chat) REFERENCES Chat(id_chat)
);

-- Criação da tabela de Favorito
CREATE TABLE Favorito(
	id_centro_favoritado INT,
    id_doador INT,
    PRIMARY KEY (id_centro_favoritado, id_doador),
    FOREIGN KEY (id_centro_favoritado) REFERENCES Centro_de_doacao(id_centro),
	FOREIGN KEY (id_doador) REFERENCES Doador(id_doador)
);
