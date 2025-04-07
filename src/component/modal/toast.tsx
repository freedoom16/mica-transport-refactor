import React, { useEffect, useState } from "react";

interface ToastNotificationProps {
  isSuccess: boolean;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ isSuccess }) => {
  const [visible, setVisible] = useState(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Refresh the page after the message is hidden
        window.location.reload(); // This will refresh the page
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-auto w-auto z-50 p-4 text-gray-500 bg-white divide-y divide-gray-200 rounded-lg shadow-lg"
      role="alert"
    >
      <button
        type="button"
        className="self-end text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100"
        aria-label="Close"
        onClick={() => setVisible(false)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-4 h-4"
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
      <div className="text-center font-semibold w-full p-4">
        Thank You! We will contact you.
      </div>
      <div className="flex items-center space-x-3 mt-6 p-2 md:p-4">
        <div className="w-8 h-8 text-[#2098ee] bg-blue-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        </div>
        <div className="font-medium">Quote submitted successfully!</div>
      </div>
    </div>
  );
};

export default ToastNotification;
