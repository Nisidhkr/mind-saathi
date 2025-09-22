import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Header from "../components/Header";
import { useSocket } from "../context/SocketContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { nickname } = useSocket();
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      {/* Left Sidebar */}
      <Sidebar onSelectGroup={setSelectedGroup} />

      {/* Right Side */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <Header nickname={nickname || "Connecting..."} />

        {/* Chat Area */}
        <ChatWindow group={selectedGroup} />
      </div>
    </div>
  );
}
