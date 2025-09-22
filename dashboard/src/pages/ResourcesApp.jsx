// Integrated Resources App
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import ResourceHub from "../components/resources/ResourceHub.jsx";
import StressRelief from "../components/resources/StressRelief.jsx";
import MoodLifter from "../components/resources/MoodLifter.jsx";
import EnergyBoost from "../components/resources/EnergyBoost.jsx";
import SleepBetter from "../components/resources/SleepBetter.jsx";
import FocusConcentration from "../components/resources/FocusConcentration.jsx";
import SelfCare from "../components/resources/SelfCare.jsx";
import Breathing from "../components/resources/Breathing.jsx";

export default function ResourcesApp() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
        <Routes>
          {/* Redirect root to resource hub */}
          <Route path="/" element={<Navigate to="/resources-app/hub" replace />} />
          
          <Route path="/hub" element={<ResourceHub />} />
          <Route path="/stress-relief" element={<StressRelief />} />
          <Route path="/mood-lifter" element={<MoodLifter />} />
          <Route path="/energy-boost" element={<EnergyBoost />} />
          <Route path="/sleep-better" element={<SleepBetter />} />
          <Route path="/focus-concentration" element={<FocusConcentration />} />
          <Route path="/self-care" element={<SelfCare />} />
          <Route path="/breathing" element={<Breathing />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
