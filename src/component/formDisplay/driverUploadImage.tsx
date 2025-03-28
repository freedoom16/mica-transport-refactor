"use client";
import React, { useState } from "react";
import ImageUpload from "./imageUpload";
import { useSearchParams } from "next/navigation";
import { useGetQuoetsByIDQuery } from "@/store/Api/quotesApi";

const VehicleImageUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [driverName, setDriverName] = useState(""); // New state for driver's name
  const [damageType, setDamageType] = useState<string | null>(null);
  const searchParams: any = useSearchParams();
  const quoteId = searchParams.get("id");

  // Fetch the quote data using `useGetQuotesQuery`
  const {
    data: data,
    isLoading,
    isError,
    error,
  } = useGetQuoetsByIDQuery(quoteId);
  // const [selectedImages, setSelectedImages] = useState<any>({
  //   front: null,
  //   back: null,
  //   left: null,
  //   right: null,
  //   top: null,
  //   dashboard: null,
  //   motor: null,
  //   behindDriver: null,
  // });

  const [selectedImages, setSelectedImages] = useState<any>({
    front: { image: null, damageType: null },
    back: { image: null, damageType: null },
    left: { image: null, damageType: null },
    right: { image: null, damageType: null },
    top: { image: null, damageType: null },
    dashboard: { image: null, damageType: null },
    motor: { image: null, damageType: null },
    behindDriver: { image: null, damageType: null },
  });

  const iconMapping: { [key: string]: string } = {
    front: "step1", // front.svg
    back: "step2", // back.svg
    left: "step3", // left.svg
    right: "step4", // right.svg
    top: "step5", // interior.svg
    dashboard: "step7", // exterior.svg
    motor: "step6", // engine.svg
    behindDriver: "behindDriver", // wheels.svg
  };

  const steps = [
    "Upload Front View",
    "Upload Back View",
    "Upload Left Side View",
    "Upload Right Side View",
    "Upload Top View",
    "Upload Dashboard",
    "Upload Interior",
    "Upload Trunk",
    "Final Upload",
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleDamageTypeSelect = (step: string, damageType: string) => {
  //   // setSelectedImages({
  //   //   ...selectedImages,
  //   //   [step]: { ...selectedImages[step], damageType },
  //   // });
  // };

  // const handleImageSelect = (step: string, image: File) => {
  //   setSelectedImages({
  //     ...selectedImages,
  //     [step]: image,
  //   });
  // };

  const handleDamageTypeSelect = (step: string, damageType: string) => {
    setSelectedImages({
      ...selectedImages,
      [step]: {
        ...selectedImages[step], // Preserve the image already selected (if any)
        damageType, // Update the damage type for this step
      },
    });
  };

  const handleImageSelect = (step: string, image: File) => {
    setSelectedImages({
      ...selectedImages,
      [step]: {
        image, // Store the selected image
        damageType: selectedImages[step]?.damageType || null, // Keep the existing damage type or set null if not present
      },
    });
  };
  const handleFinalUpload = () => {
    alert("All images have been uploaded!");
    // You can now handle the final upload logic (e.g., send the images to your server or blockchain)
  };

  const handleSubmitContract = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form or handle confirmation
    alert("Contract Confirmed! Driver: " + driverName); // Example confirmation
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form or handle confirmation
    alert("Contract submitted!"); // Example confirmation
  };

  if (isError) {
    console.log(Error);
    return;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900">
      <div className="bg-gray-800 p-6 mb-4">
        {currentStep === steps.length - 1 ? (
          <div className="bg-gray-800 p-6 mb-4">
            <h2 className="text-xl font-bold text-white  ">
              Step {currentStep + 1}: {steps[currentStep]}
            </h2>
            <h3 className="text-white mb-4">Review and upload all images:</h3>
            <div className="mb-6 text-white">
              {Object.entries(selectedImages).map(
                ([step, { image, damageType }]: any) => {
                  const iconName = iconMapping[step]; // Use the iconMapping for numeric keys

                  return (
                    <div key={step} className="mb-6">
                      {image ? (
                        <div className="">
                          <h4 className="text-white">{`${
                            step.charAt(0).toUpperCase() + step.slice(1)
                          } View`}</h4>
                          <div className="flex flex-row">
                            <div className="flex w-1/2 mr-4 space-x-6">
                              {iconName && (
                                <img
                                  src={`/${iconName}.svg`} // Using the mapped icon name
                                  alt={`${iconName} icon`}
                                  className="w-full h-auto lg:h-48 bg-white mr-4"
                                />
                              )}
                            </div>
                            <div className="flex w-1/2">
                              <img
                                src={URL.createObjectURL(image)} // Create object URL for the selected image
                                alt={step}
                                className="w-full h-auto lg:h-48 object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-white flex flex-row">
                          <div className="text-white w-1/2 mr-4">
                            <img
                              src={`/${iconName}.svg`} // Using the mapped icon name
                              alt={`${iconName} icon`}
                              className="w-full h-auto mr-4 bg-white"
                            />
                          </div>

                          {damageType ? (
                            <div className="text-red-500 mt-2">
                              <strong>Damage Type: </strong>
                              {damageType}
                            </div>
                          ) : (
                            <div className="text-red-500 w-1/2">
                              No image selected
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <button
              onClick={handleFinalUpload}
              className="py-2 px-4 bg-green-500 text-white font-bold rounded-lg"
            >
              Confirm Upload
            </button>
          </div>
        ) : (
          <ImageUpload
            currentStep={currentStep}
            handleImageSelect={handleImageSelect}
            selectedImages={selectedImages}
            // setDamageType={damageType}
            handleDamageTypeSelect={handleDamageTypeSelect}
          />
        )}
        {currentStep === steps.length - 1 ? (
          <div className=""></div>
        ) : (
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="py-2 px-4 bg-gray-500 text-white font-bold rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
              className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className=" bg-gray-800 p-6 mb-4">
        <h2 className="text-lg font-bold text-white mb-4">
          Sign by your name{" "}
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
            disabled={currentStep === steps.length - 1 ? false : true}
          />
          <label
            htmlFor="driver_name"
            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
          >
            Driver Name
          </label>
        </div>

        <h2 className="text-lg font-bold text-white mb-4">
          Client Sign by name{" "}
        </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="driver_name"
            id="driver_name"
            // value={driverName}
            // onChange={(e) => setDriverName(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
            disabled={currentStep === steps.length - 1 ? false : true}
          />
          <label
            htmlFor="driver_name"
            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
          >
            Client Name
          </label>
        </div>

        {/* Step 6: Contract Confirmation */}
        <div className="bg-gray-800 p-6 mb-4 text-center">
          <button
            type="submit"
            onClick={handleSubmitContract}
            className={`${
              currentStep === steps.length - 1 ? "bg-blue-500" : "bg-gray-500"
            } py-2 px-4  text-white font-bold rounded-lg`}
            // disabled={currentStep === steps.length - 1 ? false : true}
          >
            Confirm Contract
          </button>
        </div>

        {/* Error Handling */}
        {/* {isError ||
          (false && (
            <div className="text-red-500 text-sm mb-4">
              Failed to load quote data. Please try again later.
            </div>
          ))} */}
      </div>

      <div className="bg-gray-800 p-6 mb-4 text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`bg-blue-500 py-2 px-4  text-white font-bold rounded-lg`}
        >
          Submit Contract
        </button>
      </div>
    </div>
  );
};

export default VehicleImageUpload;
