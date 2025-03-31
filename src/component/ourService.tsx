"use client";

import React, { useState } from "react";
import Carousel from "./Carousel";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(
    "Enclosed car shipping"
  );
  const imagesOpen = [
    "/car/imageOpen2.jpeg",
    "/car/imageOpen1.jpeg",
    "/car/imageOpen3.jpeg",
  ];

  const imagesEnclosed = [
    "/car/imageenclosed1.jpeg",
    "/car/imageenclosed2.jpeg",
    "/car/imageenclosed3.jpeg",
    "/car/imageenclosed4.jpeg",
  ];

  const services = [
    {
      title: "Enclosed car shipping",
      bg: "bg-[white]",
      description:
        "Protect your investment with enclosed shipping—the safest choice for your vehicle. Luxury, exotic, and classic cars that deserve extra care.",
      img: "/car/imageenclosed2.jpeg",
    },
    {
      title: "Open car shipping",
      bg: "bg-[#EDEEF4] text-white",
      description:
        "An open auto carrier is exposed to the elements, but we ensures safe, secure, and reliable delivery.",
      img: "/car/imageOpen2.jpeg",
    },

    {
      title: "USA",
      bg: "bg-[#EDEEF4]",
      description:
        "Ship your vehicle smoothly with Mica Transportation LLC—offering dedicated, reliable, and hassle-free transport services.",
      img: "/car/imageOpen3.jpeg",
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
      className="w-full relative bg-[#2D2D2D] text-white py-16 p-6 flex flex-col-reverse lg:flex-row gap-4 pb-[60px]"
    >
      <div className="container mx-auto flex space-x-6 flex-col md:flex-row">
        {/* Left Section */}
        <div
          className="w-full lg:w-[50%] bg-[#2c2c2c] rounded-[28px] p-8 flex flex-col"
          // style={{ boxShadow: "0 -5px 50px -5px rgba(0, 0, 0, 0.8)" }}
          style={{ boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)" }}
        >
          <p className="  text-[35px] font-bold rounded-[100px] text-center px-6 py-[10px] mb-6">
            Services
          </p>
          <h2 className="text-[20px] md:text-[30px] font-medium leading-[120%] mb-8">
            Experience premium auto transport with top-tier service and
            affordability.
          </h2>
          {services.map((service, index) => (
            <div key={index}>
              <div
                className="flex flex-row justify-between border-t border-t-[#2098ee]  cursor-pointer py-4"
                onClick={() =>
                  setSelectedService(
                    selectedService === service.title ? null : service.title
                  )
                }
              >
                <p className="capitalize text-white font-medium text-[20px] md:text-[24px] whitespace-nowrap">
                  {service.title}
                </p>
                <p className={`p-[10px] bg-[#2098ee]  rounded-[100%]`}>
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
                <div className="w-full block md:hidden flex flex-col gap-4  text-white rounded-[24px] mt-4">
                  <div className="w-full h-[252px] relative">
                    <div className="w-full h-full booking-gradient opacity-50 absolute z-10 rounded-[24px]" />
                    {/* <img
                      alt="service image"
                      src={service.img}
                      className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
                    /> */}
                    {selectedService === "Enclosed car shipping" && (
                      <div>
                        {" "}
                        <Carousel images={imagesEnclosed} />
                      </div>
                    )}
                    {selectedService === "Open car shipping" && (
                      <div>
                        {" "}
                        <Carousel images={imagesOpen} />
                      </div>
                    )}
                    {selectedService === "USA" && (
                      <div>
                        <img
                          alt="service image"
                          src="/car/USAMap.jpg"
                          className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
                        />
                      </div>
                    )}
                    {selectedService === null && (
                      <div>
                        {" "}
                        <Carousel images={imagesOpen} />
                      </div>
                    )}
                    {/* <p className="text-[#6DB8D1] text-[24px] font-medium absolute z-10 bottom-5 left-4 capitalize">
                      {service.title}
                    </p> */}
                  </div>
                  <p className="text-[18px] bg-[#2c2c2c] font-medium leading-[24px] text-white pb-4">
                    {service.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div
          className="w-full lg:w-[50%]  hidden md:block flex flex-col gap-0 md:gap-4 md:space-y-4"
          style={{ boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)" }}
        >
          <div className="w-full h-auto lg:h-[70%] relative">
            <div className="w-full h-[252px] lg:h-full booking-gradient opacity-50 absolute z-10 rounded-[24px]" />
            {/* <img
              alt="service image"
              src={
                services.find((service) => service.title === selectedService)
                  ?.img || "/car/imageOpen2.jpeg"
              }
              className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
            /> */}
            {selectedService === "Enclosed car shipping" && (
              <div>
                {" "}
                <Carousel images={imagesEnclosed} />
              </div>
            )}
            {selectedService === "Open car shipping" && (
              <div>
                {" "}
                <Carousel images={imagesOpen} />
              </div>
            )}
            {selectedService === "USA" && (
              <div>
                {" "}
                <img
                  alt="service image"
                  src="/car/USAMap.jpg"
                  className="rounded-[24px] object-cover absolute inset-0 w-full h-full"
                />
              </div>
            )}
            {selectedService === null && (
              <div>
                {" "}
                <Carousel images={imagesOpen} />
              </div>
            )}

            {/* <Carousel images={imagesEnclosed} /> */}
            {/* <p className="text-white text-[35px] font-medium absolute z-10 bottom-5 left-8 capitalize">
              {selectedService || "Select a service"}
            </p> */}
          </div>
          <div
            // style={{ backgroundColor: "rgb(255, 255, 255)" }}
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
              <p className="text-[24px] bg-[#2c2c2c] font-medium leading-[32px] tracking-[0.1px]">
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
