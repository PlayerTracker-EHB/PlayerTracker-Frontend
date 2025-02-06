import React, { useState } from "react";

export default function Subscriptions() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handleMouseOver = (plan: string) => {
    setHoveredPlan(plan);
  };

  const handleMouseOut = () => {
    setHoveredPlan(null);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 py-16 px-8 md:px-20 lg:px-40 text-gray-800">
      {/* Fixed button for Register */}
      <a
        href="/register"
        className="fixed top-4 right-4 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-800"
      >
        Register
      </a>

      <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Choose Your Plan
      </h2>

      {/* Description under the title */}
      <p className="text-lg text-center text-gray-500 mb-12">
        We offer flexible pricing plans to meet the needs of different users.
        Choose the plan that suits you best, whether you're just starting or
        looking for advanced features.
      </p>

      {/* Container for both plans */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* First Plan Container */}
        <div
          className={`bg-white p-8 rounded-lg shadow-md flex-1 max-w-full transition-transform duration-500 ease-in-out ${
            hoveredPlan === "basic" ? "scale-110" : ""
          }`}
          onMouseOver={() => handleMouseOver("basic")}
          onMouseOut={handleMouseOut}
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
                src="verifie.png" // L'icône de vérification
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
        </div>

        {/* Second Plan Container with image */}
        <div
          className={`bg-white p-8 rounded-lg shadow-md flex-1 flex flex-col md:flex-row max-w-full transition-transform duration-500 ease-in-out ${
            hoveredPlan === "pro" ? "scale-110" : ""
          }`}
          onMouseOver={() => handleMouseOver("pro")}
          onMouseOut={handleMouseOut}
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
        </div>
      </div>
    </div>
  );
}
