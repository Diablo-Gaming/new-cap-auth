import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  // Adds shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-center px-3 bg-white fixed top-0 right-0 left-0 z-45 transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      <div className="w-full max-w-7xl">
        <nav className="flex justify-between py-3 items-center">
          {" "}
          {/* Reduced py-4 to py-2 */}
          {/* Logo */}
          <div className="logo">
            <NavLink to="/">
              <img src="/lotus.png" alt="Logo" className="w-10 rounded-full" />{" "}
              {/* Slightly smaller logo */}
            </NavLink>
          </div>
          {/* Desktop NavLinks */}
          <div className="Nav-Link md:flex hidden gap-8 items-center font-semibold leading-7">
            {" "}
            {/* Reduced gap-10 to gap-8 and leading-9 to leading-7 */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/therapist">Therapist</NavLink>
            <NavLink to="/quiz1">Quiz</NavLink>
            <NavLink to="/aboutus">About</NavLink>
            <NavLink to="/signup1">
              <button className="bg-button1 px-4 py-0.5 rounded-md transition-transform duration-300 transform hover:scale-110">
                {" "}
                {/* Reduced px-6 to px-4 and py-1 to py-0.5 */}
                Get Started
              </button>
            </NavLink>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl z-50 relative cursor-pointer"
            >
              {menuOpen ? "╳" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center gap-6 text-xl font-semibold">
          {" "}
          {/* Reduced gap-8 to gap-6 */}
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/blogs" onClick={() => setMenuOpen(false)}>
            Blogs
          </NavLink>
          <NavLink to="/therapist" onClick={() => setMenuOpen(false)}>
            Therapist
          </NavLink>
          <NavLink to="/quiz" onClick={() => setMenuOpen(false)}>
            Quiz
          </NavLink>
          <NavLink to="/aboutus" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/signup1" onClick={() => setMenuOpen(false)}>
            <button className="bg-button1 px-4 py-1 rounded-md">
              {" "}
              {/* Reduced px-6 to px-4 and py-2 to py-1 */}
              Get Started
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
