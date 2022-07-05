/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import storageService from "./StorageService";

const fakeTasks = [
  {
    id: 1,
    title: "Task1",
    deadline: "2022-06-27 12:00:00",
    isCompleted: false,
    desc: "Desc1 is a quite long task description...",
    groups: [],
  },
  {
    id: 2,
    title: "Task2",
    deadline: "",
    isCompleted: true,
    desc: "Desc2 is a quite long task description...",
    groups: ["Group1"],
  },
  {
    id: 3,
    title: "Task3",
    deadline: "2022-06-28 12:00:00",
    isCompleted: false,
    desc: "Desc3 is a quite long task description...",
    groups: ["Group1", "Group2", "Group3", "Group4", "Group5"],
  },
  {
    id: 4,
    title: "Task4",
    deadline: "",
    isCompleted: true,
    desc: "",
    groups: ["Group3"],
  },
  {
    id: 5,
    title: "Task5",
    deadline: "2022-07-05 12:00:00",
    isCompleted: false,
    desc: "Desc5 is a quite long task description...",
    groups: ["Group3"],
  },
];

class TaskService {
  storageToken = "tasks";

  tasks = [];

  constructor() {
    //TODO: load initial tasks
  }

  saveFakeTasks() {
    this.tasks = fakeTasks;
    storageService.setItem(this.storageToken, this.tasks);
  }

  getTasks = async () => {
    this.tasks = storageService.getItem(this.storageToken);
    return this.tasks;
  };

  generateEmptyTask = () => {
    return {
      id: 0,
      title: "",
      deadline: "",
      isCompleted: false,
      desc: "",
      groups: [],
    };
  };

  setTasks = async (tasks) => {
    this.tasks = tasks;
    storageService.setItem(this.storageToken, this.tasks);
  };

  generateNewTaskId = () => {
    let maxId = 0;
    this.tasks.forEach((t) => {
      if (t.id > maxId) maxId = t.id;
    });

    return maxId + 1;
  };
}

const taskService = new TaskService();

export default taskService;
