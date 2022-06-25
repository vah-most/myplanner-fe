import React from "react";
import Datetime from "react-datetime";
import { now } from "moment";

import { getRemainingTime } from "../utils/utils";
import AppIcon from "./common/AppIcon";

import "react-datetime/css/react-datetime.css";
import "font-awesome/css/font-awesome.css";
import "./AppTaskListItemDeadline.scss";

const AppTaskListItemDeadline = ({ deadline, taskId, onTaskDeadlineChange }) => {
    let due = "";
    if (deadline) {
        const currTime = now();
        due = new Date(deadline).getTime();
        due = getRemainingTime(currTime, due);
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

    return (
        <React.Fragment>
            {due}
            <div className="task-due-edit">
                <Datetime
                    closeOnSelect={false}
                    closeOnClickOutside={true}
                    onChange={(selectedDate) => {
                        onTaskDeadlineChange && onTaskDeadlineChange(taskId, selectedDate);
                    }}
                    renderInput={renderTaskDeadlineCalendar}
                    value={deadline ? new Date(deadline).getTime() : null}
                />
            </div>
        </React.Fragment>

    );
};

export default AppTaskListItemDeadline;