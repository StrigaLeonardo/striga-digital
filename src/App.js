import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import AboutPage from "./AboutPage";
import ContactForm from "./ContactForm";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
