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
          className="px-4 py-2 bg-[#6DB8D1] text-gray-900 rounded-full "
          onClick={onPrev}
        >
          <div className="">Previous</div>
        </button>
      )}
      <div className="flex-grow"></div>
      {currentStep < totalSteps ? (
        <button
          type="button"
          className={`px-8 py-2 rounded-full ${
            isNextEnabled
              ? "bg-[#6DB8D1]  text-gray-900 "
              : "bg-[#6DB8D1]  text-gray-900 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-[#6DB8D1]  text-gray-900 rounded-full "
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
