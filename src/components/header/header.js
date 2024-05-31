import React, { useEffect, useState } from "react";
import "./header.css";
import DateRangePicker from "../datePicker/datePicker";

const Header = (props) => {
  const { openDrawer } = props;
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const handleDateChange = (range) => {
    setDateRange(range);
  };
  return (
    <>
      <div
        className={`${
          openDrawer ? "header-opacity" : "bg-white flex flex-row items-center"
        }`}
      >
        <div className="pw-header flex flex-row grow justify-between p-4 items-center">
          <div className="flex flex-row gap-5">
            Rudra Transporter - Transporter
          </div>
          <div className="flex flex-row gap-5 justify-end">
            <div>
              <DateRangePicker onDateChange={handleDateChange} />
            </div>
            <div className="header-select">
              <select
                id="country"
                name="country"
                //  onChange={(e) => {
                //    handleChange(e, "country");
                //  }}
              >
                <option value={"India"}>{"India"}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Header.propTypes = {}

export default Header;
