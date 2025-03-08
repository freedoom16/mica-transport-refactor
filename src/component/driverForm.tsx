"use client";
import { useGetQuoetsByIDQuery } from "@/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewQuoteForm = () => {
  const searchParams: any = useSearchParams();
  const userId = searchParams.get("id");

  const [driverName, setDriverName] = useState(""); // New state for driver's name

  // Fetch data using the query from the Redux store
  const {
    data: data,
    isLoading,
    error,
    isError,
  } = useGetQuoetsByIDQuery(userId);
  // const { data: formData, isLoading, error } = useGetQuoetsByIDQuery(userId);

  const formData = {
    pickupName: "John Doe",
    pickupAddress: "123 Main St, Springfield, IL",
    pickupCityState: "Springfield, IL",
    pickupPhone: "(555) 123-4567",
    deliveryName: "Jane Smith",
    deliveryAddress: "456 Oak Ave, Chicago, IL",
    deliveryCityState: "Chicago, IL",
    deliveryPhone: "(555) 987-6543",
    vehicleMileage: "25,000 miles",
    plateNumber: "XYZ 1234",
    vinNumber: "1HGBH41JXMN109186",
    inspectionConditions: "Good condition, no visible damage",
    transportFee: "$300.00",
    prePaid: "$150.00",
    totalCOD: "$150.00",
    paymentType: "Credit Card",
    paymentMadeIn: "USD",
  };

  // State for loading/error handling
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (error) {
      setErrorMessage("Error fetching data");
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  //   if (errorMessage) {
  //     return <div>{errorMessage}</div>;
  //   }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form or handle confirmation
    alert("Contract Confirmed! Driver: " + driverName); // Example confirmation
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900">
      <h2 className="text-2xl text-white font-semibold mb-4">View Quote</h2>

      {/* Pickup Information */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg text-white font-bold mb-2">
          Pickup Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300">
          {/* Flexbox layout for aligning Pickup Name */}
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Pickup Name:</p>{" "}
            {/* Fixed width for left side */}
            <p className="w-2/3">{formData?.pickupName}</p>{" "}
            {/* Flexible width for right side */}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Pickup Address:</p>
            <p className="w-2/3">{formData?.pickupAddress}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Pickup City/State:</p>
            <p className="w-2/3">{formData?.pickupCityState}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Pickup Phone:</p>
            <p className="w-2/3">{formData?.pickupPhone}</p>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg text-white font-bold mb-2">
          Delivery Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Delivery Name:</p>
            <p className="w-2/3">{formData?.deliveryName}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Delivery Address:</p>
            <p className="w-2/3">{formData?.deliveryAddress}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Delivery City/State:</p>
            <p className="w-2/3">{formData?.deliveryCityState}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Delivery Phone:</p>
            <p className="w-2/3">{formData?.deliveryPhone}</p>
          </div>
        </div>
      </div>

      {/* Vehicle and Payment Information */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg text-white font-bold mb-2">
          Vehicle and Payment Details
        </h3>
        <div className="space-y-4 text-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Vehicle Mileage:</p>
            <p className="w-2/3">{formData?.vehicleMileage}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Plate Number:</p>
            <p className="w-2/3">{formData?.plateNumber}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">VIN Number:</p>
            <p className="w-2/3">{formData?.vinNumber}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Inspection Conditions:</p>
            <p className="w-2/3">{formData?.inspectionConditions}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Transport Fee:</p>
            <p className="w-2/3">{formData?.transportFee}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Pre-paid:</p>
            <p className="w-2/3">{formData?.prePaid}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Total COD:</p>
            <p className="w-2/3">{formData?.totalCOD}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Payment Type:</p>
            <p className="w-2/3">{formData?.paymentType}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Payment Made In:</p>
            <p className="w-2/3">{formData?.paymentMadeIn}</p>
          </div>
        </div>
      </div>

      <div className=" bg-gray-800 p-6 mb-4">
        <h2 className="text-lg font-bold text-white mb-4">
          By Type your name confirm contract{" "}
        </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="driver_name"
            id="driver_name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
            disabled={isLoading || isError}
          />
          <label
            htmlFor="driver_name"
            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
          >
            Driver Name
          </label>
        </div>
        {/* Step 6: Contract Confirmation */}
        <div className="bg-gray-800 p-6 mb-4 text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg"
          >
            Confirm Contract
          </button>
        </div>

        {/* Error Handling */}
        {isError && (
          <div className="text-red-500 text-sm mb-4">
            Failed to load quote data. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQuoteForm;
