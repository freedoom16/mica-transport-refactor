import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 me-3"
                alt="FlowBite Logo"
              /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Mica Transport
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
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
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
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
              {/* <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2> */}
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Mica Transport™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faFacebookF} className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faTwitter} className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faYoutube} className="w-8 h-8" />
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
  <a
    href={href}
    className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
  >
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
