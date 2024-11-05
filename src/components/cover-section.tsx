import { Button } from "@/components/ui/button";
export default function CoverSection() {
  return (
    <div
      className="relative w-full h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center p-8"
      style={{
        backgroundImage: 'url(/cover.jpg)', // Remplace par le chemin de ton image
      }}
    >
      <img
        src="/logo.png" // Remplace par le chemin de ton logo
        alt="Logo"
        className="absolute top-4 left-4 w-20 h-auto"
      />
      <h1 className="text-4xl font-semibold mb-2 text-black">
        Track every action, enhance every performance.
      </h1>
      <p className="text-lg mb-6 text-black">
        Quality innovation, proudly invented in Belgium.
      </p>
                              <Button>Pay Now</Button>
      {/* Ligne horizontale en bas de CoverSection */}
    </div>
  );
}
