"use client";
import React, { useState, useEffect } from "react";
interface ImageUploadProps {
  currentStep: number;
  handleImageSelect: (step: string, image: File) => void;
  selectedImages: any;
  handleDamageTypeSelect: (step: string, damageType: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentStep,
  handleImageSelect,
  selectedImages,
  handleDamageTypeSelect,
}) => {
  const stepLabels = [
    "front",
    "back",
    "left",
    "right",
    "top",
    "dashboard",
    "motor",
    "behindDriver",
  ];

  const stepLabel = stepLabels[currentStep];
  // const currentImage = selectedImages[stepLabel];
  const currentImage = selectedImages[stepLabel].image;
  const currentDamageType = selectedImages[stepLabel].damageType;

  // const [selectedDamageType, setSelectedDamageType] = useState<string>("");

  const [selectedDamageType, setSelectedDamageType] = useState<string>(
    currentDamageType || ""
  );

  // Update the local state when the damage type changes
  useEffect(() => {
    setSelectedDamageType(currentDamageType || "");
  }, [currentDamageType]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(stepLabel, file);
    }
  };

  const handleDamageChange = (step: string, damageType: string) => {
    setSelectedDamageType(damageType); // Optionally store the damage type locally for display
    handleDamageTypeSelect(step, damageType); // Pass damage type up to the parent component
  };

  return (
    <div className="mb-6 bg-gray-800 p-6">
      <div className="text-white text-center mb-4">
        <h3 className="font-semibold">
          Upload {stepLabel.charAt(0).toUpperCase() + stepLabel.slice(1)} View
        </h3>
        <img
          // src="/file.svg"
          src={`/step${currentStep + 1}.svg`}
          alt="Car Icon"
          className="w-full h-24 bg-white text-black"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block mb-4 w-full text-sm text-white bg-transparent border-2 border-gray-500 p-2 rounded-lg"
      />
      {currentImage && (
        <div className="flex justify-center mb-4">
          <img
            src={URL.createObjectURL(currentImage)}
            alt={stepLabel}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="text-white text-center">
        {currentImage ? (
          <p className="text-green-500">Image selected!</p>
        ) : (
          <div>
            <label
              htmlFor="damage_type"
              className="block mb-2 text-sm font-medium text-white"
            >
              Select Damage Type
            </label>
            <select
              id="damage_type"
              name="damage_type"
              // onChange={handleDamageChange}
              value={selectedDamageType}
              onChange={(e) =>
                handleDamageChange(stepLabels[currentStep], e.target.value)
              }
              className="block w-full py-2.5 px-0 text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="Bent">Bent</option>
              <option value="Torn">Torn</option>
              <option value="Broken">Broken</option>
              <option value="Chipped">Chipped</option>
              <option value="Dent">Dent</option>
              <option value="Missing">Missing</option>
              <option value="Scratched">Scratched</option>
              <option value="Glass Cracked">Glass Cracked</option>
            </select>
          </div>
        )}
        {selectedDamageType && (
          <div className="text-yellow-500 mt-2">
            Selected Damage Type: {selectedDamageType}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
