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

  const fetchSuggestions = async (query: string, setSuggestions: Function) => {
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

      setSuggestions(usaResults.map((result: any) => result.formatted));
      // setSuggestions(data.results.map((result: any) => result.formatted));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // const API_KEY = "AIzaSyBTklQmwDrHzunpPxUs1xoyNMG-tPpY_XI"; // Replace with your actual API key
  // const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

  const updateVehicleField = (field: string, value: any) => {
    // Create a copy of the location array
    const updateLocation = [...location];

    if (!updateLocation[currentLocationIndex]) {
      updateLocation[currentLocationIndex] = {
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
    const currentVehicle = updateLocation[currentLocationIndex];

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
    validateField(field, value);
  };

  const handleNextLocation = () => {
    console.log("Adding new vehicle details");

    if (
      !pickupLocation ||
      !deliveryLocation ||
      !addressTypeForDeliver ||
      !addressTypeForPickup
    ) {
      return;
    }

    if (
      isPickupContact === false &&
      (!pickupContactName.trim() || !pickupContactPhone.trim())
    ) {
      return;
    }

    // Check if the dropoff contact information is incomplete when not the point of contact
    if (
      isDropoffContact === false &&
      (!dropoffContactName.trim() || !dropoffContactPhone.trim())
    ) {
      return;
    }
    const updatedVehicles = [...location];

    // Update the vehicle at the current index or add a new one
    updatedVehicles[currentLocationIndex] = {
      pickupLocation,
      deliveryLocation,
      addressTypeForDeliver,
      addressTypeForPickup,
      isPickupContact,
      isDropoffContact,
      pickupContactName,
      pickupContactPhone,
      dropoffContactName,
      dropoffContactPhone,
    };

    setLocation(updatedVehicles);

    // Reset the form fields
    setPickupLocation("");
    setDeliveryLocation("");
    setAddressTypeForDeliver("");
    setAddressTypeForPickup("");
    setIsPickupContact(null);
    setIsDropoffContact(null);
    setPickupContactName("");
    setPickupContactPhone("");
    setDropoffContactName("");
    setDropoffContactPhone("");

    // Optionally increment the index for adding new vehicles
    setCurrentLocationIndex((prevIndex) => prevIndex + 1);
  };

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errorsLocation };

    switch (field) {
      case "pickupLocation":
        newErrors.pickupLocation = value ? "" : "Pickup location is required";
        break;
      case "deliveryLocation":
        newErrors.deliveryLocation = value
          ? ""
          : "Delivery location is required";
        break;
      case "addressTypeForPickup":
        newErrors.addressTypeForPickup = value
          ? ""
          : "Pickup address type is required";
        break;
      case "addressTypeForDeliver":
        newErrors.addressTypeForDeliver = value
          ? ""
          : "Delivery address type is required";
        break;
      case "pickupContactName":
        newErrors.pickupContactName = value
          ? ""
          : "Pickup contact name is required";
        break;
      case "pickupContactPhone":
        newErrors.pickupContactPhone =
          value && /^\(\d{3}\) \d{3}-\d{4}$/.test(value)
            ? ""
            : "Enter a valid 10-digit phone number for pickup contact";
        break;
      case "dropoffContactName":
        newErrors.dropoffContactName = value
          ? ""
          : "Dropoff contact name is required";
        break;
      case "dropoffContactPhone":
        newErrors.dropoffContactPhone =
          value && /^\(\d{3}\) \d{3}-\d{4}$/.test(value)
            ? ""
            : "Enter a valid 10-digit phone number for dropoff contact";
        break;
      default:
        break;
    }

    setErrorsLocation(newErrors);
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPickupLocation(value);
    updateVehicleField("pickupLocation", value);
    validateField("pickupLocation", value);

    if (value.length > 2) {
      fetchSuggestions(value, setPickupSuggestions);
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeliveryLocation(value);

    updateVehicleField("deliveryLocation", value);

    validateField("deliveryLocation", value);

    if (value.length > 2) {
      fetchSuggestions(value, setDeliverySuggestions);
    } else {
      setDeliverySuggestions([]);
    }
  };

  const handleDeliveryChangeArray = (
    e: React.ChangeEvent<HTMLInputElement>,
    vehicleIndex: number
  ) => {
    const value = e.target.value;

    // Update the deliveryLocation for the specific vehicle in locations array
    const updatedLocation = [...location];
    if (!updatedLocation[vehicleIndex]) {
      updatedLocation[vehicleIndex] = {}; // Ensure the object exists
    }
    updatedLocation[vehicleIndex].deliveryLocation = value; // Set the deliveryLocation value

    setLocation(updatedLocation); // Update location state

    console.log("handle delivery change ");
    console.log(updatedLocation[vehicleIndex].deliveryLocation);
    // Assuming updateVehicleField is a function that updates the vehicle field at a higher level
    updateVehicleField("deliveryLocation", value);

    // Validate the field
    validateField("deliveryLocation", value);

    // Fetch suggestions if the value is longer than 2 characters
    if (value.length > 2) {
      // Ensure suggestions are updated for the correct vehicle index
      fetchSuggestions(value, (suggestions: string[]) => {
        const updatedLocationWithSuggestions = [...location];
        updatedLocationWithSuggestions[vehicleIndex].deliverySuggestions =
          suggestions;
        console.log(
          updatedLocationWithSuggestions[vehicleIndex].deliverySuggestions
        );

        setLocation(updatedLocationWithSuggestions); // Update the location state with new suggestions
      });
    } else {
      // Clear suggestions if the value is shorter than 3 characters
      const updatedLocationWithNoSuggestions = [...location];
      updatedLocationWithNoSuggestions[vehicleIndex].deliverySuggestions = [];
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
    updateVehicleField(name, value);

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
      validateField(name, value);
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

  console.log("location");
  console.log(location);
  console.log(currentLocationIndex, " ", currentVehicleIndex);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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
                    onChange={(e) => {
                      const updatedLocation = [...location];
                      if (!updatedLocation[vehicleIndex]) {
                        updatedLocation[vehicleIndex] = {}; // Ensure the object exists
                      }
                      updatedLocation[vehicleIndex].pickupLocation =
                        e.target.value; // Update the pickup location
                      setLocation(updatedLocation); // Update the location state
                    }}
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation.pickupLocation
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#6DB8D1]`}
                    placeholder="Address or zipcode"
                    required
                  />
                  {pickupSuggestions.length > 0 && (
                    <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {pickupSuggestions.map((suggestion, index) => (
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
                            setPickupSuggestions([]); // Clear suggestions
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1] text-gray-900"
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
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
                    onChange={(e) => {
                      const updatedLocation = [...location];
                      if (!updatedLocation[vehicleIndex]) {
                        updatedLocation[vehicleIndex] = {}; // Ensure the object exists
                      }
                      updatedLocation[vehicleIndex].addressTypeForPickup =
                        e.target.value; // Update the address type for pickup
                      setLocation(updatedLocation); // Update the location state
                    }}
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation.addressTypeForPickup
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
                    htmlFor={`delivery_location_${vehicleIndex}`}
                    className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    name="delivery_location"
                    id={`delivery_location_${vehicleIndex}`}
                    value={location[vehicleIndex]?.deliveryLocation || ""} // Safe access with default empty string
                    // onChange={(e) => {
                    //   const updatedLocation = [...location];
                    //   if (!updatedLocation[vehicleIndex]) {
                    //     updatedLocation[vehicleIndex] = {}; // Ensure the object exists
                    //   }
                    //   updatedLocation[vehicleIndex].deliveryLocation =
                    //     e.target.value; // Update the delivery location
                    //   setLocation(updatedLocation); // Update the location state
                    // }}
                    onChange={(e: any) =>
                      handleDeliveryChangeArray(e, vehicleIndex)
                    }
                    className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                      errorsLocation.deliveryLocation
                        ? "border-red-500"
                        : "border-[#938f99]"
                    } outline-none transition-all focus:border-[#6DB8D1]`}
                    placeholder="Address or zipcode"
                    required
                  />
                  {/* {location[vehicleIndex]?.deliverySuggestions.length > 0 && ( */}
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
                            setDeliverySuggestions([]); // Clear suggestions
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1] text-gray-900"
                        >
                          {suggestion}
                        </div>
                      )
                    )}
                  </div>
                  {/* )} */}
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
      <div className="mb-2">
        {location.slice(0, currentLocationIndex).map((vehicle, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row space-y-2  shadow-lg rounded-[32px]"
          >
            <div className="flex flex-col lg:flex-row space-x-2 bg-white text-gray-900 mb-2 p-2 grid w-full">
              {/* lg:grid-cols-[1fr_1fr_1fr_1fr_min-content] */}
              {/* Pickup Location */}
              <div className="flex flex-row lg:flex-col pl-2">
                <strong>Pickup Location</strong> {vehicle?.pickupLocation}
              </div>
              {/* Delivery Location */}
              <div className="flex flex-row lg:flex-col pl-2">
                <strong>Delivery Location</strong> {vehicle?.deliveryLocation}
              </div>
              {/* Address Type for Pickup */}
              <div className="flex flex-row lg:flex-col pl-2">
                <strong>Pickup Address Type</strong>{" "}
                {vehicle?.addressTypeForPickup}
              </div>
              {/* Address Type for Delivery */}
              <div className="flex flex-row lg:flex-col pl-2">
                <strong>Delivery Address Type</strong>{" "}
                {vehicle?.addressTypeForDeliver}
              </div>
              {/* Pickup Contact */}
              {/* <div className="flex flex-col">
                <strong>Pickup Contact</strong> {vehicle?.pickupContactName} -{" "}
                {vehicle?.pickupContactPhone}
              </div> */}
              {/* Dropoff Contact */}
              {/* <div className="flex flex-col">
                <strong>Dropoff Contact</strong> {vehicle?.dropoffContactName} -{" "}
                {vehicle?.dropoffContactPhone}
              </div> */}
              {/* Remove Button */}
              <div className="flex w-8">
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveVehicle(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-gray-900 mb-4 text-center font-bold">
          {sameLocation
            ? " Address Information"
            : `Add vehcile ${currentLocationIndex + 1}  information `}
        </p>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="pickup_location"
            className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
          >
            Pickup Location
          </label>

          <input
            type="text"
            name="pickup_location"
            id="pickup_location"
            value={pickupLocation}
            onChange={handlePickupChange}
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              errorsLocation.pickupLocation
                ? "border-red-500"
                : "border-[#938f99]"
            } outline-none transition-all focus:border-[#6DB8D1]`}
            placeholder="Address or zipcode"
            required
          />
          {pickupSuggestions.length > 0 && (
            <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
              {pickupSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setPickupLocation(suggestion);
                    updateVehicleField("pickupLocation", suggestion);
                    setPickupSuggestions([]);
                  }}
                  className="px-4 py-2 cursor-pointer  hover:bg-[#6DB8D1] text-gray-900"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          {/* {errorsLocation.pickupLocation && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.pickupLocation}
            </p>
          )} */}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="delivery_location"
            className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
          >
            Select Address Type
          </label>
          <select
            name="address_type"
            id="address_type"
            value={addressTypeForPickup}
            onChange={(e) => {
              setAddressTypeForPickup(e.target.value);
              validateField("addressTypeForPickup", e.target.value);
              updateVehicleField("addressTypeForPickup", e.target.value);
            }}
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              errorsLocation.addressTypeForPickup
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
          {/* {errorsLocation.addressTypeForPickup && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.addressTypeForPickup}
            </p>
          )} */}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="delivery_location"
            className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
          >
            Delivery Location
          </label>
          <input
            type="text"
            name="delivery_location"
            id="delivery_location"
            value={deliveryLocation}
            onChange={handleDeliveryChange}
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              errorsLocation.deliveryLocation
                ? "border-red-500"
                : "border-[#938f99]"
            } outline-none transition-all focus:border-[#6DB8D1]`}
            placeholder="Address or zipcode"
            required
          />

          {deliverySuggestions.length > 0 && (
            <div className="relative z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
              {deliverySuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDeliveryLocation(suggestion);
                    updateVehicleField("deliveryLocation", suggestion);

                    setDeliverySuggestions([]);
                  }}
                  className="px-4 py-2 cursor-pointer  hover:bg-[#6DB8D1] text-gray-900"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          {/* {errorsLocation.deliveryLocation && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.deliveryLocation}
            </p>
          )} */}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="delivery_location"
            className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
          >
            Select Address Type
          </label>
          <select
            name="address_type"
            id="address_type"
            value={addressTypeForDeliver}
            onChange={(e) => {
              setAddressTypeForDeliver(e.target.value);
              updateVehicleField("addressTypeForDeliver", e.target.value);
              validateField("addressTypeForDeliver", e.target.value);
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
          {/* {errorsLocation.addressTypeForDeliver && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.addressTypeForDeliver}
            </p>
          )} */}
        </div>

        <div className="space-y-4">
          {/* Pickup Location Point of Contact */}
          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-900  md:mr-2 md:mb-0">
              Are you the point of contact at the pickup location?{" "}
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="pickup_contact"
                  value="true"
                  onChange={(e) => {
                    setIsPickupContact(true);
                    updateVehicleField("isPickupContact", true);
                  }}
                  checked={isPickupContact === true}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300"
                />
                <span className="text-sm text-gray-900">Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="pickup_contact"
                  value="false"
                  onChange={(e) => {
                    setIsPickupContact(false);
                    updateVehicleField("isPickupContact", false);
                  }}
                  checked={isPickupContact === false}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          {isPickupContact === false && (
            <div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="pickup_contact_name"
                  className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                >
                  Pickup Contact Name
                </label>

                <input
                  type="text"
                  name="pickup_contact_name"
                  id="pickup_contact_name"
                  value={pickupContactName}
                  onChange={(e) => {
                    !isPickupContact
                      ? handleInputChange("pickupContactName", e.target.value)
                      : "";
                  }}
                  className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                    errorsLocation.pickupContactName
                      ? "border-red-500"
                      : "border-[#938f99]"
                  } outline-none transition-all focus:border-[#6DB8D1]`}
                  placeholder="Pickup Contact Name"
                  required
                />
                {/* {errorsLocation.pickupContactName && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.pickupContactName}
                  </p>
                )} */}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="pickup_contact_phone"
                  className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                >
                  Pickup Contact Phone Number
                </label>
                <input
                  type="text"
                  name="pickup_contact_phone"
                  id="pickup_contact_phone"
                  value={pickupContactPhone}
                  onChange={(e) => {
                    !isPickupContact
                      ? handleInputChange("pickupContactPhone", e.target.value)
                      : "";
                  }}
                  className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                    errorsLocation.pickupContactPhone
                      ? "border-red-500"
                      : "border-[#938f99]"
                  } outline-none transition-all focus:border-[#6DB8D1]`}
                  placeholder="Pickup Contact Phone Number"
                  required
                />
                {/* {errorsLocation.pickupContactPhone && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.pickupContactPhone}
                  </p>
                )} */}
              </div>
            </div>
          )}

          {/* Dropoff Location Point of Contact */}
          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Are you the point of contact at the drop-off location?{" "}
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="dropoff_contact"
                  value="true"
                  onChange={(e) => {
                    setIsDropoffContact(true);
                    updateVehicleField("isDropoffContact", true);
                  }}
                  checked={isDropoffContact === true}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
                />
                <span className="text-sm text-gray-900">Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="dropoff_contact"
                  value="false"
                  onChange={(e) => {
                    setIsDropoffContact(false);
                    updateVehicleField("isDropoffContact", false);
                  }}
                  checked={isDropoffContact === false}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          {isDropoffContact === false && (
            <div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="dropoff_contact_name"
                  className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                >
                  Dropoff Contact Name
                </label>

                <input
                  type="text"
                  name="dropoff_contact_name"
                  id="dropoff_contact_name"
                  value={dropoffContactName}
                  onChange={(e) => {
                    !isDropoffContact
                      ? handleInputChange("dropoffContactName", e.target.value)
                      : "";
                  }}
                  className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                    errorsLocation.dropoffContactName
                      ? "border-red-500"
                      : "border-[#938f99]"
                  } outline-none transition-all focus:border-[#6DB8D1]`}
                  placeholder="Dropoff Contact Name"
                  required
                />
                {/* {errorsLocation.dropoffContactName && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.dropoffContactName}
                  </p>
                )} */}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="dropoff_contact_phone"
                  className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
                >
                  Dropoff Contact Phone Number
                </label>
                <input
                  type="text"
                  name="dropoff_contact_phone"
                  id="dropoff_contact_phone"
                  value={dropoffContactPhone}
                  onChange={(e) => {
                    !isDropoffContact
                      ? handleInputChange("dropoffContactPhone", e.target.value)
                      : "";
                  }}
                  className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                    errorsLocation.dropoffContactPhone
                      ? "border-red-500"
                      : "border-[#938f99]"
                  } outline-none transition-all focus:border-[#6DB8D1]`}
                  placeholder="Dropoff Contact Phone Number"
                  required
                />
                {/* {errorsLocation.dropoffContactPhone && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.dropoffContactPhone}
                  </p>
                )} */}
              </div>
            </div>
          )}
        </div>
      </div>

      {currentVehicleIndex >= 1 &&
        currentLocationIndex < currentVehicleIndex - 1 && (
          <button
            type="button"
            className="bg-white text-[#6DB8D1] border-2 border-[#6DB8D1] font-bold py-2 px-4 rounded-full"
            onClick={handleNextLocation}
          >
            Next Location
          </button>
        )}

      {/* Include other form fields from step one */}
    </div>
  );
};

export default StepOne;
