import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Button } from "../ui/button";
import { ArrowDownToDot } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CoverSection() {
  const words = "Click on this button to start your journey with PlayerTracker";
  return (
    <div className="py-44">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          With <Highlight className="text-black dark:text-white">PlayerTracker</Highlight>, enleash the power of AI within the futsal community.
        </motion.h1>

        <div className="container mx-auto flex flex-col gap-4 text-center text-neutral-400">
          <TextGenerateEffect words={words} />

          <Button variant={"default"} className="bg-green-600 w-max mx-auto hover:bg-green-700">
            <Link to="/Subscriptions">
              Let's get started
            </Link>
          </Button>
        </div>
      </HeroHighlight>
      <div className="mx-auto w-max">
        <a href="#feature">
          <ArrowDownToDot size={64} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
