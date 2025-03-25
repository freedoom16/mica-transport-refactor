import React from "react";
import QouetForm from "./quoetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ShipluxSection = () => {
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
    <section
      id="shiplux"
      className="w-full h-fit flex flex-col-reverse md:flex-row gap-4 mb-[60px]"
    >
      <div className="hidden md:block flex md:w-[50%] rounded-[32px] h-[500px] relative">
        <img
          alt="destination image"
          sizes="100vw"
          srcSet="/car/imageOpen2.jpeg"
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
      <div className="w-full md:w-[55%] bg-white rounded-[32px] shadow-lg mt-12 md:mt-0 ">
        <div>
          {" "}
          <div className="p-8">
            <h2 className="text-center mb-8 text-gray-900">
              <span className="text-[35px] ">{stepContent.title}</span>
            </h2>
            <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex w-full justify-between mt-4">
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
  );
};

export default ShipluxSection;
