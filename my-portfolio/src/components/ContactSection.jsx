import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="flex justify-center flex-col min-h-[70vh] pt-16 mx-4 md:mx-40">
      <p className="text-center text-gray-600">Get in Touch</p>
      <h1 className="text-5xl text-center mb-8">Contact Me</h1>
      <div className="flex justify-center rounded-3xl border border-gray-400 bg-gray-50 my-8 mx-auto p-2 flex-wrap">
        <div className="flex items-center justify-center gap-2 m-4">
          <img src="/assets/email.png" alt="Email" className="h-10" />
          <p className="text-lg">
            <a href="mailto:anandu4879@gmail.com" className="text-black hover:text-gray-600">anandu4879@gmail.com</a>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 m-4">
          <img src="/assets/linkedin.png" alt="LinkedIn" className="h-8" />
          <p className="text-lg">
            <a href="https://www.linkedin.com/in/ananthakrishna-kp" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">LinkedIn</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;