// client/src/App.js
import React from "react";
import MoodCheckin from "./components/MoodCheckin";
import BreathingExercises from "./components/BreathingExercises";
import Meditation from "./components/Meditation";
import MoodGraph from "./components/MoodGraph";
import PeriodTracker from "./components/PeriodTracker";
import "./styles.css";

function App() {
  return (
    <div className="app-root">
      <div className="text-center mb-16">
        <h1 className="app-title">
          MOOD &<br />
          <span className="highlight">WELLNESS</span>
        </h1>
        <p className="app-subtitle">
          Your <span className="font-semibold text-gray-800">Mental Wellness</span> Companion
          <br />
          <span className="text-lg text-gray-500">Supporting You Through Every Challenge</span>
        </p>
      </div>

      <section className="mb-32">
        <h2 className="section-header">HOW'S YOUR MOOD?</h2>
        <div className="section-divider"></div>
        <MoodCheckin />
      </section>

      <section className="mb-32">
        <h2 className="section-header">BREATHING EXERCISES</h2>
        <div className="section-divider"></div>
        <BreathingExercises />
      </section>

      <section className="mb-32">
        <h2 className="section-header">MEDITATION</h2>
        <div className="section-divider"></div>
        <Meditation />
      </section>

      <MoodGraph />

      <section className="mb-32">
        <h2 className="section-header">PERIOD TRACKER</h2>
        <div className="section-divider"></div>
        <PeriodTracker />
      </section>
    </div>
  );
}

export default App;
