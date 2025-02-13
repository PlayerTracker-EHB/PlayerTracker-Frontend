import { Link } from "@tanstack/react-router";
import { LogIn, UserPlus } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const firstUpdate = useRef(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Skip the very first event to maintain the initial visible state.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const previous = scrollYProgress.getPrevious() ?? 0;
    const direction = current - previous;

    // If there's no significant scroll change, do nothing.
    if (direction === 0) return;

    // When scrolling up, the scroll value decreases (direction < 0), so show the navbar.
    if (direction < 0) {
      setVisible(true);
    } else {
      // When scrolling down, the scroll value increases (direction > 0), so hide the navbar.
      setVisible(false);
    }
  });

  return (
    <motion.nav
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed bg-gray-900 top-10 inset-x-0 max-w-3xl mx-auto z-50 rounded-full"
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
            to="/Subscriptions"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Subscriptions
          </Link>
        </div>

        {/* Icons for Login/Register */}
        <div className="flex gap-4">
          <Link
            to="/Login"
            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          >
            <LogIn className="w-6 h-6 text-white" />
          </Link>
          <Link
            to="/Register"
            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          >
            <UserPlus className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

