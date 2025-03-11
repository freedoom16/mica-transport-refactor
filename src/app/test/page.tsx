"use client";
import { useState, useEffect } from "react";

const CarQuery = () => {
  const [makeSuggestions, setMakeSuggestions] = useState<string[]>([]);
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const loadCarQuery = () => {
      const script = document.createElement("script");
      script.src = "https://www.carqueryapi.com/js/carquery.0.3.4.js";
      console.log(script.src);
      script.async = true;
      script.onload = () => {
        const carquery: any = new (window as any).CarQuery();

        // Initialize CarQuery
        carquery.init();

        // Set filters for US models
        carquery.setFilters({ sold_in_us: true });

        // Optional: Set up dropdowns
        carquery.initYearMakeModelTrim(
          "car-years",
          "car-makes",
          "car-models",
          "car-model-trims"
        );

        // Set minimum and maximum years
        carquery.year_select_min = 1990;
        carquery.year_select_max = 2025;
      };

      document.body.appendChild(script);
    };

    loadCarQuery();

    return () => {
      const existingScript = document.querySelector(
        "script[src='https://www.carqueryapi.com/js/carquery.0.3.4.js']"
      );
      existingScript?.remove();
    };
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);

    // Fetch suggestions dynamically from CarQuery API
    if (query.length > 1) {
      const response = await fetch(
        `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&keyword=${query}`
      );
      const jsonpResponse = await response.text();

      // Parse JSONP response
      const jsonResponse = JSON.parse(
        jsonpResponse.replace(/^[^\{]*\{/, "{").replace(/\}[^}]*$/, "}")
      );

      if (jsonResponse.Makes) {
        setMakeSuggestions(
          jsonResponse.Makes.map((make: any) => make.make_display)
        );
      }
    } else {
      setMakeSuggestions([]);
    }
  };

  const handleMakeSelect = (make: string) => {
    setInputValue(make);
    setMakeSuggestions([]);
    // Optionally fetch models for the selected make
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        CarQuery API Example with Suggest
      </h1>

      <div>
        <label htmlFor="car-makes" className="block text-sm font-medium">
          Make
        </label>
        <input
          type="text"
          id="car-makes"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Start typing a car make..."
        />
        {makeSuggestions.length > 0 && (
          <ul className="border rounded mt-1 bg-white">
            {makeSuggestions.map((make, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleMakeSelect(make)}
              >
                {make}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label htmlFor="car-models" className="block text-sm font-medium mt-4">
          Model
        </label>
        <select
          id="car-models"
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Select Model</option>
          {modelSuggestions.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* Button to display data */}
      <input
        id="cq-show-data"
        type="button"
        value="Show Data"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
      />

      {/* Display selected car data */}
      <div id="car-model-data" className="mt-4 border p-4 rounded bg-gray-100">
        <p>Select a car to see its details here.</p>
      </div>
    </div>
  );
};

export default CarQuery;
