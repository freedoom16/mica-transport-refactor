"use client";
import React, { useState, useEffect } from "react";
import { useGetQuoetsByIDQuery } from "../../src/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";

const QuoteForm: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
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
  const { data: data, isLoading, isError } = useGetQuoetsByIDQuery(quoteId);

  // const {
  //   data: quoteData,
  //   isLoading,
  //   isError,
  // } = useGetQuoetsByIDQuery(quoteId);

  const quoteData = {
    pickupLocation: "123 Main St, Cityville, NY",
    deliveryLocation: "456 Elm St, Townsville, TX",
    shipmentDate: "2025-03-15",
    vehicleYear: "2020",
    vehicleModel: "Toyota Camry",
    vehicleType: "open",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    paymentMethod: "down_time",
    paymentLink: "https://payment.link/your-payment-url",
  };

  // Check if the quote data has loaded
  useEffect(() => {
    if (quoteData) {
      setPickupLocation(quoteData.pickupLocation);
      setDeliveryLocation(quoteData.deliveryLocation);
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
    }
  }, [quoteData]);

  if (isLoading) {
    return <div className="mt-16 p-6 text-center">Loading...</div>;
  }

  //   if (errorMessage) {
  //     return <div>{errorMessage}</div>;
  //   }

  return (
    <section id="quote">
      <div className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900 mt-12">
        {/* Step 1: Pickup, Delivery, and Shipment Date */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">
            Shipment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* Pickup Location */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Location:</p>
              <p className="w-2/3">{pickupLocation}</p>
            </div>

            {/* Delivery Location */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Location:</p>
              <p className="w-2/3">{deliveryLocation}</p>
            </div>

            {/* Shipment Date */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Shipment Date:</p>
              <p className="w-2/3">{shipmentDate}</p>
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
              <p className="font-semibold w-1/3">Vehicle Model:</p>
              <p className="w-2/3">{vehicleModel}</p>
            </div>

            {/* Vehicle Type */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Vehicle Type:</p>
              <p className="w-2/3">{vehicleType}</p>
            </div>
          </div>
        </div>

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

        {/* Step 4: Payment Info */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Payment Info</h2>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">Payment Method:</p>
            <p className="w-2/3">{paymentMethod}</p>
          </div>

          {paymentLink && (
            <div className="mt-4">
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Proceed to Payment
              </a>
            </div>
          )}
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

export default QuoteForm;
