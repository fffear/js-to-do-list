import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";
import { LocalStorageController } from "./localStorageController";

const ToDoItemController = (function(projects) {
  Events.on("toDoItemEdited", editTask);

  function editTask(taskData) {
    let allItems = projects.findProjectByNo(0);
    let taskToChange = allItems.findToDoItemByTaskID(taskData.taskIDNo);
    let currentProjectID = taskToChange.projectIDNo;
    let currentProject = projects.findProjectByNo(currentProjectID);
    let taskToChange2 = currentProject.findToDoItemByTaskID(taskData.taskIDNo);

    taskToChange2.title = taskData.title;
    taskToChange2.description = taskData.description;
    taskToChange2.dueDate = taskData.dueDate;
    taskToChange2.priority = taskData.priority;

    taskToChange.title = taskData.title;
    taskToChange.description = taskData.description;
    taskToChange.dueDate = taskData.dueDate;
    taskToChange.priority = taskData.priority;

    if (LocalStorageController.storageAvailable('localStorage')) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }
})(Projects);