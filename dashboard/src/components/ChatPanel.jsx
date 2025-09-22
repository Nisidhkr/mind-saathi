import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ChatBox from "./ChatBox";

export default function ChatPanel({ role = "student", currentUser, initialPartnerId = "", myIdOverride = "", partnerCandidates = [] }) {
  const [conversations, setConversations] = useState([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameMap, setNameMap] = useState(new Map());
  const [fetchedCandidates, setFetchedCandidates] = useState([]);
  const [resolvedOverride, setResolvedOverride] = useState("");

  const myId = useMemo(() => {
    if (!currentUser) return "";
    const base = currentUser.id || currentUser._id || currentUser.uid || currentUser.email || "";
    return String(resolvedOverride || myIdOverride || base);
  }, [currentUser, myIdOverride, resolvedOverride]);

  // If counsellor, try to resolve my auth _id by email so ids match what students send
  useEffect(() => {
    const resolveSelf = async () => {
      try {
        if (role !== "counsellor") return;
        const email = currentUser?.email;
        if (!email) return;
        const { data } = await api.get("/dashboard/counsellors");
        const me = (Array.isArray(data) ? data : []).find(c => (c?.email || "").toLowerCase() === String(email).toLowerCase());
        if (me && me._id) setResolvedOverride(String(me._id));
      } catch (_) {}
    };
    resolveSelf();
  }, [role, currentUser]);

  // fetch conversations for me
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!myId) return;
        setLoading(true);
        const { data } = await api.get("/dashboard/chat/conversations", {
          params: { role, userId: String(myId) },
        });
        let list = Array.isArray(data) ? data : [];
        // Merge partner candidates (e.g., bookings or all users) so user can start chats by clicking
        const cand = [
          ...(Array.isArray(partnerCandidates) ? partnerCandidates : []),
          ...(Array.isArray(fetchedCandidates) ? fetchedCandidates : []),
        ];
        const seen = new Set(list.map((x) => String(x.partnerId)));
        const merged = [
          ...list,
          ...cand
            .filter((c) => c && c.id && !seen.has(String(c.id)))
            .map((c) => ({ partnerId: String(c.id), lastMessage: "", lastUser: "", lastAt: null })),
        ];
        setConversations(merged);
        if (!selectedPartnerId) {
          if (initialPartnerId) setSelectedPartnerId(String(initialPartnerId));
          else if (list.length > 0) setSelectedPartnerId(String(list[0].partnerId));
        }
      } catch (_) {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [role, myId, partnerCandidates, fetchedCandidates]);

  // If parent changes initialPartnerId (e.g., user clicked a counsellor elsewhere), honor it
  useEffect(() => {
    if (initialPartnerId) setSelectedPartnerId(String(initialPartnerId));
  }, [initialPartnerId]);

  // Resolve partner names for the list (like WhatsApp)
  useEffect(() => {
    const normalizeName = (s) => {
      if (!s || typeof s !== "string") return "User";
      let base = s.trim();
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(base)) base = base.split("@")[0];
      base = base.replace(/[._-]+/g, " ").trim();
      return base.split(/\s+/).map(w => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w).join(" ") || "User";
    };

    const loadNames = async () => {
      try {
        if (role === "student") {
          // Map counsellorId -> counsellor name
          const { data } = await api.get("/dashboard/counsellors");
          const m = new Map();
          (Array.isArray(data) ? data : []).forEach((c) => {
            if (c && c._id) m.set(String(c._id), c.name || normalizeName(c.email || "Counsellor"));
          });
          setNameMap(m);
          // Also ensure partnerCandidates labels are set if provided
          (Array.isArray(partnerCandidates) ? partnerCandidates : []).forEach((c) => {
            if (c && c.id && c.label) m.set(String(c.id), c.label);
          });
        } else {
          // counsellor role: partner is student; fetch users
          const { data } = await api.get("/dashboard/chat/users");
          const m = new Map();
          (Array.isArray(data) ? data : []).forEach((u) => {
            const id1 = u?.id || u?._id || u?.uid || u?.email;
            if (id1) m.set(String(id1), u.name || normalizeName(u.email || "Student"));
          });
          // Provide all users as candidates so the counsellor can start any chat
          const candidates = (Array.isArray(data) ? data : [])
            .map((u) => ({ id: u?.id || u?._id || u?.uid || u?.email, label: u?.name || normalizeName(u?.email || 'Student') }))
            .filter((x) => x.id);
          // Include a shared Anonymous bucket explicitly
          candidates.push({ id: 'ANON', label: 'Anonymous' });
          setFetchedCandidates(candidates);
          // Merge any explicit partnerCandidates labels
          (Array.isArray(partnerCandidates) ? partnerCandidates : []).forEach((c) => {
            if (c && c.id && c.label) m.set(String(c.id), c.label);
          });
          // Ensure ANON has a label
          m.set('ANON', 'Anonymous');
          setNameMap(m);
        }
      } catch (_) {
        const base = new Map();
        // Seed provided candidate labels
        (Array.isArray(partnerCandidates) ? partnerCandidates : []).forEach((c) => {
          if (c && c.id) base.set(String(c.id), c.label || String(c.id));
        });
        if (role === 'counsellor') {
          base.set('ANON', 'Anonymous');
          setFetchedCandidates([{ id: 'ANON', label: 'Anonymous' }]);
        }
        setNameMap(base);
      }
    };
    loadNames();
  }, [role, partnerCandidates]);

  const isStudent = role === "student";
  const studentId = isStudent ? myId : selectedPartnerId;
  const counsellorId = isStudent ? selectedPartnerId : myId;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border rounded-lg p-3 bg-white md:col-span-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{isStudent ? "Counsellors" : "Students"}</h3>
          {loading && <span className="text-xs text-gray-500">Loading…</span>}
        </div>
        {conversations.length === 0 ? (
          <div className="text-sm text-gray-600">No conversations yet</div>
        ) : (
          <ul className="space-y-1 max-h-72 overflow-y-auto">
            {conversations.map((c) => (
              <li key={c.partnerId}>
                <button
                  onClick={() => setSelectedPartnerId(String(c.partnerId))}
                  className={`w-full text-left px-3 py-2 rounded border hover:bg-gray-50 ${
                    selectedPartnerId === String(c.partnerId) ? "bg-green-50 border-green-300" : ""
                  }`}
                >
                  <div className="text-sm font-medium">{nameMap.get(String(c.partnerId)) || c.partnerId}</div>
                  <div className="text-xs text-gray-600 truncate">{c.lastUser}: {c.lastMessage}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="md:col-span-2">
        {selectedPartnerId && (
          <div className="text-sm text-gray-600 mb-2">Chat with <span className="font-medium">{nameMap.get(String(selectedPartnerId)) || selectedPartnerId}</span></div>
        )}
        <ChatBox
          role={role}
          currentUser={currentUser}
          studentId={studentId}
          counsellorId={counsellorId}
        />
      </div>
    </div>
  );
}
