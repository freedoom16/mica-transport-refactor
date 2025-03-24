"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturesBox from "./featureBox";
import HomePageForm from "./quoetForm";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("https://146.190.145.241/quotes");
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <section id="home">
      <div
        id="section-1"
        className="relative block w-full h-[762px] lg:h-full mx-auto bg-white bg-opacity-70 bg-center bg-cover bg-no-repeat"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-start md:justify-between py-12 lg:py-18 px-8 lg:px-34 h-full">
          {/* Left Section */}
          <div className="text-gray-900 max-w-[900px]">
            <div id="lp-pom-text-481" className="mb-3 px-6 pt-20 pb-10 md:py-6">
              <p className="text-[35px] lg:text-[60px] font-extrabold leading-[50px] md:leading-[77px] font-montserrat text-left md:text-left">
                ENCLOSED OR OPEN AUTO TRANSPORT
              </p>
            </div>
            <div id="lp-pom-text-482" className="mt-2 px-6">
              <p className="text-[20px] md:text-[30px] font-base leading-[29px] font-montserrat text-left">
                Safely transporting all personnel, business, classic and exotic
                vehicles for individuals, dealerships, and auction houses with
                care and reliability.
              </p>
            </div>
            <FeaturesBox />
          </div>

          {/* Right Section: Form */}
          <div
            className=" z-[150] p-4 rounded-xl  max-w-lg w-full mt-6 md:mt-12 hidden lg:block"
            // style={{ boxShadow: "0 -59px 500px -5px " }}
          >
            {/* <p className="text-[20px]  font-bold  font-montserrat text-center">
              Shipping Quote Calculator
            </p> */}
            <HomePageForm />
          </div>
        </div>
      </div>
    </section>
  );
}
