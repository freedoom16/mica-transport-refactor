// components/StepOne.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface StepOneProps {
  pickupDate: Date | null;
  setPickupDate: (value: Date | null) => void;
  deliveryDate: Date | null;
  setDeliveryDate: (value: Date | null) => void;
  errors: { pickupDate?: string; deliveryDate?: string };
  setErrors: (errors: { pickupDate?: string; deliveryDate?: string }) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  pickupDate,
  setPickupDate,
  deliveryDate,
  setDeliveryDate,
  errors,
  setErrors,
}) => {
  const validateFields = (
    field: "pickupDate" | "deliveryDate",
    value: Date | null
  ) => {
    const newErrors = { ...errors };

    if (field === "pickupDate") {
      if (!value) {
        newErrors.pickupDate = "Pickup date is required.";
      } else {
        delete newErrors.pickupDate;
      }
      // Ensure deliveryDate is validated relative to the new pickupDate
      if (deliveryDate && value && deliveryDate < value) {
        newErrors.deliveryDate =
          "Delivery date cannot be earlier than pickup date.";
      } else {
        delete newErrors.deliveryDate;
      }
    }

    if (field === "deliveryDate") {
      if (!value) {
        newErrors.deliveryDate = "Delivery date is required.";
      } else if (pickupDate && value < pickupDate) {
        newErrors.deliveryDate =
          "Delivery date cannot be earlier than pickup date.";
      } else {
        delete newErrors.deliveryDate;
      }
    }

    setErrors(newErrors);
  };

  const handlePickupDateChange = (date: Date | null) => {
    setPickupDate(date); // Update state first
    validateFields("pickupDate", date); // Then validate
  };

  const handleDeliveryDateChange = (date: Date | null) => {
    setDeliveryDate(date); // Update state first
    validateFields("deliveryDate", date); // Then validate
  };

  return (
    <div className="p-4">
      {/* Pickup Date */}
      <div className="w-full">
        <div className="mb-4 relative top-0 mt-4">
          <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Pickup Date
          </label>
          <DatePicker
            selected={pickupDate}
            onChange={handlePickupDateChange}
            minDate={new Date()}
            placeholderText="Select Pickup Date"
            withPortal={true}
            className="w-full h-14 z-50 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          />
          {errors.pickupDate && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>
          )}
        </div>
      </div>

      {/* Delivery Date */}
      <div className="w-full">
        <div className="mb-4 relative top-0 mt-4">
          <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Delivery Date
          </label>
          <DatePicker
            selected={deliveryDate}
            onChange={handleDeliveryDateChange}
            minDate={pickupDate || new Date()}
            placeholderText="Select Delivery Date"
            withPortal={true}
            className="w-full h-14 z-50 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          />
          {errors.deliveryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.deliveryDate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
