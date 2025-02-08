import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CoverSection.css"; // Importation du fichier CSS
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function CoverSection() {
  const { user, fetchUser } = useAuthStore();

  // Fetch user on first load to check login status
  useEffect(() => {
    fetchUser();
  }, []); console.log(user)

  return (
    <motion.div
      className="relative w-full h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center p-8"
      style={{
        backgroundImage: "url(/cover.jpg)", // Remplace par le chemin de ton image
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <img
        src="/logo.png" // Remplace par le chemin de ton logo
        alt="Logo"
        className="absolute top-4 left-4 w-20 h-auto"
      />

      {user ? (
        <p>Welcome back, {user.email}!</p>
      ) : (
        <p>Welcome to Player Tracker!</p>
      )}

      <motion.p
        className="text-sm text-gray-400 mb-2 font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >

        Track every action, enhance every performance.
      </motion.p>
      <motion.h1
        className="text-5xl font-bold leading-tight mb-8 text-black"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        Your club deserves modern software
      </motion.h1>
      <motion.p
        className="text-xl mb-8 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Quality innovation, proudly invented in Belgium.
      </motion.p>

      {/* Bouton Start for free */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <Link to="/subscriptions">
          <Button className="px-6 py-3 bg-teal-500 text-white rounded-full text-lg font-bold hover:bg-teal-600">
            Choose a plan
          </Button>
        </Link>
      </motion.div>

      {/* Ballon animé */}
      <motion.img
        src="/ball.gif" // Assurez-vous que le fichier s'appelle bien ball.gif
        alt="Balloon Animation"
        className="ball animate-moveBall"
        width="22%"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.div>
  );
}
