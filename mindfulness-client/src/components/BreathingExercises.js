import React, { useState } from "react";
import "../styles.css";

const exercises = [
  { name: "Box Breathing", pattern: "4-4-4-4", purpose: "Relaxation", time: "5 min" },
  { name: "4-7-8 Breathing", pattern: "4-7-8", purpose: "Reduce stress", time: "3 min" },
  { name: "Alternate Nostril", pattern: "Inhale/Exhale alternate", purpose: "Balance energy", time: "6 min" },
];

export default function BreathingExercises() {
  const [activeExercise, setActiveExercise] = useState(null);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  // start timer
  const startTimer = () => {
    setRunning(true);
    setTimer(0);
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    setActiveExercise({ ...activeExercise, interval });
  };

  const stopTimer = () => {
    if (activeExercise?.interval) clearInterval(activeExercise.interval);
    setRunning(false);
  };

  return (
    <div className="breathing-grid">
      {exercises.map((ex, idx) => (
        <div
          key={idx}
          className="exercise-card"
          onClick={() => setActiveExercise(ex)}
        >
          <div className="exercise-left">
            <div className="exercise-name">{ex.name}</div>
            <div className="exercise-pattern">{ex.pattern}</div>
            <div className="exercise-purpose">{ex.purpose}</div>
          </div>
          <div className="exercise-right">
            <div className="exercise-time">{ex.time}</div>
            <div className="gear">⚙️</div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {activeExercise && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>{activeExercise.name}</h3>
              <button
                className="modal-close"
                onClick={() => {
                  stopTimer();
                  setActiveExercise(null);
                }}
              >
                ✖
              </button>
            </div>
            <div className="modal-body">
              <p><b>Pattern:</b> {activeExercise.pattern}</p>
              <p><b>Purpose:</b> {activeExercise.purpose}</p>
              <div className="timer-display">
                <div className="time-large">{timer}s</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(timer % 10) * 10}%` }}
                  ></div>
                </div>
              </div>

              {/* Breathing Circle Animation */}
              <div className={`breathing-circle ${running ? "animate" : ""}`}></div>
            </div>

            <div className="modal-footer">
              {!running ? (
                <button className="start-btn" onClick={startTimer}>
                  ▶ Start
                </button>
              ) : (
                <button className="stop-btn" onClick={stopTimer}>
                  ⏹ Stop
                </button>
              )}
              <button
                className="close-btn"
                onClick={() => {
                  stopTimer();
                  setActiveExercise(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
