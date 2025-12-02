# DoaSô

`CURSO: Análise e Desenvolvimento de Sistemas`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Processos de Negócios`

`2º semestre/2024`

O objetivo principal do DoaSô é proporcionar uma solução tecnológica que simplifique o processo de doação, conectando de maneira eficiente doadores e beneficiários. Além disso, a plataforma busca promover práticas sustentáveis, incentivando a reutilização de itens que, de outra forma, seriam descartados, e assim contribuindo para a redução do desperdício com base no 12° objetivo de Objetivos de Desenvolvimento Sustentável global (ODS 12), objetivos estes criados pela Organização das Nações Unidas (ONU). Especificamente, a plataforma visa:

- Criar um ambiente seguro e acessível para o cadastro de parceiros e voluntários.
- Facilitar a localização e visualização de pontos de doação, proporcionando transparência e acessibilidade.
- Implementar ferramentas avançadas de busca e filtragem, melhorando a experiência do usuário.
- Estabelecer um sistema de feedback e avaliações para assegurar a qualidade e confiabilidade das doações.


## Integrantes

* Gabriel Madureira Matos
* Guilherme de Oliveira Souza
* Igor Maia Moreira Fernandes
* Luis Henrique Sampaio Vieira
* Thiago Moreira de Queiroz
* Victor Schneider do Vale
* Vitor Prates Souza Lima
* Wendell Leonardo Machado Miranda

## Professor

* Amália Soares Vieira de Vasconcelos

## Instruções de utilização

📄 Guia Detalhado de Configuração e Execução da Aplicação (DoaSô API)
Este guia detalha o processo para configurar e executar a API de backend (Node.js/Express) em um ambiente de desenvolvimento local, garantindo que todos os colegas de turma possam rodar a aplicação com sucesso.

1. Pré-requisitos 🛠️
Para rodar o projeto, você precisa dos seguintes softwares instalados:

Node.js: Versão LTS (recomendada).

MySQL Server: Um servidor MySQL ativo (pode ser o MySQL Community Server, ou através de pacotes como XAMPP/WAMP/MAMP).

MySQL Workbench/phpMyAdmin: Opcional, mas recomendado para gerenciar o banco de dados.

2. Configuração do Ambiente e Dependências
2.1. Instalação das Dependências
No terminal, navegue até a pasta raiz do projeto (onde está o arquivo package.json) e execute o comando para instalar as dependências necessárias (Express, mysql2, cors, etc.):

Bash

npm install
2.2. Configuração do Banco de Dados (MySQL)
A aplicação está configurada para usar um banco de dados MySQL chamado doaso.

A. Iniciar o Serviço MySQL
Certifique-se de que o seu servidor MySQL esteja ativo e rodando na porta padrão (3306).

(Se estiver usando XAMPP, inicie o módulo MySQL no painel de controle.)

B. Criar o Banco de Dados e as Tabelas
O script SQLAtualizado.sql contém o esquema completo do banco de dados.

Conecte-se ao seu servidor MySQL (via Workbench, phpMyAdmin, ou linha de comando).

Execute o conteúdo completo do arquivo SQLAtualizado.sql para criar o banco de dados doaso e todas as suas tabelas (Doador, Centro_de_doacao, etc.).

2.3. Ajuste da Conexão da API
O arquivo connection_mysql.js define as credenciais de conexão da API com o banco de dados. Você deve editá-lo para usar as suas credenciais locais.

Edite o arquivo connection_mysql.js para refletir sua configuração local:

JavaScript

// connection_mysql.js
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: "localhost",            // Mantenha "localhost" ou "127.0.0.1"
  user: "root",                 // Seu usuário MySQL local (geralmente 'root')
  password: "",                 // Sua senha MySQL local. Use "" se não tiver senha.
  database: "doaso",            // Nome do banco de dados criado
  port: 3306                    // Porta padrão do MySQL
})

// ... (Restante do código)
3. Execução da Aplicação 🚀
3.1. Iniciar o Servidor Backend (API)
No terminal, a partir da pasta raiz do projeto, execute o arquivo principal:

Bash

node index.js
Se a conexão for bem-sucedida, você verá as seguintes mensagens de console:

Conexão estabelecida: [ID da thread]
Server is running on 3307
O servidor da sua API estará rodando em http://localhost:3307.

3.2. Acessar o Frontend
Para visualizar a página inicial:

Abra o arquivo index.html no seu navegador. Ele fará chamadas para a API em http://localhost:3307.

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/11-Referencias.md"> Referências</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
