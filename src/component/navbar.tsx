"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPhone } from "@fortawesome/free-solid-svg-icons";
export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center bg-white  z-20">
        {/* Brand Logo */}
        <div className=" text-black text-2xl font-bold font-montserrat mx-auto md:mx-0">
          <a href="/#home">Mica Transportion</a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-6 text-gray-900 text-lg font-medium">
          <li>
            <a href="/#about-us" className="hover:text-gray-300 cursor-pointer">
              About Us
            </a>
          </li>
          <li>
            <a
              href="/#our-service"
              className="hover:text-gray-300 cursor-pointer"
            >
              Our Service
            </a>
          </li>
          <li>
            <a href="/#support" className="hover:text-gray-300 cursor-pointer">
              Support
            </a>
          </li>
          <li>
            <a href="/#reviews" className="hover:text-gray-300 cursor-pointer">
              Review
            </a>
          </li>
        </ul>

        {/* Mobile Navbar toggle */}
        <button
          className="md:hidden md:text-white text-black text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 p-6 font-bold"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Mobile icons display  */}
        <div className="flex gap-4 items-center md:hidden">
          <a
            href="tel:+18554802466"
            className="text-black hover:text-gray-300 text-lg"
          >
            <FontAwesomeIcon icon={faPhone} className="text-black w-6 h-6" />
          </a>
          <a href="/#quoet" className="text-black hover:text-gray-300 text-lg">
            <FontAwesomeIcon icon={faCar} className="text-black w-6 h-6" />{" "}
          </a>
        </div>

        {/* Phone Number and Request a Quote (Desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <div>
            <a
              href="tel:+1234567890"
              className="text-black text-base font-normal font-montserrat hover:text-gray-200"
            >
              <FontAwesomeIcon icon={faPhone} className="px-2" />
              (855) 480-2466
            </a>
          </div>
          <div>
            <a
              href="/#quote"
              className="text-black text-base font-bold font-montserrat hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faCar} className="px-2" /> Request a quote
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Overlay Style) */}
      {isMenuOpen && (
        <div
          id="lp-pom-box-357"
          className="md:hidden fixed top-0 left-0 bg-gray-800 w-full h-[500px] z-30 flex flex-col items-center pt-4"
        >
          <div className="flex justify-between items-center w-full px-6">
            {/* Close Button */}
            <button onClick={toggleMenu} className="text-white text-3xl">
              &times;
            </button>

            {/* Centered Logo */}
            <div className="absolute left-2/3 transform -translate-x-1/2 text-white text-2xl font-bold font-montserrat w-2/3 ">
              {/* Replace with your actual logo image */}
              Mica Transportion
            </div>
          </div>

          {/* Line Below the Logo */}
          <div className="w-full border-t border-gray-500 my-4"></div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-8 items-center text-white text-lg">
            <a
              href="/#about-us"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              About Us
            </a>
            <a
              href="/#our-service"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Our Service
            </a>
            <a
              href="/#support"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Support
            </a>
            <a
              href="/#review"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Review
            </a>
            <a
              href="tel:+18554802466"
              className="text-white text-base font-normal font-montserrat hover:text-gray-300"
              onClick={toggleMenu}
            >
              (855) 480-2466
            </a>
            <a
              href="/#quote"
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
