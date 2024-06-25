import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow flex items-center justify-center">
        <div className="container px-4 py-4 flex items-center justify-center">
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
              Mino
            </motion.span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}

export default Layout;
