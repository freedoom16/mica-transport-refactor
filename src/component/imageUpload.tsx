import React from "react";

interface ImageUploadProps {
  currentStep: number;
  handleImageSelect: (step: string, image: File) => void;
  selectedImages: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentStep,
  handleImageSelect,
  selectedImages,
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
  const currentImage = selectedImages[stepLabel];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(stepLabel, file);
    }
  };

  return (
    <div className="mb-6">
      <div className="text-white text-center mb-4">
        <h3 className="font-semibold">
          Upload {stepLabel.charAt(0).toUpperCase() + stepLabel.slice(1)} View
        </h3>
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
          <p className="text-red-500">Please select an image</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
