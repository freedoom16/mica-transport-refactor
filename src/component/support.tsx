import React from "react";

const CustomContentSection = () => {
  return (
    <section
      className="relative w-full h-[500px] bg-gray-50 mx-auto flex flex-col md:flex-row items-center justify-center py-20 px-8"
      id="support"
    >
      {/* Left Column: Title */}
      <div
        id="lp-pom-text-233"
        className="text-gray-900 w-full md:w-1/3 font-spectral font-bold text-[25px] md:text-[30px] md:mr-8 md:px-12"
      >
        Looking for a reliable way to transport your car?
        <br></br>
        <span className=" text-[25px] font-semibold">
          {" "}
          Mica Transportion is here to make it effortless!
        </span>
      </div>

      {/* Right Column: Description and Button */}
      <div className="flex flex-col items-start space-y-8 md:px-12 w-full md:w-1/3">
        {/* Description */}
        <div
          id="lp-pom-text-236"
          className="text-gray-900 font-montserrat font-normal text-[16px] leading-[24px]"
        >
          Our car transport experts are ready to assist you?
          <br></br>call us now
          <a
            href="tel:+18555401266"
            className="text-gray-900 underline"
            target="_self"
          >
            (404) 988-4505
          </a>{" "}
          or request a quote below.
        </div>

        {/* Button */}
        <div>
          <a
            id="lp-pom-button-237"
            href="#aboutus"
            className="bg-[#6DB8D1] text-white font-bold text-[14px] leading-[17px] font-normal font-montserrat py-3 px-6 rounded-[32px] shadow-none"
          >
            REQUEST A QUOTE
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomContentSection;
