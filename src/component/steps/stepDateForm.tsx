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
        deliveryTimeRangeStart <= pickUpTimeRangeEnd
      ) {
        setErrorsDateValidation((prevState: any) => ({
          ...prevState,
          deliveryTime: "Delivery time cannot be earlier than pick-up time.",
        }));
      }
    }
  };

  const validateFields = (
    field: "pickupDate" | "deliveryDate",
    value: Date | null
  ) => {
    const newErrors = { ...errorsDateValidation };

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
      } else if (pickUpDate && value < pickUpDate) {
        newErrors.deliveryDate =
          "Delivery date cannot be earlier than pickup date.";
      } else {
        delete newErrors.deliveryDate;
      }
    }

    setErrorsDateValidation(newErrors);
  };

  const handleDateChange = async (date: any, label: any) => {
    console.log("--------- ", date);
    console.log(label);

    if (label === "Pick Up Date") {
      setPickUpDate(date);
      validatePickUpDate(); // Await the validation function

      console.log("pppppppppppp ", date, pickUpDate); // Log the passed date directly
    } else {
      validateFields("deliveryDate", date); // Await the validation function
      setDeliveryDate(date);

      console.log("dddddddddd ", date, deliveryDate); // Log the passed date directly
    }
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
              <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"></label>
              <DatePicker
                selected={dateRangeStart}
                onChange={(date) => {
                  setDate(date);
                  setDateRangeStart(date);
                  setDateRangeStart(date);

                  if (label === "Pick Up Date") {
                    validatePickUpDate();
                  } else {
                    validateDeliveryDate();
                  }
                }}
                minDate={minDate || today} // Disable dates before today
                placeholderText={"select from date"}
                // ref={rangeStartRef}
                // maxDate={new Date(maxDate)}
                // className="py-2 px-4 text-white rounded-md border border-gray-400 "
                withPortal={true}
                className="w-full  h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"></label>
              <DatePicker
                selected={dateRangeEnd}
                // onChange={(date) => setDateRangeEnd(date)}
                onChange={(date) => {
                  setDateRangeEnd(date);
                  if (label === "Pick Up Date") {
                    validatePickUpDate();
                  } else {
                    validateDeliveryDate();
                  }
                }}
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
                withPortal={true}
                className="w-full  h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
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
          <div className="mb-4 relative top-0 mt-4">
            <label
              //for="origin_postal_code"
              className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
            >
              {label}
            </label>

            <DatePicker
              selected={date}
              // onChange={(date) => setDate(date)}
              onChange={(date) => handleDateChange(date, label)}
              minDate={minDate || new Date()}
              placeholderText={"select " + label}
              // ref={singleRef}
              withPortal={true}
              className="w-full h-14 z-50 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
            />
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
              <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
                {" "}
                From Time
              </label>
              <input
                type="time"
                value={timeRangeStart}
                // onChange={(e) => setTimeRangeStart(e.target.value)}
                onChange={(e) => {
                  setTimeRangeStart(e.target.value);
                  if (label === "Pick Up Time") {
                    validatePickUpTime();
                  } else {
                    validateDeliveryTime();
                  }
                }}
                className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                ref={rangeStartRef}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
                {" "}
                To Time
              </label>
              <input
                type="time"
                value={timeRangeEnd}
                // onChange={(e) => setTimeRangeEnd(e.target.value)}
                onChange={(e) => {
                  setTimeRangeEnd(e.target.value);
                  if (label === "Pick Up Time") {
                    validatePickUpTime();
                  } else {
                    validateDeliveryTime();
                  }
                }}
                className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
                min={timeRangeStart || "00:00"}
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
          <label className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            {" "}
            {label}
          </label>

          <input
            type="time"
            value={time}
            // onChange={(e) => setTime(e.target.value)}
            onChange={(e) => {
              setTime(e.target.value);

              if (label === "Pick Up Time") {
                validatePickUpTime();
                setPickUpTime(e.target.value);
              } else {
                validateDeliveryTime();
                setPickUpTime(e.target.value);
              }
            }}
            className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
            ref={singleRef}
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
      <div className="relative z-10 w-full mb-5 group">
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
          className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="on">On</option>
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
      </div>
      {/* Pick Up Time */}
      <div className="relative z-8 w-full mb-5 group">
        <label
          htmlFor="pick_up_time_option"
          className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
        >
          {" "}
          Pick Up Time
        </label>

        <select
          id="pick_up_time_option"
          value={pickUpTimeOption}
          onChange={(e) => setPickUpTimeOption(e.target.value)}
          className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="on">On</option>
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
          className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="on">On</option>
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
      </div>
      {/* Delivery Time */}
      <div className="relative z-8 w-full mb-5 group">
        <label
          htmlFor="delivery_time_option"
          className="absolute px-3 py-2 z-20 text-sm rounded-xl bg-white  text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all"
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
          className="w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border border-[#938f99] outline-none transition-all focus:border-[#6DB8D1] focus:ring-1 focus:ring-[#6DB8D1]"
          aria-label="Select pick-up time option"
          required
        >
          <option value="" disabled hidden>
            -- Select Option --
          </option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="on">On</option>
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
      </div>
      <div className="text-center">
        {errorsDateValidation.pickUpDate && (
          <p className="text-sm mr-1 text-red-500">
            {errorsDateValidation.pickUpDate}
          </p>
        )}
        {errorsDateValidation.pickUpTime && (
          <p className="text-sm mr-1 text-red-500">
            {errorsDateValidation.pickUpTime}
          </p>
        )}
        {errorsDateValidation.deliveryDate && (
          <p className="text-sm mr-1 text-red-500">
            {errorsDateValidation.deliveryDate}
          </p>
        )}
        {errorsDateValidation.deliveryTime && (
          <p className="text-sm mr-1 text-red-500">
            {errorsDateValidation.deliveryTime}
          </p>
        )}
      </div>{" "}
    </div>
  );
};

export default StepDataTest;
