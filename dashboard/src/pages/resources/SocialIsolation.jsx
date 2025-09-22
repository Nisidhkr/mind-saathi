import { useState } from 'react';

export default function SocialIsolation() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-indigo-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#1B674D]/5 to-blue-50/30 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Social Isolation
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding and overcoming social isolation - the experience of being cut off from social connections that can significantly impact mental and physical health.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Growing Issue</h3>
              <p className="text-gray-600">Social isolation has increased significantly in recent years</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💔</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Health Impact</h3>
              <p className="text-gray-600">Can be as harmful to health as smoking 15 cigarettes daily</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reconnectable</h3>
              <p className="text-gray-600">Social connections can be rebuilt with effort and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about social isolation</p>
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
              <p className="text-sm text-gray-600">Understanding social isolation</p>
            </button>
            <button 
              onClick={() => scrollToSection('signs')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Signs</h3>
              <p className="text-sm text-gray-600">Recognizing isolation</p>
            </button>
            <button 
              onClick={() => scrollToSection('causes')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Causes</h3>
              <p className="text-sm text-gray-600">What leads to isolation</p>
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
              onClick={() => scrollToSection('overcoming')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🌉</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Overcoming</h3>
              <p className="text-sm text-gray-600">Building connections</p>
            </button>
            <button 
              onClick={() => scrollToSection('strategies')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Strategies</h3>
              <p className="text-sm text-gray-600">Practical approaches</p>
            </button>
            <button 
              onClick={() => scrollToSection('technology')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Technology</h3>
              <p className="text-sm text-gray-600">Digital connections</p>
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Getting help</p>
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What is Social Isolation?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding the difference between solitude and harmful isolation</p>
          </div>
          
          <div className="space-y-16">
            {/* Main Definition */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Understanding Social Isolation</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Social isolation is the lack of social connections and meaningful relationships. It's different from loneliness - you can be alone but not lonely, or surrounded by people but still feel isolated.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  It involves having few people to interact with regularly, lacking a sense of belonging, and having minimal participation in social activities or community life.
                </p>
                <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Key Distinction:</strong> Choosing solitude for self-care is healthy. Social isolation becomes harmful when it's involuntary or excessive.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-indigo-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Social Isolation Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">35%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Adults Affected</p>
                      <p className="text-gray-600">of adults aged 45+ report chronic loneliness</p>
                    </div>
                  </div>
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
                      <span className="text-white text-lg font-bold">50%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Health Risk</p>
                      <p className="text-gray-600">increased risk of premature death</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Social Isolation */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Social Isolation</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🏠</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Physical Isolation</h4>
                  <p className="text-gray-600">Being physically separated from others due to location, mobility issues, or circumstances.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">💭</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Emotional Isolation</h4>
                  <p className="text-gray-600">Feeling disconnected from others emotionally, even when physically present.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Social Isolation</h4>
                  <p className="text-gray-600">Lacking social networks, friendships, and community connections.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-orange-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🎭</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cultural Isolation</h4>
                  <p className="text-gray-600">Feeling disconnected from one's cultural background or community.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-red-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">💼</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Professional Isolation</h4>
                  <p className="text-gray-600">Lack of meaningful connections in work or professional environments.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-pink-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">📱</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Digital Isolation</h4>
                  <p className="text-gray-600">Paradoxically feeling isolated despite being connected online.</p>
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Signs of Social Isolation</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Recognizing when social disconnection becomes harmful</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">😔</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Emotional Signs</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Persistent feelings of loneliness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Feeling disconnected from others</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sadness or depression</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Anxiety in social situations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Loss of motivation or interest</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚶</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Signs</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avoiding social invitations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Spending most time alone</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Declining social skills</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Increased screen time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Neglecting self-care</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Physical Signs</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sleep disturbances</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Changes in appetite</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Frequent illness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fatigue and low energy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Headaches or body aches</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-indigo-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">You're Not Alone</h2>
          <p className="text-xl text-gray-600 mb-12">
            Social isolation is more common than you think, and there are many ways to rebuild meaningful connections. Taking the first step is often the hardest part.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Find Connection Opportunities
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Talk to Someone Today
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Reaching out for connection is a sign of strength, not weakness.
          </p>
        </div>
      </section>
    </div>
  );
}
