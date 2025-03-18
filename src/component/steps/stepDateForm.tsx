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
}) => {
  const [dateTest, setDateTest] = useState<Date | null>(null);

  // Min and Max dates for the picker
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
              <label className="text-sm text-gray-400">From Date</label>

              <DatePicker
                selected={dateRangeStart}
                onChange={(date) => setDateRangeStart(date)}
                minDate={minDate || today} // Disable dates before today
                placeholderText={"select from date"}
                ref={rangeStartRef}
                // maxDate={new Date(maxDate)}
                // className="py-2 px-4 text-white rounded-md border border-gray-400 "
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm text-gray-400">To Date</label>
              {/* <input
                type="date"
                value={dateRangeEnd}
                onChange={(e) => setDateRangeEnd(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                // min={today} // Disable dates before today
                min={
                  dateRangeStart
                    ? new Date(
                        new Date(dateRangeStart).getTime() + 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0]
                    : minDate || today
                } // Disable dates before 1 day after "From Date"
                required
              /> */}
              <DatePicker
                selected={dateRangeEnd}
                onChange={(date) => setDateRangeEnd(date)}
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
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
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
          <h2 className="text-gray-400 mt-2">{label}</h2>{" "}
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={minDate || new Date()}
            placeholderText={"select " + label}
            ref={singleRef}
            // maxDate={new Date(maxDate)}
            // className="py-2 px-4 text-white rounded-md border border-gray-400 "
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          />
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
              <label className="text-sm text-gray-400">From Time</label>
              <input
                type="time"
                value={timeRangeStart}
                onChange={(e) => setTimeRangeStart(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                ref={rangeStartRef}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm text-gray-400">To Time</label>
              <input
                type="time"
                value={timeRangeEnd}
                onChange={(e) => setTimeRangeEnd(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
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
        <div>
          <label className="text-sm text-gray-400">{label}</label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
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
      <div className=" text-center p-1 ">pickup date information</div>
      <div className="relative z-10 w-full mb-5 group">
        <label htmlFor="pick_up_date_option" className="text-sm text-gray-400">
          Pick Up Date
        </label>

        <select
          id="pick_up_date_option"
          value={pickUpDateOption}
          onChange={(e) => setPickUpDateOption(e.target.value)}
          className="block py-2 px-4 w-full text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <label htmlFor="pick_up_time_option" className="text-sm text-gray-400">
          Pick Up Time
        </label>
        {/* <select
          id="pick_up_time_option"
          value={pickUpTimeOption}
          onChange={(e) => setPickUpTimeOption(e.target.value)}
          //   className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          className="block py-2.5 px-0 w-full text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          required
        >
          <option value="">Select Option</option>
          <option value="before">Before</option>
          <option value="after">After</option>
          <option value="on">On</option>
          <option value="between">Between</option>
        </select> */}
        <select
          id="pick_up_time_option"
          value={pickUpTimeOption}
          onChange={(e) => setPickUpTimeOption(e.target.value)}
          className="block py-2 px-4 w-full text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      <div className=" text-center p-1 ">delivery date information</div>

      {/* Delivery Date */}
      <div className="relative z-9 w-full mb-5 group">
        <label htmlFor="delivery_date_option" className="text-sm text-gray-400">
          Delivery Date
        </label>
        <select
          id="delivery_date_option"
          value={deliveryDateOption}
          onChange={(e) => setDeliveryDateOption(e.target.value)}
          className="block py-2 px-4 w-full text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <label htmlFor="delivery_time_option" className="text-sm text-gray-400">
          Delivery Time
        </label>
        <select
          id="delivery_time_option"
          value={deliveryTimeOption}
          onChange={(e) => setDeliveryTimeOption(e.target.value)}
          className="block py-2 px-4 w-full text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    </div>
  );
};

export default StepDataTest;
