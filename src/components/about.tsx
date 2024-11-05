import React from "react";

export default function About() {
  return (
    <div className="w-full bg-white py-16 px-8 md:px-20 lg:px-40 text-gray-800">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
        About Our Application
      </h2>
      <p className="text-xl text-center text-gray-700 mb-12">
        <em>Discover the power of innovation and excellence.</em>
      </p>
      <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
        <p>
          Our application is designed to enhance productivity and streamline processes. Built with the latest technology, it empowers users to track every action and make informed decisions with ease. Our goal is to create a seamless and intuitive experience that helps you achieve your objectives faster and more efficiently.
        </p>
        <p>
          We believe in quality, innovation, and delivering value. From small teams to large organizations, our solution is tailored to adapt to your needs, providing the flexibility and scalability that modern businesses require. Join a community of professionals who trust us to enhance their performance and stay ahead of the competition.
        </p>
        <p>
          With our application, you're not just investing in software; you're investing in your success. Let's work together to reach new heights and make every action count.
        </p>
      </div>
    </div>
  );
}
