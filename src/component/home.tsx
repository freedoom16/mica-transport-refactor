import * as React from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div
      id="section-1"
      className="relative block w-full h-screen mx-auto bg-black/20 bg-center bg-cover bg-no-repeat"
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
      <div className="relative z-10 flex flex-col items-start justify-center text-white px-4 h-full max-w-[600px] ">
        <div id="lp-pom-text-481" className="mb-4 px-6">
          <p className="text-[52px] font-extrabold leading-[77px] font-montserrat text-left">
            ENCLOSED AUTO TRANSPORT
          </p>
        </div>
        <div id="lp-pom-text-482" className="mt-2 px-6">
          <p className="text-[17px] font-normal leading-[29px] font-montserrat text-left">
            We will ensure your exotic or classic automobile is transported in
            an enclosed car hauler with soft straps over the tires and handled
            with the utmost care.
          </p>
        </div>
      </div>
    </div>
  );
}
