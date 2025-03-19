"use client";
import React, { useState } from "react";

const AboutPage = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <section className=" relative bg-[#ECECEC] p-6 ">
      <div className=" w-full container mx-auto p-6 rounded-[32px] bg-white text-black">
        <h2 className="text-center mb-8 text-gray-900">
          <span className="text-[35px] ">About Us</span>
        </h2>
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            Mica Transportation LLC is a family-owned, insured, and
            customer-focused company dedicated to the safe, reliable, and
            affordable transport of all vehicles, including classic, exotic,
            luxury, and everyday cars. We proudly serve individuals, businesses,
            dealerships, and auction houses, ensuring every vehicle is handled
            with professionalism and care. With both enclosed and open transport
            options, we offer the right balance of protection and
            cost-effectiveness to meet our customers’ needs.
          </p>

          {isReadMore && (
            <p>
              We understand the value of your vehicle and the importance of
              on-time, damage-free delivery. Whether you’re a collector, dealer,
              auction buyer, business, or simply relocating a vehicle, our team
              is committed to providing a seamless experience with personalized
              service, efficiency, and attention to detail. At Mica
              Transportation LLC, we make vehicle transport safe, simple, and
              stress-free.
            </p>
          )}

          <button
            onClick={toggleReadMore}
            className="text-blue-500 font-medium hover:text-blue-700 transition-all"
          >
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
