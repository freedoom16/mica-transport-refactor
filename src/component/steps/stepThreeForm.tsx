"uses client";
import React, { useState } from "react";

interface StepThreeProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  //   isStep3Valid: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const StepThreeComponent: React.FC<StepThreeProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  //   isStep3Valid,
  isLoading,
  isSuccess,
  isError,
}) => {
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, ""); // Remove all non-digit characters
    const phoneFormat = /^\(\d{3}\) \d{3}-\d{4}$/; // RegEx to match (xxx) xxx-xxxx format

    if (phoneDigits.length !== 10) {
      setPhoneError("Phone number must be 10 digits.");
      return false;
    }

    if (!phoneFormat.test(phone)) {
      setPhoneError(
        "Phone number format is incorrect. Please use (xxx) xxx-xxxx."
      );
      return false;
    }

    setPhoneError(null); // No errors
    return true;
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

    setPhone(value);
    validatePhone(value);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Contact Info</h2>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="first_name"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          First Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="last_name"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Last Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Email Address
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          // onChange={(e) => setPhone(e.target.value)}
          onChange={handlePhoneChange}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Phone Number
        </label>
        {phoneError && <div className="mt-2 text-red-500">{phoneError}</div>}
      </div>

      {/* <button
        type="submit"
        disabled={!isStep3Valid}
        className={`w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isStep3Valid
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button> */}

      {isSuccess && (
        <div className="mt-4 text-green-500">Quote added successfully!</div>
      )}
      {isError && <div className="mt-4 text-red-500">Error occurred!</div>}
    </div>
  );
};

export default StepThreeComponent;
