import React from "react";
import FeaturesBox from "./featureBox";
import HomePageForm from "./quoetForm";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <section id="home">
      <div
        id="section-1"
        className="relative block w-full h-[762px] mx-auto bg-gray-100 bg-opacity-70  bg-center bg-cover bg-no-repeat"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-start md:justify-between py-16 px-4 h-full">
          {/* Left Section */}
          <div className="text-gray-900 max-w-[600px]">
            <div id="lp-pom-text-481" className="mb-3 px-6 py-20 md:py-6">
              <p className="text-[35px] md:text-[52px] font-extrabold leading-[50px]  md:leading-[77px] font-montserrat text-left md:text-left">
                {/* enclosed or open, always professional.  */}
                ENCLOSED OR OPEN AUTO TRANSPORT.{" "}
              </p>
            </div>
            <div id="lp-pom-text-482" className="mt-2 px-6">
              <p className="text-[20px] md:text-[20px] font-semibold leading-[29px] font-montserrat text-left">
                Safely transporting all personnel, business, classic and exotic
                vehicles for individuals, dealerships, and auction houses with
                care and reliability.
              </p>
            </div>
            <FeaturesBox />
          </div>

          {/* Right Section: Form */}
          <div
            className=" z-[150] p-4 rounded-xl  max-w-lg w-full mt-6 md:mt-12 hidden md:block"
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
