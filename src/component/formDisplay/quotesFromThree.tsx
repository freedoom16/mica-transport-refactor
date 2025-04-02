"use client";
import {
  useGetQuoetsByIDQuery,
  useUpdateQuoetsMutation,
} from "@/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MultiStepTransportationForm = () => {
  const [step, setStep] = useState(1);
  const [
    updateQuoets,
    { isLoading: isLoadingQuotes, isSuccess, isError: errorUpdate },
  ] = useUpdateQuoetsMutation();
  const searchParams: any = useSearchParams();
  const userId = searchParams.get("id");
  const quoteId = searchParams.get("id");

  // Fetch the quote data
  const {
    data: dataForm,
    isLoading,
    isError,
    error,
  } = useGetQuoetsByIDQuery(quoteId);

  // Initialize formData with empty values
  const [formData, setFormData] = useState<any>({
    vehicleInfo: [],
    vehicleMileage: "",
    plateNumber: "",
    vinNumber: "",
    inspectionConditions: "",
    transportationFee: "",
    prePaid: dataForm?.data?.payment?.prePaidAmount || "",
    totalCOD: dataForm?.data?.payment?.totalAmount || "",
    totalAmount: dataForm?.data?.payment?.totalAmount || "",

    paymentType: dataForm?.data?.payment?.paymentType || "",
    paymentMadeIn: "",
  });

  useEffect(() => {
    if (dataForm?.data?.vehicleInfo) {
      const initialVehicleInfo = dataForm.data.vehicleInfo.map(
        (vehicle: any) => ({
          vehicleMileage: vehicle.vehicleMileage || "",
          plateNumber: vehicle.plateNumber || "",
          vinNumber: vehicle.vinNumber || "",
          dimension: vehicle.dimension || "",
          vehicleYear: vehicle.vehicleYear,
          vehicleMaker: vehicle.vehicleMaker,
          vehicleModel: vehicle.vehicleModel,
          isDrivable: vehicle.isDrivable,
          vehicleId: vehicle.vehicleId,
          vehicleType: vehicle.vehicleType,
          vehicleCatagory: vehicle.vehicleCatagory,
        })
      );

      setFormData((prevState: any) => ({
        ...prevState,
        vehicleInfo: initialVehicleInfo,
      }));
    }
    if (dataForm?.data?.payment) {
      setFormData((prevState: any) => ({
        ...prevState,
        prePaid: dataForm.data.payment.prePaidAmount || "",
        transportationFee: dataForm.data.payment.transportationFee || "",
        totalCOD: dataForm.data.payment.totalAmount || "",
        totalAmount: dataForm.data.payment.totalAmount || "",
        paymentType: dataForm.data.payment.paymentType || "",
      }));
    }
  }, [dataForm]);

  // Handle input changes dynamically based on vehicle index
  const handleInputChange = (e: any, vehicleIndex: any) => {
    const { name, value } = e.target;
    const updatedVehicleInfo = [...formData.vehicleInfo];

    // Update the vehicle info at the specific index
    updatedVehicleInfo[vehicleIndex] = {
      ...updatedVehicleInfo[vehicleIndex],
      [name]: value,
    };

    setFormData({
      ...formData,
      vehicleInfo: updatedVehicleInfo,
    });
  };
  const handleInputChangePayment = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [expandedIndex, setExpandedIndex] = useState<any>(null);

  const handlePaymentTypeChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
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

    // Prepare updatedQuote data to submit with the correct vehicleInfo format
    const updatedQuote: any = {
      payment: {
        transportationFee: formData.transportationFee,
        prePaidAmount: formData.prePaid,
        totalAmount: formData.totalAmount,
        paymentType: formData.paymentType,
      },
      vehicleInfo: formData.vehicleInfo, // All vehicles' data
    };

    try {
      console.log("Form submitted successfully:", updatedQuote);

      // Dispatch the mutation with userId and form data
      await updateQuoets({ userId, data: updatedQuote }).unwrap();
      console.log("Form submitted successfully:", updatedQuote);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleStepContent = (vehicleIndex: any) => {
    return (
      <div className="bg-gray-800 p-6">
        <h3 className="text-lg font-medium mb-4">
          Vehicle and Payment Details for Vehicle {vehicleIndex + 1}
        </h3>
        {["vehicleMileage", "plateNumber", "vinNumber", "dimension"].map(
          (key) => (
            <div className="relative z-0 w-full group mb-4" key={key}>
              <input
                type="text"
                name={key}
                id={`${key}-${vehicleIndex}`}
                value={formData.vehicleInfo[vehicleIndex][key] || ""}
                onChange={(e) => handleInputChange(e, vehicleIndex)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={`${key}-${vehicleIndex}`}
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </label>
            </div>
          )
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            {" "}
            {dataForm?.data?.vehicleInfo?.map(
              (vehicle: any, vehicleIndex: any) => (
                <div key={vehicleIndex}>
                  <div className="flex flex-row space-x-2 bg-gray-900 text-gray-900 mb-2 p-2 grid grid-cols-[1fr)] border-t border-b">
                    {/* <h3 className="text-xl col-span-3">Vehicle #{vehicleIndex + 1}</h3> */}
                    <div
                      className="flex flex-row space-x-2 bg-gray-800 text-white mb-2 p-2 grid grid-cols-[1fr_1fr_1fr_min-content_min-content] shadow-lg rounded-lg w-full cursor-pointer"
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
                        <button className="text-red-500">
                          <img
                            src={`${
                              vehicle.isDrivable === "true"
                                ? "/motor-svg-green.svg"
                                : "/motor-svg-red.svg"
                            }`}
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                      <div className="py-2">
                        {/* Toggle expanded index */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedIndex(
                              expandedIndex === vehicleIndex
                                ? null
                                : vehicleIndex
                            )
                          }
                        >
                          {expandedIndex === vehicleIndex
                            ? "Collapse"
                            : "Expand"}
                        </button>
                      </div>
                    </div>
                  </div>
                  {expandedIndex === vehicleIndex &&
                    handleStepContent(vehicleIndex)}
                </div>
              )
            )}
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
            {["transportationFee", "prePaid", "totalAmount"].map((key) => (
              <div className="relative z-0 w-full  group mb-4" key={key}>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key] || ""}
                  onChange={(e) => handlePaymentTypeChange(e)}
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

  console.log(formData);
  if (isError) {
    console.log(Error);
    return;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg p-6 rounded-lg shadow-lg mx-auto"
    >
      <div>
        {errorUpdate && (
          <div className="text-red-600 justify-center text-center">
            Error updating quote
          </div>
        )}
      </div>
      {renderStepContent()}
      <div className="flex flex-col space-y-4">
        {step < 2 ? (
          <div
            // type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 text-center py-2 rounded-lg"
          >
            Next
          </div>
        ) : (
          <button
            // type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isLoadingQuotes ? (
              <button
                disabled
                type="button"
                className="text-black   font-medium rounded-lg   py-2.5 text-center me-2  inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 me-3 text-black animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              "Submit"
            )}
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
