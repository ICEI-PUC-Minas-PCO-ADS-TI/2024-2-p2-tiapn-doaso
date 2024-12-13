document.addEventListener('DOMContentLoaded', async () => {
    const notificationButton = document.querySelector('.button');
    const notificationDropdown = document.createElement('div');
    notificationDropdown.className = 'notification-dropdown hidden';

    const notificationList = document.createElement('div');
    notificationList.id = 'notification-list';
    notificationList.className = 'notification-list';

    notificationDropdown.appendChild(notificationList);
    document.body.appendChild(notificationDropdown);

    let notifications = [];

    // Função para carregar notificações do banco
    async function loadNotificationsFromDB(userId) {
        try {
            const dbNotifications = await NotificacaoHelper.getNotificacaoByIdUsuario(userId);
            notifications = dbNotifications.map((notif) => ({
                id: notif.id,
                message: notif.message,
                icon: notif.icon || "🔔",
                date: notif.date,
                read: notif.read || false,
            }));
            baseNotifications(); // Atualiza a interface
        } catch (error) {
            console.error("Erro ao carregar notificações do banco:", error);
        }
    }

    // Atualizar notificações na interface
    function baseNotifications() {
        notificationList.innerHTML = '';

        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
            notificationItem.style.backgroundColor = notification.read ? '#ffffff' : '#fffbe5';

            notificationItem.innerHTML = `
                <div class="notification-item-content">
                    <span class="notification-item-message">${notification.message}</span>
                    <small class="notification-item-date">${new Date(notification.date).toLocaleDateString()}</small>
                </div>
                <button class="notification-check" title="Marcar como lida">
                    ${notification.read ? '✅' : '✔️'}
                </button>
            `;

            const checkButton = notificationItem.querySelector('.notification-check');
            checkButton.addEventListener('click', async (e) => {
                e.stopPropagation();
                await updateNotification(notification.id);
            });

            notificationList.appendChild(notificationItem);
        });

        updateUnreadCount();
    }

    // Atualizar contador de notificações não lidas
    function updateUnreadCount() {
        const unreadCount = notifications.filter(n => !n.read).length;
        notificationButton.textContent = unreadCount > 0 ? `🔔 (${unreadCount})` : '🔔';
    }

    // Função para marcar uma notificação como lida
    async function updateNotification(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            try {
                await NotificacaoHelper.putNotificacao(notificationId, { read: true });
                notification.read = true;
                baseNotifications();
            } catch (error) {
                console.error("Erro ao atualizar notificação:", error);
            }
        }
    }

    // Recuperar o ID do usuário logado usando o UsuarioHelper
    async function getLoggedUserId() {
        try {
            const response = await UsuarioHelper.getDoador();
            if (response && response.length > 0) {
                return response[0].id; 
            }
            return null;
        } catch (error) {
            console.error("Erro ao buscar usuário logado:", error);
            return null;
        }
    }

    // Recuperar o ID do usuário logado
    const loggedUserId = await getLoggedUserId();

    if (loggedUserId) {
        await loadNotificationsFromDB(loggedUserId); // Carrega notificações do banco para o usuário logado
    } else {
        console.error("Nenhum usuário logado encontrado.");
    }

    // Mostra ou oculta o dropdown ao clicar no botão
    notificationButton.addEventListener('click', () => {
        const isHidden = notificationDropdown.classList.contains('hidden');

        if (isHidden) {
            const buttonRect = notificationButton.getBoundingClientRect();
            const dropdownWidth = notificationDropdown.offsetWidth;
            const buttonCenter = buttonRect.left + buttonRect.width / 2;
            const dropdownLeft = buttonCenter - dropdownWidth / 2;

            notificationDropdown.style.top = `${buttonRect.bottom + window.scrollY}px`;
            notificationDropdown.style.left = `${dropdownLeft + window.scrollX}px`;

            notificationDropdown.classList.remove('hidden');
            notificationDropdown.classList.add('visible');
        } else {
            notificationDropdown.classList.remove('visible');
            notificationDropdown.classList.add('hidden');
        }
    });

    // Atualiza notificações a cada intervalo de tempo
    setInterval(async () => {
        if (loggedUserId) {
            await loadNotificationsFromDB(loggedUserId);
        }
    }, 30000); 
});