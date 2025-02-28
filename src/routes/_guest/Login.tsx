import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { ImSpinner2 } from "react-icons/im";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const Route = createFileRoute("/_guest/Login")({
  component: Login,
});

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate({ from: "/Login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await login(email, password);

      toast({
        title: "Login Successful",
        description: "You have been successfully logged in! 🚀",
      });

      navigate({ to: "/statistics" });
    } catch (error) {
      let errorMessage = "Invalid email or password.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setErrorMessage(errorMessage);

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <motion.div
      className="w-screen h-screen flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Image de fond à gauche */}
      <motion.div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/coverlogin.webp')" }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      ></motion.div>

      {/* Formulaire à droite */}
      <motion.div
        className="w-1/2 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Log in to Player Tracker
        </h1>
        <p className="text-lg text-center mb-4">
          Sign in to track your team statistics
        </p>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              className="mb-4 text-sm text-red-500 bg-red-100 border border-red-400 p-2 rounded text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-[90%] sm:w-[75%] md:w-[60%] mx-auto"
          animate={errorMessage ? { x: [-10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input avec Icône Eye */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button avec Loading Spinner */}
          <button
            type="submit"
            className="w-full px-4 py-2 flex items-center justify-center bg-black text-white rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-white text-lg" />
            ) : (
              "Login"
            )}
          </button>
        </motion.form>

        {/* Register Link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-gray-500 hover:underline">
            Register here
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
