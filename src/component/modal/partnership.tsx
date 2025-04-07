import { useState } from "react";

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnershipModal: React.FC<PartnershipModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [companyType, setCompanyType] = useState<string | null>("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    companyName?: string;
    email?: string;
    position?: string;
    companyType?: string;
  }>({});
  const [isOpenOption, setIsOpenOption] = useState(false);

  const options = [
    { value: "Carrier" },
    { value: "Broker" },
    { value: "Dealership" },
    { value: "Auction House" },
    { value: "individual" },
  ];

  const toggleDropdown = () => {
    setIsOpenOption((prev) => !prev);
  };

  const handleCompanyTypeChange = (value: string) => {
    setCompanyType(value);
    setIsOpenOption(false);
    validateField("companyType", value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove non-digit characters
    value = value.replace(/\D/g, "");

    // Format phone number as (xxx) xxx-xxxx
    if (value.length <= 3) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    }

    const phoneDigits = value.replace(/\D/g, ""); // Remove non-digit characters
    const phoneFormat = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (phoneDigits.length !== 10) {
      setPhoneError("Phone number must be 10 digits.");
    } else if (!phoneFormat.test(value)) {
      setPhoneError(
        "Phone number format is incorrect. Please use (xxx) xxx-xxxx."
      );
    } else {
      setPhoneError("");
    }
    setPosition(value);
    validateField("position", value);
  };

  const validateField = (field: string, value: string) => {
    let newErrors = { ...errors };

    switch (field) {
      case "name":
        newErrors.name = value ? "" : "Name is required.";
        break;
      case "companyName":
        newErrors.companyName = value ? "" : "Company Name is required.";
        break;
      case "email":
        newErrors.email = value
          ? /\S+@\S+\.\S+/.test(value)
            ? ""
            : "Please enter a valid email address."
          : "Email is required.";
        break;
      case "position":
        if (phoneError) {
          newErrors.position = phoneError;
        } else {
          newErrors.position = value ? "" : "Phone number is required.";
        }
        break;
      case "companyType":
        newErrors.companyType = value ? "" : "Company type is required.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const newErrors: {
      name?: string;
      companyName?: string;
      email?: string;
      position?: string;
      companyType?: string;
    } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!companyName) newErrors.companyName = "Company Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!position) newErrors.position = "Phone number is required.";
    else if (phoneError) newErrors.position = phoneError;
    if (!companyType) newErrors.companyType = "Company type is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setName("");
    setCompanyName("");
    setEmail("");
    setPosition("");
    setPhoneError("");
    setCompanyType(null);
    setErrors({});
    // Submit form if no validation errors
    setMessage("Successfully Submitted the form ");
    // Perform the submit action here...
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-[#2D2D2D] p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-white text-center text-lg mb-4">
          Partnership Form
        </h2>

        <div className="text-green-600 mb-6">{message}</div>

        {/* Company Name Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            placeholder="Company Name"
            onChange={(e) => {
              setCompanyName(e.target.value);
              validateField("companyName", e.target.value);
            }}
            className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2D2D2D] border outline-none transition-all focus:border-[#6DB8D1] ${
              errors.companyName ? "border-red-500" : "border-[#938f99]"
            }`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>

        {/* Name Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            placeholder="Full Name"
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

        {/* Phone Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Phone Number
          </label>
          <input
            type="text"
            value={position}
            placeholder="Phone number"
            onChange={(e) => {
              handlePhoneChange(e);
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

        {/* Company Type Dropdown */}
        <div className="relative mb-4">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2D2D2D] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Company Type
          </label>

          <div
            onClick={toggleDropdown}
            className={`w-full h-14 px-3 py-2 text-sm text-white mt-1 rounded-xl bg-[#2D2D2D] border-1 ${
              errors.companyType ? "border-red-500" : "border-[#938f99]"
            }`}
          >
            {companyType ? companyType : "--- Select Company Type ---"}
          </div>

          {isOpenOption && (
            <div className="absolute top-full text-white left-0 w-full bg-[#2D2D2D] border border-[#938f99] rounded-xl shadow-lg z-10 mt-2">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    handleCompanyTypeChange(option.value);
                    validateField("companyType", option.value);
                  }}
                  className="flex items-center p-3 hover:bg-[#6DB8D1] cursor-pointer"
                >
                  {option.value}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#2D2D2D] text-white border border-gray-900 px-4 py-2 rounded-full mr-2"
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

export default PartnershipModal;
