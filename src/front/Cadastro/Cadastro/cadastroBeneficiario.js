// Salvar a foto de perfil no localStorage
function selecionarFoto() {
    const inputFile = document.getElementById('selecaoFoto');
    inputFile.click(); // Abre o seletor de arquivos

    inputFile.addEventListener('change', function () {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fotoBase64 = e.target.result;
                document.getElementById('fotoPreview').src = fotoBase64; // Atualiza o preview
                localStorage.setItem('fotoPerfil', fotoBase64); // Salva no localStorage
            };
            reader.readAsDataURL(file); // Lê o arquivo como base64
        }
    });
}

function salvarDados(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Coleta os dados do formulário
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('CEP').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Salva os dados no localStorage
    localStorage.setItem('nomeCompleto', nomeCompleto);
    localStorage.setItem('email', email);
    localStorage.setItem('cpf', cpf);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('cep', cep);
    localStorage.setItem('endereco', endereco);
    localStorage.setItem('bairro', bairro);
    localStorage.setItem('cidade', cidade);
    localStorage.setItem('estado', estado);

    // Redireciona para a página de perfil
    window.location.href = 'perfil.html';
}
