import React from "react";

const ServicesSection = () => {
  return (
    <section
      id="our-service"
      className="relative bg-gray-900 text-white py-16 "
    >
      {/* Section Container */}
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-[40px] font-bold font-spectral leading-[58px] mb-4">
          Our Services
        </h2>

        <div className="text-base font-montserrat leading-[29px] mb-12 max-w-2xl mx-auto p-8 text-[20px] text-left">
          <p>Every customer receives premium service.</p>
          <p>
            Have a special request?{" "}
            <a
              href="tel:+1234567890"
              className="text-blue-500 hover:text-blue-700 underline transition duration-200"
            >
              Call
            </a>
            ,{" "}
            <a
              href="mailto:example@example.com"
              className="text-blue-500 hover:text-blue-700 underline transition duration-200"
            >
              email
            </a>
            , or{" "}
            <a
              href="sms:+1234567890"
              className="text-blue-500 hover:text-blue-700 underline transition duration-200"
            >
              text
            </a>{" "}
            us
            <br></br>
            we’re here to meet all your transport needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-16 p-8">
          {/* Enclosed Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="opentruck.svg"
              alt="Enclosed Car Shipping"
              className="w-32 h-32 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Enclosed <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Open Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="opentruck.svg"
              alt="Open Car Shipping"
              className="w-32 h-32 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Open <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Canada Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="location.svg"
              alt="Canada Shipping"
              className="w-24 h-32 mb-2"
            />

            <p className="text-sm font-bold font-montserrat leading-6">
              USA
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Hawaii Shipping */}
          {/* <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/5c62caf4-hawaii.svg"
              alt="Hawaii Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Hawaii
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
