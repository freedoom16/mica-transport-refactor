import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCar, faTruckMoving } from "@fortawesome/free-solid-svg-icons";

const FeaturesBox = () => {
  return (
    <div className="absolute bottom-[-100px] left-[50%] transform -translate-x-1/2 z-[127] w-[90%] md:w-[90%] xl:w-[80%] h-[179px] bg-white rounded-[32px] shadow-lg flex items-center justify-around p-4">
      {/* Support Icon */}
      <div className="flex flex-col items-center justify-center">
        <img src="24phone.svg" alt="Support Icon" className="w-16 h-16" />
        <p className="font-montserrat font-bold text-[10px] md:text-[16px] text-black">
          24 hour
        </p>
        <p className="font-montserrat font-normal text-[10px] md:text-[16px] text-black">
          customer care
        </p>
      </div>

      {/* Transport Icon */}
      <div className="flex flex-col items-center justify-center">
        {/* <img
          src="//d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/68d5cca8-ico-transport.svg"
          alt="Transport Icon"
          className="w-16 h-16"
        /> */}
        <FontAwesomeIcon
          icon={faTruckMoving}
          className="w-16 h-16 text-blue-900"
        />
        <p className="font-montserrat font-bold text-[10px] md:text-[16px] text-black">
          Professional Service
        </p>
        <p className="font-montserrat font-normal text-[10px] md:text-[16px] text-black">
          transport
        </p>
      </div>

      {/* Car Icon */}
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faCar} className="w-16 h-16 text-blue-900" />{" "}
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
