import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import WorkSection from './components/WorkSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Cursor from './components/Cursor';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Cursor />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <WorkSection />
            </>
          } />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/work" element={<WorkSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
