"use client";
import React, { useState, useEffect } from "react";

interface Vehicle {
  vehicleYear: string;
  vehicleModel: string;
  vehicleMaker: string;
  type: string; // "Open" or "Enclosed"
  isDrivable: boolean | null;
  category: string;
}

interface StepTwoProps {
  vehicles: Vehicle[];
  //   setVehicles: (vehicles: Vehicle[]) => void;
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  currentVehicleIndex: number;
  setCurrentVehicleIndex: React.Dispatch<React.SetStateAction<number>>;
}

const StepTwoComponentTest: React.FC<StepTwoProps> = ({
  setVehicles,
  vehicles,
  currentVehicleIndex,
  setCurrentVehicleIndex,
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
  const [categoryInput, setCategoryInput] = useState<string>("Open");
  const [message, setMessage] = useState<string>("");

  const [type, setType] = useState<string>("Open"); // Default to "Open"
  const [isDrivable, setIsDrivable] = useState<boolean | null>(null);
  // const [categoryInput, setCategoryInput] = useState<string>(categories[0]); // Default to the first category

  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);
  const categories = ["Van", "SUV", "Sedan", "Truck"];

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setMakes(data.makes);
        setCarsByMake(data.carsByMake);
      });
  }, []);

  const updateVehicleField = (field: string, value: any) => {
    // Create a copy of the vehicles array
    const updatedVehicles = [...vehicles];

    if (!updatedVehicles[currentVehicleIndex]) {
      updatedVehicles[currentVehicleIndex] = {
        vehicleMaker: "",
        vehicleModel: "",
        vehicleYear: "",
        type: "",
        isDrivable: null,
        category: "",
      };
    }
    // Update the current vehicle at the specified index
    const currentVehicle = updatedVehicles[currentVehicleIndex];

    // Update the field in the current vehicle object
    switch (field) {
      case "vehicleMaker":
        currentVehicle.vehicleMaker = value;
        break;
      case "vehicleModel":
        currentVehicle.vehicleModel = value;
        break;
      case "vehicleYear":
        currentVehicle.vehicleYear = value;
        break;
      case "type":
        currentVehicle.type = value;
        break;
      case "isDrivable":
        currentVehicle.isDrivable = value;
        break;
      case "category":
        currentVehicle.category = value;
        break;
      default:
        break;
    }

    // Save the updated vehicles array back to the state
    setVehicles(updatedVehicles);
    validateFields();
  };

  const [errors, setErrors] = useState({
    vehicleMaker: "",
    vehicleModel: "",
    vehicleYear: "",
    isDrivable: "",
  });

  const validateFields = () => {
    const newErrors = {
      vehicleMaker: makerInput ? "" : "Vehicle maker is required",
      vehicleModel: modelInput ? "" : "Vehicle model is required",
      vehicleYear: yearInput ? "" : "Vehicle year is required",
      isDrivable: isDrivable !== null ? "" : "Drivable status is required",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  console.log(errors);

  const handleAddVehicle = () => {
    // if (!makerInput || !modelInput || !yearInput || isDrivable === null) {
    //   setMessage("Please fill all fields before adding a vehicle.");
    //   return;
    // }

    if (!validateFields()) {
      return;
    }
    const updatedVehicles = [...vehicles];

    // Update the vehicle at the current index or add a new one
    updatedVehicles[currentVehicleIndex] = {
      vehicleMaker: makerInput,
      vehicleModel: modelInput,
      vehicleYear: yearInput,
      type: type,
      isDrivable: isDrivable,
      category: categoryInput,
    };

    setVehicles(updatedVehicles);

    // Reset the form fields
    setMakerInput("");
    setModelInput("");
    setYearInput("");
    setCategoryInput("Open");
    setType("");
    setCategoryInput("Van");
    setIsDrivable(null);
    setFilteredMakers([]);
    setFilteredModels([]);
    setSelectedMaker("");

    // Optionally increment the index for adding new vehicles
    setCurrentVehicleIndex((prevIndex) => prevIndex + 1);
    setMessage("");
  };

  const handleMakerSelect = (make: string) => {
    setMakerInput(make);
    setSelectedMaker(make);
    updateVehicleField("vehicleMaker", make);

    setFilteredMakers([]);
    const newErrors = {
      vehicleMaker: makerInput ? "" : "Vehicle maker is required",
    };
  };

  const handleModelSelect = (model: string) => {
    setModelInput(model);
    setFilteredModels([]);
    updateVehicleField("vehicleModel", model);
  };

  const handleMakerInputChange = (value: string) => {
    setMakerInput(value);
    setFilteredMakers(
      makes
        .filter((make) => make.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 5)
    );
    updateVehicleField("vehicleMaker", value);
  };

  const handleRemoveVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);

    // Adjust the currentVehicleIndex if necessary
    if (index === currentVehicleIndex && currentVehicleIndex > 0) {
      setCurrentVehicleIndex(currentVehicleIndex - 1);
    } else if (index < currentVehicleIndex) {
      setCurrentVehicleIndex(currentVehicleIndex - 1);
    }
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
    updateVehicleField("vehicleModel", value);
  };

  // For Open/Enclosed toggle
  const handleTypeChange = (newType: string) => {
    setType(newType); // Update the local state for type
    updateVehicleField("type", newType); // Update the field in the vehicle at the current index
  };

  // For Drivable status
  const handleDrivableChange = (isDrivable: boolean) => {
    setIsDrivable(isDrivable); // Update the local state for drivable status
    updateVehicleField("isDrivable", isDrivable); // Update the field in the vehicle at the current index
  };

  // For category selection
  const handleCategoryChange = (newCategory: string) => {
    setCategoryInput(newCategory); // Update the local state for category
    updateVehicleField("category", newCategory); // Update the field in the vehicle at the current index
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

          {vehicles.slice(0, currentVehicleIndex).map((vehicle, index) => (
            <div key={index} className="flex flex-row space-y-2 ">
              <div className=" flex flex-row space-x-2 bg-white text-gray-900 mb-2 p-2 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 w-full">
                <div className="flex flex-col">
                  <strong>Maker</strong> {vehicle?.vehicleMaker}
                </div>
                <div className="flex flex-col">
                  <strong>Model</strong> {vehicle?.vehicleModel}
                </div>
                <div className="flex flex-col">
                  <strong>Year</strong> {vehicle?.vehicleYear}
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
        <div>
          {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
        </div>
        {/* Vehicle Maker */}
        <div className="w-full flex gap-4 text-gray-900 mb-4">
          <div
            className={`w-2/4 h-14 flex items-center cursor-pointer rounded-xl pl-4 gap-3 bg-white border ${
              type === "Open" ? "border-[#ECECEC]" : "border-gray-300"
            }`}
            onClick={() => handleTypeChange("Open")}
          >
            <input
              type="radio"
              name="type"
              value="Open"
              checked={type === "Open"}
              onChange={() => handleTypeChange("Open")}
              className="w-6 h-6 bg-[#ECECEC] text-[#ECECEC]"
            />
            <p>Open</p>
          </div>
          <div
            className={`w-2/4 h-14 flex items-center cursor-pointer rounded-xl pl-4 gap-3 bg-white border ${
              type === "Enclosed" ? "border-[#ECECEC]" : "border-gray-300"
            }`}
            onClick={() => handleTypeChange("Enclosed")}
          >
            <input
              type="radio"
              name="type"
              value="Enclosed"
              checked={type === "Enclosed"}
              onChange={() => handleTypeChange("Enclosed")}
              className="w-6 h-6 bg-[#ECECEC] text-[#ECECEC]"
            />
            <p>Enclosed</p>
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
                updateVehicleField("vehicleYear", value);
              }
            }}
            placeholder="Year"
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              errors.vehicleYear ? "border-red-500" : "border-[#938f99]"
            } outline-none transition-all focus:border-[#6DB8D1]`}
          />
          {errors.vehicleYear && (
            <p className="text-sm text-red-500 mt-1 px-4">
              {errors.vehicleYear}
            </p>
          )}
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
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              errors.vehicleMaker ? "border-red-500" : "border-[#938f99]"
            } outline-none transition-all focus:border-[#6DB8D1]`}
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
          {errors.vehicleMaker && (
            <p className="text-sm text-red-500 mt-1 px-4">
              {errors.vehicleMaker}
            </p>
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
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              errors.vehicleModel ? "border-red-500" : "border-[#938f99]"
            } outline-none transition-all focus:border-[#6DB8D1]`}
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
          {errors.vehicleModel && (
            <p className="text-sm text-red-500 mt-1 px-4">
              {errors.vehicleModel}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Vehicle Type
          </label>
          <select
            value={categoryInput}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-2 group flex flex-row">
          <label className="block text-sm font-medium text-gray-900 mr-2">
            Is this load drivable? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="isDrivable"
                value="true"
                checked={isDrivable === true}
                onChange={() => handleDrivableChange(true)}
                className="form-radio text-[#ECECEC] 0 w-6 h-6 border-2 border-gray-300"
              />
              <span className="text-sm text-gray-900">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="isDrivable"
                value="false"
                checked={isDrivable === false}
                onChange={() => handleDrivableChange(false)}
                className="form-radio text-[#ECECEC] w-6 h-6 border-2 border-[#ECECEC]"
              />
              <span className="text-sm text-gray-900">No</span>
            </label>
          </div>
          <br></br>
        </div>
        {errors.isDrivable && (
          <div className="text-sm text-red-500 px-4">{errors.isDrivable}</div>
        )}
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
