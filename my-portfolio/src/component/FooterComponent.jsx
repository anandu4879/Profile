import React from 'react';

const Footer = () => {
  return (
    <footer className="min-h-[26vh] mx-4 mb-8">
      <nav>
        <ul className="flex gap-8 list-none text-xl justify-center flex-wrap mb-8">
          <li><a href="#about" className="text-black no-underline hover:text-gray-500">About</a></li>
          <li><a href="#experience" className="text-black no-underline hover:text-gray-500">Experience</a></li>
          <li><a href="#projects" className="text-black no-underline hover:text-gray-500">Projects</a></li>
          <li><a href="#contact" className="text-black no-underline hover:text-gray-500">Contact</a></li>
        </ul>
      </nav>
      <p className="text-center text-gray-600">Copyright © 2024 Ananthakrishna KP. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;