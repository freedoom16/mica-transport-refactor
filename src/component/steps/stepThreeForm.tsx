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
  isDealer: boolean | null;
  setIsDealer: (value: boolean | null) => void;
  dealerCompanName: string;
  setDealerCompanName: (value: string) => void;
  isClientNote: boolean | null;
  setIsClientNote: (value: boolean | null) => void;
  note: string;
  setNote: (value: string) => void;
  //   isStep3Valid: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  setErrorsContact: React.Dispatch<React.SetStateAction<any>>;
  errorsContact: any;
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
  isDealer,
  setIsDealer,
  dealerCompanName,
  setDealerCompanName,
  isClientNote,
  setIsClientNote,
  note,
  setNote,

  //   isStep3Valid,
  isLoading,
  isSuccess,
  isError,
  error,
  setErrorsContact,
  errorsContact,
}) => {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState("");

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errorsContact };

    switch (field) {
      case "firstName":
        newErrors.firstName = value ? "" : "First name is required";
        break;
      case "lastName":
        newErrors.lastName = value ? "" : "Last name is required";
        break;
      case "email":
        if (
          value &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          newErrors.email = "Please enter a valid email address.";
        } else {
          newErrors.email = ""; // Clear error if the email is valid or empty
        }
        break;
      case "phone":
        const phoneDigits = value.replace(/\D/g, ""); // Remove non-digit characters
        const phoneFormat = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (phoneDigits.length !== 10) {
          newErrors.phone = "Phone number must be 10 digits.";
        } else if (!phoneFormat.test(value)) {
          newErrors.phone =
            "Phone number format is incorrect. Please use (xxx) xxx-xxxx.";
        } else {
          newErrors.phone = "";
        }
        break;
      default:
        break;
    }

    setErrorsContact(newErrors);
  };

  const handleRadioChange = (value: any) => {
    setIsDealer(value === true);
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
    validateField("phone", value); // Validate phone after change
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center text-white mb-4">
        Contact Information
      </h2>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="first_name"
          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]   text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateField("firstName", e.target.value);
          }}
          className="w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c]  border border-[#938f99] outline-none transition-all focus:border-[#2098ee] focus:ring-1 focus:ring-[#6DB8D1]"
          placeholder=" First Name"
        />
        {/* {errorsContact.firstName && (
          <p className="text-sm text-red-500 ml-1 px-4 ">
            {errorsContact.firstName}
          </p>
        )} */}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="last_name"
          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]   text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          Last Name
        </label>

        <input
          type="text"
          name="last_name"
          id="last_name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateField("lastName", e.target.value);
          }}
          className="w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c]  border border-[#938f99] outline-none transition-all focus:border-[#2098ee] focus:ring-1 focus:ring-[#6DB8D1]"
          placeholder=" Last Name"
        />
        {/* {errorsContact.lastName && (
          <p className="text-sm text-red-500 ml-1 px-4 ">
            {errorsContact.lastName}
          </p>
        )} */}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="email"
          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]   text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          Email Address
        </label>

        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField("email", e.target.value);
          }}
          className="w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c]  border border-[#938f99] outline-none transition-all focus:border-[#2098ee] focus:ring-1 focus:ring-[#6DB8D1]"
          placeholder=" Email Address"
        />
        {errorsContact.email && (
          <p className="text-sm text-red-500 ml-1 px-4 ">
            {errorsContact.email}
          </p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="phone"
          className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]   text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          // onChange={(e) => setPhone(e.target.value)}
          onChange={handlePhoneChange}
          className="w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c]  border border-[#938f99] outline-none transition-all focus:border-[#2098ee] focus:ring-1 focus:ring-[#6DB8D1]"
          placeholder=" Phone Number"
        />
        {phoneError && <div className="mt-2 text-red-500">{phoneError}</div>}
        {/* {errorsContact.phone && (
          <p className="text-sm text-red-500 ml-1 px-4 ">
            {errorsContact.phone}
          </p>
        )} */}
      </div>

      <div>
        <div className="relative z-0 w-full mb-5 group flex flex-row  justify-between">
          <label className="block text-sm font-medium text-white mr-2">
            Are you a dealer or business?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="is_drivable"
                value="true"
                onChange={() => handleRadioChange(true)}
                className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
              />
              <span className="text-sm text-white">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="is_drivable"
                value="false"
                onChange={() => {
                  handleRadioChange(false);
                  setDealerCompanName("");
                }}
                className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
              />
              <span className="text-sm text-white">No</span>
            </label>
          </div>
        </div>

        {/* Conditional Company Name Input */}
        {isDealer && (
          <div className="relative z-0 w-full mb-5 group">
            <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]   text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
              {" "}
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter your company name"
              value={dealerCompanName}
              onChange={(e) => setDealerCompanName(e.target.value)}
              className="w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c]  border border-[#938f99] outline-none transition-all focus:border-[#2098ee]"
            />
          </div>
        )}
      </div>
      <div>
        <div className="relative z-0 w-full mb-5 group flex flex-row justify-between">
          <label className="block text-sm font-medium text-white mr-2">
            Do you have any note? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="is_clientNote"
                value="true"
                onChange={() => setIsClientNote(true)}
                className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
              />
              <span className="text-sm text-white">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="is_clientNote"
                value="false"
                onChange={() => {
                  setIsClientNote(false);
                  setNote("");
                }}
                className="form-radio text-blue-500 w-6 h-6 border-2 border-gray-300 "
              />
              <span className="text-sm text-white">No</span>
            </label>
          </div>
        </div>

        {/* Conditional Company Name Input */}
        {isClientNote && (
          <div className="relative z-0 w-full mb-5 group">
            <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c]  text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
              Any Note
            </label>
            <textarea
              placeholder="Enter your note (max 50 words)"
              value={note}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/);
                if (words.length <= 50) {
                  setNote(e.target.value);
                  setErrorField(""); // Clear error if within limit
                } else {
                  setErrorField("Maximum limit of 50 words reached.");
                }
              }}
              className="w-full h-32 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c]  border border-[#938f99] outline-none transition-all focus:border-[#2098ee]"
            />
            {errorField && (
              <p className="text-red-500 text-sm mt-1">{errorField}</p>
            )}
          </div>
        )}
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
      {isError && <div className="mt-4 text-red-500">Error occurred! </div>}
    </div>
  );
};

export default StepThreeComponent;
