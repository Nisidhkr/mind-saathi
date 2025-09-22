import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              ABOUT MIND SAATHI
            </h1>
            <div className="w-24 h-1 bg-perylene-600 mx-auto mb-12 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              A comprehensive digital mental health platform designed specifically for higher education students
            </p>
          </div>

          {/* Problem Statement */}
          <div className="mb-20">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                The Challenge We're Addressing
              </h2>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Mental Health Crisis</h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="text-lg leading-relaxed">
                      Mental health issues among college students have significantly increased in recent years, 
                      including anxiety, depression, burnout, sleep disorders, academic stress, and social isolation.
                    </p>
                    <p className="text-lg leading-relaxed">
                      However, there is a major gap in the availability, accessibility, and stigma-free delivery 
                      of mental health support in most higher education institutions, especially in rural and 
                      semi-urban colleges.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Problems</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-perylene-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-600">Absence of structured, scalable, and stigma-free psychological intervention system</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-perylene-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-600">Lack of early detection and preventive mental health tools</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-perylene-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-600">Under-utilization of college counselling centres due to fear of judgment</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-perylene-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-600">No centralized mental health monitoring or data-driven policy framework</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Solution */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
              Our Digital Solution
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-perylene-600">AI</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-guided First-Aid Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Interactive chat system that offers coping strategies and refers students to professionals when needed.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-perylene-600">📅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Confidential Booking System</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure appointment booking with on-campus counsellors or mental health helplines.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-perylene-600">📚</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Resource Hub</h3>
                <p className="text-gray-600 leading-relaxed">
                  Videos, relaxation audio, and mental wellness guides in regional languages.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-perylene-600">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Peer Support Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  Moderated peer-to-peer support forum with trained student volunteers.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-perylene-600">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Anonymous data analytics for authorities to recognize trends and plan interventions.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-perylene-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-perylene-600">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mental Health Screening</h3>
                <p className="text-gray-600 leading-relaxed">
                  Standardized psychological screening tools (PHQ-9, GAD-7, GHQ) for early detection.
                </p>
              </div>
            </div>
          </div>

          {/* Why We're Different */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              Why Mind Saathi is Different
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Limitations</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">Most available apps are generic, Western-oriented, or paid</p>
                  <p className="text-lg">They don't integrate regional cultural context and language</p>
                  <p className="text-lg">No institution-specific customization</p>
                  <p className="text-lg">Lack of offline support mapping with college counsellors</p>
                  <p className="text-lg">No real-time analytics for administrators</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Advantages</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">Tailored for Indian higher education context</p>
                  <p className="text-lg">Regional language support and cultural sensitivity</p>
                  <p className="text-lg">Institution-specific customization and branding</p>
                  <p className="text-lg">Direct integration with college counselling services</p>
                  <p className="text-lg">Comprehensive analytics dashboard for administrators</p>
                  <p className="text-lg">Open-source solution for maximum accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
