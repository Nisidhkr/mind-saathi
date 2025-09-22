import React, { useState, useEffect } from "react";
import { saveMood } from "../../services/api";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../../styles.css";

const moods = [
  { emoji: "😊", name: "Happy" },
  { emoji: "😌", name: "Calm" },
  { emoji: "😴", name: "Tired" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😡", name: "Angry" },
];

const emotions = [
  "Joyful", "Hopeful", "Amazed", "Relieved", "Confident",
  "Content", "Satisfied", "Happy", "Passionate", "Enthusiastic",
  "Excited", "Brave", "Proud", "Calm", "Curious",
  "Grateful", "Peaceful"
];

const reasons = [
  "Work", "Home", "School", "Outdoors", "Travel", "Weather",
  "Identity", "Partner", "Friends", "Pet", "Family", "Colleagues",
  "Dating", "Health", "Sleep", "Exercise", "Food", "Hobby", "Money"
];

export default function MoodCheckin() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);

  const [mood, setMood] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [note, setNote] = useState("");

  // Get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const resetCheckin = () => {
    setStep(1);
    setMood(null);
    setSelectedEmotions([]);
    setSelectedReasons([]);
    setNote("");
    setOpen(false); // modal close
  };

  const toggleSelect = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSave = async () => {
    try {
      if (!user) {
        alert("❌ Please login to save your mood");
        return;
      }

      const moodData = {
        mood,
        emotions: selectedEmotions,
        reasons: selectedReasons,
        note,
        email: user.email,
        userId: user.uid,
        userName: user.displayName || user.email
      };

      await saveMood(moodData);

      // Trigger graph refresh with user data
      window.dispatchEvent(new CustomEvent("moodSaved", { 
        detail: { userEmail: user.email, userId: user.uid } 
      }));

      resetCheckin(); // close after save
      alert("✅ Mood saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save mood");
    }
  };

  return (
    <div className="mood-checkin">
      {!open ? (
        <div className="mood-main-card" onClick={() => setOpen(true)}>
          <span className="mood-title">How's your mood?</span>
          <span className="mood-toggle">➕</span>
        </div>
      ) : (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Mood Check-in</h3>
              <button className="modal-close" onClick={resetCheckin}>✖</button>
            </div>

            {/* Step 1: Mood */}
            {step === 1 && (
              <>
                <h4>Select your mood</h4>
                <div className="mood-grid-vertical">
                  {moods.map((m, idx) => (
                    <div
                      key={idx}
                      className={`mood-card ${mood === m.name ? "active" : ""}`}
                      onClick={() => { setMood(m.name); setStep(2); }}
                    >
                      <span className="mood-emoji">{m.emoji}</span>
                      <span>{m.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Emotions */}
            {step === 2 && (
              <>
                <h4>Which emotions describe how you feel?</h4>
                <div className="tag-grid">
                  {emotions.map((e, idx) => (
                    <button
                      key={idx}
                      className={`tag ${selectedEmotions.includes(e) ? "active" : ""}`}
                      onClick={() => toggleSelect(e, selectedEmotions, setSelectedEmotions)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <div className="modal-footer">
                  <button className="start-btn" onClick={() => setStep(3)}>Next ➡️</button>
                </div>
              </>
            )}

            {/* Step 3: Reasons + Note */}
            {step === 3 && (
              <>
                <h4>What’s making you feel this way?</h4>
                <div className="tag-grid">
                  {reasons.map((r, idx) => (
                    <button
                      key={idx}
                      className={`tag ${selectedReasons.includes(r) ? "active" : ""}`}
                      onClick={() => toggleSelect(r, selectedReasons, setSelectedReasons)}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <textarea
                  className="note-box"
                  placeholder="Anything else to add?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <div className="modal-footer">
                  <button className="start-btn" onClick={handleSave}>Save ✅</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
