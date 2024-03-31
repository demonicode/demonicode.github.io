import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import './App.scss'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import ActiveSection from './components/ActiveSection'

const sections = ['home', 'about', 'experience', 'portfolio', 'contact'];


function useActiveSection(sections) {
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        navigate(`/${currentSection}`, { replace: true });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, navigate, sections]);

  return activeSection;
}

function App() {
  // Use the hook to get the current active section
  const activeSection = useActiveSection(sections);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home id="home" />} />
          <Route path="/about" element={<About id="about" />} />
          <Route path="/experience" element={<Experience id="experience" />} />
          <Route path="/portfolio" element={<Portfolio id="portfolio" />} />
          <Route path="/contact" element={<Contact id="contact" />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
