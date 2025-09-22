// src/pages/Breathing.jsx
import { useState, useEffect } from "react";
import { ArrowLeft, Wind, Youtube, FileText, BookOpen, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breathing() {
  const [active, setActive] = useState("mindful-moment");
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [phase, setPhase] = useState("inhale"); // inhale, hold, exhale

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setPhase(prev => {
          if (prev === "inhale") return "hold";
          if (prev === "hold") return "exhale";
          if (prev === "exhale") {
            setBreathCount(count => count + 1);
            return "inhale";
          }
        });
      }, 4000); // 4 seconds per phase
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  const resetBreathing = () => {
    setIsBreathing(false);
    setBreathCount(0);
    setPhase("inhale");
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
                BREATHING
                <br />
                <span className="text-perylene-600">EXERCISES</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                Simple breathing techniques to 
                <span className="font-semibold text-gray-800"> find calm and center yourself</span>
                <br />
                <span className="text-lg md:text-xl text-gray-500">Practice mindful breathing for inner peace</span>
              </p>
              <div className="w-24 h-1 bg-perylene-600 mx-auto mt-8 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Navigation Cards */}
            <div className="grid md:grid-cols-4 gap-8 mb-20">
              <button 
                onClick={() => setActive("mindful-moment")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "mindful-moment" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "mindful-moment" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Wind className={`w-8 h-8 ${active === "mindful-moment" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "mindful-moment" ? "text-perylene-800" : "text-gray-800"}`}>
                  Mindful Breathing
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Interactive breathing exercise
                </p>
              </button>
              
              <button 
                onClick={() => setActive("videos")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "videos" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "videos" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Youtube className={`w-8 h-8 ${active === "videos" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "videos" ? "text-perylene-800" : "text-gray-800"}`}>
                  Guided Videos
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Video tutorials and guides
                </p>
              </button>
              
              <button 
                onClick={() => setActive("pdf")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "pdf" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "pdf" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <FileText className={`w-8 h-8 ${active === "pdf" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "pdf" ? "text-perylene-800" : "text-gray-800"}`}>
                  PDF Guides
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Printable breathing guides
                </p>
              </button>
              
              <button 
                onClick={() => setActive("articles")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "articles" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "articles" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <BookOpen className={`w-8 h-8 ${active === "articles" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "articles" ? "text-perylene-800" : "text-gray-800"}`}>
                  Articles
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Expert breathing techniques
                </p>
              </button>
            </div>

            {/* Content Sections */}
            {active === "mindful-moment" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Mindful Breathing Exercise
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Follow the breathing circle and find your center
                    </p>
                  </div>
                  
                  <div className="text-center space-y-8">
                    {/* Breathing Circle */}
                    <div className="relative">
                      <div className={`w-80 h-80 mx-auto rounded-full flex items-center justify-center transition-all duration-4000 ${
                        isBreathing 
                          ? phase === "inhale" 
                            ? "bg-gradient-to-br from-perylene-200 to-perylene-300 scale-110" 
                            : phase === "hold"
                            ? "bg-gradient-to-br from-perylene-300 to-perylene-400 scale-110"
                            : "bg-gradient-to-br from-perylene-100 to-perylene-200 scale-90"
                          : "bg-gradient-to-br from-gray-100 to-gray-200"
                      }`}>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-800 mb-2">
                            {isBreathing 
                              ? phase === "inhale" 
                                ? "Breathe In" 
                                : phase === "hold"
                                ? "Hold"
                                : "Breathe Out"
                              : "Ready to Begin"
                            }
                          </p>
                          <p className="text-lg text-gray-600">
                            {isBreathing ? `Breath ${breathCount + 1}` : "Press start when ready"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex justify-center gap-6">
                      <button 
                        onClick={() => setIsBreathing(!isBreathing)} 
                        className="flex items-center px-8 py-4 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg"
                      >
                        {isBreathing ? (
                          <>
                            <Pause className="w-6 h-6 mr-3" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-6 h-6 mr-3" />
                            Start
                          </>
                        )}
                      </button>
                      
                      <button 
                        onClick={resetBreathing}
                        className="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-xl font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                      >
                        <RotateCcw className="w-6 h-6 mr-3" />
                        Reset
                      </button>
                    </div>
                    
                    {/* Stats */}
                    {breathCount > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Session Progress</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-perylene-600">{breathCount}</div>
                            <div className="text-gray-600">Breaths Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-perylene-600">{Math.floor(breathCount * 12 / 60)}</div>
                            <div className="text-gray-600">Minutes Practiced</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {active === "videos" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Guided Video Sessions
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Follow along with expert-led breathing exercises
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "4-7-8 Breathing Technique",
                        duration: "10 minutes",
                        description: "A powerful technique for relaxation and better sleep"
                      },
                      {
                        title: "Box Breathing for Focus",
                        duration: "8 minutes", 
                        description: "Improve concentration and reduce stress"
                      },
                      {
                        title: "Belly Breathing Basics",
                        duration: "12 minutes",
                        description: "Learn proper diaphragmatic breathing"
                      }
                    ].map((video, idx) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{video.title}</h3>
                            <p className="text-gray-600 mb-2">{video.description}</p>
                            <span className="text-sm text-gray-500">{video.duration}</span>
                          </div>
                          <button className="px-6 py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-colors duration-200">
                            Watch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {active === "pdf" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Printable Guides
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Download comprehensive breathing exercise guides
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                    <embed 
                      src="/pdf/breathing_exercises.pdf" 
                      type="application/pdf" 
                      width="100%" 
                      height="600px"
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="text-center">
                    <button className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg">
                      Download PDF Guide
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "articles" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Expert Articles
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Learn from breathing experts and researchers
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "The Science Behind Breathing Exercises",
                        excerpt: "Understand how controlled breathing affects your nervous system and overall well-being.",
                        readTime: "7 min read"
                      },
                      {
                        title: "Breathing Techniques for Anxiety Management",
                        excerpt: "Discover specific breathing patterns that can help manage anxiety and panic attacks.",
                        readTime: "5 min read"
                      },
                      {
                        title: "Building a Daily Breathing Practice",
                        excerpt: "Tips for incorporating breathing exercises into your daily routine for maximum benefit.",
                        readTime: "6 min read"
                      }
                    ].map((article, idx) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                          <button className="text-perylene-600 font-semibold hover:text-perylene-700 transition-colors duration-200">
                            Read Article →
                          </button>
                        </div>
                      </div>
                    ))}
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
              READY TO BREATHE BETTER?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              Start your breathing practice today and experience the calming benefits
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/resources">
                <button className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg">
                  Explore More Resources
                </button>
              </Link>
              <button 
                onClick={() => setActive("mindful-moment")}
                className="px-12 py-6 border-2 border-gray-300 text-gray-700 text-xl font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Try Breathing Exercise
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
