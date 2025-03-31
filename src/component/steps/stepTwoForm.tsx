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
  const [makes, setMakes] = useState<string[]>([]);
  const [carsByMake, setCarsByMake] = useState<Record<string, any[]>>({});
  const [makerInput, setMakerInput] = useState<string>("");
  const [modelInput, setModelInput] = useState<string>("");
  const [filteredMakers, setFilteredMakers] = useState<string[]>([]);
  const [filteredModels, setFilteredModels] = useState<any[]>([]);
  const [selectedMaker, setSelectedMaker] = useState<string>("");

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setMakes(data.makes);
        setCarsByMake(data.carsByMake);
      });
  }, []);

  const handleMakerInputChange = (index: number, value: string) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleMaker = value;
    setMakerInput(value);
    // Filter makers based on input
    setFilteredMakers(
      makes
        .filter((make) =>
          make.toLowerCase().startsWith(makerInput.toLowerCase())
        )
        .slice(0, 5)
    );
    newVehicles[index].filteredMakers = filteredMakers;

    setVehicles(newVehicles);
  };

  const handleModelInputChange = (index: number, value: string) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleModel = value;
    setModelInput(value);
    // Filter models based on input and selected maker
    if (selectedMaker && modelInput) {
      const carsForMaker = carsByMake[selectedMaker] || [];
      const uniqueModels = carsForMaker
        .filter((car) =>
          car.Model.toLowerCase().startsWith(modelInput.toLowerCase())
        )
        .reduce<any[]>((unique, car) => {
          if (!unique.some((c) => c.Model === car.Model)) {
            unique.push(car);
          }
          return unique;
        }, [])
        .slice(0, 5);
      setFilteredModels(uniqueModels);
    }
    newVehicles[index].filteredModels = filteredModels;

    setVehicles(newVehicles);
  };

  const handleMakerSelect = (index: number, make: string) => {
    setMakerInput(make); // Clear the maker input
    setSelectedMaker(make); // Set the selected maker
    setFilteredMakers([]); // Clear the maker suggestions

    const newVehicles = [...vehicles];
    newVehicles[index].vehicleMaker = make;
    newVehicles[index].vehicleModel = ""; // Reset model when maker changes
    newVehicles[index].vehicleYear = ""; // Reset year when maker changes
    newVehicles[index].filteredMakers = []; // Clear filtered makers
    newVehicles[index].filteredModels = []; // Clear filtered models

    setVehicles(newVehicles);
    setFilteredMakers([]); // Clear the maker suggestions
  };

  const handleModelSelect = (index: number, model: string) => {
    setModelInput(model);

    const newVehicles = [...vehicles];
    newVehicles[index].vehicleModel = model;

    const car = carsByMake[selectedMaker]?.find((c) => c.Model === model);
    newVehicles[index].vehicleYear = car?.start_production
      ? car.start_production.toString()
      : "";

    newVehicles[index].filteredModels = [];
    setVehicles(newVehicles);
    setFilteredModels([]);
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
              // value={makerInput}
              value={vehicle.vehicleMaker}
              // onChange={(e) => setMakerInput(e.target.value)}
              onChange={(e) => handleMakerInputChange(index, e.target.value)}
              placeholder=""
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
              Vehicle Maker
            </label>
            {filteredMakers.length > 0 && (
              <ul className="absolute z-5 w-full mt-2 bg-gray-800 border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
                {filteredMakers.map((make, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleMakerSelect(index, make)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {make}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Vehicle Model */}
          <div className="relative z-4 w-full mb-5 group">
            <input
              type="text"
              // value={modelInput}
              // onChange={(e) => setModelInput(e.target.value)}
              value={vehicle.vehicleModel}
              onChange={(e) => handleModelInputChange(index, e.target.value)}
              placeholder={""}
              disabled={!selectedMaker}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
              {selectedMaker ? "Vehicle Model" : "Select a maker first"}
            </label>
            {filteredModels.length > 0 && (
              <ul className="absolute z-4 w-full mt-2 bg-gray-800 border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
                {filteredModels.map((model, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleModelSelect(index, model.Model)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {model.Model}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
