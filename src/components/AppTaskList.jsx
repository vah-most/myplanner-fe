import React, { Component } from 'react';

import taskService from '../services/TaskService';

import AppTable from "./common/AppTable";
import AppTaskListItemInfo from "./AppTaskListItemInfo";
import AppTaskListItemGroups from './AppTaskListItemGroups';
import AppTaskListItemDeadline from "./AppTaskListItemDeadline";
import AppTaskListItemCompleted from './AppTaskListItemCompleted';

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
        tasks: [],
        sortBy: "",
        sortDirAsc: true
    };

    componentDidMount = async () => {
        const tasks = await taskService.getTasks();
        const sortBy = "deadline";
        this.setState({ tasks, sortBy });
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
        const { sortBy, sortDirAsc, tasks } = this.state;

        const finalTasks = this.sortTasks(tasks);

        const data = finalTasks.map(task => {
            const item = [
                {
                    render: () => <AppTaskListItemInfo task={task} />
                },
                {
                    render: () => <AppTaskListItemGroups groups={task.groups} />
                },
                {
                    render: () => <AppTaskListItemDeadline deadline={task.deadline} />,
                    cellClasses: "text-center task-due align-middle"
                },
                {
                    render: () => <AppTaskListItemCompleted taskId={task.id} value={task.isCompleted} />,
                    cellClasses: "text-center align-middle"
                }
            ];
            return item;
        });

        return (
            <AppTable
                data={data}
                header={taskListFields}
                onSort={this.handleSort}
                sortBy={sortBy}
                sortDirAsc={sortDirAsc}
            />
        );
    }
}

export default TaskList;