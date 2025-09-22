import { useState } from 'react';

export default function LonelinessSocialIsolation() {
  const [activeSection, setActiveSection] = useState('overview');
  
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50/30 to-white py-32">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#1B674D]/10 to-[#1B674D]/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-blue-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Loneliness & Social Isolation
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding the epidemic of loneliness and social disconnection, and finding pathways to meaningful connection and community.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Epidemic Scale</h3>
              <p className="text-gray-600">61% of young adults report serious loneliness</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💔</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Health Impact</h3>
              <p className="text-gray-600">Equivalent to smoking 15 cigarettes daily</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Possible</h3>
              <p className="text-gray-600">Meaningful relationships can be built at any age</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about loneliness and social isolation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'overview', icon: '📖', title: 'Overview', desc: 'Understanding loneliness vs isolation' },
              { id: 'types', icon: '🔍', title: 'Types', desc: 'Different forms of disconnection' },
              { id: 'causes', icon: '🧬', title: 'Causes', desc: 'What leads to isolation' },
              { id: 'effects', icon: '💔', title: 'Health Effects', desc: 'Impact on wellbeing' },
              { id: 'digital', icon: '📱', title: 'Digital Age', desc: 'Technology and connection' },
              { id: 'building', icon: '🌉', title: 'Building Connection', desc: 'Creating meaningful bonds' },
              { id: 'strategies', icon: '🎯', title: 'Strategies', desc: 'Overcoming isolation' },
              { id: 'support', icon: '🤝', title: 'Support', desc: 'Help and resources' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
              >
                <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Understanding Loneliness & Isolation</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">The difference between being alone and feeling lonely</p>
          </div>
          
          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Loneliness vs Social Isolation</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  <strong>Loneliness</strong> is a subjective feeling of being disconnected or lacking meaningful social connections. You can feel lonely even when surrounded by people.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  <strong>Social Isolation</strong> is the objective lack of social connections and contacts. It's about the actual absence of relationships and social interactions.
                </p>
                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Key Point:</strong> You can be socially isolated but not lonely (enjoying solitude), or surrounded by people but still feel lonely.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-blue-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Loneliness Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">61%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Young Adults</p>
                      <p className="text-gray-600">report serious loneliness</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">35%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Adults 45+</p>
                      <p className="text-gray-600">experience chronic loneliness</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">50%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Increased Risk</p>
                      <p className="text-gray-600">of premature death from isolation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Loneliness vs Solitude */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Loneliness vs Solitude</h3>
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
                      <span>Can occur even when with others</span>
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
                      <span>Focuses on self-discovery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Age Section */}
      <section id="digital" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">The Digital Paradox</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">How technology both connects and isolates us</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-3xl shadow-lg border border-red-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-200 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Digital Isolation</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Superficial online connections</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reduced face-to-face interaction</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Social media comparison</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fear of missing out (FOMO)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Decreased empathy and social skills</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-8 rounded-3xl shadow-lg border border-green-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-200 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Digital Connection</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Access to support communities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Maintaining long-distance relationships</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Finding like-minded communities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mental health resources and apps</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Virtual therapy and support groups</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Building Connection Section */}
      <section id="building" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Building Meaningful Connections</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Practical strategies for creating and maintaining relationships</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Start Small</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Make eye contact and smile</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Say hello to neighbors</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ask open-ended questions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Practice active listening</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share something about yourself</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Join Communities</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Volunteer for causes you care about</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Join clubs or hobby groups</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Take classes or workshops</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Attend community events</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Join support groups</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nurture Relationships</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reach out regularly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Be vulnerable and authentic</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Show empathy and support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Make time for quality interactions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Be reliable and trustworthy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-blue-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">You Belong Here</h2>
          <p className="text-xl text-gray-600 mb-12">
            Loneliness is a temporary state, not a permanent condition. There are people who care about you and want to connect. Taking the first step toward connection is brave and worthwhile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Find Local Communities
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Connect with Support
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Feeling lonely doesn't mean you're alone. Connection is always possible.
          </p>
        </div>
      </section>
    </div>
  );
}
