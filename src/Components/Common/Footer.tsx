import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row sm:justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Social App<span className="text-indigo-600">.</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Connect and share with people around you.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Follow us
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Social App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
