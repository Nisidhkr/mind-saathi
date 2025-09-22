import { useState } from 'react';

export default function SuicidePreventionSelfHarm() {
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
            Suicide Prevention & Self-Harm
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding, preventing, and addressing suicidal thoughts and self-harm behaviors with compassion, support, and evidence-based interventions.
          </p>
          
          {/* Crisis Alert */}
          <div className="bg-red-100 border-2 border-red-300 p-6 rounded-3xl max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-red-800 mb-4">🚨 Crisis Support Available 24/7</h3>
            <p className="text-red-700 mb-4">If you're having thoughts of suicide or self-harm, please reach out immediately:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white p-4 rounded-2xl">
                <p className="font-bold text-red-800">National Suicide Prevention Lifeline</p>
                <p className="text-2xl font-bold text-red-600">988</p>
              </div>
              <div className="bg-white p-4 rounded-2xl">
                <p className="font-bold text-red-800">Crisis Text Line</p>
                <p className="text-xl font-bold text-red-600">Text HOME to 741741</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💜</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You Matter</h3>
              <p className="text-gray-600">Your life has value and meaning, even when it doesn't feel that way</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hope Exists</h3>
              <p className="text-gray-600">Suicidal feelings are temporary, but suicide is permanent</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Help Available</h3>
              <p className="text-gray-600">Professional support and treatment can help you feel better</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about suicide prevention and self-harm</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'overview', icon: '📖', title: 'Overview', desc: 'Understanding the issues' },
              { id: 'warning-signs', icon: '⚠️', title: 'Warning Signs', desc: 'Recognizing risk factors' },
              { id: 'self-harm', icon: '🩹', title: 'Self-Harm', desc: 'Understanding self-injury' },
              { id: 'prevention', icon: '🛡️', title: 'Prevention', desc: 'Protective strategies' },
              { id: 'crisis-response', icon: '🚨', title: 'Crisis Response', desc: 'Immediate help steps' },
              { id: 'support', icon: '💙', title: 'Support Others', desc: 'Helping someone in crisis' },
              { id: 'treatment', icon: '🏥', title: 'Treatment', desc: 'Professional help options' },
              { id: 'resources', icon: '📞', title: 'Resources', desc: 'Crisis lines and support' }
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Understanding Suicide & Self-Harm</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Compassionate information about serious mental health concerns</p>
          </div>
          
          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Suicide Prevention</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Suicide is a serious public health issue that affects individuals, families, and communities. It's often the result of untreated mental health conditions, overwhelming life circumstances, or intense emotional pain.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The good news is that suicide is preventable. With proper support, treatment, and intervention, people can overcome suicidal thoughts and go on to live fulfilling lives.
                </p>
                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Remember:</strong> Suicidal thoughts are a symptom of treatable conditions, not a character flaw or weakness.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-purple-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Key Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">2nd</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Leading Cause</p>
                      <p className="text-gray-600">of death among people aged 10-34</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">90%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Mental Health Link</p>
                      <p className="text-gray-600">of people who die by suicide have a mental health condition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">80%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Prevention Success</p>
                      <p className="text-gray-600">of people who receive help do not attempt suicide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-purple-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">You Are Not Alone</h2>
          <p className="text-xl text-gray-600 mb-12">
            If you're struggling with thoughts of suicide or self-harm, please know that help is available. Your life matters, and there are people who want to support you through this difficult time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Call 988 - Crisis Lifeline
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Find Local Support
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Crisis support is available 24/7, 365 days a year. You don't have to go through this alone.
          </p>
        </div>
      </section>
    </div>
  );
}
