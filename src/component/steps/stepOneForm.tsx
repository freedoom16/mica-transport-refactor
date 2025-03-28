"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

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
}) => {
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [deliverySuggestions, setDeliverySuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "f20bdd1c4a7b4139b83d4901b95d6dc4";
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

  const handleInputChange = (name: any, value: any) => {
    // Dynamically call the corresponding setter based on the field name
    // Remove non-digit characters
    if (name === "pickupContactPhone" || name === "dropoffContactPhone") {
      value = value.replace(/\D/g, "");

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
    updateVehicleField(name, value, value);

    switch (name) {
      case "pickupContactName":
        setPickupContactName(value);
        break;
      case "pickupContactPhone":
        setPickupContactPhone(value);
        break;
      case "dropoffContactName":
        setDropoffContactName(value);
        break;
      case "dropoffContactPhone":
        setDropoffContactPhone(value);
        break;
      default:
        break;
    }

    // Optional: If you have validation logic, call it here
    if (validateField) {
      validateField(name, value, value);
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

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  console.log(
    "location ",
    currentLocationIndex,
    " ",
    currentVehicleIndex,
    " ",
    expandedIndex
  );
  console.log(location);
  return (
    <div>
      {/* /////////////////////////////////////////////////// */}
      <div className="mb-2">
        {vehicles.map((vehicle, vehicleIndex) => (
          <div key={vehicleIndex} className="flex flex-col space-y-2">
            {/* Vehicle Item */}
            <div
              className="flex flex-row space-x-2 bg-white text-gray-900 mb-2 p-2 grid grid-cols-[1fr_1fr_1fr_min-content] shadow-lg rounded-full w-full cursor-pointer"
              onClick={() =>
                setExpandedIndex(
                  expandedIndex === vehicleIndex ? null : vehicleIndex
                )
              }
            >
              <div className="flex flex-col pl-2">
                <strong>Make</strong> {vehicle.vehicleMaker}
              </div>
              <div className="flex flex-col">
                <strong>Model</strong> {vehicle.vehicleModel}
              </div>
              <div className="flex flex-col">
                <strong>Year</strong> {vehicle.vehicleYear}
              </div>
              <div className="flex w-8">
                <button
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent expanding when clicking delete
                    handleRemoveVehicle(vehicleIndex);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            {/* Expandable Form */}
            {expandedIndex === vehicleIndex && (
              <div>
                <p className="text-gray-900 mb-4 text-center font-bold">
                  {sameLocation
                    ? "Address Information"
                    : `Add vehicle ${vehicleIndex + 1} information `}
                </p>

                {/* Pickup Location */}
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor={`pickup_location_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation[vehicleIndex]?.pickupLocation
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#6DB8D1]`}
                    placeholder="Address or zipcode"
                    required
                  />
                  <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {location[vehicleIndex]?.pickupSuggestions?.length > 0 && (
                      <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
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
                              className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1] text-gray-900"
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
                    className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation[vehicleIndex]?.addressTypeForPickup
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#6DB8D1]`}
                    required
                  >
                    <option value="">Select Address Type</option>
                    <option value="residential" className="text-gray-900">
                      Residential
                    </option>
                    <option value="business" className="text-gray-900">
                      Business
                    </option>
                    <option value="auction_yard" className="text-gray-900">
                      Auction Yard
                    </option>
                  </select>
                </div>

                {/* Delivery Location */}
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor={`pickup_location_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation[vehicleIndex]?.deliveryLocation
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#6DB8D1]`}
                    placeholder="Address or zipcode"
                    required
                  />
                  <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {location[vehicleIndex]?.deliverySuggestions?.length >
                      0 && (
                      <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
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
                              className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1] text-gray-900"
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
                    className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation[vehicleIndex]?.addressTypeForDeliver
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#6DB8D1]`}
                    required
                  >
                    <option value="">Select Address Type</option>
                    <option value="residential" className="text-gray-900">
                      Residential
                    </option>
                    <option value="business" className="text-gray-900">
                      Business
                    </option>
                    <option value="auction_yard" className="text-gray-900">
                      Auction Yard
                    </option>
                  </select>
                </div>

                <div className="space-y-4">
                  {/* Pickup Location Point of Contact */}
                  <div className="flex flex-row">
                    <label className="block text-sm font-medium text-gray-900 md:mr-2 md:mb-0">
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
                        <span className="text-sm text-gray-900">Yes</span>
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
                        <span className="text-sm text-gray-900">No</span>
                      </label>
                    </div>
                  </div>

                  {location[vehicleIndex]?.isPickupContact === false && (
                    <div>
                      {/* Pickup Contact Name */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`pickup_contact_name_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                          className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                            errorsLocation[vehicleIndex]?.pickupContactName
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#6DB8D1]`}
                          placeholder="Pickup Contact Name"
                          required
                        />
                      </div>

                      {/* Pickup Contact Phone */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`pickup_contact_phone_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                          className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                            errorsLocation[vehicleIndex]?.pickupContactPhone
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#6DB8D1]`}
                          placeholder="Pickup Contact Phone Number"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex flex-row">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
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
                        <span className="text-sm text-gray-900">Yes</span>
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
                        <span className="text-sm text-gray-900">No</span>
                      </label>
                    </div>
                  </div>
                  {location[vehicleIndex]?.isDropoffContact === false && (
                    <div>
                      {/* Dropoff Contact Name */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`dropoff_contact_name_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                          className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                            errorsLocation[vehicleIndex]?.dropoffContactName
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#6DB8D1]`}
                          placeholder="Dropoff Contact Name"
                          required
                        />
                      </div>

                      {/* Dropoff Contact Phone */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor={`dropoff_contact_phone_${vehicleIndex}`}
                          className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
                          className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                            errorsLocation[vehicleIndex]?.dropoffContactPhone
                              ? "border-red-500"
                              : "border-[#938f99]"
                          } outline-none transition-all focus:border-[#6DB8D1]`}
                          placeholder="Dropoff Contact Phone Number"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
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
