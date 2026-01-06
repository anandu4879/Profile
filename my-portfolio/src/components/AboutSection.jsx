import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="relative pt-16 min-h-screen mx-4 md:mx-40">
      <p className="text-center text-gray-600">Get to know more</p>
      <h1 className="text-5xl text-center mb-8">About me</h1>

      <div className="flex flex-col md:flex-row gap-16 h-4/5">
        
        {/* Image */}
        <div className="flex w-full max-w-sm h-auto mx-auto">
          <img 
            src="/assets/about-pic.jpg"
            alt="About Ananthakrishna"
            className="w-full h-full rounded-3xl object-cover object-top"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex gap-8 mb-8 flex-wrap">
            
            {/* Experience Card */}
            <div className="flex-1 p-6 bg-white rounded-3xl border border-gray-400 text-center min-w-[250px]">
              <img src="/assets/experience.png" alt="Experience" className="h-8 mx-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">
                Tata Consultancy Services (TCS)<br />
                <span className="text-sm text-gray-500">Software Engineer · Present</span>
              </p>
            </div>

            {/* Education Card */}
            <div className="flex-1 p-6 bg-white rounded-3xl border border-gray-400 text-center min-w-[250px]">
              <img src="/assets/education.png" alt="Education" className="h-8 mx-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-600">
                B.Tech Computer Science Engineering<br />
                SCMS School of Engineering
              </p>
            </div>
          </div>

          {/* About Text */}
          <div className="text-justify text-gray-600">
            <p>
              Highly motivated Software Engineer currently working at Tata Consultancy Services (TCS),
              with hands-on experience in backend development, DevOps pipeline automation, and real-world
              project delivery. Skilled in building scalable applications, CI/CD pipelines, and
              cloud-ready systems. Strong problem-solving abilities and collaborative mindset.
            </p>
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
