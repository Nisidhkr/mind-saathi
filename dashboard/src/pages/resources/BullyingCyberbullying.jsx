import { useState } from 'react';

export default function BullyingCyberbullying() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-red-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#1B674D]/5 to-orange-50/30 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Bullying & Cyberbullying
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding, preventing, and addressing bullying in all its forms - from traditional bullying to digital harassment that can have lasting impacts on mental health.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Widespread Issue</h3>
              <p className="text-gray-600">1 in 5 students report being bullied at school</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Expansion</h3>
              <p className="text-gray-600">37% of young people have been bullied online</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Preventable</h3>
              <p className="text-gray-600">Bullying can be prevented with proper intervention and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about bullying and cyberbullying</p>
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
              <p className="text-sm text-gray-600">Understanding bullying types</p>
            </button>
            <button 
              onClick={() => scrollToSection('signs')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Warning Signs</h3>
              <p className="text-sm text-gray-600">Recognizing bullying behavior</p>
            </button>
            <button 
              onClick={() => scrollToSection('cyberbullying')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cyberbullying</h3>
              <p className="text-sm text-gray-600">Digital harassment and abuse</p>
            </button>
            <button 
              onClick={() => scrollToSection('effects')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">💔</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
              <p className="text-sm text-gray-600">Effects on mental health</p>
            </button>
            <button 
              onClick={() => scrollToSection('response')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Response</h3>
              <p className="text-sm text-gray-600">How to respond to bullying</p>
            </button>
            <button 
              onClick={() => scrollToSection('prevention')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🚫</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Prevention</h3>
              <p className="text-sm text-gray-600">Preventing bullying behavior</p>
            </button>
            <button 
              onClick={() => scrollToSection('bystander')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Bystander Action</h3>
              <p className="text-sm text-gray-600">How to help others</p>
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Understanding Bullying</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Recognizing aggressive behavior and its impact on individuals and communities</p>
          </div>
          
          <div className="space-y-16">
            {/* Main Definition */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">What is Bullying?</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Bullying is aggressive behavior that is intentional, repeated over time, and involves an imbalance of power. It can be physical, verbal, social, or digital (cyberbullying).
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The key elements are: intentional harm, repetition, and power imbalance. This distinguishes bullying from conflict or teasing between equals.
                </p>
                <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Important:</strong> Bullying is never acceptable and can have serious, long-lasting effects on mental health and wellbeing.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-red-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Bullying Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">20%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Students Bullied</p>
                      <p className="text-gray-600">of students report being bullied at school</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">37%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Cyberbullying</p>
                      <p className="text-gray-600">of young people have been bullied online</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">70%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Witness Bullying</p>
                      <p className="text-gray-600">of students have witnessed bullying</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Bullying */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Bullying</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-red-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">👊</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Physical Bullying</h4>
                  <p className="text-gray-600">Hitting, kicking, pushing, damaging property, or any form of physical aggression.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-orange-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🗣️</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Verbal Bullying</h4>
                  <p className="text-gray-600">Name-calling, insults, threats, inappropriate comments, or verbal harassment.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Social/Relational</h4>
                  <p className="text-gray-600">Exclusion, spreading rumors, public humiliation, or damaging relationships.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                  <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">📱</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cyberbullying</h4>
                  <p className="text-gray-600">Online harassment through social media, texts, emails, or digital platforms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cyberbullying Section */}
      <section id="cyberbullying" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Cyberbullying</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding digital harassment and its unique challenges</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Digital Platforms</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Social media harassment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Text message threats</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Online gaming abuse</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Email harassment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sharing private information</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Unique Challenges</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>24/7 accessibility</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Anonymous harassment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Viral spread of content</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Permanent digital footprint</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Difficulty escaping</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Protection Strategies</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Adjust privacy settings</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Block and report users</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Document evidence</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Don't respond to bullies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Seek adult support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-red-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Stand Up Against Bullying</h2>
          <p className="text-xl text-gray-600 mb-12">
            Everyone deserves to feel safe and respected. If you're experiencing bullying or witnessing it, remember that help is available and speaking up can make a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Report Bullying
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Get Support Now
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Bullying is never your fault, and you don't have to face it alone.
          </p>
        </div>
      </section>
    </div>
  );
}
