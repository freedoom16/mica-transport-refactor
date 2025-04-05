import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FeaturesBox = () => {
  return (
    <div
      className="absolute bottom-[-100px] left-[50%] transform -translate-x-1/2 z-[127] w-[90%] md:w-[80%] xl:w-[70%] h-[179px] bg-[#2c2c2c] rounded-[32px] p-4 grid  grid-cols-[1fr_1fr_2fr]  md:grid-cols-3 gap-4"
      // style={{ boxShadow: "0 -5px 50px -5px rgba(0, 0, 0, 0.1)" }}
      style={{ boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)" }}
      // style={{ boxShadow: "0 -5px 60px 10px rgba(32, 152, 238, 0.2)" }}
    >
      {/* Support Icon */}
      <div className="flex flex-col items-center justify-center font-semibold">
        <img src="24phone.svg" alt="Support Icon" className="w-16 h-8" />
        <p className=" font-bold text-[10px] md:text-[20px]  text-white ">
          24 hour
        </p>
        <p className="font-bold text-[10px] md:text-[16px] text-gray-200">
          customer care
        </p>
      </div>

      {/* Transport Icon */}
      <div className="flex flex-col items-center justify-center p-2 rounded">
        <img
          src="user-tie-svgrepo-com.svg"
          alt="Transport Icon"
          className="w-16 h-8 "
        />
        {/* <FontAwesomeIcon
          icon={faUserTie}
          width={32}
          height={16}
          className="w-8 h-8 text-[#2098ee]"
        /> */}
        <p className="font-montserrat font-bold text-[10px] md:text-[20px]  text-white">
          Professional
        </p>
        <p className="font-bold text-[10px] md:text-[16px] text-gray-200">
          transport
        </p>
      </div>

      {/* Car Icon */}
      <div className="flex flex-col items-center justify-center  p-2 rounded">
        <div className="flex flex-row space-x-1 lg:space-x-2 -mt-3 lg:-mt-0">
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
        <p className="font-montserrat -mt-3 font-bold text-[10px] md:text-[20px]  text-white">
          Enclosed/Open
        </p>
        <p className="font-bold text-[10px] md:text-[16px] text-gray-200">
          service
        </p>
      </div>
    </div>
  );
};

export default FeaturesBox;
