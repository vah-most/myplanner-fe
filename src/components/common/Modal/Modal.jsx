/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { X } from "react-bootstrap-icons";

import "./Modal.scss";

const Modal = ({ children, onClose, title, visible = false }) => {
  return (
    <div
      className={`mpModalContainer ${visible ? "mpModalContainerVisible" : ""}`}
      onClick={onClose}
    >
      <div
        className="mpModal"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="mpModalTitle">
          <div>{title}</div>
          <div className="mpModalClose" onClick={onClose}>
            <X />
          </div>
        </div>
        <div className="mpModalContent">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
