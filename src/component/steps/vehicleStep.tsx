"use client";
import React, { useState, useEffect } from "react";
import InputField from "../inputField/inputField";
import RadioButton from "../inputField/radioButtons";
import SelectableCardRadio from "../inputField/SelectableCardRadio";
import SelectDropdown from "../inputField/SelectDropdown";
import AutoCompleteList from "../inputField/AutoCompleteList";
import VehicleCard from "../cards/vehicleCard";
import Button from "../buttons/button";

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

  const generateRandomId = Math.floor(10000 + Math.random() * 90000).toString();

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setMakes(data.makes);
        setCarsByMake(data.carsByMake);
      });
  }, []);

  const createEmptyVehicle = (): Vehicle => ({
    vehicleMaker: "",
    vehicleModel: "",
    vehicleYear: "",
    type: "",
    isDrivable: null,
    category: "",
    sameLocation: null,
    vehicleId: generateRandomId,
  });

  const resetForm = () => {
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
  };

  const updateVehicleField = (field: string, value: any) => {
    // Create a copy of the vehicles array
    const updatedVehicles = [...vehicles];

    if (!updatedVehicles[currentVehicleIndex]) {
      updatedVehicles[currentVehicleIndex] = createEmptyVehicle();
    }

    updatedVehicles[currentVehicleIndex] = {
      ...updatedVehicles[currentVehicleIndex],
      [field]: value,
    };

    setVehicles(updatedVehicles);
    validateField(field, value);
  };

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

  const handleNextMobaile = () => {
    if (currentStep < totalSteps) {
      onNext();
    }
  };

  const handleAddVehicle = () => {
    console.log("type ", currentVehicleIndex);
    const currentVehicle =
      vehicles[currentVehicleIndex] || createEmptyVehicle();

    const {
      vehicleMaker,
      vehicleModel,
      vehicleYear,
      type,
      isDrivable,
      category,
    } = currentVehicle;

    if (
      !vehicleMaker ||
      !vehicleModel ||
      !vehicleYear ||
      isDrivable === null ||
      !type ||
      !category
    ) {
      const newErrors = {
        vehicleMaker: vehicleMaker ? "" : "Vehicle maker is required",
        vehicleModel: vehicleModel ? "" : "Vehicle model is required",
        vehicleYear: vehicleYear ? "" : "Vehicle year is required",
        isDrivable: isDrivable !== null ? "" : "Drivable status is required",
        type: type ? "" : "This field is required",
        category: category ? "" : "Vehicle category is required",
      };
      setErrors(newErrors);
      return;
    }

    if (Object.keys(errors).some((key) => errors[key] !== "")) {
      return; // Stop further execution if there are errors
    }
    // return Object.values(newErrors).every((error) => !error);

    const updatedVehicles = [...vehicles];
    updatedVehicles[currentVehicleIndex] = {
      ...currentVehicle,
      sameLocation: true,
      vehicleId: generateRandomId,
    };

    setVehicles(updatedVehicles.filter((v) => v !== undefined));

    resetForm();

    if (isEditing === true) {
      setCurrentVehicleIndex((prevIndex) => vehicles.length + 1);
      setIsEditing(false);
      return;
    }
    // Optionally increment the index for adding new vehicles
    setCurrentVehicleIndex((prevIndex) => prevIndex + 1);
    setIsEditing(false);
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

    // Remove any remaining `undefined` just in case
    const cleanedVehicles = updatedVehicles.filter(Boolean);
    setVehicles(cleanedVehicles.filter((v) => v !== undefined));
    // setVehicles(cleanedVehicles);

    console.log(
      "remove vehicles ",
      cleanedVehicles.length,
      currentVehicleIndex
    );
    // Adjust currentVehicleIndex to stay valid
    let newIndex = currentVehicleIndex;

    if (currentVehicleIndex >= cleanedVehicles.length) {
      newIndex = Math.max(0, cleanedVehicles.length - 1);
      console.log("remove vehicles 2 ", newIndex);
    } else if (currentVehicleIndex > index) {
      newIndex = currentVehicleIndex - 1;
    }

    setCurrentVehicleIndex(newIndex);
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

  const options = [
    { value: "Van", img: "car/van.svg" },
    { value: "SUV", img: "car/suv.svg" },
    { value: "Sedan", img: "car/sedan.svg" },
    { value: "Pick up", img: "car/pickup2.svg" },
    { value: "Hatchback", img: "car/hatchback.svg" },
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

  const handleClear = () => {
    handleRemoveVehicle(currentVehicleIndex);
    resetForm();

    setErrors({
      vehicleMaker: "",
      vehicleModel: "",
      vehicleYear: "",
      isDrivable: "",
      type: "",
      category: "",
    });

    // Optionally increment the index for adding new vehicles
    setCurrentVehicleIndex((prevIndex) => vehicles.length + 1);
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditVehicle = (index: number) => {
    console.log("edit index ", index);
    resetForm();

    setErrors({
      vehicleMaker: "",
      vehicleModel: "",
      vehicleYear: "",
      isDrivable: "",
      type: "",
      category: "",
    });

    setCurrentVehicleIndex(index);
    setIsEditing(true);
  };

  const handleDeleteVehicle = (index: number) => {
    handleRemoveVehicle(index);
    setCurrentVehicleIndex(vehicles.length + 4);
    setIsEditing(false); // Turn off editing after removing
  };

  console.log(
    vehicles.length > 1 || currentVehicleIndex > 1,
    vehicles.length > 1,
    currentVehicleIndex > 1,
    currentVehicleIndex
  );
  return (
    <div>
      <h2 className="text-lg font-bold text-center text-white mb-2">
        Vehicle Information
      </h2>

      {vehicles.length > 0 && (
        <div className="mb-2">
          {vehicles
            .filter((v) => v?.sameLocation)
            .map((vehicle, index) => (
              <VehicleCard
                key={index}
                vehicle={vehicle}
                index={index}
                onEdit={handleEditVehicle}
                onDelete={handleDeleteVehicle}
              />
            ))}
        </div>
      )}

      {/* Vehicle input form */}
      <div className="mb-2">
        <div>
          {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
        </div>
        <div className="w-full flex gap-4 text-white mb-4">
          <SelectableCardRadio
            name="type"
            value="Open"
            checked={
              vehicles[currentVehicleIndex]?.type === "Open" || type === "Open"
            }
            onChange={() => handleTypeChange("Open")}
            label="Open"
            error={!!errors.type}
          />

          <SelectableCardRadio
            name="type"
            value="Enclosed"
            checked={
              vehicles[currentVehicleIndex]?.type === "Enclosed" ||
              type === "Enclosed"
            }
            onChange={() => handleTypeChange("Enclosed")}
            label="Enclosed"
            error={!!errors.type}
          />
        </div>

        {/* Vehicle Year */}
        <div className="relative mb-4 top-0">
          <InputField
            value={vehicles[currentVehicleIndex]?.vehicleYear || yearInput}
            onChange={handleYearInputChange}
            placeholder="Year"
            label="Vehicle Year"
            error={!!errors.vehicleYear}
            type="number"
            inputMode="numeric"
          />

          {yearInput && filteredYears.length > 0 && (
            <AutoCompleteList
              items={filteredYears}
              onSelect={handleYearSelect}
            />
          )}
        </div>

        <div className="relative  mb-4  top-0">
          <InputField
            value={vehicles[currentVehicleIndex]?.vehicleMaker || makerInput}
            onChange={handleMakerInputChange}
            placeholder="Make"
            label="Vehicle Make"
            error={!!errors.vehicleMaker}
          />

          {filteredMakers.length > 0 && (
            <AutoCompleteList
              items={filteredMakers}
              onSelect={handleMakerSelect}
            />
          )}
        </div>

        {/* Vehicle Model */}
        <div className="relative z-4 w-full mb-4 group">
          <InputField
            value={vehicles[currentVehicleIndex]?.vehicleModel || modelInput}
            onChange={handleModelInputChange}
            placeholder={selectedMaker ? "Model" : "Model"}
            label={selectedMaker ? "Vehicle Model" : "Vehicle Model"}
            error={!!errors.vehicleModel}
          />

          {filteredModels.length > 0 && (
            <AutoCompleteList
              items={filteredModels}
              onSelect={(value) => handleModelSelect(value)}
            />
          )}
        </div>

        <SelectDropdown
          label="Vehicle Category"
          value={vehicles[currentVehicleIndex]?.category || categoryInput}
          onChange={handleCategoryChange}
          options={options} // options = [{ value: 'SUV', img: '/icons/suv.png' }, ...]
          placeholder="--- Select Vehicle Type ---"
          error={!!errors.category}
        />

        <div className="relative z-0 w-full mb-2 group flex flex-row">
          <label className="block text-sm font-medium text-white mr-2">
            Is this load drivable? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center space-x-6">
            <RadioButton
              name="isDrivable"
              value={true}
              checked={
                vehicles[currentVehicleIndex]?.isDrivable === true ||
                isDrivable === true
              }
              onChange={() => handleDrivableChange(true)}
              label="Yes"
            />
            <RadioButton
              name="isDrivable"
              value={false}
              checked={
                vehicles[currentVehicleIndex]?.isDrivable === false ||
                isDrivable === false
              }
              onChange={() => handleDrivableChange(false)}
              label="No"
            />
          </div>
          <br></br>
        </div>
        {errors.isDrivable && (
          <div className="text-sm text-red-500 px-4">{errors.isDrivable}</div>
        )}
      </div>

      <Button
        text="Skip"
        onClick={handleClear}
        styleClasses="bg-gradient-to-r from-blue-800 to-[#2098ee] text-white py-2 px-5 rounded-full mb-4"
        isVisible={
          vehicles[currentVehicleIndex] && currentVehicleIndex > 0 && !isEditing
        }
      />

      {isEditing && currentVehicleIndex !== null && (
        <div className="flex justify-between gap-4 mb-4 mt-4">
          <Button
            text="Delete Vehicle"
            onClick={() => handleDeleteVehicle(currentVehicleIndex)}
            styleClasses="text-white px-6 py-2 rounded-xl shadow-lg hover:bg-red-600 transition-all"
            isVisible={true}
          />

          <Button
            text="Save Changes"
            onClick={handleAddVehicle}
            styleClasses="bg-gradient-to-r from-blue-800 to-[#2098ee] text-white px-6 py-2 rounded-full shadow-lg transition-all"
            isVisible={true}
          />
        </div>
      )}
      {/* Add Vehicle Button */}
      <div className="flex justify-between">
        <Button
          text="Add Vehicle"
          onClick={handleAddVehicle}
          styleClasses="bg-gradient-to-r from-blue-800 to-[#2098ee] text-white py-2 px-5 rounded-full"
          isVisible={!isEditing}
        />

        <Button
          text="Next"
          onClick={handleNextMobaile}
          styleClasses={`inline-block rounded-full p-[2px] bg-gradient-to-r from-blue-800 to-[#2098ee] px-8 py-2 rounded-full shadow-xl text-[18px]   ${
            isNextEnabled || vehicles.length > 1
              ? "border-2 bg-gradient-to-r from-blue-800 to-[#2098ee] border-[#2098ee] text-white font-bold"
              : "font-bold  bg-gradient-to-r from-blue-800 to-[#2098ee] text-transparent bg-clip-text border border-[#2098ee] "
          }`}
          isVisible={true}
          disabled={!(isNextEnabled || vehicles.length > 1)}
        />
      </div>
    </div>
  );
};

export default StepTwoComponentTest;
