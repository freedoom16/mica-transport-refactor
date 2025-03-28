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
                    onChange={(e) => {
                      const updatedLocation = [...location];
                      if (!updatedLocation[vehicleIndex]) {
                        updatedLocation[vehicleIndex] = {}; // Ensure the object exists
                      }
                      updatedLocation[vehicleIndex].addressTypeForDeliver =
                        e.target.value; // Update the address type for delivery
                      setLocation(updatedLocation); // Update the location state
                    }}
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation.addressTypeForDeliver
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
