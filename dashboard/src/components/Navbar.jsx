import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 py-6 shadow-sm bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-perylene-500 to-perylene-700 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">M</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Mind <span className="bg-gradient-to-r from-perylene-600 to-perylene-800 bg-clip-text text-transparent">Saathi</span>
        </h1>
      </div>

      <nav className="hidden md:flex space-x-2 text-lg">
        {["Home", "About", "Our Story", "Blog", "Resources", "Services", "Forms"].map(
          (item) => (
            item === "Home" ? (
              <Link 
                key={item} 
                to="/" 
                className="px-6 py-3 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md"
              >
                {item}
              </Link>
            ) : item === "About" ? (
              <Link 
                key={item} 
                to="/about" 
                className="px-6 py-3 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md"
              >
                {item}
              </Link>
            ) : (
              <a 
                key={item} 
                href="#" 
                className="px-6 py-3 text-gray-700 hover:text-perylene-700 font-medium transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md"
              >
                {item}
              </a>
            )
          )
        )}
      </nav>

      <button className="md:hidden p-3 text-gray-700 hover:text-perylene-600 hover:bg-gray-50 rounded-xl transition-colors duration-200" onClick={() => setOpen(!open)}>
        <Menu size={32} />
      </button>

      {open && (
        <div className="md:hidden absolute top-20 right-0 bg-white shadow-lg w-56 flex flex-col p-6 space-y-2 rounded-2xl border border-gray-200">
          {["Home", "About", "Our Story", "Blog", "Resources", "Services", "Forms"].map(
            (item) => (
              item === "Home" ? (
                <Link 
                  key={item} 
                  to="/" 
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md transition-all duration-200"
                >
                  {item}
                </Link>
              ) : item === "About" ? (
                <Link 
                  key={item} 
                  to="/about" 
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md transition-all duration-200"
                >
                  {item}
                </Link>
              ) : (
                <a 
                  key={item} 
                  href="#" 
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-perylene-700 font-medium p-3 rounded-full border-2 border-gray-200 hover:border-perylene-500 hover:bg-perylene-50 hover:shadow-md transition-all duration-200"
                >
                  {item}
                </a>
              )
            )
          )}
        </div>
      )}
    </header>
  );
}
