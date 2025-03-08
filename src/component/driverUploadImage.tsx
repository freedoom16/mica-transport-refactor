"use client";
import React, { useState } from "react";
import ImageUpload from "./imageUpload";

const VehicleImageUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedImages, setSelectedImages] = useState<any>({
    front: null,
    back: null,
    left: null,
    right: null,
    top: null,
    dashboard: null,
    motor: null,
    behindDriver: null,
  });

  const steps = [
    "Upload Front View",
    "Upload Back View",
    "Upload Left Side View",
    "Upload Right Side View",
    "Upload Top View",
    "Upload Dashboard",
    "Upload Motor",
    "Upload Behind Driver",
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

  const handleImageSelect = (step: string, image: File) => {
    setSelectedImages({
      ...selectedImages,
      [step]: image,
    });
  };

  const handleFinalUpload = () => {
    alert("All images have been uploaded!");
    // You can now handle the final upload logic (e.g., send the images to your server or blockchain)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900">
      {currentStep === steps.length - 1 ? (
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-xl font-bold text-white  ">
            Step {currentStep + 1}: {steps[currentStep]}
          </h2>
          <h3 className="text-white mb-4">Review and upload all images:</h3>
          <div className="mb-6 text-white">
            {Object.entries(selectedImages).map(([key, value]: any) => (
              <div key={key}>
                <h4>{key.charAt(0).toUpperCase() + key.slice(1)}:</h4>
                {value ? (
                  <img
                    src={URL.createObjectURL(value)}
                    alt={key}
                    className="w-32 h-32 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="text-red-500">No image selected</div>
                )}
              </div>
            ))}
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
        />
      )}

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
    </div>
  );
};

export default VehicleImageUpload;
