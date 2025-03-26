import { faCar, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CustomContentSection = () => {
  return (
    <section
      className="relative w-full h-auto bg-gray-50 mx-auto flex flex-col lg:flex-row items-center justify-center py-20 px-8"
      id="support"
    >
      {/* Left Column: Title */}
      <div
        id="lp-pom-text-233"
        className="text-gray-900 w-full lg:w-1/3 font-spectral font-bold text-[25px] md:text-[30px] md:mr-8 md:px-12"
      >
        Looking for a reliable way to transport your car?
        <br></br>
        <span className="text-[25px] font-semibold">
          We are here to make it effortless!
        </span>
      </div>

      {/* Right Column: Description and Button */}
      <div className="flex flex-col items-start space-y-8 md:px-8 w-full lg:w-1/3">
        {/* Description */}
        <div
          id="lp-pom-text-236"
          className="text-gray-900 font-montserrat font-normal text-[20px] font-semibold leading-[24px]"
        >
          Our car transport experts are ready to assist you!
          <br></br>Call us now{" "}
          <a
            href="tel:+(404) 988-4505"
            className="text-[#6DB8D1] "
            target="_self"
          >
            +1 (404) 988-4505
          </a>{" "}
          or request a quote below.
        </div>

        {/* Button */}
        <div className="block md:hidden py-2">
          <a
            id="lp-pom-button-237"
            href="/#quote-form"
            className="bg-white border-2 border-[#6DB8D1]  text-[#6DB8D1]  font-bold text-[18px] leading-[25px]  py-3 px-6 rounded-[32px] shadow-none"
          >
            <FontAwesomeIcon
              icon={faCar}
              className="px-2"
              width={16}
              height={16}
            />{" "}
            REQUEST A QUOTE
          </a>
        </div>

        <div className="hidden w-full md:block py-2 ">
          <a
            id="lp-pom-button-237"
            href="/#home"
            className="bg-white border-2 border-[#6DB8D1]  text-[#6DB8D1] font-bold text-[14px] leading-[17px]  py-3 px-6 rounded-[32px] shadow-none"
          >
            <FontAwesomeIcon
              icon={faCar}
              className="lg:px-0 px-2  "
              width={16}
              height={16}
            />{" "}
            REQUEST A QUOTE
          </a>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="w-full lg:w-1/3 flex flex-col space-y-6 mt-12 md:mt-0 px-2 lg:px-6 lg:ml-8">
        <h3 className="text-gray-900 font-bold text-[20px] md:px-2">
          Contact Us
        </h3>
        {/* Email */}
        <div className="flex items-center space-x-2 text-[20px]">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="px-2 text-gray-900"
            width={16}
            height={16}
          />
          <a
            href="mailto:booking@micatransportation.com"
            className="text-gray-900 "
          >
            booking@micatransportation.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-2 text-[20px]">
          <FontAwesomeIcon
            icon={faPhone}
            className="px-2 text-gray-900"
            width={16}
            height={16}
          />
          <a href="tel:+(404) 988-4505" className="text-gray-900 ">
            + 1 (404) 988-4505
          </a>
        </div>

        {/* Social Media */}
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
            href="https://wa.me/14049884505"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-10 h-10"
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
    </section>
  );
};

export default CustomContentSection;
