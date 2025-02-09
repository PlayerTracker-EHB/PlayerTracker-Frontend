import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

export default function Subscriptions() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handleMouseOver = (plan: string) => {
    setHoveredPlan(plan);
  };

  const handleMouseOut = () => {
    setHoveredPlan(null);
  };

  return (
    <motion.div
      className="w-screen h-screen bg-gray-100 py-16 px-8 md:px-20 lg:px-40 text-gray-800 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />

      <motion.h2
        className="text-4xl font-bold text-center text-gray-900 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Choose Your Plan
      </motion.h2>

      {/* Description under the title */}
      <motion.p
        className="text-lg text-center text-gray-500 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        We offer flexible pricing plans to meet the needs of different users.
        Choose the plan that suits you best, whether you're just starting or
        looking for advanced features.
      </motion.p>

      {/* Container for both plans */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* First Plan Container */}
        <motion.div
          className={`bg-white p-8 rounded-lg shadow-md flex-1 max-w-full transition-transform duration-500 ease-in-out ${
            hoveredPlan === "basic" ? "scale-110" : ""
          }`}
          onMouseOver={() => handleMouseOver("basic")}
          onMouseOut={handleMouseOut}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="text-3xl font-bold mb-4">Basic Plan</h3>
          <p className="text-sm text-gray-500 mb-4">Starting at</p>
          <p className="text-4xl font-bold text-gray-900 mb-6">$400 / month</p>
          <p className="text-xl mb-6">
            Access to basic features, standard support, and 1 project.
          </p>
          <ul className="mb-6">
            <li className="mb-4 flex items-center">
              <img
                src="verifie.png"
                alt="Check icon"
                className="w-4 h-4 mr-2"
              />
              Access to basic features
            </li>
            <li className="mb-4 flex items-center">
              <img
                src="verifie.png"
                alt="Check icon"
                className="w-4 h-4 mr-2"
              />
              Standard support
            </li>
            <li className="mb-4 flex items-center">
              <img
                src="verifie.png"
                alt="Check icon"
                className="w-4 h-4 mr-2"
              />
              1 Project
            </li>
          </ul>
          <a
            href="/experts"
            className="inline-block mt-4 px-6 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600"
          >
            Browse Experts
          </a>
        </motion.div>

        {/* Second Plan Container with image */}
        <motion.div
          className={`bg-white p-8 rounded-lg shadow-md flex-1 flex flex-col md:flex-row max-w-full transition-transform duration-500 ease-in-out ${
            hoveredPlan === "pro" ? "scale-110" : ""
          }`}
          onMouseOver={() => handleMouseOver("pro")}
          onMouseOut={handleMouseOut}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
        >
          <div className="w-full md:w-2/3">
            <h3 className="text-3xl font-bold mb-4">Pro Plan</h3>
            <p className="text-sm text-gray-500 mb-4">Starting at</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">
              $500 / project
            </p>
            <p className="text-xl mb-6">
              All features of Basic Plan, priority support, and up to 5
              projects.
            </p>
            <ul className="mb-6">
              <li className="mb-4 flex items-center">
                <img
                  src="verifie.png"
                  alt="Check icon"
                  className="w-4 h-4 mr-2"
                />
                All features of Basic Plan
              </li>
              <li className="mb-4 flex items-center">
                <img
                  src="verifie.png"
                  alt="Check icon"
                  className="w-4 h-4 mr-2"
                />
                Priority support
              </li>
              <li className="mb-4 flex items-center">
                <img
                  src="verifie.png"
                  alt="Check icon"
                  className="w-4 h-4 mr-2"
                />
                Up to 5 Projects
              </li>
            </ul>
            <a
              href="/quote"
              className="inline-block mt-4 px-6 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600"
            >
              Get a free quote
            </a>
          </div>

          {/* Image in the second container */}
          <div className="w-full md:w-1/3 flex justify-center items-center mt-8 md:mt-0">
            <img
              src="detectionimg.jpg"
              alt="Product image"
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
