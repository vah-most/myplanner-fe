/*
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { Calendar } from "react-bootstrap-icons";
import ReactDatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "./DatePicker.scss";

const DatePicker = ({ value, className, onChange }) => {
  return (
    <ReactDatePicker
      calendarClassName="mpDatePickerCalendar"
      calendarIcon={
        <Calendar
          className="mpDatePickerIcon mpDatePickerCalendarIcon"
          name="calendar"
        />
      }
      className={`mpDatePicker ${className}`}
      onChange={onChange}
      value={value ? new Date(value) : null}
    />
  );
};

export default DatePicker;
