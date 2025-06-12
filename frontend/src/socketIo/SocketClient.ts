import { io, type ManagerOptions, type SocketOptions } from "socket.io-client";

class SocketClient {
    url: string;
    config: Partial<ManagerOptions & SocketOptions>;
    socket: ReturnType<typeof io> | null;

    constructor(
        url: string,
        config: Partial<ManagerOptions & SocketOptions> = {
            auth: {
                cookie: document.cookie
            }
        }
    ) {
        this.url = url;

        this.config = {
            ...config,
            withCredentials: true
        };

        this.socket = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io(this.url, this.config);
        }
        this.socket.on("hello", (msg) => {
            console.log(msg);

        })
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default SocketClient;
