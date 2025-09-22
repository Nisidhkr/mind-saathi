import { useState } from 'react';

export default function StigmaMentalHealthAwareness() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-purple-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Mental Health Stigma & Awareness
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Breaking down barriers, challenging misconceptions, and building a world where mental health is understood, accepted, and supported.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Barrier to Care</h3>
              <p className="text-gray-600">Stigma prevents 60% of people from seeking help</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Education Matters</h3>
              <p className="text-gray-600">Awareness reduces stigma and increases help-seeking</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Change Possible</h3>
              <p className="text-gray-600">Each person can help reduce stigma and increase awareness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about mental health stigma and awareness</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'overview', icon: '📖', title: 'Overview', desc: 'Understanding stigma' },
              { id: 'types', icon: '🔍', title: 'Types of Stigma', desc: 'Different forms of discrimination' },
              { id: 'myths', icon: '❌', title: 'Myths vs Facts', desc: 'Debunking misconceptions' },
              { id: 'impact', icon: '💔', title: 'Impact', desc: 'Effects of stigma' },
              { id: 'barriers', icon: '🚧', title: 'Barriers to Care', desc: 'What prevents help-seeking' },
              { id: 'awareness', icon: '💡', title: 'Building Awareness', desc: 'Increasing understanding' },
              { id: 'advocacy', icon: '📢', title: 'Advocacy', desc: 'Speaking up for change' },
              { id: 'action', icon: '🎯', title: 'Taking Action', desc: 'How to make a difference' }
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Understanding Mental Health Stigma</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Breaking down the barriers that prevent people from seeking help</p>
          </div>
          
          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">What is Mental Health Stigma?</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Mental health stigma refers to negative attitudes, beliefs, and behaviors toward people with mental health conditions. It involves stereotypes, prejudice, and discrimination that can be deeply harmful.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Stigma creates barriers to treatment, employment, housing, and social relationships. It can lead to shame, isolation, and reluctance to seek help when it's needed most.
                </p>
                <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Remember:</strong> Mental health conditions are medical conditions, not character flaws or personal weaknesses.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-purple-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Stigma Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">60%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Avoid Treatment</p>
                      <p className="text-gray-600">of people with mental illness don't seek help due to stigma</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">90%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Experience Stigma</p>
                      <p className="text-gray-600">of people with mental health conditions report discrimination</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">75%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Workplace Impact</p>
                      <p className="text-gray-600">report negative effects on work or career</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Stigma Section */}
      <section id="types" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Types of Stigma</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding different forms of mental health discrimination</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Public Stigma</h3>
              <p className="text-gray-600 mb-4">Negative attitudes and beliefs held by the general public toward people with mental health conditions.</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stereotypes and misconceptions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fear and avoidance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Discrimination in employment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🪞</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Self-Stigma</h3>
              <p className="text-gray-600 mb-4">When individuals internalize negative beliefs about mental illness and apply them to themselves.</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Shame and self-blame</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reduced self-esteem</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avoiding treatment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Institutional Stigma</h3>
              <p className="text-gray-600 mb-4">Systemic policies and practices that limit opportunities for people with mental health conditions.</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Limited insurance coverage</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Inadequate funding for services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Discriminatory policies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Myths vs Facts Section */}
      <section id="myths" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Myths vs Facts</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Debunking common misconceptions about mental health</p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                myth: "Mental illness is a sign of weakness or character flaw",
                fact: "Mental illness is a medical condition caused by biological, psychological, and environmental factors - not personal weakness"
              },
              {
                myth: "People with mental illness are violent and dangerous",
                fact: "People with mental illness are more likely to be victims of violence than perpetrators. Most are not violent at all"
              },
              {
                myth: "Mental health problems are rare",
                fact: "1 in 4 people will experience a mental health condition in their lifetime. It's very common"
              },
              {
                myth: "Therapy and medication don't work",
                fact: "Mental health treatments are highly effective. 80-90% of people who receive treatment show significant improvement"
              },
              {
                myth: "People with mental illness can't work or be productive",
                fact: "With proper support and treatment, people with mental illness can be highly successful in their careers and personal lives"
              }
            ].map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-8 rounded-3xl shadow-lg border border-red-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-200 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-800">MYTH</h3>
                  </div>
                  <p className="text-gray-700">{item.myth}</p>
                </div>
                
                <div className="bg-green-50 p-8 rounded-3xl shadow-lg border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800">FACT</h3>
                  </div>
                  <p className="text-gray-700">{item.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taking Action Section */}
      <section id="action" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">How You Can Help</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Everyone can play a role in reducing stigma and increasing awareness</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🗣️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Speak Up</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Challenge stigmatizing language</li>
                <li>• Share accurate information</li>
                <li>• Correct misconceptions</li>
                <li>• Use person-first language</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Educate Yourself</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Learn about mental health</li>
                <li>• Read personal stories</li>
                <li>• Attend awareness events</li>
                <li>• Follow mental health advocates</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Show Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Listen without judgment</li>
                <li>• Offer practical help</li>
                <li>• Include people in activities</li>
                <li>• Respect privacy and boundaries</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📢</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advocate</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Support mental health policies</li>
                <li>• Volunteer with organizations</li>
                <li>• Share your story (if comfortable)</li>
                <li>• Promote workplace wellness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-purple-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Be Part of the Change</h2>
          <p className="text-xl text-gray-600 mb-12">
            Together, we can create a world where mental health is understood, accepted, and supported. Every conversation, every act of kindness, and every effort to educate makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Join the Movement
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Share Your Story
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Mental health is health. Everyone deserves compassion, understanding, and support.
          </p>
        </div>
      </section>
    </div>
  );
}
