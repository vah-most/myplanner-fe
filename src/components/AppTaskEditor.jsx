/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { useState, useEffect } from "react";

import AppButton from "./common/AppButton";
import AimoTitledInput from "@aimo.ui/aimo-titledinput";
import AimoTooltip from "@aimo.ui/aimo-tooltip";

import "./AppTaskEditor.scss";
import { X } from "react-bootstrap-icons";

const AppTaskEditor = ({
  className,
  fields,
  hide = true,
  onChange,
  onSubmit,
  onClose,
  task,
  taskErrors = {},
}) => {
  const [values, setValues] = useState(task);
  const getEditorTitle = () => {
    return task.title ? task.title : "New Task";
  };

  useEffect(() => {
    setValues(task);
  }, [task._id]);

  const handlePropChange = (prop, value) => {
    if (onChange) onChange(task._id, prop, value);

    let modifiedValues = { ...values };
    modifiedValues[prop] = value;

    setValues(modifiedValues);
  };

  const hidingStyle = hide ? { width: "0%" } : null;
  return (
    <div className={`taskEditor ${className}`} style={hidingStyle}>
      <div className="taskEditorTitle">
        <div className="taskEditorCloser">
          <X className="hand taskEditorCloserIcon" onClick={onClose} />
          <AimoTooltip target="button_close_editor">
            <span>Close </span>
            <span className="shortcutText">(ESC)</span>
          </AimoTooltip>
        </div>
        <span>{getEditorTitle()}</span>
      </div>
      <div className="taskEditorFieldsContainer">
        {values &&
          fields.map((item, index) => {
            return (
              <AimoTitledInput
                key={index}
                alwaysShowLabel={true}
                className="titledInputGeneric"
                error={item.name in taskErrors ? taskErrors[item.name] : null}
                extraProps={item.extraProps}
                onChange={(value) => handlePropChange(item.name, value)}
                placeholder={item.title}
                style={item.style}
                inputType={item.type}
                value={values[item.name]}
                {...item.extra}
              />
            );
          })}
        {onSubmit && (
          <AppButton
            className="taskEditorSubmitButton"
            onClick={() => onSubmit(values)}
          >
            Save
          </AppButton>
        )}
      </div>
    </div>
  );
};

export default AppTaskEditor;
