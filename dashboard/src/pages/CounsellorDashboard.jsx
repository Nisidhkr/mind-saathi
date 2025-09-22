import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ChatBox from "../components/ChatBox";
import ChatPanel from "../components/ChatPanel";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function CounsellorDashboard() {
  const [user, setUser] = useState(null);
  const [clock, setClock] = useState(0); // trigger periodic re-render for status updates
  const [inputEmail, setInputEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [counsellorName, setCounsellorName] = useState("");
  const [isCounsellor, setIsCounsellor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // slot form
  const [startISO, setStartISO] = useState("");
  const [mySlots, setMySlots] = useState([]);
  const [myBookings, setMyBookings] = useState([]); // enriched with student email

  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
    // If counsellor object was set by CounsellorLogin, use it
    const c = localStorage.getItem("counsellor");
    if (c) {
      try {
        const obj = JSON.parse(c);
        setIsCounsellor(true);
        setVerifiedEmail(obj.email || "");
        setCounsellorName(obj.name || obj.email || "Counsellor");
        setMySlots(obj.slots || []);
        // load live data from backend to ensure fresh bookings
        refreshCounsellor(obj.email || "");
      } catch (_) {}
    }
    setLoading(false);
  }, []);

  // Periodically re-render to naturally move items between Current and Previous
  useEffect(() => {
    const id = setInterval(() => setClock((c) => c + 1), 60 * 1000); // 1 min
    return () => clearInterval(id);
  }, []);

  // Helpers: slot display and status
  const formatSlotLabel = (slot) => {
    if (!slot) return "Unknown";
    if (typeof slot === "string") {
      if (slot.includes("→")) return slot;
      // Try to parse as date
      const date = new Date(slot);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
      return slot; // Return as-is if can't parse
    }
    if (slot.start && slot.end) {
      const startDate = new Date(slot.start);
      const endDate = new Date(slot.end);
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        return `${startDate.toLocaleString()} → ${endDate.toLocaleString()}`;
      }
    }
    return "Invalid Date";
  };

  const computeStatus = (slotStr) => {
    if (!slotStr || typeof slotStr !== "string") return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    if (!slotStr.includes("→")) return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    
    const { start, end } = parseSlotWindow(slotStr);
    const now = new Date();
    
    console.log("🔍 Computing counsellor status:", {
      slot: slotStr,
      parsedStart: start,
      parsedEnd: end,
      now: now,
      startValid: start && !isNaN(start.getTime()),
      endValid: end && !isNaN(end.getTime())
    });
    
    if (!start || isNaN(start.getTime())) {
      console.log("⚠️ Invalid start date for counsellor, marking as upcoming");
      return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    }
    
    if (now < start) return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    if (end && !isNaN(end.getTime()) && now >= start && now <= end) return { label: "ongoing", color: "bg-yellow-100 text-yellow-800" };
    if (end && !isNaN(end.getTime()) && now > end) return { label: "over", color: "bg-gray-200 text-gray-700" };
    
    // Default to upcoming if unsure
    return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
  };

  const parseSlotWindow = (slotStr) => {
    if (!slotStr || typeof slotStr !== "string" || !slotStr.includes("→")) {
      return { start: null, end: null };
    }
    
    const [startStr, endStr] = slotStr.split("→").map(s => s.trim());
    
    // Parse custom date format DD/MM/YYYY, HH:mm:ss am/pm
    const parseCustomDate = (dateStr) => {
      if (dateStr.includes("/") && dateStr.includes(",")) {
        const [datePart, timePart] = dateStr.split(", ");
        const [day, month, year] = datePart.split("/");
        const isoFormat = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart}`;
        return new Date(isoFormat);
      }
      return new Date(dateStr);
    };
    
    return { 
      start: parseCustomDate(startStr), 
      end: parseCustomDate(endStr) 
    };
  };

  // Fetch appointments for this counsellor
  const fetchCounsellorAppointments = async (counsellorId) => {
    try {
      console.log("🔄 Fetching appointments for counsellor:", counsellorId);
      const response = await fetch(`${API_BASE}/api/appointments/counsellor/${encodeURIComponent(counsellorId)}`);
      
      if (response.ok) {
        const appointments = await response.json();
        console.log("✅ Counsellor appointments:", appointments);
        setMyBookings(appointments || []);
      } else {
        console.error("❌ Failed to fetch counsellor appointments:", response.status);
        setMyBookings([]);
      }
    } catch (error) {
      console.error("❌ Error fetching counsellor appointments:", error);
      setMyBookings([]);
    }
  };

  // Cancel appointment function for counsellors
  const handleCancelAppointment = async (appointment) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/appointments/${appointment._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert("✅ Appointment cancelled successfully");
        // Refresh appointments
        const counsellor = JSON.parse(localStorage.getItem("counsellor") || "{}");
        if (counsellor._id || counsellor.email) {
          await fetchCounsellorAppointments(counsellor._id || counsellor.email);
        }
      } else {
        alert("❌ Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("❌ Network error. Please try again.");
    }
  };

  // Refresh counsellor data from backend
  const refreshCounsellor = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/counsellors`);
      const list = await res.json();
      const found = Array.isArray(list) && list.find((c) => (c.email || "").toLowerCase() === email.toLowerCase());
      if (found) {
        setMySlots(found.slots || []);
        // Fetch appointments separately using the counsellor ID
        await fetchCounsellorAppointments(found._id || found.email);
        localStorage.setItem("counsellor", JSON.stringify(found));
      }
    } catch (e) {
      console.error("Failed to refresh counsellor data:", e);
    }
  };

  // Add new slot
  const handleAddSlot = async () => {
    if (!startISO) {
      alert("Please select a start time");
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/counsellors/slots`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verifiedEmail,
          start: startISO,
        }),
      });

      if (res.ok) {
        alert("✅ Slot added successfully!");
        setStartISO("");
        await refreshCounsellor(verifiedEmail);
      } else {
        const error = await res.text();
        alert(`❌ Failed to add slot: ${error}`);
      }
    } catch (e) {
      console.error("Add slot error:", e);
      alert("❌ Network error. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("counsellor");
      navigate("/");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isCounsellor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You are not authorized to access this page.</p>
          <button 
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Counsellor Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Counsellor Dashboard</h1>
              <p className="text-sm text-gray-600">{counsellorName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {/* Add Slot Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Slot</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={startISO}
                onChange={(e) => setStartISO(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleAddSlot}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Slot
            </button>
          </div>
        </div>

        {/* My Slots */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Available Slots</h2>
          {mySlots.length === 0 ? (
            <p className="text-gray-600">No slots available. Add some slots above.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {mySlots.map((slot, idx) => (
                <div key={idx} className="p-3 border rounded-lg bg-green-50">
                  <div className="text-sm font-medium text-gray-800">
                    {formatSlotLabel(slot)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Bookings */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Bookings</h2>
          {myBookings.length === 0 ? (
            <p className="text-gray-600">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {myBookings
                .map((booking) => ({
                  ...booking,
                  status: computeStatus(booking.slot),
                  slotWindow: parseSlotWindow(booking.slot)
                }))
                .filter((booking) => {
                  console.log("🔍 Counsellor booking status:", booking.status.label, "for slot:", booking.slot);
                  return booking.status.label !== "over";
                })
                .sort((a, b) => {
                  const order = { upcoming: 0, ongoing: 1 };
                  const aOrder = order[a.status.label] ?? 2;
                  const bOrder = order[b.status.label] ?? 2;
                  if (aOrder !== bOrder) return aOrder - bOrder;
                  
                  if (a.slotWindow.start && b.slotWindow.start) {
                    return a.slotWindow.start.getTime() - b.slotWindow.start.getTime();
                  }
                  return 0;
                })
                .map((booking, idx) => (
                  <div key={`${booking._id || booking.studentId || booking.studentEmail || 'booking'}-${idx}`} className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {booking.studentName || "Student"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.studentEmail || "No email"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatSlotLabel(booking.slot)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status.color}`}>
                          {booking.status.label}
                        </span>
                        {booking.status.label === "upcoming" && (
                          <button
                            onClick={() => handleCancelAppointment(booking)}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat with Students</h2>
          <ChatPanel
            role="counsellor"
            currentUser={user}
            myIdOverride=""
            partnerCandidates={myBookings.map(b => ({
              id: b.studentId || b.studentEmail || b.studentName,
              label: b.studentName || b.studentEmail || "Student"
            })).filter(x => x.id)}
          />
        </div>
      </main>
    </div>
  );
}
