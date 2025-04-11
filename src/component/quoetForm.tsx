"use client";
import React, { useState } from "react";
import { useAddQuoetsMutation } from "../../src/store/Api/quotesApi";
import StepOne from "./steps/stepOneForm";
import StepNavigation from "./steps/stepNavigation";
import StepThreeComponent from "./steps/stepThreeForm";
import StepForDate from "./steps/stepDateForm";
import StepTwoComponentTest from "./steps/vehicleStepForm";
import ToastNotification from "./modal/toast";
import Modal from "./modal/popup";
import { LocationValidation } from "@/utils/locationValidation";
import { VehicleValidation } from "@/utils/vehiclesValidation";
import { ClientInfoValidation } from "@/utils/clientInfoValidation";
import { DateAndTimeValidation } from "@/utils/dateAndTimeValidation";
import {
  validateContactInfo,
  validateLocation,
  validatePickupAndDelivery,
  validateVehicleDetails,
} from "../utils/quoetFormsValidation";
import { generateQuoteData } from "../utils/generateQuoteData";
import { Vehicle } from "@/types/vehicleTypes";

const QouetForm: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [addressTypeForPickup, setAddressTypeForPickup] = useState("");
  const [addressTypeForDeliver, setAddressTypeForDeliver] = useState("");
  const [isDerivable, setIsDrivable] = useState<boolean | null>(null);
  const [isPickupContact, setIsPickupContact] = useState<boolean | null>(true); // "true" or "false"
  const [isDropoffContact, setIsDropoffContact] = useState<boolean | null>(
    true
  );

  const [pickupContactName, setPickupContactName] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");
  const [dropoffContactName, setDropoffContactName] = useState("");
  const [dropoffContactPhone, setDropoffContactPhone] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[] | any>([]);
  const [location, setLocation] = useState<any[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDealer, setIsDealer] = useState<boolean | null>(null);
  const [dealerCompanName, setDealerCompanName] = useState("");
  const [isClientNote, setIsClientNote] = useState<boolean | null>(null);
  const [note, setNote] = useState<string>("");

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
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState<number>(0);

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

  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(step > 1);
  const totalSteps = 4; // Total steps in the form
  const [errorMessage, setErrorMessage] = useState("");

  const currentYear = new Date().getFullYear();

  const [sameLocation, setSameLocation] = useState<boolean | null>(null);
  const [isModalOpenLocation, setModalOpenLocation] = useState(false);

  const [errorsLocation, setErrorsLocation] = useState<any[]>([]);

  const createEmptyVehicle = (): Vehicle => ({
    vehicleMaker: "",
    vehicleModel: "",
    vehicleYear: null,
    type: "",
    isDrivable: null,
    category: "",
    vehicleId: null,
  });

  const [errors, setErrors] = useState({
    vehicleMaker: "",
    vehicleModel: "",
    vehicleYear: "",
    isDrivable: "",
    type: "",
    category: "",
  });

  const [errorsDateValidation, setErrorsDateValidation] = useState<{
    pickUpDate: string | null;
    pickUpTime: string | null;
    deliveryDate: string | null;
    deliveryTime: string | null;
  }>({
    pickUpDate: "",
    pickUpTime: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const [errorsContact, setErrorsContact] = useState<{
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    isDealer: string | null;
    isClientNote: string | null;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isDealer: "",
    isClientNote: "",
  });

  const nextStep = () => {
    console.log("next clicked");
    if (step === 1) {
      // Ensure at least one vehicle exists
      if (vehicles.length === 0) {
        const emptyVehicle = createEmptyVehicle();
        setVehicles([emptyVehicle]);
        const vehicleErrors = validateVehicleDetails(vehicles);
        setErrors(vehicleErrors);
        return;
      }

      const updatedVehicles = vehicles.filter((v: any) => v !== undefined);
      setVehicles(updatedVehicles);

      const vehicle = updatedVehicles[currentVehicleIndex];
      const isFormStarted =
        vehicle &&
        Object.values(vehicle).some(
          (value) => value !== "" && value !== null && value !== undefined
        );

      if (isFormStarted) {
        const vehicleErrors = validateVehicleDetails(vehicle);
        setErrors(vehicleErrors);

        // Set error message to appear above the form if there are any errors
        if (Object.keys(vehicleErrors).length > 0) {
          setErrorMessage(
            "Please fill all required fields in the vehicle form."
          );
          console.log("Vehicle validation failed:", vehicleErrors);
          return;
        }
      }
      // Clear previous input-level errors
      setErrors({
        vehicleMaker: "",
        vehicleModel: "",
        vehicleYear: "",
        isDrivable: "",
        type: "",
        category: "",
      });

      // Check how many vehicles are fully valid
      const fullyValidVehicles = updatedVehicles.filter(
        (v: any) => v && Object.keys(validateVehicleDetails(v)).length === 0
      );

      if (fullyValidVehicles.length > 1) {
        console.log("Multiple fully valid vehicles — opening modal");
        setModalOpenLocation(true);
        return;
      }
    }

    if (step === 2 && !stepLocationValidation) {
      const { newErrors, isValid } = validateLocation(location, errorsLocation);
      setErrorsLocation(newErrors);
      if (!isValid) return;
    }

    if (step === 3 && !stepDateAndTimetValidation) {
      const dateValidationErrors = validatePickupAndDelivery(
        pickUpDate,
        pickUpDateRangeStart,
        pickUpDateRangeEnd,
        deliveryDate,
        deliveryDateRangeStart,
        deliveryDateRangeEnd,
        pickUpTime,
        pickUpTimeRangeStart,
        pickUpTimeRangeEnd,
        deliveryTime,
        deliveryTimeRangeStart,
        deliveryTimeRangeEnd
      );
      setErrorsDateValidation(dateValidationErrors);
      if (Object.keys(dateValidationErrors).length > 0) return;
    }

    if (step === 4 && !stepClientValidation) {
      const contactErrors = validateContactInfo(
        firstName,
        lastName,
        phone,
        email,
        isDealer,
        dealerCompanName,
        isClientNote,
        note
      );
      setErrorsContact(contactErrors);
      if (Object.keys(contactErrors).length > 0) return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
      setIsModalOpen(true);
    }
  };

  const prevStep = () => {
    if (vehicles.length > 1 && step === 2) {
      // setCurrentVehicleIndex(() => currentVehicleIndex + 1);
      setModalOpenLocation(true);
      if (step > 1) setStep(step - 1);

      return;
    }
    if (step > 1) setStep(step - 1);
  };

  // Function to handle "Yes" button click
  const handleConfirm = () => {
    console.log("User confirmed the message", vehicles);
    const updatedVehicles = [...vehicles];
    setVehicles(updatedVehicles.filter((v) => v !== undefined));

    setSameLocation(true);
    // setSameLocation(null);
    setCurrentVehicleIndex(() => currentVehicleIndex);
    setStep(step + 1);
    setModalOpenLocation(false); // Close modal after action
  };

  const stepLocationValidation = LocationValidation(
    location,
    sameLocation,
    vehicles.length
  );

  const stepVehicleValidation = VehicleValidation(
    vehicles,
    currentYear,
    currentVehicleIndex
  );

  const clientData = {
    firstName,
    lastName,
    email,
    phone,
    isDealer,
    dealerCompanName,
    isClientNote,
    note,
  };
  const stepClientValidation = ClientInfoValidation(clientData);

  const stepDateAndTimetValidation = DateAndTimeValidation({
    pickUpDate,
    pickUpTime,
    deliveryDate,
    deliveryTime,
  });

  console.log("vehicles array ", vehicles);

  console.log("stepLocationValidation", stepLocationValidation);
  console.log("stepVehicleValidation", stepVehicleValidation);
  console.log("stepVehicleValidation", !!validateVehicleDetails(vehicles));

  // Use the mutation hook
  const [addQuote, { isLoading, isSuccess, isError, error }] =
    useAddQuoetsMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate contact info once for the form
    const contactErrors = validateContactInfo(
      firstName,
      lastName,
      phone,
      email,
      isDealer,
      dealerCompanName,
      isClientNote,
      note
    );

    // If contact info validation fails, handle it early
    if (Object.keys(contactErrors).length > 0) {
      setErrorsContact(contactErrors);
      setErrorMessage("Please fill in all required contact fields.");
      return;
    }

    // If step 3 is not valid, return early
    if (!stepClientValidation) {
      setErrorMessage("Please complete the contact information.");
      return;
    }

    const quoteData = generateQuoteData(
      vehicles,
      location,
      firstName,
      lastName,
      phone,
      email,
      isDealer,
      dealerCompanName,
      note,
      pickUpDateOption,
      pickUpDate,
      pickUpTimeOption,
      pickUpTime,
      pickUpDateRangeStart,
      pickUpDateRangeEnd,
      pickUpTimeRangeStart,
      pickUpTimeRangeEnd,
      deliveryDateOption,
      deliveryDate,
      deliveryTimeOption,
      deliveryTime,
      deliveryDateRangeStart,
      deliveryDateRangeEnd,
      deliveryTimeRangeStart,
      deliveryTimeRangeEnd
    );

    try {
      await addQuote(quoteData).unwrap(); // Submit the form data using the mutation hook
      setVehicles([]);
      setLocation([]);
      resetForm();
      // Reset the form or navigate to a confirmation page on success
      setStep(1); // Optional: Reset form after submission
    } catch (err) {
      console.error("Error:", err);
    }
  };
  console.log("vehicle index ", currentVehicleIndex);
  console.log("Location ", location);

  const resetForm = () => {
    setVehicles([]);
    setLocation([]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setIsDealer(false);
    setDealerCompanName("");
    setNote("");

    setPickUpDateOption("");
    setPickUpDate(null);
    setPickUpTimeOption("");
    setPickUpTime("");
    setPickUpDateRangeStart(null);
    setPickUpDateRangeEnd(null);
    setPickUpTimeRangeStart("");
    setPickUpTimeRangeEnd("");

    setDeliveryDateOption("");
    setDeliveryDate(null);
    setDeliveryTimeOption("");
    setDeliveryTime("");
    setDeliveryDateRangeStart(null);
    setDeliveryDateRangeEnd(null);
    setDeliveryTimeRangeStart("");
    setDeliveryTimeRangeEnd("");
  };

  return (
    <section
      id="quote"
      className="w-full bg-[#2c2c2c] rounded-[32px]"
      // style={{ boxShadow: "25px 25px 25px 25px rgba(0, 0, 0, 0.1)" }}
      style={{ boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)" }}
    >
      <div>
        <div
          // onSubmit={handleSubmit}
          className="max-w-xl mx-auto  bg-[#2c2c2c] p-4 md:px-4 rounded-[32px] "
          // style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <p className="text-[20px] text-white font-bold    text-center ">
            Shipping Quote Calculator
          </p>
          {/* Progress Indicator */}
          <div className=" text-white text-end mb-1 text-right">
            <p className="text-lg font-bold">
              Step {step} of {totalSteps}
            </p>
          </div>
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
              setErrorsLocation={setErrorsLocation}
              errorsLocation={errorsLocation}
              location={location}
              setLocation={setLocation}
              currentVehicleIndex={currentVehicleIndex}
              sameLocation={sameLocation}
              vehicles={vehicles}
              setVehicles={setVehicles}
              setCurrentVehicleIndex={setCurrentVehicleIndex}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === 1 && (
            <StepTwoComponentTest
              vehicles={vehicles}
              setVehicles={setVehicles}
              currentVehicleIndex={currentVehicleIndex}
              setCurrentVehicleIndex={setCurrentVehicleIndex}
              errors={errors}
              setErrors={setErrors}
              currentStep={step}
              totalSteps={totalSteps}
              onNext={nextStep}
              isNextEnabled={step === 1 && stepVehicleValidation}
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
              isDealer={isDealer}
              setIsDealer={setIsDealer}
              dealerCompanName={dealerCompanName}
              setDealerCompanName={setDealerCompanName}
              isClientNote={isClientNote}
              setIsClientNote={setIsClientNote}
              note={note}
              setNote={setNote}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              setErrorsContact={setErrorsContact}
              errorsContact={errorsContact}
              error={error}
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
              setErrorsDateValidation={setErrorsDateValidation}
              errorsDateValidation={errorsDateValidation}
            />
          )}

          {step != 1 && (
            <StepNavigation
              currentStep={step}
              totalSteps={totalSteps}
              onNext={nextStep}
              onPrev={prevStep}
              handleSubmit={handleSubmit}
              isNextEnabled={
                (step === 1 && stepVehicleValidation) ||
                (step === 2 && stepLocationValidation) ||
                (step === 3 && stepDateAndTimetValidation) ||
                (step === 4 && stepClientValidation)
              }
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          )}

          <ToastNotification isSuccess={isSuccess} />
          <Modal
            isOpen={isModalOpenLocation}
            onClose={() => {
              setSameLocation(false);
              setModalOpenLocation(false);
              setCurrentVehicleIndex((prevIndex) => currentVehicleIndex);

              setStep(step + 1);
            }}
            message=" vehicles are in the same location?"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </section>
  );
};

export default QouetForm;
