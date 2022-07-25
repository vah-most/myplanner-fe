/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppIcon from "./common/AppIcon";
import AppTitledInput from "./common/AppTitledInput";
import AppTooltip from "./common/AppTooltip";

import "./AppTaskEditor.scss";

const AppTaskEditor = ({
  className,
  fields,
  hide = true,
  onChange,
  onClose,
  task,
}) => {
  const getEditorTitle = () => {
    if (task.id > 0) return "Modify Task";
    return task.title ? task.title : "New Task";
  };

  const hidingStyle = hide ? { width: "0%" } : null;
  return (
    <div className={`taskEditor ${className}`} style={hidingStyle}>
      <div className="taskEditorTitle">
        <div className="taskEditorCloser">
          <AppIcon
            className="hand taskEditorCloserIcon"
            id="button_close_editor"
            name="times"
            onClick={onClose}
          />
          <AppTooltip target="button_close_editor">Close (ESC)</AppTooltip>
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
                inputType={item.type}
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
