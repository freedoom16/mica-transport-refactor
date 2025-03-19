"use client";
import { useState } from "react";

const ServiceComponent = () => {
  // State to track the expanded state for each service
  const [expandedService, setExpandedService] = useState(null);

  // Function to toggle the expanded state for each service
  const handleExpand = (serviceName: any) => {
    setExpandedService((prev) => (prev === serviceName ? null : serviceName));
  };

  // Service data
  const services = [
    {
      name: "Enclosed car",
      description: "This is a detailed description of Enclosed Car Shipping.",
    },
    {
      name: "Open car shipping",
      description: "This is a detailed description of Open Car Shipping.",
    },
    {
      name: "Usa",
      description:
        "This is a detailed description for Canada & Hawaii shipping services.",
    },
  ];

  return (
    <section
      id="our-service"
      className="relative bg-[#ECECEC] text-gray-900 py-16 p-6 "
    >
      <div className="container mx-auto text-center rounded-[32px]  shadow-2xl bg-white p-6">
        <p className="   text-[35px] px-6 py-[10px] mb-6">Services</p>
        <h2 className="text-[25px] text-left md:text-[25px] font-medium  mb-8">
          Experience the convenience of world-class auto transport at an
          affordable price
        </h2>

        {services.map((service, index) => (
          <div key={index}>
            <div
              className="flex mx-auto bg-white p-12 flex-row  justify-between border-t border-t-[#D0CAED] cursor-pointer py-4"
              onClick={() => handleExpand(service.name)}
            >
              <p className="capitalize text-gray-900 font-medium text-[20px]">
                {service.name}
              </p>
              <p className="p-[10px] bg-[#EDEEF4] rounded-[100%]">
                <img
                  alt="arrow"
                  src="/arrow_forward.38aa47a7.svg"
                  width="24"
                  height="24"
                  decoding="async"
                  className={
                    expandedService === service.name ? "rotate-90" : ""
                  }
                  style={{ transition: "transform 0.3s ease" }}
                />
              </p>
            </div>

            {/* Show description if the service is expanded */}
            {expandedService === service.name && (
              <div className="py-4 px-8 bg-white  ">
                <p className="text-black">{service.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceComponent;
