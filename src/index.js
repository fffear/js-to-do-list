import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { FormGenerator } from "./formGenerator";
import { Events } from "./eventPubSub";
import { ProjectController } from "./projectController";
import { ProjectView } from "./projectView";
import { ToDoListController } from "./toDoListController";
import { ToDoListView } from "./toDoListView";
import { ToDoItemController } from "./toDoItemController";
import { ToDoItemView } from "./toDoItemView";
import { LocalStorageController } from "./localStorageController";

if (LocalStorageController.storageAvailable('localStorage') && localStorage.hasOwnProperty("projects")) {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let projectsList = projects.list;

  // Each Project
  projectsList.forEach(function(project) {
    let projectTasks = project.toDoList;

    let newProject = Project(project.name);
    newProject.id = project.id;

    // Each task in project
    projectTasks.forEach(function(task) {
      let projectTask = ToDoItem(task.title, task.description, task.dueDate, task.priority);
      projectTask.projectIDNo = task.projectIDNo;
      projectTask.taskIDNo = task.taskIDNo;
      newProject.addToDoItem(projectTask);
    });

    Projects.addProject(newProject);
  });

  // Get current project id no from local storage
  Projects.currentProjectIDNo = projectsList[projectsList.length - 1].id;

  let allTasks = projectsList[0].toDoList;

  if (allTasks.length != 0) {
    // Get current item id no from local storage
    ToDoListController.itemIDNo = allTasks[allTasks.length - 1].taskIDNo;
  }

} else {
  let AllToDoItems = Project("All To-Do Items");
  Projects.addProject(AllToDoItems);
}

ProjectView.render();

ToDoListView.displayAllItemsTasks();