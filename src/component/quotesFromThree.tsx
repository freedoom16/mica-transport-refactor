"use client";
import { useUpdateQuoetsMutation } from "@/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const MultiStepTransportationForm = () => {
  const [step, setStep] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [updateQuoets] = useUpdateQuoetsMutation();
  const searchParams: any = useSearchParams();
  const userId = searchParams.get("id");
  console.log("user ID " + userId);

  const API_KEY = "f20bdd1c4a7b4139b83d4901b95d6dc4"; // Replace with your OpenCage API key
  const API_URL = "https://api.opencagedata.com/geocode/v1/json";

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
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "pickupAddress" && value.length > 2) {
      console.log(value);
      fetchSuggestions(value);
    } else if (name === "pickupAddress") {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(
          query
        )}&pretty=1&no_annotations=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.results.map((result: any) => result.formatted));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (address: string) => {
    setFormData((prev: any) => ({ ...prev, pickupAddress: address }));
    setSuggestions([]);
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
            <h3 className="text-lg font-medium mb-4">Pickup Information</h3>
            {[
              "pickupName",
              "pickupAddress",
              "pickupCityState",
              "pickupPhone",
            ].map((key) => (
              <div className="relative z-0 w-full group mb-4" key={key}>
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

                {/* Suggestion Dropdown for pickupAddress */}
                {key === "pickupAddress" && suggestions.length > 0 && (
                  <div className="relative z-10 w-full mt-2 bg-gray-800 border border-gray-300 rounded-lg shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-600 text-white"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="bg-gray-800 p-6">
            <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
            {[
              "deliveryName",
              "deliveryAddress",
              "deliveryCityState",
              "deliveryPhone",
            ].map((key) => (
              <div className="relative z-0 w-full group mb-4" key={key}>
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
      case 3:
        return (
          <div className="bg-gray-800 p-6">
            <h3 className="text-lg font-medium mb-4">
              Vehicle and Payment Details
            </h3>
            {[
              "vehicleMileage",
              "plateNumber",
              "vinNumber",
              "inspectionConditions",
              "transportFee",
              "prePaid",
              "totalCOD",
              "paymentType",
              "paymentMadeIn",
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
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>
        )}
        {step < 3 ? (
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
      </div>
    </form>
  );
};

export default MultiStepTransportationForm;
