"use client";
import React from "react";
import QouetForm from "./quoetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SectionOne = () => {
  const stepContent = {
    title: "Why Us",
    points: [
      "Create your order and submit it",
      "Receive a call from us",
      "Agree electronically",
      "Make payment online or over the phone",
      "We get the job done with no hassle",
      "24/7 on-call support",
      "Support via email",
      "Support via text",
      "Licensed",
      "Insured",
    ],
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(stepContent.points.length / itemsPerPage);

  // Slice the points array based on the current page
  const currentItems = stepContent.points.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle the "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <section id="about-us">
      <div className="w-full bg-[#ECECEC] py-12 md:py-6 p-6">
        <div className="container mx-auto relative ">
          {/* <section id="quote" className="">
            <p className="text-[20px] md:hidden text-gray-900 font-bold mb-2 text-center p-5">
              Shipping Quote Calculator
            </p>
            <div className=" max-w-md w-full block md:hidden">
              <QouetForm />
            </div>
          </section> */}
          <section
            id="shiplux"
            className="w-full h-fit flex flex-col-reverse  lg:flex-row gap-4 mb-[60px]"
          >
            <div className="w-full lg:w-[50%] bg-white rounded-[32px] shadow-lg mt-12 lg:mt-0 ">
              <h2 className="text-center mb-3 text-black mt-4 pt-6">
                <span className="text-[35px] font-bold">About Us</span>
              </h2>
              <div className="text-[20px] text-gray-900 text-justify space-y-4 p-4">
                <p>
                  Mica Transportation LLC is a family-owned, insured, and
                  customer-focused company dedicated to the safe, reliable, and
                  affordable transport of all vehicles, including classic,
                  exotic, luxury, and everyday cars. We proudly serve
                  individuals, businesses, dealerships, and auction houses,
                  ensuring every vehicle is handled with professionalism and
                  care. With both enclosed and open transport options, we offer
                  the right balance of protection and cost-effectiveness to meet
                  our customers’ needs.
                </p>

                <div className="block lg:hidden">
                  {isReadMore && (
                    <p>
                      We understand the value of your vehicle and the importance
                      of on-time, damage-free delivery. Whether you’re a
                      collector, dealer, auction buyer, business, or simply
                      relocating a vehicle, our team is committed to providing a
                      seamless experience with personalized service, efficiency,
                      and attention to detail. At Mica Transportation LLC, we
                      make vehicle transport safe, simple, and stress-free.
                    </p>
                  )}
                </div>

                <div className="hidden lg:block text-gray-900 ">
                  <p>
                    We understand the value of your vehicle and the importance
                    of on-time, damage-free delivery. Whether you’re a
                    collector, dealer, auction buyer, business, or simply
                    relocating a vehicle, our team is committed to providing a
                    seamless experience with personalized service, efficiency,
                    and attention to detail. At Mica Transportation LLC, we make
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
            <div className="w-full lg:w-[50%] bg-white rounded-[32px] shadow-lg mt-12 lg:mt-0 ">
              <div>
                {" "}
                <div className="p-8">
                  <h2 className="text-center mb-8 text-gray-900">
                    <span className="text-[35px] font-bold">
                      {stepContent.title}
                    </span>
                  </h2>
                  <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300">
                    <div className="w-full block lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentItems.map((point, index) => (
                        <div
                          key={index}
                          className="p mb-4 text-gray-900 flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-gray-900 w-4 h-4 mr-2"
                          />
                          <span className="text-[20px]">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Desktop View: List all items */}
                    <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300 hidden lg:block">
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stepContent.points.map((point, index) => (
                          <div
                            key={index}
                            className="p mb-4 text-gray-900 flex items-center"
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-gray-900 w-4 h-4 mr-2 border-2 border-[#6DB8D1] rounded-full"
                            />
                            <span className="text-[20px]">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-full justify-between block lg:hidden mt-4">
                      <button
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-full disabled:bg-white"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className="px-6 py-2 bg-white text-gray-900 border border-gray-900 rounded-full disabled:bg-white"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
