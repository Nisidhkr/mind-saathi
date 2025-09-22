import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function NavbarPublic() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Resources", to: "/resources" },
  ];

  return (
    <header className="flex items-center justify-between px-8 py-6 shadow-sm bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-perylene-500 to-perylene-700 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">M</span>
        </div>
        <Link to="/" className="text-3xl font-bold text-gray-800 hover:opacity-80 transition-opacity">
          Mind <span className="bg-gradient-to-r from-perylene-600 to-perylene-800 bg-clip-text text-transparent">Saathi</span>
        </Link>
      </div>

      <nav className="hidden md:flex space-x-2 text-lg">
        {navItems.map((item) => (
          item.to === "#" ? (
            <a
              key={item.label}
              href="#"
              className="px-6 py-3 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md"
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              className="px-6 py-3 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md"
            >
              {item.label}
            </Link>
          )
        ))}
        <Link 
          to="/auth" 
          className="px-6 py-3 bg-perylene-600 text-white hover:bg-perylene-700 font-medium transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
        >
          Login
        </Link>
        <Link 
          to="/counsellor-login" 
          className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 font-medium transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
        >
          Counsellor Login
        </Link>
      </nav>

      <button className="md:hidden p-3 text-gray-700 hover:text-perylene-600 hover:bg-gray-50 rounded-xl transition-colors duration-200" onClick={() => setOpen(!open)}>
        <Menu size={32} />
      </button>

      {open && (
        <div className="md:hidden absolute top-20 right-0 bg-white shadow-lg w-56 flex flex-col p-6 space-y-2 rounded-2xl border border-gray-200">
          {navItems.map((item) => (
            item.to === "#" ? (
              <a
                key={item.label}
                href="#"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md transition-all duration-200"
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md transition-all duration-200"
              >
                {item.label}
              </Link>
            )
          ))}
          <Link 
            to="/auth" 
            onClick={() => setOpen(false)}
            className="text-center bg-perylene-600 text-white hover:bg-perylene-700 font-medium p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            Login
          </Link>
          <Link 
            to="/counsellor-login" 
            onClick={() => setOpen(false)}
            className="text-center bg-green-600 text-white hover:bg-green-700 font-medium p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            Counsellor Login
          </Link>
        </div>
      )}
    </header>
  );
}


