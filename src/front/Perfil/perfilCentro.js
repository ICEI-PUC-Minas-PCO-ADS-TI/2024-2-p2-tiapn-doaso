document.addEventListener('DOMContentLoaded', function () {
    // Recupera os dados do localStorage
    const nomeCompleto = localStorage.getItem('nomeCompleto');
    const email = localStorage.getItem('email');
    const cnpj = localStorage.getItem('cnpj');
    const telefone = localStorage.getItem('telefone');
    const cep = localStorage.getItem('cep');
    const endereco = localStorage.getItem('endereco');
    const bairro = localStorage.getItem('bairro');
    const cidade = localStorage.getItem('cidade');
    const estado = localStorage.getItem('estado');
    const fotoPerfil = localStorage.getItem('fotoPerfil');

    // Preenche os campos da página de perfil
    if (nomeCompleto) {
        document.querySelector('.nomeItem').textContent = nomeCompleto;
    }

    if (email) {
        document.querySelector('.containerInfos .info:nth-of-type(4)').textContent = email;
    }

    if (cnpj) {
        document.querySelector('.containerInfos .info:nth-of-type(1)').textContent = cnpj;
    }

    if (cep) {
        document.querySelector('.containerInfos .info:nth-of-type(2)').textContent = cep;
    }

    if (telefone) {
        document.querySelector('.containerInfos .info:nth-of-type(3)').textContent = telefone;
    }

    if (fotoPerfil) {
        const imgPerfil = document.querySelector('.imgPerfil');
        imgPerfil.src = fotoPerfil;
        imgPerfil.alt = `Foto de perfil de ${nomeCompleto}`;
    }

    // Lógica do botão de favoritos
    document.addEventListener('DOMContentLoaded', function () {
        const favoriteIcon = document.getElementById('favorite-icon');
        
        favoriteIcon.addEventListener('click', function () {
            if (favoriteIcon.classList.contains('fa-regular')) {
                favoriteIcon.classList.remove('fa-regular');
                favoriteIcon.classList.add('fa-solid'); // Ícone preenchido
            } else {
                favoriteIcon.classList.remove('fa-solid');
                favoriteIcon.classList.add('fa-regular'); // Ícone contornado
            }
        });
    });
}); 
