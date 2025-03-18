"use client";
import React, { useState, useEffect } from "react";

interface Vehicle {
  vehicleYear: string;
  vehicleModel: string;
  vehicleMaker: string;
}

interface StepTwoProps {
  vehicles: Vehicle[];
  //   setVehicles: (vehicles: Vehicle[]) => void;
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const StepTwoComponent: React.FC<StepTwoProps> = ({
  setVehicles,
  vehicles,
}) => {
  //   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [carsByMake, setCarsByMake] = useState<Record<string, any[]>>({});
  const [makerInput, setMakerInput] = useState<string>("");
  const [modelInput, setModelInput] = useState<string>("");
  const [yearInput, setYearInput] = useState<string>("");
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

  const handleAddVehicle = () => {
    if (!makerInput || !modelInput || !yearInput) {
      alert("Please fill in all fields before adding a vehicle.");
      return;
    }

    // Add the current form data to the vehicles list
    setVehicles([
      ...vehicles,
      {
        vehicleMaker: makerInput,
        vehicleModel: modelInput,
        vehicleYear: yearInput,
      },
    ]);

    // Reset the form fields
    setMakerInput("");
    setModelInput("");
    setYearInput("");
    setFilteredMakers([]);
    setFilteredModels([]);
    setSelectedMaker("");
  };

  const handleMakerSelect = (make: string) => {
    setMakerInput(make);
    setSelectedMaker(make);
    setFilteredMakers([]);
  };

  const handleModelSelect = (model: string) => {
    setModelInput(model);
    setFilteredModels([]);
  };

  const handleMakerInputChange = (value: string) => {
    setMakerInput(value);
    setFilteredMakers(
      makes
        .filter((make) => make.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 5)
    );
  };

  const handleModelInputChange = (value: string) => {
    setModelInput(value);
    if (selectedMaker) {
      const carsForMaker = carsByMake[selectedMaker] || [];
      const uniqueModels = carsForMaker
        .filter((car) =>
          car.Model.toLowerCase().startsWith(value.toLowerCase())
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
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>
      Display saved vehicles
      {/* {vehicles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Saved Vehicles:</h3>
          <ul className="space-y-2">
            {vehicles.map((vehicle, index) => (
              <li
                key={index}
                className="text-sm text-white bg-gray-800 p-2 rounded"
              >
                <strong>Maker:</strong> {vehicle.vehicleMaker},{" "}
                <strong>Model:</strong> {vehicle.vehicleModel},{" "}
                <strong>Year:</strong> {vehicle.vehicleYear}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {vehicles.map((vehicle, index) => (
        <div key={index}>
          <p>
            <strong>Maker:</strong> {vehicle.vehicleMaker} <br />
            <strong>Model:</strong> {vehicle.vehicleModel} <br />
            <strong>Year:</strong> {vehicle.vehicleYear}
          </p>
        </div>
      ))}
      {/* Vehicle input form */}
      <div className="mb-6">
        {/* Vehicle Maker */}
        <div className="relative z-5 w-full mb-5 group">
          <input
            type="text"
            value={makerInput}
            onChange={(e) => handleMakerInputChange(e.target.value)}
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
                  onClick={() => handleMakerSelect(make)}
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
            value={modelInput}
            onChange={(e) => handleModelInputChange(e.target.value)}
            placeholder=""
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
                  onClick={() => handleModelSelect(model.Model)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                  {model.Model}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vehicle Year */}
        <div className="relative z-3 w-full mb-5 group">
          <input
            type="text"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            placeholder="Enter vehicle year"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          />
          <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
            Vehicle Year
          </label>
        </div>
      </div>
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
