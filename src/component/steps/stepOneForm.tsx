"use client";
import {
  faCar,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import VehicleForm from "./vehiclesForms";

interface StepOneProps {
  pickupLocation: string;
  setPickupLocation: (value: string) => void;
  deliveryLocation: string;
  setDeliveryLocation: (value: string) => void;
  addressTypeForPickup: string;
  setAddressTypeForPickup: (value: string) => void;
  addressTypeForDeliver: string;
  setAddressTypeForDeliver: (value: string) => void;
  isDerivable: boolean | null;
  setIsDerivable: (value: boolean | null) => void;
  isPickupContact: boolean | null;
  setIsPickupContact: (value: boolean | null) => void;
  pickupContactName: string;
  setPickupContactName: (value: string) => void;
  pickupContactPhone: string;
  setPickupContactPhone: (value: string) => void;
  isDropoffContact: boolean | null;
  setIsDropoffContact: (value: boolean | null) => void;
  dropoffContactName: string;
  setDropoffContactName: (value: string) => void;
  dropoffContactPhone: string;
  setDropoffContactPhone: (value: string) => void;
  setErrorsLocation: React.Dispatch<React.SetStateAction<any>>;
  errorsLocation: any;
  location: any[];
  setLocation: React.Dispatch<React.SetStateAction<any[]>>;
  currentVehicleIndex: number;
  sameLocation: boolean | null;
  vehicles: any[];
  //   setVehicles: (vehicles: Vehicle[]) => void;
  setVehicles: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentVehicleIndex: React.Dispatch<React.SetStateAction<number>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
}

const StepOne: React.FC<StepOneProps> = ({
  pickupLocation,
  setPickupLocation,
  deliveryLocation,
  setDeliveryLocation,
  addressTypeForPickup,
  setAddressTypeForPickup,
  addressTypeForDeliver,
  setAddressTypeForDeliver,
  isDerivable,
  setIsDerivable,
  isPickupContact,
  setIsPickupContact,
  pickupContactName,
  setPickupContactName,
  pickupContactPhone,
  setPickupContactPhone,
  isDropoffContact,
  setIsDropoffContact,
  dropoffContactName,
  setDropoffContactName,
  dropoffContactPhone,
  setDropoffContactPhone,
  setErrorsLocation,
  errorsLocation,
  location,
  setLocation,
  currentVehicleIndex,
  sameLocation,
  vehicles,
  setVehicles,
  setCurrentVehicleIndex,
  errors,
  setErrors,
}) => {
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [deliverySuggestions, setDeliverySuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  console.log("errors location ", errorsLocation);

  const API_KEY = "f20bdd1c4a7b4139b83d4901b95d6dc4";
  // const API_KEY = "AIzaSyDUOpQCTATgps_ywDxi1U24hdvaj8NTWyc";

  const API_URL = "https://api.opencagedata.com/geocode/v1/json";

  const fetchSuggestions = async (
    query: string,
    labelSuggestion: string,
    vehicleIndex: number
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      console.log(data);

      const usaResults = data.results.filter(
        (result: any) => result.components.country_code === "us"
      );
      console.log(usaResults);

      // Update the specific vehicle's deliverySuggestions
      const updatedLocations = [...location];
      if (!updatedLocations[vehicleIndex]) {
        updatedLocations[vehicleIndex] = {}; // Ensure the vehicle location object exists
      }
      if (labelSuggestion === "pickupLocation") {
        updatedLocations[vehicleIndex].pickupSuggestions = usaResults.map(
          (result: any) => result.formatted
        );
      }

      if (labelSuggestion === "deliveryLocation") {
        updatedLocations[vehicleIndex].deliverySuggestions = usaResults.map(
          (result: any) => result.formatted
        );
      }

      setLocation(updatedLocations); // Update locations with new suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // const API_KEY = "AIzaSyBTklQmwDrHzunpPxUs1xoyNMG-tPpY_XI"; // Replace with your actual API key
  // const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

  const updateVehicleField = (field: string, value: any, vehicleIndex: any) => {
    // Create a copy of the location array
    const updateLocation = [...location];

    if (!updateLocation[vehicleIndex]) {
      updateLocation[vehicleIndex] = {
        pickupLocation: "",
        deliveryLocation: "",
        addressTypeForDeliver: "",
        addressTypeForPickup: "",

        isPickupContact: null,
        isDropoffContact: null,
        pickupContactName: "",
        pickupContactPhone: "",
        dropoffContactName: "",
        dropoffContactPhone: "",
      };
    }

    // Update the current vehicle at the specified index
    const currentVehicle = updateLocation[vehicleIndex];

    // Update the field in the current vehicle object
    switch (field) {
      case "pickupLocation":
        currentVehicle.pickupLocation = value;
        break;
      case "deliveryLocation":
        currentVehicle.deliveryLocation = value;
        break;
      case "addressTypeForDeliver":
        currentVehicle.addressTypeForDeliver = value;
        break;
      case "addressTypeForPickup":
        currentVehicle.addressTypeForPickup = value;
        break;
      case "isPickupContact":
        currentVehicle.isPickupContact = value;
        break;
      case "isDropoffContact":
        currentVehicle.isDropoffContact = value;
        break;
      case "pickupContactName":
        currentVehicle.pickupContactName = value;
        break;
      case "pickupContactPhone":
        currentVehicle.pickupContactPhone = value;
        break;
      case "dropoffContactName":
        currentVehicle.dropoffContactName = value;
        break;
      case "dropoffContactPhone":
        currentVehicle.dropoffContactPhone = value;
        break;
      default:
        break;
    }

    // Save the updated location array back to the state
    setLocation(updateLocation);
    validateField(field, value, vehicleIndex);
  };

  const validateField = (field: string, value: any, vehicleIndex: any) => {
    // Create a deep copy of the errorsLocation state to avoid mutation
    const newErrors = [...errorsLocation];

    // Ensure that errors exist for the current vehicle
    if (!newErrors[vehicleIndex]) {
      newErrors[vehicleIndex] = {
        pickupLocation: "",
        deliveryLocation: "",
        addressTypeForPickup: "",
        addressTypeForDeliver: "",
        pickupContactName: "",
        pickupContactPhone: "",
        dropoffContactName: "",
        dropoffContactPhone: "",
      };
    }

    switch (field) {
      case "pickupLocation":
        newErrors[vehicleIndex].pickupLocation = value
          ? ""
          : "Pickup location is required";
        break;
      case "deliveryLocation":
        newErrors[vehicleIndex].deliveryLocation = value
          ? ""
          : "Delivery location is required";
        break;
      case "addressTypeForPickup":
        newErrors[vehicleIndex].addressTypeForPickup = value
          ? ""
          : "Pickup address type is required";
        break;
      case "addressTypeForDeliver":
        newErrors[vehicleIndex].addressTypeForDeliver = value
          ? ""
          : "Delivery address type is required";
        break;
      case "pickupContactName":
        newErrors[vehicleIndex].pickupContactName = value
          ? ""
          : "Pickup contact name is required";
        break;
      case "pickupContactPhone":
        newErrors[vehicleIndex].pickupContactPhone =
          value && /^\(\d{3}\) \d{3}-\d{4}$/.test(value)
            ? ""
            : "Enter a valid 10-digit phone number for pickup contact";
        break;
      case "dropoffContactName":
        newErrors[vehicleIndex].dropoffContactName = value
          ? ""
          : "Dropoff contact name is required";
        break;
      case "dropoffContactPhone":
        newErrors[vehicleIndex].dropoffContactPhone =
          value && /^\(\d{3}\) \d{3}-\d{4}$/.test(value)
            ? ""
            : "Enter a valid 10-digit phone number for dropoff contact";
        break;
      default:
        break;
    }

    setErrorsLocation(newErrors);
    console.log("errors location ", errorsLocation);
  };

  const handleDeliveryChangeArray = (
    e: React.ChangeEvent<HTMLInputElement>,
    vehicleIndex: number
  ) => {
    const value = e.target.value;
    // setDeliveryLocation(value);
    updateVehicleField("deliveryLocation", value, vehicleIndex);
    // validateField("deliveryLocation", value);
    const newLocation = [...location];
    newLocation[vehicleIndex].deliveryLocation = value;
    console.log(
      value,
      " ",
      vehicleIndex,
      " ",
      newLocation[vehicleIndex].deliveryLocation
    );
    if (value.length > 2) {
      fetchSuggestions(value, "deliveryLocation", vehicleIndex);
    } else {
      // Ensure the object is initialized before clearing suggestions
      const updatedLocationWithNoSuggestions = [...location];
      if (!updatedLocationWithNoSuggestions[vehicleIndex]) {
        updatedLocationWithNoSuggestions[vehicleIndex] = {}; // Initialize object
      }
      updatedLocationWithNoSuggestions[vehicleIndex].deliverySuggestions = [];
      setLocation(updatedLocationWithNoSuggestions); // Update the location state to clear suggestions
    }
  };

  const handlePickupChangeArray = (
    e: React.ChangeEvent<HTMLInputElement>,
    vehicleIndex: number
  ) => {
    const value = e.target.value;
    // setDeliveryLocation(value);
    updateVehicleField("pickupLocation", value, vehicleIndex);
    // validateField("deliveryLocation", value);
    const newLocation = [...location];
    newLocation[vehicleIndex].pickupLocation = value;
    console.log(
      value,
      " ",
      vehicleIndex,
      " ",
      newLocation[vehicleIndex].pickupLocation
    );
    if (value.length > 2) {
      fetchSuggestions(value, "pickupLocation", vehicleIndex);
    } else {
      // Ensure the object is initialized before clearing suggestions
      const updatedLocationWithNoSuggestions = [...location];
      if (!updatedLocationWithNoSuggestions[vehicleIndex]) {
        updatedLocationWithNoSuggestions[vehicleIndex] = {}; // Initialize object
      }
      updatedLocationWithNoSuggestions[vehicleIndex].pickupSuggestions = [];
      setLocation(updatedLocationWithNoSuggestions); // Update the location state to clear suggestions
    }
  };

  const handleInputChangeArray = (
    name: string,
    value: string,
    vehicleIndex: number
  ) => {
    const updatedLocation = [...location];

    if (!updatedLocation[vehicleIndex]) {
      updatedLocation[vehicleIndex] = {}; // Ensure the object exists
    }

    // Handle phone number formatting
    if (name === "pickupContactPhone" || name === "dropoffContactPhone") {
      value = value.replace(/\D/g, ""); // Remove non-digit characters

      // Format phone number as (xxx) xxx-xxxx
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
          6,
          10
        )}`;
      }
    }

    // Update the location state dynamically based on vehicleIndex
    updatedLocation[vehicleIndex][name] = value;
    setLocation(updatedLocation);

    // Optional: If you have validation logic, call it here
    updateVehicleField(name, value, vehicleIndex);

    switch (name) {
      case "pickupContactName":
        location[vehicleIndex].pickupContactName = value;
        break;
      case "pickupContactPhone":
        location[vehicleIndex].pickupContactPhone = value;

        break;
      case "dropoffContactName":
        location[vehicleIndex].dropoffContactName = value;

        break;
      case "dropoffContactPhone":
        location[vehicleIndex].dropoffContactPhone = value;
        break;
      default:
        break;
    }
    if (validateField) {
      validateField(name, value, vehicleIndex);
    }
  };

  const handleRemoveVehicle = (index: number) => {
    const updatedVehicles = location.filter((_, i) => i !== index);
    setLocation(updatedVehicles);

    // Adjust the currentVehicleIndex if necessary
    if (index === currentLocationIndex && currentLocationIndex > 0) {
      setCurrentLocationIndex(currentLocationIndex - 1);
    } else if (index < currentLocationIndex) {
      setCurrentLocationIndex(currentLocationIndex - 1);
    }
  };

  const handleAddressTypeChange = (e: any, vehicleIndex: number) => {
    const updatedLocation = [...location];

    if (!updatedLocation[vehicleIndex]) {
      updatedLocation[vehicleIndex] = {}; // Ensure the object exists
    }

    updatedLocation[vehicleIndex].addressTypeForPickup = e.target.value; // Update value
    updateVehicleField("addressTypeForPickup", e.target.value, vehicleIndex);
    setLocation(updatedLocation);
  };

  const handleAddressTypeDeliveryChange = (e: any, vehicleIndex: number) => {
    const updatedLocation = [...location];

    if (!updatedLocation[vehicleIndex]) {
      updatedLocation[vehicleIndex] = {}; // Ensure the object exists
    }

    updatedLocation[vehicleIndex].addressTypeForDeliver = e.target.value; // Update value
    updateVehicleField("addressTypeForDeliver", e.target.value, vehicleIndex);

    setLocation(updatedLocation);
  };

  const handleLocationUpdate = (
    vehicleIndex: number,
    field: string,
    value: any,
    isPickupContact: boolean = false, // Flag for pickup contact
    isDropoffContact: boolean = false // Flag for dropoff contact
  ) => {
    setLocation((prevLocation) => {
      const updatedLocation = [...prevLocation];

      if (!updatedLocation[vehicleIndex]) {
        updatedLocation[vehicleIndex] = {}; // Ensure object exists
      }

      // If isPickupContact is true and value is true, clear the pickup fields and errors
      if (isPickupContact && value === true) {
        updatedLocation[vehicleIndex]["pickupContactName"] = "";
        updatedLocation[vehicleIndex]["pickupContactPhone"] = "";
        errorsLocation[vehicleIndex]["pickupContactName"] = ""; // Clear errors for pickupContactName
        errorsLocation[vehicleIndex]["pickupContactPhone"] = ""; // Clear errors for pickupContactPhone
      }

      // If isDropoffContact is true and value is true, clear the dropoff fields and errors
      if (isDropoffContact && value === true) {
        updatedLocation[vehicleIndex]["dropoffContactName"] = "";
        updatedLocation[vehicleIndex]["dropoffContactPhone"] = "";
        errorsLocation[vehicleIndex]["dropoffContactName"] = ""; // Clear errors for dropoffContactName
        errorsLocation[vehicleIndex]["dropoffContactPhone"] = ""; // Clear errors for dropoffContactPhone
      }

      updatedLocation[vehicleIndex][field] = value; // Update the specific field
      return updatedLocation; // Return the updated state
    });

    updateVehicleField(field, value, vehicleIndex); // Ensure vehicle-specific update
  };

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );

  // const setIndex = setCurrentVehicleIndex;
  const handleEditVehicle = (index: number) => {
    console.log("edit index ", index, vehicles[index]);
    setExpandedIndex(index);
    setCurrentEditingIndex(index);
    // setCurrentVehicleIndex(index);
    console.log("edit index ", expandedIndex, vehicles[expandedIndex || index]);

    setIsEditing(true);
  };

  const handleNextLocation = (vehicleIndex: number) => {
    const validateLocation = () => {
      const newErrors = [...errorsLocation]; // Clone errors array

      // Validate current vehicle (vehicleIndex) only
      const vehicle = location[vehicleIndex];

      // Ensure that there's an error object for the current vehicle
      if (!newErrors[vehicleIndex]) {
        newErrors[vehicleIndex] = {
          pickupLocation: "",
          deliveryLocation: "",
          addressTypeForPickup: "",
          addressTypeForDeliver: "",
          pickupContactName: "",
          pickupContactPhone: "",
          dropoffContactName: "",
          dropoffContactPhone: "",
        };
      }

      // Pickup location check
      newErrors[vehicleIndex].pickupLocation = vehicle?.pickupLocation
        ? ""
        : "Pickup location is required.";

      // Delivery location check
      newErrors[vehicleIndex].deliveryLocation = vehicle?.deliveryLocation
        ? ""
        : "Delivery location is required.";

      // Address type for Pickup check
      newErrors[vehicleIndex].addressTypeForPickup =
        vehicle?.addressTypeForPickup ? "" : "Pickup address type is required.";

      // Address type for Delivery check
      newErrors[vehicleIndex].addressTypeForDeliver =
        vehicle?.addressTypeForDeliver
          ? ""
          : "Delivery address type is required.";

      // Pickup contact name and phone check
      if (vehicle?.isPickupContact === false) {
        newErrors[vehicleIndex].pickupContactName = vehicle?.pickupContactName
          ? ""
          : "Pickup contact name is required.";
        newErrors[vehicleIndex].pickupContactPhone =
          vehicle?.pickupContactPhone &&
          /^\(\d{3}\) \d{3}-\d{4}$/.test(vehicle?.pickupContactPhone)
            ? ""
            : "Enter a valid 10-digit phone number for pickup contact.";
      }

      // Dropoff contact name and phone check
      if (vehicle?.isDropoffContact === false) {
        newErrors[vehicleIndex].dropoffContactName = vehicle?.dropoffContactName
          ? ""
          : "Dropoff contact name is required.";
        newErrors[vehicleIndex].dropoffContactPhone =
          vehicle?.dropoffContactPhone &&
          /^\(\d{3}\) \d{3}-\d{4}$/.test(vehicle?.dropoffContactPhone)
            ? ""
            : "Enter a valid 10-digit phone number for dropoff contact.";
      }

      setErrorsLocation(newErrors); // Update error state

      // Check if there are any errors for the current vehicle
      const hasError = Object.values(newErrors[vehicleIndex]).some(
        (error) => error !== ""
      );

      return !hasError; // If no errors, return true, else false
    };

    // Run validation for the current vehicle index
    const isValid = validateLocation();

    if (isValid) {
      console.log(" All locations filled!", vehicleIndex, vehicles.length - 1);

      // No errors found, move to the next vehicle if possible
      if (vehicleIndex < vehicles.length - 1) {
        console.log(" All locations filled!", location);

        setExpandedIndex(vehicleIndex + 1);
      } else {
        console.log("✅ All locations filled!");
        // Proceed with form submission or any other action
      }
    } else {
      console.log("🚫 Fix errors before continuing.");
    }

    // setExpandedIndex((prev) => vehicleIndex + 1);
  };
  const [isAddVehciles, setIsAddVehciles] = useState<boolean>(false);

  // console.log(location);
  return (
    <div>
      {/* /////////////////////////////////////////////////// */}
      <div className="mb-2">
        <div className="flex justify-end items-end  w-full ">
          <div
            className="flex  w-1/2 text-xl bg-[#2c2c2c] justify-center border-1 border-[#2098ee] text-white mb-2 p-2  shadow-lg rounded-xl cursor-pointer"
            onClick={() => {
              setIsAddVehciles(!isAddVehciles);
              // setExpandedIndex(vehicleIndex);
              // setErrors([]);
              // setIsEditing(false);
            }}
            // onClick={() => handleEditVehicle(vehicleIndex)}
            style={{
              boxShadow: "0 0 50px -5px rgba(32, 152, 238, 0.2)",
            }}
          >
            Add Vehicles{" "}
            {isAddVehciles === true && (
              <span className=" px-2 text-xl font-extrabold text-blue-500">
                {" "}
                x
              </span>
            )}
          </div>
        </div>
        {isAddVehciles && (
          <div>
            <VehicleForm
              index={vehicles.length + 1}
              vehicles={vehicles}
              setVehicles={setVehicles}
              currentVehicleIndex={currentVehicleIndex + 1}
              setCurrentVehicleIndex={setCurrentVehicleIndex}
              isEditing={currentEditingIndex}
              setIsEditing={setCurrentEditingIndex}
              errors={errors}
              setErrors={setErrors}
              setIsAddVehciles={setIsAddVehciles}
              isAddVehciles={isAddVehciles}
            />
          </div>
        )}
        {vehicles.map((vehicle, vehicleIndex) => (
          <div key={vehicleIndex} className="flex flex-col space-y-2">
            {/* Vehicle Item */}

            {sameLocation || currentVehicleIndex === 0 ? (
              ""
            ) : (
              <div
                className="flex flex-row space-x-2 bg-[#2c2c2c] border-1 border-[#2098ee] text-white mb-2 p-2 grid grid-cols-[1fr_1fr_1fr_min-content_min-content_1fr] shadow-lg rounded-xl w-full cursor-pointer"
                onClick={() => {
                  setExpandedIndex(vehicleIndex);
                  setErrors([]);
                  // setIsEditing(false);
                }}
                // onClick={() => handleEditVehicle(vehicleIndex)}
                style={{
                  boxShadow: "0 0 50px -5px rgba(32, 152, 238, 0.2)",
                }}
              >
                {expandedIndex === vehicleIndex ? (
                  <>
                    <div className="flex flex-col pl-2">
                      <strong>Make</strong> {vehicle.vehicleMaker}
                    </div>
                    <div className="flex flex-col">
                      <strong>Model</strong> {vehicle.vehicleModel}
                    </div>
                    <div className="flex flex-col">
                      <strong>Year</strong> {vehicle.vehicleYear}
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
                        className="text-blue-500"
                        onClick={() => handleEditVehicle(vehicleIndex)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </div>
                    <div
                      className="flex "
                      onClick={() => {
                        setExpandedIndex(
                          expandedIndex === vehicleIndex ? null : vehicleIndex
                        );
                        // Optional: if you also want to stop editing when collapsing
                        // if (expandedIndex === vehicleIndex) setCurrentEditingIndex(null);
                      }}
                    >
                      <p className={`p-[10px] bg-[#2c2c2c] rounded-[100%]`}>
                        <img
                          alt="arrow"
                          src="/arrow_forward.38aa47a7_2.svg"
                          width="24"
                          height="24"
                          loading="lazy"
                          className={
                            expandedIndex === vehicleIndex ? "rotate-90" : ""
                          }
                          style={{ transition: "transform 0.3s ease" }}
                        />
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex  items-center ">
                      Vehicle {vehicleIndex + 1}
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                    <div
                      className=" "
                      onClick={() => {
                        setExpandedIndex(
                          expandedIndex === vehicleIndex ? null : vehicleIndex
                        );
                        // Optional: if you also want to stop editing when collapsing
                        // if (expandedIndex === vehicleIndex) setCurrentEditingIndex(null);
                      }}
                    >
                      <p className={`p-[10px] bg-[#2c2c2c] rounded-[100%]`}>
                        <img
                          alt="arrow"
                          src="/arrow_forward.38aa47a7_2.svg"
                          width="24"
                          height="24"
                          loading="lazy"
                          className={
                            expandedIndex === vehicleIndex ? "rotate-90" : ""
                          }
                          style={{ transition: "transform 0.3s ease" }}
                        />
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
            {currentEditingIndex === vehicleIndex &&
              expandedIndex === vehicleIndex && (
                <div>
                  <VehicleForm
                    index={vehicleIndex}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    currentVehicleIndex={vehicleIndex}
                    setCurrentVehicleIndex={setCurrentVehicleIndex}
                    isEditing={currentEditingIndex}
                    setIsEditing={setCurrentEditingIndex}
                    errors={errors}
                    setErrors={setErrors}
                    setIsAddVehciles={setIsAddVehciles}
                    isAddVehciles={false}
                  />
                </div>
              )}

            {/* Expandable Form */}
            {expandedIndex === vehicleIndex && (
              <div className="bg-[#2c2c2c] p-4">
                <p className="text-white mb-4 text-center font-bold">
                  {sameLocation || currentVehicleIndex === 1
                    ? "Address Information"
                    : `Address Information for vehicle ${vehicleIndex + 1} `}
                </p>

                {/* Pickup Location */}
                <div className="relative z-0 w-full mb-5  ">
                  <label
                    htmlFor={`pickup_location_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickup_location"
                    id={`pickup_location_${vehicleIndex}`}
                    value={location[vehicleIndex]?.pickupLocation || ""} // Safe access with default empty string
                    onChange={(e: any) =>
                      handlePickupChangeArray(e, vehicleIndex)
                    }
                    className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                      errorsLocation[vehicleIndex]?.pickupLocation
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#2098ee]`}
                    placeholder="Address or zipcode"
                    //required
                    autoComplete="off"
                  />
                  <div className="relative z-10 w-full mt-2 bg-[#2c2c2c] rounded-lg shadow-lg">
                    {location[vehicleIndex]?.pickupSuggestions?.length > 0 && (
                      <div className="relative z-10 w-full mt-2 bg-[#2c2c2c] border border-gray-300 rounded-lg shadow-lg">
                        {location[vehicleIndex]?.pickupSuggestions.map(
                          (suggestion: any, index: any) => (
                            <div
                              key={index}
                              onClick={() => {
                                const updatedLocation = [...location];
                                if (!updatedLocation[vehicleIndex]) {
                                  updatedLocation[vehicleIndex] = {}; // Ensure the object exists
                                }
                                updatedLocation[vehicleIndex].pickupLocation =
                                  suggestion; // Set the selected suggestion
                                setLocation(updatedLocation); // Update the location state
                                updatedLocation[
                                  vehicleIndex
                                ].pickupSuggestions = []; // Clear suggestions
                                setPickupSuggestions([]); // Clear global suggestions
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1] text-white"
                            >
                              {suggestion}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pickup Address Type */}
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor={`address_type_pickup_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Select Address Type for Pickup
                  </label>
                  <select
                    name="address_type"
                    id={`address_type_pickup_${vehicleIndex}`}
                    value={location[vehicleIndex]?.addressTypeForPickup || ""} // Safe access with default empty string
                    onChange={(e: any) =>
                      handleAddressTypeChange(e, vehicleIndex)
                    }
                    className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                      errorsLocation[vehicleIndex]?.addressTypeForPickup
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#2098ee]`}
                    //required
                  >
                    <option value="">Select Address Type</option>
                    <option value="residential" className="text-white">
                      Residential
                    </option>
                    <option value="business" className="text-white">
                      Business
                    </option>
                    <option value="auction_yard" className="text-white">
                      Auction Yard
                    </option>
                  </select>
                </div>

                {/* Delivery Location */}
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor={`pickup_location_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    name="pickup_location"
                    id={`pickup_location_${vehicleIndex}`}
                    value={location[vehicleIndex]?.deliveryLocation || ""} // Safe access with default empty string
                    onChange={(e: any) =>
                      handleDeliveryChangeArray(e, vehicleIndex)
                    }
                    className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                      errorsLocation[vehicleIndex]?.deliveryLocation
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#2098ee]`}
                    placeholder="Address or zipcode"
                    //required
                    autoComplete="off"
                  />
                  <div className="relative z-10 w-full mt-2 bg-[#2c2c2c]  rounded-lg shadow-lg">
                    {location[vehicleIndex]?.deliverySuggestions?.length >
                      0 && (
                      <div className="relative z-10 w-full mt-2 bg-[#2c2c2c] border border-gray-300 rounded-lg shadow-lg">
                        {location[vehicleIndex]?.deliverySuggestions.map(
                          (suggestion: any, index: any) => (
                            <div
                              key={index}
                              onClick={() => {
                                const updatedLocation = [...location];
                                if (!updatedLocation[vehicleIndex]) {
                                  updatedLocation[vehicleIndex] = {}; // Ensure the object exists
                                }
                                updatedLocation[vehicleIndex].deliveryLocation =
                                  suggestion; // Set the selected suggestion
                                setLocation(updatedLocation); // Update the location state
                                updatedLocation[
                                  vehicleIndex
                                ].deliverySuggestions = []; // Clear suggestions
                                setPickupSuggestions([]); // Clear global suggestions
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1] text-white"
                            >
                              {suggestion}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Address Type */}
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor={`address_type_deliver_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Select Address Type for Delivery
                  </label>
                  <select
                    name="address_type"
                    id={`address_type_deliver_${vehicleIndex}`}
                    value={location[vehicleIndex]?.addressTypeForDeliver || ""} // Safe access with default empty string
                    onChange={(e: any) =>
                      handleAddressTypeDeliveryChange(e, vehicleIndex)
                    }
                    className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                      errorsLocation[vehicleIndex]?.addressTypeForDeliver
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#2098ee]`}
                    //required
                  >
                    <option value="">Select Address Type</option>
                    <option value="residential" className="text-white">
                      Residential
                    </option>
                    <option value="business" className="text-white">
                      Business
                    </option>
                    <option value="auction_yard" className="text-white">
                      Auction Yard
                    </option>
                  </select>
                </div>

                <div className="space-y-4">
                  {/* Pickup Location Point of Contact */}
                  <div className="flex flex-row">
                    <label className="block text-sm font-medium text-white md:mr-2 md:mb-0">
                      Are you the point of contact at the pickup location?
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`pickup_contact_${vehicleIndex}`}
                          value="true"
                          onChange={(e) =>
                            handleLocationUpdate(
                              vehicleIndex,
                              "isPickupContact",
                              true,
                              true,
                              false
                            )
                          }
                          checked={
                            location[vehicleIndex]?.isPickupContact === true
                          }
                          className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300"
                        />
                        <span className="text-sm text-white">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`pickup_contact_${vehicleIndex}`}
                          value="false"
                          onChange={(e) =>
                            handleLocationUpdate(
                              vehicleIndex,
                              "isPickupContact",
                              false,
                              true,
                              false
                            )
                          }
                          checked={
                            location[vehicleIndex]?.isPickupContact === false
                          }
                          className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300"
                        />
                        <span className="text-sm text-white">No</span>
                      </label>
                    </div>
                  </div>

                  {location[vehicleIndex]?.isPickupContact === false && (
                    <div>
                      {/* Pickup Contact Name */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`pickup_contact_name_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                        >
                          Pickup Contact Name
                        </label>
                        <input
                          type="text"
                          name="pickup_contact_name"
                          id={`pickup_contact_name_${vehicleIndex}`}
                          value={
                            location[vehicleIndex]?.pickupContactName || ""
                          }
                          onChange={(e) =>
                            handleInputChangeArray(
                              "pickupContactName",
                              e.target.value,
                              vehicleIndex
                            )
                          }
                          className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                            errorsLocation[vehicleIndex]?.pickupContactName
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#2098ee]`}
                          placeholder="Pickup Contact Name"
                          //required
                          autoComplete="off"
                        />
                      </div>

                      {/* Pickup Contact Phone */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`pickup_contact_phone_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                        >
                          Pickup Contact Phone Number
                        </label>
                        <input
                          type="text"
                          name="pickup_contact_phone"
                          id={`pickup_contact_phone_${vehicleIndex}`}
                          value={
                            location[vehicleIndex]?.pickupContactPhone || ""
                          }
                          onChange={(e) =>
                            handleInputChangeArray(
                              "pickupContactPhone",
                              e.target.value,
                              vehicleIndex
                            )
                          }
                          className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                            errorsLocation[vehicleIndex]?.pickupContactPhone
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#2098ee]`}
                          placeholder="Pickup Contact Phone Number"
                          //required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex flex-row">
                    <label className="block text-sm font-medium text-white mb-2">
                      Are you the point of contact at the drop-off location?
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="dropoff_contact"
                          value="true"
                          onChange={() =>
                            handleLocationUpdate(
                              vehicleIndex,
                              "isDropoffContact",
                              true,
                              false,
                              true
                            )
                          }
                          checked={
                            location[vehicleIndex]?.isDropoffContact === true
                          }
                          className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300"
                        />
                        <span className="text-sm text-white">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="dropoff_contact"
                          value="false"
                          onChange={() =>
                            handleLocationUpdate(
                              vehicleIndex,
                              "isDropoffContact",
                              false,
                              false,
                              true
                            )
                          }
                          checked={
                            location[vehicleIndex]?.isDropoffContact === false
                          }
                          className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300"
                        />
                        <span className="text-sm text-white">No</span>
                      </label>
                    </div>
                  </div>
                  {location[vehicleIndex]?.isDropoffContact === false && (
                    <div>
                      {/* Dropoff Contact Name */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`dropoff_contact_name_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                        >
                          Dropoff Contact Name
                        </label>
                        <input
                          type="text"
                          name="dropoff_contact_name"
                          id={`dropoff_contact_name_${vehicleIndex}`}
                          value={
                            location[vehicleIndex]?.dropoffContactName || ""
                          }
                          onChange={(e) =>
                            handleInputChangeArray(
                              "dropoffContactName",
                              e.target.value,
                              vehicleIndex
                            )
                          }
                          className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                            errorsLocation[vehicleIndex]?.dropoffContactName
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#2098ee]`}
                          placeholder="Dropoff Contact Name"
                          //required
                          autoComplete="off"
                        />
                      </div>

                      {/* Dropoff Contact Phone */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`dropoff_contact_phone_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                        >
                          Dropoff Contact Phone Number
                        </label>
                        <input
                          type="text"
                          name="dropoff_contact_phone"
                          id={`dropoff_contact_phone_${vehicleIndex}`}
                          value={
                            location[vehicleIndex]?.dropoffContactPhone || ""
                          }
                          onChange={(e) =>
                            handleInputChangeArray(
                              "dropoffContactPhone",
                              e.target.value,
                              vehicleIndex
                            )
                          }
                          className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
                            errorsLocation[vehicleIndex]?.dropoffContactPhone
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#2098ee]`}
                          placeholder="Dropoff Contact Phone Number"
                          //required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {vehicleIndex < vehicles.length - 1 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className={`inline-block rounded-full p-[2px] bg-gradient-to-r from-blue-800 to-[#2098ee] px-8 py-2 rounded-full shadow-xl text-[18px] flex bg-red-400 justify-center  ${
                        true
                          ? "border-2 bg-gradient-to-r from-blue-800 to-[#2098ee] border-[#2098ee] text-white font-bold"
                          : "font-bold  bg-gradient-to-r from-blue-800 to-[#2098ee] text-transparent bg-clip-text border border-[#2098ee] "
                      }`}
                      onClick={() => handleNextLocation(vehicleIndex)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* //////////////////////////////////////////////////////// */}

      {/* Include other form fields from step one */}
    </div>
  );
};

export default StepOne;
