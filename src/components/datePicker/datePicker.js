import React, { useState } from "react";
import "./datePicker.css";

const DateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    onDateChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    onDateChange({ startDate, endDate: date });
  };

  return (
    <div className="date-range-picker">
      <input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        className="date-input"
      />
      <span>-</span>
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className="date-input"
      />
    </div>
  );
};

export default DateRangePicker;
