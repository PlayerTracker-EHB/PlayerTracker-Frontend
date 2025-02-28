import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <motion.div
      className="bg-gradient-to-r from-white via-indigo-50 to-white py-20 px-6 font-[sans-serif]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Us Today</h2>
        <p className="text-lg text-gray-900 mb-12">
          Experience the future of our innovative solutions. Sign up now for
          exclusive access.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant={"default"}
            className="bg-teal-500 w-max mx-auto hover:bg-teal-600 font-bold"
          >
            <Link to="/Subscriptions">Get started</Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
