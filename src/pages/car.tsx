// pages/cars.tsx
"use client";
import React from "react";

interface CarsPageProps {
  makes: string[];
  carsByMake: Record<string, any>;
}

const CarsPage: React.FC<CarsPageProps> = ({ makes, carsByMake }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Car Makes</h1>
      <ul className="list-disc pl-6 space-y-2">
        {makes.map((make, index) => (
          <li key={index}>
            {make} - {carsByMake[make]?.length || 0} models
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const loc = require("list-of-cars");

  loc.getListSync(); // Decompress the dataset
  const makes = loc.getCarMakes();
  const carsByMake = loc.getCarsByMakeObj();

  return {
    props: {
      makes,
      carsByMake,
    },
  };
}

export default CarsPage;
