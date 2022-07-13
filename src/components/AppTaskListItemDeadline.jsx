/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import Datetime from "react-datetime";
import { now } from "moment";

import { getRemainingDays } from "../utils/utils";

import AppIcon from "./common/AppIcon";

import "react-datetime/css/react-datetime.css";
import "./AppTaskListItemDeadline.scss";

const AppTaskListItemDeadline = ({
  deadline,
  onTaskDeadlineChange,
  taskId,
}) => {
  let due = null;
  if (deadline) {
    const currTime = now();
    due = new Date(deadline).getTime();
    due = getRemainingDays(currTime, due);
  }

  const renderTaskDeadlineCalendar = (props, openCalendar, closeCalendar) => {
    function clear() {
      props.onChange({ target: { value: "" } });
    }
    return (
      <div>
        <input {...props} className="d-none" />
        <AppIcon name="calendar" className="hand" onClick={openCalendar} />
        {props.value && (
          <AppIcon name="calendar-times-o" className="hand" onClick={clear} />
        )}
      </div>
    );
  };

  const displayDueDays = (due) => {
    if (due === null) return null;

    let dueTitle = "";
    const deadlineClassName =
      "deadlineText " +
      (due === 0
        ? "deadlineTextAlert"
        : due > 0
        ? "deadlineTextOk"
        : "deadlineTextPassed");
    switch (due) {
      case 1:
        dueTitle = "Tomorrow";
        break;
      case 0:
        dueTitle = "Today";
        break;
      case -1:
        dueTitle = "Yesterday";
        break;
      default:
        if (due < 0) dueTitle = `Passed ${-due} days`;
        else dueTitle = `In ${due} days`;
    }

    return <span className={deadlineClassName}>{dueTitle}</span>;
  };

  const displayDueIcon = (due) => {
    if (due === null) return null;

    if (due === 0)
      return (
        <AppIcon
          name="bell"
          className="deadlineIcon deadlineTextAlert deadlineIconAlert"
        />
      );

    if (due < 0)
      return (
        <AppIcon
          name="calendar-times-o"
          className="deadlineIcon deadlineTextPassed"
        />
      );

    return (
      <AppIcon
        name="calendar-check-o"
        className="deadlineIcon deadlineTextOk"
      />
    );
  };

  return (
    <div>
      {displayDueIcon(due)}
      {displayDueDays(due)}
      {onTaskDeadlineChange && (
        <div className="taskDueEdit">
          <Datetime
            closeOnClickOutside={true}
            closeOnSelect={false}
            onChange={(selectedDate) => {
              onTaskDeadlineChange &&
                onTaskDeadlineChange(taskId, selectedDate);
            }}
            renderInput={renderTaskDeadlineCalendar}
            value={deadline ? new Date(deadline).getTime() : null}
          />
        </div>
      )}
    </div>
  );
};

export default AppTaskListItemDeadline;
