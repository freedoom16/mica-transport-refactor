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

  const [isOpenOption, setIsOpenOption] = useState(false);
  const [companyType, setCompanyType] = useState<string | null>("");

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
    // validateField("phone", value); // Validate phone after change
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-gray-900 text-center text-lg mb-4">
          Partnership Form
        </h2>

        {/* Company Name Input */}

        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            placeholder="Company Name"
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1]"
          />
        </div>

        {/* Name Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1]"
          />
        </div>

        {/* Email Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1]"
          />
        </div>

        {/* Position Input */}
        <div className="relative w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            phone Number
          </label>
          <input
            type="phone"
            value={position}
            placeholder="Phone number"
            onChange={(e) => {
              handlePhoneChange(e);
              setPosition(e.target.value);
            }}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1]"
          />
        </div>

        <div className="relative mb-4">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Company Type
          </label>

          <div
            onClick={toggleDropdown}
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 mt-1 rounded-xl bg-white border-1 ${
              isOpenOption ? "border-red-500" : "border-[#938f99]"
            }`}
          >
            {companyType ? companyType : "--- Select Company Type ---"}
          </div>

          {isOpenOption && (
            <div className="absolute top-full text-gray-900 left-0 w-full bg-white border border-[#938f99] rounded-xl shadow-lg z-10 mt-2">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCompanyTypeChange(option.value)}
                  className="flex items-center p-3 hover:bg-[#6DB8D1] cursor-pointer"
                >
                  {option.value}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-white text-gray-900 border border-gray-900 px-4 py-2 rounded-full mr-2"
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

export default PartnershipModal;
