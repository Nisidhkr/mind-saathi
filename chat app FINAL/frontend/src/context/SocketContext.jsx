import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("🔌 Attempting to connect to socket server at http://localhost:5005");
    
    const newSocket = io("http://localhost:5005", {
      transports: ['websocket', 'polling'],
      timeout: 10000,
      forceNew: true
    });
    
    setSocket(newSocket);

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("✅ Socket connected successfully:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
    });

    // listen for nickname
    newSocket.on("nickname", (name) => {
      console.log("👤 Received nickname:", name);
      setNickname(name);
    });

    // Get email from URL parameters and authenticate user
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (email) {
      // Authenticate user with email to get permanent nickname
      newSocket.emit("authenticateUser", email);
      console.log(`🔐 Authenticating user with email: ${email}`);
    }

    return () => {
      console.log("🔌 Cleaning up socket connection");
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, nickname }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
