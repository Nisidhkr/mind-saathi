import { useState } from 'react';

export default function LowSelfEsteem() {
  const [activeSection, setActiveSection] = useState('overview');
  
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50/30 to-white py-32">
        {/* Subtle Accent Shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#1B674D]/10 to-[#1B674D]/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-purple-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#1B674D]/5 to-pink-50/30 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Low Self-Esteem
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding and overcoming low self-esteem - the foundation of mental well-being that affects how we see ourselves and interact with the world.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Changeable</h3>
              <p className="text-gray-600">Self-esteem can be improved with effort and practice</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learned Behavior</h3>
              <p className="text-gray-600">Often develops from childhood experiences and can be unlearned</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impacts Everything</h3>
              <p className="text-gray-600">Affects relationships, career, and overall life satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about self-esteem</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button 
              onClick={() => scrollToSection('overview')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Overview</h3>
              <p className="text-sm text-gray-600">Understanding self-esteem</p>
            </button>
            <button 
              onClick={() => scrollToSection('signs')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Signs</h3>
              <p className="text-sm text-gray-600">Recognizing low self-esteem</p>
            </button>
            <button 
              onClick={() => scrollToSection('causes')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Causes</h3>
              <p className="text-sm text-gray-600">What affects self-esteem</p>
            </button>
            <button 
              onClick={() => scrollToSection('impact')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">💔</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
              <p className="text-sm text-gray-600">Effects on daily life</p>
            </button>
            <button 
              onClick={() => scrollToSection('building')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Building</h3>
              <p className="text-sm text-gray-600">Improving self-esteem</p>
            </button>
            <button 
              onClick={() => scrollToSection('strategies')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Strategies</h3>
              <p className="text-sm text-gray-600">Practical techniques</p>
            </button>
            <button 
              onClick={() => scrollToSection('therapy')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Therapy</h3>
              <p className="text-sm text-gray-600">Professional help options</p>
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Building a support network</p>
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What is Self-Esteem?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding the foundation of how we see ourselves</p>
          </div>
          
          <div className="space-y-16">
            {/* Main Definition */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Understanding Self-Esteem</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Self-esteem refers to how you feel about yourself overall - your sense of personal value and worth. It's the opinion you have of yourself and your abilities, and it influences every aspect of your life.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Healthy self-esteem means having a balanced, realistic view of yourself. You recognize your strengths and accept your weaknesses without being overly critical.
                </p>
                <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Remember:</strong> Self-esteem is not about being perfect or thinking you're better than others. It's about having a healthy, balanced view of yourself.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-purple-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Self-Esteem Levels</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Healthy Self-Esteem</p>
                      <p className="text-gray-600">Balanced self-view, resilient to criticism, confident in abilities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">↓</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Low Self-Esteem</p>
                      <p className="text-gray-600">Negative self-view, harsh self-criticism, lack of confidence</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">↑</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Inflated Self-Esteem</p>
                      <p className="text-gray-600">Unrealistic self-view, difficulty accepting feedback</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Components of Self-Esteem */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Components of Self-Esteem</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🪞</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Self-Image</h4>
                  <p className="text-gray-600">How you see yourself - your mental picture of your appearance, personality, and abilities.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💭</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Self-Talk</h4>
                  <p className="text-gray-600">Your inner dialogue - the way you talk to yourself about your experiences and actions.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💖</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Self-Worth</h4>
                  <p className="text-gray-600">How much you value yourself - your sense of being worthy of love, respect, and happiness.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💪</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Self-Confidence</h4>
                  <p className="text-gray-600">Your belief in your abilities - trust in your capacity to handle challenges and achieve goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section id="signs" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Signs of Low Self-Esteem</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Recognizing the patterns and behaviors associated with low self-worth</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💭</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Thought Patterns</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Constant self-criticism</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Negative self-talk</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Focusing on failures</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comparing yourself to others</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>All-or-nothing thinking</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎭</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Emotional Signs</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Feeling worthless or inadequate</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Persistent sadness or depression</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Anxiety in social situations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fear of failure or rejection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Difficulty accepting compliments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚶</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Signs</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avoiding challenges or new experiences</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>People-pleasing behavior</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Difficulty making decisions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Perfectionism or procrastination</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Social withdrawal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-purple-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Build Your Self-Esteem?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Remember, building healthy self-esteem is a journey, not a destination. Every small step counts toward a more positive relationship with yourself.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Self-Esteem Journey
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Find a Therapist
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            You are worthy of love, respect, and happiness - including from yourself.
          </p>
        </div>
      </section>
    </div>
  );
}
