import SocketClient from "./SocketClient";

const socketLobby = new SocketClient(import.meta.env.VITE_SOCKET_LOBBY_SERVICE_URL);
const socketChat = new SocketClient("http://localhost:8000");
const socketCardGame = new SocketClient(import.meta.env.VITE_SOCKET_CARDGAME_SERVICE_URL);

const sockets = {
    socketLobby,
    socketChat,
    socketCardGame
};

export default sockets;
