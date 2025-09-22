// src/pages/StressRelief.jsx
import { useState } from "react";
import { ArrowLeft, Youtube, FileText, BookOpen, Newspaper, Mic, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function StressRelief() {
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
                STRESS
                <br />
                <span className="text-perylene-600">RELIEF</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                Find tools and techniques to 
                <span className="font-semibold text-gray-800"> manage stress and cultivate calm</span>
                <br />
                <span className="text-lg md:text-xl text-gray-500">Your journey to inner peace starts here</span>
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
                  Videos
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Guided sessions
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
                  Printable resources
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
                  Expert insights
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
                  Latest updates
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
                  Audio content
                </p>
              </button>
            </div>

            {/* Content Sections */}
            {active === "videos" && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-perylene-100 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                      <Youtube className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Guided Video Sessions
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Follow along with expert-led stress relief techniques
                    </p>
                  </div>
                  
                  <div className="space-y-12">
                    <div className="bg-gray-50 rounded-3xl p-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-6">5-Minute Meditation for Stress</h3>
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                        <iframe 
                          src="https://www.youtube.com/embed/0fL-pn80s-c" 
                          allowFullScreen 
                          className="w-full h-full"
                          title="5-Minute Meditation for Stress"
                        ></iframe>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        A quick and effective meditation session to help you release stress and find inner calm.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-3xl p-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-6">Progressive Muscle Relaxation</h3>
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                        <iframe 
                          src="https://www.youtube.com/embed/eGVWRvNe1-A" 
                          allowFullScreen 
                          className="w-full h-full"
                          title="Progressive Muscle Relaxation"
                        ></iframe>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Learn to systematically tense and relax different muscle groups to reduce physical stress.
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
                      <FileText className="w-10 h-10 text-perylene-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Helpful Guides & Worksheets
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                      Download comprehensive stress management resources
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                    <embed 
                      src="/pdf/stress.pdf" 
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
                      Expert Articles
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Research-backed insights on stress management
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "Understanding the Science of Stress",
                        excerpt: "Learn how stress affects your body and mind, and why managing it is crucial for your health.",
                        readTime: "8 min read"
                      },
                      {
                        title: "10 Evidence-Based Stress Relief Techniques",
                        excerpt: "Discover proven methods that can help you manage stress effectively in your daily life.",
                        readTime: "6 min read"
                      },
                      {
                        title: "Building Resilience: Your Stress Management Toolkit",
                        excerpt: "Develop long-term strategies for handling stress and building emotional resilience.",
                        readTime: "10 min read"
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
              READY TO FIND CALM?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              Start your stress relief journey today with our comprehensive resources
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
                Watch Guided Videos
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
