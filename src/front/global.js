const btnHamburguer = document.querySelector('.btnHamburguer');
const sidebar = document.querySelector('.sidebar');
const pageContent = document.querySelector('.pageContent');

// Cria e adiciona o overlay ao corpo do documento
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Função para abrir a barra lateral
function openSidebar() {
    sidebar.classList.add('open');
    pageContent.classList.add('shifted');
    overlay.classList.add('show');
}

// Função para fechar a barra lateral
function closeSidebar() {
    sidebar.classList.remove('open');
    pageContent.classList.remove('shifted');
    overlay.classList.remove('show');
}

// Abre ou fecha a barra lateral ao clicar no botão
btnHamburguer.addEventListener('click', function() {
    if (!sidebar.classList.contains('open')) {
        openSidebar();
    } else {
        closeSidebar();
    }
});

// Fecha a barra lateral ao clicar fora dela (no overlay)
overlay.addEventListener('click', closeSidebar);
