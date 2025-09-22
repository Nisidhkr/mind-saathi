import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function ResourceHub() {
  const resources = [
    {
      id: "anxiety",
      title: "Anxiety Disorders",
      description: "Understanding anxiety disorders, their symptoms, and effective treatment approaches.",
      icon: "😰",
      color: "orange"
    },
    {
      id: "depression",
      title: "Depression",
      description: "Comprehensive guide to depression, its types, symptoms, and treatment options.",
      icon: "💙",
      color: "blue"
    },
    {
      id: "stress-burnout",
      title: "Stress & Burnout",
      description: "Managing stress and preventing burnout in daily life and work environments.",
      icon: "😵",
      color: "red"
    },
    {
      id: "low-self-esteem",
      title: "Low Self-Esteem",
      description: "Building confidence and improving self-worth through practical strategies.",
      icon: "🪞",
      color: "purple"
    },
    {
      id: "loneliness",
      title: "Loneliness",
      description: "Addressing feelings of loneliness and building meaningful connections.",
      icon: "😔",
      color: "indigo"
    },
    {
      id: "social-isolation",
      title: "Social Isolation",
      description: "Overcoming social isolation and developing healthy relationships.",
      icon: "🏠",
      color: "teal"
    },
    {
      id: "body-image",
      title: "Body Image",
      description: "Developing a healthy relationship with your body and self-image.",
      icon: "🪞",
      color: "pink"
    },
    {
      id: "body-image-eating-disorders",
      title: "Body Image & Eating Disorders",
      description: "Understanding the connection between body image and eating disorders.",
      icon: "🍽️",
      color: "rose"
    },
    {
      id: "bullying-cyberbullying",
      title: "Bullying & Cyberbullying",
      description: "Dealing with bullying and cyberbullying situations effectively.",
      icon: "🛡️",
      color: "amber"
    },
    {
      id: "substance-abuse-addiction",
      title: "Substance Abuse & Addiction",
      description: "Understanding addiction and pathways to recovery and support.",
      icon: "🚫",
      color: "gray"
    },
    {
      id: "suicide-prevention-self-harm",
      title: "Suicide Prevention & Self-Harm",
      description: "Crisis support, prevention strategies, and resources for help.",
      icon: "🆘",
      color: "red"
    },
    {
      id: "stigma-mental-health-awareness",
      title: "Mental Health Stigma & Awareness",
      description: "Breaking down stigma and promoting mental health awareness.",
      icon: "🧠",
      color: "green"
    },
    {
      id: "loneliness-social-isolation",
      title: "Loneliness & Social Isolation",
      description: "Comprehensive guide to overcoming loneliness and social isolation.",
      icon: "🤝",
      color: "cyan"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      red: "bg-red-100 text-red-600 border-red-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      teal: "bg-teal-100 text-teal-600 border-teal-200",
      pink: "bg-pink-100 text-pink-600 border-pink-200",
      rose: "bg-rose-100 text-rose-600 border-rose-200",
      amber: "bg-amber-100 text-amber-600 border-amber-200",
      gray: "bg-gray-100 text-gray-600 border-gray-200",
      green: "bg-green-100 text-green-600 border-green-200",
      cyan: "bg-cyan-100 text-cyan-600 border-cyan-200"
    };
    return colorMap[color] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-12 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Mental Health Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides and resources to support your mental wellness journey. 
            Each resource provides evidence-based information, practical strategies, and professional insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              to={`/resources/${resource.id}`}
              className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${getColorClasses(resource.color)}`}>
                <span className="text-2xl">{resource.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-perylene-700 transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {resource.description}
              </p>
              <div className="flex items-center text-perylene-600 font-medium group-hover:text-perylene-700 transition-colors">
                <span>Learn More</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-perylene-50 to-blue-50 rounded-3xl p-8 border border-perylene-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Support?</h2>
            <p className="text-gray-600 mb-6">
              If you're experiencing a mental health crisis, please reach out for immediate help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:988"
                className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                Crisis Hotline: 988
              </a>
              <a
                href="tel:911"
                className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors"
              >
                Emergency: 911
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


