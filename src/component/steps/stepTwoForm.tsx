"use client";
import React, { useState, useEffect } from "react";

interface StepTwoProps {
  vehicleYear: string;
  setVehicleYear: (value: string) => void;
  vehicleModel: string;
  setVehicleModel: (value: string) => void;
  vehicleMaker: string;
  setVehicleMaker: (value: string) => void;
  vehicleType: string;
  setVehicleType: (value: string) => void;
}

const StepTwoComponent: React.FC<StepTwoProps> = ({
  vehicleYear,
  setVehicleYear,
  vehicleModel,
  setVehicleModel,
  vehicleMaker,
  setVehicleMaker,
}) => {
  const [vehicles, setVehicles] = useState<
    Array<{
      image: string;
      title: string;
      start_production?: number;
      class: string;
    }>
  >([]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/car.json"); // Update this path to your JSON file
      console.log("response ", response);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: Array<{
        image: string;
        title: string;
        start_production?: number;
        class: string;
      }> = await response.json();
      setVehicles(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleMakerChange = (maker: string) => {
    setVehicleMaker(maker);
    setVehicleModel(""); // Clear model when maker changes
    setVehicleYear(""); // Clear year when maker changes
  };

  const handleModelChange = (model: string) => {
    setVehicleModel(model);
    const vehicle = vehicles.find((v) => v.title === model);
    if (vehicle?.start_production) {
      setVehicleYear(vehicle.start_production.toString());
    } else {
      setVehicleYear(""); // Clear year if no matching vehicle found
    }
  };

  // Extract unique makers
  const makers = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.title.split(" ")[0]))
  );

  // Filter models based on selected maker
  const filteredModels = vehicles
    .filter((vehicle) => vehicle.title.startsWith(vehicleMaker))
    .map((vehicle) => vehicle.title);

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>

      <div className="relative z-0 w-full mb-5 group">
        <select
          name="vehicle_maker"
          id="vehicle_maker"
          value={vehicleMaker}
          onChange={(e) => handleMakerChange(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          required
        >
          <option value="">Select Maker</option>
          {makers.map((maker, index) => (
            <option key={index} value={maker}>
              {maker}
            </option>
          ))}
        </select>
        <label
          htmlFor="vehicle_maker"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 scale-80 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Maker
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          name="vehicle_model"
          id="vehicle_model"
          value={vehicleModel}
          onChange={(e) => handleModelChange(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          required
        >
          <option value="">Select Model</option>
          {filteredModels.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
        <label
          htmlFor="vehicle_model"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 scale-80 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Model
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="vehicle_year"
          id="vehicle_year"
          value={vehicleYear}
          onChange={(e) => setVehicleYear(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="vehicle_year"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Year
        </label>
      </div>
    </div>
  );
};

export default StepTwoComponent;
