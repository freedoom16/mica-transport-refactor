// components/DateTimePickerSection.tsx
import React from "react";
import DatePicker from "react-datepicker";

const today = new Date();

export const LabeledDatePicker = ({
  label,
  selected,
  onChange,
  minDate,
  placeholder,
  className = "",
  popperClassName = "",
}: {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  placeholder: string;
  className?: string;
  popperClassName?: string;
}) => (
  <div className="w-1/2">
    <label className="absolute z-1 px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
      {label}
    </label>
    <DatePicker
      selected={selected}
      onChange={onChange}
      minDate={minDate || today}
      placeholderText={placeholder}
      className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border border-[#938f99] outline-none focus:border-[#2098ee] focus:ring-1 focus:ring-[#6DB8D1] ${className}`}
      popperClassName={`z-50 ${popperClassName}`}
      required
    />
  </div>
);

export const LabeledTimeInput = ({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
}) => (
  <div className="w-1/2">
    <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
      {label}
    </label>
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      className="w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border border-[#938f99] outline-none focus:border-[#2098ee] focus:ring-1 focus:ring-[#6DB8D1]"
      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
      required
    />
  </div>
);

export const RenderDatePicker = ({
  option,
  date,
  onChange,
  rangeStart,
  setRangeStart,
  rangeEnd,
  setRangeEnd,
  minDate,
  label,
  error,
  handleDateChange,
  handleRangeChange,
}: {
  option: string;
  date: Date | null;
  onChange: (date: Date | null) => void;
  rangeStart: Date | null;
  setRangeStart: (date: Date | null) => void;
  rangeEnd: Date | null;
  setRangeEnd: (date: Date | null) => void;
  minDate: Date | null;
  label: string;
  error?: boolean;
  handleDateChange: (date: Date | null, label: string) => void;
  handleRangeChange: (
    date: Date | null,
    label: string,
    isStart: boolean
  ) => void;
}) => {
  if (option === "between") {
    return (
      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <LabeledDatePicker
            label="From Date"
            selected={rangeStart}
            onChange={(date) => handleRangeChange(date, label, true)}
            minDate={minDate || today}
            placeholder="select from date"
          />
          <LabeledDatePicker
            label="To Date"
            selected={rangeEnd}
            onChange={(date) => handleRangeChange(date, label, false)}
            minDate={
              rangeStart
                ? new Date(rangeStart.getTime() + 24 * 60 * 60 * 1000)
                : minDate || today
            }
            placeholder="select to date"
          />
        </div>
        {rangeStart && rangeEnd && rangeEnd <= rangeStart && (
          <p className="text-sm text-red-500">
            To Date must be greater than From Date.
          </p>
        )}
      </div>
    );
  }

  if (option) {
    return (
      <div className="w-full mt-4">
        <LabeledDatePicker
          label={label}
          selected={date}
          onChange={(date) => handleDateChange(date, label)}
          minDate={minDate || today}
          placeholder={`select ${label}`}
          className={error ? "border-red-500" : "border-[#938f99]"}
        />
      </div>
    );
  }

  return null;
};

export const RenderTimePicker = ({
  option,
  time,
  onChange,
  rangeStart,
  setRangeStart,
  rangeEnd,
  setRangeEnd,
  label,
  handleTimeChange,
  handleRangeChangeForTime,
}: {
  option: string;
  time: string;
  onChange: (value: string) => void;
  rangeStart: string;
  setRangeStart: (value: string) => void;
  rangeEnd: string;
  setRangeEnd: (value: string) => void;
  label: string;
  handleTimeChange: (value: string, label: string) => void;
  handleRangeChangeForTime: (
    value: string,
    label: string,
    isStart: boolean
  ) => void;
}) => {
  if (option === "between") {
    return (
      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <LabeledTimeInput
            label="From Time"
            value={rangeStart}
            onChange={(val) => {
              setRangeStart(val);
              handleRangeChangeForTime(val, label, true);
            }}
          />
          <LabeledTimeInput
            label="To Time"
            value={rangeEnd}
            onChange={(val) => {
              setRangeEnd(val);
              handleRangeChangeForTime(val, label, false);
            }}
            min={rangeStart}
          />
        </div>
        {rangeStart && rangeEnd && rangeEnd <= rangeStart && (
          <p className="text-sm text-red-500">
            To Time must be later than From Time.
          </p>
        )}
      </div>
    );
  }

  if (option) {
    return (
      <div className="mt-4">
        <LabeledTimeInput
          label={label}
          value={time}
          onChange={(val) => handleTimeChange(val, label)}
          min="00:00"
        />
      </div>
    );
  }

  return null;
};
