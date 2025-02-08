import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "./CoverSection.css"; // Importation du fichier CSS
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function CoverSection() {
  const { user, fetchUser } = useAuthStore();

  // Fetch user on first load to check login status
  useEffect(() => {
    fetchUser();
  }, []); console.log(user)

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
      {user ? (
        <p>Welcome back, {user.email}!</p>
      ) : (
        <p>Welcome to Player Tracker!</p>
      )}
      <p className="text-sm text-gray-400 mb-2 font-bold">
        Track every action, enhance every performance.
      </p>
      <h1 className="text-5xl font-bold leading-tight mb-8 text-black">
        Your club deserves modern software
      </h1>
      <p className="text-xl mb-8 text-black">
        Quality innovation, proudly invented in Belgium.
      </p>

      {/* Bouton Start for free */}
      <Link to="/subscriptions">
        <Button className="px-6 py-3 bg-teal-500 text-white rounded-full text-lg font-bold hover:bg-teal-600">
          Choose a plan
        </Button>
      </Link>

      {/* Ballon animé */}
      <img
        src="/ball.gif" // Assurez-vous que le fichier s'appelle bien ball.gif
        alt="Balloon Animation"
        className="ball animate-moveBall"
        width="22%"
      />
    </div>
  );
}
