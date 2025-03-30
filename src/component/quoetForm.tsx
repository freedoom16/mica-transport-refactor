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
import ToastNotification from "./modal/toast";
import Modal from "./modal/popup";

interface Vehicle {
  vehicleYear: string;
  vehicleModel: string;
  vehicleMaker: string;
  // filteredMakers: string[];
  // filteredModels: string[];
  type: string; // "Open" or "Enclosed"
  isDrivable: boolean;
  category: string;
  locations: {
    pickupLocation: "";
    addressTypeForPickup: "";
    deliveryLocation: "";
    addressTypeForDeliver: "";
  };
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
  const [addVehicleIsTrue, setAddVehicleIsTrue] = useState("");
  const currentYear = new Date().getFullYear();

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
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errorsLocation, setErrorsLocation] = useState<any[]>(
    [] // Initialize as an array to handle multiple vehicles
  );

  const nextStepOne = () => {
    const newErrors: any = {};
    console.log(vehicles[currentVehicleIndex]?.isDrivable);
    if (!vehicles[currentVehicleIndex]?.vehicleMaker) {
      newErrors.vehicleMaker = "Vehicle maker is required.";
    }
    if (!vehicles[currentVehicleIndex]?.vehicleModel) {
      newErrors.vehicleModel = "Vehicle model is required.";
    }
    if (!vehicles[currentVehicleIndex]?.vehicleYear) {
      newErrors.vehicleYear = "Vehicle year is required.";
    } else if (!/^\d{4}$/.test(vehicles[currentVehicleIndex]?.vehicleYear)) {
      newErrors.vehicleYear = "Enter a valid year (4 digits).";
    } else {
      if (
        vehicles[currentVehicleIndex]?.vehicleYear < 1900 ||
        vehicles[currentVehicleIndex]?.vehicleYear > currentYear
      ) {
        newErrors.vehicleYear = `Enter a valid year between 1900 and ${currentYear}`;
      }
    }

    if (vehicles[currentVehicleIndex]?.isDrivable === null) {
      newErrors.isDrivable = "Drivable status is required.";
    }
    if (!vehicles[currentVehicleIndex]?.type) {
      newErrors.type = "This field is required.";
    }
    if (!vehicles[currentVehicleIndex]?.category) {
      newErrors.category = "Vehicle Catagory is required.";
    }
    console.log(
      "eeeeeeeeeeeeeerrrrrrr ",
      newErrors,
      Object.keys(newErrors).length
    );
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop further execution
    }
    console.log(Object.keys(newErrors).length > 0);

    setErrors({
      vehicleMaker: "",
      vehicleModel: "",
      vehicleYear: "",
      isDrivable: "",
      type: "",
      category: "",
    }); // Reset errors
    if (step < 2) setStep(step + 1); // Proceed to next step (adjust total steps as necessary)
    console.log("stepone nextstepone");
    setCurrentVehicleIndex(() => currentVehicleIndex + 1);
  };

  const validatePickupAndDelivery = () => {
    const newErrors: any = {};

    // Pickup location check
    if (!(pickUpDate || pickUpDateRangeStart || pickUpDateRangeEnd)) {
      newErrors.pickUpDate = "Pickup date is required.";
    }

    // Delivery location check
    if (!(deliveryDate || deliveryDateRangeStart || deliveryDateRangeEnd)) {
      newErrors.deliveryDate = "Delivery date is required.";
    }

    // Pickup time check
    if (!(pickUpTime || pickUpTimeRangeStart || pickUpTimeRangeEnd)) {
      newErrors.pickUpTime = "Pickup Time is required.";
    }

    // Delivery time check
    if (!(deliveryTime || deliveryTimeRangeStart || deliveryTimeRangeEnd)) {
      newErrors.deliveryTime = "Delivery Time is required.";
    }

    // If there are validation errors, set them and return early
    if (Object.keys(newErrors).length > 0) {
      setErrorsDateValidation(newErrors);
      return; // Stop further execution if validation fails
    }

    // If validation passes, reset errors and proceed (if needed)
    setErrorsDateValidation({
      pickUpDate: "",
      deliveryDate: "",
      pickUpTime: "",
      deliveryTime: "",
    });
    // if (step < 3) setStep(step + 1);
    // Optional: You can continue with next steps or additional logic here
  };

  const validateLocation = () => {
    const newErrors = [...errorsLocation]; // Clone errors array

    // Ensure validation for each vehicle
    for (let i = 0; i < vehicles.length; i++) {
      if (!newErrors[i]) {
        newErrors[i] = {
          pickupLocation: "",
          deliveryLocation: "",
          addressTypeForPickup: "",
          addressTypeForDeliver: "",
          pickupContactName: "",
          pickupContactPhone: "",
          dropoffContactName: "",
          dropoffContactPhone: "",
        };
      }

      const vehicle = location[i]; // Get current vehicle data

      // Pickup location check
      newErrors[i].pickupLocation = vehicle?.pickupLocation
        ? ""
        : "Pickup location is required.";

      // Delivery location check
      newErrors[i].deliveryLocation = vehicle?.deliveryLocation
        ? ""
        : "Delivery location is required.";

      // Address type for Pickup check
      newErrors[i].addressTypeForPickup = vehicle?.addressTypeForPickup
        ? ""
        : "Pickup address type is required.";

      // Address type for Delivery check
      newErrors[i].addressTypeForDeliver = vehicle?.addressTypeForDeliver
        ? ""
        : "Delivery address type is required.";

      // Pickup contact name and phone check
      if (vehicle?.isPickupContact === false) {
        newErrors[i].pickupContactName = vehicle?.pickupContactName
          ? ""
          : "Pickup contact name is required.";
        newErrors[i].pickupContactPhone =
          vehicle?.pickupContactPhone &&
          /^\(\d{3}\) \d{3}-\d{4}$/.test(vehicle?.pickupContactPhone)
            ? ""
            : "Enter a valid 10-digit phone number for pickup contact.";
      }

      // Dropoff contact name and phone check
      if (vehicle?.isDropoffContact === false) {
        newErrors[i].dropoffContactName = vehicle?.dropoffContactName
          ? ""
          : "Dropoff contact name is required.";
        newErrors[i].dropoffContactPhone =
          vehicle?.dropoffContactPhone &&
          /^\(\d{3}\) \d{3}-\d{4}$/.test(vehicle?.dropoffContactPhone)
            ? ""
            : "Enter a valid 10-digit phone number for dropoff contact.";
      }
    }

    // Check if there are any errors before proceeding
    const hasErrors = newErrors.some((error) =>
      Object.values(error).some((val) => val !== "")
    );
    setErrorsLocation(newErrors);

    if (hasErrors) {
      console.log("Validation failed:", newErrors);
      return false; // Stop further execution
    }

    console.log("Validation passed!");
    return true; // Continue to next step if needed
  };

  const handleRemoveVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_: any, i: any) => i !== index);
    setVehicles(updatedVehicles);

    // Adjust the currentVehicleIndex if necessary
    if (index === currentVehicleIndex && currentVehicleIndex > 0) {
      setCurrentVehicleIndex(currentVehicleIndex - 1);
    } else if (index < currentVehicleIndex) {
      setCurrentVehicleIndex(currentVehicleIndex - 1);
    }
  };

  const validateContact = () => {
    const newErrors: any = {};

    // First Name check
    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }

    // Last Name check
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }

    // Phone number check
    const phoneDigits = phone.replace(/\D/g, ""); // Remove non-digit characters
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) {
      newErrors.phone =
        "Phone number format is incorrect. Please use (xxx) xxx-xxxx.";
    }

    setErrorsContact(newErrors); // Update errors state
    return newErrors; // Return errors object to be used for form submission validation if needed
  };

  const nextStep = () => {
    setErrorMessage(""); // Reset the error message

    const generateRandomId = () =>
      Math.floor(10000 + Math.random() * 90000).toString();

    const quoteData = {
      vehicleInfo: vehicles.map((vehicle: any) => ({
        vehicleYear: parseInt(vehicle.vehicleYear) || null,
        vehicleMaker: vehicle.vehicleMaker || "",
        vehicleModel: vehicle.vehicleModel || "",
        category: vehicle.category || "",
        type: vehicle.type || "",
        isDrivable: vehicle.isDrivable || false,
        vehicleId: generateRandomId(),
      })),

      locations: location.map((locations, index) => ({
        vehicleId: vehicles[index]?.vehicleId,
        pickup: {
          pickupLocation: locations.pickupLocation || "",
          isPickupContact: locations.isPickupContact || false,
          pickupContactName: locations.pickupContactName || "",
          pickupContactPhone: locations.pickupContactPhone || "",
          addressTypeForPickup: locations.addressTypeForPickup || "",
        },
        delivery: {
          deliveryLocation: locations.deliveryLocation || "",
          isDropoffContact: locations.isDropoffContact || false,
          dropoffContactName: locations.dropoffContactName || "",
          dropoffContactPhone: locations.dropoffContactPhone || "",
          addressTypeForDeliver: locations.addressTypeForDeliver || "",
        },
      })),
    };

    console.log("quoteData ", quoteData);
    if (step === 2 && !isStep1Valid) {
      const isValidLocation = validateLocation();

      if (!isValidLocation) {
        // Stop further execution if validation fails
        return;
      }
    }

    if (currentVehicleIndex > 0 && step === 1 && isStep2Valid) {
      setModalOpenLocation(true);
      return;
    }

    if (step === 1 && !isStep2Valid && currentVehicleIndex === 0) {
      // setErrorMessage("All fields are required for Step 2.");
      // return;
      nextStepOne();

      // If there were errors in nextStepOne, stop further execution
      if (Object.keys(errors).length > 0) {
        return; // Stop further execution if there are errors
      }
    }

    if (step === 4 && !isStep3Valid) {
      validateContact();

      if (!firstName) {
        setErrorMessage("First name is required.");
        return;
      }
      if (!lastName) {
        setErrorMessage("Last name is required.");
        return;
      }

      if (!phone) {
        setErrorMessage("Phone number is required.");
        return;
      }
    }

    if (step === 3 && !isStep4Valid) {
      // setErrorMessage("All fields are required for Step 4.");
      // return;
      validatePickupAndDelivery();
      if (!(pickUpDate || pickUpDateRangeStart || pickUpDateRangeEnd)) {
        setErrorMessage("Pickup location is required.");
        return;
      }
      if (!(deliveryDate || deliveryDateRangeStart || deliveryDateRangeEnd)) {
        setErrorMessage("Delivery location is required.");
        return;
      }
      if (!(pickUpTime || pickUpTimeRangeStart || pickUpTimeRangeEnd)) {
        setErrorMessage("Pickup Time is required.");
        return;
      }
      if (!(deliveryTime || deliveryTimeRangeEnd || deliveryTimeRangeStart)) {
        setErrorMessage("Delivery Time is required.");
        return;
      }
    }

    // if (step < totalSteps) {
    //   setStep((prevStep) => prevStep + 1);
    // }
    if (isStep2Valid) {
      console.log("is step2 valid ", isStep2Valid);
      nextStepOne();

      // If there were errors in nextStepOne, stop further execution
      if (Object.keys(errors).length > 0) {
        return; // Stop further execution if there are errors
      }
      setCurrentVehicleIndex((prevIndex) => currentVehicleIndex + 1);
      //   // setCurrentVehicleIndex(currentVehicleIndex + 1);
    } else if (step === 1 && !isStep2Valid) {
      console.log("is step2 valid 222 ", isStep2Valid);
      handleRemoveVehicle(currentVehicleIndex);
      setCurrentVehicleIndex((prevIndex) => currentVehicleIndex);
    }
    console.log("111111111111111111111111111111111111111");

    if (step < totalSteps) {
      console.log("step last ");
      setStep(step + 1);
    }
    console.log("111111111111111111111111111111111111111");

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
  const [isPickupContact, setIsPickupContact] = useState<boolean | null>(true); // "true" or "false"
  const [isDropoffContact, setIsDropoffContact] = useState<boolean | null>(
    true
  ); // "true" or "false"

  const [pickupContactName, setPickupContactName] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");
  const [dropoffContactName, setDropoffContactName] = useState("");
  const [dropoffContactPhone, setDropoffContactPhone] = useState("");

  // Step 2 fields
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleMaker, setVehicleMaker] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[] | any>([]);
  const [location, setLocation] = useState<any[]>([]);

  // Step 3 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDealer, setIsDealer] = useState<boolean | null>(null);
  const [dealerCompanName, setDealerCompanName] = useState("");
  const [isClientNote, setIsClientNote] = useState<boolean | null>(null);
  const [note, setNote] = useState<string>("");

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
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState<number>(0);

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

  const [sameLocation, setSameLocation] = useState<boolean | null>(null);

  const [isModalOpenLocation, setModalOpenLocation] = useState(false);

  // Function to handle "Yes" button click
  const handleConfirm = () => {
    console.log("User confirmed the message", vehicles);
    setSameLocation(true);
    // setSameLocation(null);
    setCurrentVehicleIndex(() => currentVehicleIndex + 1);
    setStep(step + 1);
    setModalOpenLocation(false); // Close modal after action
  };

  console.log("main ", vehicles);
  console.log("main maker", vehicles[0]?.vehicleMaker);

  // Validation logic for each step
  const isStep1Valid = !!(
    pickupLocation &&
    deliveryLocation &&
    addressTypeForDeliver &&
    addressTypeForPickup &&
    (isPickupContact === true || (pickupContactName && pickupContactPhone)) &&
    (isDropoffContact === true || (dropoffContactName && dropoffContactPhone))
  );

  const isStep2Valid =
    // true;
    !!(
      vehicles[currentVehicleIndex]?.vehicleMaker &&
      vehicles[currentVehicleIndex]?.vehicleModel &&
      vehicles[currentVehicleIndex]?.vehicleYear &&
      // !(
      //   vehicles[currentVehicleIndex]?.vehicleYear < 1900 ||
      //   vehicles[currentVehicleIndex]?.vehicleYear > currentYear
      // ) &&
      vehicles[currentVehicleIndex]?.isDrivable != null &&
      vehicles[currentVehicleIndex]?.type &&
      vehicles[currentVehicleIndex]?.category
    );

  const isStep3Valid = !!(
    (firstName && lastName && phone)
    // &&
    // isDealer != null &&
    // isClientNote != null
  );

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
    if (!isStep3Valid) {
      validateContact();

      if (!firstName || !lastName || !phone) {
        setErrorMessage("First name is required.");
        return;
      }
    }

    const quoteData = {
      vehicleInfo: vehicles.map((vehicle: any) => ({
        vehicleYear: parseInt(vehicle.vehicleYear) || null,
        vehicleMaker: vehicle.vehicleMaker || "",
        vehicleModel: vehicle.vehicleModel || "",
        category: vehicle.category || "",
        type: vehicle.type || "",
        isDrivable: vehicle.isDrivable || false,
        vehicleId: vehicle.vehicleId,
      })),
      // locations: [
      //   {
      //     vehicleId: "12345",
      //     pickup: {
      //       pickupLocation: pickupLocation,
      //       isPickupContact: isPickupContact,
      //       pickupContactName: pickupContactName,
      //       pickupContactPhone: pickupContactPhone,
      //       addressTypeForPickup: addressTypeForPickup,
      //     },
      //     delivery: {
      //       deliveryLocation: deliveryLocation,
      //       isDropoffContact: isDropoffContact,
      //       dropoffContactName: dropoffContactName,
      //       dropoffContactPhone: dropoffContactPhone,
      //       addressTypeForDeliver: addressTypeForDeliver,
      //     },
      //   },
      // ],

      locations: location.map((locations, index) => ({
        vehicleId: vehicles[index]?.vehicleId,
        pickup: {
          pickupLocation: locations.pickupLocation || "",
          isPickupContact: locations.isPickupContact || false,
          pickupContactName: locations.pickupContactName || "",
          pickupContactPhone: locations.pickupContactPhone || "",
          addressTypeForPickup: locations.addressTypeForPickup || "",
        },
        delivery: {
          deliveryLocation: locations.deliveryLocation || "",
          isDropoffContact: locations.isDropoffContact || false,
          dropoffContactName: locations.dropoffContactName || "",
          dropoffContactPhone: locations.dropoffContactPhone || "",
          addressTypeForDeliver: locations.addressTypeForDeliver || "",
        },
      })),

      pickUpTime: {
        pickUpDateOption: pickUpDateOption,
        pickUpDate: pickUpDate?.toISOString() || null,
        pickUpTimeOption: pickUpTimeOption,
        pickUpTime: pickUpTime,
        pickUpDateRangeStart: pickUpDateRangeStart?.toISOString() || null,
        pickUpDateRangeEnd: pickUpDateRangeEnd?.toISOString() || null,
        pickUpTimeRangeStart: pickUpTimeRangeStart,
        pickUpTimeRangeEnd: pickUpTimeRangeEnd,
      },

      deliveryTime: {
        deliveryDateOption: deliveryDateOption,
        deliveryDate: deliveryDate?.toISOString() || null,
        deliveryTimeOption: deliveryTimeOption,
        deliveryTime: deliveryTime,
        deliveryDateRangeStart: deliveryDateRangeStart?.toISOString() || null,
        deliveryDateRangeEnd: deliveryDateRangeEnd?.toISOString() || null,
        deliveryTimeRangeStart: deliveryTimeRangeStart,
        deliveryTimeRangeEnd: deliveryTimeRangeEnd,
      },

      pickupLocation: pickupLocation,
      isPickupContact: isPickupContact,
      pickupContactName: pickupContactName,
      pickupContactPhone: pickupContactPhone,
      addressTypeForPickup: addressTypeForPickup,

      deliveryLocation: deliveryLocation,
      isDropoffContact: isDropoffContact,
      dropoffContactName: dropoffContactName,
      dropoffContactPhone: dropoffContactPhone,
      addressTypeForDeliver: addressTypeForDeliver,

      client: {
        fullName: firstName + " " + lastName,
        email: email,
        phone: phone,
        isDealer: isDealer || false,
        dealerCompanName: dealerCompanName,
        note: note,
      },

      status: "pending",
    };
    try {
      await addQuote(quoteData).unwrap(); // Submit the form data using the mutation hook
      setVehicles([]);
      // Reset the form or navigate to a confirmation page on success
      setStep(1); // Optional: Reset form after submission
    } catch (err) {
      console.error("Error:", err);
    }
  };
  console.log("vehicle index ", currentVehicleIndex);

  return (
    <section
      id="quote"
      className="w-full bg-white rounded-[32px]"
      // style={{ boxShadow: "25px 25px 25px 25px rgba(0, 0, 0, 0.1)" }}
      style={{ boxShadow: "0 -5px 50px -5px rgba(32, 152, 238, 0.3)" }}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto  bg-white p-4 md:px-4 rounded-[32px] "
          // style={{ boxShadow: "0 -59px 500px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <p className="text-[20px] text-gray-900 font-bold    text-center ">
            Shipping Quote Calculator
          </p>
          {/* Progress Indicator */}
          <div className=" text-gray-900 text-end mb-1 text-right">
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
              isNextEnabled={step === 1 && isStep2Valid}

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
              isDealer={isDealer}
              setIsDealer={setIsDealer}
              dealerCompanName={dealerCompanName}
              setDealerCompanName={setDealerCompanName}
              isClientNote={isClientNote}
              setIsClientNote={setIsClientNote}
              note={note}
              setNote={setNote}
              // isStep3Valid={isStep3Valid}
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
              isNextEnabled={
                (step === 1 && isStep2Valid) ||
                (step === 2 && isStep4Valid) ||
                (step === 3 && isStep1Valid) ||
                (step === 4 && isStep3Valid)
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
        </form>
      </div>
    </section>
  );
};

export default QouetForm;
