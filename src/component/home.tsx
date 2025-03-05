import React from "react";
import FeaturesBox from "./featureBox";
import HomePageForm from "./quoetForm";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <section id="home">
      <div
        id="section-1"
        className="relative block w-full h-[762px] mx-auto bg-black/20 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/8e6cf7b9-bg_1000000000000000000028.png)",
        }}
      >
        {/* Overlay */}
        <div
          id="lp-pom-block-12-color-overlay"
          className="absolute inset-0"
        ></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between py-16 px-4 h-full">
          {/* Left Section */}
          <div className="text-white max-w-[600px]">
            <div id="lp-pom-text-481" className="mb-3 px-6">
              <p className="text-[35px] md:text-[52px] font-extrabold leading-[77px] font-montserrat text-left">
                ENCLOSED AUTO TRANSPORT
              </p>
            </div>
            <div id="lp-pom-text-482" className="mt-2 px-6">
              <p className="text-[17px] md:text-[17px] font-normal leading-[29px] font-montserrat text-left">
                We will ensure your exotic or classic automobile is transported
                in an enclosed car hauler with soft straps over the tires and
                handled with the utmost care.
              </p>
            </div>
            <FeaturesBox />
          </div>

          {/* Right Section: Form */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full mt-6 md:mt-0 hidden md:block">
            <p className="text-[20px]  font-bold  font-montserrat text-center">
              Shipping Quote Calculator
            </p>
            <HomePageForm />
          </div>
        </div>
      </div>
    </section>
  );
}
