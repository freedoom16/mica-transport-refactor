"use client";
import React, { useState } from "react";
import { useAddQuoetsMutation } from "../../src/store/Api/quotesApi";
import StepOne from "./steps/stepOneForm";
import StepNavigation from "./steps/stepNavigation";
import StepTwoComponent from "./steps/stepTwoForm";
import StepThreeComponent from "./steps/stepThreeForm";
import StepForDate from "./steps/stepDateForm";

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

  const nextStep = () => {
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
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      vehicleYear: "",
      vehicleModel: "",
      vehicleMaker: "",
      filteredMakers: [],
      filteredModels: [],
    },
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
  const [pickUpDate, setPickUpDate] = useState<string>("");
  const [pickUpDateRangeStart, setPickUpDateRangeStart] = useState<string>("");
  const [pickUpDateRangeEnd, setPickUpDateRangeEnd] = useState<string>("");
  const [pickUpTimeOption, setPickUpTimeOption] = useState<string>("");
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const [pickUpTimeRangeStart, setPickUpTimeRangeStart] = useState<string>("");
  const [pickUpTimeRangeEnd, setPickUpTimeRangeEnd] = useState<string>("");

  // Delivery Date and Time states
  const [deliveryDateOption, setDeliveryDateOption] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [deliveryDateRangeStart, setDeliveryDateRangeStart] =
    useState<string>("");
  const [deliveryDateRangeEnd, setDeliveryDateRangeEnd] = useState<string>("");
  const [deliveryTimeOption, setDeliveryTimeOption] = useState<string>("");
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [deliveryTimeRangeStart, setDeliveryTimeRangeStart] =
    useState<string>("");
  const [deliveryTimeRangeEnd, setDeliveryTimeRangeEnd] = useState<string>("");

  console.log("main ", vehicles);
  console.log("main maker", vehicles[0]?.vehicleMaker);

  // Validation logic for each step
  const isStep1Valid =
    pickupLocation &&
    deliveryLocation &&
    addressTypeForDeliver &&
    addressTypeForPickup;

  const isStep2Valid =
    vehicles[0]?.vehicleMaker &&
    vehicles[0]?.vehicleModel &&
    vehicles[0]?.vehicleYear;

  const isStep3Valid = firstName && lastName && email && phone;
  const isStep4Valid =
    (pickUpDate || pickUpDateRangeStart || pickUpDateRangeEnd) &&
    (deliveryDate || deliveryDateRangeStart || deliveryDateRangeEnd) &&
    (pickUpTime || pickUpTimeRangeStart || pickUpTimeRangeEnd) &&
    (deliveryTime || deliveryTimeRangeEnd || deliveryTimeRangeStart);

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
      {false ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-black bg-opacity-80 p-4  mt-30 mb-6 md:p-12 md:mt-20 md:mb-6 ">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="flex flex-row justify-between border-b">
              <div className="md:text-[35px] px-4">
                Shipping Quote Calculator
              </div>

              <div className="  text-end px-4">
                <button
                  className="text-white font-bold hover:text-gray-800 md:text-[45px]"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Stepper Display */}
              <ol className="flex items-center w-full text-sm font-medium text-center p-4 text-gray-500 dark:text-gray-400 sm:text-base">
                {[...Array(totalSteps)].map((_, index) => (
                  <li
                    key={index}
                    className={`flex md:w-full items-center ${
                      index + 1 < step
                        ? "text-blue-600"
                        : index + 1 === step
                        ? "text-blue-600"
                        : "text-gray-500"
                    } after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
                  >
                    <span
                      className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}
                    >
                      {index + 2 === step ? (
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      ) : (
                        <span className="block sm:hidden">{index + 1}</span>
                      )}
                      <span className="hidden sm:inline-flex sm:ms-2 whitespace-nowrap">
                        {`Step ${index + 1}`}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto  bg-gray-800 p-2 md:p-6 rounded-lg shadow-lg "
              >
                {/* Step 1: Pickup, Delivery, and Shipment Date */}
                {step === 2 && (
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
                {step === 1 && (
                  <StepTwoComponent
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    // isStep2Valid={isStep2Valid}
                    // nextStep={nextStep}
                    // prevStep={prevStep}
                  />
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
                {step === 3 && (
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
                <StepNavigation
                  currentStep={step}
                  totalSteps={totalSteps}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isNextEnabled={
                    (step === 1 && isStep1Valid) ||
                    (step === 2 && isStep2Valid) ||
                    (step === 3 && isStep3Valid) ||
                    (step === 4 && isStep4Valid)
                  }
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto  bg-gray-800 p-2 md:p-6 rounded-lg shadow-lg "
          >
            {/* Step 1: Pickup, Delivery, and Shipment Date */}
            {step === 2 && (
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
            {step === 1 && (
              <StepTwoComponent
                vehicles={vehicles}
                setVehicles={setVehicles}
                // isStep2Valid={isStep2Valid}
                // nextStep={nextStep}
                // prevStep={prevStep}
              />
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
            {step === 3 && (
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
            <StepNavigation
              currentStep={step}
              totalSteps={totalSteps}
              onNext={nextStep}
              onPrev={prevStep}
              isNextEnabled={
                (step === 1 && isStep2Valid) ||
                (step === 2 && isStep1Valid) ||
                (step === 3 && isStep4Valid) ||
                (step === 4 && isStep3Valid)
              }
            />
          </form>
        </div>
      )}
    </section>
  );
};

export default QouetForm;
