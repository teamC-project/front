import { io, Socket } from "socket.io-client";

const URL = process.env.REACT_APP_BACK_URL + ":9092"; 
const socket: Socket = io(URL);

export default socket;