"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // For detecting the current route
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPhone } from "@fortawesome/free-solid-svg-icons";

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center z-20 transition-colors duration-300 bg-[#ECECEC] shadow-md`}
      >
        {/* Brand Logo */}
        <div
          className={`text-gray-900 text-2xl font-bold font-montserrat mx-auto md:mx-0`}
        >
          <a href="/#home">Mica Transportion</a>
        </div>

        {/* Desktop Navigation Links */}
        <ul
          className={`hidden md:flex gap-6 text-lg font-medium text-gray-900`}
        >
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
          className={`md:hidden text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 p-6 font-bold text-gray-900`}
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Mobile icons display */}
        <button
          className={`md:hidden md:text-gray-900 text-black text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 p-6 font-bold `}
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Mobile icons display  */}
        <div className={`flex gap-4 items-center lg:hidden text-gray-900 `}>
          <a href="tel:+18554802466" className="hover:text-gray-300 text-lg">
            <FontAwesomeIcon
              icon={faPhone}
              className={`w-6 h-6 text-gray-900`}
            />
          </a>
          <a href="/#about-us" className="hover:text-gray-700 text-lg">
            <FontAwesomeIcon icon={faCar} className={`w-6 h-6 text-gray-900`} />{" "}
          </a>
        </div>

        {/* Phone Number and Request a Quote (Desktop) */}
        <div className={`hidden lg:flex gap-6 items-center text-gray-900`}>
          <div>
            <a
              href="tel:+1234567890"
              className=" text-base font-normal font-montserrat hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={faPhone}
                className="px-2"
                width={16}
                height={16}
              />
              (404) 988-4505
            </a>
          </div>
          <button>
            <a
              href="/#quote"
              className=" text-base text-white bg-[#6DB8D1] py-2 px-4 rounded-full font-bold font-montserrat hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={faCar}
                className="px-2"
                width={16}
                height={16}
              />{" "}
              Request a quote
            </a>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Overlay Style) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20  bg-black/40 ">
          <div
            className="w-[75%] p-4 h-screen flex flex-col fixed left-0  bg-white shadow-2xl  z-30"
            ref={menuRef}
          >
            <div className="flex justify-between items-center w-full px-2">
              {/* Close Button */}
              <button
                onClick={toggleMenu}
                className="text-gray-900 text-4xl font-bold"
              >
                &times;
              </button>

              {/* Centered Logo */}
              <div className="absolute left-2/3 transform -translate-x-1/2 text-gray-900 text-2xl font-bold font-montserrat w-2/3">
                Mica Transportion
              </div>
            </div>
            <a
              href="/#about-us"
              className="capitalize border-b border-[#938F99] text-[18px] font-medium p-4 text-gray-900"
              onClick={toggleMenu}
            >
              About Us
            </a>
            <a
              href="/#our-service"
              className="capitalize border-b border-[#938F99] text-[18px] font-medium p-4 text-gray-900"
              onClick={toggleMenu}
            >
              Our Service
            </a>
            <a
              href="/#support"
              className="capitalize border-b border-[#938F99] text-[18px] font-medium p-4 text-gray-900"
              onClick={toggleMenu}
            >
              Support{" "}
            </a>

            <a
              href="/#review"
              className="capitalize border-b border-[#938F99] text-[18px] font-medium p-4 text-gray-900"
              onClick={toggleMenu}
            >
              Review
            </a>
            <div className="p-4 flex flex-col space-y-4">
              <a
                href="tel:(855) 480-2466"
                className="text-gray-900 text-base mx-auto font-normal font-montserrat hover:text-gray-300"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="px-2"
                  width={16}
                  height={16}
                />
                (855) 480-2466
              </a>

              <a
                href="/#about-us"
                className="text-white font-bold bg-[#6DB8D1] mx-auto p-2 px-4 rounded-full text-sm font-semibold font-montserrat hover:text-gray-300"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon
                  icon={faCar}
                  className="px-2"
                  width={16}
                  height={16}
                />{" "}
                Request a quote
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
