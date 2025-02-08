import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish(); // Notifie l'application principale que le splash est terminé
    }, 3000); // Durée de 3 secondes

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/logo.png" // Remplace par le chemin de ton logo
            alt="Player Tracker Logo"
            className="w-48 h-48 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.h1
            className="text-6xl font-extrabold text-gray-800 tracking-wide uppercase"
            style={{ fontFamily: "'Jockey One', sans-serif" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Player Tracker
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
