"use client";
import React, { useState } from "react";
import { useAddQuoetsMutation } from "../../src/store/Api/quotesApi";
import StepOne from "./steps/stepOneForm";
import StepNavigation from "./steps/stepNavigation";
import StepTwoComponent from "./steps/stepTwoForm";
import StepThreeComponent from "./steps/stepThreeForm";
import StepForDate from "./steps/stepDateForm";
import StepTwoComponentTest from "./steps/test2";
import TestTest from "./test";

interface Vehicle {
  vehicleYear: string;
  vehicleModel: string;
  vehicleMaker: string;
  filteredMakers: string[];
  filteredModels: string[];
}

const QouetForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(step > 1);
  const totalSteps = 4; // Total steps in the form

  const openModal = () => setIsModalOpen(step >= 2);
  const closeModal = () => setIsModalOpen(false);

  // const nextStep = () => {
  //   if (step < totalSteps) setStep(step + 1);
  //   setIsModalOpen(true);
  // };

  const [errorMessage, setErrorMessage] = useState("");

  const nextStep = () => {
    console.log("nextStep cleicked", isStep2Valid);
    setErrorMessage(""); // Reset the error message

    if (step === 3 && !isStep1Valid) {
      setErrorMessage("All fields are required for Step 1.");
      return;
    }

    if (step === 1 && !isStep2Valid) {
      setErrorMessage("All fields are required for Step 2.");
      return;
    }

    if (step === 4 && !isStep3Valid) {
      setErrorMessage("All fields are required for Step 3.");
      return;
    }

    if (step === 2 && !isStep4Valid) {
      setErrorMessage("All fields are required for Step 4.");
      return;
    }

    // if (step < totalSteps) {
    //   setStep((prevStep) => prevStep + 1);
    // }
    if (step < totalSteps) setStep(step + 1);
    setIsModalOpen(true);
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
  const [vehicleMaker, setVehicleMaker] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[] | any>([
    // {
    //   vehicleYear: "",
    //   vehicleModel: "",
    //   vehicleMaker: "",
    //   filteredMakers: [],
    //   filteredModels: [],
    // },
  ]);
  const [vehicleType, setVehicleType] = useState("");

  // Step 3 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // step date fields
  // Pick Up Date and Time states
  const [pickUpDateOption, setPickUpDateOption] = useState<string>("");
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [pickUpDateRangeStart, setPickUpDateRangeStart] = useState<Date | null>(
    null
  );
  const [pickUpDateRangeEnd, setPickUpDateRangeEnd] = useState<Date | null>(
    null
  );
  const [pickUpTimeOption, setPickUpTimeOption] = useState<string>("");
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const [pickUpTimeRangeStart, setPickUpTimeRangeStart] = useState<string>("");
  const [pickUpTimeRangeEnd, setPickUpTimeRangeEnd] = useState<string>("");

  // Delivery Date and Time states
  const [deliveryDateOption, setDeliveryDateOption] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [deliveryDateRangeStart, setDeliveryDateRangeStart] =
    useState<Date | null>(null);
  const [deliveryDateRangeEnd, setDeliveryDateRangeEnd] = useState<Date | null>(
    null
  );
  const [deliveryTimeOption, setDeliveryTimeOption] = useState<string>("");
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [deliveryTimeRangeStart, setDeliveryTimeRangeStart] =
    useState<string>("");
  const [deliveryTimeRangeEnd, setDeliveryTimeRangeEnd] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState(true);

  console.log("main ", vehicles);
  console.log("main maker", vehicles[0]?.vehicleMaker);

  // Validation logic for each step
  const isStep1Valid = !!(
    pickupLocation &&
    deliveryLocation &&
    addressTypeForDeliver &&
    addressTypeForPickup
  );

  const isStep2Valid = true;
  // !!(
  //   vehicles[0]?.vehicleMaker && vehicles[0]?.vehicleModel
  // );

  console.log("vvvvvvvvvvvvv ", vehicles);
  const isStep3Valid = !!(firstName && lastName && email && phone);

  const isStep4Valid = !!(
    (pickUpDate || pickUpDateRangeStart || pickUpDateRangeEnd) &&
    (deliveryDate || deliveryDateRangeStart || deliveryDateRangeEnd) &&
    (pickUpTime || pickUpTimeRangeStart || pickUpTimeRangeEnd) &&
    (deliveryTime || deliveryTimeRangeEnd || deliveryTimeRangeStart)
  );

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
    <section
      id="quote"
      className=" bg-white rounded-[32px]"
      // style={{ boxShadow: "25px 25px 25px 25px rgba(0, 0, 0, 0.1)" }}
      style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div>
        {/* {isModalOpen && (
            <div className="fixed inset-0 bg-transparent bg-black bg-opacity-50  flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-lg p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">{`Step ${step}`}</h2> */}
        <p className="text-[20px] text-gray-900 font-bold hidden md:block  text-center">
          Shipping Quote Calculator
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto  bg-white p-4 md:p-6 rounded-[32px] "
          style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Progress Indicator */}
          <div className=" text-gray-900 text-end mb-6">
            <p className="text-lg font-bold">
              Step {step} of {totalSteps}
            </p>
          </div>
          {/* Step 1: Pickup, Delivery, and Shipment Date */}
          {step === 3 && (
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
          {step === 1 && (
            <StepTwoComponentTest
              vehicles={vehicles}
              setVehicles={setVehicles}
              // isStep2Valid={isStep2Valid}
              // nextStep={nextStep}
              // prevStep={prevStep}
            />
            // <TestTest />
          )}
          {/* Step 3: Contact Info */}
          {step === 4 && (
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
          {step === 2 && (
            <StepForDate
              // Pick Up Date and Time props
              pickUpDateOption={pickUpDateOption}
              setPickUpDateOption={setPickUpDateOption}
              pickUpDate={pickUpDate}
              setPickUpDate={setPickUpDate}
              pickUpDateRangeStart={pickUpDateRangeStart}
              setPickUpDateRangeStart={setPickUpDateRangeStart}
              pickUpDateRangeEnd={pickUpDateRangeEnd}
              setPickUpDateRangeEnd={setPickUpDateRangeEnd}
              pickUpTimeOption={pickUpTimeOption}
              setPickUpTimeOption={setPickUpTimeOption}
              pickUpTime={pickUpTime}
              setPickUpTime={setPickUpTime}
              pickUpTimeRangeStart={pickUpTimeRangeStart}
              setPickUpTimeRangeStart={setPickUpTimeRangeStart}
              pickUpTimeRangeEnd={pickUpTimeRangeEnd}
              setPickUpTimeRangeEnd={setPickUpTimeRangeEnd}
              // Delivery Date and Time props
              deliveryDateOption={deliveryDateOption}
              setDeliveryDateOption={setDeliveryDateOption}
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
              deliveryDateRangeStart={deliveryDateRangeStart}
              setDeliveryDateRangeStart={setDeliveryDateRangeStart}
              deliveryDateRangeEnd={deliveryDateRangeEnd}
              setDeliveryDateRangeEnd={setDeliveryDateRangeEnd}
              deliveryTimeOption={deliveryTimeOption}
              setDeliveryTimeOption={setDeliveryTimeOption}
              deliveryTime={deliveryTime}
              setDeliveryTime={setDeliveryTime}
              deliveryTimeRangeStart={deliveryTimeRangeStart}
              setDeliveryTimeRangeStart={setDeliveryTimeRangeStart}
              deliveryTimeRangeEnd={deliveryTimeRangeEnd}
              setDeliveryTimeRangeEnd={setDeliveryTimeRangeEnd}
            />
            // </div>
          )}{" "}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {errorMessage}
            </p>
          )}
          <StepNavigation
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            isNextEnabled={
              (step === 1 && isStep2Valid) ||
              (step === 2 && isStep4Valid) ||
              (step === 3 && isStep1Valid) ||
              (step === 4 && isStep3Valid)
            }
          />
        </form>
      </div>
    </section>
  );
};

export default QouetForm;
