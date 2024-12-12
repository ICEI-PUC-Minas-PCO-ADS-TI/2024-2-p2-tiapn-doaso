import UsuarioHelper from "../script/Usuario.js";


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

// Função para obter latitude e longitude a partir do CEP
async function getLatLong(cep) {
    try {
        const response = await fetch("https://cep.awesomeapi.com.br/json/" + cep, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return { latitude: data.lat, longitude: data.lng };
    } catch (error) {
        console.error("Erro ao fazer a requisição GET:", error);
        throw error;
    }
}

// Função para adicionar marcadores de doações
async function addMarkers() {
    try {
        var donations = await UsuarioHelper.getCentro(); // Pega os centros de doação no backend 

        // Para cada doação, obtemos as coordenadas e criamos o marcador
        for (let donation of donations) {
            const { latitude, longitude } = await getLatLong(donation.endereco_cep);
            console.log(latitude, longitude);

            // Ajusta os campos para corresponder ao banco de dados
            const name = donation.nome_centro; // Nome do centro
            const description = donation.desc_centro; // Descrição do centro

            // Cria popup com informações da doação
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <h3>${name}</h3>
                <p>${description}</p>
            `);

            // Cria o marcador
            new mapboxgl.Marker({ color: "blue" })
                .setLngLat([longitude, latitude]) // Localização do marcador
                .setPopup(popup) // Associa o popup ao marcador
                .addTo(map);
        }
    } catch (error) {
        console.error("Erro ao adicionar marcadores:", error);
    }
}


// Adicionando os marcadores das doações ao mapa
addMarkers();

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

        // Ajuste dos bounds de doações para mostrar todos os marcadores
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
