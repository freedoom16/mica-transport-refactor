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
  isPickupContact: string;
  setIsPickupContact: (value: string) => void;
  pickupContactName: string;
  setPickupContactName: (value: string) => void;
  pickupContactPhone: string;
  setPickupContactPhone: (value: string) => void;
  isDropoffContact: string;
  setIsDropoffContact: (value: string) => void;
  dropoffContactName: string;
  setDropoffContactName: (value: string) => void;
  dropoffContactPhone: string;
  setDropoffContactPhone: (value: string) => void;
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

  // const fetchSuggestions = async (query: string, setSuggestions: Function) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${API_URL}?address=${encodeURIComponent(query)}&key=${API_KEY}`
  //     );
  //     const data = await response.json();

  //     // Filter results to only include those in the USA
  //     const usaResults = data.results.filter((result: any) =>
  //       result.address_components.some(
  //         (component: any) => component.short_name === "US"
  //       )
  //     );

  //     console.log(data);
  //     // Set the suggestions
  //     setSuggestions(usaResults.map((result: any) => result.formatted_address));
  //   } catch (error) {
  //     console.error("Error fetching suggestions:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPickupLocation(value);
    if (value.length > 2) {
      fetchSuggestions(value, setPickupSuggestions);
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeliveryLocation(value);
    if (value.length > 2) {
      fetchSuggestions(value, setDeliverySuggestions);
    } else {
      setDeliverySuggestions([]);
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
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
            placeholder="Pickup Location"
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
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600 text-gray-900"
                >
                  {suggestion}
                </div>
              ))}
            </div>
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
            onChange={(e) => setAddressTypeForPickup(e.target.value)}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
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
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
            placeholder="Delivery Location"
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
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600 text-gray-900"
                >
                  {suggestion}
                </div>
              ))}
            </div>
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
            onChange={(e) => setAddressTypeForDeliver(e.target.value)}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
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
            <label className="block text-sm font-medium text-gray-900  md:mr-2 md:mb-0">
              Are you the point of contact at the pickup location?{" "}
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="pickup_contact"
                  value="true"
                  onChange={(e) => setIsPickupContact(e.target.value)}
                  checked={isPickupContact === "true"}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300"
                />
                <span className="text-sm text-gray-900">Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="pickup_contact"
                  value="false"
                  onChange={(e) => setIsPickupContact(e.target.value)}
                  checked={isPickupContact === "false"}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          {isPickupContact === "false" && (
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
                  onChange={(e) => setPickupContactName(e.target.value)}
                  className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                  placeholder="Pickup Contact Name"
                  required
                />
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
                  onChange={(e) => setPickupContactPhone(e.target.value)}
                  className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                  placeholder="Pickup Contact Phone Number"
                  required
                />
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
                  onChange={(e) => setIsDropoffContact(e.target.value)}
                  checked={isDropoffContact === "true"}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
                />
                <span className="text-sm text-gray-900">Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="dropoff_contact"
                  value="false"
                  onChange={(e) => setIsDropoffContact(e.target.value)}
                  checked={isDropoffContact === "false"}
                  className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          {isDropoffContact === "false" && (
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
                  onChange={(e) => setDropoffContactName(e.target.value)}
                  className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                  placeholder="Dropoff Contact Name"
                  required
                />
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
                  onChange={(e) => setDropoffContactPhone(e.target.value)}
                  className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                  placeholder="Dropoff Contact Phone Number"
                  required
                />
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
