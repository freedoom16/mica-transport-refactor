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
  const [categoryInput, setCategoryInput] = useState<string>("");

  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);
  const categories = ["SUV", "Sedan", "Truck"];

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
    // if (!makerInput || !modelInput || yearInput) {
    //   alert("Please fill in all fields before adding a vehicle.");
    //   return;
    // }

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
      <h2 className="text-lg font-bold text-center text-gray-900 mb-4">
        Vehicle Information
      </h2>

      {vehicles.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
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
        <div className="w-full flex flex-col gap-1 mb-4">
          <div className="w-full flex gap-4 text-gray-900">
            <div className="w-2/4 h-14 flex items-center cursor-pointer rounded-xl pl-4 gap-3 bg-white border border-[#938f99]">
              <input
                type="radio"
                id="open"
                name="selection"
                required
                value="Open"
              />
              <p>Open</p>
            </div>
            <div className="w-2/4 h-14 flex items-center cursor-pointer rounded-xl pl-4 gap-3 bg-white border border-[#938f99]">
              <input
                type="radio"
                name="selection"
                id="enclosed"
                required
                value="Enclosed"
              />
              <p>Enclosed</p>
            </div>
          </div>
        </div>

        {/* Vehicle Year */}
        <div className="relative z-3 w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            Vehicle Year
          </label>
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
            placeholder="Year"
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          />
        </div>

        <div className="relative  mb-5  top-0">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            Vehicle Maker
          </label>

          <input
            // type="text"
            value={makerInput}
            onChange={(e) => handleMakerInputChange(e.target.value)}
            placeholder="Make"
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          />
          {filteredMakers.length > 0 && (
            <ul className="absolute z-5 w-full mt-2 bg-white border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-gray-900">
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
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            {selectedMaker ? "Vehicle Model" : "Select a maker first"}
          </label>
          <input
            type="text"
            value={modelInput}
            onChange={(e) => handleModelInputChange(e.target.value)}
            placeholder={selectedMaker ? "Model" : "Model"}
            // disabled={!selectedMaker}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          />

          {filteredModels.length > 0 && (
            <ul className="absolute z-4 w-full mt-2 bg-white border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-gray-900">
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

        {/* Static Category */}
        <div className="mb-5">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            Vehicle Type
          </label>
          <select
            value={categoryInput}
            onChange={(e) => {
              setCategoryInput(e.target.value);
            }}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          >
            {/* <option value="" disabled>
              --- Select Vehicle Category --
            </option> */}
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group flex flex-row">
          <label className="block text-sm font-medium text-gray-900 mr-2">
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
              <span className="text-sm text-gray-900">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="is_drivable"
                value="false"
                // onChange={(e) => setIsDerivable(e.target.value === "false")}
                className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
              />
              <span className="text-sm text-gray-900">No</span>
            </label>
          </div>
        </div>
      </div>
      {/* Add Vehicle Button */}
      <button
        type="button"
        className="bg-[#6DB8D1] text-white py-2 px-4 rounded-full"
        onClick={handleAddVehicle}
      >
        Add Vehicle
      </button>
    </div>
  );
};

export default StepTwoComponentTest;
