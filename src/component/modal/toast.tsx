import React, { useEffect, useState } from "react";

interface ToastNotificationProps {
  isSuccess: boolean;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ isSuccess }) => {
  const [visible, setVisible] = useState(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (!visible) return null;

  return (
    <div
      id="toast-top-right"
      className="fixed flex items-center justify-center h-[200px] w-full z-50 max-w-xs mt-16 mr-12 p-4 flex-col space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 "
      role="alert"
    >
      <button
        type="button"
        className="ms-auto -mx-1.5 font-bold -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
        aria-label="Close"
        onClick={() => setVisible(false)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
      Quote Submited successfully
      <div
        id="toast-success"
        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500  rounded-lg   "
        role="alert"
      >
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3  font-normal">Thank You. We will contact you!</div>
      </div>
    </div>
  );
};

export default ToastNotification;
