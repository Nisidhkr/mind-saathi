import { useState } from 'react';

export default function Depression() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-blue-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#1B674D]/5 to-blue-50/30 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Depression
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Depression is a common mental health condition that causes a persistent feeling of sadness and changes in how you think, sleep, eat and act. There are several different types. Depression is treatable — usually with talk therapy, medication or both.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Common Condition</h3>
              <p className="text-gray-600">Affects about 5% of adults globally, with higher rates in women than men</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Highly Treatable</h3>
              <p className="text-gray-600">80-90% of people with depression respond well to treatment</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Condition</h3>
              <p className="text-gray-600">A real medical condition, not a sign of weakness or character flaw</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about depression</p>
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
              <p className="text-sm text-gray-600">Understanding depression basics</p>
            </button>
            <button 
              onClick={() => scrollToSection('symptoms')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Signs & Symptoms</h3>
              <p className="text-sm text-gray-600">Recognizing the warning signs</p>
            </button>
            <button 
              onClick={() => scrollToSection('causes')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Causes</h3>
              <p className="text-sm text-gray-600">What leads to depression</p>
            </button>
            <button 
              onClick={() => scrollToSection('diagnosis')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Diagnosis</h3>
              <p className="text-sm text-gray-600">Professional assessment tools</p>
            </button>
            <button 
              onClick={() => scrollToSection('treatment')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Treatment</h3>
              <p className="text-sm text-gray-600">Effective treatment options</p>
            </button>
            <button 
              onClick={() => scrollToSection('outlook')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Outlook</h3>
              <p className="text-sm text-gray-600">Recovery and prognosis</p>
            </button>
            <button 
              onClick={() => scrollToSection('prevention')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Prevention</h3>
              <p className="text-sm text-gray-600">Protective strategies</p>
            </button>
            <button 
              onClick={() => scrollToSection('living')}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="w-12 h-12 bg-[#1B674D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1B674D]/20 transition-colors">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Living With</h3>
              <p className="text-sm text-gray-600">Daily management tips</p>
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What is Depression?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">A comprehensive understanding of this common mental health condition</p>
          </div>
          
          <div className="space-y-16">
            {/* Main Definition */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">What is Depression?</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Depression causes feelings of sadness and/or a loss of interest in activities you once enjoyed.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  It can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home. Depression symptoms can vary from mild to severe.
                </p>
                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Important:</strong> Depression is different from sadness or grief. It's a persistent condition that typically lasts at least two weeks and significantly impacts daily functioning.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-blue-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Depression Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">5%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Global Prevalence</p>
                      <p className="text-gray-600">Affects about 5% of adults worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">2x</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Gender Difference</p>
                      <p className="text-gray-600">Women are twice as likely to be affected as men</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">90%</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Treatment Success</p>
                      <p className="text-gray-600">Up to 90% of people respond well to treatment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Depression */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Depression</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Major Depression</h4>
                  <p className="text-gray-600">The most common form, involving persistent sad mood and loss of interest in activities for at least 2 weeks.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Persistent Depression</h4>
                  <p className="text-gray-600">A chronic form lasting 2 years or more, with symptoms that may be less severe but longer-lasting.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Bipolar Depression</h4>
                  <p className="text-gray-600">Depressive episodes that alternate with periods of mania or hypomania in bipolar disorder.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Seasonal Depression</h4>
                  <p className="text-gray-600">Depression that occurs during specific seasons, typically fall and winter months.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Postpartum Depression</h4>
                  <p className="text-gray-600">Depression that occurs after childbirth, affecting both mothers and sometimes fathers.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Psychotic Depression</h4>
                  <p className="text-gray-600">Severe depression accompanied by psychotic symptoms like hallucinations or delusions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs and Symptoms Section */}
      <section id="symptoms" className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Signs & Symptoms</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Recognizing the warning signs is the first step toward getting help</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">😔</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Emotional Symptoms</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Persistent sadness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Feeling hopeless or helpless</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Loss of interest in activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Irritability or restlessness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Feelings of guilt or worthlessness</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cognitive Symptoms</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Difficulty concentrating</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Problems making decisions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Memory problems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Negative thought patterns</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Thoughts of death or suicide</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Physical Symptoms</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Changes in sleep patterns</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Appetite changes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fatigue or low energy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Unexplained aches and pains</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1B674D] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Slowed movements or speech</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section id="causes" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Causes</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border-l-4 border-[#1B674D]">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Biological Factors</h3>
                <p className="text-gray-600">
                  Brain chemistry imbalances, genetics, and hormonal changes can contribute to depression. 
                  Family history of depression increases the risk.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border-l-4 border-[#1B674D]">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Environmental Factors</h3>
                <p className="text-gray-600">
                  Stressful life events, trauma, loss of a loved one, job loss, or difficult relationships 
                  can trigger depression episodes.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border-l-4 border-[#1B674D]">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Psychological Factors</h3>
                <p className="text-gray-600">
                  Low self-esteem, negative thinking patterns, perfectionism, and certain personality 
                  traits may increase vulnerability to depression.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border-l-4 border-[#1B674D]">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Medical Conditions</h3>
                <p className="text-gray-600">
                  Chronic illnesses, certain medications, substance abuse, and other mental health 
                  conditions can lead to or worsen depression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnosis and Tests Section */}
      <section id="diagnosis" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#1B674D] mb-12 text-center">Diagnosis and Tests</h2>
          
          <div className="bg-[#1B674D] p-8 rounded-xl">
            <p className="text-white mb-6 text-center text-lg">
              Healthcare providers use various tools and assessments to diagnose depression
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1B674D]">PHQ</span>
                </div>
                <h3 className="font-semibold text-white mb-2">PHQ-9</h3>
                <p className="text-sm text-white/90">Patient Health Questionnaire for depression screening</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1B674D]">GAD</span>
                </div>
                <h3 className="font-semibold text-white mb-2">GAD-7</h3>
                <p className="text-sm text-white/90">Generalized Anxiety Disorder assessment</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1B674D]">GHQ</span>
                </div>
                <h3 className="font-semibold text-white mb-2">GHQ-12</h3>
                <p className="text-sm text-white/90">General Health Questionnaire for overall well-being</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management and Treatment Section */}
      <section id="treatment" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Management and Treatment</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#1B674D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Medication</h3>
              <p className="text-gray-600 text-sm">
                Antidepressants can help balance brain chemistry and improve symptoms when prescribed by a healthcare provider.
              </p>
            </div>
            
            <div className="bg-white p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#1B674D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗣️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Therapy</h3>
              <p className="text-gray-600 text-sm">
                Cognitive behavioral therapy, interpersonal therapy, and other forms of counseling are highly effective.
              </p>
            </div>
            
            <div className="bg-white p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#1B674D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle Changes</h3>
              <p className="text-gray-600 text-sm">
                Regular exercise, healthy diet, good sleep habits, and stress management support recovery.
              </p>
            </div>
            
            <div className="bg-white p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#1B674D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Support System</h3>
              <p className="text-gray-600 text-sm">
                Family, friends, support groups, and peer counseling provide crucial emotional support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outlook/Prognosis Section */}
      <section id="outlook" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#1B674D] mb-8 text-center">Outlook / Prognosis</h2>
          
          <div className="bg-[#1B674D] p-8 rounded-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Recovery is Possible</h3>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                With proper treatment, most people with depression can recover and lead fulfilling lives. 
                The key is seeking help early and following through with treatment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">80-90%</div>
                <p className="text-white/90">of people respond well to treatment</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">6-8 weeks</div>
                <p className="text-white/90">typical time to see improvement</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">Early</div>
                <p className="text-white/90">intervention leads to better outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section id="prevention" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Prevention</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Protective Factors</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Maintain strong social connections and relationships</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Practice stress management and relaxation techniques</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Maintain a healthy lifestyle with regular exercise</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Get adequate sleep and maintain good sleep hygiene</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Intervention</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Seek help early when experiencing symptoms</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Learn to recognize your personal warning signs</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Build a support network before you need it</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600">Practice self-care and mindfulness regularly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Living With Depression Section */}
      <section id="living" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#1B674D] mb-12 text-center">Living With Depression</h2>
          
          <div className="bg-[#1B674D] p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Daily Management</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Follow your treatment plan consistently</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Maintain regular routines and schedules</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Practice self-care activities daily</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Monitor your mood and symptoms</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Building Support</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Stay connected with family and friends</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Join support groups or online communities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Communicate openly about your needs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Don't hesitate to ask for help when needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white text-[#1B674D]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#1B674D]">Need Help?</h2>
          <p className="text-xl mb-8 text-gray-600">
            If you're experiencing symptoms of depression, remember that help is available and recovery is possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-[#1B674D] text-white font-semibold hover:bg-[#1B674D]/90 transition-colors">
              Find a Healthcare Provider
            </button>
            <button className="px-8 py-3 border-2 border-[#1B674D] text-[#1B674D] font-semibold hover:bg-[#1B674D] hover:text-white transition-colors">
              Crisis Support Resources
            </button>
          </div>
          <p className="text-sm mt-6 text-gray-500">
            If you're having thoughts of suicide, please contact emergency services or a crisis helpline immediately.
          </p>
        </div>
      </section>
    </div>
  );
}
