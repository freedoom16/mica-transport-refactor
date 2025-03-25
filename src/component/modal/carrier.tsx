"use client";
import { useState } from "react";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CareerModal: React.FC<CareerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-lg w-96 "
        style={{ boxShadow: "0 -5px 500px -15px rgba(0, 0, 0, 0.1)" }}
      >
        <h2 className="text-black text-center text-lg mb-4">Career Form</h2>

        {/* Name Input */}
        <div className="relative z-5 w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${"border-[#938f99]"} outline-none transition-all focus:border-[#6DB8D1]`}
          />
        </div>

        {/* Email Input */}
        <div className="relative z-5 w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${"border-[#938f99]"} outline-none transition-all focus:border-[#6DB8D1]`}
          />
        </div>

        {/* Position Input */}
        <div className="relative z-5 w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Position Looking For
          </label>

          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder=""
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${"border-[#938f99]"} outline-none transition-all focus:border-[#6DB8D1]`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-white text-gray-900 border-1 border-gray-900 px-4 py-2 rounded-full mr-2"
          >
            Close
          </button>
          <button className="bg-white text-[#6DB8D1] border-2 border-[#6DB8D1] px-4 py-2 rounded-full">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
