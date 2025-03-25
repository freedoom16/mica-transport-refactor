import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

interface StepFourProps {
  // Pick Up Date and Time states
  pickUpDateOption: string;
  setPickUpDateOption: (value: string) => void;
  pickUpDate: Date | null;
  setPickUpDate: (value: Date | null) => void;
  pickUpDateRangeStart: Date | null;
  setPickUpDateRangeStart: (value: Date | null) => void;
  pickUpDateRangeEnd: Date | null;
  setPickUpDateRangeEnd: (value: Date | null) => void;
  pickUpTimeOption: string;
  setPickUpTimeOption: (value: string) => void;
  pickUpTime: string;
  setPickUpTime: (value: string) => void;
  pickUpTimeRangeStart: string;
  setPickUpTimeRangeStart: (value: string) => void;
  pickUpTimeRangeEnd: string;
  setPickUpTimeRangeEnd: (value: string) => void;

  // Delivery Date and Time states
  deliveryDateOption: string;
  setDeliveryDateOption: (value: string) => void;
  deliveryDate: Date | null;
  setDeliveryDate: (value: Date | null) => void;
  deliveryDateRangeStart: Date | null;
  setDeliveryDateRangeStart: (value: Date | null) => void;
  deliveryDateRangeEnd: Date | null;
  setDeliveryDateRangeEnd: (value: Date | null) => void;
  deliveryTimeOption: string;
  setDeliveryTimeOption: (value: string) => void;
  deliveryTime: string;
  setDeliveryTime: (value: string) => void;
  deliveryTimeRangeStart: string;
  setDeliveryTimeRangeStart: (value: string) => void;
  deliveryTimeRangeEnd: string;
  setDeliveryTimeRangeEnd: (value: string) => void;
  setErrorsDateValidation: React.Dispatch<React.SetStateAction<any>>;
  errorsDateValidation: any;
}

