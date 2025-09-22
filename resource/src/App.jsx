// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResourceHub from "./pages/ResourceHub";
import StressRelief from "./pages/StressRelief";
import MoodLifter from "./pages/MoodLifter";
import EnergyBoost from "./pages/EnergyBoost";
import SleepBetter from "./pages/SleepBetter";
import FocusConcentration from "./pages/FocusConcentration";
import SelfCare from "./pages/SelfCare";
import Breathing from "./pages/Breathing";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to resource hub */}
        <Route path="/" element={<Navigate to="/resources" replace />} />

        <Route path="/resources" element={<ResourceHub />} />
        <Route path="/stress-relief" element={<StressRelief />} />
        <Route path="/mood-lifter" element={<MoodLifter />} />
        <Route path="/energy-boost" element={<EnergyBoost />} />
        <Route path="/sleep-better" element={<SleepBetter />} />
        <Route path="/focus-concentration" element={<FocusConcentration />} />
        <Route path="/self-care" element={<SelfCare />} />
        <Route path="/breathing" element={<Breathing />} />
      </Routes>
    </Router>
  );
}

export default App;
