import React from 'react';

const ProfileSection = () => {
  return (
    <section id="profile" className="flex flex-col md:flex-row justify-center gap-20 min-h-[80vh] pt-16 mx-4 md:mx-40">
      <div className="flex h-96 w-96 my-auto mx-auto">
        <img 
          src="/assets/profile.png" 
          alt="Ananthakrishna KP" 
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="self-center text-center">
        <p className="text-center font-semibold text-gray-600">Hello, I'm</p>
        <h1 className="text-5xl text-center mb-4">Ananthakrishna KP</h1>
        <p className="text-3xl mb-4">Web Developer</p>
        <div className="flex justify-center gap-4 mb-4 flex-wrap">
          <button 
            className="font-semibold transition-all duration-300 py-4 px-8 rounded-full border border-gray-800 bg-transparent hover:bg-gray-800 hover:text-white"
            onClick={() => window.open('/assets/Ananthakrishna.pdf')}
          >
            Download CV
          </button>
          <button 
            className="font-semibold transition-all duration-300 py-4 px-8 rounded-full border border-gray-800 bg-gray-800 text-white hover:bg-black"
            onClick={() => window.location.href = '#contact'}
          >
            Contact Info
          </button>
        </div>
        <div className="flex justify-center mt-4 gap-4">
          <img 
            src="/assets/linkedin.png" 
            alt="LinkedIn" 
            className="h-8 cursor-pointer hover:opacity-70"
            onClick={() => window.open('https://www.linkedin.com/in/ananthakrishna-kp', '_blank')}
          />
          <img 
            src="/assets/github.png" 
            alt="GitHub" 
            className="h-8 cursor-pointer hover:opacity-70"
            onClick={() => window.open('https://github.com/anandu4879', '_blank')}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;