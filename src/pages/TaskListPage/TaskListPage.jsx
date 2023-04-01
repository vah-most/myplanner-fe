import React from "react";

import TaskList from "components/TaskList";

import "./TaskListPage.scss";

const TaskListPage = ({ className }) => {
  return <TaskList className={className} />;
};

export default TaskListPage;
