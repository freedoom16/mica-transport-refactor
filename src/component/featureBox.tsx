import React from "react";

const FeaturesBox = () => {
  return (
    <div
      className="absolute bottom-[-100px] left-[50%] transform -translate-x-1/2 z-[127] w-[90%] md:w-[90%] xl:w-[80%] h-[179px] bg-white rounded-[32px] p-4 grid grid-cols-3 md:grid-cols-3 gap-4"
      style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Support Icon */}
      <div className="flex flex-col items-center justify-center">
        <img src="24phone.svg" alt="Support Icon" className="w-16 h-8" />
        <p className="font-montserrat font-bold text-[10px] md:text-[16px] text-black">
          24 hour
        </p>
        <p className="font-montserrat font-normal text-[10px] md:text-[16px] text-black">
          customer care
        </p>
      </div>

      {/* Transport Icon */}
      <div className="flex flex-col items-center justify-center p-2 rounded">
        <img
          src="truck-icon2.svg"
          alt="Transport Icon"
          className="w-16 h-8 font-bold text-blue-900"
        />
        <p className="font-montserrat font-bold text-[10px] md:text-[16px] text-black">
          Professional
        </p>
        <p className="font-montserrat font-normal text-[10px] md:text-[16px] text-black">
          transport
        </p>
      </div>

      {/* Car Icon */}
      <div className="flex flex-col items-center justify-center  p-2 rounded">
        <div className="flex flex-row space-x-1 lg:space-x-2">
          <img
            src="truckicon.svg"
            alt="Car Icon"
            className="w-16 h-14 lg:h-16 font-bold text-blue-900"
          />
          <img
            src="opentruck.svg"
            alt="Car Icon"
            className="w-16 h-14 lg:h-16 font-bold text-blue-900"
          />
        </div>
        <p className="font-montserrat font-bold text-[10px] md:text-[16px] text-black">
          Enclosed/Open
        </p>
        <p className="font-montserrat font-normal text-[10px] md:text-[16px] text-black">
          service
        </p>
      </div>
    </div>
  );
};

export default FeaturesBox;
