// src/pages/SelfCare.jsx
import { useState, useEffect } from "react";
import { ArrowLeft, Wind, Sparkles, Youtube, FileText, BookOpen, Heart, Flower, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

export default function SelfCare() {
  const [active, setActive] = useState("breathing");
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const affirmations = [
    "I am worthy of peace and happiness.",
    "I choose to be kind to myself today.",
    "I am enough, just as I am.",
    "I deserve love and compassion.",
    "I trust in my ability to overcome challenges.",
    "I am grateful for this moment of self-care."
  ];

  const nextAffirmation = () => {
    setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Clean White Background with Subtle Gradients */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>
      
      {/* Subtle Accent Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gray-100 to-gray-200 rounded-full opacity-15 blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/resources" className="inline-flex items-center text-lg font-medium text-gray-600 hover:text-perylene-600 mb-8 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Resources Hub
            </Link>
            
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-none mb-8 tracking-tight">
                SELF-CARE &
                <br />
                <span className="text-perylene-600">RELAXATION</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                Ideas and inspiration for taking care of your 
                <span className="font-semibold text-gray-800"> mental and physical self</span>
                <br />
                <span className="text-lg md:text-xl text-gray-500">Nurture your well-being with gentle practices</span>
              </p>
              <div className="w-24 h-1 bg-perylene-600 mx-auto mt-8 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Navigation Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
              <button 
                onClick={() => setActive("breathing")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "breathing" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "breathing" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Wind className={`w-8 h-8 ${active === "breathing" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${active === "breathing" ? "text-perylene-800" : "text-gray-800"}`}>
                  Mindful Moment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Take a peaceful breathing break to center yourself
                </p>
              </button>
              
              <button 
                onClick={() => setActive("affirmations")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "affirmations" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "affirmations" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Sparkles className={`w-8 h-8 ${active === "affirmations" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${active === "affirmations" ? "text-perylene-800" : "text-gray-800"}`}>
                  Daily Affirmations
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Positive affirmations to boost your self-esteem and mindset
                </p>
              </button>
            </div>

            {/* Content Sections */}
            {active === "breathing" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <Heart className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      A Moment to Breathe
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Take a peaceful pause and reconnect with yourself
                    </p>
                  </div>
                  
                  <div className="text-center space-y-8">
                    {/* Breathing Circle */}
                    <div className="relative">
                      <div className={`w-80 h-80 mx-auto rounded-full flex items-center justify-center transition-all duration-3000 ${
                        isBreathing 
                          ? "bg-gradient-to-br from-perylene-200 to-perylene-300 scale-110 animate-pulse" 
                          : "bg-gradient-to-br from-gray-100 to-gray-200"
                      }`}>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-800 mb-2">
                            {isBreathing ? "Breathe..." : "Ready to Begin"}
                          </p>
                          <p className="text-lg text-gray-600">
                            {isBreathing ? "Follow the gentle rhythm" : "Press start when ready"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex justify-center">
                      <button 
                        onClick={() => setIsBreathing(!isBreathing)} 
                        className="flex items-center px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg"
                      >
                        {isBreathing ? (
                          <>
                            <Pause className="w-6 h-6 mr-3" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-6 h-6 mr-3" />
                            Start Breathing
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Breathing Instructions */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Breathing Instructions</h3>
                      <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                          <div className="w-12 h-12 bg-perylene-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                            <span className="text-perylene-600 font-bold">1</span>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">Inhale</h4>
                          <p className="text-gray-600 text-sm">Breathe in slowly through your nose for 4 counts</p>
                        </div>
                        <div className="p-4">
                          <div className="w-12 h-12 bg-perylene-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                            <span className="text-perylene-600 font-bold">2</span>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">Hold</h4>
                          <p className="text-gray-600 text-sm">Hold your breath gently for 4 counts</p>
                        </div>
                        <div className="p-4">
                          <div className="w-12 h-12 bg-perylene-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                            <span className="text-perylene-600 font-bold">3</span>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">Exhale</h4>
                          <p className="text-gray-600 text-sm">Breathe out slowly through your mouth for 6 counts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === "affirmations" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <Flower className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Daily Affirmations
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Positive words to nurture your self-worth and inner peace
                    </p>
                  </div>
                  
                  <div className="text-center space-y-8">
                    {/* Affirmation Display */}
                    <div className="bg-gradient-to-br from-perylene-50 to-gray-50 rounded-3xl p-12 max-w-3xl mx-auto">
                      <div className="mb-8">
                        <div className="w-16 h-16 bg-perylene-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <blockquote className="text-3xl md:text-4xl font-light text-gray-800 italic leading-relaxed mb-6">
                          "{affirmations[currentAffirmation]}"
                        </blockquote>
                        <p className="text-lg text-gray-600">
                          Affirmation {currentAffirmation + 1} of {affirmations.length}
                        </p>
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex justify-center">
                      <button 
                        onClick={nextAffirmation}
                        className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg"
                      >
                        Next Affirmation
                      </button>
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">How to Use Affirmations</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-800 mb-3">✨ Practice Tips</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Repeat each affirmation 3-5 times</li>
                            <li>• Say them with conviction and belief</li>
                            <li>• Practice daily, preferably in the morning</li>
                            <li>• Focus on the feeling behind the words</li>
                          </ul>
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-800 mb-3">🌱 Benefits</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Builds self-confidence and self-worth</li>
                            <li>• Reduces negative self-talk</li>
                            <li>• Improves overall mood and outlook</li>
                            <li>• Creates positive mental patterns</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              READY TO CARE FOR YOURSELF?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              Start your self-care journey with gentle, nurturing practices
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/resources">
                <button className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg">
                  Explore More Resources
                </button>
              </Link>
              <button 
                onClick={() => setActive("breathing")}
                className="px-12 py-6 border-2 border-gray-300 text-gray-700 text-xl font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Try Mindful Breathing
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
