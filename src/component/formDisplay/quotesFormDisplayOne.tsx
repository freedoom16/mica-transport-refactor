"use client";
import React, { useState, useEffect } from "react";
import { useGetQuoetsByIDQuery } from "../../../src/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import DIsplayFormSkeleton from "../displayFormSkeleton";

const QuoteFormDisplayOne: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<string | null>(null);

  const [option, setOption] = useState<string | null>(null);
  const [pickupDateOption, setPickupDateOption] = useState<string | null>(null);
  const [deliveryDateOption, setDeliveryDateOption] = useState<string | null>(
    null
  );
  const [pickupTimeOption, setPickupTimeOption] = useState<string | null>(null);
  const [deliveryTimeOption, setDeliveryTimeOption] = useState<string | null>(
    null
  );

  const [pickupLocationName, setPickupLocationName] = useState("");
  const [pickupLocationPhone, setPickupLocationPhone] = useState("");
  const [deliveryLocationName, setdeliveryLocationName] = useState("");
  const [deliveryLocationPhone, setdeliveryLocationPhone] = useState("");

  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  // Get the quote ID from the router query
  const searchParams: any = useSearchParams();
  const quoteId = searchParams.get("id");

  // Fetch the quote data using `useGetQuotesQuery`
  const {
    data: data,
    isLoading,
    isError,
    error,
  } = useGetQuoetsByIDQuery(quoteId);

  const Error: any = error;

  const quoteData = {
    pickupLocation: "123 Main St, Cityville, NY",
    pickupLocationName: "test test",
    pickupLocationPhone: "+12345678998",
    deliveryLocation: "456 Elm St, Townsville, TX",
    deliveryLocationName: "freedom m",
    deliveryLocationPhone: "+12345678998",
    shipmentDate: "03-15-2025",
    vehicleYear: "2020",
    vehicleModel: "Toyota Camry",
    vehicleType: "open",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    paymentMethod: "down_time",
    paymentLink: "https://payment.link/your-payment-url",
    pickupDate: "03-14-2025",
    deliveryDate: "03-16-2025",
    pickupTime: "10:00 AM",
    deliveryTime: "2:00 PM",
    option: "Before",
    pickupDateOption: "On", // Set as "on"
    deliveryDateOption: "Before", // Set as "before"
    pickupTimeOption: "Between", // Set as "between"
    deliveryTimeOption: "On", // Set as "on"
  };

  // Check if the quote data has loaded
  useEffect(() => {
    if (quoteData) {
      setPickupLocation(quoteData.pickupLocation);
      setDeliveryLocation(quoteData.deliveryLocation);
      setPickupLocationName(quoteData.pickupLocationName);
      setPickupLocationPhone(quoteData.pickupLocationPhone);
      setdeliveryLocationName(quoteData.deliveryLocationName);
      setdeliveryLocationPhone(quoteData.deliveryLocationPhone);
      setShipmentDate(quoteData.shipmentDate);
      setVehicleYear(quoteData.vehicleYear);
      setVehicleModel(quoteData.vehicleModel); // This was changed based on the JSON structure
      setVehicleType(quoteData.vehicleType);
      setFirstName(quoteData.firstName);
      setLastName(quoteData.lastName);
      setEmail(quoteData.email);
      setPhone(quoteData.phone);
      setPaymentMethod(quoteData.paymentMethod);
      setPaymentLink(quoteData.paymentLink);
      setPickupDate(quoteData.pickupDate);
      setDeliveryDate(quoteData.deliveryDate);
      setPickupTime(quoteData.pickupTime);
      setDeliveryTime(quoteData.deliveryTime);
      setOption(quoteData.option);

      // Setting the options based on the quote data
      setPickupDateOption(quoteData.pickupDateOption);
      setDeliveryDateOption(quoteData.deliveryDateOption);
      setPickupTimeOption(quoteData.pickupTimeOption);
      setDeliveryTimeOption(quoteData.deliveryTimeOption);
    }
  }, [quoteData]);

  if (isLoading) {
    return (
      <div className="mt-12">
        {" "}
        <DIsplayFormSkeleton />;
      </div>
    );
  }

  //   if (errorMessage) {
  //     return <div>{errorMessage}</div>;
  //   }

  return (
    <section id="quote">
      <div className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900 mt-12">
        {/* Step 3: Contact Info */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* First Name */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">First Name:</p>
              <p className="w-2/3">{firstName}</p>
            </div>

            {/* Last Name */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Last Name:</p>
              <p className="w-2/3">{lastName}</p>
            </div>

            {/* Email Address */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Email Address:</p>
              <p className="w-2/3">{email}</p>
            </div>

            {/* Phone Number */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Phone Number:</p>
              <p className="w-2/3">{phone}</p>
            </div>
          </div>
        </div>

        {/* Step 1: Pickup, Delivery, and Shipment Date */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">
            Shipment Details
          </h2>
          {/* <div>{Error.data}</div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* Pickup Location */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Location:</p>
              <p className="w-2/3">{pickupLocation}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Contact Name:</p>
              <p className="w-2/3">{pickupLocationName}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Contact Phone:</p>
              <p className="w-2/3">{pickupLocationPhone}</p>
            </div>

            {/* Delivery Location */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Location:</p>
              <p className="w-2/3">{deliveryLocation}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Contact Name:</p>
              <p className="w-2/3">{deliveryLocationName}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Contact Phone:</p>
              <p className="w-2/3">{deliveryLocationPhone}</p>
            </div>
          </div>
        </div>

        {/* Pickup and Delivery Dates */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">
            Shipment Date and TIme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* Pickup Date */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Date:</p>
              <p className="w-2/3 flex flex-row">
                <p className="pr-2">{pickupDateOption}</p>
                <p>{pickupDate}</p>
              </p>
            </div>
            {/* Delivery Date */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Date:</p>
              <p className="w-2/3 flex flex-row">
                <p className="pr-2">{deliveryDateOption}</p>
                <p>{deliveryDate}</p>
              </p>
            </div>
            {/* Pickup Time */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Time:</p>
              <p className="w-2/3 flex flex-row">
                <p className="pr-2">{pickupTimeOption}</p>
                <p>{pickupTime}</p>
              </p>
            </div>
            {/* Delivery Time */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Time:</p>
              <p className="w-2/3 flex flex-row">
                <p className="pr-2">{deliveryTimeOption}</p>
                <p>{deliveryTime}</p>
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Vehicle Info */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* Vehicle Year */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Vehicle Year:</p>
              <p className="w-2/3">{vehicleYear}</p>
            </div>

            {/* Vehicle Model */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Vehicle Maker:</p>
              <p className="w-2/3">{vehicleModel}</p>
            </div>

            {/* Vehicle Model */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Vehicle Model:</p>
              <p className="w-2/3">{vehicleModel}</p>
            </div>

            {/* Vehicle Type */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Vehicle Type:</p>
              <p className="w-2/3">{vehicleType}</p>
            </div>

            <div className="flex justify-between items-center">
              {/* <p className="font-semibold w-1/3">Vehicle Type:</p> */}
              <p className="w-2/3 font-bold bg-green-700 p-2 rounded-lg text-center">
                Drivable
              </p>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        {isError && (
          <div className="text-red-500 text-sm mb-4">
            Failed to load quote data. Please try again later.
          </div>
        )}
      </div>
    </section>
  );
};

export default QuoteFormDisplayOne;
