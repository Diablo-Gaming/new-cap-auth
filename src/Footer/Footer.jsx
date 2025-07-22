import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div className="px-4 py-7 bg-white">
      <div
        className="w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-10
                      md:flex-row md:items-start md:justify-between md:space-y-0 md:text-left"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <img src="/lotus.png" alt="Logo" className="w-10 rounded-full" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Support mental health
            <br />
            awareness and wellbeing
            <br />
            through accessible
            <br />
            resources.
          </p>
        </div>

        {/* Resources */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Resources</h2>
          <div className="flex flex-col gap-1 text-gray-600 font-medium">
            <NavLink to="/blogs">Articles</NavLink>
            <NavLink to="/videos">Videos</NavLink>
            <NavLink to="/guides">Self-help Guides</NavLink>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Support</h2>
          <div className="flex flex-col gap-1 text-gray-600 font-medium">
            <NavLink to="/helplines">Helplines</NavLink>
            <NavLink to="/therapist">Find a Therapist</NavLink>
            <NavLink to="/community">Community</NavLink>
          </div>
        </div>

        {/* Connect */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Connect</h2>
          <div className="flex gap-4 justify-center md:justify-start text-gray-600 text-2xl">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
