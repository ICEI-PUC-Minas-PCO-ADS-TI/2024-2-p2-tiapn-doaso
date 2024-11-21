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
    img.src ="https://i.ibb.co/RcFgVsn/logo-sem-fundo.jpg"
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
    myAccountBtn.href = "";
    myAccountBtn.textContent = "Minha conta";
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
    configBar.append(imgProfile, search, myAccount, queroDoar, notificacao);
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

// MAPBOX INICIO ---------------------------------------------------------------------------------------------------
// Configuração inicial do mapa
mapboxgl.accessToken = 'pk.eyJ1IjoiaWdvcm1tZiIsImEiOiJjbTNtYWx5ajMwdzloMmxvb2d5amJxZDQ0In0.xwhRysuUeQmQcGUwylABKw';
const map = new mapboxgl.Map({
    container: 'map', // ID do container
    style: 'mapbox://styles/mapbox/streets-v11', // Estilo do mapa
    center: [-44.0635, -19.9319], // Coordenadas iniciais (Contagem, MG)
    zoom: 14 // Nível de zoom inicial
});

// Adicionando controle de navegação ao mapa
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// Função para adicionar marcadores de doações
function addMarkers(donations) {
    donations.forEach(donation => {
        let markerElement = null;
        if (donation.icon) {
            markerElement = document.createElement('img');
            markerElement.src = donation.icon; // URL do ícone personalizado
            markerElement.style.width = '30px'; // Ajusta o tamanho do ícone
        }

        // Cria popup com informações da doação
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <h3>${donation.name}</h3>
            <p>${donation.description}</p>
        `);

        // Adiciona marcador no mapa
        new mapboxgl.Marker(markerElement ? { element: markerElement } : { color: "blue" }) // Usa ícone personalizado ou marcador padrão
            .setLngLat([donation.location.longitude, donation.location.latitude]) // Localização do marcador
            .setPopup(popup) // Associa o popup ao marcador
            .addTo(map);
    });
}

// Simulando um backend com a lista de doações
const donations = [
    {
        name: "Ponto de Alimento",
        description: "Comida pra rapaziada",
        location: { latitude: -19.9319, longitude: -44.0635 }
    },
    {
        name: "Doação de roupas",
        description: "Centro de roupitchas pra tchurma",
        location: { latitude: -19.9325, longitude: -44.0650 }
    },
    {
        name: "Banco de Alimentos - Contagem",
        description: "Doações de alimentos não perecíveis",
        location: { latitude: -19.9210, longitude: -44.0615 }
    },
    {
        name: "Solidariedade para Todos",
        description: "Doação de roupas, calçados e cobertores",
        location: { latitude: -19.9338, longitude: -44.0731 }
    },
    {
        name: "Centro de Apoio à Comunidade",
        description: "Ponto de coleta de roupas e alimentos",
        location: { latitude: -19.9261, longitude: -44.0703 }
    },
    {
        name: "Doação de Alimentos e Roupas - Contagem",
        description: "Aceita doações de alimentos, roupas e produtos de higiene",
        location: { latitude: -19.9372, longitude: -44.0699 }
    }
];

// Adicionando os marcadores das doações ao mapa
addMarkers(donations);

// LOCALIZAÇÃO DO USUÁRIO --------------------------------------------------------------------------------------------------
// Obtendo a localização atual do usuário
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        // Adiciona o marcador da localização atual do usuário
        const userMarker = new mapboxgl.Marker({ color: "red" }) // Marcador vermelho para a localização do usuário
            .setLngLat([userLocation.longitude, userLocation.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML("<h3>Você está aqui!</h3>"))
            .addTo(map);

        // Centraliza o mapa para incluir todos os marcadores
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([userLocation.longitude, userLocation.latitude]); // Adiciona a localização do usuário

        donations.forEach(donation => {
            bounds.extend([donation.location.longitude, donation.location.latitude]); // Adiciona os marcadores das doações
        });

        map.fitBounds(bounds, { padding: 50 }); // Ajusta o mapa para mostrar todos os marcadores

        // Obtém o endereço usando a API de geocodificação reversa do Mapbox
        const accessToken = mapboxgl.accessToken; // Reutiliza o token já definido
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation.longitude},${userLocation.latitude}.json?access_token=${accessToken}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const address = data.features[0]?.place_name || "Endereço não encontrado.";
                document.getElementById("user-address").textContent = `Seu endereço: ${address}`;
            })
            .catch(error => {
                console.error("Erro ao obter o endereço:", error);
                document.getElementById("user-address").textContent = "Não foi possível determinar o endereço.";
            });

    }, error => {
        console.error("Erro ao obter localização do usuário:", error);
        document.getElementById("user-address").textContent = "Localização não encontrada.";
    });
} else {
    console.error("Geolocalização não é suportada pelo navegador.");
    document.getElementById("user-address").textContent = "Geolocalização não suportada pelo navegador.";
}
// LOCALIZAÇÃO DO USUÁRIO FIM --------------------------------------------------------------------------------------------------

// MAPBOX INICIO FIM ---------------------------------------------------------------------------------------------------------

