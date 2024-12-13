// Função para criar a estrutura de configuração e menu hamburguer
function createConfigWrapper(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Container não encontrado.");
        return;
    }

    // Criando o wrapper principal
    const configWrapper = document.createElement("div");
    configWrapper.className = "configWrapper";

    // Barra de Configuração Padrão
    const configBar = document.createElement("div");
    configBar.className = "configBar";

    // Imagem de Perfil
    const imgProfile = document.createElement("div");
    imgProfile.className = "imgProfile";
    const img = document.createElement("img");
    img.src = "https://i.ibb.co/RcFgVsn/logo-sem-fundo.jpg";
    img.alt = "...";
    img.className = "imgProfileItem rounded-circle";
    imgProfile.appendChild(img);

    // Barra de Pesquisa
    const search = document.createElement("div");
    search.className = "search";
    const form = document.createElement("form");
    form.className = "searchBar d-flex";
    form.role = "search";
    const input = document.createElement("input");
    input.className = "form-control me-2";
    input.type = "search";
    input.placeholder = "Pesquisar";
    input.setAttribute("aria-label", "Search");
    const buttonSearch = document.createElement("button");
    buttonSearch.className = "btn";
    buttonSearch.type = "submit";
    buttonSearch.textContent = "Pesquisar";
    form.append(input, buttonSearch);
    search.appendChild(form);

    // Botão Minha Conta
    const myAccount = document.createElement("div");
    myAccount.className = "myAccount";

    const myAccountBtn = document.createElement("a");
    myAccountBtn.className = "myAccountBtn";

    // Verifica se o usuário corrente está presente no localStorage
    const usuarioCorrente = JSON.parse(localStorage.getItem("UsuarioLogado"));

    if (usuarioCorrente) {
        // Verifica se o usuário tem CPF ou CNPJ e redireciona para a página correspondente
        if ('cpf' in usuarioCorrente) {
            myAccountBtn.textContent = "Minha conta";
            myAccountBtn.href = "../../2024-2-p2-tiapn-doaso/src/front/Perfil/perfilDoador.html"; // Redireciona para o perfil de doador
        } else if ('cnpj' in usuarioCorrente) {
            myAccountBtn.textContent = "Minha conta";
            myAccountBtn.href = "../../2024-2-p2-tiapn-doaso/src/front/Perfil/perfilCentro.html"; // Redireciona para o perfil do centro
        }
    } else {
        // Se não houver usuário corrente, o botão será "Fazer Login"
        myAccountBtn.textContent = "Fazer Login";
        myAccountBtn.href = "../../2024-2-p2-tiapn-doaso/src/front/Login/login.html"; // Redireciona para a página de login
    }

    myAccount.appendChild(myAccountBtn);

    // Botão Quero Doar
    const queroDoar = document.createElement("div");
    queroDoar.className = "queroDoar";
    const donateButton = document.createElement("button");
    donateButton.className = "btn";
    donateButton.type = "button";
    donateButton.textContent = "Quero doar";
    queroDoar.appendChild(donateButton);

    // Notificação
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao";
    const notificationButton = document.createElement("button");
    notificationButton.className = "button";
    const bellIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    bellIcon.setAttribute("viewBox", "0 0 448 512");
    bellIcon.setAttribute("class", "bell");
    const bellPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bellPath.setAttribute("d", "M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z");
    bellIcon.appendChild(bellPath);
    notificationButton.appendChild(bellIcon);
    notificacao.appendChild(notificationButton);

    // Montando a barra de configuração
    configBar.append(imgProfile, myAccount, queroDoar, notificacao);
    configWrapper.appendChild(configBar);

    // Menu Hambúrguer
    const hamburgerMenu = document.createElement("div");
    hamburgerMenu.className = "hamburgerMenu";

    const btnHamburguer = document.createElement("button");
    btnHamburguer.className = "btnHamburguer";

    const spanIcon = document.createElement("span");
    spanIcon.className = "icon";
    const menuSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    menuSvg.setAttribute("viewBox", "0 0 175 80");
    menuSvg.setAttribute("width", "40");
    menuSvg.setAttribute("height", "40");
    ["0", "30", "60"].forEach((y) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("y", y);
        rect.setAttribute("width", "80");
        rect.setAttribute("height", "15");
        rect.setAttribute("fill", "#f0f0f0");
        rect.setAttribute("rx", "10");
        menuSvg.appendChild(rect);
    });
    spanIcon.appendChild(menuSvg);

    const spanText = document.createElement("span");
    spanText.className = "text";
    spanText.textContent = "MENU";
    btnHamburguer.append(spanIcon, spanText);

    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";

    const hamburgerContent = document.createElement("div");
    hamburgerContent.className = "hamburgerContent";

    const imgHamburger = img.cloneNode(true);
    const myAccountHamburger = myAccountBtn.cloneNode(true);
    const donateButtonHamburger = donateButton.cloneNode(true);

    hamburgerContent.append(imgHamburger, myAccountHamburger, donateButtonHamburger);
    sidebar.appendChild(hamburgerContent);
    hamburgerMenu.append(btnHamburguer, sidebar);

    // Montando o wrapper final
    configWrapper.appendChild(hamburgerMenu);
    container.appendChild(configWrapper);

    // Cria e adiciona o overlay ao corpo do documento
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Funções para abrir e fechar a barra lateral
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
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
}

// Chame a função passando o ID do container onde você quer inserir a estrutura
createConfigWrapper("seuContainerId");
