import React, { useState } from "react";

interface ImageUploadProps {
  currentStep: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentStep }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = () => {
    if (image) {
      setIsUploaded(true);
      alert("Image uploaded successfully!");
    } else {
      alert("Please select an image before uploading.");
    }
  };

  const getStepLabel = () => {
    const stepLabels = [
      "Front View",
      "Back View",
      "Left Side View",
      "Right Side View",
      "Top View",
      "Dashboard",
      "Motor",
      "Behind Driver",
    ];
    return stepLabels[currentStep];
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center mb-4">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-500 flex items-center justify-center rounded-lg text-white">
            No Preview
          </div>
        )}
      </div>
      <div className="text-white text-center mb-4">
        <h3 className="font-semibold">{getStepLabel()}</h3>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block mb-4 w-full text-sm text-white bg-transparent border-2 border-gray-500 p-2 rounded-lg"
      />
      {isUploaded ? (
        <div className="text-green-500 mb-4">Image uploaded!</div>
      ) : (
        <button
          onClick={handleUpload}
          className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg w-full"
        >
          Upload {getStepLabel()}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
