/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { useEffect, useState } from "react";
import moment from "moment";

import { getExistingTaskTags } from "utils/taskUtils";

import Button from "components/common/Button";
import Input from "components/common/Input";
import TagCollection from "components/common/TagCollection";
import DatePicker from "components/common/DatePicker";

import TaskEditorRow from "components/TaskEditorRow";

import "./TaskEditor.scss";

const TaskEditor = ({ onChange, task, taskErrors, tasks }) => {
  const [taskProps, setTaskProps] = useState({ ...task });

  const handlePropChange = (prop, value) => {
    const modified = { ...taskProps };
    modified[prop] = value;
    setTaskProps(modified);
  };

  const handleTaskSubmit = () => {
    onChange && onChange(taskProps);
  };

  useEffect(() => {
    setTaskProps({ ...task });
  }, [task]);

  const allTags = new Set([...getExistingTaskTags(tasks), ...taskProps.tags]);

  return (
    <div className="taskEditorContainer">
      <div className="taskEditorContent">
        <TaskEditorRow label="Title">
          <Input
            className="taskEditorTitleInput"
            error={taskErrors.title}
            type="text"
            onChange={(value) => handlePropChange("title", value)}
            placeholder="Task title"
            value={taskProps.title}
          />
        </TaskEditorRow>
        <TaskEditorRow label="Description">
          <Input
            className="taskEditorDescInput"
            error={taskErrors.desc}
            rows={3}
            type="textarea"
            onChange={(value) => handlePropChange("desc", value)}
            placeholder="Task Description"
            value={taskProps.desc}
          />
        </TaskEditorRow>
        <TaskEditorRow label="Tags">
          <TagCollection
            className="taskEditorTagsInput"
            collection={Array.from(allTags)}
            onChange={(value) => handlePropChange("tags", value)}
            tags={taskProps.tags}
          />
        </TaskEditorRow>
        <TaskEditorRow label="Deadline">
          <DatePicker
            className="taskEditorDeadlineInput"
            onChange={(value) => {
              const deadline = value
                ? moment(value).format("YYYY-MM-DD hh:mm:ss")
                : null;
              handlePropChange("deadline", deadline);
            }}
            value={taskProps.deadline}
          />
        </TaskEditorRow>
      </div>
      <div className="taskEditorSubmitContainer" onClick={handleTaskSubmit}>
        <Button className="taskEditorSubmit">Save</Button>
      </div>
    </div>
  );
};

export default TaskEditor;
