"use client";
import { useUpdateQuoetsMutation } from "@/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const MultiStepTransportationForm = () => {
  const [step, setStep] = useState(1);

  const [updateQuoets] = useUpdateQuoetsMutation();
  const searchParams: any = useSearchParams();
  const userId = searchParams.get("id");
  console.log("user ID " + userId);

  const [formData, setFormData] = useState<any>({
    pickupName: "",
    pickupAddress: "",
    pickupCityState: "",
    pickupPhone: "",
    deliveryName: "",
    deliveryAddress: "",
    deliveryCityState: "",
    deliveryPhone: "",
    vehicleMileage: "",
    plateNumber: "",
    vinNumber: "",
    inspectionConditions: "",
    transportFee: "",
    prePaid: "",
    totalCOD: "",
    paymentType: "",
    paymentMadeIn: "",
    vehicleDimension: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({
      ...prevState,
      paymentType: e.target.value, // Set selected payment type
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Dispatch the mutation with userId and form data
      await updateQuoets({ userId, data: formData }).unwrap();
      console.log("Form submitted successfully:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-gray-800 p-6">
            <h3 className="text-lg font-medium mb-4">
              Vehicle and Payment Details
            </h3>
            {[
              "vehicleMileage",
              "plateNumber",
              "vinNumber",
              "vehicleDimension",
            ].map((key) => (
              <div className="relative z-0 w-full  group mb-4" key={key}>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={key}
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="bg-gray-800 p-6">
            <h3 className="text-lg font-medium mb-4">
              Vehicle and Payment Details
            </h3>
            {/* Payment Type Selection */}
            <div className="mb-4">
              <p className="text-sm text-gray-400">Payment Type:</p>
              <div className="flex space-x-4  flex-wrap">
                {[
                  "COP",
                  "COD",
                  "Check",
                  "Zelle",
                  "Certified",
                  "Cash app",
                  "Creditcard",
                  "ACH",
                ].map((paymentOption) => (
                  <label
                    key={paymentOption}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value={paymentOption}
                      checked={formData.paymentType === paymentOption}
                      onChange={handlePaymentTypeChange}
                      className="form-radio text-blue-500 w-6 h-6"
                    />
                    <span className="text-sm text-white p-2">
                      {paymentOption}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {["transportFee", "prePaid", "totalAmount"].map((key) => (
              <div className="relative z-0 w-full  group mb-4" key={key}>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                  // required
                />
                <label
                  htmlFor={key}
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg p-6 rounded-lg shadow-lg mx-auto"
    >
      {renderStepContent()}
      <div className="flex flex-col space-y-4">
        {step < 2 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        )}
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepTransportationForm;
