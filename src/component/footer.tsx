"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import CareerModal from "./modal/carrier";
import PartnershipModal from "./modal/partnership";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  return (
    <footer className="bg-[#2D2D2D]  border-t-2 border-[#2098ee]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 me-3"
                alt="FlowBite Logo"
              /> */}
              <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ">
                MicaTransportation LLC
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Our Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Review
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  {/* <a href="#" className="hover:underline"> */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="  hover:underline "
                  >
                    Career
                  </button>
                  {/* </a> */}
                  <CareerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                </li>
                <li className="mb-4">
                  {/* <a href="#" className="hover:underline"> */}
                  <button
                    onClick={() => setIsPartnershipModalOpen(true)}
                    className="  hover:underline "
                  >
                    Partnership
                  </button>
                  {/* </a> */}

                  <PartnershipModal
                    isOpen={isPartnershipModalOpen}
                    onClose={() => setIsPartnershipModalOpen(false)}
                  />
                </li>
              </ul>
            </div>
            <div>
              {/* <h2 className="mb-6 text-sm font-semibold text-white uppercase ">
                Legal
              </h2> */}
              <ul className="text-white  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-b-1 border-[#2098ee] sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center ">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              MicaTransportation LLC™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex items-center space-x-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1EU19YmKhE/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/micatransportationllc?igsh=eGcxejMyMWxtcXFy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/+1(404)9884505"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-12 h-10"
              />
            </a>
            {/* Telegram */}
            <a
              href="https://t.me/Michaelfasil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const SocialLink: React.FC<{
  href: string;
  srText: string;
  svgPath: string;
}> = ({ href, srText, svgPath }) => (
  <a href={href} className="text-gray-500 hover:text-white  ms-5">
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d={svgPath} clipRule="evenodd" />
    </svg>
    <span className="sr-only">{srText}</span>
  </a>
);
