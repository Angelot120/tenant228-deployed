import React from "react";
import "./Input.css";

function Input({
  value,
  onChange,
  placeholder,
  type,
  label,
  reference,
  className,
}) {
  return (
    <div>
      <label htmlFor={reference}>{label}</label>
      <br />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type || "text"}
        id={reference}
        className={className}
      />
    </div>
  );
}

function FloatInput({ value, onChange, placeholder, type, label, reference }) {
  return (
    <div className="float-input">
      <input
        id={reference}
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="form-control"
        required
      />
      <label htmlFor={reference}>{label}</label>
    </div>
  );
}

function DistanceInput({
  value,
  onChange,
  placeholder,
  type,
  label,
  reference,
}) {
  return (
    <div className="float-input">
      <input
        id={reference}
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="form-control"
        required
      />
      <label htmlFor={reference}>{label}</label>
    </div>
  );
}

function RadioInput({ value, checked, onChange, type, label, id, name }) {
  return (
    <div>
      <input
        type={type || "text"}
        value={value}
        checked={checked}
        onChange={onChange}
        id={id}
        name={name}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Textarea({ value, onChange, cols, rows, maxLength, name }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        name={name}
        cols={cols}
        rows={rows}
        maxLength={maxLength}
        className="bref-description"
      ></textarea>
    </div>
  );
}

export { Input, DistanceInput, RadioInput, Textarea, FloatInput };
