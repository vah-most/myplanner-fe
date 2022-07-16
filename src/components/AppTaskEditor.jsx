/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppIcon from "./common/AppIcon";
import AppTitledInput from "./common/AppTitledInput";

import "./AppTaskEditor.scss";

const AppTaskEditor = ({
  fields,
  hide = true,
  onChange,
  onClose,
  task,
  width = "100%",
}) => {
  const getEditorTitle = () => {
    if (task.id > 0) return "Modify Task";
    return task.title ? task.title : "New Task";
  };

  return (
    <div className="taskEditor" style={{ width: hide ? "0%" : width }}>
      <div className="taskEditorTitle">
        <div className="taskEditorCloser">
          <AppIcon
            className="hand taskEditorCloserIcon"
            name="times"
            onClick={onClose}
          />
        </div>
        <span>{getEditorTitle()}</span>
      </div>
      <div className="taskEditorFieldsContainer">
        {task &&
          fields.map((item, index) => {
            return (
              <AppTitledInput
                key={index}
                className="titledInputGeneric"
                extraProps={item.extraProps}
                onChange={(value) => onChange(task.id, item.name, value)}
                placeholder={item.title}
                style={item.style}
                type={item.type}
                value={task[item.name]}
                {...item.extra}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AppTaskEditor;
