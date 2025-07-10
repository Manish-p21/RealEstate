import React from "react";
import Header from "../components/Header.js";
import Hero from "../components/HomeSection/Hero.jsx";
import PropertyPage from "../components/HomeSection/PropertyPage.js";
import SearchBar from "../components/HomeSection/SearchBar.jsx";

function Home() {
  return (
    <div className="relative flex flex-col bg-white text-black w-full overflow-x-hidden">
      {/* Header with id="header" */}
      <Header />

      <main className="w-screen flex flex-col items-center px-0">
        {/* Hero Section */}
        <div className="w-full pt-16 pl-0 mt-4 pr-0">
          <Hero />
        </div>

        {/* SearchBar Section */}
        <div className="w-full pt-16 pl-0 mt-4 pr-0">
          <SearchBar />
        </div>

        {/* PropertyPage Section */}
        <div className="w-full pt-4 pl-0 mt-4 pr-0">
          <PropertyPage />
        </div>
      </main>
    </div>
  );
}

export default Home;