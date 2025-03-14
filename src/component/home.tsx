import React from "react";
import FeaturesBox from "./featureBox";
import HomePageForm from "./quoetForm";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <section id="home">
      <div
        id="section-1"
        className="relative block w-full h-[762px] mx-auto bg-black bg-opacity-70  bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(img/truck2.jpg)",
        }}
      >
        {/* Overlay */}
        {/* <div
          id="lp-pom-block-12-color-overlay"
          className="absolute inset-0"
        ></div> */}
        <div
          id="lp-pom-block-12-color-overlay"
          className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/90 to-black/50 opacity-70 lg:opacity-40"
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-start md:justify-between py-16 px-4 h-full">
          {/* Left Section */}
          <div className="text-white max-w-[600px]">
            <div id="lp-pom-text-481" className="mb-3 px-6 py-6">
              <p className="text-[35px] md:text-[52px] font-extrabold leading-[50px]  md:leading-[77px] font-montserrat text-left md:text-left">
                {/* enclosed or open, always professional.  */}
                ENCLOSED OR OPEN, ALWAYS PROFESSIONAL.
              </p>
            </div>
            <div id="lp-pom-text-482" className="mt-2 px-6 ">
              <p className="text-[20px] md:text-[20px] font-semibold leading-[29px] font-montserrat text-left">
                Mica Transportation LLC – Family-owned, insured, and
                customer-focused.
                <br></br> We safely transport for classic, exotic vehicles for
                individuals, dealerships, and auction houses.
              </p>
            </div>
            <FeaturesBox />
          </div>

          {/* Right Section: Form */}
          <div className=" z-[150] bg-gray-800 p-4 rounded-xl shadow-lg max-w-lg w-full mt-6 md:mt-12 hidden md:block">
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
