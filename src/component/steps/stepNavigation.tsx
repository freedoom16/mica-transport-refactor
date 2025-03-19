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
          className="px-4 py-2 bg-white shadow-xl text-gray-900 border border-gray-900 rounded-full "
          style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
          onClick={onPrev}
        >
          <div className="">Previous</div>
        </button>
      )}
      <div className="flex-grow"></div>
      {currentStep < totalSteps ? (
        <button
          type="button"
          className={`px-8 py-2 rounded-full shadow-xl border border-gray-900 bg-white  text-gray-900 `}
          onClick={onNext}
          // disabled={!isNextEnabled}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-white shadow-xl border border-gray-900 text-gray-900 rounded-full "
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
