import React, { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

export default function Carousel2() {
  const [isHovered, setIsHovered] = useState(false);

  // Indique que scrollRef fait référence à un élément HTML div
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Utilisation d'un ref pour garder la position persistante
  const position = useRef(0);

  // Utilisation d'un ref pour stocker l'ID d'animation (de type number)
  const animationFrameId = useRef<number | null>(null);

  // Fonction pour le défilement continu
  const scroll = () => {
    if (scrollRef.current) {
      position.current -= 0.5; // Ajuste la vitesse de défilement ici
      scrollRef.current.style.transform = `translateX(${position.current}px)`;

      // Réinitialise la position pour un défilement infini
      if (position.current <= -scrollRef.current.scrollWidth / 2) {
        position.current = 0;
      }
    }
    animationFrameId.current = requestAnimationFrame(scroll);
  };

  // Démarre l'animation
  const startScroll = () => {
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(scroll);
    }
  };

  // Arrête l'animation
  const stopScroll = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  // Lance ou arrête le défilement en fonction du survol
  useEffect(() => {
    if (isHovered) {
      stopScroll();
    } else {
      startScroll();
    }

    // Nettoyage à la désactivation du composant
    return () => stopScroll();
  }, [isHovered]);

  return (
    <motion.div
      className="relative w-3/4 mx-auto overflow-hidden pt-20 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Titre au-dessus du carousel */}
      <motion.h2
        className="text-4xl font-bold text-center text-gray-900 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Everything you need
      </motion.h2>
      <motion.p
        className="text-xl text-center text-gray-700 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <em>Discover the power of innovation and excellence.</em>
      </motion.p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={() => setIsHovered(true)} // Arrête l'animation au survol
        onMouseLeave={() => setIsHovered(false)} // Reprend l'animation lorsque la souris quitte
      >
        <div
          ref={scrollRef}
          className="flex"
          style={{
            display: "flex",
          }}
        >
          <CarouselItem className="basis-1/3 pl-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/wireframe.jpg" // Remplace par le chemin de ta première image
              alt="Description of image 1"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/wireframe.jpg" // Remplace par le chemin de ta deuxième image
              alt="Description of image 2"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/wireframe.jpg" // Remplace par le chemin de ta troisième image
              alt="Description of image 3"
              className="w-full h-full object-cover"
            />
          </CarouselItem>

          {/* Duplique les images pour un effet de boucle continue */}
          <CarouselItem className="basis-1/3 pl-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/wireframe.jpg" // Remplace par le chemin de ta première image
              alt="Description of image 1 duplicate"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/wireframe.jpg" // Remplace par le chemin de ta deuxième image
              alt="Description of image 2 duplicate"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 pl-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/wireframe.jpg" // Remplace par le chemin de ta troisième image
              alt="Description of image 3 duplicate"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        </div>
      </Carousel>
    </motion.div>
  );
}
