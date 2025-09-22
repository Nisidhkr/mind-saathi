import React, { useState, useEffect } from "react";
import api from "../services/api";
import socket from "../services/socket";

export default function ChatBox({ currentUser, role = "student", studentId: propStudentId, counsellorId: propCounsellorId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [clientId, setClientId] = useState("srv");
  const [mySentIds] = useState(() => new Set());
  const [consent, setConsent] = useState(() => {
    // Only relevant for student role; per-session preference
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem("chatConsent");
      if (raw === null) return null; // not decided yet this session
      return raw === "true"; // true/false
    } catch (_) {
      return null;
    }
  });
  const [sentOnce, setSentOnce] = useState(() => {
    if (typeof window === "undefined") return false;
    try { return sessionStorage.getItem("chatSentOnce") === "true"; } catch (_) { return false; }
  });

  useEffect(() => {
    socket.on("chat message", (msg) => {
      // If conversation is scoped, only append messages that match this pair
      if (propStudentId && propCounsellorId && typeof msg === 'object') {
        if ((msg.studentId === String(propStudentId)) && (msg.counsellorId === String(propCounsellorId))) {
          setMessages((prev) => [...prev, msg]);
        }
      } else {
        // General chat or unscoped
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("chat message");
  }, [propStudentId, propCounsellorId]);

  useEffect(() => {
    const onConnect = () => {
      if (socket.id) setClientId(socket.id);
    };
    
    if (socket.id) setClientId(socket.id);
    socket.on("connect", onConnect);
    
    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  // Room handling: join a dedicated room for this student–counsellor pair
  // If student opted to stay anonymous, route to special shared bucket 'ANON'
  const effectiveConsentMemo = (role === "student" && consent === null)
    ? (typeof window !== 'undefined' && sessionStorage.getItem("chatConsent") === "true")
    : consent;
  const computedStudentId = (role === "student" && effectiveConsentMemo === false)
    ? "ANON"
    : (propStudentId ? String(propStudentId) : "");

  const roomId = (computedStudentId && propCounsellorId)
    ? `${String(computedStudentId)}__${String(propCounsellorId)}`
    : "";

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
      return () => socket.emit("leaveRoom", roomId);
    }
  }, [roomId]);

  // Load history when both ids provided (separate hook)
  useEffect(() => {
    const loadHistory = async () => {
      try {
        if (!propStudentId || !propCounsellorId) return;
        const { data } = await api.get('/dashboard/chat/messages', {
          params: {
            studentId: String(propStudentId),
            counsellorId: String(propCounsellorId),
            limit: 100,
          }
        });
        if (Array.isArray(data)) setMessages(data);
      } catch (e) {
        // ignore
      }
    };
    loadHistory();
  }, [propStudentId, propCounsellorId]);

  // Normalize a string to a human-friendly name (if email, use part before @)
  const normalizeName = (s) => {
    if (!s || typeof s !== "string") return "User";
    let base = s.trim();
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(base)) {
      base = base.split("@")[0];
    }
    base = base.replace(/[._-]+/g, " ").trim();
    // Title-case words
    base = base
      .split(/\s+/)
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
      .join(" ");
    return base || "User";
  };

  const currentDisplayName = normalizeName(
    (currentUser && (currentUser.name || currentUser.displayName)) || currentUser?.email || "User"
  );

  const sendMessage = async () => {
    if (!message.trim()) return;
    // Student: if no choice made yet and user sends, default to Anonymous for this and future messages
    if (role === "student" && consent === null) {
      try { sessionStorage.setItem("chatConsent", "false"); } catch (_) {}
      setConsent(false);
    }

    const effectiveConsent = (role === "student" && consent === null)
      ? (sessionStorage.getItem("chatConsent") === "true")
      : consent;

    const displayNameToSend = role === "student"
      ? (effectiveConsent === false ? "Anonymous" : currentDisplayName)
      : currentDisplayName;
    const messageId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const payload = {
      user: displayNameToSend,
      message,
      clientId,
      messageId,
      role,
      studentId: computedStudentId,
      counsellorId: propCounsellorId ? String(propCounsellorId) : "",
      roomId,
    };
    socket.emit("chat message", payload);
    try { mySentIds.add(messageId); } catch (_) {}
    setMessage("");
    if (!sentOnce) {
      try { sessionStorage.setItem("chatSentOnce", "true"); } catch (_) {}
      setSentOnce(true);
    }
    // Persist via REST as well (best-effort)
    try { await api.post('/dashboard/chat', payload); } catch (_) {}
    // Note: We don't add the message locally here because it will come back via socket
    // This prevents duplicate messages
  };

  const renderBubble = (m, i) => {
    const sender = typeof m === "string" ? "User" : (m.user || "User");
    const text = typeof m === "string" ? m : m.message;
    // Detect self robustly: prefer clientId and local messageId tracking
    let isSelf = false;
    if (typeof m === "object") {
      if (m.clientId && m.clientId === clientId) isSelf = true;
      else if (m.messageId && mySentIds.has(m.messageId)) isSelf = true;
    }
    const alignRight = isSelf; // requirement: self on RIGHT, other on LEFT
    const label = isSelf ? "You" : (sender === "Anonymous" ? "Anonymous" : normalizeName(sender));

    return (
      <div key={i} className={`flex ${alignRight ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`max-w-[75%] rounded-lg px-3 py-2 text-sm shadow ${
            alignRight ? "bg-blue-600 text-white" : "bg-green-100 text-gray-900"
          }`}
        >
          <div className={`font-medium mb-0.5 ${alignRight ? "text-white/90" : "text-green-900"}`}>
            {label}
          </div>
          <div>{text}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Chat Box</h2>
      {role === "student" && (
        <div className="text-sm bg-gray-50 border border-gray-200 text-gray-800 rounded p-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">Privacy:</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${consent === false ? "bg-gray-200 text-gray-800" : consent === true ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
              {consent === false ? "Anonymous" : consent === true ? "Sharing name" : "Not chosen"}
            </span>
          </div>
          {!sentOnce && (
            <div className="flex gap-2">
              <button
                onClick={() => { setConsent(true); try { sessionStorage.setItem("chatConsent", "true"); } catch(_){} }}
                className={`px-2 py-1 rounded text-white ${consent === true ? "bg-green-700" : "bg-green-600 hover:bg-green-700"}`}
                title="Send messages with your name"
              >
                Share my name
              </button>
              <button
                onClick={() => { setConsent(false); try { sessionStorage.setItem("chatConsent", "false"); } catch(_){} }}
                className={`px-2 py-1 rounded text-white ${consent === false ? "bg-gray-800" : "bg-gray-700 hover:bg-gray-800"}`}
                title="Send messages as Anonymous"
              >
                Stay Anonymous
              </button>
            </div>
          )}
        </div>
      )}
      <div className="border rounded p-3 h-64 overflow-y-auto bg-white">
        {messages.map(renderBubble)}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message"
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
