import React, { Component } from 'react';

import taskService from '../services/TaskService';

import AppTable from "./common/AppTable";
import AppTaskListItemInfo from "./AppTaskListItemInfo";
import AppTaskListItemGroups from './AppTaskListItemGroups';
import AppTaskListItemDeadline from "./AppTaskListItemDeadline";
import AppTaskListItemCompleted from './AppTaskListItemCompleted';
import AppTaskEditor from './AppTaskEditor';

import "./AppTaskList.scss";

const taskListFields = [
    {
        field: "task",
        title: "Task",
        size: 5,
        isSortable: true
    },
    {
        field: "groups",
        title: "Groups",
        size: 2,
        isSortable: true
    },
    {
        field: "deadline",
        title: "Deadline",
        size: 2,
        isSortable: true,
        classes: "text-center"
    },
    {
        field: "isCompleted",
        title: "Done",
        size: 1,
        isSortable: true,
        classes: "text-center"
    },
];

class TaskList extends Component {

    state = {
        editMode: false,
        sortBy: "",
        sortDirAsc: true,
        tasks: [],
    };

    componentDidMount = async () => {
        const tasks = await taskService.getTasks();
        const sortBy = "deadline";
        this.setState({ tasks, sortBy });
    };

    handleAdd = () => {
        this.setState({ editMode: true });
    };

    handleEditorClose = () => {
        this.setState({ editMode: false });
    };

    handleSort = (sortBy, sortDirAsc) => {
        this.setState({ sortBy, sortDirAsc });
    };

    sortTasks = (tasks) => {
        const { sortBy, sortDirAsc } = this.state;
        tasks.sort((task1, task2) => {
            if (sortBy === "" || !(sortBy in task1)) return -1;
            if (task1[sortBy] === null) return sortDirAsc ? 1 : -1;
            if (task2[sortBy] === null) return sortDirAsc ? -1 : 1;
            if (task1[sortBy] < task2[sortBy]) return sortDirAsc ? -1 : 1;
            return sortDirAsc ? 1 : -1;
        });

        return tasks;
    };

    render() {
        const { editMode, sortBy, sortDirAsc, tasks } = this.state;
        const { className } = this.props;

        const finalTasks = this.sortTasks(tasks);

        const data = finalTasks.map(task => {
            const item = [
                {
                    field: "task",
                    render: () => <AppTaskListItemInfo task={task} />
                },
                {
                    field: "groups",
                    render: () => <AppTaskListItemGroups groups={task.groups} />
                },
                {
                    field: "deadline",
                    render: () => <AppTaskListItemDeadline deadline={task.deadline} />,
                    cellClasses: "text-center task-due align-middle"
                },
                {
                    field: "isCompleted",
                    render: () => <AppTaskListItemCompleted taskId={task.id} value={task.isCompleted} />,
                    cellClasses: "text-center align-middle"
                }
            ];
            return item;
        });

        return (
            <div className={`${className} mainView`}>
                <AppTaskEditor hide={!editMode} onClose={this.handleEditorClose} width="50%" />
                <AppTable
                    compactMode={editMode}
                    compactFields={["task"]}
                    data={data}
                    header={taskListFields}
                    onAdd={this.handleAdd}
                    onSort={this.handleSort}
                    sortBy={sortBy}
                    sortDirAsc={sortDirAsc}
                    style={{ width: editMode ? "50%" : "100%" }}
                />
            </div>
        );
    }
}

export default TaskList;