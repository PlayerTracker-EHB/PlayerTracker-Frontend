import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/Register')({
  component: Register,
})

function Register() {
  const navigate = useNavigate({ from: "/Register" })
  const { register } = useAuthStore()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.fullName
    ) {
      setErrorMessage('All fields are required.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      await register(formData.email, formData.password, formData.fullName)
      navigate({ to: '/' }) // Redirect to home on success
    } catch (error) {
      setErrorMessage('Registration failed. Try again.')
    }
  }

  return (
    <motion.div
      className="w-screen min-h-screen bg-[#f7f6f3] flex justify-center items-start pt-16 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Form Section */}
      <motion.div
        className="w-full max-w-md px-8 py-12 bg-white shadow-lg rounded-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </motion.h1>

        {errorMessage && (
          <motion.div className="mb-4 text-sm text-red-500">
            {errorMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FullName Field */}
          <motion.div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold mb-2"
            >
              Full Name*
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Password Field */}
          <motion.div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold mb-2"
            >
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2 bg-black text-white font-bold rounded hover:bg-gray-800 mt-4"
          >
            Register
          </motion.button>
        </form>

        {/* Login Link */}
        <motion.p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-gray-500 hover:underline">
            Login here
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
