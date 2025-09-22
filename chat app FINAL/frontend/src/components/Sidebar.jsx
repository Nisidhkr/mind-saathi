import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ onSelectGroup }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching groups from:", api.defaults.baseURL + "/groups");
        const res = await api.get("/groups");
        console.log("✅ Groups fetched successfully:", res.data);
        setGroups(res.data);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching groups:", err);
        setError(err.message || "Failed to load groups");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  // Function to get appropriate icon for group name
  const getGroupIcon = (groupName) => {
    const name = groupName.toLowerCase();
    
    if (name.includes('announcement') || name.includes('news')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.894A1 1 0 0018 16V3z" clipRule="evenodd"/>
        </svg>
      );
    }
    
    if (name.includes('general') || name.includes('discussion') || name.includes('chat')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
        </svg>
      );
    }
    
    if (name.includes('tech') || name.includes('development') || name.includes('coding')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
        </svg>
      );
    }
    
    if (name.includes('wellness') || name.includes('health') || name.includes('mental')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
        </svg>
      );
    }
    
    if (name.includes('off') || name.includes('topic') || name.includes('random') || name.includes('fun')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"/>
        </svg>
      );
    }
    
    // Default icon for other groups
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
      </svg>
    );
  };

  return (
    <div className={`w-80 border-r flex flex-col shadow-lg transition-colors duration-300 ${
      isDarkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-200"
    }`}>
      <div className={`px-8 py-6 border-b text-white transition-colors duration-300 ${
        isDarkMode 
          ? "border-gray-700 bg-gradient-to-r from-gray-700 to-gray-800" 
          : "border-gray-200 bg-gradient-to-r from-perylene-600 to-perylene-600"
      }`}>
        <h2 className="font-bold text-2xl mb-1">Chat Groups</h2>
        <p className={`text-sm font-light transition-colors duration-300 ${
          isDarkMode ? "text-gray-300" : "text-perylene-100"
        }`}>Choose a safe space to connect</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* Loading State */}
        {loading && (
          <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p>Loading groups...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`text-center py-8 ${isDarkMode ? "text-red-400" : "text-red-600"}`}>
            <p>❌ {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Groups List */}
        {!loading && !error && (
          <ul className="space-y-4">
            {groups.length === 0 ? (
              <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <p>No groups available</p>
              </div>
            ) : (
              groups.map((group) => (
                <li
                  key={group._id}
                  className={`relative p-5 cursor-pointer transition-all duration-300 border rounded-2xl group overflow-hidden ${
                    isDarkMode 
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600" 
                      : "border-gray-200 hover:border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
                  } hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
                  onClick={() => onSelectGroup(group)}
                >
                  {/* Background gradient overlay on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" 
                      : "bg-gradient-to-r from-perylene-500/10 to-perylene-600/10"
                  }`}></div>
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Icon with hover animation */}
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      isDarkMode 
                        ? "bg-gray-700 text-emerald-400 group-hover:bg-emerald-500/20" 
                        : "bg-gray-100 text-perylene-600 group-hover:bg-perylene-100"
                    }`}>
                      {getGroupIcon(group.name)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-lg transition-colors duration-200 truncate ${
                        isDarkMode 
                          ? "text-gray-100 group-hover:text-white" 
                          : "text-gray-800 group-hover:text-gray-900"
                      }`}>
                        {group.name}
                      </h3>
                      {group.description && (
                        <p className={`text-sm mt-1 font-light transition-colors duration-300 line-clamp-2 ${
                          isDarkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700"
                        }`}>
                          {group.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className={`transition-all duration-300 group-hover:translate-x-1 ${
                      isDarkMode ? "text-gray-500 group-hover:text-emerald-400" : "text-gray-400 group-hover:text-perylene-600"
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
