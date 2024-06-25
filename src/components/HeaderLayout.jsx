import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeaderLayout() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center">
        <Link
          to="/"
          className="flex items-center text-3xl font-bold text-blue-500"
        >
          <motion.svg
            className="h-10 w-10 text-blue-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </motion.svg>
          <motion.span
            className="font-lobster text-4xl text-blue-600"
            whileHover={{ scale: 1.2, color: "#ff6347" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Your Project's Diary
          </motion.span>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-4 text-center">
        <h2 className="text-2xl font-bold text-blue-600">Why Choose Mino?</h2>
        <p className="mt-4 text-gray-700">
          Manage your small projects effortlessly with Mino. Our platform
          provides you with all the tools you need to track costs, manage
          resources, and stay on top of your projects.
        </p>
        <ul className="mt-4 text-gray-700 list-disc list-inside">
          <li>Simple and intuitive interface</li>
          <li>Detailed cost tracking</li>
          <li>Resource management</li>
          <li>Real-time updates</li>
          <li>Comprehensive reports</li>
        </ul>
        <div className="mt-6">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderLayout;
