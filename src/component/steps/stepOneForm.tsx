"use client";
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
    validateField("deliveryLocation", value);

    if (value.length > 2) {
      fetchSuggestions(value, setDeliverySuggestions);
    } else {
      setDeliverySuggestions([]);
    }
  };

  const handleInputChange = (name: any, value: any) => {
    // Dynamically call the corresponding setter based on the field name
    // Remove non-digit characters
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

  return (
    <div>
      {/* Render all the inputs and elements related to Step One here */}

      <div>
        <p className="text-gray-900 mb-4 text-center font-bold">
          Address Information
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
                    setPickupSuggestions([]);
                  }}
                  className="px-4 py-2 cursor-pointer  hover:bg-[#6DB8D1] text-gray-900"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          {errorsLocation.pickupLocation && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.pickupLocation}
            </p>
          )}
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
          {errorsLocation.addressTypeForPickup && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.addressTypeForPickup}
            </p>
          )}
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
                    setDeliverySuggestions([]);
                  }}
                  className="px-4 py-2 cursor-pointer  hover:bg-[#6DB8D1] text-gray-900"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          {errorsLocation.deliveryLocation && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.deliveryLocation}
            </p>
          )}
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
          {errorsLocation.addressTypeForDeliver && (
            <p className="text-sm text-red-500 ml-1 px-4 ">
              {errorsLocation.addressTypeForDeliver}
            </p>
          )}
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
                  onChange={(e) => setIsPickupContact(true)}
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
                  onChange={(e) => setIsPickupContact(false)}
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
                {errorsLocation.pickupContactName && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.pickupContactName}
                  </p>
                )}
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
                {errorsLocation.pickupContactPhone && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.pickupContactPhone}
                  </p>
                )}
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
                  onChange={(e) => setIsDropoffContact(true)}
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
                  onChange={(e) => setIsDropoffContact(false)}
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
                {errorsLocation.dropoffContactName && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.dropoffContactName}
                  </p>
                )}
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
                {errorsLocation.dropoffContactPhone && (
                  <p className="text-sm text-red-500 ml-1 px-4 ">
                    {errorsLocation.dropoffContactPhone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="shipment_date"
                id="shipment_date"
                value={shipmentDate}
                onChange={(e) => setShipmentDate(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                required
              />
              <label
                htmlFor="shipment_date"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
              >
                Shipment Date
              </label>
            </div> */}

        {/* <button
          type="button"
          onClick={nextStep}
          disabled={!isStep1Valid}
          className={`w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isStep1Valid
              ? "bg-blue-600 text-gray-900 hover:bg-blue-700"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button> */}
      </div>

      {/* Include other form fields from step one */}
    </div>
  );
};

export default StepOne;
