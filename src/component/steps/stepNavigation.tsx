"use client";
import React from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextEnabled: boolean | string;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextEnabled,
}) => {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <button
          type="button"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          onClick={onPrev}
        >
          Previous
        </button>
      )}
      <div className="flex-grow"></div>
      {currentStep < totalSteps ? (
        <button
          type="button"
          className={`px-4 py-2 rounded-lg ${
            isNextEnabled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
