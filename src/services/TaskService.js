/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import CryptoJS from "crypto-js";

import Config from "../Config.json";
import { fakeGroups, fakeTasks } from "./FakeTasks";
import httpService from "./HttpService";
import storageService from "./StorageService";

class TaskService {
  storageToken = "tasks";
  serverAddress = `${Config.APIAddress}/tasks`;

  tasks = [];

  async reloadTasks() {
    return fakeGroups;
    const result = await httpService.get(this.serverAddress);
    if (httpService.isOk(result)) {
      const data = httpService.getData(result);
      this.tasks = data ? data : [];
    }
    storageService.setItem(this.storageToken, this.tasks);
  }

  async storeTasks() {
    storageService.setItem(this.storageToken, this.tasks);
    const result = await httpService.post(this.serverAddress, {
      tasks: this.tasks,
    });

    return result && result.status && result.status === 200;
  }

  getTasks = async () => {
    return fakeTasks;
    return this.tasks;
  };

  getAllGroups = () => {
    return fakeGroups;
    let groups = new Set();

    this.tasks.forEach((t) => {
      if (!t.groups) return;
      t.groups.forEach((g) => {
        groups.add(g);
      });
    });

    return Array.from(groups).sort();
  };

  generateEmptyTask = () => {
    let task = {
      _id: null,
      title: "",
      deadline: "",
      isCompleted: false,
      desc: "",
      groups: [],
    };

    const newTaskPrefix = "New Task";
    const defaultTasks = this.tasks.filter((t) =>
      t.title.startsWith(newTaskPrefix)
    );

    let index = 1;
    do {
      task.title = newTaskPrefix + (index > 1 ? ` ${index}` : "");
      index++;
    } while (defaultTasks.find((t) => t.title === task.title));

    return task;
  };

  setTasks = async (tasks) => {
    this.tasks = tasks;
  };
  generateNewTaskId = () => {
    let taskId = 0;

    const foundTaskId = (taskId) => {
      return this.tasks.find((t) => t._id === taskId);
    };

    do {
      taskId = CryptoJS.lib.WordArray.random(16).toString().substring(0, 24);
    } while (foundTaskId(taskId));

    return taskId;
  };

  checkTaskErrors = (task) => {
    if (!task.title || task.title.length === 0)
      return { title: "Please set title first." };

    return null;
  };
}

const taskService = new TaskService();

export default taskService;
