// pages/index.tsx
"use client";
import React, { useState } from "react";
import StepOne from "./test";

const Main = () => {
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{
    pickupDate?: string;
    deliveryDate?: string;
  }>({});

  const handleNextClick = () => {
    const validationErrors: { pickupDate?: string; deliveryDate?: string } = {};

    if (!pickupDate) {
      validationErrors.pickupDate = "Pickup date is required.";
    }

    if (!deliveryDate) {
      validationErrors.deliveryDate = "Delivery date is required.";
    } else if (pickupDate && deliveryDate < pickupDate) {
      validationErrors.deliveryDate =
        "Delivery date cannot be earlier than pickup date.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Proceed to the next step");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Step One</h1>
      <StepOne
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        deliveryDate={deliveryDate}
        setDeliveryDate={setDeliveryDate}
        errors={errors}
        setErrors={setErrors}
      />
      <button
        onClick={handleNextClick}
        className="mt-4 w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Next
      </button>
    </div>
  );
};

export default Main;
