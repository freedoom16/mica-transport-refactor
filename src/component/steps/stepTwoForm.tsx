import React from "react";

interface StepTwoProps {
  vehicleYear: string;
  setVehicleYear: (value: string) => void;
  vehicleModel: string;
  setVehicleModel: (value: string) => void;
  vehicleType: string;
  setVehicleType: (value: string) => void;
  //   isStep2Valid: boolean;
  //   nextStep: () => void;
  //   prevStep: () => void;
}

const StepTwoComponent: React.FC<StepTwoProps> = ({
  vehicleYear,
  setVehicleYear,
  vehicleModel,
  setVehicleModel,
  vehicleType,
  setVehicleType,
  //   isStep2Valid,
  //   nextStep,
  //   prevStep,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="vehicle_year"
          id="vehicle_year"
          value={vehicleYear}
          onChange={(e) => setVehicleYear(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="vehicle_year"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Year
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="vehicle_model"
          id="vehicle_model"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="vehicle_model"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Model
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          name="vehicle_type"
          id="vehicle_type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          required
        >
          <option value="">Select Vehicle Type</option>
          <option value="open" className="text-white">
            Open
          </option>
          <option value="closed" className="text-white">
            Closed
          </option>
        </select>
        <label
          htmlFor="vehicle_type"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 scale-80 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
        >
          Vehicle Type
        </label>
      </div>

      {/* <button
        type="button"
        onClick={nextStep}
        disabled={!isStep2Valid}
        className={`w-full px-4 py-2 mt-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isStep2Valid
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
      <button
        type="button"
        onClick={prevStep}
        className="w-full px-4 py-2 mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Back
      </button> */}
    </div>
  );
};

export default StepTwoComponent;
