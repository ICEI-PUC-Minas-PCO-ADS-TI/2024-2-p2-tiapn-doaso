# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

## O software será estruturado da seguinte maneira:

![Arquitetura da Solução](images/Aplicação%20DoaSô.jpg)
- O acesso erá feito por meio da hospedagem;
- Os dados serão guardados no banco de dados;
- Funções como o pagamento serão feitas atráves de API's;
- Toda a aplicação será controlada e estruturada atráves de seus códigos Front-end: HTML, CSS, JavaScript. Utilizando tbm a tecnologia NodeJS para o Back-end.

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

Utilizando a notação do DER (Diagrama Entidade-Relacionamento), elabore um modelo, usando alguma ferramenta, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar também o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos do processo de negócio.

Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos.

### Modelo ER

O Modelo ER representa, por meio de um diagrama, como as entidades se relacionam entre si na aplicação interativa.
- [Como fazer um diagrama entidade relacionamento](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

> **Links úteis**:
> - [Como fazer um diagrama entidade relacionamento](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

### Esquema relacional

O Modelo relacional representa como as entidades se relacionam entre si na aplicação e os formatos de seus atributos.
![Terceira seção da página inicial](images/Esquemas%20de%20bd/PéDeGalinhaMySQL.png)

### Modelo físico

Aqui está o script de criação das tabelas do banco de dados.

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

## Tecnologias

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js         |
| SGBD           | MySQL           |
| Deploy         | Vercel          |

### Explicação das tecnologias

- **HTML + CSS + JS + React (Front-end):** HTML estrutura o conteúdo da página, CSS define a aparência e o layout, e JavaScript adiciona interatividade. React é uma biblioteca JavaScript utilizada para criar interfaces de usuário dinâmicas e componentes reutilizáveis.
- **Node.js (Back-end):** Plataforma que permite usar JavaScript no lado do servidor, possibilitando a criação de aplicações web rápidas e escaláveis.
- **MySQL (SGBD):** Sistema de gerenciamento de banco de dados relacional, responsável por organizar, armazenar e gerenciar os dados da aplicação.
- **Vercel (Deploy):** Plataforma de hospedagem que facilita o deploy de aplicações web, especialmente aquelas baseadas em frameworks como React, com suporte para integração contínua e entrega contínua (CI/CD).

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software
A equipe de desenvolvimento da DoaSô utilizará como base as métricas para seu projeto os seguintes itens:

### Funcionalidade
- Confirmidade: Permitindo que o software esteja de acordo com as normas impostas no inicio do projeto.
- Segurança de dados: Permitindo que acessos não autorizados, acidentais ou deliberados sejam evitados.

### Confiabilidade
- Recuperabilidade: Dados nunca devem ser perdidos, caso se corrompam, seja possível a recuperação.

### Usabilidade
- Comportamento em relação ao tempo: O usuário não deverá ser afetado com grande espera sobre o carregamento de nenhuma seção da aplicação.
- Apreensibilidade: O usuário deve conseguir navegar por toda a página sem grandes dificuldades.

### Portabilidade
- Adaptabilidade: A aplicação deve se adaptar aos diferentes cenários e dispositivos que for utilizada.

### Manutenibilidade
- Modificabilidade: Eventuais problemas na aplicação devem ser fáceis de serem resolvidos.
