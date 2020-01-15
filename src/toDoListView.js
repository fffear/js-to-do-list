import { Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

let Mustache = require('mustache');

const ToDoListView = (function(projects, projectClass) {
  let toDoItemsSection = document.querySelector(".list-of-todo-items");
  let projectHeading = document.querySelector(".project-heading");
  let projectList = document.getElementById("projects");
  let toDoListDiv = document.getElementById("todo-list");
  let toDoListTemplate = document.getElementById("todo-list-template").innerHTML;

  document.addEventListener("click", deleteToDoItem);
  Events.on("toDoItemCreated", render);
  Events.on("projectDeleted", displayAllItemsTasks);

  projectList.addEventListener("click", displayCurrentProjectTasks);

  function displayAllItemsTasks() {
    removeCreateToDoItemBtn();

    displaySelectedProject("All To-Do Items", 0);
    render();

  }

  function displayCurrentProjectTasks(e) {
    if (e.target.tagName == "SPAN") {
      if (e.target.innerText === "All To-Do Items") {
        removeCreateToDoItemBtn();
      } else {
        addCreateToDoItemBtn();
      }

      displaySelectedProject(e.target.innerText, e.target.parentNode.dataset.projectId);
      render();
    }
  }
  
  function removeCreateToDoItemBtn() {
    let createToDoItemBtn = document.querySelector(".create-new-todo-item-btn");
    if (!(createToDoItemBtn === null)) {
      toDoItemsSection.removeChild(createToDoItemBtn);
    }
  }

  function addCreateToDoItemBtn() {
    let createToDoItemBtn = document.querySelector(".create-new-todo-item-btn");

    if (createToDoItemBtn === null) {
      createToDoItemBtn = document.createElement("button");
      createToDoItemBtn.classList.add("create-new-todo-item-btn");

      let plusIcon = document.createElement("i");
      plusIcon.classList.add("fas", "fa-plus-circle");

      createToDoItemBtn.appendChild(plusIcon);
      createToDoItemBtn.appendChild( document.createTextNode(" Create New ToDo Item"));
      toDoItemsSection.appendChild(createToDoItemBtn);
    }
  }

  function deleteToDoItem(e) {
    if (e.target.className === "del-item") {
      toDoListDiv.removeChild(e.target.closest("li"));
      Events.emit("toDoItemDeleted", e.target.closest("li").dataset.taskId);
    }
  }

  function displaySelectedProject(projectName, projectID) {
    projectHeading.setAttribute("data-project-id", projectID);
    projectHeading.textContent = projectName;
  }

  function extractData(projectID) {
    let objectData = [];
    let targetProject = projects.findProjectByNo(Number(projectID));
    targetProject.toDoList.forEach(function(toDoItem, idx) {
      objectData.push({
        title: toDoItem.title,
        description: toDoItem.description,
        dueDate: toDoItem.dueDate,
        priority: toDoItem.priority,
        taskIDNo: toDoItem.taskIDNo
      });
    });

    return objectData;
  }

  function render() {
    let data = { toDoList: extractData(Number(projectHeading.dataset.projectId)) };
    toDoListDiv.innerHTML = Mustache.render(toDoListTemplate, data);
  }

  return { displaySelectedProject, displayAllItemsTasks };
})(Projects, Project);

export { ToDoListView };