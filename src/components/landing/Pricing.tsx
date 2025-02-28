import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <div className="mt-44 bg-white dark:bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="xl:items-center xl:-mx-8 xl:flex">
          <motion.div
            className="flex flex-col items-center xl:items-start xl:mx-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
              Our Pricing Plan
            </h1>

            <div className="mt-4">
              <span className="inline-block w-40 h-1 bg-teal-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-teal-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-teal-500 rounded-full"></span>
            </div>

            <p className="mt-4 font-medium text-gray-500 dark:text-gray-300">
              You can get All Access by selecting your plan!
            </p>

            <Link
              to="/about"
              className="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
            >
              <span className="mx-1">read more</span>
              <svg
                className="w-4 h-4 mx-1 rtl:-scale-x-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </motion.div>

          <div className="flex-1 xl:mx-8">
            <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
              <motion.div
                className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-white">
                    Free trial
                  </h1>

                  <p className="mt-4 text-gray-500 dark:text-gray-300">
                    Take advantage of a free trial to get a feel for the
                    professional environment of a data analyst.
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                    Free{" "}
                    <span className="text-base font-medium">/An essay</span>
                  </h2>

                  <p className="mt-1 text-gray-500 dark:text-gray-300">
                    No request for bank details
                  </p>

                  <button className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-80">
                    Start Now
                  </button>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="p-6">
                  <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                    What’s included:
                  </h1>

                  <div className="mt-8 space-y-4">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Limited match uploader (1)
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Manage your own team
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        View stats for a specific match
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 
                                                    8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        View team stats
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Create an external user
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Mobile friendly
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-white">
                    Essential
                  </h1>

                  <p className="mt-4 text-gray-500 dark:text-gray-300">
                    Benefit from a monthly subscription, also giving access to a
                    limited number of users.
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                    €400.00{" "}
                    <span className="text-base font-medium">/Month</span>
                  </h2>

                  <p className="mt-1 text-gray-500 dark:text-gray-300">
                    Monthly payment
                  </p>

                  <button className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-80">
                    Start Now
                  </button>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="p-6">
                  <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                    What’s included:
                  </h1>

                  <div className="mt-8 space-y-4">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Unlimited match uploader
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Manage your own team
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        View team stats
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        View stats for a specific match
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Create an external user
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Mobile friendly
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-white">
                    Premium
                  </h1>

                  <p className="mt-4 text-gray-500 dark:text-gray-300">
                    Benefit from a monthly subscription, which also gives access
                    to an unlimited number of users.
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                    $4.000.00{" "}
                    <span className="text-base font-medium">/Year</span>
                  </h2>

                  <p className="mt-1 text-gray-500 dark:text-gray-300">
                    One time payment
                  </p>

                  <button className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-80">
                    Start Now
                  </button>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="p-6">
                  <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                    What’s included:
                  </h1>

                  <div className="mt-8 space-y-4">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Two month free subscription
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Unlimited match uploader
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Manage your own team
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        View team stats
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        View stats for a specific match
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Create an external user
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-teal-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-4 text-gray-700 dark:text-gray-300">
                        Mobile friendly
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
