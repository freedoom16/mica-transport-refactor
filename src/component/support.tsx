import React from "react";

const CustomContentSection = () => {
  return (
    <section
      className="relative w-full h-[500px] bg-gray-700 mx-auto flex flex-col md:flex-row items-center justify-center py-20 px-8"
      id="support"
    >
      {/* Left Column: Title */}
      <div
        id="lp-pom-text-233"
        className="text-white w-full md:w-1/3 font-spectral font-bold text-[25px] md:text-[45px] leading-[77px] md:mr-8 md:px-12"
      >
        Ready to transport your car with Shiplux?
      </div>

      {/* Right Column: Description and Button */}
      <div className="flex flex-col items-start space-y-8 md:px-12 w-full md:w-1/3">
        {/* Description */}
        <div
          id="lp-pom-text-236"
          className="text-white font-montserrat font-normal text-[16px] leading-[24px]"
        >
          Our car shipping advisors are available to answer all your questions
          by calling{" "}
          <a
            href="tel:+18555401266"
            className="text-white underline"
            target="_self"
          >
            (855) 540-1266
          </a>{" "}
          or request a quote below.
        </div>

        {/* Button */}
        <div>
          <a
            id="lp-pom-button-237"
            href="#lp-pom-block-12"
            className="bg-[rgba(217,166,130,1)] text-black text-[14px] leading-[17px] font-normal font-montserrat py-3 px-6 rounded-[32px] shadow-none"
          >
            REQUEST A QUOTE
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomContentSection;
