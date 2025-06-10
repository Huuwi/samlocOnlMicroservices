import { io, type ManagerOptions, type SocketOptions } from "socket.io-client"

class SocketClient {
    url: string
    config: Partial<ManagerOptions & SocketOptions>
    socket: ReturnType<typeof io> | null

    constructor(
        url: string = import.meta.env.VITE_BACKEND_URL_SOCKET,
        config: Partial<ManagerOptions & SocketOptions> = {
            auth: {
                cookie: document.cookie
            }
        }
    ) {
        this.url = url
        this.config = {
            ...config,
            extraHeaders: {
                Cookie: document.cookie, // gửi toàn bộ cookie
            },
            withCredentials: true // để cho chắc nếu server dùng CORS
        }
        this.socket = null
    }

    connect() {
        if (!this.socket) {
            this.socket = io(this.url, this.config)
        }
        return this.socket
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }
}

export default SocketClient
