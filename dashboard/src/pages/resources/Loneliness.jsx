import { useState } from 'react';

export default function Loneliness() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-violet-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#1B674D]/5 to-indigo-50/30 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Loneliness
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding and addressing loneliness - a universal human experience that, when chronic, can significantly impact mental and physical health.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Universal Experience</h3>
              <p className="text-gray-600">Everyone experiences loneliness at some point in their lives</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Subjective Feeling</h3>
              <p className="text-gray-600">It's about quality, not quantity of relationships</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Addressable</h3>
              <p className="text-gray-600">Loneliness can be overcome with the right strategies and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about loneliness</p>
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
              <p className="text-sm text-gray-600">Understanding loneliness</p>
            </button>
            <button 
              onClick={() => scrollToSection('types')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Types</h3>
              <p className="text-sm text-gray-600">Different forms of loneliness</p>
            </button>
            <button 
              onClick={() => scrollToSection('causes')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Causes</h3>
              <p className="text-sm text-gray-600">What triggers loneliness</p>
            </button>
            <button 
              onClick={() => scrollToSection('effects')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">💔</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Health Effects</h3>
              <p className="text-sm text-gray-600">Impact on wellbeing</p>
            </button>
            <button 
              onClick={() => scrollToSection('coping')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Coping</h3>
              <p className="text-sm text-gray-600">Managing loneliness</p>
            </button>
            <button 
              onClick={() => scrollToSection('connection')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🌉</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Building Connection</h3>
              <p className="text-sm text-gray-600">Creating meaningful bonds</p>
            </button>
            <button 
              onClick={() => scrollToSection('prevention')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Prevention</h3>
              <p className="text-sm text-gray-600">Preventing chronic loneliness</p>
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Getting help and resources</p>
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What is Loneliness?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding the subjective experience of feeling disconnected</p>
          </div>
          
          <div className="space-y-16">
            {/* Main Definition */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Understanding Loneliness</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Loneliness is the subjective feeling of being isolated, disconnected, or lacking meaningful social connections. It's not about being alone - you can feel lonely in a crowd or content when by yourself.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  It's the gap between the social connections you have and the connections you desire. Loneliness is about the quality, not quantity, of relationships.
                </p>
                <div className="bg-violet-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Key Point:</strong> Loneliness is a feeling, not a fact. It's your brain's way of telling you that you need social connection.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-violet-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Loneliness Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">61%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Young Adults</p>
                      <p className="text-gray-600">of young adults report serious loneliness</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">25%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Adults Overall</p>
                      <p className="text-gray-600">of adults experience chronic loneliness</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">15</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Cigarettes Equivalent</p>
                      <p className="text-gray-600">health impact of chronic loneliness</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Loneliness vs Solitude */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Loneliness vs. Solitude</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-red-50 p-8 rounded-2xl border-l-4 border-red-500">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-200 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">😔</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Loneliness</h4>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Unwanted feeling of disconnection</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Can occur even when surrounded by people</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Associated with negative emotions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Focuses on what's missing</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-8 rounded-2xl border-l-4 border-green-500">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">😌</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Solitude</h4>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Chosen time alone for reflection</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Peaceful and restorative</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Associated with positive emotions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Focuses on self-discovery and growth</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section id="types" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Types of Loneliness</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding different dimensions of the loneliness experience</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Loneliness</h3>
              <p className="text-gray-600 mb-4">Feeling disconnected from a broader social network or community. Lacking a sense of belonging to a group.</p>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Example:</strong> Feeling like an outsider at school or work</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Emotional Loneliness</h3>
              <p className="text-gray-600 mb-4">Missing close, intimate relationships. Feeling like you have no one to share your deepest thoughts and feelings with.</p>
              <div className="bg-purple-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Example:</strong> Having many acquaintances but no close friends</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Situational Loneliness</h3>
              <p className="text-gray-600 mb-4">Temporary loneliness due to life changes or circumstances, such as moving, starting a new job, or loss.</p>
              <div className="bg-green-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Example:</strong> Feeling lonely after moving to a new city</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chronic Loneliness</h3>
              <p className="text-gray-600 mb-4">Long-term, persistent loneliness that doesn't improve with social contact. Often linked to mental health conditions.</p>
              <div className="bg-red-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Example:</strong> Feeling lonely despite having relationships</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cultural Loneliness</h3>
              <p className="text-gray-600 mb-4">Feeling disconnected from your cultural background or struggling to find others who share your cultural identity.</p>
              <div className="bg-orange-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Example:</strong> Being the only person from your culture in an area</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Loneliness</h3>
              <p className="text-gray-600 mb-4">Feeling isolated despite being connected online. The paradox of being digitally connected but emotionally disconnected.</p>
              <div className="bg-pink-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Example:</strong> Having many online friends but feeling empty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-violet-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">You Matter, You Belong</h2>
          <p className="text-xl text-gray-600 mb-12">
            Loneliness is a temporary state, not a permanent condition. There are people who care about you and want to connect. Taking the first step toward connection is brave and worthwhile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Find Connection Today
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Talk to Someone Now
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Feeling lonely doesn't mean you're alone. Help and connection are always available.
          </p>
        </div>
      </section>
    </div>
  );
}
