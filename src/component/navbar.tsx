"use client";

import React, { useState } from "react";
export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center bg-transparent z-20">
        {/* Brand Logo */}
        <div className="text-white text-2xl font-bold font-montserrat">
          BrandLogo
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-6 text-white text-lg font-medium">
          <li>
            <a href="#section-1" className="hover:text-gray-300 cursor-pointer">
              Section 1
            </a>
          </li>
          <li>
            <a href="#section-2" className="hover:text-gray-300 cursor-pointer">
              Section 2
            </a>
          </li>
          <li>
            <a href="#section-3" className="hover:text-gray-300 cursor-pointer">
              Section 3
            </a>
          </li>
          <li>
            <a href="#section-4" className="hover:text-gray-300 cursor-pointer">
              Section 4
            </a>
          </li>
        </ul>

        {/* Mobile Navbar toggle */}
        <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          &#9776;
        </button>

        {/* Phone Number and Request a Quote (Desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <div>
            <a
              href="tel:+18554802466"
              className="text-white text-base font-normal font-montserrat hover:text-gray-300"
            >
              (855) 480-2466
            </a>
          </div>
          <div>
            <a
              href="#lp-pom-box-274"
              className="text-[#d9a682] text-sm font-semibold font-montserrat hover:text-gray-300"
            >
              Request a quote
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Overlay Style) */}
      {isMenuOpen && (
        <div
          id="lp-pom-box-357"
          className="md:hidden fixed top-0 left-0 bg-black bg-opacity-80 w-full h-full z-30 flex flex-col items-center pt-20"
        >
          <div className="flex justify-between w-full px-8">
            <button onClick={toggleMenu} className="text-white text-3xl">
              &times;
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-8 items-center text-white text-lg">
            <a
              href="#section-1"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Section 1
            </a>
            <a
              href="#section-2"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Section 2
            </a>
            <a
              href="#section-3"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Section 3
            </a>
            <a
              href="#section-4"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Section 4
            </a>
            <a
              href="tel:+18554802466"
              className="text-white text-base font-normal font-montserrat hover:text-gray-300"
              onClick={toggleMenu}
            >
              (855) 480-2466
            </a>
            <a
              href="#lp-pom-box-274"
              className="text-[#d9a682] text-sm font-semibold font-montserrat hover:text-gray-300"
              onClick={toggleMenu}
            >
              Request a quote
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
