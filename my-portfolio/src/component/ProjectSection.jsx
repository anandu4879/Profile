import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Calculator',
      image: '/assets/project5 copy.PNG',
      github: 'https://github.com/anandu4879/calculator',
      demo: 'https://anandu4879.github.io/calculator/'
    },
    {
      title: 'CodeStep',
      image: '/assets/hero5.png',
      github: 'https://github.com/anandu4879/codestep',
      demo: 'https://codestep.onrender.com/'
    },
    {
      title: 'Corporate DevOps Pipeline',
      image: '/assets/project4.jpg',
      linkedin: 'https://www.linkedin.com/posts/ananthakrishna-kp_devops-cicd-jenkins-activity-7252680176835170304-Cwiq?utm_source=share&utm_medium=member_desktop'
    }
  ];

  return (
    <section id="projects" className="relative pt-16 min-h-screen mx-4 md:mx-40">
      <p className="text-center text-gray-600">Browse My Recent</p>
      <h1 className="text-5xl text-center mb-8">Projects</h1>
      <div className="flex justify-center">
        <div className="flex gap-8 flex-wrap justify-center">
          {projects.map((project, index) => (
            <div key={index} className="flex-1 p-6 bg-gray-50 rounded-3xl border border-gray-400 text-center min-w-[300px] max-w-[400px]">
              <div className="mb-4">
                <img src={project.image} alt={project.title} className="rounded-3xl w-full h-64 object-cover" />
              </div>
              <h2 className="text-black my-4 text-xl font-semibold">{project.title}</h2>
              <div className="flex justify-center gap-4 flex-wrap">
                {project.github && (
                  <button 
                    className="text-black border-gray-400 font-semibold py-4 px-8 rounded-full border hover:bg-gray-800 hover:text-white transition-all"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    Github
                  </button>
                )}
                {project.demo && (
                  <button 
                    className="text-black border-gray-400 font-semibold py-4 px-8 rounded-full border hover:bg-gray-800 hover:text-white transition-all"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    Live Demo
                  </button>
                )}
                {project.linkedin && (
                  <button 
                    className="text-black border-gray-400 font-semibold py-4 px-8 rounded-full border hover:bg-gray-800 hover:text-white transition-all"
                    onClick={() => window.open(project.linkedin, '_blank')}
                  >
                    LinkedIn
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <img 
        src="/assets/arrow.png" 
        alt="Arrow" 
        className="hidden md:block absolute right-[-5rem] bottom-10 h-8 cursor-pointer"
        onClick={() => window.location.href = '#contact'}
      />
    </section>
  );
};

export default ProjectsSection;