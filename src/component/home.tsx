"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturesBox from "./featureBox";
import HomePageForm from "./quoetForm";
import imageTruck from "../../public/img/download6.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://146.190.145.241/quotes");
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="home">
      {/* <div
        id="section-1"
        className="relative block w-full h-[900px] mx-auto bg-gradient-to-r from-[#425059] to-[#9e9fa0] bg-opacity-70 bg-center bg-cover bg-no-repeat"
      > */}
      {/* <div
        id="section-1"
        className="relative block w-full z-20 h-[762px] lg:h-full mx-auto  bg-center bg-cover bg-no-repeat text-white"
        style={{
          backgroundImage: `url('/img/download10.jpeg')`,
          backgroundSize: "cover", // Ensures the image covers the full div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating
          width: "100vw", // Full viewport width
          height: "100vh", // Full viewport height
        }}
      > */}
      <div
        id="section-1"
        className="relative w-full h-screen text-white"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(66, 80, 89, 0.7), rgba(158, 159, 160, 0.1)), url('/img/download10.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Overlay */}
        <div
          id="lp-pom-block-12-color-overlay"
          className="absolute inset-0"
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-start md:justify-between py-12 lg:py-18 px-8 lg:px-34 h-full">
          {/* Left Section */}
          <div className="text-white max-w-[900px] min-h-[500px]">
            <div id="lp-pom-text-481" className="mb-3 px-6 pt-20 pb-10 md:py-6">
              <p className="text-[35px] relative lg:text-[60px] font-extrabold leading-[50px] md:leading-[77px] font-montserrat text-left md:text-left">
                ENCLOSED OR OPEN AUTO TRANSPORT
              </p>
            </div>
            <div id="lp-pom-text-482" className="mt-2 px-6">
              <p className="text-[20px] md:text-[30px] font-semibold leading-[29px] font-montserrat text-left">
                Trust us for safe, reliable vehicle transport.
                <br></br>Whether it’s your luxury, classic, or business fleet.
                <br></br>We handle every car with care.
              </p>
            </div>
            <div className="mt-0 lg:mt-12 xl:mt-0  bg-[#2D2D2D]">
              <FeaturesBox />
            </div>
          </div>

          {/* Right Section: Form */}
          {/* <div className=" z-[150] px-4 rounded-xl  max-w-lg w-full mt-6 md:mt-12 hidden xl:block min-h-[800px]">
            <HomePageForm />
          </div> */}
          {!showForm && ( // Hide button when form is displayed
            <button
              className="bg-gradient-to-r from-blue-900 to-[#2098ee] px-5 py-2 rounded-full hidden xl:block"
              onClick={() => setShowForm(true)}
            >
              <FontAwesomeIcon
                icon={faCar}
                className="text-white"
                width={16}
                height={16}
              />{" "}
              REQUEST A QUOTE
            </button>
          )}

          {showForm && (
            <div className="z-[150] px-4 rounded-xl max-w-lg w-full mt-6 md:mt-12 hidden xl:block min-h-[800px]">
              <HomePageForm />
            </div>
          )}
          {/* <div
            className="absolute right-8 top-full transform -translate-y-1/2 z-[150] p-4 rounded-xl max-w-lg w-full"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              height: "400px", // Fixed height
              overflowY: "auto", // Add scrolling for content
            }}
          >
            <HomePageForm />
          </div> */}
        </div>
      </div>
    </section>
  );
}
