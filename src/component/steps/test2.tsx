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

const StepTwoComponentTest: React.FC<StepTwoProps> = ({
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
    if (!makerInput || !modelInput || yearInput) {
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

  const handleRemoveVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
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
      {vehicles.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-bold text-white mb-4">
            Saved Vehicle Info
          </h2>

          {vehicles.map((vehicle, index) => (
            <div key={index} className="flex space-y-2 ">
              <div className=" flex flex-row space-x-2 bg-gray-700 mb-2 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
                <div className="flex flex-col">
                  <strong>Maker</strong> {vehicle.vehicleMaker}
                </div>
                <div className="flex flex-col">
                  <strong>Model</strong> {vehicle.vehicleModel}
                </div>
                <div className="flex flex-col">
                  <strong>Year</strong> {vehicle.vehicleYear}
                </div>
                <div className="flex ">
                  <button
                    className="text-red-500 "
                    onClick={() => handleRemoveVehicle(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
            // onChange={(e) => setYearInput(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,4}$/.test(value)) {
                // Allow only numeric input up to 4 digits
                const newVehicles = [...vehicles];
                // newVehicles[index].vehicleYear = value;
                setYearInput(e.target.value);
              }
            }}
            placeholder=""
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          />
          <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
            Vehicle Year
          </label>
        </div>
        {/* <div className="relative z-0 w-full mb-5 group">
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
        </div> */}

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

export default StepTwoComponentTest;
