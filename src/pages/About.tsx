import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

export const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />

      {/* Deuxième section avec un GIF en couverture */}
      <motion.div
        className="w-screen h-screen bg-black flex flex-col justify-center items-center px-4 py-8 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute inset-0">
          <img
            src="output_video-VEED.gif"
            alt="Background GIF"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div className="relative text-center text-white">
          <p className="text-sm text-gray-400 mb-2 font-bold">PlayerTracker</p>
          <h1 className="text-5xl font-bold leading-tight mb-10">
            Revolutionizing the way you track player performance
          </h1>
          <p className="text-xl mb-8">
            Our AI-powered platform helps coaches and analysts monitor player
            performance in real-time, with instant data analysis.
          </p>

          <motion.button
            className="bg-teal-500 text-white py-3 px-8 rounded-full text-lg font-bold mb-6 hover:bg-teal-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Tracking
          </motion.button>
        </div>
      </motion.div>

      {/* Première section */}
      <motion.div
        className="w-screen h-screen bg-black flex flex-col justify-center items-center px-4 py-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-4xl text-center text-white">
          <p className="text-sm text-gray-400 mb-2 font-bold">PlayerTracker</p>
          <h1 className="text-5xl font-bold leading-tight mb-10">
            The AI-object detection platform for modern work software
          </h1>
          <p className="text-xl mb-8">
            PlayerTracker empowers coaches and analysts to streamline player
            performance tracking with AI-powered technology. Revolutionizing the
            way data is captured and analyzed.
          </p>

          <motion.button
            className="bg-teal-500 text-white py-3 px-8 rounded-full text-lg font-bold mb-6 hover:bg-teal-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (window.location.href = "/subscriptions")}
          >
            Start a plan
          </motion.button>

          <div className="text-xl flex justify-center items-center gap-2 mb-6">
            <span>G2 </span>
            <span className="text-yellow-500">★★★★★</span>
            <span> *+ reviews</span>
          </div>
        </div>
      </motion.div>

      {/* Troisième section avec arrière-plan beige clair pour l'histoire */}
      <motion.div
        className="w-screen py-16 px-8 bg-[#f7f6f3] flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="max-w-4xl text-center text-[#1f2937]">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg mb-6">
            PlayerTracker was developed by a team of five passionate developers:
            Nawfel Ajari, Mehdi Merkachi, Ismaël Bouzrouti, Soufiane Hamoumi,
            and Kristian Vasiaj. Our mission is to revolutionize futsal at an
            international level. The idea came after a deep analysis of the
            market, where we identified a lack of technological solutions to
            efficiently track player performance.
          </p>
          <p className="text-lg mb-6">
            Coaches and data analysts no longer need to manually track every
            movement or action during a match. With advancements in artificial
            intelligence, we were able to integrate AI and software automation
            into this solution, saving significant time for coaches, analysts,
            and players alike.
          </p>
          <p className="text-lg mb-6">
            The project was born in Belgium, where the five developers
            collaborated to create PlayerTracker. In partnership with AI expert
            Robin Bervoets, we developed a solution tailored to meet the needs
            of the futsal community. Initially starting in a non-profit and
            academic framework, the project quickly expanded toward commercial
            goals, aiming to bring this innovative technology to futsal teams
            and coaches worldwide.
          </p>

          <p className="text-lg mb-6">
            With PlayerTracker, you're not just tracking statistics; you're
            investing in success. Our platform provides the tools needed to
            enhance player performance and make data-driven decisions that
            improve outcomes both on and off the court.
          </p>
        </div>
      </motion.div>

      {/* Section avec logos des clubs */}
      <motion.div
        className="w-screen py-16 px-8 bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="max-w-4xl text-center text-[#1f2937]">
          <h2 className="text-3xl font-bold mb-6">Clubs that trust us</h2>
          <p className="text-lg mb-6">
            Many top clubs have chosen PlayerTracker to help track and improve
            player performance, making data-driven decisions to stay ahead.
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <img src="accs.jpeg" alt="Logo 1" className="h-16" />
            <img src="dinakenitra.png" alt="Logo 2" className="h-16" />
            <img src="tigersroermond.png" alt="Logo 3" className="h-16" />
            <img src="rscanderlecht.webp" alt="Logo 4" className="h-16" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
