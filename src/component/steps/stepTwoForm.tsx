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
  const [makerSearch, setMakerSearch] = useState(""); // Temporary search term for maker
  const [modelSearch, setModelSearch] = useState(""); // Temporary search term for model

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/car.json"); // Update this path to your JSON file
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
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleMakerChange = (maker: string) => {
    setVehicleMaker(maker); // Update vehicle maker
    setMakerSearch(""); // Clear the search field after selection
    setVehicleModel(""); // Clear model when maker changes
    setVehicleYear(""); // Clear year when maker changes
  };

  const handleModelChange = (model: string) => {
    setVehicleModel(model); // Update vehicle model
    setModelSearch(""); // Clear the search field after selection
    const vehicle = vehicles.find((v) => v.title === model);
    if (vehicle?.start_production) {
      setVehicleYear(vehicle.start_production.toString());
    } else {
      setVehicleYear(""); // Clear year if no matching vehicle found
    }
  };

  const handleMakerInputChange = (value: string) => {
    setMakerSearch(value); // Update maker search term
    setVehicleMaker(value); // Keep vehicleMaker in sync with input
  };

  const handleModelInputChange = (value: string) => {
    setModelSearch(value); // Update model search term
    setVehicleModel(value); // Keep vehicleModel in sync with input
  };

  // Extract unique makers and filter them based on the makerSearch value
  const makers = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.title.split(" ")[0]))
  ).filter((maker) => maker.toLowerCase().includes(makerSearch.toLowerCase()));

  // Filter models based on the selected maker and modelSearch value
  const models = vehicles
    .filter(
      (vehicle) =>
        vehicle.title.startsWith(vehicleMaker) &&
        vehicle.title.toLowerCase().includes(modelSearch.toLowerCase())
    )
    .map((vehicle) => vehicle.title);

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>

      {/* Vehicle Maker */}
      <div className="relative z-5 w-full mb-5 group">
        <input
          type="text"
          value={makerSearch || vehicleMaker} // Show makerSearch when typing; otherwise, vehicleMaker
          onChange={(e) => handleMakerInputChange(e.target.value)} // Handle input changes
          placeholder=""
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
        />
        <label
          htmlFor="vehicle_year"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Maker
        </label>
        {makerSearch && (
          <ul className="absolute z-5 w-full mt-2 bg-gray-800 border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
            {makers.length > 0 ? (
              makers.map((maker, index) => (
                <li
                  key={index}
                  onClick={() => handleMakerChange(maker)} // Set maker on selection
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                  {maker}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No results found</li>
            )}
          </ul>
        )}
      </div>

      {/* Vehicle Model */}
      <div className="relative z-4 w-full mb-5 group">
        <input
          type="text"
          value={modelSearch || vehicleModel} // Show modelSearch when typing; otherwise, vehicleModel
          onChange={(e) => handleModelInputChange(e.target.value)} // Handle input changes
          placeholder=""
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
        />
        <label
          htmlFor="vehicle_year"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Model
        </label>
        {modelSearch && (
          <ul className="absolute z-4 w-full mt-2 bg-gray-800 border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
            {models.length > 0 ? (
              models.map((model, index) => (
                <li
                  key={index}
                  onClick={() => handleModelChange(model)} // Set model on selection
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                  {model}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No results found</li>
            )}
          </ul>
        )}
      </div>

      {/* Vehicle Year */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="vehicle_year"
          id="vehicle_year"
          value={vehicleYear}
          // onChange={(e) => setVehicleYear(e.target.value)}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value)) {
              setVehicleYear(value);
            }
          }}
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

      <div className="relative z-0 w-full mb-5 group flex flex-row">
        <label className="block text-sm font-medium text-white mr-2">
          Is this load drivable? <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center justify-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="is_drivable"
              value="true"
              // onChange={(e: any) => setIsDerivable(e.target.value === "true")}
              className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
            />
            <span className="text-sm text-white">Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="is_drivable"
              value="false"
              // onChange={(e) => setIsDerivable(e.target.value === "false")}
              className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
            />
            <span className="text-sm text-white">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepTwoComponent;
