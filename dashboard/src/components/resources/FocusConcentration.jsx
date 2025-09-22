// src/pages/FocusConcentration.jsx
import { useState } from "react";
import { ArrowLeft, Youtube, FileText, BookOpen, Newspaper, Mic, Target, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function FocusConcentration() {
  const [active, setActive] = useState("videos");

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
                FOCUS &
                <br />
                <span className="text-perylene-600">CONCENTRATION</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                Enhance your focus for 
                <span className="font-semibold text-gray-800"> studying and completing important tasks</span>
                <br />
                <span className="text-lg md:text-xl text-gray-500">Master the art of sustained attention</span>
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
                <h3 className={`text-2xl font-bold mb-4 ${active === "videos" ? "text-perylene-800" : "text-gray-800"}`}>
                  Focus Videos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Guided focus training sessions and concentration techniques
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
                <h3 className={`text-2xl font-bold mb-4 ${active === "pdf" ? "text-perylene-800" : "text-gray-800"}`}>
                  Study Guides
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Time management and concentration improvement resources
                </p>
              </button>
            </div>

            {/* Content Sections */}
            {active === "videos" && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <Target className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Focus Training Videos
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Expert-guided sessions to improve your concentration and focus
                    </p>
                  </div>
                  
                  <div className="space-y-12">
                    <div className="bg-gray-50 rounded-3xl p-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-6">Deep Focus Techniques</h3>
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                        <iframe 
                          src="https://www.youtube.com/embed/H0k0_UKv_3I" 
                          allowFullScreen 
                          className="w-full h-full"
                          title="Deep Focus Techniques"
                        ></iframe>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Learn proven techniques to achieve deep focus and maintain concentration for extended periods.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-3xl p-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-6">Study Focus Methods</h3>
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                        <iframe 
                          src="https://www.youtube.com/embed/5qap5aO4i9A" 
                          allowFullScreen 
                          className="w-full h-full"
                          title="Study Focus Methods"
                        ></iframe>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Discover effective study methods and concentration strategies for academic success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === "pdf" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <Brain className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Time Management Guide
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                      Comprehensive guide to improving focus and managing your time effectively
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                    <embed 
                      src="/pdf/focus_concentration.pdf" 
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
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              READY TO FOCUS?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              Start improving your concentration and productivity today
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/resources">
                <button className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg">
                  Explore More Resources
                </button>
              </Link>
              <button 
                onClick={() => setActive("videos")}
                className="px-12 py-6 border-2 border-gray-300 text-gray-700 text-xl font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Watch Focus Videos
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
