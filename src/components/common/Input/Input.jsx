/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import "./Input.scss";

const Input = ({ containerClassName, error, onChange, type, ...rest }) => {
  const Component = type === "textarea" ? "textarea" : "input";

  return (
    <div className={`mpInput ${containerClassName}`}>
      <Component
        onChange={(e) => onChange && onChange(e.target.value)}
        type={type}
        {...rest}
      />
      {error && <span className="mpInputError">{error}</span>}
    </div>
  );
};

export default Input;
