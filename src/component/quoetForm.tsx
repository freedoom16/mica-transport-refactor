import React, { useState } from "react";

const QouetForm: React.FC = () => {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");

  // Step 2 fields
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const phoneRegex =
    /^(?:\+1\s?)?(\([2-9]{1}[0-9]{2}\)|[2-9]{1}[0-9]{2})[2-9]{1}[0-9]{2}[0-9]{4}(?:\s?x\d{1,4})?$/;

  // Step 3 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Validation logic for each step
  const isStep1Valid = pickupLocation && deliveryLocation && shipmentDate;
  const isStep2Valid = vehicleYear && vehicleModel && vehicleType;
  const isStep3Valid = firstName && lastName && email && phoneRegex.test(phone);

  const nextStep = () => {
    if (
      (step === 1 && isStep1Valid) ||
      (step === 2 && isStep2Valid) ||
      (step === 3 && isStep3Valid)
    ) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <section id="quote">
      <form className="max-w-lg mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Step 1: Pickup, Delivery, and Shipment Date */}
        {step === 1 && (
          <div>
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
              />
              <label
                htmlFor="shipment_date"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
              >
                Shipment Date
              </label>
            </div>

            <button
              type="button"
              onClick={nextStep}
              disabled={!isStep1Valid}
              className={`w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isStep1Valid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Vehicle Info */}
        {step === 2 && (
          <div>
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

            <button
              type="button"
              onClick={prevStep}
              className="w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={nextStep}
              disabled={!isStep2Valid}
              className={`w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isStep2Valid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: User Info */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">User Info</h2>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                required
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
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
              >
                Email
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
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
              >
                Phone
              </label>
              {!phoneRegex.test(phone) && phone.length > 0 && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a valid phone number.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={prevStep}
              className="w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            >
              Previous
            </button>

            <button
              type="submit"
              disabled={!isStep3Valid}
              className={`w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isStep3Valid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default QouetForm;
