import React from "react";

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
          onChange={(e) => setPhone(e.target.value)}
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
