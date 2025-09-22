import { useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ChatPanel from "../components/ChatPanel";

export default function BookingPage() {
  const [counsellors, setCounsellors] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [user, setUser] = useState(null);
  const [clock, setClock] = useState(0); // trigger periodic re-render for status updates

  const API_BASE = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    []
  );

  // ✅ Fetch counsellors from backend
  const fetchCounsellors = () => {
    fetch(`${API_BASE}/api/counsellors`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Counsellors:", data);
        setCounsellors(data);
      })
      .catch((err) => console.error("Error fetching counsellors:", err));
  };

  // ---- Anonymous booking helpers (stored per-browser) ----
  const ANON_KEY = "anonAppointments";
  const getAnonAppointmentsFromLocal = () => {
    try {
      const raw = localStorage.getItem(ANON_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  };
  const saveAnonAppointmentsToLocal = (arr) => {
    try {
      localStorage.setItem(ANON_KEY, JSON.stringify(arr || []));
    } catch (_) {}
  };

  // Helper functions for appointment display
  const getSlotDisplay = (session) => {
    if (!session || !session.slot) return "Unknown time";
    if (typeof session.slot === "string") {
      return session.slot;
    }
    if (session.slot.start && session.slot.end) {
      return `${new Date(session.slot.start).toLocaleString()} → ${new Date(session.slot.end).toLocaleString()}`;
    }
    return "Unknown time";
  };

  const getStudentDisplayName = (session) => {
    if (session.anonymous) return "Anonymous";
    return session.studentName || session.studentEmail || "Student";
  };

  const parseSlotWindow = (session) => {
    if (!session || !session.slot) return { start: null, end: null };
    
    if (typeof session.slot === "string" && session.slot.includes("→")) {
      const [startStr, endStr] = session.slot.split("→").map(s => s.trim());
      
      // Try to parse the date string - handle DD/MM/YYYY format
      const parseCustomDate = (dateStr) => {
        // Handle format like "22/9/2025, 1:28:00 am"
        if (dateStr.includes("/") && dateStr.includes(",")) {
          // Convert DD/MM/YYYY, HH:mm:ss am/pm to a format Date can understand
          const [datePart, timePart] = dateStr.split(", ");
          const [day, month, year] = datePart.split("/");
          // Create ISO format: YYYY-MM-DD HH:mm:ss
          const isoFormat = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart}`;
          return new Date(isoFormat);
        }
        return new Date(dateStr);
      };
      
      const start = parseCustomDate(startStr);
      const end = parseCustomDate(endStr);
      
      console.log("🔍 Parsing slot:", {
        original: session.slot,
        startStr,
        endStr,
        parsedStart: start,
        parsedEnd: end,
        startValid: !isNaN(start.getTime()),
        endValid: !isNaN(end.getTime())
      });
      
      return { start, end };
    }
    
    if (session.slot.start && session.slot.end) {
      return {
        start: new Date(session.slot.start),
        end: new Date(session.slot.end)
      };
    }
    
    // Fallback - assume it's a date
    const date = new Date(session.date || session.createdAt || Date.now());
    return {
      start: date,
      end: new Date(date.getTime() + 60 * 60 * 1000) // Add 1 hour
    };
  };

  // Compute status of an appointment relative to now
  const computeStatus = (appt) => {
    const { start, end } = parseSlotWindow(appt);
    const now = new Date();
    
    console.log("🔍 Computing status for appointment:", {
      slot: appt.slot,
      parsedStart: start,
      parsedEnd: end,
      now: now,
      startValid: start && !isNaN(start.getTime()),
      endValid: end && !isNaN(end.getTime())
    });
    
    if (!start || isNaN(start.getTime())) {
      // If we can't parse the date, assume it's upcoming for now
      console.log("⚠️ Invalid start date, marking as upcoming");
      return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    }
    
    if (now < start) {
      return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    }
    
    if (end && !isNaN(end.getTime()) && now >= start && now <= end) {
      return { label: "ongoing", color: "bg-yellow-100 text-yellow-800" };
    }
    
    // Only mark as over if we're sure the appointment has passed
    if (end && !isNaN(end.getTime()) && now > end) {
      return { label: "over", color: "bg-gray-200 text-gray-700" };
    }
    
    // Default to upcoming if unsure
    return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
  };

  // Legacy computeStatus function for backward compatibility
  const computeStatusLegacy = (appt) => {
    let start = null;
    let end = null;
    const raw = appt?.slot;
    // if string label: "start → end"
    if (typeof raw === "string" && raw.includes("→")) {
      const [s, e] = raw.split("→");
      if (s) start = new Date(s.trim());
      if (e) end = new Date(e.trim());
    } else if (raw && typeof raw === "object" && raw.start && raw.end) {
      start = new Date(raw.start);
      end = new Date(raw.end);
    } else {
      // fallback 1 hour window from created date
      const created = appt?.date || appt?.createdAt || appt?.updatedAt;
      if (created) {
        start = new Date(created);
        end = new Date(start.getTime() + 60 * 60 * 1000);
      }
    }

    const now = new Date();
    if (!start || !end || isNaN(start) || isNaN(end)) return { label: "over", color: "bg-gray-200 text-gray-700" };
    if (now < start) return { label: "upcoming", color: "bg-blue-100 text-blue-700" };
    if (now >= start && now <= end) return { label: "ongoing", color: "bg-yellow-100 text-yellow-800" };
    return { label: "over", color: "bg-gray-200 text-gray-700" };
  };

  // Duplicate parseSlotWindow function removed - using the one defined above

  // ✅ Fetch only MY booked sessions (upcoming) from backend
  const fetchAppointments = async () => {
    try {
      const uid = user?.uid;
      console.log("🔄 Fetching appointments for user:", uid);
      
      let serverAppts = [];
      if (uid) {
        try {
          const response = await fetch(`${API_BASE}/api/appointments/my-upcoming/${encodeURIComponent(uid)}`);
          console.log("📡 Appointment API response status:", response.status);
          
          if (response.ok) {
            serverAppts = await response.json();
            console.log("✅ Server appointments:", serverAppts);
          } else {
            console.error("❌ Failed to fetch appointments:", response.status, response.statusText);
          }
        } catch (fetchError) {
          console.error("❌ Network error fetching appointments:", fetchError);
        }
      }

      const anonAppts = getAnonAppointmentsFromLocal();
      console.log("📱 Anonymous appointments from local:", anonAppts);
      
      // Merge arrays; no strict duplicate removal since anon won't appear from server
      const combined = [...(Array.isArray(serverAppts) ? serverAppts : []), ...anonAppts];
      console.log("🔗 Combined Appointments (server + anon):", combined);
      setBookedSessions(combined);
    } catch (e) {
      console.error("❌ Error in fetchAppointments:", e);
      // fallback to just local anonymous
      const fallbackAppts = getAnonAppointmentsFromLocal();
      console.log("🔄 Fallback to anonymous appointments:", fallbackAppts);
      setBookedSessions(fallbackAppts);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    fetchCounsellors();
    return () => unsubscribe();
  }, []);

  // Periodically re-render to update status (ongoing → over) without manual refresh
  useEffect(() => {
    const id = setInterval(() => setClock((c) => c + 1), 60 * 1000); // 1 min
    return () => clearInterval(id);
  }, []);

  // Refetch appointments whenever user changes
  useEffect(() => {
    fetchAppointments();
    
    // Also test the debug endpoint to see total appointments
    if (user?.uid) {
      fetch(`${API_BASE}/api/appointments/debug/count`)
        .then(res => res.json())
        .then(data => console.log("🔍 Debug info:", data))
        .catch(err => console.error("❌ Debug fetch failed:", err));
    }
  }, [user]);

  // ✅ Slot book karne ka handler
  const handleBookSlot = async (counsellorId, slot) => {
    try {
      // Ask user whether to share info with counsellor
      const share = window.confirm("Do you want to share your info with the counsellor?\nOK = Yes, Cancel = No");

      // Build payload depending on share choice
      const anon = !share;
      const studentId = anon ? null : (user?.uid || "");
      const studentName = anon ? "Anonymous" : (user?.displayName || user?.email || "User");

      const res = await fetch(`${API_BASE}/api/bookings/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          counsellorId,
          slot,
          studentId,
          studentName,
          studentEmail: anon ? null : user?.email,
        }),
      });

      if (res.ok) {
        const booking = await res.json();
        alert("✅ Slot booked successfully!");
        
        // If anonymous, save to local storage
        if (anon) {
          const existing = getAnonAppointmentsFromLocal();
          existing.push({
            counsellorId,
            slot,
            studentName: "Anonymous",
            date: new Date().toISOString(),
          });
          saveAnonAppointmentsToLocal(existing);
        }
        
        fetchAppointments(); // refresh
        fetchCounsellors(); // refresh counsellor slots
      } else {
        const error = await res.text();
        alert(`❌ Booking failed: ${error}`);
      }
    } catch (e) {
      console.error("Booking error:", e);
      alert("❌ Network error. Please try again.");
    }
  };

  // Cancel appointment function
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
        fetchAppointments();
      } else {
        alert("❌ Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("❌ Network error. Please try again.");
    }
  };

  const counsellorNameById = useMemo(() => {
    const map = new Map();
    (Array.isArray(counsellors) ? counsellors : []).forEach((c) => {
      if (c && c._id) map.set(c._id, c.name || c.email || "Counsellor");
    });
    return map;
  }, [counsellors]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Counselling Session</h1>
          <p className="text-gray-600">Connect with professional counsellors for mental wellness support</p>
        </div>

        {/* Counsellors List */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Counsellors</h2>
          {counsellors.length === 0 ? (
            <p className="text-gray-600">Loading counsellors...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {counsellors.map((counsellor) => (
                <div key={counsellor._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800">{counsellor.name || counsellor.email}</h3>
                  <p className="text-gray-600 text-sm mb-3">{counsellor.specialization || "General Counselling"}</p>
                  
                  {/* Available Slots */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Available Slots:</h4>
                    {(!counsellor.slots || counsellor.slots.length === 0) ? (
                      <p className="text-gray-500 text-sm">No slots available</p>
                    ) : (
                      <div className="space-y-1">
                        {counsellor.slots.map((slot, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">
                              {typeof slot === "string" ? slot : `${slot.start} → ${slot.end}`}
                            </span>
                            <button
                              onClick={() => handleBookSlot(counsellor._id, slot)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                            >
                              Book
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedCounsellor(counsellor)}
                    className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Chat with {counsellor.name || "Counsellor"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          {console.log("📋 Rendering appointments:", bookedSessions)}
          {(!Array.isArray(bookedSessions) || bookedSessions.length === 0) ? (
            <p className="text-gray-600">No upcoming sessions</p>
          ) : (
            <ul className="space-y-2">
              {bookedSessions
                .map((b) => {
                  const status = computeStatus(b);
                  return { ...b, __status: status };
                })
                .filter((b) => {
                  console.log("🔍 Appointment status:", b.__status.label, "for slot:", b.slot);
                  return b.__status.label !== "over";
                })
                .sort((a, b) => {
                  const { start: aStart } = parseSlotWindow(a);
                  const { start: bStart } = parseSlotWindow(b);
                  if (!aStart || !bStart) return 0;
                  return aStart.getTime() - bStart.getTime();
                })
                .map((session, idx) => (
                  <li key={`${session._id || session.studentId || 'session'}-${idx}`} className="p-3 border rounded-lg bg-blue-50 text-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium">{getStudentDisplayName(session)}</div>
                        <div className="text-sm text-gray-600">
                          with {counsellorNameById.get(session.counsellorId) || "Counsellor"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getSlotDisplay(session)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${session.__status.color}`}>
                          {session.__status.label}
                        </span>
                        {session.__status.label === "upcoming" && (
                          <button
                            onClick={() => handleCancelAppointment(session)}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Chat Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Chat with Counsellors</h2>
          <ChatPanel
            role="student"
            currentUser={user ? {
              id: user.uid,
              email: user.email,
              name: user.displayName || user.email
            } : null}
            initialPartnerId={selectedCounsellor?._id || ""}
            partnerCandidates={(Array.isArray(counsellors) ? counsellors : []).map(c => ({ 
              id: c?._id, 
              label: c?.name || c?.email || 'Counsellor' 
            })).filter(x => x.id)}
          />
        </div>
      </main>
    </div>
  );
}
