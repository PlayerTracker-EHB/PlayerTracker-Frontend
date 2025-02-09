import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-lg shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="h-20 w-20 object-cover"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/subscriptions"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Subscriptions
          </Link>
        </div>

        {/* Icons for Login/Register */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          >
            <LogIn className="w-6 h-6 text-white hover:text-white" />
          </Link>
          <Link
            to="/register"
            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          >
            <UserPlus className="w-6 h-6 text-white hover:text-white" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
