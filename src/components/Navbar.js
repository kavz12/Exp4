import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold text-indigo-600">Portfolio</h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="#home"
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
