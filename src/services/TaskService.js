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
    groups: ["Group1", "Group2"],
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
  getTasks = async () => {
    return fakeTasks;
  };

}

const taskService = new TaskService();

export default taskService;
