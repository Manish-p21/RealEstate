import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.js";
import Home1 from "./pages/Home1.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import ScrollToTop from "./components/ScrollToTop.js"; // ✅ Import ScrollToTop
import PropertyPage from "./components/PropertyPage/PropertyPage.js";
import About from "./components/About/About.js";
import ContactUs from "./components/About/ContactUs.js";
import Profile from "./components/About/Profile.js";

function AppContent() {
  const location = useLocation();

  // ✅ Hide Header & Footer on Login and Signup pages
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="relative flex flex-col items-center bg-gray-900 text-white">
      {!hideHeaderFooter && <Header />}
      <main className="w-full flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/PropertyPage" element={<PropertyPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Profile" element={<Profile />} />
          
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop /> {/* ✅ Ensures every page starts from the top */}
      <AppContent />
    </>
  );
}

export default App;
