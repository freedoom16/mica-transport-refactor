import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        {/* Close Button */}
        {/* <button
          className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 rounded-lg p-2 dark:hover:bg-gray-600"
          onClick={onClose}
        >
          ✖
        </button> */}

        {/* Modal Content */}
        <div className="p-4 text-center">
          {/* <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg> */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 ">{message}</h3>

          {/* Buttons */}
          <button
            className="text-white bg-[#2098ee]  rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium text-sm px-5 py-2.5"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="py-2.5 px-5 ms-3 text-sm font-medium  bg-[#2098ee]  text-white rounded-full  border border-[#6DB8D1] focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
