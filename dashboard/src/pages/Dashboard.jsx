import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Calendar, MessageCircle, BookOpen, Bot, LogOut, User, Heart, Brain } from "lucide-react";
import MoodGraph from "../components/mindfulness/MoodGraph.jsx";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>
        
        {/* Subtle Accent Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gray-100 to-gray-200 rounded-full opacity-15 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                {getGreeting()},
                <br />
                <span className="text-perylene-600">{user?.displayName || "Student"}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-2">{getCurrentDate()}</p>
              <p className="text-lg text-gray-500">Welcome to your mental wellness dashboard</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white rounded-2xl px-6 py-3 shadow-lg border border-gray-200">
                <div className="w-10 h-10 bg-perylene-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-perylene-600" />
                </div>
                <span className="text-gray-700 font-medium">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Actions */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Mood Insights */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Mood Journey</h2>
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                  <MoodGraph />
                </div>
              </div>

              {/* Mental Health Assessments */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Mental Health Assessments</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* PHQ-9 */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                        <span className="text-lg font-bold text-gray-600">PHQ</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">PHQ-9</h3>
                      <p className="text-sm text-gray-600">Depression Screening</p>
                    </div>
                    <button 
                      onClick={() => navigate("/assessment/phq-9")}
                      className="w-full py-2 bg-perylene-600 text-white font-semibold rounded-lg hover:bg-perylene-700 transition-all duration-200"
                    >
                      Take Assessment
                    </button>
                  </div>

                  {/* GAD-7 */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                        <span className="text-lg font-bold text-gray-600">GAD</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">GAD-7</h3>
                      <p className="text-sm text-gray-600">Anxiety Screening</p>
                    </div>
                    <button 
                      onClick={() => navigate("/assessment/gad-7")}
                      className="w-full py-2 bg-perylene-600 text-white font-semibold rounded-lg hover:bg-perylene-700 transition-all duration-200"
                    >
                      Take Assessment
                    </button>
                  </div>

                  {/* GHQ-12 */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                        <span className="text-lg font-bold text-gray-600">GHQ</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">GHQ-12</h3>
                      <p className="text-sm text-gray-600">General Well-being</p>
                    </div>
                    <button 
                      onClick={() => navigate("/assessment/ghq-12")}
                      className="w-full py-2 bg-perylene-600 text-white font-semibold rounded-lg hover:bg-perylene-700 transition-all duration-200"
                    >
                      Take Assessment
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Calendar and AI Assistant */}
            <div className="space-y-8">
              
              {/* Calendar */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Calendar</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-perylene-600 mb-2">
                      {new Date().getDate()}
                    </div>
                    <div className="text-lg text-gray-600 mb-4">
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-3 h-3 bg-perylene-600 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Daily Check-in</div>
                        <div className="text-xs text-gray-600">9:00 AM</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Wellness Activity</div>
                        <div className="text-xs text-gray-600">2:00 PM</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Peer Support Group</div>
                        <div className="text-xs text-gray-600">6:00 PM</div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200">
                    View Full Calendar
                  </button>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="bg-gradient-to-br from-perylene-50 to-perylene-100 rounded-3xl p-6 border border-perylene-200 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-perylene-600 rounded-2xl flex items-center justify-center">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">AI Assistant</h3>
                    <p className="text-gray-600">Your 24/7 mental wellness companion</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Get instant support, personalized recommendations, and answers to your mental health questions.
                </p>
                <button 
                  onClick={() => navigate("/chatbot")}
                  className="w-full py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all duration-200 shadow-lg"
                >
                  Chat with MindSathi AI
                </button>
              </div>

              {/* Daily Quote */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Inspiration</h3>
                <blockquote className="text-lg font-light text-gray-700 italic leading-relaxed mb-4">
                  "You are braver than you believe, stronger than you seem, and smarter than you think."
                </blockquote>
                <cite className="text-sm text-gray-600">— A.A. Milne</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

