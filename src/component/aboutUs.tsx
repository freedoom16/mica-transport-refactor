import React, { useState } from "react";
import QouetForm from "./quoetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faPhone,
  faShieldAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const SectionOne = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const stepContents = [
    {
      title: "Booking an order is easy. You are always kept in the loop.",
      // icon: (
      //   <FontAwesomeIcon
      //     icon={faCheckCircle}
      //     className="text-green-500 w-6 h-6 mr-3"
      //   />
      // ),
      points: [
        "Agree to your order electronically",
        "Know when your carrier is confirmed",
        "All orders are confirmed via email",
        "Only charged when a shipping partner is confirmed",
        "All major credit and debit cards are accepted",
        "Pay online or over the phone",
      ],
    },
    {
      title: "You choose how you would like to communicate with us:",
      // icon: (
      //   <FontAwesomeIcon
      //     icon={faPhone}
      //     className="text-blue-500 w-6 h-6 mr-3"
      //   />
      // ),
      points: [
        "Available 24hrs a day, 7 days a week",
        "Phone",
        "Live Chat",
        "Email",
      ],
    },
    {
      title:
        "We take the guesswork and verification out of your hands. This is supposed to be hassle and stress-free.",
      // icon: (
      //   <FontAwesomeIcon
      //     icon={faShieldAlt}
      //     className="text-yellow-500 w-6 h-6 mr-3"
      //   />
      // ),
      points: ["Licensed", "Bonded", "Insured"],
    },
  ];

  return (
    <section id="about-us">
      <div className="w-full bg-gray-900 py-24">
        <div className="container mx-auto relative mt-16">
          <div className="flex flex-col lg:flex-row items-center relative">
            {/* Image Section */}
            <div className="flex flex-col w-full lg:w-1/2 px-4">
              <div className="text-center mt-8">
                <p
                  className="text-white font-semibold text-[45px] p-8"
                  style={{ lineHeight: "58px", fontFamily: "Spectral" }}
                >
                  About Us
                </p>
              </div>
              <div className="w-full mb-[-8px]">
                <img
                  src="img/truck4.jpeg"
                  alt="Shiplux"
                  className="w-full h-auto mt-[-12px]"
                />
              </div>
            </div>

            {/* Steps Section */}
            <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-lg md:relative mt-12 lg:mt-[-200px] xl:mt-[-200px] lg:ml-[-100px]">
              <div className="bg-gray-800 p-8">
                <h2 className="text-center mb-8 text-white">
                  <span className="text-lg font-bold">{`0${currentStep}`}</span>
                  <span className="text-sm text-gray-500"> / 03</span>
                  &nbsp;&nbsp;
                  <span className="text-xl font-semibold">Simple Process</span>
                </h2>

                {/* Step Content */}
                <div
                  className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300"
                  key={currentStep}
                >
                  <div className="des-text mb-8 w-full text-white flex items-center">
                    {stepContents[currentStep - 1].title}
                  </div>

                  <div className="w-full md:w-1/2">
                    {stepContents[currentStep - 1].points
                      .slice(0, 3)
                      .map((point, index) => (
                        <div
                          key={index}
                          className="p mb-4 text-white flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 w-4 h-4 mr-2"
                          />
                          {point}
                        </div>
                      ))}
                  </div>

                  <div className="w-full md:w-1/2">
                    {stepContents[currentStep - 1].points
                      .slice(3)
                      .map((point, index) => (
                        <div
                          key={index}
                          className="p mb-4 text-white flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 w-4 h-4 mr-2"
                          />
                          {point}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="step-status">
                  <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center">
                      {[1, 2, 3].map((step) => (
                        <React.Fragment key={step}>
                          <div
                            className={`color-step ${
                              currentStep >= step
                                ? "bg-main-color"
                                : "bg-gray-500"
                            } w-2 h-2 rounded-full mx-2`}
                          ></div>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex">
                      <button
                        id="prev"
                        className="change-step text-main-color shadow-xl text-white rounded-lg border-gray-200 border p-4 bg-gray-700 disabled:opacity-50"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </button>
                      <button
                        id="next"
                        className="change-step text-main-color ml-4 shadow-xl text-white rounded-lg border-gray-200 border p-4 bg-gray-700 disabled:opacity-50"
                        onClick={handleNextStep}
                        disabled={currentStep === 3}
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
      </div>
    </section>
  );
};

export default SectionOne;
