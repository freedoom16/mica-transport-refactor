"use client";
import React, { useState } from "react";
import { useAddQuoetsMutation } from "../../src/store/Api/quotesApi";
import StepOne from "./steps/stepOneForm";
import StepNavigation from "./steps/stepNavigation";
import StepTwoComponent from "./steps/stepTwoForm";
import StepThreeComponent from "./steps/stepThreeForm";

const QouetForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const totalSteps = 3; // Total number of steps

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Step 1 fields
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [addressTypeForPickup, setAddressTypeForPickup] = useState("");
  const [addressTypeForDeliver, setAddressTypeForDeliver] = useState("");
  const [isDerivable, setIsDrivable] = useState<boolean | null>(null);
  const [isPickupContact, setIsPickupContact] = useState<string>(""); // "true" or "false"
  const [isDropoffContact, setIsDropoffContact] = useState<string>(""); // "true" or "false"

  const [pickupContactName, setPickupContactName] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");
  const [dropoffContactName, setDropoffContactName] = useState("");
  const [dropoffContactPhone, setDropoffContactPhone] = useState("");

  // Step 2 fields
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  // Step 3 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Validation logic for each step
  const isStep1Valid =
    pickupLocation &&
    deliveryLocation &&
    addressTypeForDeliver &&
    addressTypeForPickup &&
    isDerivable;
  const isStep2Valid = vehicleYear && vehicleModel && vehicleType;
  const isStep3Valid = firstName && lastName && email && phone;

  // Use the mutation hook
  const [addQuote, { isLoading, isSuccess, isError, error }] =
    useAddQuoetsMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const quoteData = {
      pickup: pickupLocation,
      delivery: deliveryLocation,
      addressTypeForDeliver: addressTypeForDeliver,
      addressTypeForPickup: addressTypeForPickup,
      firstName: firstName,
      isDerivable: isDerivable,
      email: email,
      phoneNumber: phone,
      vehicleYear: parseInt(vehicleYear),
      vehicleMake: vehicleModel, // Assuming the vehicle model is being sent as "make"
      vehicleModel: vehicleModel,
      transportType: vehicleType,
      status: "pending", // Assuming 'pending' is a default status
    };

    try {
      await addQuote(quoteData).unwrap(); // Submit the form data using the mutation hook

      // Reset the form or navigate to a confirmation page on success
      setStep(1); // Optional: Reset form after submission
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section id="quote">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto  bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* Step 1: Pickup, Delivery, and Shipment Date */}
        {step === 1 && (
          <StepOne
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            deliveryLocation={deliveryLocation}
            setDeliveryLocation={setDeliveryLocation}
            addressTypeForPickup={addressTypeForPickup}
            setAddressTypeForPickup={setAddressTypeForPickup}
            addressTypeForDeliver={addressTypeForDeliver}
            setAddressTypeForDeliver={setAddressTypeForDeliver}
            isDerivable={isDerivable}
            setIsDerivable={setIsDrivable}
            isPickupContact={isPickupContact}
            setIsPickupContact={setIsPickupContact}
            pickupContactName={pickupContactName}
            setPickupContactName={setPickupContactName}
            pickupContactPhone={pickupContactPhone}
            setPickupContactPhone={setPickupContactPhone}
            isDropoffContact={isDropoffContact}
            setIsDropoffContact={setIsDropoffContact}
            dropoffContactName={dropoffContactName}
            setDropoffContactName={setDropoffContactName}
            dropoffContactPhone={dropoffContactPhone}
            setDropoffContactPhone={setDropoffContactPhone}
          />
        )}

        {/* Step 2: Vehicle Info */}
        {step === 2 && (
          <StepTwoComponent
            vehicleYear={vehicleYear}
            setVehicleYear={setVehicleYear}
            vehicleModel={vehicleModel}
            setVehicleModel={setVehicleModel}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            // isStep2Valid={isStep2Valid}
            // nextStep={nextStep}
            // prevStep={prevStep}
          />
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <StepThreeComponent
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            // isStep3Valid={isStep3Valid}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
          />
        )}

        <StepNavigation
          currentStep={step}
          totalSteps={totalSteps}
          onNext={nextStep}
          onPrev={prevStep}
          isNextEnabled={
            (step === 1 && isStep1Valid) ||
            (step === 2 && isStep2Valid) ||
            (step === 3 && isStep3Valid)
          }
        />
      </form>
    </section>
  );
};

export default QouetForm;
