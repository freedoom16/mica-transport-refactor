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
  const [message, setMessage] = useState(""); // For displaying submission messages
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    position?: string;
  }>({});

  // Validate each field
  const validateField = (field: string, value: string) => {
    let newErrors = { ...errors };

    switch (field) {
      case "name":
        newErrors.name = value ? "" : "Name is required.";
        break;
      case "email":
        newErrors.email =
          value && /\S+@\S+\.\S+/.test(value)
            ? ""
            : value
            ? "Please enter a valid email address."
            : "Email is required.";
        break;
      case "position":
        newErrors.position = value ? "" : "Position is required.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = () => {
    const newErrors: { name?: string; email?: string; position?: string } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!position) newErrors.position = "Position is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage(""); // Reset message if there are errors
      return; // Prevent form submission if there are validation errors
    }

    // Form submission success
    setMessage("Form submitted successfully!");
    // Reset form after submission
    setName("");
    setEmail("");
    setPosition("");
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-[#2D2D2D] p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-white text-center text-lg mb-4">Career Form</h2>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 text-center ${
              message === "Form submitted successfully!"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Name Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2D2D2D] border outline-none transition-all focus:border-[#6DB8D1] ${
              errors.name ? "border-red-500" : "border-[#938f99]"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2D2D2D] border outline-none transition-all focus:border-[#6DB8D1] ${
              errors.email ? "border-red-500" : "border-[#938f99]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Position Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Position Looking For
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              validateField("position", e.target.value);
            }}
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2D2D2D] border outline-none transition-all focus:border-[#6DB8D1] ${
              errors.position ? "border-red-500" : "border-[#938f99]"
            }`}
          />
          {errors.position && (
            <p className="text-red-500 text-xs mt-1">{errors.position}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#2D2D2D] text-white border border-blue-500 px-4 py-2 rounded-full mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#2D2D2D] text-[#6DB8D1] border-2 border-[#6DB8D1] px-4 py-2 rounded-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
