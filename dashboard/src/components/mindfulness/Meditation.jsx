import React, { useState } from "react";
import "../../styles.css";

const meditations = [
  { 
    name: "Mindfulness Meditation", 
    duration: "10 min", 
    description: "Focus on present moment awareness",
    type: "Mindfulness",
    icon: "🧘‍♀️"
  },
  { 
    name: "Body Scan", 
    duration: "15 min", 
    description: "Progressive relaxation technique",
    type: "Relaxation",
    icon: "🌊"
  },
  { 
    name: "Loving Kindness", 
    duration: "12 min", 
    description: "Cultivate compassion and self-love",
    type: "Compassion",
    icon: "💝"
  },
  { 
    name: "Breathing Space", 
    duration: "5 min", 
    description: "Quick mindful breathing break",
    type: "Quick",
    icon: "🌸"
  },
  { 
    name: "Sleep Meditation", 
    duration: "20 min", 
    description: "Guided relaxation for better sleep",
    type: "Sleep",
    icon: "🌙"
  },
  { 
    name: "Stress Relief", 
    duration: "8 min", 
    description: "Release tension and anxiety",
    type: "Stress Relief",
    icon: "🕊️"
  }
];

export default function Meditation() {
  const [activeMeditation, setActiveMeditation] = useState(null);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("preparation"); // preparation, meditation, completion

  // Start meditation timer
  const startMeditation = () => {
    setRunning(true);
    setTimer(0);
    setPhase("meditation");
    const interval = setInterval(() => {
      setTimer((t) => {
        const newTime = t + 1;
        const totalSeconds = parseInt(activeMeditation.duration) * 60;
        if (newTime >= totalSeconds) {
          setRunning(false);
          setPhase("completion");
          clearInterval(interval);
          return totalSeconds;
        }
        return newTime;
      });
    }, 1000);
    setActiveMeditation({ ...activeMeditation, interval });
  };

  const stopMeditation = () => {
    if (activeMeditation?.interval) clearInterval(activeMeditation.interval);
    setRunning(false);
    setPhase("preparation");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!activeMeditation) return 0;
    const totalSeconds = parseInt(activeMeditation.duration) * 60;
    return (timer / totalSeconds) * 100;
  };

  return (
    <div className="meditation-section">
      <div className="breathing-grid">
        {meditations.map((meditation, idx) => (
          <div
            key={idx}
            className="exercise-card meditation-card"
            onClick={() => setActiveMeditation(meditation)}
          >
            <div className="exercise-left">
              <div className="meditation-icon">{meditation.icon}</div>
              <div className="exercise-name">{meditation.name}</div>
              <div className="exercise-pattern">{meditation.type}</div>
              <div className="exercise-purpose">{meditation.description}</div>
            </div>
            <div className="exercise-right">
              <div className="exercise-time">{meditation.duration}</div>
              <div className="gear">▶️</div>
            </div>
          </div>
        ))}

        {/* Meditation Modal */}
        {activeMeditation && (
          <div className="modal-backdrop">
            <div className="modal meditation-modal">
              <div className="modal-header">
                <h3>{activeMeditation.name}</h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    stopMeditation();
                    setActiveMeditation(null);
                  }}
                >
                  ✖
                </button>
              </div>
              
              <div className="modal-body">
                <div className="meditation-info">
                  <div className="meditation-type-badge">
                    <span className="meditation-icon-large">{activeMeditation.icon}</span>
                    <div>
                      <div className="meditation-type">{activeMeditation.type}</div>
                      <div className="meditation-duration">{activeMeditation.duration}</div>
                    </div>
                  </div>
                  <p className="meditation-description">{activeMeditation.description}</p>
                </div>

                {phase === "preparation" && (
                  <div className="meditation-preparation">
                    <h4>Prepare for your meditation</h4>
                    <ul className="preparation-list">
                      <li>Find a comfortable, quiet space</li>
                      <li>Sit or lie down in a relaxed position</li>
                      <li>Close your eyes or soften your gaze</li>
                      <li>Take a few deep breaths to settle in</li>
                    </ul>
                  </div>
                )}

                {phase === "meditation" && (
                  <div className="meditation-active">
                    <div className="timer-display">
                      <div className="time-large">{formatTime(timer)}</div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`meditation-circle ${running ? "animate" : ""}`}></div>
                    <div className="meditation-guidance">
                      <p>Focus on your breath and let thoughts pass by gently...</p>
                    </div>
                  </div>
                )}

                {phase === "completion" && (
                  <div className="meditation-completion">
                    <div className="completion-icon">✨</div>
                    <h4>Meditation Complete!</h4>
                    <p>Take a moment to notice how you feel. Well done on taking time for yourself.</p>
                    <div className="completion-stats">
                      <div className="stat">
                        <span className="stat-value">{activeMeditation.duration}</span>
                        <span className="stat-label">Minutes Practiced</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                {phase === "preparation" && (
                  <button className="start-btn" onClick={startMeditation}>
                    🧘‍♀️ Begin Meditation
                  </button>
                )}
                {phase === "meditation" && (
                  <button className="stop-btn" onClick={stopMeditation}>
                    ⏹ End Session
                  </button>
                )}
                {phase === "completion" && (
                  <button
                    className="start-btn"
                    onClick={() => {
                      setPhase("preparation");
                      setTimer(0);
                    }}
                  >
                    🔄 Meditate Again
                  </button>
                )}
                <button
                  className="close-btn"
                  onClick={() => {
                    stopMeditation();
                    setActiveMeditation(null);
                    setPhase("preparation");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
