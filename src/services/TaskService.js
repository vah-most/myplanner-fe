/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import CryptoJS from "crypto-js";

import Config from "../Config.json";
import { fakeTasks } from "./FakeTasks";
import httpService from "./HttpService";
import StorageService from "./StorageService";

class TaskService {
  storageToken = "mp-tasks";
  serverAddress = `${Config.APIAddress}/tasks`;

  setTasks(tasks) {
    StorageService.setItem(this.storageToken, tasks);
    return true;
  }

  getTasks() {
    return StorageService.getItem(this.storageToken);
  }

  async pushTasks() {
    const tasks = this.getTasks();
    /**
     * TODO: Push Tasks to server.
     */
    return true;
  }

  async pullTasks() {
    /**
     * TODO: Pull Tasks from server.
     */
    const tasks = fakeTasks;

    this.setTasks(tasks);
    return tasks;
  }

  generateEmptyTask = () => {
    let task = {
      id: null,
      title: "",
      deadline: "",
      isCompleted: false,
      desc: "",
      tags: [],
    };

    return task;
  };

  generateNewTaskId = () => {
    let taskId = 0;

    const foundTaskId = (taskId) => {
      return this.tasks.find((t) => t.id === taskId);
    };

    do {
      taskId = CryptoJS.lib.WordArray.random(16).toString().substring(0, 24);
    } while (foundTaskId(taskId));

    return taskId;
  };

  checkTaskErrors = (task) => {
    if (!task.title || task.title.length === 0)
      return { title: "Please enter task title" };

    return null;
  };
}

const taskService = new TaskService();

export default taskService;
