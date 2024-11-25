import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Exemple de validation basique pour simuler une authentification
    if (email === "test@example.com" && password === "password") {
      alert("Login successful!");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            />
          </div>

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
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={() => alert("Redirect to registration page")}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
