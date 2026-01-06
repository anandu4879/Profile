import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ProfileSection from './components/ProfileSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="m-0 p-0 font-sans scroll-smooth">
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <ProfileSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}