import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Button } from "../ui/button";
import { ArrowDownToDot } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CoverSection() {
  const words = "Click on this button to start your journey with PlayerTracker";
  return (
    <motion.div
      className="py-44"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <HeroHighlight>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          With{" "}
          <Highlight className="text-black dark:text-white">
            PlayerTracker
          </Highlight>
          , unleash the power of AI within the futsal community.
        </motion.h1>

        <motion.div
          className="container mx-auto flex flex-col gap-4 text-center text-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TextGenerateEffect words={words} />

          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant={"default"}
              className="bg-teal-500 w-max mx-auto hover:bg-teal-600"
            >
              <Link to="/Subscriptions">Let's get started</Link>
            </Button>
          </motion.button>
        </motion.div>
      </HeroHighlight>
      <motion.div
        className="mx-auto w-max"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a href="#feature">
          <ArrowDownToDot size={64} strokeWidth={2} />
        </a>
      </motion.div>
    </motion.div>
  );
}
