import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CoverSection() {
  return (
    <div
      className="relative w-full h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center p-8"
      style={{
        backgroundImage: "url(/cover.jpg)", // Remplace par le chemin de ton image
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

      <Link to="/uploader">
        <Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Uploader
        </Button>
      </Link>
    </div>
  );
}
