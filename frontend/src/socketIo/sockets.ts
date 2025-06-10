import SocketClient from "./SocketClient";

const socketLobby = new SocketClient(import.meta.env.API_GATE_WAY_URL + import.meta.env.SOCKET_LOBBY_SERVICE_NAME)
const socketChat = new SocketClient(import.meta.env.API_GATE_WAY_URL + import.meta.env.SOCKET_CHAT_SERVICE_NAME)
const socketCardGame = new SocketClient(import.meta.env.API_GATE_WAY_URL + import.meta.env.SOCKET_CARD_GAME_SERVICE_NAME)


const sockets = {
    socketLobby,
    socketChat,
    socketCardGame
}

export default sockets