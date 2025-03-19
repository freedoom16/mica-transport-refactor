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

  return (
    <section id="about-us">
      <div className="w-full bg-[#ECECEC] py-24 p-6">
        <div className="container mx-auto relative mt-16">
          <section id="/#quote" className="">
            <p className="text-[20px] text-gray-900 font-bold mb-2 text-center">
              Shipping Quote Calculator
            </p>
            <div className=" max-w-md w-full block md:hidden">
              <QouetForm />
            </div>
          </section>
          <div className="flex flex-col  md:p-0 lg:flex-row items-center relative">
            <div className="w-full bg-white rounded-[32px] shadow-lg md:relative mt-12">
              <div className="p-8">
                <h2 className="text-center mb-8 text-gray-900">
                  <span className="text-[35px] ">{stepContent.title}</span>
                </h2>
                <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentItems.map((point, index) => (
                      <div
                        key={index}
                        className="p mb-4 text-gray-900 flex items-center"
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500 w-4 h-4 mr-2"
                        />
                        <span className="text-[20px]">{point}</span>
                      </div>
                    ))}
                  </div>
                  {/* Pagination buttons with justify-between */}
                  <div className="flex w-full justify-between mt-4">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 0}
                      className="px-4 py-2 bg-[#6DB8D1] text-white rounded-full disabled:bg-gray-300"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages - 1}
                      className="px-6 py-2 bg-[#6DB8D1] text-white rounded-full disabled:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
