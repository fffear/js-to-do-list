import { Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

let Mustache = require('mustache');

const ToDoListView = (function(projects, projectClass) {
  let toDoItemsSection = document.querySelector(".list-of-todo-items");
  let projectHeading = document.querySelector(".project-heading");
  let projectList = document.getElementById("projects");
  let toDoListDiv = document.getElementById("todo-list");
  let toDoListTemplate = document.getElementById("todo-list-template").innerHTML;
  console.log(toDoListTemplate);

  projectList.addEventListener("click", function(e) {
    if (e.target.tagName == "SPAN") {
      if (e.target.innerText === "All To-Do Items 2") {
        removeCreateToDoItemBtn();
      } else {
        addCreateToDoItemBtn();
      }
      displaySelectedProject(e.target.innerText);
      render(e.target.innerText);
    }
  });

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
      createToDoItemBtn.textContent = "Create New ToDo Item";
      // console.log(createToDoItemBtn);
      toDoItemsSection.appendChild(createToDoItemBtn);

    }
  }

  function displaySelectedProject(projectName) {
    let testProject = projects.findProject(projectName);
    projectHeading.textContent = testProject.name;
  }

  function extractData(projectName) {
    let objectData = [];
    let targetProject = projects.findProject(projectName);
    targetProject.toDoList.forEach(function(toDoItem, idx) {
      objectData.push({
        title: toDoItem.title,
        description: toDoItem.description,
        dueDate: toDoItem.dueDate,
        priority: toDoItem.priority
      });
    });

    return objectData;
  }

  function render(projectName) {
    let data = { toDoList: extractData(projectName) };
    toDoListDiv.innerHTML = Mustache.render(toDoListTemplate, data);
  }

  return { displaySelectedProject };
})(Projects, Project);

export { ToDoListView };


// <button class="create-new-todo-item-btn">
//  <i class="fas fa-plus-circle create-new-project-btn"></i> Create New ToDo Item
// </button>