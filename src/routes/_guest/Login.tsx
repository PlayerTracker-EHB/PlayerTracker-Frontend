import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore"; // Zustand store
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { ImSpinner2 } from "react-icons/im"; // Import loading spinner icon

export const Route = createFileRoute("/_guest/Login")({
  component: Login,
});

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate({ from: "/Login" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true); // Activate loading state
    setErrorMessage("");

    try {
      await login(email, password); // Zustand function
      navigate({ to: "/Statistics" }); // Redirect to statistics on success
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    }
    setLoading(false); // Deactivate loading state
  };

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

        {errorMessage && (
          <motion.div
            className="mb-4 text-sm text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errorMessage}
          </motion.div>
        )}

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-[90%] sm:w-[75%] md:w-[60%] mx-auto"
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

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button with Loading Spinner */}
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
        </form>

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