const StepDataTest: React.FC<StepFourProps> = ({
  // Pick Up Date and Time props
  pickUpDateOption,
  setPickUpDateOption,
  pickUpDate,
  setPickUpDate,
  pickUpDateRangeStart,
  setPickUpDateRangeStart,
  pickUpDateRangeEnd,
  setPickUpDateRangeEnd,
  pickUpTimeOption,
  setPickUpTimeOption,
  pickUpTime,
  setPickUpTime,
  pickUpTimeRangeStart,
  setPickUpTimeRangeStart,
  pickUpTimeRangeEnd,
  setPickUpTimeRangeEnd,

  // Delivery Date and Time props
  deliveryDateOption,
  setDeliveryDateOption,
  deliveryDate,
  setDeliveryDate,
  deliveryDateRangeStart,
  setDeliveryDateRangeStart,
  deliveryDateRangeEnd,
  setDeliveryDateRangeEnd,
  deliveryTimeOption,
  setDeliveryTimeOption,
  deliveryTime,
  setDeliveryTime,
  deliveryTimeRangeStart,
  setDeliveryTimeRangeStart,
  deliveryTimeRangeEnd,
  setDeliveryTimeRangeEnd,
  setErrorsDateValidation,
  errorsDateValidation,
}) => {
  const [dateTest, setDateTest] = useState<Date | null>(null);

  const minDateTest = "2025-03-15"; // Example min date
  const maxDate = "2025-12-31"; // Example max date

  // Refs for focus management
  const singlePickUpDatePickerRef = useRef<any>(null);
  const rangePickUpStartDatePickerRef = useRef<any>(null);

  const singleDeliverDatePickerRef = useRef<any>(null);
  const rangeDeliverStartDatePickerRef = useRef<any>(null);

  // Refs for auto-focus management
  const singlePickUpTimePickerRef = useRef<any>(null);
  const rangePickUpStartTimePickerRef = useRef<any>(null);
  const singleDeliverTimePickerRef = useRef<any>(null);
  const rangeDeliverStartTimePickerRef = useRef<any>(null);

  useEffect(() => {
    // Automatically focus the appropriate DatePicker for pickup
    if (
      pickUpDateOption === "between" &&
      rangePickUpStartDatePickerRef.current
    ) {
      rangePickUpStartDatePickerRef.current.setFocus();
    } else if (pickUpDateOption && singlePickUpDatePickerRef.current) {
      singlePickUpDatePickerRef.current.setFocus();
    }
  }, [pickUpDateOption]);

  useEffect(() => {
    // Automatically focus the appropriate DatePicker for delivery
    if (
      deliveryDateOption === "between" &&
      rangeDeliverStartDatePickerRef.current
    ) {
      rangeDeliverStartDatePickerRef.current.setFocus();
    } else if (deliveryDateOption && singleDeliverDatePickerRef.current) {
      singleDeliverDatePickerRef.current.setFocus();
    }
  }, [deliveryDateOption]);

  useEffect(() => {
    // Auto-focus logic for pickup time
    if (
      pickUpTimeOption === "between" &&
      rangePickUpStartTimePickerRef.current
    ) {
      rangePickUpStartTimePickerRef.current.focus();
    } else if (pickUpTimeOption && singlePickUpTimePickerRef.current) {
      singlePickUpTimePickerRef.current.focus();
    }
  }, [pickUpTimeOption]);

  useEffect(() => {
    // Auto-focus logic for delivery time
    if (
      deliveryTimeOption === "between" &&
      rangeDeliverStartTimePickerRef.current
    ) {
      rangeDeliverStartTimePickerRef.current.focus();
    } else if (deliveryTimeOption && singleDeliverTimePickerRef.current) {
      singleDeliverTimePickerRef.current.focus();
    }
  }, [deliveryTimeOption]);

  const validatePickUpDate = () => {
    console.log("////// pick date time ", !pickUpDate, pickUpDate);

    if (!pickUpDate) {
      setErrorsDateValidation((prevState: any) => ({
        ...prevState,
        pickUpDate: "Pick-up Date is required.",
      }));
    } else {
      setErrorsDateValidation((prevState: any) => ({
        ...prevState,
        pickUpDate: "",
      }));
    }

    if (
      pickUpDateOption === "between" &&
      pickUpDateRangeEnd &&
      pickUpDateRangeStart
    ) {
      if (pickUpDateRangeEnd <= pickUpDateRangeStart) {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          pickUpDate: "To Date must be greater than From Date.",
        }));
      } else {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          pickUpDate: "",
        }));
      }
    }
  };

  const validateDeliveryDate = () => {
    console.log("////// delivery date time ", !deliveryDate, deliveryDate);

    setErrorsDateValidation((prevState: any) => {
      const updatedErrors = { ...prevState };

      // Check if deliveryDate is missing
      if (!deliveryDate) {
        updatedErrors.deliveryDate = "Delivery Date is required.";
      } else {
        updatedErrors.deliveryDate = "";
      }

      // Validate the "between" delivery date range
      if (
        deliveryDateOption === "between" &&
        deliveryDateRangeEnd &&
        deliveryDateRangeStart
      ) {
        if (deliveryDateRangeEnd <= deliveryDateRangeStart) {
          updatedErrors.deliveryDate =
            "To Date must be greater than From Date.";
        } else if (
          pickUpDateOption === "between" &&
          pickUpDateRangeEnd &&
          deliveryDateRangeStart <= pickUpDateRangeEnd
        ) {
          updatedErrors.deliveryDate =
            "Delivery date cannot be earlier than pick-up date.";
        } else {
          updatedErrors.deliveryDate = "";
        }
      }

      return updatedErrors;
    });
  };

  const validatePickUpTime = () => {
    console.log("////// pickup time ", !pickUpTime, pickUpTime);

    if (!pickUpTime) {
      setErrorsDateValidation((prevState: any) => ({
        ...prevState,
        pickUpTime: "Pick-up time is required.",
      }));
    } else {
      setErrorsDateValidation((prevState: any) => ({
        ...prevState,
        pickUpTime: "",
      }));
    }

    if (
      pickUpTimeOption === "between" &&
      pickUpTimeRangeEnd &&
      pickUpTimeRangeStart
    ) {
      if (pickUpTimeRangeEnd <= pickUpTimeRangeStart) {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          pickUpTime: "To Time must be later than From Time.",
        }));
      } else {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          pickUpTime: "",
        }));
      }
    }
  };

  const validateDeliveryTime = () => {
    console.log("////// delivery time ", !deliveryTime);
    if (!deliveryTime) {
      setErrorsDateValidation((prevState: any) => ({
        ...prevState,
        deliveryTime: "Delivery time is required.",
      }));
    } else {
      setErrorsDateValidation((prevState: any) => ({
        ...prevState,
        deliveryTime: "",
      }));
    }

    if (
      deliveryTimeOption === "between" &&
      deliveryTimeRangeEnd &&
      deliveryTimeRangeStart
    ) {
      if (deliveryTimeRangeEnd <= deliveryTimeRangeStart) {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          deliveryTime: "To Time must be later than From Time.",
        }));
      } else {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          deliveryTime: "",
        }));
      }

      if (
        deliveryTimeRangeStart &&
        pickUpTimeOption === "between" &&
        pickUpTimeRangeEnd &&
        deliveryTimeRangeStart <= pickUpTimeRangeEnd &&
        deliveryDate == pickUpDate
      ) {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          deliveryTime: "Delivery time cannot be earlier than pick-up time.",
        }));
      }
    }
  };

  const validateFieldsForTime = (
    field: "pickUpTime" | "deliveryTime",
    value: string | null
  ) => {
    const newErrors = { ...errorsDateValidation };

    console.log("valueeeeee ", value);
    if (field === "pickUpTime") {
      // Validate pickUpTime
      if (!value) {
        newErrors.pickUpTime = "Pick-up time is required.";
      } else {
        delete newErrors.pickUpTime; // No error
      }

      // Validate the "between" pickUpTime range if options are set

      // Additional validation for pickUpTime related to deliveryTime, if applicable
      // if (deliveryTime && value && deliveryTime < value) {
      //   newErrors.deliveryTime =
      //     "Delivery time cannot be earlier than pick-up time.";
      // } else {
      //   delete newErrors.deliveryTime;
      // }
    }

    if (field === "deliveryTime") {
      // Validate deliveryTime
      if (!value) {
        newErrors.deliveryTime = "Delivery time is required.";
      } else {
        delete newErrors.deliveryTime; // No error
      }

      // Validate the "between" deliveryTime range if options are set
      if (
        deliveryTimeOption === "between" &&
        deliveryTimeRangeEnd &&
        deliveryTimeRangeStart
      ) {
        if (deliveryTimeRangeEnd <= deliveryTimeRangeStart) {
          newErrors.deliveryTime = "To Time must be later than From Time.";
        } else {
          delete newErrors.deliveryTime;
        }

        // Ensure deliveryTime is validated relative to pickUpTime
        if (
          deliveryTimeRangeStart &&
          pickUpTimeOption === "between" &&
          pickUpTimeRangeEnd &&
          deliveryTimeRangeStart <= pickUpTimeRangeEnd
        ) {
          newErrors.deliveryTime =
            "Delivery time cannot be earlier than pick-up time.";
        }
      }
    }

    setErrorsDateValidation(newErrors);
  };

  const validateFields = (
    field: "pickupDate" | "deliveryDate",
    value: Date | null
  ) => {
    const newErrors = { ...errorsDateValidation };

    if (field === "pickupDate") {
      // Validate pickUpDate
      if (!value) {
        newErrors.pickUpDate = "Pickup date is required.";
      } else {
        console.log("rrrrrrrrrr");
        delete newErrors.pickUpDate; // No error
      }

      // Validate pickup date range if options are set
      // if (
      //   pickUpDateOption === "between" &&
      //   pickUpDateRangeEnd &&
      //   pickUpDateRangeStart
      // ) {
      //   if (pickUpDateRangeEnd <= pickUpDateRangeStart) {
      //     newErrors.pickUpDate = "To Date must be greater than From Date.";
      //   } else {
      //     delete newErrors.pickUpDate; // No error
      //   }
      // }

      // Ensure deliveryDate is validated relative to the new pickupDate
      if (deliveryDate && value && deliveryDate < value) {
        newErrors.deliveryDate =
          "Delivery date cannot be earlier than pickup date.";
      } else if (deliveryDate && value) {
        delete newErrors.deliveryDate;
      }
    }

    if (field === "deliveryDate") {
      if (!value) {
        newErrors.deliveryDate = "Delivery date is required.";
      } else {
        delete newErrors.pickupDate; // No error
      }

      // Validate pickup date range if options are set
      if (
        deliveryDateOption === "between" &&
        deliveryDateRangeEnd &&
        deliveryDateRangeStart
      ) {
        if (deliveryDateRangeEnd <= deliveryDateRangeStart) {
          newErrors.deliveryDate = "To Date must be greater than From Date.";
        } else if (
          pickUpDateOption === "between" &&
          pickUpDateRangeEnd &&
          deliveryDateRangeStart <= pickUpDateRangeEnd
        ) {
          newErrors.deliveryDate =
            "Delivery date cannot be earlier than pick-up date.";
        } else {
          delete newErrors.deliveryDate;
        }
      }

      // Ensure deliveryDate is validated relative to the new pickupDate
      if (deliveryDate && pickUpDate && value && pickUpDate > value) {
        newErrors.deliveryDate =
          "Delivery date cannot be earlier than pickup date.";
      } else {
        delete newErrors.deliveryDate;
      }
    }
    console.log(newErrors);
    setErrorsDateValidation(newErrors);
  };

  const handleDateChange = async (date: any, label: any) => {
    console.log("--------- ", date);
    console.log(label);

    if (label === "Pick Up Date") {
      setPickUpDate(date);
      validateFields("pickupDate", date); // Await the validation function
    } else {
      setDeliveryDate(date);
      validateFields("deliveryDate", date); // Await the validation function
    }
  };

  const handleTimeChange = async (date: any, label: any) => {
    console.log("--------- ", date);
    console.log(label);

    if (label === "Pick Up Time") {
      setPickUpTime(date);
      validateFieldsForTime("pickUpTime", date); // Await the validation function
    } else {
      setDeliveryTime(date);
      validateFieldsForTime("deliveryTime", date); // Await the validation function
    }
  };

  const handleRangeChange = (
    date: Date | null,
    label: string,
    isStart: boolean
  ) => {
    const newErrors = { ...errorsDateValidation }; // Create a copy of the current errors

    if (label === "Pick Up Date") {
      if (isStart) {
        setPickUpDateRangeStart(date); // Update range start date (pickup)
        if (date && pickUpDateRangeEnd && date > pickUpDateRangeEnd) {
          // Start date cannot be after end date
          newErrors.pickUpDate = "Pick-up start date cannot be after end date.";
        } else if (pickUpDateRangeEnd) {
          delete newErrors.pickUpDate; // No error
        }
        validateFields("pickupDate", date); // Validate pickup date
      } else {
        setPickUpDateRangeEnd(date); // Update range end date (pickup)
        if (date && pickUpDateRangeStart && date < pickUpDateRangeStart) {
          // End date cannot be before start date
          newErrors.pickUpDate =
            "Pick-up end date cannot be before start date.";
        } else if (pickUpDateRangeStart) {
          delete newErrors.pickUpDate; // No error
        }
        validateFields("pickupDate", date); // Validate pickup date
      }
    } else if (label === "Delivery Date") {
      if (isStart) {
        setDeliveryDateRangeStart(date); // Update range start date (delivery)
        if (date && deliveryDateRangeEnd && date > deliveryDateRangeEnd) {
          // Start date cannot be after end date
          newErrors.deliveryDate =
            "Delivery start date cannot be after end date.";
        } else {
          delete newErrors.deliveryDate; // No error
        }
        validateFields("deliveryDate", date); // Validate delivery date
      } else {
        setDeliveryDateRangeEnd(date); // Update range end date (delivery)
        if (date && deliveryDateRangeStart && date < deliveryDateRangeStart) {
          // End date cannot be before start date
          newErrors.deliveryDate =
            "Delivery end date cannot be before start date.";
        } else {
          delete newErrors.deliveryDate; // No error
        }
        validateFields("deliveryDate", date); // Validate delivery date
      }
    }

    console.log(newErrors);
    // Set the updated errors to state
    setErrorsDateValidation(newErrors);
  };

  const handleRangeChangeForTime = (
    value: string,
    label: string,
    isStart: boolean
  ) => {
    const newErrors = { ...errorsDateValidation };

    if (label === "Pick Up Time") {
      if (isStart) {
        setPickUpTimeRangeStart(value); // Set start time
        if (pickUpTimeOption === "between" && value && pickUpTimeRangeEnd) {
          if (value >= pickUpTimeRangeEnd) {
            newErrors.pickUpTime = "From Time must be earlier than To Time.";
          } else {
            delete newErrors.pickUpTime; // No error
          }
        }
      } else {
        setPickUpTimeRangeEnd(value); // Set end time
        if (pickUpTimeOption === "between" && value && pickUpTimeRangeStart) {
          if (value <= pickUpTimeRangeStart) {
            newErrors.pickUpTime = "To Time must be later than From Time.";
          } else {
            delete newErrors.pickUpTime; // No error
          }
        }
      }
      validateFieldsForTime("pickUpTime", value); // Validate pick-up time
    } else if (label === "Delivery Time") {
      if (isStart) {
        setDeliveryTimeRangeStart(value); // Set start time
        if (deliveryTimeOption === "between" && value && deliveryTimeRangeEnd) {
          if (value >= deliveryTimeRangeEnd) {
            newErrors.deliveryTime = "From Time must be earlier than To Time.";
          } else {
            delete newErrors.deliveryTime; // No error
          }
        }
      } else {
        setDeliveryTimeRangeEnd(value); // Set end time
        if (
          deliveryTimeOption === "between" &&
          value &&
          deliveryTimeRangeStart
        ) {
          if (value <= deliveryTimeRangeStart) {
            newErrors.deliveryTime = "To Time must be later than From Time.";
          } else {
            delete newErrors.deliveryTime; // No error
          }
        }
      }
      validateFieldsForTime("deliveryTime", value); // Validate delivery time
    }

    setErrorsDateValidation(newErrors); // Update errors state
  };

  const renderDatePicker = (
    option: string,
    singleRef: React.RefObject<any>,
    rangeStartRef: React.RefObject<any>,
    date: Date | null,
    setDate: (value: Date | null) => void,
    dateRangeStart: Date | null,
    setDateRangeStart: (value: Date | null) => void,
    dateRangeEnd: Date | null,
    setDateRangeEnd: (value: Date | null) => void,
    minDate: Date | null,
    label: string
  ) => {
    const today = new Date();

    if (option === "between") {
      return (
        <div className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="absolute z-1 px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
                From Date
              </label>
              <DatePicker
                selected={dateRangeStart}
                onChange={(date) => handleRangeChange(date, label, true)}
                minDate={minDate || today} // Disable dates before today
                placeholderText={"select from date"}
                // ref={rangeStartRef}
                // maxDate={new Date(maxDate)}
                // className="py-2 px-4 text-white rounded-md border border-gray-400 "
                // withPortal={true}
                className="w-full  h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                popperClassName="w-full z-50  text-right justify-center font-bold"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="absolute z-1  px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
                To Date
              </label>
              <DatePicker
                selected={dateRangeEnd}
                // onChange={(date) => setDateRangeEnd(date)}
                onChange={(date) => handleRangeChange(date, label, false)}
                minDate={
                  dateRangeStart
                    ? new Date(
                        new Date(dateRangeStart).getTime() + 24 * 60 * 60 * 1000
                      )
                    : minDate || today
                }
                placeholderText={"select to date"}
                // maxDate={new Date(maxDate)}
                // className="py-2 px-4 text-white rounded-md border border-gray-400 "
                // withPortal={true}
                className="w-full  h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                popperClassName="z-50  text-left justify-center font-bold"
                required
              />
            </div>
          </div>
          {pickUpDateRangeStart &&
            pickUpDateRangeEnd &&
            pickUpDateRangeEnd <= pickUpDateRangeStart && (
              <p className="text-sm text-red-500">
                To Date must be greater than From Date.
              </p>
            )}
        </div>
      );
    } else if (option) {
      return (
        <div className="w-full">
          <div className="mb-4   mt-4 ">
            <label
              //for="origin_postal_code"
              className="absolute z-1 bg-white px-3 py-2 text-sm rounded-xl text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
            >
              {label}
            </label>
            <div className="w-full">
              <DatePicker
                selected={date}
                // onChange={(date) => setDate(date)}
                onChange={(date) => handleDateChange(date, label)}
                minDate={minDate || new Date()}
                placeholderText={"select " + label}
                // ref={singleRef}
                // withPortal={true}
                className={`w-[100%] h-14 px-3 z-50 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
                  (
                    label === "Pick Up Date"
                      ? errorsDateValidation.pickUpDate
                      : errorsDateValidation.deliveryDate
                  )
                    ? "border-red-500"
                    : "border-[#938f99]"
                } outline-none transition-all focus:border-[#6DB8D1]`}
                popperClassName="w-full z-50  text-right justify-center font-bold"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderTimePicker = (
    option: string,
    singleRef: React.RefObject<any>,
    rangeStartRef: React.RefObject<any>,
    time: string,
    setTime: (value: string) => void,
    timeRangeStart: string,
    setTimeRangeStart: (value: string) => void,
    timeRangeEnd: string,
    setTimeRangeEnd: (value: string) => void,
    label: string
  ) => {
    if (option === "between") {
      return (
        <div className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="absolute px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
                {" "}
                From Time
              </label>
              <input
                type="time"
                value={timeRangeStart}
                // onChange={(e) => setTimeRangeStart(e.target.value)}
                onChange={(e) => {
                  setTimeRangeStart(e.target.value);
                  handleRangeChangeForTime(e.target.value, label, true); // Start time
                }}
                className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                // ref={rangeStartRef}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="absolute px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
                {" "}
                To Time
              </label>
              <input
                type="time"
                value={timeRangeEnd}
                // onChange={(e) => setTimeRangeEnd(e.target.value)}
                onChange={(e) => {
                  setTimeRangeEnd(e.target.value);
                  handleRangeChangeForTime(e.target.value, label, false); // End time
                }}
                className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                min={timeRangeStart || "00:00"}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                required
              />
            </div>
          </div>
          {timeRangeStart && timeRangeEnd && timeRangeEnd <= timeRangeStart && (
            <p className="text-sm text-red-500">
              To Time must be later than From Time.
            </p>
          )}
        </div>
      );
    } else if (option) {
      return (
        <div className="mt-4">
          <label className=" px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            {label}
          </label>

          <input
            type="time"
            value={time}
            // onChange={(e) => setTime(e.target.value)}
            onChange={(date) => handleTimeChange(date.target.value, label)}
            // className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
              (
                label === "Pick Up Time"
                  ? errorsDateValidation.pickUpTime
                  : errorsDateValidation.deliveryTime
              )
                ? "border-red-500"
                : "border-[#938f99]"
            } outline-none transition-all focus:border-[#6DB8D1]`}
            // ref={singleRef}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            required
          />
        </div>
      );
    }
  };

  return (
    <div className=" space-y-3 md:space-y-6">
      {/* Pick Up Date */}
      <div className=" text-center text-gray-900 p-1 font-bold">
        Pickup Information
      </div>
      <div className="relative  w-full mb-5 group">
        <label
          htmlFor="pick_up_date_option"
          className="absolute px-3 py-2 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          {" "}
          Pick Up Date
        </label>

        <select
          id="pick_up_date_option"
          value={pickUpDateOption}
          onChange={(e) => {
            setPickUpDateOption(e.target.value);
            validatePickUpDate();
          }}
          // className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          className={`w-full h-14 px-3 z-50 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
            errorsDateValidation.pickUpDate
              ? "border-red-500"
              : "border-[#938f99]"
          } outline-none transition-all focus:border-[#6DB8D1]`}
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="on">On</option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="between">Between</option>
        </select>
        {renderDatePicker(
          pickUpDateOption,
          singlePickUpDatePickerRef,
          rangePickUpStartDatePickerRef,
          pickUpDate,
          setPickUpDate,
          pickUpDateRangeStart,
          setPickUpDateRangeStart,
          pickUpDateRangeEnd,
          setPickUpDateRangeEnd,
          null,
          "Pick Up Date"
        )}
        {/* {errorsDateValidation.pickUpDate && (
          <p className="text-sm px-2 text-red-500">
            {errorsDateValidation.pickUpDate}
          </p>
        )} */}
      </div>
      {/* Pick Up Time */}
      <div className="relative  w-full mb-5 group">
        <label
          htmlFor="pick_up_time_option"
          className="absolute px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          {" "}
          Pick Up Time
        </label>

        <select
          id="pick_up_time_option"
          value={pickUpTimeOption}
          onChange={(e) => setPickUpTimeOption(e.target.value)}
          // className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          className={`w-full h-14 px-3 z-50 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
            errorsDateValidation.pickUpTime
              ? "border-red-500"
              : "border-[#938f99]"
          } outline-none transition-all focus:border-[#6DB8D1]`}
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="on">On</option>

          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="between">Between</option>
        </select>
        {renderTimePicker(
          pickUpTimeOption,
          singlePickUpTimePickerRef,
          rangePickUpStartTimePickerRef,
          pickUpTime,
          setPickUpTime,
          pickUpTimeRangeStart,
          setPickUpTimeRangeStart,
          pickUpTimeRangeEnd,
          setPickUpTimeRangeEnd,
          "Pick Up Time"
        )}
        {/* {errorsDateValidation.pickUpTime && (
          <p className="text-sm px-2 text-red-500">
            {errorsDateValidation.pickUpTime}
          </p>
        )} */}
      </div>
      <div className=" text-center text-gray-900 p-1 font-bold">
        Delivery Information
      </div>
      {/* Delivery Date */}
      <div className="relative  w-full mb-5 group">
        <label
          htmlFor="delivery_date_option"
          className="absolute px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          Delivery Date
        </label>
        <select
          id="delivery_date_option"
          value={deliveryDateOption}
          onChange={(e) => setDeliveryDateOption(e.target.value)}
          // className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          className={`w-full h-14 px-3 z-50 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
            errorsDateValidation.deliveryDate
              ? "border-red-500"
              : "border-[#938f99]"
          } outline-none transition-all focus:border-[#6DB8D1]`}
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="on">On</option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="between">Between</option>
        </select>
        {renderDatePicker(
          deliveryDateOption,
          singleDeliverDatePickerRef,
          rangeDeliverStartDatePickerRef,
          deliveryDate,
          setDeliveryDate,
          deliveryDateRangeStart,
          setDeliveryDateRangeStart,
          deliveryDateRangeEnd,
          setDeliveryDateRangeEnd,
          pickUpDateOption === "between" && pickUpDateRangeEnd
            ? new Date(
                new Date(pickUpDateRangeEnd).getTime() + 24 * 60 * 60 * 1000
              )
            : // .toISOString()
            // .split("T")[0]
            pickUpDate
            ? new Date(new Date(pickUpDate).getTime() + 24 * 60 * 60 * 1000)
            : // .toISOString()
              // .split("T")[0]
              null,
          "Delivery Date"
        )}
        {/* {errorsDateValidation.deliveryDate && (
          <p className="text-sm px-2 text-red-500">
            {errorsDateValidation.deliveryDate}
          </p>
        )} */}
      </div>
      {/* Delivery Time */}
      <div className="relative  w-full mb-5 group">
        <label
          htmlFor="delivery_time_option"
          className="absolute px-3 py-2  text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          Delivery Time
        </label>
        <select
          id="delivery_time_option"
          value={deliveryTimeOption}
          onChange={(e) => {
            setDeliveryTimeOption(e.target.value);
            validateDeliveryTime();
          }}
          // className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          className={`w-full h-14 px-3 z-50 py-2 text-sm text-gray-900 rounded-xl bg-white border ${
            errorsDateValidation.deliveryTime
              ? "border-red-500"
              : "border-[#938f99]"
          } outline-none transition-all focus:border-[#6DB8D1]`}
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="on">On</option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="between">Between</option>
        </select>
        {renderTimePicker(
          deliveryTimeOption,
          singleDeliverTimePickerRef,
          rangeDeliverStartTimePickerRef,
          deliveryTime,
          setDeliveryTime,
          deliveryTimeRangeStart,
          setDeliveryTimeRangeStart,
          deliveryTimeRangeEnd,
          setDeliveryTimeRangeEnd,
          "Delivery Time"
        )}
        {/* {errorsDateValidation.deliveryTime && (
          <p className="text-sm px-2 text-red-500">
            {errorsDateValidation.deliveryTime}
          </p>
        )} */}
      </div>
      <div className="text-center"></div>{" "}
    </div>
  );
};

export default StepDataTest;
