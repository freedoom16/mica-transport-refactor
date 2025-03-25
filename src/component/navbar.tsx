"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPhone } from "@fortawesome/free-solid-svg-icons";

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

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

  // Sticky Navbar logic
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 30) {
          // When scrolled down 80px or more
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Scrollable Phone Info Header */}
      <div className="w-full bg-[#302D38] text-center py-2 z-10 md:hidden">
        <span className="text-lg font-medium text-gray-900 text-white">
          Call Us Now:{" "}
          <a
            href="tel:+1 (404) 988-4505"
            className=" text-base font-normal font-montserrat hover:text-gray-700"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="px-2"
              width={16}
              height={16}
            />
            +1 (404) 988-4505
          </a>
        </span>
      </div>

      {/* Navbar */}
      <nav
        ref={navbarRef}
        className={`md:fixed ${
          isSticky
            ? "fixed top-0 left-0 w-full bg-[#ECECEC] shadow-md z-20"
            : "relative top-0 left-0 w-full bg-[#ECECEC] shadow-md z-20"
        } px-16 lg:px-40 py-4 flex justify-between items-center transition-colors duration-300`}
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
            <a href="/#services" className="hover:text-gray-300 cursor-pointer">
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
        <div className={`flex gap-4 items-center xl:hidden text-gray-900 `}>
          <a
            href="tel:+1 (404) 988-4505"
            className="hover:text-gray-300 text-lg"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className={`w-6 h-6 text-gray-900`}
            />
          </a>
          <a href="/#quote-form" className="hover:text-gray-700 text-lg">
            <FontAwesomeIcon icon={faCar} className={`w-6 h-6 text-gray-900`} />{" "}
          </a>
        </div>

        {/* Phone Number and Request a Quote (Desktop) */}
        <div className={`hidden xl:flex gap-6 items-center text-gray-900`}>
          <div>
            <a
              href="tel:+1 (404) 988-4505"
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
          <button className="">
            <a
              href="/#home"
              className="bg-white border-2 border-[#6DB8D1]  text-[#6DB8D1]  font-bold text-[14px] leading-[17px]   py-3 px-6 rounded-[32px] shadow-none"
            >
              <FontAwesomeIcon
                icon={faCar}
                className=""
                width={16}
                height={16}
              />{" "}
              REQUEST A QUOTE
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
              <div className="absolute left-2/3 transform -translate-x-1/2 text-gray-900 text-2xl font-bold font-montserrat w-2/3 whitespace-nowrap ">
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
              href="/#services"
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
              href="/#reviews"
              className="capitalize border-b border-[#938F99] text-[18px] font-medium p-4 text-gray-900"
              onClick={toggleMenu}
            >
              Review
            </a>
            <div className="p-4 flex flex-col space-y-4">
              <a
                href="tel:+1 (404) 988-4505"
                className="text-gray-900 text-base mx-auto font-normal font-montserrat hover:text-gray-300"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="px-2"
                  width={16}
                  height={16}
                />
                (404) 988-4505
              </a>

              <a
                href="/#quote-form"
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
