// src/pages/MoodLifter.jsx
import { useState } from "react";
import { ArrowLeft, Sparkles, Heart, Sun, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function MoodLifter() {
  const [selectedMood, setSelectedMood] = useState("bored");
  const [showIdeas, setShowIdeas] = useState(false);

  const moodOptions = {
    bored: {
      label: "Bored",
      icon: Sun,
      ideas: ["Take a mindful walk", "Try a creative hobby", "Call a friend", "Explore new music"]
    },
    lonely: {
      label: "Lonely", 
      icon: Heart,
      ideas: ["Join a study group", "Video call family", "Visit a coffee shop", "Volunteer locally"]
    },
    stressed: {
      label: "Stressed",
      icon: Sparkles,
      ideas: ["Practice deep breathing", "Do gentle stretches", "Take a power nap", "Listen to calm music"]
    },
    unmotivated: {
      label: "Unmotivated",
      icon: Zap,
      ideas: ["Set a small goal", "Review your values", "Watch inspiring content", "Organize your space"]
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/resources" className="inline-flex items-center text-gray-600 hover:text-perylene-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-sans font-bold text-perylene-600 mb-4">
              MENTAL WELLNESS
              <br />
              TOOLKIT
            </h1>
            <p className="text-xl text-perylene-600 max-w-2xl">
              Quick activities to brighten your day
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Mood Selection Grid - 60% White, 30% Perylene */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.entries(moodOptions).map(([key, mood], index) => {
              const IconComponent = mood.icon;
              const isSelected = selectedMood === key;
              // 30% perylene (index 0,1), 60% white (index 2,3), remaining 10% for spacing
              const isPeryleneBox = index < 2;
              
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedMood(key);
                    setShowIdeas(true);
                  }}
                  className={`p-8 rounded-3xl transition-all duration-300 text-center group ${
                    isSelected
                      ? isPeryleneBox
                        ? "bg-perylene-600 text-white shadow-xl scale-105"
                        : "bg-white border-2 border-perylene-600 text-perylene-600 shadow-xl scale-105"
                      : isPeryleneBox
                        ? "bg-perylene-100 hover:bg-perylene-200 text-perylene-800"
                        : "bg-white hover:shadow-lg border border-gray-200"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all ${
                    isSelected
                      ? isPeryleneBox
                        ? "bg-white/20"
                        : "bg-perylene-600"
                      : isPeryleneBox
                        ? "bg-perylene-600"
                        : "bg-gray-100 group-hover:bg-perylene-100"
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      isSelected
                        ? isPeryleneBox
                          ? "text-white"
                          : "text-white"
                        : isPeryleneBox
                          ? "text-white"
                          : "text-gray-600 group-hover:text-perylene-600"
                    }`} />
                  </div>
                  <h3 className="text-lg font-bold">{mood.label}</h3>
                </button>
              );
            })}
          </div>

          {/* Ideas Display */}
          {showIdeas && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-sans font-bold text-perylene-600 mb-4">
                    Ideas for when you're feeling {moodOptions[selectedMood].label.toLowerCase()}
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {moodOptions[selectedMood].ideas.map((idea, idx) => (
                    <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-perylene-50 transition-colors duration-200">
                      <div className="w-3 h-3 bg-perylene-600 rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">{idea}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-perylene-600 text-white p-6 rounded-3xl">
                <h3 className="text-xl font-bold mb-2">Need Support?</h3>
                <p className="text-perylene-100 mb-4">Connect with professional help</p>
                <button className="bg-white text-perylene-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Get Help
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-3xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-sans font-bold mb-2 text-perylene-600">Track Progress</h3>
                <p className="text-gray-600 mb-4">Monitor your daily mood</p>
                <button className="bg-perylene-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-perylene-700 transition-colors">
                  Start Tracking
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-3xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-sans font-bold mb-2 text-perylene-600">More Resources</h3>
                <p className="text-gray-600 mb-4">Explore wellness tools</p>
                <Link to="/resources">
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
