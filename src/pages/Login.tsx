import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"; // Zustand store

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      await login(email, password); // Zustand function
      navigate("/"); // Redirect to home on success
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Background Image (Left) */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/coverlogin.webp')" }}
      ></div>

      {/* Login Form (Right) */}
      <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mb-6">
          Log in to Player Tracker
        </h1>
        <p className="text-lg text-center mb-4">
          Sign in to track your team statistics
        </p>

        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-gray-500 hover:underline">
            Register here
          </a>
        </p>
      </div>

      {/* Fixed button for Register */}
      <a
        href="/register"
        className="fixed top-4 right-4 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-800"
      >
        Register
      </a>
    </div>
  );
}

