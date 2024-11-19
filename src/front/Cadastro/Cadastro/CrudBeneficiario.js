const salvarUsuariosNoLocalStorage = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

const carregarUsuariosDoLocalStorage = () => {
    const dadosSalvos = localStorage.getItem('usuarios');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
};

// Função para cadastrar um novo usuário
const cadastrarUsuario = (event) => {
    event.preventDefault();

    // Obtém os dados do formulário
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('CEP').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Carrega os usuários existentes do Local Storage
    const usuarios = carregarUsuariosDoLocalStorage();

    // Verifica se o CPF já está cadastrado
    if (usuarios.some((usuario) => usuario.cpf === cpf)) {
        alert('Este CPF já está cadastrado!');
        return;
    }

    // Cria um novo usuário
    const novoUsuario = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1, // Gera um ID incremental
        nomeCompleto,
        email,
        cpf,
        telefone,
        cep,
        endereco,
        bairro,
        cidade,
        estado,
    };

    // Adiciona o novo usuário à lista e salva no Local Storage
    usuarios.push(novoUsuario);
    salvarUsuariosNoLocalStorage(usuarios);

    alert('Usuário cadastrado com sucesso!');
    limparFormulario();
};

// Função para limpar o formulário após o cadastro
const limparFormulario = () => {
    document.querySelector('form').reset();
};

// Função para exibir os dados em outra página (JsonWeb.html)
const exibirUsuariosNoConsole = () => {
    const usuarios = carregarUsuariosDoLocalStorage();
    console.log('Usuários cadastrados:', JSON.stringify(usuarios, null, 2));
};

// Adiciona o evento de submit ao formulário
document.querySelector('form').addEventListener('submit', cadastrarUsuario);
