/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import { connect } from "react-redux";

import { KEY_CODES } from "utils/utils";
import taskService from "../services/TaskService";
import { syncStatusChange } from "reducers/SyncReducer";

import AimoTable from "@aimo.ui/aimo-table";
import AppTaskListItemInfo from "./AppTaskListItemInfo";
import AppTaskListItemGroups from "./AppTaskListItemGroups";
import AppTaskListItemDeadline from "./AppTaskListItemDeadline";
import AppTaskListItemCompleted from "./AppTaskListItemCompleted";
import AppTaskEditor from "./AppTaskEditor";
import AppHeader from "./AppHeader";

import "./AppTaskList.scss";

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
    editingTaskErrors: {},
    editMode: false,
    sortBy: "",
    sortDirAsc: true,
    tableRowsPerPage: 10,
    tasks: [],
  };

  componentDidMount = async () => {
    document.addEventListener("keydown", this.handleKeyDown, false);

    await taskService.reloadTasks();
    const tasks = await taskService.getTasks();
    console.log("tasks", tasks);
    const sortBy = "deadline"; //TODO: maybe it should remember last sorted column
    this.setState({
      tasks,
      sortBy,
      editingTask: { ...taskService.generateEmptyTask() },
    });
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.synced === true && this.props.synced === false) {
      let editingTask = { ...this.state.editingTask };
      const tasks = await taskService.getTasks();
      if (editingTask) {
        editingTask = tasks.find((t) => t._id === editingTask._id);
        if (!editingTask) editingTask = {};
      }
      this.setState({ tasks, editingTask });
    } else if (prevProps.synced === false && this.props.synced === true) {
      const tasks = await taskService.getTasks();
      this.setState({ tasks, editMode: false });
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === KEY_CODES.KEY_ESCAPE) {
      this.setState({ editMode: false });
    } else if (e.keyCode === KEY_CODES.KEY_F2) {
      if (!this.state.editMode) this.handleRequestAdd();
    }
  };

  handleRequestAdd = () => {
    this.setState({
      editMode: true,
      editingTask: { ...taskService.generateEmptyTask() },
      editingTaskErrors: {},
    });
  };

  handleRequestEdit = (task) => {
    const { tasks } = this.state;

    let editingTask = tasks.find((t) => t._id === task._id);
    if (editingTask) {
      editingTask = { ...editingTask };
      this.setState({ editMode: true, editingTask });
    }
  };

  handleRequestDelete = (task) => {
    this.handleTaskDelete(task._id);
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

  saveTask = (task) => {
    let { tasks } = this.state;
    const taskIndex = task._id
      ? tasks.findIndex((t) => t._id === task._id)
      : null;

    if (taskIndex === null) task._id = taskService.generateNewTaskId();

    const taskErrors = taskService.checkTaskErrors(task);
    if (taskErrors !== null) {
      this.setState({ editingTask: task, editingTaskErrors: taskErrors });
      return false;
    }

    if (taskIndex === null || taskIndex < 0) {
      tasks.push({ ...task });
    } else {
      tasks[taskIndex] = { ...task };
    }

    this.saveTaskListChanges(tasks);

    this.setState({ editingTask: task, editingTaskErrors: {} });

    return true;
  };

  handleTaskEdit = (id, name, value) => {
    let { tasks } = this.state;

    const taskIndex = tasks.findIndex((t) => t._id === id);
    tasks = [...tasks];

    let task = null;
    if (taskIndex < 0) {
      task = { ...taskService.generateEmptyTask() };
    } else {
      task = { ...tasks[taskIndex] };
    }
    task[name] = value;

    this.saveTask(task);
  };

  handleTaskDelete = (id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter((t) => t._id !== id);

    this.saveTaskListChanges(tasks);
  };

  handleTaskCompleted = (id, value) => {
    let { tasks } = this.state;
    const taskIndex = tasks.findIndex((t) => t._id === id);
    tasks = [...tasks];

    if (taskIndex < 0) return;

    let task = { ...tasks[taskIndex] };
    task.isCompleted = value;
    tasks[taskIndex] = { ...task };

    this.saveTaskListChanges(tasks);

    this.setState({ editingTask: task });
  };

  handleTaskSubmit = (task) => {
    if (this.saveTask(task)) {
      this.handleEditorClose();
    }
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

  getTaskListFields = () => {
    const { editMode } = this.state;
    return editMode
      ? [
          {
            field: "title",
            title: "Task",
            size: 0,
            isSortable: true,
          },
          {
            field: "deadline",
            title: "Deadline",
            size: 2,
            isSortable: true,
            classes: "text-center",
          },
        ]
      : [
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
  };

  render() {
    const {
      editingTask,
      editingTaskErrors,
      editMode,
      sortBy,
      sortDirAsc,
      tableRowsPerPage,
      tasks,
    } = this.state;
    const { className } = this.props;

    const taskListFields = this.getTaskListFields();
    const filteredTasks = this.filterTasks(tasks);
    const data = this.sortTasks(filteredTasks);

    const renderFuncs = {};
    const columnProps = {
      title: {
        headerTitle: "Task",
        headerClassName: "",
        isSortable: true,
        renderFunc: (task) => <AppTaskListItemInfo task={task} />,
      },
      groups: {
        headerTitle: "Groups",
        isSortable: true,
        headerClassName: "align-middle taskTableCenterHeader",
        cellClassName: "align-middle col-2",
        renderFunc: (task) => <AppTaskListItemGroups groups={task.groups} />,
      },
      deadline: {
        headerTitle: "Deadline",
        isSortable: true,
        headerClassName: "col-2 taskTableCenterHeader",
        cellClassName: "col-2 text-center",
        renderFunc: (task) => (
          <AppTaskListItemDeadline deadline={task.deadline} />
        ),
      },
      isCompleted: {
        headerTitle: "Done",
        isSortable: true,
        headerClassName: "taskTableCenterHeader",
        cellClassName: "text-center col-1",
        renderFunc: (task) => (
          <AppTaskListItemCompleted
            taskId={task._id}
            value={task.isCompleted}
            onChange={() =>
              this.handleTaskCompleted(task._id, !task.isCompleted)
            }
          />
        ),
      },
    };
    /*
    const data = sortedTasks.map((task) => {
      const item = {
        fields: [
          {
            title: "Title",
            field: "title",
            render: () => <AppTaskListItemInfo task={task} />,
          },
          {
            title: "Groups",
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
                taskId={task._id}
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
*/
    return (
      <div className={`${className} mainView`}>
        <AppTaskEditor
          className="taskEditorView"
          fields={taskEditorFields}
          hide={!editMode}
          onClose={this.handleEditorClose}
          onSubmit={this.handleTaskSubmit}
          task={editingTask}
          taskErrors={editingTaskErrors}
        />
        <div
          className={
            editMode ? "taskTableContainerEditMode" : "taskTableContainer"
          }
        >
          <AppHeader className="mainHeader" />
          <AimoTable
            className="taskTable"
            rowClassName={(task) =>
              task.isCompleted ? "completedTaskRow" : ""
            }
            data={data}
            //            disableDeleteOperation={true}
            //            disableEditOperation={true}
            columnProps={columnProps}
            renderFuncs={renderFuncs}
            onRequestAdd={this.handleRequestAdd}
            onRequestEdit={this.handleRequestEdit}
            onRequestDelete={this.handleRequestDelete}
            onSort={this.handleSort}
            rowsPerPage={tableRowsPerPage}
            sortedBy={sortBy}
            sortedDirAsc={sortDirAsc}
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
