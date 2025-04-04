"use client";
import {
  faDeleteLeft,
  faRecycle,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Modal from "../modal/popup";

interface Vehicle {
  vehicleYear: string;
  vehicleModel: string;
  vehicleMaker: string;
  type: string; // "Open" or "Enclosed"
  isDrivable: boolean | null;
  category: string;
  sameLocation: boolean | null;
  vehicleId: string;
}

interface StepTwoProps {
  vehicles: Vehicle[];
  //   setVehicles: (vehicles: Vehicle[]) => void;
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  currentVehicleIndex: number;
  setCurrentVehicleIndex: React.Dispatch<React.SetStateAction<number>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  isNextEnabled: boolean | string;
}

const StepTwoComponentTest: React.FC<StepTwoProps> = ({
  setVehicles,
  vehicles,
  currentVehicleIndex,
  setCurrentVehicleIndex,
  errors,
  setErrors,
  currentStep,
  totalSteps,
  onNext,
  isNextEnabled,
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
  const [message, setMessage] = useState<string>("");
  const [sameLocation, setSameLocation] = useState<boolean | null>(null);

  const [type, setType] = useState<string>(""); // Default to "Open"
  const [isDrivable, setIsDrivable] = useState<boolean | null>(null);
  // const [categoryInput, setCategoryInput] = useState<string>(categories[0]); // Default to the first category

  const generateRandomId = Math.floor(10000 + Math.random() * 90000).toString();

  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);
  const categories = ["Van", "SUV", "Sedan", "Pick up"];

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
        sameLocation: null,
        vehicleId: generateRandomId,
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
    validateField(field, value);
  };

  // const [errors, setErrors] = useState({
  //   vehicleMaker: "",
  //   vehicleModel: "",
  //   vehicleYear: "",
  //   isDrivable: "",
  // });

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };

    switch (field) {
      case "vehicleMaker":
        newErrors.vehicleMaker = value ? "" : "Vehicle maker is required";
        break;
      case "vehicleModel":
        newErrors.vehicleModel = value ? "" : "Vehicle model is required";
        break;
      case "vehicleYear":
        const currentYear = new Date().getFullYear();
        newErrors.vehicleYear =
          value &&
          /^\d{4}$/.test(value) &&
          value >= 1900 &&
          value <= currentYear
            ? "" // Valid year
            : "Enter a valid year ";
        break;
      case "isDrivable":
        newErrors.isDrivable =
          value !== null ? "" : "Drivable status is required";
        break;
      case "category":
        newErrors.category = value ? "" : "Category  is required";
        break;
      case "type":
        newErrors.type = value ? "" : "This field  is required";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  console.log(errors);
  const scrollToQuote = () => {
    // Use a setTimeout to ensure the DOM is ready before scrolling
    setTimeout(() => {
      const quoteElement = document.getElementById("quote-form");
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.log("Could not find the quote section to scroll.");
      }
    }, 300); // Adjust the timeout if needed (300ms delay gives time for rendering)
  };

  const handleNextMobaile = () => {
    if (currentStep < totalSteps) {
      onNext();
      // scrollToQuote(); // Scroll to "About Us" section
    }
  };

  const handleAddVehicle = () => {
    console.log("type ");

    if (
      !makerInput ||
      !modelInput ||
      !yearInput ||
      isDrivable === null ||
      !type ||
      !categoryInput
    ) {
      const newErrors = {
        vehicleMaker: makerInput ? "" : "Vehicle maker is required",
        vehicleModel: modelInput ? "" : "Vehicle model is required",
        vehicleYear: yearInput ? "" : "Vehicle year is required",
        isDrivable: isDrivable !== null ? "" : "Drivable status is required",
        type: type ? "" : "This field is required",
        category: categoryInput ? "" : "Vehicle catagory is required",
      };

      setErrors(newErrors);
      return;
    }

    if (Object.keys(errors).some((key) => errors[key] !== "")) {
      return; // Stop further execution if there are errors
    }
    // return Object.values(newErrors).every((error) => !error);

    const updatedVehicles = [...vehicles];

    // Update the vehicle at the current index or add a new one
    updatedVehicles[currentVehicleIndex] = {
      vehicleMaker: makerInput,
      vehicleModel: modelInput,
      vehicleYear: yearInput,
      type: type,
      isDrivable: isDrivable,
      category: categoryInput,
      sameLocation: sameLocation,
      vehicleId: generateRandomId,
    };

    setVehicles(updatedVehicles);

    // Reset the form fields
    setMakerInput("");
    setModelInput("");
    setYearInput("");
    setType("");
    setCategoryInput("");
    setSameLocation(null);
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
  // const handleCategoryChange = (newCategory: string) => {
  //   setCategoryInput(newCategory); // Update the local state for category
  //   updateVehicleField("category", newCategory); // Update the field in the vehicle at the current index
  // };

  const options = [
    { value: "Van", img: "car/van.svg" },
    { value: "SUV", img: "car/suv.svg" },
    { value: "Sedan", img: "car/sedan.svg" },
    { value: "Pick up", img: "car/pickup2.svg" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryInput(value);
    setIsOpen(false); // Close the dropdown after selection
    updateVehicleField("category", value); // Update the field in the vehicle at the current index
  };

  // const [filteredYears, setFilteredYears] = useState<any>();

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year.toString());
    }
    return years;
  };
  const [filteredYears, setFilteredYears] = useState(generateYearOptions());

  const handleYearInputChange = (value: any) => {
    setYearInput(value);

    // Filter the year suggestions based on user input
    const suggestions = generateYearOptions().filter((year) =>
      year.startsWith(value)
    );
    setFilteredYears(suggestions);

    // Update the vehicle field
    updateVehicleField("vehicleYear", value);
  };

  const handleYearSelect = (year: any) => {
    setYearInput(year);
    updateVehicleField("vehicleYear", year);
    setFilteredYears([]); // Clear suggestions after selection
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center text-white mb-2">
        Vehicle Information
      </h2>

      {vehicles.length > 0 && (
        <div className="mb-2">
          {vehicles.slice(0, currentVehicleIndex).map((vehicle, index) => (
            <div key={index} className="flex flex-row space-y-2 ">
              <div
                className=" flex flex-row space-x-2 bg-[#2c2c2c] text-white mb-2 p-2 grid grid-cols-[1fr_1fr_1fr__min-content_min-content] shadow-lg  rounded-xl w-full border-1 border-[#2098ee]"
                style={{
                  boxShadow: "0 0 50px -5px rgba(32, 152, 238, 0.2)",
                }}
              >
                <div className="flex flex-col pl-2">
                  <strong>Make</strong> {vehicle?.vehicleMaker}
                </div>
                <div className="flex flex-col">
                  <strong>Model</strong> {vehicle?.vehicleModel}
                </div>
                <div className="flex flex-col">
                  <strong>Year</strong> {vehicle?.vehicleYear}
                </div>

                {!vehicle.isDrivable ? (
                  <div className="flex w-8">
                    <button className="text-red-500">
                      <img
                        src={
                          vehicle.isDrivable
                            ? "/motor-svg-green.svg"
                            : "/motor-svg-red.svg"
                        }
                        width={24}
                        height={24}
                        alt="Drivable status"
                      />
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="flex w-8">
                  <button
                    className="text-red-500 "
                    onClick={() => handleRemoveVehicle(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Vehicle input form */}
      <div className="mb-2">
        <div>
          {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
        </div>
        {/* Vehicle Maker */}
        <div className="w-full flex gap-4 text-white mb-4">
          <div
            className={`w-2/4 h-14 flex  items-center text-xl cursor-pointer rounded-xl pl-4 gap-3 bg-[#2c2c2c] border ${
              type === "Open"
                ? "border-2 border-[#2098ee]"
                : " border-1 border-gray-300"
            }${errors.type ? " border-1 border-red-500" : ""}`}
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
            className={`w-2/4 h-14 flex items-center text-xl  cursor-pointer rounded-xl pl-4 gap-3 bg-[#2c2c2c] border ${
              type === "Enclosed"
                ? "border-2 border-[#2098ee]"
                : " border-1 border-gray-300"
            }${errors.type ? " border-1 border-red-500" : ""}`}
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
        {/* {errors.type && (
          <p className="text-sm text-red-500 mt-1 px-4 mb-3">{errors.type}</p>
        )} */}

        {/* Vehicle Year */}
        <div className="relative mb-4 top-0">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Vehicle Year
          </label>

          <input
            value={yearInput}
            type="number"
            onChange={(e) => handleYearInputChange(e.target.value)}
            placeholder="Year"
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
              errors.vehicleYear ? "border-red-500" : "border-[#938f99]"
            } outline-none transition-all focus:border-[#2098ee]`}
          />

          {yearInput && filteredYears?.length > 0 && (
            <ul className="absolute z-5 w-full mt-2 bg-[#2c2c2c] border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
              {filteredYears.slice(0, 5).map((year: any, idx: any) => (
                <li
                  key={idx}
                  onClick={() => handleYearSelect(year)}
                  className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1]"
                >
                  {year}
                </li>
              ))}
            </ul>
          )}

          {/* {errors.vehicleYear && (
            <p className="text-sm text-red-500 mt-1 px-4">
              {errors.vehicleYear}
            </p>
          )} */}
        </div>

        <div className="relative  mb-4  top-0">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]  text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            Vehicle Make
          </label>

          <input
            // type="text"
            value={makerInput}
            onChange={(e) => handleMakerInputChange(e.target.value)}
            placeholder="Make"
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
              errors.vehicleMaker ? "border-red-500" : "border-[#938f99]"
            } outline-none transition-all focus:border-[#2098ee]`}
          />
          {filteredMakers.length > 0 && (
            <ul className="absolute z-5 w-full mt-2 bg-[#2c2c2c] border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
              {filteredMakers.map((make, idx) => (
                <li
                  key={idx}
                  onClick={() => handleMakerSelect(make)}
                  className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1]"
                >
                  {make}
                </li>
              ))}
            </ul>
          )}
          {/* {errors.vehicleMaker && (
            <p className="text-sm text-red-500 mt-1 px-4">
              {errors.vehicleMaker}
            </p>
          )} */}
        </div>

        {/* Vehicle Model */}
        <div className="relative z-4 w-full mb-4 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]  text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            {selectedMaker ? "Vehicle Model" : "Select a maker first"}
          </label>
          <input
            type="text"
            value={modelInput}
            onChange={(e) => handleModelInputChange(e.target.value)}
            placeholder={selectedMaker ? "Model" : "Model"}
            // disabled={!selectedMaker}
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
              errors.vehicleModel ? "border-red-500" : "border-[#938f99]"
            } outline-none transition-all focus:border-[#2098ee]`}
          />

          {filteredModels.length > 0 && (
            <ul className="absolute z-4 w-full mt-2 bg-[#2c2c2c] border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
              {filteredModels.map((model, idx) => (
                <li
                  key={idx}
                  onClick={() => handleModelSelect(model.Model)}
                  className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1]"
                >
                  {model.Model}
                </li>
              ))}
            </ul>
          )}
          {/* {errors.vehicleModel && (
            <p className="text-sm text-red-500 mt-1 px-4">
              {errors.vehicleModel}
            </p>
          )} */}
        </div>

        <div className="relative mb-4">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Vehicle Catagory
          </label>

          <div
            onClick={toggleDropdown}
            className={`w-full h-14 px-3 py-2 text-sm text-white mt-1 rounded-xl bg-[#2c2c2c] border-1 ${
              errors.category ? "border-red-500" : "border-[#938f99]"
            }`}
          >
            {categoryInput ? categoryInput : "--- Select Vehicle Type ---"}
          </div>

          {isOpen && (
            <div className="absolute top-full text-white left-0 w-full bg-[#2c2c2c] border border-[#938f99] rounded-xl shadow-lg z-10 mt-2">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCategoryChange(option.value)}
                  className="flex items-center p-3 hover:bg-[#6DB8D1] cursor-pointer"
                >
                  <img
                    src={option.img}
                    alt={option.value}
                    className="mr-2 w-5 h-5"
                  />
                  {option.value}
                </div>
              ))}
            </div>
          )}
          {/* {errors.category && (
            <p className="text-sm text-red-500 mt-1 px-4">{errors.category}</p>
          )} */}
        </div>

        <div className="relative z-0 w-full mb-2 group flex flex-row">
          <label className="block text-sm font-medium text-white mr-2">
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
              <span className="text-sm text-white">Yes</span>
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
              <span className="text-sm text-white">No</span>
            </label>
          </div>
          <br></br>
        </div>
        {errors.isDrivable && (
          <div className="text-sm text-red-500 px-4">{errors.isDrivable}</div>
        )}
      </div>

      {/* Add Vehicle Button */}
      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gradient-to-r from-blue-800 to-[#2098ee]  text-white py-2 px-5 rounded-full"
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </button>
        <button
          type="button"
          className={`px-8 py-2 rounded-full shadow-xl bg-gradient-to-r from-blue-800 to-[#2098ee]  text-white   ${
            isNextEnabled
              ? "border-2 border-[#2098ee] text-white font-bold"
              : "border-1 border-gray-900 text-white"
          }`}
          onClick={handleNextMobaile}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwoComponentTest;
