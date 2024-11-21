function selecionarFoto() {
    const inputFile = document.getElementById('selecaoFoto');
    inputFile.click();

    inputFile.addEventListener('change', function () {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fotoBase64 = e.target.result;
                document.getElementById('fotoPreview').src = fotoBase64;
                localStorage.setItem('fotoPerfil', fotoBase64);
            };
            reader.readAsDataURL(file);
        }
    });
}


function salvarDados(event) {
    event.preventDefault();
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;
    const cnpj = document.getElementById('cnpj').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('CEP').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    localStorage.setItem('nomeCompleto', nomeCompleto);
    localStorage.setItem('email', email);
    localStorage.setItem('cnpj', cnpj);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('cep', cep);
    localStorage.setItem('endereco', endereco);
    localStorage.setItem('bairro', bairro);
    localStorage.setItem('cidade', cidade);
    localStorage.setItem('estado', estado);
    window.location.href = 'perfilCentro.html';
}
