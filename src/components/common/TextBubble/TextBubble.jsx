/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import { X } from "react-bootstrap-icons";

import "./TextBubble.scss";

function TextBubble({
  backgroundColor,
  className = "",
  onDelete,
  style = {},
  text,
}) {
  const [displayDelete, setDisplayDelete] = useState(false);

  return (
    <div
      className={`textBubble ${className}`}
      onMouseOut={() => {
        setDisplayDelete(false);
      }}
      onMouseOver={() => {
        setDisplayDelete(true);
      }}
      style={{ backgroundColor: backgroundColor, ...style }}
    >
      {onDelete && (
        <div
          className="textBubbleDelete"
          onClick={() => onDelete && onDelete(text)}
          style={
            displayDelete ? { visibility: "visible" } : { visibility: "hidden" }
          }
        >
          <X />
        </div>
      )}
      <span>{text}</span>
    </div>
  );
}

export default TextBubble;
