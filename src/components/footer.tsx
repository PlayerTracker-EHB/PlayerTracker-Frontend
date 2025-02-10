import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo et Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">PlayerTracker</h2>
          <p className="text-gray-400">
            Transforming the way you work with innovative solutions that enhance
            productivity and drive results.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#features" className="text-gray-400 hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-400 hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-4">123 Nijverheidskaai, Belgium</p>
          <p className="text-gray-400">Email: contact@playertracker.com</p>
          <p className="text-gray-400 mb-4">Phone: +32 123 456 789</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} PlayerTracker. All rights reserved.
      </div>
    </footer>
  );
}
