import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
// On importe useRouter depuis TanStack Router
import { useRouter } from "@tanstack/react-router";

export default function FloatingPolicyMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Variantes pour l'animation du menu
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Bouton Icône */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 bg-white shadow rounded-full hover:bg-gray-100 transition flex items-center justify-center"
        aria-label="Open policy menu"
      >
        <Info className="h-5 w-5 text-gray-600" />
      </button>

      {/* Menu Déroulant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-12 right-0 bg-white shadow-lg rounded-lg border border-gray-100 w-48 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col text-gray-700">
              <li>
                <button
                  onClick={() => {
                    router.navigate({ to: "/Terms" });
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Terms Conditions
                </button>
              </li>
              <li className="border-t border-gray-200">
                <button
                  onClick={() => {
                    router.navigate({ to: "/Privacy" });
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Privacy policy
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
