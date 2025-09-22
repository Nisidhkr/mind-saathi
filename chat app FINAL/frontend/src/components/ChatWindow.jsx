import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useSocket } from "../context/SocketContext";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from 'uuid';

export default function ChatWindow({ group }) {
  const { socket, nickname } = useSocket();
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const messagesEndRef = useRef(null);

  // scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // fetch old messages
  useEffect(() => {
    if (group) {
      const fetchMessages = async () => {
        try {
          const res = await api.get(`/messages/${group._id}`);
          setMessages(res.data);
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      };
      fetchMessages();

      socket.emit("joinGroup", group._id);
    }
  }, [group]);

  // listen for new + typing events + message status events
  useEffect(() => {
    if (!socket) return;

    // Handle new messages from other users
    socket.on("newMessage", (message) => {
      setMessages((prev) => {
        // Don't add if it's our own message (check by nickname and recent text)
        const isOwnMessage = message.nickname === nickname && 
          prev.some(msg => 
            msg.nickname === nickname && 
            msg.text === message.text && 
            (msg.tempId || msg.status) // Has tempId or status means it's our local message
          );
        
        if (isOwnMessage) {
          console.log("Skipping duplicate own message:", message.text);
          return prev;
        }
        
        return [...prev, message];
      });
    });

    // Handle message sent confirmation
    socket.on("messageSent", ({ tempId, saved }) => {
      setMessages((prev) => 
        prev.map(msg => 
          msg.tempId === tempId 
            ? { ...saved, status: 'sent' }
            : msg
        )
      );
    });

    // Handle message blocked
    socket.on("messageBlocked", ({ tempId, reason }) => {
      setMessages((prev) => 
        prev.map(msg => 
          msg.tempId === tempId 
            ? { ...msg, status: 'blocked', blockReason: reason }
            : msg
        )
      );
    });

    socket.on("userTyping", (user) => {
      if (user !== nickname) {
        setTypingUsers((prev) =>
          prev.includes(user) ? prev : [...prev, user]
        );
      }
    });

    socket.on("userStopTyping", (user) => {
      setTypingUsers((prev) => prev.filter((u) => u !== user));
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageSent");
      socket.off("messageBlocked");
      socket.off("userTyping");
      socket.off("userStopTyping");
    };
  }, [socket, nickname]);

  // send
  const sendMessage = () => {
    if (text.trim() === "" || !group) return;
    
    const tempId = uuidv4();
    const messageText = text.trim();
    
    // Add message locally with pending status
    const tempMessage = {
      tempId,
      nickname,
      text: messageText,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setMessages(prev => [...prev, tempMessage]);
    
    // Send to server
    socket.emit("sendMessage", {
      tempId,
      text: messageText,
      groupId: group._id,
      anonUsername: isAnonymous ? `Anonymous_${Math.random().toString(36).substr(2, 4)}` : nickname
    });
    
    socket.emit("stopTyping", group._id); // stop typing once sent
    setText("");
  };

  // handle typing events
  const handleTyping = (e) => {
    setText(e.target.value);

    if (e.target.value.length > 0) {
      socket.emit("typing", group._id);
    } else {
      socket.emit("stopTyping", group._id);
    }
  };

  // format time
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // generate avatar emoji based on username
  const getAvatarEmoji = (username) => {
    const emojis = ['🦊', '🐬', '🐨', '🦋', '🌟', '🎯', '🚀', '🎨', '🌸', '🍀', '🔥', '💎', '🌙', '⚡', '🎭', '🦄', '🐝', '🌊', '🎪', '🍃'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return emojis[Math.abs(hash) % emojis.length];
  };

  // 50 expression emojis for the emoji picker
  const expressionEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
    '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
    '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
    '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧'
  ];

  // add emoji to text
  const addEmoji = (emoji) => {
    setText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!group) {
    return (
      <div className={`flex flex-1 items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}>
        {/* Subtle background gradients */}
        <div className={`absolute inset-0 transition-colors duration-300 ${
          isDarkMode 
            ? "bg-gradient-to-br from-gray-800/30 to-gray-900" 
            : "bg-gradient-to-br from-gray-50/30 to-white"
        }`}></div>
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl transition-colors duration-300 ${
          isDarkMode 
            ? "bg-gradient-to-br from-gray-700 to-gray-800" 
            : "bg-gradient-to-br from-gray-100 to-gray-200"
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl transition-colors duration-300 ${
          isDarkMode 
            ? "bg-gradient-to-tl from-gray-700 to-gray-800" 
            : "bg-gradient-to-tl from-gray-100 to-gray-200"
        }`}></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h1 className={`text-5xl md:text-6xl font-bold leading-none mb-6 tracking-tight transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            STIGMA-FREE
            <br />
            <span className={isDarkMode ? "text-emerald-400" : "text-perylene-600"}>
              CHAT
            </span>
          </h1>
          <p className={`text-xl md:text-2xl font-light leading-relaxed transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Your safe space for <span className={`font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}>anonymous conversations</span>
            <br />
            <span className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>Select a group from the left to start chatting</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col flex-1 relative overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      {/* Subtle background gradients */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-800/30 to-gray-900" 
          : "bg-gradient-to-br from-gray-50/30 to-white"
      }`}></div>
      <div className={`absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-700 to-gray-800" 
          : "bg-gradient-to-br from-gray-100 to-gray-200"
      }`}></div>
      <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-8 blur-3xl transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-tl from-gray-700 to-gray-800" 
          : "bg-gradient-to-tl from-gray-100 to-gray-200"
      }`}></div>
      
      {/* Group Header */}
      <div className={`relative z-10 p-6 border-b backdrop-blur-sm transition-colors duration-300 ${
        isDarkMode 
          ? "border-gray-700 bg-gray-800/80" 
          : "border-gray-200 bg-white/80"
      }`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>{group.name}</h2>
        <p className={`text-lg font-light transition-colors duration-300 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>{group.description}</p>
        <div className={`w-12 h-1 mt-4 rounded-full transition-colors duration-300 ${
          isDarkMode ? "bg-emerald-400" : "bg-perylene-600"
        }`}></div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id || msg.tempId}
            className={`flex ${
              msg.nickname === nickname ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-end space-x-2 max-w-md">
              {/* Avatar for other users */}
              {msg.nickname !== nickname && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gradient-to-br from-gray-600 to-gray-700" 
                    : "bg-gradient-to-br from-gray-100 to-gray-200"
                }`}>
                  {getAvatarEmoji(msg.nickname)}
                </div>
              )}
              
              <div
                className={`relative px-5 py-3 rounded-2xl shadow-md border transition-all duration-200 hover:shadow-lg ${
                  msg.nickname === nickname
                    ? "bg-gradient-to-br from-emerald-400 to-cyan-500 text-white border-transparent rounded-br-md"
                    : isDarkMode
                      ? "bg-gray-800 text-gray-100 border-gray-700 rounded-bl-md"
                      : "bg-gray-50 text-gray-900 border-gray-200 rounded-bl-md"
                }`}
              >
                {/* Username for other users */}
                {msg.nickname !== nickname && (
                  <p className={`text-xs font-semibold mb-1 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {msg.nickname}
                  </p>
                )}
                
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {/* Status and Timestamp */}
                <div className="flex items-center justify-between mt-1">
                  <span
                    className={`text-xs opacity-70 transition-colors duration-300 ${
                      msg.nickname === nickname 
                        ? "text-white" 
                        : isDarkMode 
                          ? "text-gray-400" 
                          : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                  </span>
                  
                  {/* Message Status Indicator (only for own messages) */}
                  {msg.nickname === nickname && (
                    <div className="flex items-center ml-2">
                      {msg.status === 'pending' && (
                        <span className="text-xs text-white/70 italic">Sending...</span>
                      )}
                      {msg.status === 'blocked' && (
                        <div className="flex items-center space-x-1" title={msg.blockReason}>
                          <span className="text-red-400 text-sm">⚠</span>
                          <span className="text-xs text-red-300">Blocked</span>
                        </div>
                      )}
                      {msg.status === 'sent' && (
                        <span className="text-xs text-white/50">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Avatar for own messages */}
              {msg.nickname === nickname && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm mb-1 flex-shrink-0 text-white font-semibold">
                  You
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className={`relative z-10 flex items-center space-x-3 px-6 pb-4 text-sm italic transition-colors duration-300 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          <div className={`rounded-2xl px-4 py-2 shadow-md border transition-colors duration-300 ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          }`}>
            <span className="font-medium">{typingUsers.join(", ")} typing</span>
            <div className="typing-dots flex ml-2 inline-flex">
              <span className={`w-1 h-1 rounded-full animate-pulse ${
                isDarkMode ? "bg-emerald-400" : "bg-perylene-600"
              }`}></span>
              <span className={`w-1 h-1 rounded-full animate-pulse ml-1 ${
                isDarkMode ? "bg-emerald-400" : "bg-perylene-600"
              }`}></span>
              <span className={`w-1 h-1 rounded-full animate-pulse ml-1 ${
                isDarkMode ? "bg-emerald-400" : "bg-perylene-600"
              }`}></span>
            </div>
          </div>
        </div>
      )}
      
      {/* Input */}
      <div className={`relative z-10 p-6 border-t backdrop-blur-sm transition-colors duration-300 ${
        isDarkMode 
          ? "border-gray-700 bg-gray-800/80" 
          : "border-gray-200 bg-white/80"
      }`}>
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className={`absolute bottom-24 left-6 rounded-2xl shadow-2xl border p-4 max-w-sm z-50 transition-colors duration-300 ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          }`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}>Choose an emoji</h3>
              <button 
                onClick={() => setShowEmojiPicker(false)}
                className={`p-1 transition-colors duration-300 ${
                  isDarkMode 
                    ? "text-gray-400 hover:text-gray-200" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-10 gap-2 max-h-48 overflow-y-auto">
              {expressionEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addEmoji(emoji)}
                  className={`text-xl p-2 rounded-lg transition-colors duration-150 flex items-center justify-center ${
                    isDarkMode 
                      ? "hover:bg-gray-700" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Anonymous Toggle */}
        <div className="flex items-center justify-center mb-4">
          <label className={`flex items-center space-x-3 cursor-pointer transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="sr-only"
            />
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              isAnonymous 
                ? 'bg-emerald-500' 
                : isDarkMode 
                  ? 'bg-gray-600' 
                  : 'bg-gray-300'
            }`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                isAnonymous ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </div>
            <span className="text-sm font-medium">
              {isAnonymous ? '🕶️ Anonymous Mode' : '👤 Public Mode'}
            </span>
          </label>
        </div>
        
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          {/* Emoji Picker Button */}
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`p-3 rounded-full transition-all duration-200 ${
              showEmojiPicker 
                ? 'text-emerald-600 bg-emerald-50' 
                : isDarkMode
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className={`w-full border-2 rounded-3xl px-6 py-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-lg hover:shadow-xl ${
                isDarkMode 
                  ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" 
                  : "border-gray-200 bg-white text-gray-900 placeholder-gray-500"
              }`}
              value={text}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            
            {/* Attachment Button */}
            <button className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 transition-colors duration-200 ${
              isDarkMode 
                ? "text-gray-400 hover:text-gray-200" 
                : "text-gray-400 hover:text-gray-600"
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
          
          {/* Send Button */}
          <button
            className="px-6 py-4 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-semibold rounded-3xl hover:from-emerald-500 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={sendMessage}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
