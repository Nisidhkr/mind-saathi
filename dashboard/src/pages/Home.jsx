import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section - Immersive Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Clean White Background */}
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>
        
        {/* Subtle Accent Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gray-100 to-gray-200 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full opacity-10 blur-2xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-none mb-8 tracking-tight">
            MIND
            <br />
            <span className="text-perylene-600">SAATHI</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-light max-w-4xl mx-auto mb-12 leading-relaxed">
            Your <span className="font-semibold text-gray-800">Mental Wellness</span> Companion
            <br />
            <span className="text-lg md:text-xl text-gray-500">Supporting College Students Through Every Challenge</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button onClick={() => navigate("/auth")} className="px-12 py-6 bg-perylene-600 text-white text-xl font-semibold rounded-2xl hover:bg-perylene-700 transition-all duration-300 shadow-lg">
              Start Your Journey
            </button>
            <button 
              onClick={() => document.getElementById('assessment-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 bg-white border-2 border-gray-300 text-white text-xl font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg"
            >
              Explore Resources
            </button>
          </div>
          
          {/* Daily Quote Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg">
              <div className="text-center">
                <blockquote className="text-2xl md:text-3xl font-light text-gray-800 italic leading-relaxed mb-6">
                  "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
                </blockquote>
                <cite className="text-lg text-gray-600 font-medium">— Daily Inspiration</cite>
                <div className="mt-4 text-sm text-gray-500">
                  Quote changes daily • Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Clean White Background */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              OUR MISSION
            </h2>
            <div className="w-24 h-1 bg-perylene-600 mx-auto mb-12 rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Empowering College Students Through
                <span className="text-perylene-600"> Mental Wellness</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We understand the unique challenges college students face. Our platform provides 
                comprehensive mental health support, resources, and community connections to help 
                you thrive academically and personally.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-3 h-3 bg-perylene-600 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700 font-medium">24/7 Crisis Support</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-3 h-3 bg-perylene-600 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700 font-medium">Peer Support Networks</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-3 h-3 bg-perylene-600 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700 font-medium">Professional Counseling</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-perylene-50 to-perylene-100 rounded-3xl flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Mental wellness support" 
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - White Background */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              OUR SERVICES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mental wellness support tailored for college life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
              <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-perylene-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-perylene-600">A</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Academic Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Stress management, study techniques, and academic counseling to help you excel in your studies.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
              <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-perylene-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-perylene-600">P</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Peer Counseling</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with trained peer counselors who understand your college experience.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
              <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-perylene-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-perylene-600">H</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Professional Help</h3>
              <p className="text-gray-600 leading-relaxed">
                Access to licensed therapists and mental health professionals when you need them most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Assessment Section */}
      <section id="assessment-section" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              MENTAL HEALTH ASSESSMENT
            </h2>
            <div className="w-24 h-1 bg-perylene-600 mx-auto mb-12 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a quick self-assessment to understand your mental wellness better
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* PHQ-9 Section */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-gray-600">PHQ</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">PHQ-9</h3>
                <p className="text-gray-600">Patient Health Questionnaire</p>
                <p className="text-sm text-gray-500 mt-2">Depression Screening</p>
              </div>
                <div className="space-y-4">
                  <div className="text-sm text-gray-700 font-medium">
                    Over the last 2 weeks, how often have you been bothered by:
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span>Little interest or pleasure in doing things</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span>Feeling down, depressed, or hopeless</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span>Trouble falling or staying asleep</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                  </div>
                  <a href="/assessment/phq-9" className="block mt-auto">
                    <button className="w-full py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all duration-200">
                      Take PHQ-9 Assessment
                    </button>
                  </a>
                </div>
            </div>

            {/* GAD-7 Section */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-gray-600">GAD</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">GAD-7</h3>
                <p className="text-gray-600">Generalized Anxiety Disorder</p>
                <p className="text-sm text-gray-500 mt-2">Anxiety Screening</p>
              </div>
                <div className="space-y-4">
                  <div className="text-sm text-gray-700 font-medium">
                    Over the last 2 weeks, how often have you been bothered by:
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span>Feeling nervous, anxious, or on edge</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span>Not being able to stop worrying</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span>Trouble relaxing</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                  </div>
                  <a href="/assessment/gad-7" className="block mt-auto">
                    <button className="w-full py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all duration-200">
                      Take GAD-7 Assessment
                    </button>
                  </a>
                </div>
            </div>

            {/* GHQ Section */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-gray-600">GHQ</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">GHQ-12</h3>
                <p className="text-gray-600">General Health Questionnaire</p>
                <p className="text-sm text-gray-500 mt-2">General Well-being</p>
              </div>
                <div className="space-y-4">
                  <div className="text-sm text-gray-700 font-medium">
                    Over the last 2 weeks, how often have you been bothered by:
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="max-w-[75%] truncate whitespace-nowrap">Enjoy your day-to-day activities</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="max-w-[75%] truncate whitespace-nowrap">Capable of making decisions</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="max-w-[75%] truncate whitespace-nowrap">Feeling reasonably happy</span>
                      <span className="text-gray-600">0-3</span>
                    </div>
                  </div>
                  <a href="/assessment/ghq-12" className="block mt-auto">
                    <button className="w-full py-3 bg-perylene-600 text-white font-semibold rounded-xl hover:bg-perylene-700 transition-all duration-200">
                      Take GHQ-12 Assessment
                    </button>
                  </a>
                </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Note:</span> These assessments are for informational purposes only and should not replace professional medical advice.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
