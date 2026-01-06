import React, { useState } from 'react';
import NavigationComponent from './components/NavigationComponent';
import ProfileSection from './components/ProfileSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectSection';
import ContactSection from './components/ContactSection';
import Footer from './components/FooterComponent';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="m-0 p-0 font-sans scroll-smooth">
      <NavigationComponent isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <ProfileSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}