import React from 'react';

const ExperienceSection = () => {
  const frontendSkills = [
    { name: 'HTML', level: 'Experienced' },
    { name: 'CSS', level: 'Intermediate' },
    { name: 'React', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Intermediate' }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Express.js', level: 'Intermediate' },
    { name: 'MongoDB', level: 'Intermediate' },
    { name: 'REST APIs', level: 'Intermediate' },
    { name: 'JWT Authentication', level: 'Basic' },
    { name: 'Docker', level: 'Intermediate' },
    { name: 'Git', level: 'Intermediate' },
    { name: 'CI/CD (Jenkins)', level: 'Basic' }
  ];

  return (
    <section id="experience" className="relative pt-16 min-h-screen mx-4 md:mx-40">
      <p className="text-center text-gray-600">Explore My</p>
      <h1 className="text-5xl text-center mb-8">Experience</h1>

      <div className="flex justify-center flex-col">
        <div className="flex gap-8 flex-wrap justify-center">
          
          {/* Frontend */}
          <div className="flex-1 p-6 bg-white rounded-3xl border border-gray-400 min-w-[300px]">
            <h2 className="text-gray-600 font-semibold text-3xl mb-8 text-center">
              Frontend Development
            </h2>
            <div className="flex text-center flex-wrap gap-8 justify-around">
              {frontendSkills.map((skill, index) => (
                <article key={index} className="w-40 flex flex-col items-center gap-2">
                  <img src="/assets/checkmark.png" alt="Checkmark" className="h-8" />
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-gray-600">{skill.level}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="flex-1 p-6 bg-white rounded-3xl border border-gray-400 min-w-[300px]">
            <h2 className="text-gray-600 font-semibold text-3xl mb-8 text-center">
              Backend Development (Node.js)
            </h2>
            <div className="flex text-center flex-wrap gap-8 justify-around">
              {backendSkills.map((skill, index) => (
                <article key={index} className="w-40 flex flex-col items-center gap-2">
                  <img src="/assets/checkmark.png" alt="Checkmark" className="h-8" />
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-gray-600">{skill.level}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>

      <img 
        src="/assets/arrow.png" 
        alt="Arrow" 
        className="hidden md:block absolute right-[-5rem] bottom-10 h-8 cursor-pointer"
        onClick={() => window.location.href = '#projects'}
      />
    </section>
  );
};

export default ExperienceSection;
