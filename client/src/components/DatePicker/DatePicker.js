import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Input from "../input/Input";
import "./datepicker.css";

export default function DatePickerComponent({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Birth Date"
          value={value}
          onChange={onChange}
          className="datepicker"
          inputFormat="MM/DD/YYYY"
          renderInput={(params) => (
            <Input
              {...params}
              id="birthDate"
              name="birthDate"
              size="lg"
              required
              placeholder="Select your birth date"
            />
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
