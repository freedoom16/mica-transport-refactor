"use client";

import React, { useState } from "react";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      title: "Enclosed car shipping",
      bg: "bg-[#EDEEF4]",
      description:
        "Enclosed shipping ensures maximum protection for your vehicle. It's ideal for luxury, exotic, or classic cars requiring extra care.",
    },
    {
      title: "Open car shipping",
      bg: "bg-[#EDEEF4] text-white",
      description:
        "An open auto carrier is just that: open on all sides. While it might pick up some dust along the way, ShipLux’s Premium Service ensures superior safety and handling of your vehicle during its shipping journey.",
    },

    {
      title: "USA",
      bg: "bg-[#EDEEF4]",
      description:
        "Ship your vehicle seamlessly to or from Canada and Hawaii with our dedicated and reliable services.",
    },
    // {
    //   title: "Special request",
    //   bg: "bg-[#EDEEF4]",
    //   description:
    //     "Have unique transportation needs? Contact us for customized shipping solutions tailored to your requirements.",
    // },
  ];

  return (
    <section
      id="services"
      className="w-full relative bg-[#ECECEC] text-gray-900 py-16 p-6 flex flex-col-reverse lg:flex-row gap-4 pb-[60px]"
    >
      <div className="container mx-auto flex space-x-6 flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-[45%] bg-white rounded-[28px] p-8 flex flex-col">
          <p className=" uppercase text-[30px] rounded-[100px] text-center px-6 py-[10px] mb-6">
            services
          </p>
          <h2 className="text-[20px] md:text-[45px] font-medium leading-[120%] mb-8">
            Experience the convenience of world-class auto transport at an
            affordable price
          </h2>
          {services.map((service, index) => (
            <div key={index}>
              <div
                className="flex flex-row justify-between border-t border-t-[#D0CAED] cursor-pointer py-4"
                onClick={() =>
                  setSelectedService(
                    selectedService === service.title ? null : service.title
                  )
                }
              >
                <p className="capitalize text-[#000E5E] font-medium text-[24px]">
                  {service.title}
                </p>
                <p className={`p-[10px] ${service.bg} rounded-[100%]`}>
                  <img
                    alt="arrow"
                    src="/arrow_forward.38aa47a7.svg"
                    width="24"
                    height="24"
                    loading="lazy"
                    className={
                      selectedService === service.title ? "rotate-90" : ""
                    }
                    style={{ transition: "transform 0.3s ease" }}
                  />
                </p>
              </div>
              {/* Expandable Content for Mobile */}
              {selectedService === service.title && (
                <div className="w-full block md:hidden flex flex-col gap-4 p-4 bg-[#F9F9F9] rounded-[24px] mt-4">
                  <div className="w-full h-[252px] relative">
                    <div className="w-full h-full booking-gradient opacity-50 absolute z-10 rounded-[24px]" />
                    <img
                      alt="service image"
                      src="https://shipluxwp.wpengine.com/wp-content/uploads/2023/10/openCarShipping.png"
                      className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
                    />
                    <p className="text-white text-[24px] font-medium absolute z-10 bottom-5 left-4 capitalize">
                      {service.title}
                    </p>
                  </div>
                  <p className="text-[18px] font-medium leading-[24px] text-[#000]">
                    {service.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[54%]  hidden md:block flex flex-col gap-0 md:gap-4 md:space-y-4">
          <div className="w-full h-[252px] lg:h-[70%] relative">
            <div className="w-full h-[252px] lg:h-full booking-gradient opacity-50 absolute z-10 rounded-[24px]" />
            <img
              alt="service image"
              src="https://shipluxwp.wpengine.com/wp-content/uploads/2023/10/openCarShipping.png"
              className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
            />
            <p className="text-white text-[35px] font-medium absolute z-10 bottom-5 left-8 capitalize">
              {selectedService || "Select a service"}
            </p>
          </div>
          <div
            style={{ backgroundColor: "rgb(120, 248, 221)" }}
            className="w-full h-[29%] p-8 rounded-[24px] flex flex-col justify-between overflow-y-scroll styled-scroll"
          >
            {/* <p className="p-[10px] w-fit bg-white rounded-[100%] mb-4">
              <img
                alt="services icon"
                src="/_next/static/media/services.55a26928.svg"
                width="24"
                height="24"
                loading="lazy"
              />
            </p> */}
            <div>
              <p className="text-[24px] font-medium leading-[32px] tracking-[0.1px]">
                {services.find((service) => service.title === selectedService)
                  ?.description || "Please select a service to view details."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Desktop View Only) */}
        {/* <div className="hidden lg:flex w-full md:w-[0%] lg:w-[0%] flex-col gap-4">
          {selectedService && (
            <>
              <div className="w-full h-[252px] lg:h-[70%] relative">
                <div className="w-full h-[252px] lg:h-full booking-gradient opacity-50 absolute z-10 rounded-[24px]" />
                <img
                  alt="service image"
                  src="https://shipluxwp.wpengine.com/wp-content/uploads/2023/10/openCarShipping.png"
                  className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
                />
                <p className="text-white text-[35px] font-medium absolute z-10 bottom-5 left-8 capitalize">
                  {selectedService}
                </p>
              </div>
              <div
                style={{ backgroundColor: "rgb(120, 248, 221)" }}
                className="w-full h-[29%] p-8 rounded-[24px] flex flex-col justify-between overflow-y-scroll styled-scroll"
              >
                <p className="p-[10px] w-fit bg-white rounded-[100%] mb-4">
                  <img
                    alt="services icon"
                    src="/_next/static/media/services.55a26928.svg"
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </p>
                <div>
                  <p className="text-[24px] font-medium leading-[32px] tracking-[0.1px]">
                    {services.find(
                      (service) => service.title === selectedService
                    )?.description ||
                      "Please select a service to view details."}
                  </p>
                </div>
              </div>
            </>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default Services;
