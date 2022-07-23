/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import { connect } from "react-redux";

import taskService from "../services/TaskService";
import { syncStatusChange } from "reducers/SyncReducer";

import AppTable from "./common/AppTable";
import AppTaskListItemInfo from "./AppTaskListItemInfo";
import AppTaskListItemGroups from "./AppTaskListItemGroups";
import AppTaskListItemDeadline from "./AppTaskListItemDeadline";
import AppTaskListItemCompleted from "./AppTaskListItemCompleted";
import AppTaskEditor from "./AppTaskEditor";
import AppHeader from "./AppHeader";

import "./AppTaskList.scss";

const taskListFields = [
  {
    field: "title",
    title: "Task",
    size: 0,
    isSortable: true,
  },
  {
    field: "groups",
    title: "Groups",
    size: 2,
    isSortable: true,
    classes: "align-middle",
  },
  {
    field: "deadline",
    title: "Deadline",
    size: 2,
    isSortable: true,
    classes: "text-center",
  },
  {
    field: "isCompleted",
    title: "Done",
    size: 1,
    isSortable: true,
    classes: "text-center",
  },
];

const taskEditorFields = [
  {
    name: "title",
    title: "Title",
    type: "input",
  },
  {
    name: "deadline",
    title: "Deadline",
    type: "date",
  },
  {
    name: "desc",
    title: "Description",
    type: "textarea",
    style: { resize: "none" },
    extra: {
      rows: 5,
    },
  },
  {
    name: "groups",
    title: "Groups",
    type: "tag",
    extraProps: {
      collection: () => taskService.getAllGroups(),
    },
  },
];

class AppTaskList extends Component {
  state = {
    editingTask: {},
    editMode: false,
    sortBy: "",
    sortDirAsc: true,
    tableRowsPerPage: 10,
    tasks: [],
  };

