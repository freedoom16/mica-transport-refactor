import React, { useState } from "react";
import ImageUpload from "./imageUpload"; // Import ImageUpload component

const VehicleImageUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Upload Front View",
    "Upload Back View",
    "Upload Left Side View",
    "Upload Right Side View",
    "Upload Top View",
    "Upload Dashboard",
    "Upload Motor",
    "Upload Behind Driver",
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

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">
        Step {currentStep + 1}: {steps[currentStep]}
      </h2>
      <ImageUpload currentStep={currentStep} />

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
