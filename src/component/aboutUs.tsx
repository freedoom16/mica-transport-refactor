"use client";
import React from "react";
import QouetForm from "./quoetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SectionOne = () => {
  const stepContent = {
    title: "About Us",
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

  return (
    <section id="about-us">
      <div className="w-full bg-white py-24">
        <div className="container mx-auto relative mt-16">
          <section id="/#quote">
            <div className="bg-white px-6 rounded-xl shadow-lg max-w-md w-full block md:hidden">
              <p className="text-[20px] text-gray-900 font-bold font-montserrat text-center">
                Shipping Quote Calculator
              </p>
              <QouetForm />
            </div>
          </section>
          <div className="flex flex-col p-6 md:p-0 lg:flex-row items-center relative">
            <div className="w-full  bg-white rounded-2xl shadow-lg md:relative mt-12">
              <div className=" p-8">
                <h2 className="text-center mb-8 text-gray-900">
                  <span className="text-[40px] font-bold">
                    {stepContent.title}
                  </span>
                </h2>
                <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300">
                  {/* <div
                    className="des-text mb-4 md:mb-8 w-full text-gray-900 flex items-center font-bold text-lg"
                    style={{ lineHeight: "36px", fontFamily: "Spectral" }}
                  >
                    Follow these steps to get started:
                  </div> */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stepContent.points.map((point, index) => (
                      <div
                        key={index}
                        className="p mb-4 text-gray-900 flex items-center"
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-green-500 w-4 h-4 mr-2"
                        />
                        <span className="text-[20px]">{point}</span>
                      </div>
                    ))}
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
