"use client";
import React, { useState, useEffect } from "react";

interface Vehicle {
  vehicleYear: string;
  vehicleModel: string;
  vehicleMaker: string;
  filteredMakers: string[];
  filteredModels: string[];
}

interface StepTwoProps {
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
}

const StepTwoComponent: React.FC<StepTwoProps> = ({
  setVehicles,
  vehicles,
}) => {
  // const [vehicles, setVehicles] = useState<Vehicle[]>([
  //   {
  //     vehicleYear: "",
  //     vehicleModel: "",
  //     vehicleMaker: "",
  //     filteredMakers: [],
  //     filteredModels: [],
  //   },
  // ]);

  console.log("step two ", vehicles);
  const [allVehicles, setAllVehicles] = useState<
    Array<{ title: string; start_production?: number }>
  >([]);
  const [makers, setMakers] = useState<string[]>([]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/car.json"); // Update this path to your JSON file
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result: Array<{ title: string; start_production?: number }> =
        await response.json();
      setAllVehicles(result);

      // Extract unique makers
      const uniqueMakers = Array.from(
        new Set(result.map((vehicle) => vehicle.title.split(" ")[0]))
      );
      setMakers(uniqueMakers);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleMakerChange = (index: number, maker: string) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleMaker = maker;
    newVehicles[index].vehicleModel = ""; // Clear model when maker changes
    newVehicles[index].vehicleYear = ""; // Clear year when maker changes

    // Clear suggestions after selection
    newVehicles[index].filteredMakers = [];
    newVehicles[index].filteredModels = [];

    // Filter models based on the selected maker
    const models = allVehicles
      .filter((vehicle) => vehicle.title.startsWith(maker))
      .map((vehicle) => vehicle.title);
    newVehicles[index].filteredModels = models;

    setVehicles(newVehicles);
  };

  const handleModelChange = (index: number, model: string) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleModel = model;

    const vehicle = allVehicles.find((v) => v.title === model);
    newVehicles[index].vehicleYear = vehicle?.start_production
      ? vehicle.start_production.toString()
      : "";

    // Clear model suggestions after selection
    newVehicles[index].filteredModels = [];

    setVehicles(newVehicles);
  };

  const handleMakerInputChange = (index: number, value: string) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleMaker = value;

    // Filter makers based on input
    const suggestions = makers.filter((maker) =>
      maker.toLowerCase().includes(value.toLowerCase())
    );
    newVehicles[index].filteredMakers = suggestions;

    setVehicles(newVehicles);
  };

  const handleModelInputChange = (index: number, value: string) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleModel = value;

    // Filter models based on input and selected maker
    const suggestions = allVehicles
      .filter(
        (vehicle) =>
          vehicle.title.startsWith(newVehicles[index].vehicleMaker) &&
          vehicle.title.toLowerCase().includes(value.toLowerCase())
      )
      .map((vehicle) => vehicle.title);
    newVehicles[index].filteredModels = suggestions;

    setVehicles(newVehicles);
  };

  const handleAddVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        vehicleYear: "",
        vehicleModel: "",
        vehicleMaker: "",
        filteredMakers: [],
        filteredModels: [],
      },
    ]);
  };

  const handleRemoveVehicle = (index: number) => {
    const newVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(newVehicles);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>
      {vehicles.map((vehicle, index) => (
        <div key={index} className="mb-6">
          {/* Vehicle Maker */}
          <div className="relative z-5 w-full mb-5 group">
            <input
              type="text"
              value={vehicle.vehicleMaker}
              onChange={(e) => handleMakerInputChange(index, e.target.value)}
              placeholder=""
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
              Vehicle Maker
            </label>
            {vehicle.filteredMakers.length > 0 && (
              <ul className="absolute z-5 w-full mt-2 bg-gray-800 border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
                {vehicle.filteredMakers.map((maker, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleMakerChange(index, maker)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {maker}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Vehicle Model */}
          <div className="relative z-4 w-full mb-5 group">
            <input
              type="text"
              value={vehicle.vehicleModel}
              onChange={(e) => handleModelInputChange(index, e.target.value)}
              placeholder=""
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
              Vehicle Model
            </label>
            {vehicle.filteredModels.length > 0 && (
              <ul className="absolute z-4 w-full mt-2 bg-gray-800 border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
                {vehicle.filteredModels.map((model, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleModelChange(index, model)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {model}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Vehicle Year */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={vehicle.vehicleYear}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  // Allow only numeric input up to 4 digits
                  const newVehicles = [...vehicles];
                  newVehicles[index].vehicleYear = value;
                  setVehicles(newVehicles);
                }
              }}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=""
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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

          {/* Remove Vehicle Button */}
          {vehicles.length > 1 && (
            <button
              type="button"
              className={`text-red-500 ${
                vehicles.length > 1 ? "block" : "hidden "
              }`}
              onClick={() => handleRemoveVehicle(index)}
            >
              Remove Vehicle
            </button>
          )}
        </div>
      ))}

      {/* Add Vehicle Button */}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddVehicle}
      >
        Add Vehicle
      </button>
    </div>
  );
};

export default StepTwoComponent;
