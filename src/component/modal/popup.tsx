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
        {/* <button
          className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 rounded-lg p-2 dark:hover:bg-gray-600"
          onClick={onClose}
        >
          ✖
        </button> */}

        {/* Modal Content */}
        <div className="p-4 text-center">
          <h3 className="mb-5 text-xl text-black font-bold ">{message}</h3>

          {/* Buttons */}
          <button
            className="text-white bg-gradient-to-r from-blue-800 to-[#2098ee] rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium text-sm px-6 py-2.5"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="py-2.5 px-6 ms-3 text-sm font-medium  bg-gradient-to-r from-blue-800 to-[#2098ee]  text-white rounded-full  border border-[#6DB8D1] focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
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
