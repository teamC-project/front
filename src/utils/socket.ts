import { io, Socket } from "socket.io-client";

const URL = "http://localhost:4200"; 
const socket: Socket = io(URL, {
    autoConnect: false,
});

export default socket;