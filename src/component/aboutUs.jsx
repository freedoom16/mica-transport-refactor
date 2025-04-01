"use client";
import React from "react";
import QouetForm from "./quoetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
      <div className="w-full bg-[#2D2D2D]  py-12 md:py-6 p-6">
        <div className="container mx-auto relative ">
          {/* <section id="quote" className="">
            <p className="text-[20px] md:hidden text-white font-bold mb-2 text-center p-5">
              Shipping Quote Calculator
            </p>
            <div className=" max-w-md w-full block md:hidden">
              <QouetForm />
            </div>
          </section> */}
          <section
            id="shiplux"
            className="w-full h-fit flex flex-col-reverse  lg:flex-row gap-12 mb-[60px]"
          >
            <div
              className="w-full lg:w-[50%] bg-[#2c2c2c] rounded-[32px] shadow-lg mt-12 lg:mt-0 "
              // style={{ boxShadow: "0 -5px 50px -5px rgba(0, 0, 0, 0.8)" }}
              style={{ boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)" }}
            >
              <h2 className="text-center mb-3 text-white mt-4 pt-6">
                <span className="text-[35px] font-bold">About Us</span>
              </h2>
              <div className="border-b-1 border-[#2098ee] mx-4"></div>
              <div className="text-[20px] text-white text-left space-y-4 p-4">
                {/* <div className="border-b-1 border-[#2098ee] "></div> */}

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

                <div className="hidden lg:block text-white ">
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
                  className="text-[#2098ee] font-medium block lg:hidden hover:text-blue-700 transition-all"
                >
                  {isReadMore ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
            <div
              className="w-full lg:w-[50%] bg-[#2c2c2c] rounded-[32px] shadow-lg mt-12 lg:mt-0 "
              // style={{ boxShadow: "0 -5px 50px -5px rgba(0, 0, 0, 0.3)" }}
              style={{
                boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)",
              }}
            >
              <div>
                {" "}
                <div className="p-8">
                  <h2 className="text-center mb-6 text-white">
                    <span className="text-[35px] font-bold">
                      {stepContent.title}
                    </span>
                  </h2>
                  <div className="border-b-1 border-[#2098ee] mb-4"></div>

                  {/* <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300">
                    <div className="w-full block lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentItems.map((point, index) => (
                        <div
                          key={index}
                          className="p mb-4 text-white flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-[#2098ee] w-5 h-5 mr-2 border-[#2098ee]"
                          />
                          <span className="text-[20px]">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="step-content flex flex-wrap justify-between mb-8 transition-all duration-300 hidden lg:block">
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stepContent.points.map((point, index) => (
                          <div
                            key={index}
                            className="p mb-4 text-white flex items-center"
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-[#2098ee] w-4 h-4 mr-2 border-2 border-[#2098ee] rounded-full"
                            />
                            <span className="text-[20px]">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}

                  <div className="block lg:hidden">
                    <Swiper
                      modules={[Pagination, Navigation]}
                      pagination={{ clickable: true }}
                      // navigation
                      spaceBetween={20}
                      slidesPerView={1}
                      className="w-full pb-6"
                    >
                      {/* Create slides with 4 points per step */}
                      {Array.from({ length: totalPages }).map(
                        (_, pageIndex) => (
                          <SwiperSlide key={pageIndex} className="text-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                              {stepContent.points
                                .slice(
                                  pageIndex * itemsPerPage,
                                  (pageIndex + 1) * itemsPerPage
                                )
                                .map((point, index) => (
                                  <div
                                    key={index}
                                    className="p mb-4 flex items-center"
                                  >
                                    <img
                                      src="/star-svgrepo-com.svg"
                                      width={24}
                                      height={24}
                                      className="mr-2"
                                    />
                                    {/* <FontAwesomeIcon
                                      icon={faStar}
                                      className="text-[#2098ee] w-5 h-5 mr-2"
                                    /> */}
                                    <span className="text-[20px]">{point}</span>
                                  </div>
                                ))}
                            </div>
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </div>

                  {/* Larger Pagination Dots */}
                  <style tsx>{`
                    .swiper-pagination {
                        margin-top: 20px;
                        padding-top: 10px;
                    }
                    .swiper-pagination-bullet {
                      width: 20px; /* Set dot width */
                      height: 20px; /* Set dot height */
                      border-radius: 50%; /* Make the dot circular */
                      background-color: #f3f4f6
                    }
                    .swiper-pagination-bullet-active {
                      background-color: #2098ee; /* Active dot color */
                    }
                    .swiper-pagination-bullet-inactive-color: #d1d7e3;
                  `}</style>

                  {/* Desktop View: List all items */}
                  <div className="hidden lg:block">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stepContent.points.map((point, index) => (
                        <div
                          key={index}
                          className="p mb-4 text-white flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-[#2098ee] w-4 h-4 mr-2 border-2 border-[#2098ee] rounded-full"
                          />
                          <span className="text-[20px]">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <div className="flex gap-2 justify-center items-center mt-4 block lg:hidden">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        className={`w-4 h-4 rounded-full ${
                          currentPage === index ? "bg-[#2098ee]" : "bg-gray-400"
                        }`}
                        onClick={() => setCurrentPage(index)}
                      />
                    ))}
                  </div> */}
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
