import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut, LayoutDashboard, Heart, BookOpen, Brain, UserCheck, History, MessageCircle, Users, Bot } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function NavbarDashboard() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white border-b border-gray-200 sticky top-0 z-50">
      <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div className="w-12 h-12 bg-gradient-to-br from-perylene-500 to-perylene-700 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold">M</span>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-800 leading-none">Mind Saathi</div>
          <div className="text-xs text-gray-500">Dashboard</div>
        </div>
      </Link>

      <nav className="hidden md:flex items-center space-x-2 text-sm">
        <Link 
          to="/dashboard" 
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <LayoutDashboard size={18} />
            <span>Home</span>
          </span>
        </Link>
        <Link 
          to="/mindfulness-app"
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <Brain size={18} />
            <span>Mindfulness</span>
          </span>
        </Link>
        <Link 
          to="/resources-app"
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <BookOpen size={18} />
            <span>Resources</span>
          </span>
        </Link>
        <Link 
          to="/counselor"
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <UserCheck size={18} />
            <span>Counselor</span>
          </span>
        </Link>
        <Link 
          to="/chatbot"
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <Bot size={18} />
            <span>AI Chat</span>
          </span>
        </Link>
        <Link 
          to={`/group-chat?email=${encodeURIComponent(user?.email || '')}`}
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <MessageCircle size={18} />
            <span>Group Chat</span>
          </span>
        </Link>
        <Link 
          to={`/community-posts?email=${encodeURIComponent(user?.email || '')}`}
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <Users size={18} />
            <span>Community</span>
          </span>
        </Link>
        <Link 
          to="/login-history"
          className="px-4 py-2 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50"
        >
          <span className="inline-flex items-center space-x-2">
            <History size={18} />
            <span>History</span>
          </span>
        </Link>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 inline-flex items-center space-x-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>

      <button className="md:hidden p-3 text-gray-700 hover:text-perylene-600 hover:bg-gray-50 rounded-xl transition-colors duration-200" onClick={() => setOpen(!open)}>
        <Menu size={28} />
      </button>

      {open && (
        <div className="md:hidden absolute top-16 right-0 bg-white shadow-lg w-60 flex flex-col p-4 space-y-2 rounded-2xl border border-gray-200">
          <Link 
            to="/dashboard" 
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Dashboard
          </Link>
          <Link 
            to="/mindfulness-app"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Mindfulness
          </Link>
          <Link 
            to="/resources-app"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Resources
          </Link>
          <Link 
            to="/counselor"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Counselor
          </Link>
          <Link 
            to="/chatbot"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            AI Chat
          </Link>
          <Link 
            to={`/group-chat?email=${encodeURIComponent(user?.email || '')}`}
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Group Chat
          </Link>
          <Link 
            to={`/community-posts?email=${encodeURIComponent(user?.email || '')}`}
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Community Posts
          </Link>
          <Link 
            to="/login-history"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 transition-all duration-200"
          >
            Login History
          </Link>
          <button 
            onClick={() => { setOpen(false); handleLogout(); }}
            className="text-gray-700 hover:text-red-600 font-medium p-3 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}


