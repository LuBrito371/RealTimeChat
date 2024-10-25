document.addEventListener("DOMContentLoaded", function () {
    const socket = new WebSocket('ws://localhost:8084/connect');
    const Client = Stomp.over(socket);

    function openPopUp() {
        const popup = document.getElementById("popup");
        if (popup) {
            popup.classList.remove("hidden");
        } else {
            console.error("Elemento 'popup' não encontrado!");
        }
    }

    function openChat() {
        const popup = document.getElementById("popup");
        const chatContainer = document.getElementById("chatContainer");
        const usernameInput = document.getElementById("usernameInput").value;

        if (usernameInput !== "") {
            popup.style.display = "none";
            chatContainer.classList.remove("hidden");
            sessionStorage.setItem("user", usernameInput);
        } else {
            alert("Digite um nome válido!");
        }
    }

    function displayMessage(message, name) {
        const chatMessages = document.getElementById("chatMessages");
        const messageElement = document.createElement("div");

        messageElement.textContent = name + ": " + message;
        chatMessages.appendChild(messageElement);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageInput = document.getElementById("messageInput").value;
       
        const message = {
            user: sessionStorage.getItem("user"),
            message: messageInput
        };
      
        Client.send("/app/chatMessage", {}, JSON.stringify(message));
        document.getElementById("messageInput").value = "";

        //displayMessage(messageInput, sessionStorage.getItem('user'));
    }

    function connect() {
        Client.connect({}, function (frame) {
            console.log('Conectado: ' + frame);

            Client.subscribe('/chat', function (message) {
                const chatMessage = JSON.parse(message.body);
                displayMessage(chatMessage.message, chatMessage.user);
            });
        });
    }

    connect();
    openPopUp();

    window.openChat = openChat;
    window.sendMessage = sendMessage;
});
