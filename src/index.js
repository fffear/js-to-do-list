let Mustache = require('mustache');
//let projectTemplate = document.getElementById("projects-template");
//console.log(projectTemplate);

import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { FormGenerator } from "./formGenerator";
import { Events } from "./eventPubSub";
import { ProjectController } from "./projectController";
import { ProjectView } from "./projectView";
import { ToDoListController } from "./toDoListController";
import { ToDoListView } from "./toDoListView";
import { ToDoItemController } from "./toDoItemController";
import {ToDoItemView } from "./toDoItemView";

let test = ToDoItem("Test Title", "Test Description", "Test Due Date", "Test Priority");
let test2 = ToDoItem("Test Title 2", "Test Description 2", "Test Due Date 2", "Test Priority 2");
let test3 = ToDoItem("Test Title 3", "Test Description 3", "Test Due Date 3", "Test Priority 3");


let AllToDoItems = Project("All To-Do Items 2");
let Project1 = Project("Project 1");

Projects.addProject(AllToDoItems);
Projects.addProject(Project1);

ProjectView.render();

ToDoListView.displayAllItemsTasks();
