import { io } from "socket.io-client";

// Point to backend server origin
const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000");

export default socket;
