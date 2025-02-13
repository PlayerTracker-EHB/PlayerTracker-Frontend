import { Link } from "@tanstack/react-router";
import { LogIn, UserPlus } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";


export default function NavBar() {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  return (
    <motion.nav
      animate={isHidden ? "hidden" : "visible"}
      variants={{
        hidden: {
          y: "-100%",
          opacity: 0,
        },
        visible: {
          y: "0%",
          opacity: 1,
        },
      }}
      transition={{ duration: 0.3 }}
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
        <div className="hidden md:flex gap-4 text-lg font-medium">
          <Link
            to="/"
            className="text-white hover:bg-teal-500 hover:text-white transition-colors px-4 py-2 rounded-full"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:bg-teal-500 hover:text-white transition-colors px-4 py-2 rounded-full"
          >
            About
          </Link>
          <Link
            to="/Subscriptions"
            className="text-white hover:bg-teal-500 hover:text-white transition-colors px-4 py-2 rounded-full"
          >
            Subscriptions
          </Link>
        </div>

        {/* Icons for Login/Register */}
        <div className="flex gap-4">
          <Link
            to="/Login"
            className="p-2 rounded-full hover:bg-teal-500 transition-colors"
          >
            <LogIn className="w-6 h-6 text-white" />
          </Link>
          <Link
            to="/Register"
            className="p-2 rounded-full hover:bg-teal-500 transition-colors"
          >
            <UserPlus className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};


