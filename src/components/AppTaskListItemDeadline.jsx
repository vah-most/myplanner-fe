/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { now } from "moment";

import { getRemainingDays } from "../utils/utils";

import "./AppTaskListItemDeadline.scss";
import { Bell, CalendarCheck, CalendarX } from "react-bootstrap-icons";

const AppTaskListItemDeadline = ({ deadline }) => {
  let due = null;
  if (deadline) {
    const currTime = now();
    due = new Date(deadline).getTime();
    due = getRemainingDays(currTime, due);
  }

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
        <Bell className="deadlineIcon deadlineTextAlert deadlineIconAlert" />
      );

    if (due < 0)
      return <CalendarX className="deadlineIcon deadlineTextPassed" />;

    return <CalendarCheck className="deadlineIcon deadlineTextOk" />;
  };

  return (
    <div>
      {displayDueIcon(due)}
      {displayDueDays(due)}
    </div>
  );
};

export default AppTaskListItemDeadline;
