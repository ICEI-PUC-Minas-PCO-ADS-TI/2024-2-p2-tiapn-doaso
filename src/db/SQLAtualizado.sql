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
			FOREIGN KEY (id_doador) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
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
			FOREIGN KEY (id_centro) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
		);

		-- Criação da tabela Meta de doação
		CREATE TABLE Meta_de_doacao (
			id_meta INT PRIMARY KEY AUTO_INCREMENT,
			valor_objetivo_meta DOUBLE,
			valor_recebido_meta DOUBLE,
			desc_meta VARCHAR(1000),
			titulo_meta VARCHAR(50),
			imagem_meta VARCHAR(2000),
			id_centro_criador INT,
			FOREIGN KEY (id_centro_criador) REFERENCES Centro_de_doacao(id_centro) ON DELETE CASCADE
			);

		-- Criação da tabela Proposta de doação
		CREATE TABLE Proposta_de_doacao (
			id_proposta INT PRIMARY KEY AUTO_INCREMENT,
			desc_proposta VARCHAR(1000),
			data_proposta DATE,
			id_doador_remetente INT,
			id_centro_destinatario INT,
			status_proposta BOOLEAN,
			FOREIGN KEY (id_doador_remetente) REFERENCES Doador(id_doador),
			FOREIGN KEY (id_centro_destinatario) REFERENCES Centro_de_doacao(id_centro) ON DELETE CASCADE
		);

		-- Criação da tabela Imagem da doação
		CREATE TABLE Imagem_doacao (
			id_imagem INT AUTO_INCREMENT,
            id_proposta INT,
			imagem VARCHAR(2000),
			PRIMARY KEY (id_imagem, id_proposta),
			FOREIGN KEY (id_proposta) REFERENCES Proposta_de_doacao(id_proposta) ON DELETE CASCADE
		);


		-- Criação da tabela Mensagem
		CREATE TABLE Mensagem (
			id_mensagem INT PRIMARY KEY AUTO_INCREMENT,
			data_mensagem DATE,
			conteudo_mensagem VARCHAR(500),
			visualizacao_mensagem BOOLEAN,
			id_proposta INT,
			id_remetente INT,
			id_destinatario INT,
			FOREIGN KEY (id_proposta) REFERENCES Proposta_de_doacao(id_proposta) ON DELETE CASCADE,
		);

		-- Criação da tabela de Favorito
		CREATE TABLE Favorito(
			id_centro_favoritado INT,
			id_doador INT,
			PRIMARY KEY (id_centro_favoritado, id_doador),
			FOREIGN KEY (id_centro_favoritado) REFERENCES Centro_de_doacao(id_centro) ON DELETE CASCADE,
			FOREIGN KEY (id_doador) REFERENCES Doador(id_doador) ON DELETE CASCADE
		);
        
        CREATE TABLE Notificacao(
			id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
            tipo_notificacao VARCHAR(50),
            id_usuario INT,
            visualizacao_notificacao BOOLEAN,
            data_notificacao DATE,
            foreign key (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
        );
