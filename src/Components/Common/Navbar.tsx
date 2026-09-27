import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);

  function toggleMenu() {
    setIsClicked((prev) => !prev);
  }
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl px-3 md:px-0 font-bold text-gray-900 tracking-tight"
          >
            Social App<span className="text-indigo-600">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              Register
            </NavLink>
            <Link
              to="/register"
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shadow-indigo-200"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isClicked ? "max-h-96  opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            onClick={() => setIsClicked(false)}
            className={({ isActive }) =>
              `block px-3 py-2 text-sm font-medium rounded-lg transition-colors w-[95%] mx-auto  ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setIsClicked(false)}
            className={({ isActive }) =>
              `block px-3 py-2 text-sm font-medium rounded-lg transition-colors w-[95%] mx-auto ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsClicked(false)}
            className={({ isActive }) =>
              `block px-3 py-2 text-sm font-medium rounded-lg transition-colors w-[95%] mx-auto ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsClicked(false)}
            className="block my-4 px-3 w-[95%] mx-auto py-2 text-sm font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Get started
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
