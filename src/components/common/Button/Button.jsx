/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import "./Button.scss";

const Button = ({ children, className, onClick }) => {
  return (
    <div className={`mpButton ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
