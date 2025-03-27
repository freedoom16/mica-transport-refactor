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
  const scrollToQuote = () => {
    // Use a setTimeout to ensure the DOM is ready before scrolling
    setTimeout(() => {
      const quoteElement = document.getElementById("quote-form");
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.log("Could not find the quote section to scroll.");
      }
    }, 300); // Adjust the timeout if needed (300ms delay gives time for rendering)
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      onPrev();
    }
  };

  const handleNextMobaile = () => {
    if (currentStep < totalSteps) {
      onNext();
      scrollToQuote(); // Scroll to "About Us" section
    }
  };

  const handlePrevMobaile = () => {
    if (currentStep > 1) {
      onPrev();
      scrollToQuote(); // Scroll to "About Us" section
    }
  };

  return (
    <div>
      <div className="hidden md:block md:flex md:justify-between md:mt-2">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-white shadow-xl text-gray-900 border border-gray-900 rounded-full "
            style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
            onClick={handlePrev}
          >
            <div className="">Previous</div>
          </button>
        )}

        <div className="flex"></div>
        {currentStep < totalSteps ? (
          <div>
            <button
              type="button"
              className={`px-8 py-2 rounded-full shadow-xl   bg-white   
              ${
                isNextEnabled
                  ? "border-2 border-[#6DB8D1] text-[#6DB8D1] font-bold"
                  : "border-1 border-gray-900 text-gray-900"
              }
            `}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className={`px-4 py-2 bg-white shadow-xl text-gray-900 rounded-full   ${
              isNextEnabled
                ? "border-2 border-[#6DB8D1] text-[#6DB8D1] font-bold"
                : " border-1 border-gray-900 text-gray-900"
            }`}
          >
            Submit
          </button>
        )}
      </div>

      <div className="block md:hidden flex justify-between mt-4 ">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-white shadow-xl text-gray-900 border border-gray-900 rounded-full "
            style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
            onClick={handlePrevMobaile}
          >
            <div className="">Previous</div>
          </button>
        )}

        <div className="flex-grow"></div>
        {currentStep < totalSteps ? (
          <button
            type="button"
            className={`px-8 py-2 rounded-full shadow-xl bg-white  text-gray-900   ${
              isNextEnabled
                ? "border-2 border-[#6DB8D1] text-[#6DB8D1] font-bold"
                : "border-1 border-gray-900 text-gray-900"
            }`}
            onClick={handleNextMobaile}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className={`px-4 py-2 bg-white shadow-xl text-gray-900 rounded-full   ${
              isNextEnabled
                ? "border-2 border-[#6DB8D1] text-[#6DB8D1] font-bold"
                : "border-1 border-gray-900 text-gray-900"
            }`}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
