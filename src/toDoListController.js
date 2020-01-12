import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

const ToDoListController = (function(projects, projectClass) {
  let projectHeading = document.querySelector(".project-heading");

  Events.on("toDoItemCreated", addToProjects);
  Events.on("toDoItemDeleted", removeFromProjects);

  function removeFromProjects(toDoItemTitle) {
    let allItemsProject = projects.findProject("All To-Do Items 2");
    let itemToDelete = allItemsProject.findToDoItem(toDoItemTitle);

    let currentProject = projects.findProjectByNo(itemToDelete.projectIDNo);
    removeFromAllItems(itemToDelete);
    removeFromCurrentProject(itemToDelete);

    function removeFromAllItems(itemToDelete) {
      allItemsProject.removeToDoItem(itemToDelete);
    }

    function removeFromCurrentProject(itemToDelete) {
      currentProject.removeToDoItem(itemToDelete);
    }
  }

  function addToProjects(taskDetails) {
    let allItemsProject = projects.findProject("All To-Do Items 2");
    let currentProject = projects.findProject(taskDetails["currentProjectName"]);
    let newToDoItem = ToDoItem(taskDetails["title"],
                              taskDetails["description"],
                              taskDetails["dueDate"],
                              taskDetails["priority"]);
    addToCurrentProject(newToDoItem);
    addToAllItems(newToDoItem);

    function addToAllItems(newToDoItem) {
      console.log("This came from add To All Items:");
      allItemsProject.addToDoItem(newToDoItem);
    }
  
    function addToCurrentProject(newToDoItem) {
      console.log("This came from add To Current Project:");
      currentProject.addToDoItem(newToDoItem);
    }
  }
})(Projects, Project);

export { ToDoListController };