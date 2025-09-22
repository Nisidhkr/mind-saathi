import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft, Heart, Brain, Activity, Calendar } from "lucide-react";
import Footer from "../components/Footer";

export default function Mindfulness() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('mood');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const sections = [
    { id: 'mood', name: 'Mood Tracker', icon: Heart, color: 'bg-pink-100 text-pink-600' },
    { id: 'breathing', name: 'Breathing', icon: Brain, color: 'bg-blue-100 text-blue-600' },
    { id: 'meditation', name: 'Meditation', icon: Activity, color: 'bg-green-100 text-green-600' },
    { id: 'period', name: 'Period Tracker', icon: Calendar, color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 text-gray-600 hover:text-perylene-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Mindfulness & Wellness</h1>
            </div>
            <div className="text-sm text-gray-500">
              Welcome, {user?.displayName || user?.email}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Tools</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-perylene-50 text-perylene-700 border border-perylene-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeSection === section.id ? 'bg-perylene-100' : section.color
                    }`}>
                      <section.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border min-h-[600px]">
              {activeSection === 'mood' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood Tracker</h2>
                  <iframe 
                    src="http://localhost:3000" 
                    className="w-full h-[500px] border-0 rounded-xl"
                    title="Mood Tracker"
                  />
                </div>
              )}

              {activeSection === 'breathing' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Breathing Exercises</h2>
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
                    <p className="text-gray-500">Breathing exercises will be available here</p>
                  </div>
                </div>
              )}

              {activeSection === 'meditation' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Meditation</h2>
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
                    <p className="text-gray-500">Meditation sessions will be available here</p>
                  </div>
                </div>
              )}

              {activeSection === 'period' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Period Tracker</h2>
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
                    <p className="text-gray-500">Period tracking will be available here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
