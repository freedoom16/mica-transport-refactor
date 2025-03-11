import React, { useState, useEffect } from "react";

interface StepTwoProps {
  vehicleYear: string;
  setVehicleYear: (value: string) => void;
  vehicleModel: string;
  setVehicleModel: (value: string) => void;
  vehicleType: string;
  setVehicleType: (value: string) => void;
}

const StepTwoComponent: React.FC<StepTwoProps> = ({
  vehicleYear,
  setVehicleYear,
  vehicleModel,
  setVehicleModel,
  vehicleType,
  setVehicleType,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?year=${query}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "80471b82f0msh3d171e0e1eab061p151a64jsn399989732cbc",
        "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: Array<{ model: string }> = await response.json();
      console.log(result);

      // Extract unique models from the API response
      const models = Array.from(new Set(result.map((car) => car.model)));
      setSuggestions(models);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Clear suggestions if an error occurs
    }
  };

  // Fetch suggestions when the user types in the model input
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSuggestions(vehicleModel);
    }, 300); // Add debounce to limit API calls

    return () => clearTimeout(debounce);
  }, [vehicleModel]);

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
          list="model-suggestions"
          required
        />
        <datalist id="model-suggestions">
          {suggestions.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </datalist>
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
    </div>
  );
};

export default StepTwoComponent;
