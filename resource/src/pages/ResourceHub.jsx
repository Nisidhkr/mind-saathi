// src/pages/ResourceHub.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Search } from "lucide-react";

export default function ResourceHub() {
  const [query, setQuery] = useState("");

  const resources = useMemo(() => ([
    {
      title: "Stress Relief",
      description: "Techniques to calm your mind and release tension through proven methods.",
      img: "/images/stress.png",
      to: "/stress-relief",
      imageClass: "h-56 group-hover:rotate-[0.5deg]",
      keywords: ["stress", "calm", "relax", "meditation", "mindfulness"],
    },
    {
      title: "Mood Lifter",
      description: "Quick activities and personalized tips to brighten your day.",
      img: "/images/mood.png",
      to: "/mood-lifter",
      imageClass: "h-72 group-hover:-rotate-[0.5deg]",
      keywords: ["mood", "happy", "joy", "positivity", "affirmations"],
    },
    {
      title: "Energy Boost",
      description: "Natural ways to increase your energy without caffeine.",
      img: "/images/energy.png",
      to: "/energy-boost",
      imageClass: "h-64 group-hover:rotate-[0.5deg]",
      keywords: ["energy", "vitality", "movement", "focus"],
    },
    {
      title: "Sleep Better",
      description: "Improve your sleep quality with proven tips and routines.",
      img: "/images/sleep.png",
      to: "/sleep-better",
      imageClass: "h-56 group-hover:-rotate-[0.5deg]",
      keywords: ["sleep", "rest", "insomnia", "bedtime", "relax"],
    },
    {
      title: "Focus & Concentration",
      description: "Enhance your focus for studying and completing important tasks.",
      img: "/images/focus.png",
      to: "/focus-concentration",
      imageClass: "h-72 group-hover:rotate-[0.5deg]",
      keywords: ["focus", "concentration", "study", "meditation", "clarity"],
    },
    {
      title: "Self-care & Relaxation",
      description: "Ideas and inspiration for taking care of your mental and physical self.",
      img: "/images/selfcare.png",
      to: "/self-care",
      imageClass: "h-64 group-hover:-rotate-[0.5deg]",
      keywords: ["self-care", "relaxation", "wellness", "routine"],
    },
    {
      title: "Breathing Exercises",
      description: "Simple breathing techniques to find calm in moments.",
      img: "/images/breathing.png",
      to: "/breathing",
      imageClass: "h-56 group-hover:rotate-[0.5deg]",
      keywords: ["breathing", "pranayama", "calm", "meditation", "anxiety"],
    },
    {
      title: "Positive Affirmations",
      description: "Boost your self-esteem and cultivate a positive mindset.",
      img: "/images/affirmations.png",
      to: null,
      imageClass: "h-64 group-hover:-rotate-[0.5deg]",
      keywords: ["affirmations", "positivity", "mindset"],
    },
  ]), []);

  const orderedResources = useMemo(() => {
    if (!query.trim()) return resources;
    const q = query.trim().toLowerCase();
    const score = (r) => {
      const inTitle = r.title.toLowerCase().includes(q) ? 2 : 0;
      const inKeywords = r.keywords.some(k => k.toLowerCase().includes(q)) ? 1 : 0;
      return inTitle + inKeywords;
    };
    return [...resources].sort((a, b) => score(b) - score(a));
  }, [query, resources]);

  const uniqueResources = useMemo(() => {
    const seen = new Set();
    return orderedResources.filter(r => {
      const key = r.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [orderedResources]);
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Clean White Background with Subtle Gradients */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>
      
      {/* Subtle Accent Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gray-100 to-gray-200 rounded-full opacity-15 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full opacity-10 blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-perylene-600 rounded-2xl flex items-center justify-center">
                <HeartPulse className="text-white w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-gray-900">MIND SAATHI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-lg font-medium text-gray-600 hover:text-perylene-600 transition-colors duration-200">
                Home
              </Link>
              <Link
                to="/resources"
                className="text-lg font-semibold text-perylene-600 border-b-2 border-perylene-600 pb-1"
              >
                Resources
              </Link>
              <Link to="/chat" className="text-lg font-medium text-gray-600 hover:text-perylene-600 transition-colors duration-200">
                Chat
              </Link>
              <Link
                to="/dashboard"
                className="text-lg font-medium text-gray-600 hover:text-perylene-600 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link to="/profile" className="text-lg font-medium text-gray-600 hover:text-perylene-600 transition-colors duration-200">
                Profile
              </Link>
            </div>
          </nav>
        </header>

        {/* Removed the previous hero/label section as requested */}

        {/* Search inline top-right of resources section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-6">
              <div className="mr-auto text-left">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">Explore<br />resources</h2>
                <p className="text-2xl text-gray-600 mt-2">Gentle, uplifting tools to support your journey</p>
              </div>
              <div className="w-full max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find what you need… try ‘meditation’"
                  className="w-full py-3 pl-11 pr-4 text-base text-gray-700 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-perylene-400 focus:border-perylene-400 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resource Grid */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* 1 Stress Relief */}
              {uniqueResources.map((r, idx) => (
                r.to ? (
                  <Link
                    key={r.title + idx}
                    to={r.to}
                    className="card no-underline flex flex-col overflow-hidden group hover:-translate-y-1.5 hover:shadow-elevated transition-transform duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={r.img}
                        alt={r.title}
                        className={`w-full ${r.imageClass} object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-500 ease-out`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-perylene-800">{r.title}</h3>
                      <p className="text-gray-600 flex-grow mb-6 leading-relaxed">
                        {r.description}
                      </p>
                      <span className="font-semibold text-perylene-600 group-hover:text-perylene-700 mt-auto flex items-center">
                        Explore Resources →
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={r.title + idx}
                    className="card transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-elevated flex flex-col overflow-hidden group cursor-pointer"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={r.img}
                        alt={r.title}
                        className={`w-full ${r.imageClass} object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-500 ease-out`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-perylene-800">
                        {r.title}
                      </h3>
                      <p className="text-gray-600 flex-grow mb-6 leading-relaxed">
                        {r.description}
                      </p>
                      <span className="font-semibold text-perylene-600 group-hover:text-perylene-700 mt-auto flex items-center">
                        Coming Soon →
                      </span>
                    </div>
                  </div>
                )
              ))}

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
