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
        {/* Subtitle */}
        <p className="text-base font-montserrat leading-[29px] mb-12 max-w-2xl mx-auto p-8 text-left">
          White glove service is provided to all of our customers. Have a
          special request? Call, email, or live chat us. We are here to
          accommodate all of your transport needs.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-16 p-8">
          {/* Enclosed Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/a7599d6b-enclosed.svg"
              alt="Enclosed Car Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Enclosed <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Open Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/4a370e3a-open.svg"
              alt="Open Car Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Open <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Canada Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/27da8f32-canada.svg"
              alt="Canada Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Canada
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Hawaii Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
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
          </div>

          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/a7599d6b-enclosed.svg"
              alt="Enclosed Car Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Enclosed Exotic <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Open Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/4a370e3a-open.svg"
              alt="Open Car Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Enclosed Classic <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Canada Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/27da8f32-canada.svg"
              alt="Canada Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Enclosed Antique
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Hawaii Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/5c62caf4-hawaii.svg"
              alt="Hawaii Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Heavy
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
