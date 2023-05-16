import React, { useState } from "react";
import "./AnimatedInput.css";
import { HostEaseHandlerFunction } from "../../../Types/Types";

const AnimatedInput = (props: {
  onChange?: HostEaseHandlerFunction;
  className?: string;
  label: string;
  name: string;
  value?: string;
  type?: string;
}) => {
  const { onChange, label, className, name, type, value } = props;

  const [isFocused, setIsFocused] = useState(value ? true : false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange && onChange(event.target.value, name)
  } 

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === "") {
      setIsFocused(false);
    }
  };

  return (
    <div className={`input-container ${isFocused ? "focused" : ""} ${className}`}>
      <label className="input-label">{label}</label>
      <input
        type={type}
        name={name}
        value={inputValue}
        className="custom-input"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInput}
      />
    </div>
  );
};

export default AnimatedInput;
