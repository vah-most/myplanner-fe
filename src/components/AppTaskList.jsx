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
        tasks: []
    };

    componentDidMount = async () => {
        const tasks = await taskService.getTasks();
        this.setState({ tasks });
    };

    render() {
        const { tasks } = this.state;

        const data = tasks.map(task => {
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
            <AppTable data={data} header={taskListFields} />
        );
    }
}

export default TaskList;