  componentDidMount = async () => {
    document.addEventListener("keydown", this.handleKeyDown, false);
    // await taskService.saveFakeTasks();

    await taskService.reloadTasks();
    const tasks = await taskService.getTasks();
    const sortBy = "deadline"; //TODO: maybe it should remember last sorted column
    this.setState({ tasks, sortBy });
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.synced === true && this.props.synced === false) {
      let editingTask = { ...this.state.editingTask };
      const tasks = await taskService.getTasks();
      if (editingTask) {
        editingTask = tasks.find((t) => t.id === editingTask.id);
        if (!editingTask) editingTask = {};
      }
      this.setState({ tasks, editingTask });
    } else if (prevProps.synced === false && this.props.synced === true) {
      const tasks = await taskService.getTasks();
      this.setState({ tasks, editMode: false });
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      //ESCAPE
      this.setState({ editMode: false });
    } else if (e.keyCode === 113) {
      this.setState({ editMode: true });
    }
  };

  handleRequestAdd = () => {
    this.setState({
      editMode: true,
      editingTask: taskService.generateEmptyTask(),
    });
  };

  handleRequestEdit = (id) => {
    const { tasks } = this.state;

    let editingTask = tasks.find((t) => t.id === id);
    if (editingTask) {
      editingTask = { ...editingTask };
      this.setState({ editMode: true, editingTask });
    }
  };

  handleRequestDelete = (id) => {
    this.handleTaskDelete(id);
  };

  handleEditorClose = () => {
    this.setState({ editMode: false });
  };

  handleSort = (sortBy, sortDirAsc) => {
    this.setState({ sortBy, sortDirAsc });
  };

  saveTaskListChanges = (modifiedTasks) => {
    taskService.setTasks(modifiedTasks);

    this.setState({ tasks: modifiedTasks });

    this.props.syncStatusChange(false);
  };

  handleTaskEdit = (id, name, value) => {
    let { tasks } = this.state;

    const taskIndex = tasks.findIndex((t) => t.id === id);
    tasks = [...tasks];

    let task = null;
    if (taskIndex < 0) {
      task = taskService.generateEmptyTask();
      task.id = taskService.generateNewTaskId();
      task[name] = value;
      tasks.push({ ...task });
    } else {
      task = { ...tasks[taskIndex] };
      task[name] = value;
      tasks[taskIndex] = { ...task };
    }

    this.saveTaskListChanges(tasks);

    this.setState({ editingTask: task });
  };

  handleTaskDelete = (id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter((t) => t.id !== id);

    this.saveTaskListChanges(tasks);
  };

  handleTaskCompleted = (id, value) => {
    let { tasks } = this.state;
    const taskIndex = tasks.findIndex((t) => t.id === id);
    tasks = [...tasks];

    if (taskIndex < 0) return;

    let task = { ...tasks[taskIndex] };
    task.isCompleted = value;
    tasks[taskIndex] = { ...task };

    this.saveTaskListChanges(tasks);

    this.setState({ editingTask: task });
  };

  filterTasks = (tasks) => {
    const hideCompletedTasks = this.props.preferences["hideCompletedTasks"]
      ? this.props.preferences["hideCompletedTasks"]
      : false;

    const searchText = this.props.searchText
      ? this.props.searchText.toLowerCase()
      : "";

    const filteredTasks = tasks.filter((t) => {
      if (hideCompletedTasks && t.isCompleted) return false;

      if (
        typeof t.title === "string" &&
        t.title.toLowerCase().includes(searchText)
      )
        return true;
      if (
        typeof t.desc === "string" &&
        t.desc.toLowerCase().includes(searchText)
      )
        return true;
      for (let group in t.groups) {
        if (t.groups[group].toLowerCase().includes(searchText)) return true;
      }

      return false;
    });

    return filteredTasks;
  };

  sortTasks = (tasks) => {
    const { sortBy, sortDirAsc } = this.state;

    tasks.sort((task1, task2) => {
      if (sortBy === "" || !(sortBy in task1)) return -1;
      if (task1[sortBy] === null) return sortDirAsc ? 1 : -1;
      if (task2[sortBy] === null) return sortDirAsc ? -1 : 1;
      const task1Value =
        typeof task1[sortBy] === "string"
          ? task1[sortBy].toLowerCase()
          : task1[sortBy];
      const task2Value =
        typeof task2[sortBy] === "string"
          ? task2[sortBy].toLowerCase()
          : task2[sortBy];
      if (task1Value < task2Value) return sortDirAsc ? -1 : 1;
      return sortDirAsc ? 1 : -1;
    });

    return tasks;
  };

  render() {
    const {
      editingTask,
      editMode,
      sortBy,
      sortDirAsc,
      tableRowsPerPage,
      tasks,
    } = this.state;
    const { className } = this.props;

    const filteredTasks = this.filterTasks(tasks);
    const sortedTasks = this.sortTasks(filteredTasks);

    const data = sortedTasks.map((task) => {
      const item = {
        id: task.id,
        className: task.isCompleted ? "completedTaskRow" : "",
        fields: [
          {
            field: "title",
            render: () => <AppTaskListItemInfo task={task} />,
          },
          {
            field: "groups",
            render: () => <AppTaskListItemGroups groups={task.groups} />,
            cellClasses: "align-middle",
          },
          {
            field: "deadline",
            render: () => <AppTaskListItemDeadline deadline={task.deadline} />,
            cellClasses: "text-center align-middle taskDue",
          },
          {
            field: "isCompleted",
            render: () => (
              <AppTaskListItemCompleted
                taskId={task.id}
                value={task.isCompleted}
                onChange={this.handleTaskCompleted}
              />
            ),
            cellClasses: "text-center align-middle",
          },
        ],
      };
      return item;
    });

    return (
      <div className={`${className} mainView`}>
        <AppTaskEditor
          fields={taskEditorFields}
          hide={!editMode}
          onChange={this.handleTaskEdit}
          onClose={this.handleEditorClose}
          task={editingTask}
          width="40%"
        />
        <div className="taskTableContainer">
          <AppHeader className="mainHeader" />
          <AppTable
            className="taskTable"
            compactFields={["title", "deadline"]}
            compactMode={editMode}
            data={data}
            header={taskListFields}
            onRequestAdd={this.handleRequestAdd}
            onRequestEdit={this.handleRequestEdit}
            onRequestDelete={this.handleRequestDelete}
            onSort={this.handleSort}
            operationsInCompactMode={true}
            rowsPerPage={tableRowsPerPage}
            sortBy={sortBy}
            sortDirAsc={sortDirAsc}
            style={{ width: editMode ? "99%" : "99%" }}
          />
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchText: state.search.value,
  preferences: state.preferences.value,
  synced: state.sync.value,
});

const mapDispatchToProps = { syncStatusChange };

export default connect(mapStateToProps, mapDispatchToProps)(AppTaskList);
