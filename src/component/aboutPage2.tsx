"use client";
import React, { useState } from "react";

const AboutPage = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <section className=" relative bg-[#ECECEC] p-6 ">
      <div className=" w-full container mx-auto rounded-[32px]  text-black">
        <section
          id="shiplux"
          className="w-full h-fit flex flex-col-reverse md:flex-row gap-4 mb-[60px]"
        >
          <div className="w-full md:w-[55%] bg-white rounded-[32px] shadow-lg mt-12 md:mt-0 ">
            <h2 className="text-center mb-6 text-gray-900 mt-4 pt-6">
              <span className="text-[35px] ">About Us</span>
            </h2>
            <div className="text-lg text-gray-700 text-justify space-y-4 p-4">
              <p>
                Mica Transportation LLC is a family-owned, insured, and
                customer-focused company dedicated to the safe, reliable, and
                affordable transport of all vehicles, including classic, exotic,
                luxury, and everyday cars. We proudly serve individuals,
                businesses, dealerships, and auction houses, ensuring every
                vehicle is handled with professionalism and care. With both
                enclosed and open transport options, we offer the right balance
                of protection and cost-effectiveness to meet our customers’
                needs.
              </p>

              <div className="block lg:hidden">
                {isReadMore && (
                  <p>
                    We understand the value of your vehicle and the importance
                    of on-time, damage-free delivery. Whether you’re a
                    collector, dealer, auction buyer, business, or simply
                    relocating a vehicle, our team is committed to providing a
                    seamless experience with personalized service, efficiency,
                    and attention to detail. At Mica Transportation LLC, we make
                    vehicle transport safe, simple, and stress-free.
                  </p>
                )}
              </div>

              <div className="hidden lg:block">
                <p>
                  We understand the value of your vehicle and the importance of
                  on-time, damage-free delivery. Whether you’re a collector,
                  dealer, auction buyer, business, or simply relocating a
                  vehicle, our team is committed to providing a seamless
                  experience with personalized service, efficiency, and
                  attention to detail. At Mica Transportation LLC, we make
                  vehicle transport safe, simple, and stress-free.
                </p>
              </div>
              <button
                onClick={toggleReadMore}
                className="text-blue-500 font-medium block lg:hidden hover:text-blue-700 transition-all"
              >
                {isReadMore ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
          <div className="hidden md:block flex md:w-[45%] rounded-[32px] h-[700px] lg:h-auto relative">
            <img
              alt="destination image"
              sizes="100vw"
              srcSet="/car/imageenclosed1.jpeg"
              src="/car/imageOpen2.jpeg"
              decoding="async"
              data-nimg="fill"
              className=" md:w-full rounded-[32px] shadow-lg object-cover h-full"
              loading="lazy"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                color: "transparent",
              }}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
