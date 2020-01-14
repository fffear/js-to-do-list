import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

const ToDoItemController = (function(projects) {
  Events.on("toDoItemEdited", editTask);

  function editTask(taskData) {
    let allItems = projects.findProjectByNo(0);
    let taskToChange = allItems.findToDoItemByTaskID(taskData.taskIDNo);
    taskToChange.title = taskData.title;
    taskToChange.description = taskData.description;
    taskToChange.dueDate = taskData.dueDate;
    taskToChange.priority = taskData.priority;
  }
})(Projects);