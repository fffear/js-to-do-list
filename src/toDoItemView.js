import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

let Mustache = require('mustache');

const ToDoItemView = (function(projects) {
  let toDoList = document.getElementById("todo-list");
  let toDoListTemplate = document.getElementById("todo-list-template").innerHTML;
  toDoList.addEventListener("click", displayTaskDetails);

  Events.on("completeItemEdit", render);

  function displayTaskDetails(e) {
    let toDoItemDiv = e.target.closest("div.to-do-item-div");
    if (toDoItemDiv) {
      toDoItemDiv.nextElementSibling.classList.toggle("hidden");
    }

    if (e.target.className == "edit-task") {
      let taskId = e.target.closest("li").dataset.taskId;
      let taskData = extractData(taskId);
      Events.emit("createEditTaskForm", taskData);
    }
  }

  function extractData(taskId) {
    let objectData;
    let targetProject = projects.findProject("All To-Do Items");
    let targetItem = targetProject.findToDoItemByTaskID(taskId);
    objectData = {
      title: targetItem.title,
      description: targetItem.description,
      dueDate: targetItem.dueDate,
      priority: targetItem.priority,
      taskIDNo: targetItem.taskIDNo
    }; 

    return objectData;
  }

  function render(taskIDNo) {
    let itemToEdit = document.querySelector(`[data-task-id="${taskIDNo}"]`);
    let toDoList = itemToEdit.parentNode;

    let targetProject = projects.findProject("All To-Do Items");
    let targetItem = targetProject.findToDoItemByTaskID(taskIDNo);


    let data = { toDoList: [extractData(taskIDNo)] };
    let updatedItem = Mustache.render(toDoListTemplate, data);

    itemToEdit.outerHTML = updatedItem;
  }

})(Projects);

export { ToDoItemView };