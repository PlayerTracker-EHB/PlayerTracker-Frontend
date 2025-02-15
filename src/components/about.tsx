import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="w-full bg-white py-16 px-8 md:px-20 lg:px-40 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-4xl font-bold text-center text-gray-900 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        About Our Application
      </motion.h2>
      <motion.p
        className="text-xl text-center text-gray-700 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <em>Empowering success through innovation and technology.</em>
      </motion.p>
      <motion.div
        className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p>
          Our application is designed to optimize performance and drive
          efficiency. By leveraging cutting-edge technology, it enables users to
          monitor every action and make smarter decisions in real-time. We aim
          to create an intuitive and seamless experience that empowers you to
          reach your goals faster and more effectively.
        </p>
        <p>
          We are passionate about quality, continuous innovation, and delivering
          measurable results. Whether you're part of a small team or a large
          enterprise, our solution is flexible and scalable, offering the tools
          needed to meet the unique demands of today's fast-paced world. Join a
          growing network of professionals who trust our platform to stay ahead
          of the curve.
        </p>
        <p>
          With our application, you're not just getting a tool — you're
          investing in your future success. Together, let's elevate your
          performance, make every action count, and unlock your full potential.
        </p>
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <a
          href="/about"
          className="inline-block px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800"
        >
          See More
        </a>
      </motion.div>
    </motion.div>
  );
}
