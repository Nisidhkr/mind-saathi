// src/pages/EnergyBoost.jsx
import { useState } from "react";
import { ArrowLeft, Zap, FileText, BookOpen, Newspaper, Mic, ChevronLeft, ChevronRight, Battery, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function EnergyBoost() {
  const [active, setActive] = useState("get-set");
  const [slide, setSlide] = useState(0);

  const slides = [
    { title: "Neck Tilts", video: "animation/neck-tilt.mp4", desc: "Gently tilt your head to each side to release neck tension and improve circulation." },
    { title: "Shoulder Rolls", video: "animation/shoulder_roll.mp4", desc: "Lift your shoulders up and roll them back to relieve upper body stiffness." },
    { title: "Arm Stretches", video: "animation/arm-roll.mp4", desc: "Stretch your arms overhead and to the sides to energize your upper body." },
    { title: "March in Place", video: "animation/march.mp4", desc: "March in place with arms swinging to get your blood flowing." },
    { title: "Deep Breaths", video: "animation/breathing.mp4", desc: "Take slow, deep breaths to oxygenate your body and boost energy." }
  ];

  const prev = () => setSlide((slide - 1 + slides.length) % slides.length);
  const next = () => setSlide((slide + 1) % slides.length);

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
                ENERGY
                <br />
                <span className="text-perylene-600">BOOST</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                Find natural ways to 
                <span className="font-semibold text-gray-800"> increase your energy and beat fatigue</span>
                <br />
                <span className="text-lg md:text-xl text-gray-500">Revitalize your body and mind naturally</span>
              </p>
              <div className="w-24 h-1 bg-perylene-600 mx-auto mt-8 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Navigation Cards */}
            <div className="grid md:grid-cols-5 gap-8 mb-20">
              <button 
                onClick={() => setActive("get-set")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "get-set" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "get-set" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Zap className={`w-8 h-8 ${active === "get-set" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "get-set" ? "text-perylene-800" : "text-gray-800"}`}>
                  Quick Energizers
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Interactive exercises
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
                  Energy boost resources
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
                  Energy tips & science
                </p>
              </button>
              
              <button 
                onClick={() => setActive("news")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "news" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "news" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Newspaper className={`w-8 h-8 ${active === "news" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "news" ? "text-perylene-800" : "text-gray-800"}`}>
                  News
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Latest research
                </p>
              </button>
              
              <button 
                onClick={() => setActive("podcasts")} 
                className={`bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-200 group text-left ${
                  active === "podcasts" 
                    ? "shadow-xl border-perylene-200 bg-perylene-50" 
                    : "hover:shadow-lg hover:border-gray-300"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  active === "podcasts" 
                    ? "bg-perylene-600" 
                    : "bg-gray-100 group-hover:bg-perylene-100"
                }`}>
                  <Mic className={`w-8 h-8 ${active === "podcasts" ? "text-white" : "text-gray-600 group-hover:text-perylene-600"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${active === "podcasts" ? "text-perylene-800" : "text-gray-800"}`}>
                  Podcasts
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Energy & wellness
                </p>
              </button>
            </div>

            {/* Content Sections */}
            {active === "get-set" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <Battery className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Quick Energy Exercises
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Simple movements to boost your energy in minutes
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Exercise Display */}
                    <div className="bg-gray-50 rounded-3xl p-8">
                      <div className="aspect-video bg-gray-200 rounded-2xl mb-6 flex items-center justify-center">
                        <video 
                          src={slides[slide].video} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                      
                      <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">{slides[slide].title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                          {slides[slide].desc}
                        </p>
                      </div>
                      
                      {/* Navigation Controls */}
                      <div className="flex justify-center items-center gap-6">
                        <button 
                          onClick={prev}
                          className="flex items-center justify-center w-12 h-12 bg-perylene-600 text-white rounded-2xl hover:bg-perylene-700 transition-colors duration-200"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        
                        <div className="text-center">
                          <span className="text-lg font-semibold text-gray-700">
                            {slide + 1} of {slides.length}
                          </span>
                        </div>
                        
                        <button 
                          onClick={next}
                          className="flex items-center justify-center w-12 h-12 bg-perylene-600 text-white rounded-2xl hover:bg-perylene-700 transition-colors duration-200"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Exercise List */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {slides.map((exercise, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSlide(idx)}
                          className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
                            slide === idx
                              ? "border-perylene-600 bg-perylene-50 text-perylene-800"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 mx-auto ${
                            slide === idx ? "bg-perylene-600" : "bg-gray-100"
                          }`}>
                            <Sparkles className={`w-4 h-4 ${slide === idx ? "text-white" : "text-gray-600"}`} />
                          </div>
                          <span className="font-semibold text-sm">{exercise.title}</span>
                        </button>
                      ))}
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
                      <FileText className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Energy Boost Guide
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                      Comprehensive guide to natural energy enhancement
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                    <embed 
                      src="/pdf/energy_boost.pdf" 
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
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <BookOpen className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Energy & Wellness Articles
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Science-backed insights on natural energy enhancement
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "The Science of Natural Energy Boosters",
                        excerpt: "Discover how your body creates energy and the natural ways to enhance this process.",
                        readTime: "7 min read"
                      },
                      {
                        title: "Movement vs. Caffeine: Better Energy Solutions",
                        excerpt: "Compare the benefits of physical movement versus caffeine for sustainable energy.",
                        readTime: "5 min read"
                      },
                      {
                        title: "Building Energy Reserves: Long-term Strategies",
                        excerpt: "Learn how to build lasting energy through lifestyle changes and healthy habits.",
                        readTime: "9 min read"
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
              READY TO ENERGIZE?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              Start boosting your natural energy today with our proven techniques
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/resources">
                <button className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg">
                  Explore More Resources
                </button>
              </Link>
              <button 
                onClick={() => setActive("get-set")}
                className="px-12 py-6 border-2 border-gray-300 text-gray-700 text-xl font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Try Quick Exercises
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
