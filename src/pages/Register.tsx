import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whoAreYou: "",
    role: "",
    help: "",
    plan: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/register" &&
      location.search.includes("contact")
    ) {
      setFormData((prevData) => ({
        ...prevData,
        plan: "Contact",
      }));
    }
  }, [location.pathname, location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.whoAreYou ||
      !formData.role ||
      !formData.help ||
      !formData.plan
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    console.log("Form submitted:", formData);
    alert("Registration successful!");
    setErrorMessage("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whoAreYou: "",
      role: "",
      help: "",
      plan: "",
    });
  };

  return (
    <motion.div
      className="w-screen min-h-screen bg-[#f7f6f3] flex justify-center items-start pt-16 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Form Section */}
      <motion.div
        className="w-full max-w-4xl px-8 py-12 bg-transparent"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Book a call with a PlayerTracker expert
        </motion.h1>

        <motion.p
          className="text-lg text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Thanks for showing interest in our product. We are happy to help you
          with your questions and inquiries about our products. Fill out the
          form and a PlayerTracker expert will call you at your desired time. We
          speak several different languages.
        </motion.p>

        {errorMessage && (
          <motion.div
            className="mb-4 text-sm text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champs du formulaire avec animation */}
          {[
            {
              id: "firstName",
              label: "First Name*",
              type: "text",
              placeholder: "Enter your first name",
            },
            {
              id: "lastName",
              label: "Last Name*",
              type: "text",
              placeholder: "Enter your last name",
            },
            {
              id: "email",
              label: "Email*",
              type: "email",
              placeholder: "Enter your email",
            },
            {
              id: "phone",
              label: "Phone*",
              type: "text",
              placeholder: "Enter your phone number",
            },
            {
              id: "role",
              label: "Role*",
              type: "text",
              placeholder: "What is your role?",
            },
            {
              id: "help",
              label: "What can we help you with today?*",
              type: "text",
              placeholder: "Tell us what we can help you with",
            },
          ].map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.4 }}
            >
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold mb-2"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
              />
            </motion.div>
          ))}

          {/* Select pour Who Are You */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <label
              htmlFor="whoAreYou"
              className="block text-sm font-semibold mb-2"
            >
              Who are you?*
            </label>
            <select
              id="whoAreYou"
              name="whoAreYou"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formData.whoAreYou}
              onChange={handleChange}
            >
              <option value="">Select your role</option>
              <option value="Coach">Coach</option>
              <option value="Data-analyst">Data-analyst</option>
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>

          {/* Plan selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <label htmlFor="plan" className="block text-sm font-semibold mb-2">
              Which plan are you interested in?*
            </label>
            <select
              id="plan"
              name="plan"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formData.plan}
              onChange={handleChange}
            >
              <option value="">Select a plan</option>
              <option value="Basic Plan">Basic Plan</option>
              <option value="Pro Plan">Pro Plan</option>
              <option value="Contact">Contact</option>
            </select>
          </motion.div>

          {/* Bouton animé */}
          <motion.button
            type="submit"
            className="w-full py-2 bg-black text-white font-bold rounded hover:bg-gray-800 mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Register
          </motion.button>
        </form>

        {/* Lien avec plus d'espace en bas */}
        <motion.p
          className="text-sm text-gray-600 mt-6 mb-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Already have an account?{" "}
          <a href="/login" className="text-gray-500 hover:underline">
            Login here
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
