import React from 'react';

const NavigationComponent = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-around items-center h-[17vh]">
        <div className="text-3xl font-medium cursor-default">Ananthakrishna KP</div>
        <ul className="flex gap-8 list-none text-2xl">
          <li><a href="#about" className="text-black no-underline hover:text-gray-500 hover:underline hover:underline-offset-4">About</a></li>
          <li><a href="#experience" className="text-black no-underline hover:text-gray-500 hover:underline hover:underline-offset-4">Experience</a></li>
          <li><a href="#projects" className="text-black no-underline hover:text-gray-500 hover:underline hover:underline-offset-4">Projects</a></li>
          <li><a href="#contact" className="text-black no-underline hover:text-gray-500 hover:underline hover:underline-offset-4">Contact</a></li>
        </ul>
      </nav>

      {/* Mobile Hamburger Navigation */}
      <nav className="flex md:hidden justify-around items-center h-[17vh]">
        <div className="text-2xl font-medium">Ananthakrishna KP</div>
        <div className="relative inline-block">
          <div 
            className="flex flex-col justify-between h-6 w-8 cursor-pointer"
            onClick={toggleMenu}
          >
            <span className={`h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
          <div className={`absolute top-full right-0 bg-white w-fit overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-72' : 'max-h-0'}`}>
            <ul className="list-none">
              <li><a href="#about" onClick={toggleMenu} className="block p-2.5 text-center text-2xl text-black no-underline">About</a></li>
              <li><a href="#experience" onClick={toggleMenu} className="block p-2.5 text-center text-2xl text-black no-underline">Experience</a></li>
              <li><a href="#projects" onClick={toggleMenu} className="block p-2.5 text-center text-2xl text-black no-underline">Projects</a></li>
              <li><a href="#contact" onClick={toggleMenu} className="block p-2.5 text-center text-2xl text-black no-underline">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationComponent;