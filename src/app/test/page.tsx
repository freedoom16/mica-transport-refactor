"use client";
import React, { useEffect, useState } from "react";

interface Car {
  Year: number;
  Make: string;
  Model: string;
  Category: string;
}

const CarsPage: React.FC = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [carsByMake, setCarsByMake] = useState<Record<string, Car[]>>({});
  const [makerInput, setMakerInput] = useState<string>("");
  const [filteredMakers, setFilteredMakers] = useState<string[]>([]);
  const [selectedMaker, setSelectedMaker] = useState<string | null>(null);
  const [modelInput, setModelInput] = useState<string>("");
  const [filteredModels, setFilteredModels] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setMakes(data.makes);
        setCarsByMake(data.carsByMake);
      });
  }, []);
  // console.log("mmmmmmmmmmmmmmodel ");
  // console.log(carsByMake);
  // console.log(carsByMake["Cadillac"]);
  // console.log("mmmmmmmmmmmmmmaker ");
  // console.log(makes);
  console.log(modelInput);

  useEffect(() => {
    // Suggest makers based on input
    if (makerInput) {
      setFilteredMakers(
        makes
          .filter((make) =>
            make.toLowerCase().startsWith(makerInput.toLowerCase())
          )
          .slice(0, 5)
      );
    } else {
      setFilteredMakers([]);
    }
  }, [makerInput, makes]);

  useEffect(() => {
    // When the maker is selected, reset the model input and filter models by selected maker
    if (selectedMaker) {
      setModelInput(""); // Clear model input when the maker changes
      setFilteredModels([]);
    }
  }, [selectedMaker]);

  // useEffect(() => {
  //   // Suggest models based on selected maker and input
  //   if (selectedMaker && modelInput) {
  //     setFilteredModels(
  //       (carsByMake[selectedMaker] || [])
  //         .filter((model) =>
  //           model.toLowerCase().startsWith(modelInput.toLowerCase())
  //         )
  //         .slice(0, 5)
  //     );
  //   } else {
  //     setFilteredModels([]);
  //   }
  // }, [modelInput, selectedMaker, carsByMake]);

  useEffect(() => {
    // Suggest models based on selected maker and input
    if (selectedMaker && modelInput) {
      const filterdMakers: any = carsByMake[selectedMaker];

      // const filterdModels = filterdMakers
      //   .filter(
      //     (model: any) =>
      //       typeof model === "string" && model.toLowerCase().startsWith("St")
      //   )
      //   // .filter(car => car.Model.startsWith(letterFilter));
      //   .slice(0, 5);

      const filteredModels = filteredMakers
        .filter(
          (car: any) =>
            typeof car === "object" &&
            car !== null && // Ensure it's an object
            "Model" in car && // Ensure 'Model' exists in the object
            car.Model.toLowerCase().startsWith(modelInput.toLowerCase()) // Filter by model input
        )
        // .map((car) => car.Model) // Extract the 'Model' from each car object
        .slice(0, 5); // Limit to 5 results

      setFilteredModels(filteredModels);
      // setFilteredModels(
      //   (carsByMake[selectedMaker] || [])
      //     .filter(
      //       (model) =>
      //         typeof model === "string" &&
      //         model.toLowerCase().startsWith(modelInput.toLowerCase())
      //     )
      //     .map((car: any) => car.model)
      //     // .map((car: any) => (typeof car === "string" ? car : car.model))
      //     .slice(0, 5)
      // );
    } else {
      console.log("else");
      setFilteredModels([]);
    }
    console.log("filttttttttttttttterd model");
    console.log(filteredModels);
    selectedMaker && console.log("mmmmmmmmmmmm", carsByMake[selectedMaker]);
  }, [modelInput]);

  const handleMakerSelect = (make: string) => {
    setMakerInput(make);
    setSelectedMaker(make);
    setFilteredMakers([]);
    setModelInput("");
    setFilteredModels([]);
  };

  const handleModelSelect = (model: string) => {
    setModelInput(model);
    setFilteredModels([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Car Makes and Models</h1>

      {/* Maker Input */}
      <div className="mb-6">
        <label htmlFor="maker" className="block text-sm font-medium mb-2">
          Maker:
        </label>
        <input
          type="text"
          id="maker"
          className="w-full p-2 border rounded-md"
          placeholder="Type to search car makers..."
          value={makerInput}
          onChange={(e) => setMakerInput(e.target.value)}
        />
        {filteredMakers.length > 0 && (
          <ul className="border mt-2 rounded-md shadow-lg bg-gray-900 max-h-40 overflow-auto">
            {filteredMakers.map((make, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleMakerSelect(make)}
              >
                {make}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Model Input */}
      <div className="mb-6">
        <label htmlFor="model" className="block text-sm font-medium mb-2">
          Model:
        </label>
        <input
          type="text"
          id="model"
          className="w-full p-2 border rounded-md"
          placeholder={
            selectedMaker
              ? "Type to search car models..."
              : "Select a maker first"
          }
          value={modelInput}
          onChange={(e) => setModelInput(e.target.value)}
          disabled={!selectedMaker}
        />
        {filteredModels.length > 0 && (
          <ul className="border mt-2 rounded-md shadow-lg bg-gray-900 max-h-40 overflow-auto">
            {filteredModels.map((model, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleModelSelect(model)}
              >
                {model}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
