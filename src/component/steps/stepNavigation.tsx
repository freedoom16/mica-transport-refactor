"use client";
import React from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isNextEnabled: boolean | string;
  isLoading: boolean | null;
  isSuccess: boolean | null;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  handleSubmit,
  isNextEnabled,
  isLoading,
  isSuccess,
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
    }, 30); // Adjust the timeout if needed (300ms delay gives time for rendering)
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
    console.log(currentStep, totalSteps);
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

  console.log("isnext enabled ", isNextEnabled);
  return (
    <div>
      <div className="hidden md:block md:flex md:justify-between md:mt-2">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-[#2098ee] shadow-xl text-white border border-[#2098ee] rounded-full "
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
              className={`inline-block rounded-full p-[2px] bg-gradient-to-r from-blue-800 to-[#2098ee] px-8 py-2 rounded-full shadow-xl text-[18px]   ${
                isNextEnabled
                  ? "border-2 bg-gradient-to-r from-blue-800 to-[#2098ee] border-[#2098ee] text-white font-bold"
                  : "font-bold  bg-gradient-to-r from-blue-800 to-[#2098ee] text-transparent bg-clip-text border border-[#2098ee] "
              }`}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className={`px-4 py-2 shadow-xl text-white rounded-full   ${
              isNextEnabled
                ? " bg-gradient-to-r from-blue-800 to-[#2098ee] text-white font-bold"
                : "font-bold  bg-gradient-to-r from-blue-800 to-[#2098ee] text-transparent bg-clip-text border border-[#2098ee] "
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <button disabled type="button">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              "Submit"
            )}
          </button>
        )}
      </div>

      <div className="block md:hidden flex justify-between mt-4 ">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-[#2098ee] shadow-xl text-white border border-[#2098ee] rounded-full "
            onClick={handlePrevMobaile}
          >
            <div className="">Previous</div>
          </button>
        )}

        <div className="flex-grow"></div>
        {currentStep < totalSteps ? (
          <button
            type="button"
            className={`inline-block rounded-full p-[2px] bg-gradient-to-r from-blue-800 to-[#2098ee] px-8 py-2 rounded-full shadow-xl text-[18px]   ${
              isNextEnabled
                ? "border-2 bg-gradient-to-r from-blue-800 to-[#2098ee] border-[#2098ee] text-white font-bold"
                : "font-bold  bg-gradient-to-r from-blue-800 to-[#2098ee] text-transparent bg-clip-text border border-[#2098ee] "
            }`}
            onClick={handleNextMobaile}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className={`px-4 py-2 shadow-xl text-white rounded-full   ${
              isNextEnabled
                ? " bg-gradient-to-r from-blue-800 to-[#2098ee] font-bold"
                : "font-bold  bg-gradient-to-r from-blue-800 to-[#2098ee] text-transparent bg-clip-text border border-[#2098ee] "
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <button disabled type="button">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              "Submit"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
