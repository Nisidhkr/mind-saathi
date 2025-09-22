import { useState } from 'react';

export default function BodyImageEatingDisorders() {
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-pink-100/40 to-[#1B674D]/10 rounded-full opacity-25 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
            Body Image & Eating Disorders
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
            Understanding the complex relationship between body image and eating behaviors, and finding pathways to healing and self-acceptance.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mental Health Conditions</h3>
              <p className="text-gray-600">Eating disorders are serious mental health conditions</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Highest Mortality Rate</h3>
              <p className="text-gray-600">Among all mental health disorders</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recovery Possible</h3>
              <p className="text-gray-600">With proper treatment and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Navigation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Navigate through comprehensive information about body image and eating disorders</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'overview', icon: '📖', title: 'Overview', desc: 'Understanding eating disorders' },
              { id: 'types', icon: '🔍', title: 'Types', desc: 'Different eating disorders' },
              { id: 'signs', icon: '⚠️', title: 'Warning Signs', desc: 'Recognizing symptoms' },
              { id: 'causes', icon: '🧬', title: 'Risk Factors', desc: 'What contributes to disorders' },
              { id: 'body-image', icon: '🪞', title: 'Body Image', desc: 'Relationship with self-perception' },
              { id: 'treatment', icon: '🏥', title: 'Treatment', desc: 'Recovery approaches' },
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Understanding Eating Disorders</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Complex mental health conditions affecting eating behaviors and body image</p>
          </div>
          
          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">What are Eating Disorders?</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Eating disorders are serious mental health conditions characterized by persistent disturbances in eating behaviors, thoughts, and emotions. They often involve preoccupation with food, body weight, and shape.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  These disorders can affect people of all ages, genders, ethnicities, and socioeconomic backgrounds. They have the highest mortality rate of any mental health disorder.
                </p>
                <div className="bg-pink-50 p-6 rounded-2xl border-l-4 border-[#1B674D]">
                  <p className="text-gray-700 font-medium">
                    <strong>Important:</strong> Eating disorders are not about vanity, willpower, or choice - they are serious medical conditions requiring professional treatment.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B674D]/5 to-pink-50/30 p-10 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-3xl font-bold text-[#1B674D] mb-8">Key Statistics</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">30M</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Americans Affected</p>
                      <p className="text-gray-600">will have an eating disorder in their lifetime</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">13</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Average Age</p>
                      <p className="text-gray-600">of onset for eating disorders</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B674D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Death Every Hour</p>
                      <p className="text-gray-600">from eating disorder complications</p>
                    </div>
                  </div>
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Types of Eating Disorders</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding different eating disorder presentations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚫</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Anorexia Nervosa</h3>
              <p className="text-gray-600 mb-4">Restriction of food intake leading to significantly low body weight, intense fear of weight gain, and distorted body image.</p>
              <div className="bg-red-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Key Features:</strong> Severe food restriction, weight loss, body image distortion</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bulimia Nervosa</h3>
              <p className="text-gray-600 mb-4">Recurrent episodes of binge eating followed by compensatory behaviors like vomiting, laxatives, or excessive exercise.</p>
              <div className="bg-orange-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Key Features:</strong> Binge-purge cycles, normal weight, secrecy</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Binge Eating Disorder</h3>
              <p className="text-gray-600 mb-4">Recurrent episodes of eating large amounts of food in short periods, accompanied by feelings of loss of control and distress.</p>
              <div className="bg-purple-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Key Features:</strong> Binge episodes, no purging, weight gain</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🥗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ARFID</h3>
              <p className="text-gray-600 mb-4">Avoidant/Restrictive Food Intake Disorder involves limited food intake not related to body image, leading to nutritional deficiencies.</p>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Key Features:</strong> Food avoidance, nutritional deficiency, not body image related</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🍎</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pica</h3>
              <p className="text-gray-600 mb-4">Persistent eating of non-food substances for at least one month, inappropriate for developmental level.</p>
              <div className="bg-green-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Key Features:</strong> Eating non-food items, developmental considerations</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rumination Disorder</h3>
              <p className="text-gray-600 mb-4">Repeated regurgitation of food that is then re-chewed, re-swallowed, or spit out, occurring for at least one month.</p>
              <div className="bg-pink-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-700"><strong>Key Features:</strong> Food regurgitation, re-chewing, typically in infancy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Image Section */}
      <section id="body-image" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Body Image Connection</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Understanding the relationship between body perception and eating behaviors</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-3xl shadow-lg border border-red-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-200 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Negative Body Image</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Distorted perception of body size/shape</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Shame and anxiety about body</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Belief that body determines worth</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Obsessive focus on perceived flaws</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avoidance of body-exposing situations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-8 rounded-3xl shadow-lg border border-green-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-200 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Positive Body Image</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Realistic perception of body</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Appreciation for body's capabilities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comfort and confidence in body</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Focus on health over appearance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Rejection of unrealistic beauty standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#1B674D]/5 to-pink-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Recovery is Possible</h2>
          <p className="text-xl text-gray-600 mb-12">
            Eating disorders are serious but treatable conditions. With proper care, support, and treatment, full recovery is possible. You deserve to have a healthy relationship with food and your body.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-[#1B674D] text-white text-lg font-semibold rounded-2xl hover:bg-[#1B674D]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Find Treatment Centers
            </button>
            <button className="px-10 py-4 border-2 border-[#1B674D] text-[#1B674D] text-lg font-semibold rounded-2xl hover:bg-[#1B674D] hover:text-white transition-all duration-300">
              Get Support Now
            </button>
          </div>
          <p className="text-sm mt-8 text-gray-500">
            Remember: Your worth is not determined by your weight, shape, or what you eat.
          </p>
        </div>
      </section>
    </div>
  );
}
