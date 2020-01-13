import { ToDoItem, Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

const ToDoListController = (function(projects, projectClass) {
  let itemIDNo = 0;
  let projectHeading = document.querySelector(".project-heading");

  Events.on("toDoItemCreated", addToProjects);
  Events.on("toDoItemDeleted", removeFromProjects);

  function removeFromProjects(taskID) {
    let allItemsProject = projects.findProject("All To-Do Items 2");
    // let itemToDelete = allItemsProject.findToDoItem(toDoItemTitle);
    let itemToDelete = allItemsProject.findToDoItemByTaskID(taskID);

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
    assignItemID(newToDoItem);
    addToCurrentProject(newToDoItem);
    addToAllItems(newToDoItem);

    function addToAllItems(newToDoItem) {
      allItemsProject.addToDoItem(newToDoItem);
    }
  
    function addToCurrentProject(newToDoItem) {
      currentProject.addToDoItem(newToDoItem);
    }
  }

  function incrementItemID() {
    itemIDNo++;
  }

  function assignItemID(newToDoItem) {
    newToDoItem.taskIDNo = itemIDNo;
    incrementItemID();
  }
})(Projects, Project);

export { ToDoListController };