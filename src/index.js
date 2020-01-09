let Mustache = require('mustache');
//let projectTemplate = document.getElementById("projects-template");
//console.log(projectTemplate);

import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { FormGenerator } from "./formGenerator";
import { Events } from "./eventPubSub";
import { ProjectController } from "./projectController";
import { ProjectView } from "./projectView";

let test = ToDoItem("Test Title", "Test Description", "Test Due Date", "Test Priority");
let test2 = ToDoItem("Test Title 2", "Test Description 2", "Test Due Date 2", "Test Priority 2");
let test3 = ToDoItem("Test Title 3", "Test Description 3", "Test Due Date 3", "Test Priority 3");


let AllToDoItems = Project("All To-Do Items 2");
let Project1 = Project("Project 1");

Projects.addProject(AllToDoItems);
Projects.addProject(Project1);


AllToDoItems.addToDoItem(test);
AllToDoItems.addToDoItem(test2);
AllToDoItems.addToDoItem(test3);
AllToDoItems.removeToDoItem(test2);

Project1.addToDoItem(test);
Project1.addToDoItem(test2);
Project1.addToDoItem(test3);
Project1.removeToDoItem(test2);

console.log("-----All To Do Items-----");
console.log(AllToDoItems);

console.log("-----Projects-----");
console.log(Projects);

// let projectView = (ProjectView(Projects.list));
ProjectView.render();
// ProjectView.extractProjectName();

console.log(Projects.list);

console.log("After:");
console.log(Projects.findProject("Project 1"));






// Way to add TO DO items to Project

// ProjectController {
  /* 
    If I have a projectController module, which takes a "TO-DO Item" and Project as an argument, then
    I can add a to-do item to the project, and it essentially becomes like a reusable module for any project
  */
// }

// Way to add Project to ProjectList

// ProjectsController {
  /* 
    If I have a projectsController module, which takes a "Project" as an argument, then
    I can add a project to the projectsList, since their is only 1 project list
  */
// }