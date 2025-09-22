import { useState } from 'react';

export default function SubstanceAbuseAddiction() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-orange-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Substance Abuse & Addiction
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding addiction as a medical condition, recognizing warning signs, and finding pathways to recovery and healing.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Condition</h3>
              <p className="text-gray-600">Addiction is a chronic brain disease, not a moral failing</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Common Issue</h3>
              <p className="text-gray-600">21 million Americans have at least one addiction</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recovery Possible</h3>
              <p className="text-gray-600">With proper treatment, recovery is achievable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about substance abuse and addiction</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'overview', icon: '📖', title: 'Overview', desc: 'Understanding addiction' },
              { id: 'signs', icon: '🚨', title: 'Warning Signs', desc: 'Recognizing addiction' },
              { id: 'types', icon: '💊', title: 'Types', desc: 'Different substances' },
              { id: 'causes', icon: '🧬', title: 'Risk Factors', desc: 'What leads to addiction' },
              { id: 'effects', icon: '💔', title: 'Health Effects', desc: 'Impact on body and mind' },
              { id: 'treatment', icon: '🏥', title: 'Treatment', desc: 'Recovery options' },
              { id: 'recovery', icon: '🌱', title: 'Recovery', desc: 'Living in recovery' },
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Understanding Addiction</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Addiction as a complex medical condition affecting the brain</p>
          </div>
          
          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">What is Addiction?</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Addiction is a chronic, relapsing brain disorder characterized by compulsive drug seeking and use, despite harmful consequences. It's considered a brain disease because drugs change the brain's structure and function.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Addiction affects the brain's reward, motivation, memory, and related circuitry, leading to biological, psychological, social, and spiritual manifestations.
                </p>
                <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Important:</strong> Addiction is not a choice or moral failing - it's a medical condition that requires professional treatment.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-orange-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Addiction Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">21M</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Americans Affected</p>
                      <p className="text-gray-600">have at least one addiction</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">10%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Receive Treatment</p>
                      <p className="text-gray-600">of those who need addiction treatment get it</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">50%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Genetic Factor</p>
                      <p className="text-gray-600">of addiction risk is genetic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addiction vs Use */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding the Spectrum</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Experimental Use</h4>
                  <p className="text-gray-600 mb-4">Trying substances out of curiosity, typically infrequent and in social settings.</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Limited frequency</li>
                    <li>• Social context</li>
                    <li>• No significant consequences</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Problematic Use</h4>
                  <p className="text-gray-600 mb-4">Regular use that begins to cause problems in daily life and relationships.</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Increased frequency</li>
                    <li>• Some negative consequences</li>
                    <li>• Difficulty controlling use</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Addiction</h4>
                  <p className="text-gray-600 mb-4">Compulsive use despite severe negative consequences, with loss of control.</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Compulsive use</li>
                    <li>• Severe consequences</li>
                    <li>• Loss of control</li>
                  </ul>
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Warning Signs</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Recognizing the signs of substance abuse and addiction</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Changes</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Loss of control over use</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Neglecting responsibilities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Risky behaviors</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Secretive or deceptive behavior</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continued use despite consequences</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Physical Signs</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Changes in appearance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Bloodshot or glazed eyes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sudden weight loss or gain</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tremors or shaking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Poor coordination</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Social Changes</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Isolation from family/friends</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>New friend groups</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Relationship problems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Loss of interest in activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Financial problems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-orange-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Recovery is Possible</h2>
          <p className="text-xl text-gray-600 mb-12">
            Addiction is a treatable condition. With the right support, treatment, and commitment, people can and do recover to live healthy, fulfilling lives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Find Treatment Options
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Get Support Now
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Seeking help for addiction is a sign of strength, not weakness.
          </p>
        </div>
      </section>
    </div>
  );
}
