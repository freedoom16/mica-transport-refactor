"use client";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import {
  useGetQuoetsByIDQuery,
  useGetQuotesQuery,
} from "../../store/Api/quotesApi"; // Import your API hook
import { useRouter, useSearchParams } from "next/navigation";

const QuoteForm: React.FC = () => {
  // State variables to store form data
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

  const phoneRegex =
    /^(?:\+1\s?)?(\([2-9]{1}[0-9]{2}\)|[2-9]{1}[0-9]{2})[2-9]{1}[0-9]{2}[0-9]{4}(?:\s?x\d{1,4})?$/;

  // Get the quote ID from the router query
  const router = useRouter();
  //   const { query } = router;
  //   const quoteId: any = query.id;

  const searchParams: any = useSearchParams();
  const quoteId = searchParams.get("id");

  // Fetch the quote data using `useGetQuotesQuery`
  const {
    data: quoteData,
    isLoading,
    isError,
    error,
  } = useGetQuoetsByIDQuery(quoteId);

  console.log(quoteData);
  // Check if the quote data has loaded
  useEffect(() => {
    if (quoteData) {
      setPickupLocation(quoteData.pickup);
      setDeliveryLocation(quoteData.delivery);
      setShipmentDate(quoteData.shipDate);
      setVehicleYear(quoteData.vehicleYear);
      setVehicleModel(quoteData.vehicleMake); // Assuming vehicle make is stored as model
      setVehicleType(quoteData.transportType);
      setFirstName(quoteData.firstName);
      setLastName(quoteData.lastName);
      setEmail(quoteData.email);
      setPhone(quoteData.phone);
      setPaymentMethod(quoteData.paymentMethod);
      setPaymentLink(quoteData.paymentLink);
    }
  }, [quoteData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form if needed
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    if (method === "down_time" || method === "full_payment") {
      setPaymentLink("https://payment.link/your-payment-url"); // Replace with actual payment link logic
    } else {
      setPaymentLink(null); // Clear the payment link if 'upon delivery' is selected
    }
  };

  return (
    <section id="quote">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-14  p-6 rounded-lg shadow-lg"
      >
        {/* Step 1: Pickup, Delivery, and Shipment Date */}
        <div className=" bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">
            Shipment Details
          </h2>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="pickup_location"
              id="pickup_location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError} // Disable when loading or if there is an error
            />
            <label
              htmlFor="pickup_location"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Pickup Location
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="delivery_location"
              id="delivery_location"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="delivery_location"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Delivery Location
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="shipment_date"
              id="shipment_date"
              value={shipmentDate}
              onChange={(e) => setShipmentDate(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="shipment_date"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Shipment Date
            </label>
          </div>
        </div>

        <div className=" bg-gray-800 p-6 mb-4">
          {/* Step 2: Vehicle Info */}
          <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="vehicle_year"
              id="vehicle_year"
              value={vehicleYear}
              onChange={(e) => setVehicleYear(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="vehicle_year"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Vehicle Year
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="vehicle_model"
              id="vehicle_model"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="vehicle_model"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Vehicle Model
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              name="vehicle_type"
              id="vehicle_type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              required
              disabled={isLoading || isError}
            >
              <option value="">Select Vehicle Type</option>
              <option value="open" className="text-white">
                Open
              </option>
              <option value="closed" className="text-white">
                Closed
              </option>
            </select>
            <label
              htmlFor="vehicle_type"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 scale-80 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Vehicle Type
            </label>
          </div>
        </div>

        <div className=" bg-gray-800 p-6 mb-4">
          {/* Step 3: Contact Info */}
          <h2 className="text-lg font-bold text-white mb-4">Contact Info</h2>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="first_name"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              First Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="last_name"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Last Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Email Address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
              disabled={isLoading || isError}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Phone Number
            </label>
          </div>

          {/* Step 4: Payment Method */}
          <h2 className="text-lg font-bold text-white mb-4">Payment Info</h2>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="payment_method"
              id="payment_method"
              value={paymentMethod || ""}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              required
              disabled={isLoading || isError}
            >
              <option value="">Select Payment Method</option>
              <option value="down_time">Down Time Payment</option>
              <option value="full_payment">Full Payment</option>
              <option value="upon_delivery">Upon Delivery</option>
            </select>
            <label
              htmlFor="payment_method"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 scale-80 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Payment Method
            </label>
          </div>

          {paymentLink && (
            <div className="relative z-0 w-full mb-5 group">
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
      </form>
    </section>
  );
};

export default QuoteForm;
