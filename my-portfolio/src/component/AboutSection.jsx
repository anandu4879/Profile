import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="relative pt-16 min-h-screen mx-4 md:mx-40">
      <p className="text-center text-gray-600">Get to know more</p>
      <h1 className="text-5xl text-center mb-8">About me</h1>
      <div className="flex flex-col md:flex-row gap-16 h-4/5">
        <div className="flex h-96 w-96 mx-auto my-0">
          <img 
            src="/assets/about-pic.jpg" 
            alt="About Ananthakrishna" 
            className="w-full h-full rounded-3xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex gap-8 mb-8 flex-wrap">
            <div className="flex-1 p-6 bg-white rounded-3xl border border-gray-400 text-center min-w-[250px]">
              <img src="/assets/experience.png" alt="Experience" className="h-8 mx-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">1+ years<br/>Web Development</p>
            </div>
            <div className="flex-1 p-6 bg-white rounded-3xl border border-gray-400 text-center min-w-[250px]">
              <img src="/assets/education.png" alt="Education" className="h-8 mx-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-600">B.Tech Computer Science Engineering<br/>SCMS SCHOOL OF ENGINEERING</p>
            </div>
          </div>
          <div className="text-justify text-gray-600">
            <p>Highly motivated Software Engineer and Computer Science graduate with hands-on experience in backend development, DevOps pipeline automation, and IoT projects. Proficient in Java, Spring Boot, and cloud technologies, with a proven track record of building scalable and efficient software systems. Skilled in CI/CD pipelines, database optimization, and microservices architecture. Strong collaborative and problem-solving abilities, complemented by multilingual communication skills.</p>
          </div>
        </div>
      </div>
      <img 
        src="/assets/arrow.png" 
        alt="Arrow" 
        className="hidden md:block absolute right-[-5rem] bottom-10 h-8 cursor-pointer"
        onClick={() => window.location.href = '#experience'}
      />
    </section>
  );
};

export default AboutSection;