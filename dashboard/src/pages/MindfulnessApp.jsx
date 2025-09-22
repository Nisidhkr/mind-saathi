// Integrated Mindfulness App - Original GUI Preserved
import React from "react";
import MoodCheckin from "../components/mindfulness/MoodCheckin.jsx";
import BreathingExercises from "../components/mindfulness/BreathingExercises.jsx";
import Meditation from "../components/mindfulness/Meditation.jsx";
import PeriodTracker from "../components/mindfulness/PeriodTracker.jsx";
import Footer from "../components/Footer";

export default function MindfulnessApp() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="app-root flex-grow">
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


      <section className="mb-32">
        <h2 className="section-header">PERIOD TRACKER</h2>
        <div className="section-divider"></div>
        <PeriodTracker />
      </section>
      </div>
      <Footer />
    </div>
  );
}

// Removed duplicate export
